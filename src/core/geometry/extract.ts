/* Geometry extraction: splat -> measurable structural facts.
 *
 * Ported verbatim from the single-file build so the numbers do not move: opacity-weighted
 * RANSAC planes with a per-Gaussian tolerance eps_i = K*sqrt(n'*Sigma_i*n), wall verticality
 * as the drift ratio delta = tan(theta), and debris volume by the column method above a
 * detected ground plane. Deliberately NOT a mesh.
 *
 * The only change from the original is the seam: buildWorkingSet used to reach into a
 * three.js Points object for its vertex array and world matrix. It now takes them as data,
 * which keeps this module renderer-free and testable in isolation.
 */
import type {
  DebrisCluster,
  DebrisField,
  DriftBand,
  GeometryResult,
  Plane,
  PlaneClass,
  Vec3,
} from '@/types';

export interface WorkingSetSource {
  positions: Float32Array;
  alphas: Float32Array | null;
  cov: Float32Array | null;
  /** column-major 4x4, three.js Matrix4.elements order */
  matrixWorld: ArrayLike<number>;
}

export interface WorkingSet {
  P: Float32Array;
  A: Float32Array;
  C: Float32Array | null;
  n: number;
  step: number;
}

interface Band extends DriftBand {
  max: number;
}

export type ProgressFn = (planes: number, stage: string, frac: number) => void;

interface Inliers {
  count: number;
  weight: number;
}

/** a candidate plane mid-refinement: normal, offset, and its current inlier set */
interface Fit {
  nx: number;
  ny: number;
  nz: number;
  d: number;
  /** weighted centroid of the inliers */
  cx: number;
  cy: number;
  cz: number;
  res: Inliers;
}

export interface ExtractInput extends WorkingSetSource {
  /** bounding radius of the cloud, sets every scale-relative tolerance */
  radius: number;
}

/** world up after orientation is applied; the "z-hat" of the formulas */
const UP = { x: 0, y: 1, z: 0 };

export const GEO = {
  MAX_PLANES:   16,
  ITER:        420,     // RANSAC hypotheses per plane
  SCORE_N:   12000,     // points scored per hypothesis
  K_SIGMA:     1.0,     // epsilon_i = K * sigma_i, sigma_i^2 = n' Sigma_i n
  MIN_SUPPORT: 0.006,   // stop once the best plane holds under 0.6% of total opacity weight
  MIN_INLIERS:   60,
  CLAIM:       2.5,     // fit tight, claim wide: a surface has thickness, and without this one
                        // thick slab spawns a stack of parallel duplicates
  WORK_CAP: 160000,
  GRID_DIV:     20,     // localized sampling: ~20 cells across the scene
  BUDGET_MS:    12      // work per tick, so the tab never freezes
};

/* drift ratio delta = tan(theta). Bands are indicative engineering practice, not code. */
const DRIFT_BANDS: Band[] = [
  { max: 0.005,    name: 'COSMETIC', hex: 0x7d8896, css: '#7d8896' },
  { max: 0.010,    name: 'MINOR',    hex: 0xffc21f, css: '#ffc21f' },
  { max: 0.020,    name: 'MODERATE', hex: 0xff8a1f, css: '#ff8a1f' },
  { max: Infinity, name: 'SEVERE',   hex: 0xff3b30, css: '#ff3b30' }
];
export function driftBand(d: number): DriftBand {
  for (var i = 0; i < DRIFT_BANDS.length; i++) if (d < DRIFT_BANDS[i].max) return DRIFT_BANDS[i];
  return DRIFT_BANDS[DRIFT_BANDS.length - 1];
}
export const CLS_HEX: Record<string, number> = { slab: 0x4a9eff, incline: 0x35d0c0 };
export const CLS_CSS: Record<string, string> = { slab: '#4a9eff', incline: '#35d0c0' };

/* ---------- 3x3 symmetric eigen-decomposition (cyclic Jacobi) ---------- */
function jacobi3(m: ArrayLike<number>): { vals: number[]; vecs: number[][] } {                       // m = [s00, s01, s02, s11, s12, s22]
  var a = [[m[0], m[1], m[2]], [m[1], m[3], m[4]], [m[2], m[4], m[5]]];
  var v = [[1,0,0],[0,1,0],[0,0,1]];
  for (var sweep = 0; sweep < 12; sweep++){
    if (Math.abs(a[0][1]) + Math.abs(a[0][2]) + Math.abs(a[1][2]) < 1e-16) break;
    for (var p = 0; p < 2; p++) for (var q = p + 1; q < 3; q++){
      if (Math.abs(a[p][q]) < 1e-20) continue;
      var theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);
      var sgn = theta >= 0 ? 1 : -1;
      var t = sgn / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
      var c = 1 / Math.sqrt(t * t + 1), s = t * c, k;
      for (k = 0; k < 3; k++){ var akp = a[k][p], akq = a[k][q]; a[k][p] = c*akp - s*akq; a[k][q] = s*akp + c*akq; }
      for (k = 0; k < 3; k++){ var apk = a[p][k], aqk = a[q][k]; a[p][k] = c*apk - s*aqk; a[q][k] = s*apk + c*aqk; }
      for (k = 0; k < 3; k++){ var vkp = v[k][p], vkq = v[k][q]; v[k][p] = c*vkp - s*vkq; v[k][q] = s*vkp + c*vkq; }
    }
  }
  return { vals: [a[0][0], a[1][1], a[2][2]], vecs: v };   // vecs[row][j] = component row of eigenvector j
}

/* ---------- world-space working set (positions, weights, covariances) ---------- */
export function buildWorkingSet(src: WorkingSetSource): WorkingSet {
  var arr = src.positions;
  var N = arr.length / 3;
  var step = Math.max(1, Math.ceil(N / GEO.WORK_CAP));
  var cap = Math.ceil(N / step);
  var P = new Float32Array(cap * 3), A = new Float32Array(cap);
  var C = src.cov ? new Float32Array(cap * 6) : null;

  var e = src.matrixWorld;
  var m00=e[0], m01=e[4], m02=e[8], m10=e[1], m11=e[5], m12=e[9], m20=e[2], m21=e[6], m22=e[10];
  var tx=e[12], ty=e[13], tz=e[14];

  var k = 0;
  for (var i = 0; i < N && k < cap; i += step){
    var o = i * 3, x = arr[o], y = arr[o+1], z = arr[o+2], q = k * 3;
    P[q]   = m00*x + m01*y + m02*z + tx;
    P[q+1] = m10*x + m11*y + m12*z + ty;
    P[q+2] = m20*x + m21*y + m22*z + tz;
    A[k]   = src.alphas ? src.alphas[i] : 1;
    if (C){                                   // Sigma_world = M Sigma M'
      var cov = src.cov as Float32Array;
      var c = i*6, s00=cov[c], s01=cov[c+1], s02=cov[c+2],
                   s11=cov[c+3], s12=cov[c+4], s22=cov[c+5];
      var t00=m00*s00+m01*s01+m02*s02, t01=m00*s01+m01*s11+m02*s12, t02=m00*s02+m01*s12+m02*s22;
      var t10=m10*s00+m11*s01+m12*s02, t11=m10*s01+m11*s11+m12*s12, t12=m10*s02+m11*s12+m12*s22;
      var t20=m20*s00+m21*s01+m22*s02, t21=m20*s01+m21*s11+m22*s12, t22=m20*s02+m21*s12+m22*s22;
      var d = k*6;
      C[d]   = t00*m00 + t01*m01 + t02*m02;
      C[d+1] = t00*m10 + t01*m11 + t02*m12;
      C[d+2] = t00*m20 + t01*m21 + t02*m22;
      C[d+3] = t10*m10 + t11*m11 + t12*m12;
      C[d+4] = t10*m20 + t11*m21 + t12*m22;
      C[d+5] = t20*m20 + t21*m21 + t22*m22;
    }
    k++;
  }
  return { P: P, A: A, C: C, n: k, step: step };
}

/* ---------- in-plane basis: horizontal u, up-ish v for walls ---------- */
function planeBasis(nx: number, ny: number, nz: number): number[] {
  var ux, uy, uz;
  if (Math.abs(ny) < 0.9){
    ux = nz; uy = 0; uz = -nx;                 // n x up, so u is horizontal and v comes out vertical
  } else {                                     // near-horizontal plane: any in-plane direction will do
    ux = 1 - nx*nx; uy = -nx*ny; uz = -nx*nz;  // x-axis orthogonalised against n
  }
  var L = Math.sqrt(ux*ux + uy*uy + uz*uz);
  if (!(L > 1e-9)){ ux = 1; uy = 0; uz = 0; L = 1; }
  ux /= L; uy /= L; uz /= L;
  var vx = ny*uz - nz*uy, vy = nz*ux - nx*uz, vz = nx*uy - ny*ux;
  return [ux, uy, uz, vx, vy, vz];
}

/* ---------- the extractor: chunked so the UI keeps painting ---------- */
export function extractGeometry(
  input: ExtractInput,
  onProgress: ProgressFn,
  onDone: (g: GeometryResult) => void,
  onFail: (e: Error) => void,
): void {
  // Seeded RNG (mulberry32): RANSAC is randomised, and an operator re-running the extraction
  // must not get a different debris volume each time. Same cloud in, same numbers out.
  var rngState = 0x9E3779B9;
  function rnd(){
    rngState |= 0; rngState = (rngState + 0x6D2B79F5) | 0;
    var t = Math.imul(rngState ^ (rngState >>> 15), 1 | rngState);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  var ws = buildWorkingSet(input);
  if (ws.n < 200){ onFail(new Error('only ' + ws.n + ' points in the working set — too few to fit anything')); return; }

  var P = ws.P, A = ws.A, C = ws.C;
  var R = input.radius || 10;
  var K2 = GEO.K_SIGMA * GEO.K_SIGMA;
  var EPS_FIX2 = Math.pow(0.004 * R, 2);        // no covariance: one global tolerance from scene scale
  var EPS_MIN2 = Math.pow(0.0015 * R, 2);
  var EPS_MAX2 = Math.pow(0.02 * R, 2);

  var remaining = new Int32Array(ws.n);
  for (var i = 0; i < ws.n; i++) remaining[i] = i;
  var remCount = ws.n;
  var inl = new Int32Array(ws.n);
  var totalW = 0;
  for (i = 0; i < ws.n; i++) totalW += A[i];

  var planes: Plane[] = [], iter = 0, best: number[] | null = null, bestScore = 0,
      stage = 'ransac', gridDirty = true;
  var result: GeometryResult | null = null;
  var t0 = performance.now();

  function eps2At(i: number, nx: number, ny: number, nz: number): number {
    if (!C) return EPS_FIX2;
    var c = i * 6;
    var vv = nx*(C[c]*nx + C[c+1]*ny + C[c+2]*nz)
           + ny*(C[c+1]*nx + C[c+3]*ny + C[c+4]*nz)
           + nz*(C[c+2]*nx + C[c+4]*ny + C[c+5]*nz);
    var e2 = K2 * vv;
    return e2 < EPS_MIN2 ? EPS_MIN2 : (e2 > EPS_MAX2 ? EPS_MAX2 : e2);
  }

  /* weighted score of one hypothesis over a strided sample of what is left */
  function scoreOf(nx: number, ny: number, nz: number, d: number): number {
    var stride = Math.max(1, Math.floor(remCount / GEO.SCORE_N));
    var off = (rnd() * stride) | 0, s = 0;
    for (var k = off; k < remCount; k += stride){
      var idx = remaining[k], o = idx * 3;
      var r = nx*P[o] + ny*P[o+1] + nz*P[o+2] - d;
      if (r*r < eps2At(idx, nx, ny, nz)) s += A[idx];
    }
    return s * stride;                          // rescale the sample back to full support
  }

  function collect(nx: number, ny: number, nz: number, d: number, widen?: number): Inliers {
    var kk = widen ? widen * widen : 1, cnt = 0, wsum = 0;
    for (var k = 0; k < remCount; k++){
      var idx = remaining[k], o = idx * 3;
      var r = nx*P[o] + ny*P[o+1] + nz*P[o+2] - d;
      if (r*r < eps2At(idx, nx, ny, nz) * kk){ inl[cnt++] = idx; wsum += A[idx]; }
    }
    return { count: cnt, weight: wsum };
  }

  /* Uniform 3-point sampling cannot find a small plane: if a wall holds 1.4% of the points,
     P(all three land on it) is 3e-6 and 420 hypotheses find nothing. Points on one surface are
     spatially close, so seed from a random point and draw its partners from the same grid cell. */
  var gCell = 0, gnx = 1, gny = 1, gnz = 1, gminx = 0, gminy = 0, gminz = 0;
  var cStart: Int32Array | null = null, cItems: Int32Array | null = null;

  function buildGrid(){
    gminx = Infinity; gminy = Infinity; gminz = Infinity;
    var maxx = -Infinity, maxy = -Infinity, maxz = -Infinity, k, idx, o;
    for (k = 0; k < remCount; k++){
      idx = remaining[k]; o = idx*3;
      if (P[o]   < gminx) gminx = P[o];   if (P[o]   > maxx) maxx = P[o];
      if (P[o+1] < gminy) gminy = P[o+1]; if (P[o+1] > maxy) maxy = P[o+1];
      if (P[o+2] < gminz) gminz = P[o+2]; if (P[o+2] > maxz) maxz = P[o+2];
    }
    var span = Math.max(maxx-gminx, maxy-gminy, maxz-gminz, 1e-6);
    gCell = span / GEO.GRID_DIV;
    gnx = Math.min(48, Math.max(1, Math.ceil((maxx-gminx) / gCell) + 1));
    gny = Math.min(48, Math.max(1, Math.ceil((maxy-gminy) / gCell) + 1));
    gnz = Math.min(48, Math.max(1, Math.ceil((maxz-gminz) / gCell) + 1));
    var nc = gnx*gny*gnz;
    cStart = new Int32Array(nc + 1);
    cItems = new Int32Array(remCount);
    for (k = 0; k < remCount; k++) cStart![cellOf(remaining[k]) + 1]++;
    for (k = 0; k < nc; k++) cStart![k+1] += cStart![k];
    var fill = new Int32Array(nc);
    for (k = 0; k < remCount; k++){
      var c = cellOf(remaining[k]);
      cItems![cStart![c] + fill[c]++] = remaining[k];
    }
  }
  function cellOf(i: number): number {
    var o = i*3;
    var ix = Math.min(gnx-1, Math.max(0, ((P[o]   - gminx) / gCell) | 0));
    var iy = Math.min(gny-1, Math.max(0, ((P[o+1] - gminy) / gCell) | 0));
    var iz = Math.min(gnz-1, Math.max(0, ((P[o+2] - gminz) / gCell) | 0));
    return (iz*gny + iy)*gnx + ix;
  }
  function pickIn(c: number): number {
    var st = cStart![c], en = cStart![c+1];
    return en > st ? cItems![st + ((rnd() * (en - st)) | 0)] : -1;
  }
  function pickNear(i1: number): number {
    var o = i1*3;
    var ix = Math.min(gnx-1, Math.max(0, ((P[o]   - gminx) / gCell) | 0));
    var iy = Math.min(gny-1, Math.max(0, ((P[o+1] - gminy) / gCell) | 0));
    var iz = Math.min(gnz-1, Math.max(0, ((P[o+2] - gminz) / gCell) | 0));
    var jx = Math.min(gnx-1, Math.max(0, ix + ((rnd()*3)|0) - 1));
    var jy = Math.min(gny-1, Math.max(0, iy + ((rnd()*3)|0) - 1));
    var jz = Math.min(gnz-1, Math.max(0, iz + ((rnd()*3)|0) - 1));
    return pickIn((jz*gny + jy)*gnx + jx);
  }

  function hypothesise(): number[] | null {
    var i1 = remaining[(rnd()*remCount)|0];
    var c1 = cellOf(i1);
    var i2 = pickIn(c1), i3 = pickIn(c1);
    if (i2 < 0 || i3 < 0 || i2 === i1 || i3 === i1 || i2 === i3){
      i2 = pickNear(i1); i3 = pickNear(i1);                  // widen to the 3x3x3 neighbourhood
    }
    if (i2 < 0 || i3 < 0) { i2 = remaining[(rnd()*remCount)|0]; i3 = remaining[(rnd()*remCount)|0]; }
    if (i1 === i2 || i2 === i3 || i1 === i3) return null;
    var a = i1*3, b = i2*3, c = i3*3;
    var ax = P[a], ay = P[a+1], az = P[a+2];
    var ux = P[b]-ax, uy = P[b+1]-ay, uz = P[b+2]-az;
    var vx = P[c]-ax, vy = P[c+1]-ay, vz = P[c+2]-az;
    var nx = uy*vz - uz*vy, ny = uz*vx - ux*vz, nz = ux*vy - uy*vx;
    var L = Math.sqrt(nx*nx + ny*ny + nz*nz);
    var lu = Math.sqrt(ux*ux+uy*uy+uz*uz), lv = Math.sqrt(vx*vx+vy*vy+vz*vz);
    if (L < 1e-6 * lu * lv || L < 1e-12) return null;      // reject collinear slivers
    return [nx/L, ny/L, nz/L, (nx*ax + ny*ay + nz*az) / L];
  }

  /* weighted PCA refinement: the normal is the smallest-eigenvalue direction of the inlier scatter */
  function refine(h: number[]): Fit | null {
    var nx = h[0], ny = h[1], nz = h[2], d = h[3], res = null, cx = 0, cy = 0, cz = 0;
    for (var pass = 0; pass < 2; pass++){
      res = collect(nx, ny, nz, d);
      if (res.count < GEO.MIN_INLIERS) return null;
      var sw = 0, j, idx, o, wgt;
      cx = 0; cy = 0; cz = 0;
      for (j = 0; j < res.count; j++){
        idx = inl[j]; o = idx*3; wgt = A[idx];
        sw += wgt; cx += wgt*P[o]; cy += wgt*P[o+1]; cz += wgt*P[o+2];
      }
      if (!(sw > 0)) return null;
      cx /= sw; cy /= sw; cz /= sw;
      var xx=0, xy=0, xz=0, yy=0, yz=0, zz=0;
      for (j = 0; j < res.count; j++){
        idx = inl[j]; o = idx*3; wgt = A[idx];
        var dx = P[o]-cx, dy = P[o+1]-cy, dz = P[o+2]-cz;
        xx += wgt*dx*dx; xy += wgt*dx*dy; xz += wgt*dx*dz;
        yy += wgt*dy*dy; yz += wgt*dy*dz; zz += wgt*dz*dz;
      }
      var ev = jacobi3([xx, xy, xz, yy, yz, zz]);
      var mi = 0;
      if (ev.vals[1] < ev.vals[mi]) mi = 1;
      if (ev.vals[2] < ev.vals[mi]) mi = 2;
      var ex = ev.vecs[0][mi], ey = ev.vecs[1][mi], ez = ev.vecs[2][mi];
      var L = Math.sqrt(ex*ex + ey*ey + ez*ez);
      if (!(L > 1e-9)) return null;
      nx = ex/L; ny = ey/L; nz = ez/L;
      d = nx*cx + ny*cy + nz*cz;
    }
    res = collect(nx, ny, nz, d);
    if (res.count < GEO.MIN_INLIERS) return null;
    return { nx: nx, ny: ny, nz: nz, d: d, cx: cx, cy: cy, cz: cz, res: res };
  }

  function finalisePlane(f: Fit): Plane {
    var nx = f.nx, ny = f.ny, nz = f.nz, d = f.d, cnt = f.res.count;
    if (ny < 0){ nx = -nx; ny = -ny; nz = -nz; d = -d; }    // orient consistently (normals point up-ish)
    var bs = planeBasis(nx, ny, nz);
    var ux=bs[0], uy=bs[1], uz=bs[2], vx=bs[3], vy=bs[4], vz=bs[5];

    var sw = 0, cx = 0, cy = 0, cz = 0, j, idx, o, wgt;
    for (j = 0; j < cnt; j++){ idx = inl[j]; o = idx*3; wgt = A[idx]; sw += wgt; cx += wgt*P[o]; cy += wgt*P[o+1]; cz += wgt*P[o+2]; }
    cx /= sw; cy /= sw; cz /= sw;

    var umin = Infinity, umax = -Infinity, vmin = Infinity, vmax = -Infinity, sr2 = 0;
    var uu = new Float32Array(cnt), vv = new Float32Array(cnt);
    for (j = 0; j < cnt; j++){
      idx = inl[j]; o = idx*3;
      var dx = P[o]-cx, dy = P[o+1]-cy, dz = P[o+2]-cz;
      var a = dx*ux + dy*uy + dz*uz, b = dx*vx + dy*vy + dz*vz;
      uu[j] = a; vv[j] = b;
      if (a < umin) umin = a; if (a > umax) umax = a;
      if (b < vmin) vmin = b; if (b > vmax) vmax = b;
      var r = dx*nx + dy*ny + dz*nz;
      sr2 += A[idx] * r * r;
    }
    var rms = Math.sqrt(sr2 / sw);

    // occupancy area: rasterise the inliers in plane coords, so an L-shaped wall is not
    // credited with its whole bounding rectangle
    var du = Math.max(umax - umin, 1e-6), dv = Math.max(vmax - vmin, 1e-6);
    var cell = Math.max(Math.sqrt(du*dv) / 48, 1e-6);
    var gw = Math.min(256, Math.max(1, Math.ceil(du / cell))) , gh = Math.min(256, Math.max(1, Math.ceil(dv / cell)));
    var occ = new Uint8Array(gw * gh);
    var uh = new Int32Array(gw), vh = new Int32Array(gh);
    for (j = 0; j < cnt; j++){
      var gi = Math.min(gw-1, Math.max(0, Math.floor((uu[j]-umin) / du * gw)));
      var gj = Math.min(gh-1, Math.max(0, Math.floor((vv[j]-vmin) / dv * gh)));
      occ[gj*gw + gi] = 1;
      uh[gi]++; vh[gj]++;
    }
    // A handful of stragglers must not stretch the patch across the whole scene: trim the extent
    // to the 1st-99th percentile of the material, and measure area inside that trim.
    function trim(hist: ArrayLike<number>, n: number): number[] {
      var lo = 0, hi = hist.length - 1, acc = 0, cut = n * 0.01, k;
      for (k = 0; k < hist.length; k++){ acc += hist[k]; if (acc >= cut){ lo = k; break; } }
      acc = 0;
      for (k = hist.length - 1; k >= 0; k--){ acc += hist[k]; if (acc >= cut){ hi = k; break; } }
      if (hi < lo) { lo = 0; hi = hist.length - 1; }
      return [lo, hi];
    }
    var tu = trim(uh, cnt), tv = trim(vh, cnt);
    var cwu = du / gw, cwv = dv / gh;

    /* A plane is the material that hangs together, not everything that happens to be coplanar with it.
       Where a wall meets a floor the junction line is genuinely in the floor's plane and would stretch
       its patch across the room, so keep only connected regions worth at least a fifth of the largest. */
    var comp = new Int32Array(gw * gh).fill(-1), sizes: number[] = [], stack: number[] = [];
    for (var cj = tv[0]; cj <= tv[1]; cj++) for (var ci = tu[0]; ci <= tu[1]; ci++){
      var c0 = cj*gw + ci;
      if (!occ[c0] || comp[c0] >= 0) continue;
      var id = sizes.length, n2 = 0;
      stack.length = 0; stack.push(c0); comp[c0] = id;
      while (stack.length){
        var cur = stack.pop() as number; n2++;
        var xi = cur % gw, yj = (cur / gw) | 0;
        for (var ddi = -1; ddi <= 1; ddi++) for (var ddj = -1; ddj <= 1; ddj++){
          if (!ddi && !ddj) continue;
          var ni = xi + ddi, nj = yj + ddj;
          if (ni < tu[0] || ni > tu[1] || nj < tv[0] || nj > tv[1]) continue;
          var nk = nj*gw + ni;
          if (!occ[nk] || comp[nk] >= 0) continue;
          comp[nk] = id; stack.push(nk);
        }
      }
      sizes.push(n2);
    }
    var biggest = 0;
    for (var si = 0; si < sizes.length; si++) if (sizes[si] > biggest) biggest = sizes[si];
    var keepMin = biggest * 0.2;
    var used = 0, kui0 = Infinity, kui1 = -Infinity, kvj0 = Infinity, kvj1 = -Infinity;
    for (cj = tv[0]; cj <= tv[1]; cj++) for (ci = tu[0]; ci <= tu[1]; ci++){
      var ck = cj*gw + ci;
      if (comp[ck] < 0 || sizes[comp[ck]] < keepMin) continue;
      used++;
      if (ci < kui0) kui0 = ci; if (ci > kui1) kui1 = ci;
      if (cj < kvj0) kvj0 = cj; if (cj > kvj1) kvj1 = cj;
    }
    if (used === 0){ kui0 = tu[0]; kui1 = tu[1]; kvj0 = tv[0]; kvj1 = tv[1]; used = 1; }
    var cellA = cwu * cwv;
    var area = used * cellA;
    var nUmin = umin + kui0 * cwu, nUmax = umin + (kui1 + 1) * cwu;
    var nVmin = vmin + kvj0 * cwv, nVmax = vmin + (kvj1 + 1) * cwv;
    umin = nUmin; umax = nUmax; vmin = nVmin; vmax = nVmax;
    var bboxA = Math.max((umax - umin) * (vmax - vmin), 1e-9);

    // classification and the numbers that matter
    var c = Math.abs(nx*UP.x + ny*UP.y + nz*UP.z);          // |n . z-hat|
    var cls: PlaneClass, tilt: number, drift: number | null = null, band: DriftBand | null = null;
    if (c >= 0.906){                                        // within 25 deg of horizontal
      cls = 'slab';  tilt = Math.acos(Math.min(1, c));       // tilt away from level
    } else if (c <= 0.423){                                 // within 25 deg of vertical
      cls = 'wall';  tilt = Math.asin(Math.min(1, c));       // tilt away from plumb
      drift = Math.tan(tilt);                                // the drift ratio engineers use
      band = driftBand(drift);
    } else {
      cls = 'incline'; tilt = Math.acos(Math.min(1, c));     // lean-to / collapsed slab angle
    }

    return {
      id: planes.length + 1,
      label: (cls === 'wall' ? 'W' : cls === 'slab' ? 'S' : 'I') + (planes.length + 1),
      n: [nx, ny, nz], d: d, centroid: [cx, cy, cz],
      u: [ux, uy, uz], v: [vx, vy, vz],
      umin: umin, umax: umax, vmin: vmin, vmax: vmax,
      count: cnt, weight: sw, support: sw / totalW,
      area: area, bboxArea: bboxA, fill: Math.min(1, area / bboxA),
      rms: rms, cls: cls, tilt: tilt, drift: drift, band: band
    };
  }

  /* The tight fit can sit off-centre inside a thick surface, leaving a sliver that fits as its own
     plane. Recentre the claim band on the weighted mean of the wide inliers before removing them. */
  function claimBand(nx: number, ny: number, nz: number, d: number): Inliers {
    var wide = collect(nx, ny, nz, d, GEO.CLAIM);
    var sw = 0, sr = 0;
    for (var j = 0; j < wide.count; j++){
      var idx = inl[j], o = idx*3, wgt = A[idx];
      sw += wgt; sr += wgt * (nx*P[o] + ny*P[o+1] + nz*P[o+2] - d);
    }
    if (sw > 0) wide = collect(nx, ny, nz, d + sr/sw, GEO.CLAIM);
    return wide;
  }

  /* one plane per physical surface: parallel, close, and overlapping means it is the same thing */
  // two planes whose claim bands overlap are the same material, so this follows CLAIM rather
  // than being a free parameter
  var DEDUP_SEP = 2 * GEO.CLAIM * Math.sqrt(EPS_FIX2);
  function coplanarWith(f: Fit): Plane | null {
    for (var i = 0; i < planes.length; i++){
      var q = planes[i];
      if (Math.abs(f.nx*q.n[0] + f.ny*q.n[1] + f.nz*q.n[2]) < 0.995) continue;
      if (Math.abs(f.nx*q.centroid[0] + f.ny*q.centroid[1] + f.nz*q.centroid[2] - f.d) > DEDUP_SEP) continue;
      var dx = f.cx - q.centroid[0], dy = f.cy - q.centroid[1], dz = f.cz - q.centroid[2];
      var a = dx*q.u[0] + dy*q.u[1] + dz*q.u[2], b = dx*q.v[0] + dy*q.v[1] + dz*q.v[2];
      var mu = (q.umax - q.umin) * 0.25, mv = (q.vmax - q.vmin) * 0.25;
      if (a < q.umin - mu || a > q.umax + mu || b < q.vmin - mv || b > q.vmax + mv) continue;
      return q;                                   // same surface, already recorded
    }
    return null;
  }

  function removeInliers(cnt: number): void {
    var keep = new Uint8Array(ws.n);
    for (var j = 0; j < cnt; j++) keep[inl[j]] = 1;
    var w = 0;
    for (var k = 0; k < remCount; k++){ var idx = remaining[k]; if (!keep[idx]) remaining[w++] = idx; }
    remCount = w;
  }

  /* ---------- debris: 2.5D column volume above the ground plane ---------- */
  function debrisField(): DebrisField {
    var groundY = null, gp = null;
    for (var i = 0; i < planes.length; i++){
      var pl = planes[i];
      if (pl.cls !== 'slab' || pl.support < 0.03) continue;
      if (groundY === null || pl.centroid[1] < groundY){ groundY = pl.centroid[1]; gp = pl; }
    }
    if (groundY === null){                                   // no slab found: use a low percentile of y
      var ys = [];
      for (i = 0; i < ws.n; i += Math.max(1, Math.floor(ws.n / 5000))) ys.push(P[i*3+1]);
      ys.sort(function(a,b){ return a-b; });
      groundY = ys[Math.floor(ys.length * 0.02)] || 0;
    }

    if (remCount < 50) return { groundY: groundY, groundPlane: gp ? gp.label : null, clusters: [], totalVolume: 0, cell: 0 };

    var minx = Infinity, maxx = -Infinity, minz = Infinity, maxz = -Infinity, k, idx, o;
    for (k = 0; k < remCount; k++){
      idx = remaining[k]; o = idx*3;
      if (P[o] < minx) minx = P[o]; if (P[o] > maxx) maxx = P[o];
      if (P[o+2] < minz) minz = P[o+2]; if (P[o+2] > maxz) maxz = P[o+2];
    }
    var cell = Math.max((maxx - minx + maxz - minz) / 2 / 96, R / 400);
    var gw = Math.min(400, Math.max(2, Math.ceil((maxx - minx) / cell) + 1));
    var gh = Math.min(400, Math.max(2, Math.ceil((maxz - minz) / cell) + 1));
    var cw = (maxx - minx) / gw || cell, ch = (maxz - minz) / gh || cell;
    var H = new Float32Array(gw * gh);
    for (k = 0; k < remCount; k++){
      idx = remaining[k]; o = idx*3;
      var h = P[o+1] - groundY;
      if (h <= 0) continue;
      var gi = Math.min(gw-1, Math.max(0, Math.floor((P[o] - minx) / cw)));
      var gj = Math.min(gh-1, Math.max(0, Math.floor((P[o+2] - minz) / ch)));
      var gk2 = gj*gw + gi;
      if (h > H[gk2]) H[gk2] = h;
    }

    var hmin = 0.02 * R, seen = new Uint8Array(gw * gh), clusters: DebrisCluster[] = [], cellArea = cw * ch, total = 0;
    var stack: number[] = [];
    for (var s = 0; s < gw*gh; s++){
      if (seen[s] || H[s] <= hmin) continue;
      stack.length = 0; stack.push(s); seen[s] = 1;
      var vol = 0, cells = 0, maxh = 0, sx = 0, sz = 0;
      while (stack.length){
        var cur = stack.pop() as number;
        var ci = cur % gw, cj = (cur / gw) | 0, hh = H[cur];
        vol += hh * cellArea; cells++;
        if (hh > maxh) maxh = hh;
        sx += minx + (ci + 0.5) * cw; sz += minz + (cj + 0.5) * ch;
        for (var di = -1; di <= 1; di++) for (var dj = -1; dj <= 1; dj++){
          if (!di && !dj) continue;
          var ni = ci + di, nj = cj + dj;
          if (ni < 0 || nj < 0 || ni >= gw || nj >= gh) continue;
          var nk = nj*gw + ni;
          if (seen[nk] || H[nk] <= hmin) continue;
          seen[nk] = 1; stack.push(nk);
        }
      }
      total += vol;
      if (cells >= 4) clusters.push({ id: 0, volume: vol, footprint: cells * cellArea, maxHeight: maxh,
                                      centre: [sx/cells, groundY, sz/cells], cells: cells });
    }
    clusters.sort(function(a,b){ return b.volume - a.volume; });
    clusters = clusters.slice(0, 10);
    for (var ci2 = 0; ci2 < clusters.length; ci2++) clusters[ci2].id = ci2 + 1;
    return { groundY: groundY, groundPlane: gp ? gp.label : null, clusters: clusters,
             totalVolume: total, cell: cell };
  }

  /* ---------- the pump ---------- */
  function step(): boolean {
    if (stage === 'ransac'){
      if (gridDirty){ buildGrid(); gridDirty = false; return false; }
      var batch = 40;
      while (batch-- > 0 && iter < GEO.ITER){
        iter++;
        var h = hypothesise();
        if (!h) continue;
        var sc = scoreOf(h[0], h[1], h[2], h[3]);
        if (sc > bestScore){ bestScore = sc; best = h; }
      }
      if (iter >= GEO.ITER) stage = 'commit';
      return false;
    }
    if (stage === 'commit'){
      var done = false;
      if (!best || bestScore < GEO.MIN_SUPPORT * totalW) done = true;
      else {
        var f = refine(best);
        if (!f || f.res.weight < GEO.MIN_SUPPORT * totalW) done = true;
        else {
          var dup = coplanarWith(f);
          if (dup){                            // same physical surface: absorb, do not record again
            var band = claimBand(f.nx, f.ny, f.nz, f.d);
            dup.claimed = (dup.claimed || dup.count) + band.count;
            removeInliers(band.count);
          } else {
            var pl = finalisePlane(f);         // stats come from the tight fit
            planes.push(pl);
            var wide = claimBand(pl.n[0], pl.n[1], pl.n[2], pl.d);
            pl.claimed = wide.count;           // but the whole thickness leaves the pool
            removeInliers(wide.count);
          }
          gridDirty = true;
        }
      }
      if (done || planes.length >= GEO.MAX_PLANES || remCount < Math.max(400, ws.n * 0.02)) stage = 'debris';
      else { iter = 0; best = null; bestScore = 0; stage = 'ransac'; }
      return false;
    }
    if (stage === 'debris'){
      var deb = debrisField();
      var residualW = 0;
      for (var k = 0; k < remCount; k++) residualW += A[remaining[k]];
      result = {
        planes: planes, debris: deb,
        workingSet: ws.n, sampleStep: ws.step, radius: R,
        usedCovariance: !!C, totalWeight: totalW,
        residualPoints: remCount, residualFrac: residualW / totalW,
        ms: Math.round(performance.now() - t0)
      };
      stage = 'done';
      return true;
    }
    return true;
  }

  function pump(): void {
    var tick = performance.now();
    try {
      while (performance.now() - tick < GEO.BUDGET_MS){
        if (step()){ onDone(result as GeometryResult); return; }
      }
    } catch (err){ onFail(err instanceof Error ? err : new Error(String(err))); return; }
    onProgress(planes.length, stage, 1 - remCount / ws.n);
    setTimeout(pump, 0);
  }
  setTimeout(pump, 0);
}


/* ---------- geometry attached to a site (evidence, not a slider value) ---------- */
/* ---------- geometry attached to a site (evidence, not a slider value) ---------- */
export function nearestPlane(
  site: { pos: Vec3 },
  g: GeometryResult | null,
): { plane: Plane; index: number; dist: number } | null {
  if (!g) return null;
  var best: { plane: Plane; index: number; dist: number } | null = null, bd = Infinity;
  for (var i = 0; i < g.planes.length; i++){
    var p = g.planes[i];
    var dx = site.pos.x - p.centroid[0], dy = site.pos.y - p.centroid[1], dz = site.pos.z - p.centroid[2];
    var dist = Math.abs(dx*p.n[0] + dy*p.n[1] + dz*p.n[2]);
    var a = dx*p.u[0] + dy*p.u[1] + dz*p.u[2];
    var b = dx*p.v[0] + dy*p.v[1] + dz*p.v[2];
    var mu = (p.umax - p.umin) * 0.12, mv = (p.vmax - p.vmin) * 0.12;   // small tolerance outside the patch
    if (a < p.umin - mu || a > p.umax + mu || b < p.vmin - mv || b > p.vmax + mv) continue;
    if (dist < bd){ bd = dist; best = { plane: p, index: i, dist: dist }; }
  }
  if (!best || bd > 0.05 * g.radius) return null;
  return best;
}
