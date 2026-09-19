/* Up-axis detection. Splat .ply exports land Y-down, point-cloud exports are usually
 * Z-up; assuming either one puts the scan on its side and makes every verticality
 * number meaningless, so detect it from where the material sits instead. */
import type { Orientation } from '@/types';

/** What the detector concluded, and how strongly. `confident` is false when the
 *  winner is only marginally ahead, or when the best axis is X — which is never a
 *  real export convention and only ever means detection failed. */
export interface OrientationDetection {
  /** index into ORIENTS */
  index: number;
  confident: boolean;
  score: number;
  runnerUp: number;
  name: string;
}

interface Candidate {
  axis: number;
  low: boolean;
  idx: number;
  name: string;
  score: number;
}

export const ORIENTS: Orientation[] = [
  { name: 'Y-UP',   rx: 0 },              // already three.js convention
  { name: 'Y-DOWN', rx: Math.PI },        // (x,y,z) -> (x,-y,-z)   splat .ply
  { name: 'Z-UP',   rx: -Math.PI / 2 },   // (x,y,z) -> (x,z,-y)    point-cloud .ply
  { name: 'Z-DOWN', rx:  Math.PI / 2 }    // (x,y,z) -> (x,-z,y)
];

/* Gravity's signature is a dense layer at the BOTTOM, not merely the densest layer anywhere:
   in a scan dominated by a wall the densest layer is that wall, and scoring on density alone
   picks the wall's normal as "up". So for each candidate up direction, ask how much material
   sits in a thin band just above its lowest extreme — the floor — and take the clear winner. */
export function detectOrientation(pos: Float32Array): OrientationDetection {
  var N = pos.length / 3, BINS = 512;
  var step = Math.max(1, Math.floor(N / 60000));
  var mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity], i, a, v;
  for (i = 0; i < N; i += step) for (a = 0; a < 3; a++){
    v = pos[i*3 + a]; if (v < mn[a]) mn[a] = v; if (v > mx[a]) mx[a] = v;
  }
  var hist = [new Int32Array(BINS), new Int32Array(BINS), new Int32Array(BINS)], tot = 0;
  for (i = 0; i < N; i += step){
    for (a = 0; a < 3; a++){
      var span = mx[a] - mn[a];
      if (!(span > 0)) continue;
      var b = Math.floor((pos[i*3 + a] - mn[a]) / span * BINS);
      hist[a][b < 0 ? 0 : (b >= BINS ? BINS - 1 : b)]++;
    }
    tot++;
  }
  if (!tot) return { index: 2, confident: false, score: 0, runnerUp: 0, name: 'Z-UP' };

  var bandBins = Math.max(1, Math.round(BINS * 0.03));   // floor band = 3% of the span
  var skip = tot * 0.02;                                  // ignore the lowest 2% as stragglers
  // walking the histogram from one end gives that sign; from the other end gives its opposite
  function floorMass(axis: number, fromLow: boolean): number {
    var h = hist[axis], acc = 0, b, k, startBin = -1;
    for (k = 0; k < BINS; k++){
      b = fromLow ? k : BINS - 1 - k;
      acc += h[b];
      if (acc >= skip){ startBin = k; break; }
    }
    if (startBin < 0) return 0;
    var mass = 0;
    for (k = startBin; k < Math.min(BINS, startBin + bandBins); k++) mass += h[fromLow ? k : BINS - 1 - k];
    return mass / tot;
  }

  // index into ORIENTS for each candidate "up" direction
  var cands: Candidate[] = [
    { axis: 1, low: true,  idx: 0, name: 'Y-UP',   score: 0 },     // floor at min Y
    { axis: 1, low: false, idx: 1, name: 'Y-DOWN', score: 0 },     // floor at max Y
    { axis: 2, low: true,  idx: 2, name: 'Z-UP',   score: 0 },
    { axis: 2, low: false, idx: 3, name: 'Z-DOWN', score: 0 },
    { axis: 0, low: true,  idx: -1, name: 'X-UP',  score: 0 },     // not a real export convention: only
    { axis: 0, low: false, idx: -1, name: 'X-DOWN', score: 0 }     // ever a sign that detection failed
  ];
  var best: Candidate | null = null, second = 0;
  for (i = 0; i < cands.length; i++){
    cands[i].score = floorMass(cands[i].axis, cands[i].low);
    if (!best || cands[i].score > best.score){ if (best) second = best!.score; best = cands[i]; }
    else if (cands[i].score > second) second = cands[i].score;
  }
  if (!best) return { index: 2, confident: false, score: 0, runnerUp: 0, name: 'Z-UP' };
  var confident = best!.idx >= 0 && best!.score > 0.10 && best!.score > second * 1.5;
  return {
    index: best!.idx >= 0 ? best!.idx : 2,                  // fall back to Z-UP, the point-cloud norm
    confident: confident, score: best!.score, runnerUp: second,
    name: best!.idx >= 0 ? best!.name : (best!.name + ' — no usable floor')
  };
}
