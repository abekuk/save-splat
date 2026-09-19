/* A mesh is not a point cloud, and the difference matters for what comes after.
 *
 * Taking a mesh's vertices straight would hand the extractor whatever tessellation the
 * exporter chose — dense where the surface is fiddly, three vertices across a flat wall.
 * Plane fitting reads that as "the wall is barely there". So points are sampled uniformly
 * over triangle AREA instead, which is the density the geometry layer assumes.
 *
 * The upside over a scanned point cloud: no floaters, even coverage, and glTF is metres by
 * specification — so volumes are genuinely metric rather than in arbitrary scan units.
 */
import * as THREE from 'three';
import type { PlyResult } from '@/types';

export interface SampledSource {
  positions: Float32Array;
  /** vertex colours, already 0..1, or null */
  colors: Float32Array | null;
  uvs: Float32Array | null;
  index: Uint32Array | null;
  matrix: THREE.Matrix4;
  /** RGBA texels of the base colour map, or null */
  texture: { data: Uint8ClampedArray; w: number; h: number } | null;
  /** material base colour, used when there is neither texture nor vertex colour */
  base: [number, number, number];
}

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Read a texture's pixels once so per-point sampling is an array lookup. */
export function texturePixels(
  image: CanvasImageSource & { width?: number; height?: number },
): { data: Uint8ClampedArray; w: number; h: number } | null {
  const w = Number(image.width) || 0;
  const h = Number(image.height) || 0;
  if (!w || !h) return null;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(image, 0, 0);
    return { data: ctx.getImageData(0, 0, w, h).data, w, h };
  } catch {
    return null; // a cross-origin or oversized texture is not worth failing the load over
  }
}

/** Area-weighted sampling across every primitive, so density is uniform over the surface
 *  rather than over the triangle list. */
export function samplePoints(sources: SampledSource[], target: number): PlyResult {
  // one pass to measure: cumulative area over all triangles of all sources
  const tris: { s: number; a: number; b: number; c: number; area: number }[] = [];
  const pa = new THREE.Vector3(),
    pb = new THREE.Vector3(),
    pc = new THREE.Vector3();
  const ab = new THREE.Vector3(),
    ac = new THREE.Vector3(),
    cross = new THREE.Vector3();
  let total = 0;

  sources.forEach((src, si) => {
    const pos = src.positions;
    const idx = src.index;
    const triCount = idx ? idx.length / 3 : pos.length / 9;
    for (let t = 0; t < triCount; t++) {
      const i0 = idx ? idx[t * 3] : t * 3;
      const i1 = idx ? idx[t * 3 + 1] : t * 3 + 1;
      const i2 = idx ? idx[t * 3 + 2] : t * 3 + 2;
      pa.fromArray(pos, i0 * 3).applyMatrix4(src.matrix);
      pb.fromArray(pos, i1 * 3).applyMatrix4(src.matrix);
      pc.fromArray(pos, i2 * 3).applyMatrix4(src.matrix);
      ab.subVectors(pb, pa);
      ac.subVectors(pc, pa);
      const area = cross.crossVectors(ab, ac).length() * 0.5;
      if (!(area > 0) || !isFinite(area)) continue;
      tris.push({ s: si, a: i0, b: i1, c: i2, area });
      total += area;
    }
  });

  if (!tris.length || !(total > 0)) {
    throw new Error('this file contains no triangles with area — nothing to sample');
  }

  // cumulative distribution, so a triangle is picked in proportion to how much surface it is
  const cdf = new Float64Array(tris.length);
  let acc = 0;
  for (let i = 0; i < tris.length; i++) {
    acc += tris[i].area;
    cdf[i] = acc / total;
  }

  const n = Math.max(1, Math.min(target, 900000));
  const positions = new Float32Array(n * 3);
  const colors = new Float32Array(n * 3);
  const alphas = new Float32Array(n);
  alphas.fill(1);

  // deterministic: the same mesh must give the same cloud, as the extractor already does
  let seed = 0x9e3779b9;
  const rnd = (): number => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const pick = (u: number): number => {
    let lo = 0,
      hi = cdf.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cdf[mid] < u) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };

  for (let k = 0; k < n; k++) {
    const tri = tris[pick(rnd())];
    const src = sources[tri.s];
    // uniform barycentric point on the triangle
    let u = rnd(),
      v = rnd();
    if (u + v > 1) {
      u = 1 - u;
      v = 1 - v;
    }
    const w = 1 - u - v;

    const p = src.positions;
    const ax = p[tri.a * 3],
      ay = p[tri.a * 3 + 1],
      az = p[tri.a * 3 + 2];
    const bx = p[tri.b * 3],
      by = p[tri.b * 3 + 1],
      bz = p[tri.b * 3 + 2];
    const cx = p[tri.c * 3],
      cy = p[tri.c * 3 + 1],
      cz = p[tri.c * 3 + 2];
    pa.set(ax * w + bx * u + cx * v, ay * w + by * u + cy * v, az * w + bz * u + cz * v);
    pa.applyMatrix4(src.matrix);
    positions[k * 3] = pa.x;
    positions[k * 3 + 1] = pa.y;
    positions[k * 3 + 2] = pa.z;

    let r = src.base[0],
      g = src.base[1],
      b = src.base[2];
    if (src.texture && src.uvs) {
      const uv = src.uvs;
      const tu = uv[tri.a * 2] * w + uv[tri.b * 2] * u + uv[tri.c * 2] * v;
      const tv = uv[tri.a * 2 + 1] * w + uv[tri.b * 2 + 1] * u + uv[tri.c * 2 + 1] * v;
      const { data, w: tw, h: th } = src.texture;
      // wrap, and read v from the top: GLTFLoader leaves the image unflipped
      const px = Math.min(tw - 1, Math.max(0, Math.floor((tu - Math.floor(tu)) * tw)));
      const py = Math.min(th - 1, Math.max(0, Math.floor((tv - Math.floor(tv)) * th)));
      const o = (py * tw + px) * 4;
      r = data[o] / 255;
      g = data[o + 1] / 255;
      b = data[o + 2] / 255;
    } else if (src.colors) {
      const c = src.colors;
      r = c[tri.a * 3] * w + c[tri.b * 3] * u + c[tri.c * 3] * v;
      g = c[tri.a * 3 + 1] * w + c[tri.b * 3 + 1] * u + c[tri.c * 3 + 1] * v;
      b = c[tri.a * 3 + 2] * w + c[tri.b * 3 + 2] * u + c[tri.c * 3 + 2] * v;
    }
    colors[k * 3] = clamp01(r);
    colors[k * 3 + 1] = clamp01(g);
    colors[k * 3 + 2] = clamp01(b);
  }

  return {
    positions,
    colors,
    alphas,
    cov: null, // a mesh has no per-point extent; the extractor falls back to scene scale
    total: n,
    kept: n,
    step: 1,
    culled: 0,
    colorSource: sources.some((s) => s.texture)
      ? 'texture'
      : sources.some((s) => s.colors)
        ? 'vertex colour'
        : 'material colour',
    format: 'gltf mesh',
  };
}
