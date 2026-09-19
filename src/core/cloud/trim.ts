/* Far-field background, and why max extent is the wrong measure of a scene.
 *
 * Gaussian-splat trainers commonly add a shell of far Gaussians to model sky and distant
 * background. They are opaque, so the opacity cull cannot touch them, and they sit two
 * orders of magnitude further out than the scene. A real capture: 95% of points inside
 * radius 2.3, another 4% on a shell at radius 241.
 *
 * Sizing anything off the bounding sphere then breaks twice over — the camera frames the
 * shell and the actual building becomes a speck, and every scale-relative tolerance in the
 * extractor is set from a radius a hundred times too large. So the scene's extent is taken
 * from a percentile rather than a maximum, and points far outside it are dropped and
 * reported rather than silently left to distort everything downstream.
 */
import type { PlyResult } from '@/types';

/** Beyond this multiple of the 95th-percentile radius, a point is not part of the scene. */
export const FAR_FACTOR = 8;
/** If trimming would take more than this share, the spread is the scene, not outliers. */
export const MAX_TRIM_FRACTION = 0.25;

export interface Extent {
  centre: [number, number, number];
  /** 95th-percentile distance from the centre — the scene, ignoring stragglers */
  radius: number;
  /** furthest point, for comparison */
  maxRadius: number;
}

function medianOf(v: Float64Array): number {
  const s = Float64Array.from(v);
  s.sort();
  return s.length ? s[s.length >> 1] : 0;
}

/** Median centre and percentile radius. Both are robust: a handful of distant points move
 *  neither, which is the entire point. */
export function robustExtent(positions: Float32Array, sampleCap = 120000): Extent {
  const n = positions.length / 3;
  if (n === 0) return { centre: [0, 0, 0], radius: 1, maxRadius: 1 };
  const step = Math.max(1, Math.floor(n / sampleCap));
  const m = Math.ceil(n / step);
  const xs = new Float64Array(m),
    ys = new Float64Array(m),
    zs = new Float64Array(m);
  let k = 0;
  for (let i = 0; i < n && k < m; i += step) {
    xs[k] = positions[i * 3];
    ys[k] = positions[i * 3 + 1];
    zs[k] = positions[i * 3 + 2];
    k++;
  }
  const cx = medianOf(xs.subarray(0, k)),
    cy = medianOf(ys.subarray(0, k)),
    cz = medianOf(zs.subarray(0, k));
  const d = new Float64Array(k);
  for (let i = 0; i < k; i++) {
    d[i] = Math.hypot(xs[i] - cx, ys[i] - cy, zs[i] - cz);
  }
  d.sort();
  const p95 = d[Math.min(k - 1, Math.floor(0.95 * (k - 1)))] || 0;
  return {
    centre: [cx, cy, cz],
    radius: p95 > 0 ? p95 : d[k - 1] || 1,
    maxRadius: d[k - 1] || 1,
  };
}

export interface TrimResult {
  res: PlyResult;
  removed: number;
  extent: Extent;
  /** the distance beyond which points were dropped, or null when nothing was trimmed */
  cutoff: number | null;
}

/** Drop far-field background. Conservative by design: it declines to trim when the
 *  "outliers" are too numerous to be outliers. */
export function trimFarField(res: PlyResult): TrimResult {
  const extent = robustExtent(res.positions);
  const n = res.positions.length / 3;
  const cutoff = extent.radius * FAR_FACTOR;

  // nothing is meaningfully outside the scene
  if (!(extent.maxRadius > cutoff)) return { res, removed: 0, extent, cutoff: null };

  const [cx, cy, cz] = extent.centre;
  const keep = new Uint8Array(n);
  let kept = 0;
  for (let i = 0; i < n; i++) {
    const dx = res.positions[i * 3] - cx;
    const dy = res.positions[i * 3 + 1] - cy;
    const dz = res.positions[i * 3 + 2] - cz;
    if (dx * dx + dy * dy + dz * dz <= cutoff * cutoff) {
      keep[i] = 1;
      kept++;
    }
  }
  const removed = n - kept;
  if (removed === 0) return { res, removed: 0, extent, cutoff: null };
  if (removed / n > MAX_TRIM_FRACTION) {
    // this much material is the scene spreading out, not a background shell
    return { res, removed: 0, extent, cutoff: null };
  }

  const positions = new Float32Array(kept * 3);
  const colors = new Float32Array(kept * 3);
  const alphas = new Float32Array(kept);
  const cov = res.cov ? new Float32Array(kept * 6) : null;
  let w = 0;
  for (let i = 0; i < n; i++) {
    if (!keep[i]) continue;
    positions[w * 3] = res.positions[i * 3];
    positions[w * 3 + 1] = res.positions[i * 3 + 1];
    positions[w * 3 + 2] = res.positions[i * 3 + 2];
    colors[w * 3] = res.colors[i * 3];
    colors[w * 3 + 1] = res.colors[i * 3 + 1];
    colors[w * 3 + 2] = res.colors[i * 3 + 2];
    alphas[w] = res.alphas[i];
    if (cov && res.cov) {
      for (let c = 0; c < 6; c++) cov[w * 6 + c] = res.cov[i * 6 + c];
    }
    w++;
  }

  return {
    res: { ...res, positions, colors, alphas, cov, kept },
    removed,
    extent: robustExtent(positions),
    cutoff,
  };
}
