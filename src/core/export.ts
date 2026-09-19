/* JSON / CSV export of the dispatch queue and the extracted geometry. */
import { LAMBDA, ranked, rho } from '@/core/ranking';
import { nearestPlane } from '@/core/geometry/extract';
import { mArea, mLen, mVol } from '@/core/units';
import type { AppSnapshot } from '@/core/snapshot';

export const NOTE =
  'Ranked prior for incident command review. This is NOT an autonomous dispatch order — ' +
  'every input is an operator estimate and the ordering is only as good as those estimates.';

export const MODEL_TEXT =
  'V_i(t) = n*q*r*exp(-lambda*t); greedy index rho = (n*q*r*lambda)/max(0.1, tau) ' +
  '[expected lives per crew-hour, ranked descending]';

export const GEO_NOTE =
  "Planes fitted by opacity-weighted RANSAC with a per-Gaussian tolerance eps_i = K*sqrt(n'*Sigma_i*n). " +
  'Drift ratio = tan(tilt from plumb) and is scale-free. Areas and volumes are only metric if ' +
  'metres_per_unit is correct; debris volume is a column measure that assumes each pile is solid ' +
  'to the ground plane. Geometry is evidence for an assessor, not a slider value.';

const r3 = (x: number): number => Number(x.toFixed(3));

export function download(filename: string, text: string, mime: string): void {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function stamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

export function geometryExport(snap: AppSnapshot): unknown {
  const g = snap.geom;
  if (!g || !snap.slot) return null;
  const mpu = snap.metresPerUnit;
  return {
    scan: snap.slot.name,
    slot: snap.slotKey,
    metres_per_unit: mpu,
    scale_calibrated: mpu !== 1,
    scene_radius: r3(g.radius),
    working_set_points: g.workingSet,
    used_per_gaussian_covariance: g.usedCovariance,
    unassigned_fraction: Number(g.residualFrac.toFixed(4)),
    fit_ms: g.ms,
    planes: g.planes.map((p) => ({
      label: p.label,
      surface_class: p.cls,
      normal: p.n.map(r3),
      plane_offset_d: r3(p.d),
      centroid: p.centroid.map(r3),
      tilt_deg: Number(((p.tilt * 180) / Math.PI).toFixed(3)),
      drift_ratio: p.drift == null ? null : Number(p.drift.toFixed(5)),
      drift_band: p.band ? p.band.name : null,
      area_m2: Number(mArea(p.area, mpu).toFixed(3)),
      fill_fraction: Number(p.fill.toFixed(3)),
      support_fraction: Number(p.support.toFixed(4)),
      rms_residual_m: Number(mLen(p.rms, mpu).toFixed(4)),
      inlier_points: p.count,
    })),
    debris: {
      ground_height: r3(g.debris.groundY),
      ground_plane: g.debris.groundPlane,
      total_volume_m3: Number(mVol(g.debris.totalVolume, mpu).toFixed(2)),
      piles: g.debris.clusters.map((c) => ({
        id: c.id,
        volume_m3: Number(mVol(c.volume, mpu).toFixed(2)),
        footprint_m2: Number(mArea(c.footprint, mpu).toFixed(2)),
        max_height_m: Number(mLen(c.maxHeight, mpu).toFixed(2)),
        centre: c.centre.map(r3),
      })),
    },
  };
}

export interface QueueRecord {
  rank: number;
  name: string;
  rho_lives_per_crew_hour: number;
  occupancy_persons: number;
  p_trapped_alive: number;
  p_extraction_success: number;
  collapse_type: string;
  lambda_per_hour: number;
  crew_hours_tau: number;
  confidence: string;
  position: { x: number; y: number; z: number };
  geometry: {
    plane: string;
    surface_class: string;
    tilt_deg: number;
    drift_ratio: number | null;
    drift_band: string | null;
  } | null;
}

export function queueRecords(snap: AppSnapshot): QueueRecord[] {
  return ranked(snap.sites).map((s, i) => {
    const np = nearestPlane(s, snap.geom);
    return {
      rank: i + 1,
      name: s.name,
      rho_lives_per_crew_hour: Number(rho(s).toFixed(6)),
      occupancy_persons: s.n,
      p_trapped_alive: s.q,
      p_extraction_success: s.r,
      collapse_type: s.type,
      lambda_per_hour: LAMBDA[s.type],
      crew_hours_tau: s.tau,
      confidence: s.conf,
      position: {
        x: Number(s.pos.x.toFixed(4)),
        y: Number(s.pos.y.toFixed(4)),
        z: Number(s.pos.z.toFixed(4)),
      },
      geometry: np
        ? {
            plane: np.plane.label,
            surface_class: np.plane.cls,
            tilt_deg: Number(((np.plane.tilt * 180) / Math.PI).toFixed(3)),
            drift_ratio: np.plane.drift == null ? null : Number(np.plane.drift.toFixed(5)),
            drift_band: np.plane.band ? np.plane.band.name : null,
          }
        : null,
    };
  });
}

export function exportJson(snap: AppSnapshot): void {
  const payload = {
    generated: new Date().toISOString(),
    model: MODEL_TEXT,
    note: NOTE,
    geometry_note: GEO_NOTE,
    geometry: geometryExport(snap),
    queue: queueRecords(snap),
  };
  download(`rubble-queue-${stamp()}.json`, JSON.stringify(payload, null, 2), 'application/json');
}

const CSV_COLS = [
  'rank',
  'name',
  'rho_lives_per_crew_hour',
  'occupancy_persons',
  'p_trapped_alive',
  'p_extraction_success',
  'collapse_type',
  'lambda_per_hour',
  'crew_hours_tau',
  'confidence',
  'x',
  'y',
  'z',
  'plane',
  'surface_class',
  'tilt_deg',
  'drift_ratio',
  'drift_band',
];

function cell(v: unknown): string {
  const s = String(v);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

export function exportCsv(snap: AppSnapshot): void {
  const rows = [CSV_COLS.join(',')];
  for (const r of queueRecords(snap)) {
    const gm = r.geometry;
    rows.push(
      [
        r.rank,
        r.name,
        r.rho_lives_per_crew_hour,
        r.occupancy_persons,
        r.p_trapped_alive,
        r.p_extraction_success,
        r.collapse_type,
        r.lambda_per_hour,
        r.crew_hours_tau,
        r.confidence,
        r.position.x,
        r.position.y,
        r.position.z,
        gm?.plane ?? '',
        gm?.surface_class ?? '',
        gm?.tilt_deg ?? '',
        gm?.drift_ratio ?? '',
        gm?.drift_band ?? '',
      ]
        .map(cell)
        .join(','),
    );
  }
  download(`rubble-queue-${stamp()}.csv`, rows.join('\n') + '\n', 'text/csv');
}
