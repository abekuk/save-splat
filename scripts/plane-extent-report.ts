/* eslint-disable no-console -- this is a reporting script; stdout is its output */
/* Measures how much of each fitted plane's drawn rectangle is actually covered by material.
 * The overlay renders that rectangle, so a low coverage number is a plane painted across
 * empty space — which is the thing being fixed. */
import { readFileSync } from 'node:fs';
import { parsePLY } from '../src/core/ply/parse';
import { detectOrientation, ORIENTS } from '../src/core/orientation';
import { extractGeometry } from '../src/core/geometry/extract';
import type { GeometryResult, Plane } from '../src/types';

const file = process.argv[2];
if (!file) throw new Error('usage: plane-extent-report.ts <file.ply>');

const buf = readFileSync(file);
const ply = parsePLY(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer);
const det = detectOrientation(ply.positions);
const rx = ORIENTS[det.index].rx;
const c = Math.cos(rx), s = Math.sin(rx);
// column-major 4x4 for a rotation about X
const m = [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];

let radius = 0;
for (let i = 0; i < ply.positions.length; i += 3) {
  const d = Math.hypot(ply.positions[i], ply.positions[i + 1], ply.positions[i + 2]);
  if (d > radius) radius = d;
}

const geom: GeometryResult = await new Promise((res, rej) =>
  extractGeometry(
    { positions: ply.positions, alphas: ply.alphas, cov: ply.cov, matrixWorld: m, radius },
    () => {}, res, rej,
  ),
);

/** Independent of the extractor: how much of the drawn rectangle holds real material?
 *  Rasterise this plane's inliers into a fixed 40x40 grid over the rectangle it draws. */
function coverage(p: Plane): { occupied: number; dense: number } {
  const G = 40;
  const du = p.umax - p.umin, dv = p.vmax - p.vmin;
  const cnt = new Int32Array(G * G);
  let inside = 0;
  for (let i = 0; i < ply.positions.length; i += 3) {
    const x = ply.positions[i], y0 = ply.positions[i + 1], z0 = ply.positions[i + 2];
    // apply the same world rotation
    const y = c * y0 - s * z0, z = s * y0 + c * z0;
    const dx = x - p.centroid[0], dy = y - p.centroid[1], dz = z - p.centroid[2];
    const r = dx * p.n[0] + dy * p.n[1] + dz * p.n[2];
    if (Math.abs(r) > 0.02 * radius) continue;              // near this plane
    const a = dx * p.u[0] + dy * p.u[1] + dz * p.u[2];
    const b = dx * p.v[0] + dy * p.v[1] + dz * p.v[2];
    if (a < p.umin || a > p.umax || b < p.vmin || b > p.vmax) continue;
    const gi = Math.min(G - 1, Math.floor(((a - p.umin) / du) * G));
    const gj = Math.min(G - 1, Math.floor(((b - p.vmin) / dv) * G));
    cnt[gj * G + gi]++;
    inside++;
  }
  let occ = 0, dense = 0;
  const nonEmpty: number[] = [];
  for (let k = 0; k < cnt.length; k++) if (cnt[k] > 0) { occ++; nonEmpty.push(cnt[k]); }
  nonEmpty.sort((x, y) => x - y);
  const med = nonEmpty.length ? nonEmpty[nonEmpty.length >> 1] : 0;
  const thr = Math.max(2, Math.ceil(med * 0.2));
  for (let k = 0; k < cnt.length; k++) if (cnt[k] >= thr) dense++;
  void inside;
  return { occupied: occ / (G * G), dense: dense / (G * G) };
}

console.log(`${geom.planes.length} planes · radius ${radius.toFixed(2)} · orientation ${ORIENTS[det.index].name}\n`);
console.log('plane  cls      w x h (units)      area    fill   COVERAGE  DENSE-COVERAGE');
let sumCov = 0, sumDense = 0;
for (const p of geom.planes) {
  const cov = coverage(p);
  sumCov += cov.occupied; sumDense += cov.dense;
  console.log(
    `${p.label.padEnd(6)} ${p.cls.padEnd(8)} ` +
      `${(p.umax - p.umin).toFixed(2).padStart(5)} x ${(p.vmax - p.vmin).toFixed(2).padStart(5)}   ` +
      `${p.area.toFixed(2).padStart(6)}  ${(p.fill * 100).toFixed(0).padStart(3)}%   ` +
      `${(cov.occupied * 100).toFixed(1).padStart(5)}%      ${(cov.dense * 100).toFixed(1).padStart(5)}%`,
  );
}
const n = geom.planes.length;
console.log(`\nmean rectangle coverage: ${((sumCov / n) * 100).toFixed(1)}%  ·  dense: ${((sumDense / n) * 100).toFixed(1)}%`);
console.log('(coverage = share of the DRAWN rectangle holding any point; dense = holding real density)');
