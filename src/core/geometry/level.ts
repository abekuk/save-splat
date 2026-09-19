/* Estimating which way is up, for scans that carry no convention.
 *
 * ARKit exports know where gravity is, so detecting one of four axis conventions is enough.
 * A COLMAP-derived 3DGS scene does not: its orientation is whatever the solver landed on,
 * an arbitrary rotation, and no axis flip will make a floor level. Everything this app
 * measures — verticality, slab tilt, debris height above ground — is defined against up, so
 * on those scans every number is meaningless until the scene is levelled.
 *
 * The assumption: the largest planar surface in a scan of a built space is the ground. That
 * holds for rooms, streets and rubble fields, and fails for a scan that is mostly one wall —
 * which is why the caller is told how much support the winning plane had and can refuse it.
 */

export interface GroundEstimate {
  /** unit normal, already flipped so it points towards the bulk of the scene */
  normal: [number, number, number];
  /** share of sampled points lying on the plane, 0..1 */
  support: number;
}

/** Lightweight RANSAC for the dominant plane. Deliberately separate from the main
 *  extractor: this runs before orientation is known, on raw positions, and needs to be
 *  fast rather than exact. Seeded, so levelling is reproducible. */
export function estimateGround(positions: Float32Array, iterations = 260): GroundEstimate | null {
  const n = Math.floor(positions.length / 3);
  if (n < 200) return null;

  // stride-sample to a workable size
  const step = Math.max(1, Math.floor(n / 40000));
  const idx: number[] = [];
  for (let i = 0; i < n; i += step) idx.push(i);
  const m = idx.length;
  if (m < 100) return null;

  // extent, to scale the inlier tolerance
  let minx = Infinity, miny = Infinity, minz = Infinity;
  let maxx = -Infinity, maxy = -Infinity, maxz = -Infinity;
  for (const i of idx) {
    const x = positions[i * 3], y = positions[i * 3 + 1], z = positions[i * 3 + 2];
    if (x < minx) minx = x;
    if (x > maxx) maxx = x;
    if (y < miny) miny = y;
    if (y > maxy) maxy = y;
    if (z < minz) minz = z;
    if (z > maxz) maxz = z;
  }
  const span = Math.max(maxx - minx, maxy - miny, maxz - minz);
  if (!(span > 0)) return null;
  const eps = span * 0.012;

  let seed = 0x9e3779b9;
  const rnd = (): number => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const pick = (): number => idx[(rnd() * m) | 0];

  let bestN: [number, number, number] | null = null;
  let bestCount = 0;

  for (let it = 0; it < iterations; it++) {
    const a = pick(), b = pick(), c = pick();
    if (a === b || b === c || a === c) continue;
    const ax = positions[a * 3], ay = positions[a * 3 + 1], az = positions[a * 3 + 2];
    const ux = positions[b * 3] - ax, uy = positions[b * 3 + 1] - ay, uz = positions[b * 3 + 2] - az;
    const vx = positions[c * 3] - ax, vy = positions[c * 3 + 1] - ay, vz = positions[c * 3 + 2] - az;
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const L = Math.hypot(nx, ny, nz);
    if (!(L > 1e-9)) continue;
    nx /= L; ny /= L; nz /= L;
    const d = nx * ax + ny * ay + nz * az;

    let count = 0;
    for (const i of idx) {
      const r = nx * positions[i * 3] + ny * positions[i * 3 + 1] + nz * positions[i * 3 + 2] - d;
      if (r < eps && r > -eps) count++;
    }
    if (count > bestCount) {
      bestCount = count;
      bestN = [nx, ny, nz];
    }
  }

  if (!bestN || bestCount < m * 0.04) return null;

  // Point the normal at the bulk of the scene: the ground has the building above it, so the
  // side holding more material is up.
  //
  // The comparison is against the PLANE's own offset, found as the densest slab along the
  // normal. Comparing against the mean of all points instead flips the answer at random,
  // because the floor is where most points already are, so the mean sits on the plane.
  const [nx, ny, nz] = bestN;
  const proj = (i: number): number =>
    nx * positions[i * 3] + ny * positions[i * 3 + 1] + nz * positions[i * 3 + 2];

  let lo = Infinity;
  let hi = -Infinity;
  let sum = 0;
  for (const i of idx) {
    const p = proj(i);
    if (p < lo) lo = p;
    if (p > hi) hi = p;
    sum += p;
  }
  const BINS = 128;
  const width = hi - lo || 1;
  const hist = new Float64Array(BINS);
  for (const i of idx) {
    const b = Math.min(BINS - 1, Math.max(0, Math.floor(((proj(i) - lo) / width) * BINS)));
    hist[b]++;
  }
  let peak = 0;
  for (let b = 1; b < BINS; b++) if (hist[b] > hist[peak]) peak = b;
  const dPlane = lo + ((peak + 0.5) / BINS) * width;
  const flip = sum / m < dPlane ? -1 : 1;

  return {
    normal: [nx * flip, ny * flip, nz * flip],
    support: bestCount / m,
  };
}
