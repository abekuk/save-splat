/* The payload every agent receives. Built from real state — there is no synthetic
 * filler — so COPY CONTEXT produces something that can be reasoned over elsewhere
 * and pasted back, which is the whole bridge while no reasoner is attached. */
import { LAMBDA, ranked, rho } from '@/core/ranking';
import { nearestPlane } from '@/core/geometry/extract';
import { mLen, mArea, mVol } from '@/core/units';
import type { AppSnapshot } from '@/core/snapshot';

export interface SwarmContext {
  generated: string;
  framing: string;
  site: Record<string, unknown> | null;
  scan: Record<string, unknown> | null;
  geometry: Record<string, unknown> | null;
  ranking: { rank: number; name: string; rho: number }[];
}

export function buildSwarmContext(snap: AppSnapshot): SwarmContext {
  const s = snap.sites.find((x) => x.id === snap.selectedId) ?? null;
  const slot = snap.slot;
  const g = snap.geom;
  const mpu = snap.metresPerUnit;

  const ctx: SwarmContext = {
    generated: new Date().toISOString(),
    framing:
      'Advisory context for assisted assessment. Agents propose, the operator applies. ' +
      'Not a dispatch order.',
    site: null,
    scan: null,
    geometry: null,
    ranking: ranked(snap.sites).map((x, i) => ({
      rank: i + 1,
      name: x.name,
      rho: Number(rho(x).toFixed(4)),
    })),
  };

  if (s) {
    const np = nearestPlane(s, g);
    ctx.site = {
      id: s.id,
      name: s.name,
      n: s.n,
      q: s.q,
      r: s.r,
      tau: s.tau,
      collapse_type: s.type,
      lambda: LAMBDA[s.type],
      confidence: s.conf,
      rho: Number(rho(s).toFixed(4)),
      nearest_plane: np ? np.plane.label : null,
    };
  }

  if (slot) {
    ctx.scan = {
      slot: snap.slotKey,
      source: slot.name,
      points_rendered: slot.kept,
      points_total: slot.total,
      has_covariance: slot.hasCov,
      orientation: slot.orient.name,
      metres_per_unit: mpu,
      scale_calibrated: mpu !== 1,
    };
  }

  if (g) {
    ctx.geometry = {
      extraction_ms: g.ms,
      used_covariance: g.usedCovariance,
      residual_fraction: Number((g.residualFrac || 0).toFixed(4)),
      planes: g.planes.map((p) => {
        const o: Record<string, unknown> = {
          label: p.label,
          cls: p.cls,
          area_m2: Number(mArea(p.area, mpu).toFixed(2)),
          fill: Number(p.fill.toFixed(3)),
          support: Number(p.support.toFixed(4)),
          rms_m: Number(mLen(p.rms, mpu).toFixed(4)),
          tilt_deg: Number(((p.tilt * 180) / Math.PI).toFixed(2)),
        };
        if (p.cls === 'wall' && p.drift != null) {
          o.drift_ratio = Number(p.drift.toFixed(4));
          o.drift_band = p.band ? p.band.name : null;
        }
        return o;
      }),
      debris: g.debris
        ? {
            total_volume_m3: Number(mVol(g.debris.totalVolume, mpu).toFixed(2)),
            clusters: g.debris.clusters.length,
            ground_plane: g.debris.groundPlane,
          }
        : null,
    };
  }

  return ctx;
}

/** Clipboard is blocked on some origins, so fall back to a hidden textarea. */
export function copyText(t: string): Promise<boolean> {
  const fallback = (): boolean => {
    try {
      const ta = document.createElement('textarea');
      ta.value = t;
      ta.style.position = 'fixed';
      ta.style.top = '-2000px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const done = document.execCommand('copy');
      document.body.removeChild(ta);
      return done;
    } catch {
      return false;
    }
  };
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(t).then(
      () => true,
      () => fallback(),
    );
  }
  return Promise.resolve(fallback());
}
