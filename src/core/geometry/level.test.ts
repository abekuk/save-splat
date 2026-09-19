import { describe, expect, it } from 'vitest';
import { estimateGround } from './level';

/** A floor plane with a given normal, plus a bit of clutter above it. */
function scene(normal: [number, number, number], n = 4000): Float32Array {
  const [nx, ny, nz] = normal;
  // build two in-plane axes
  const ax: [number, number, number] =
    Math.abs(nx) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  const u = [
    ay(ax, [nx, ny, nz])[0],
    ay(ax, [nx, ny, nz])[1],
    ay(ax, [nx, ny, nz])[2],
  ];
  const v = [ny * u[2] - nz * u[1], nz * u[0] - nx * u[2], nx * u[1] - ny * u[0]];
  const out = new Float32Array(n * 3);
  let seed = 1;
  const r = (): number => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 0; i < n; i++) {
    const a = (r() - 0.5) * 8;
    const b = (r() - 0.5) * 8;
    // 75% on the floor, 25% scattered above it along +normal
    const h = i % 4 === 0 ? r() * 2.5 : (r() - 0.5) * 0.02;
    out[i * 3] = a * u[0] + b * v[0] + nx * h;
    out[i * 3 + 1] = a * u[1] + b * v[1] + ny * h;
    out[i * 3 + 2] = a * u[2] + b * v[2] + nz * h;
  }
  return out;
}
// orthogonalise `a` against `n`
function ay(a: number[], n: number[]): number[] {
  const d = a[0] * n[0] + a[1] * n[1] + a[2] * n[2];
  const o = [a[0] - d * n[0], a[1] - d * n[1], a[2] - d * n[2]];
  const L = Math.hypot(o[0], o[1], o[2]);
  return [o[0] / L, o[1] / L, o[2] / L];
}

const dot = (a: number[], b: number[]): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

describe('estimateGround', () => {
  it('finds a Y-up floor', () => {
    const g = estimateGround(scene([0, 1, 0]));
    expect(g).not.toBeNull();
    expect(dot(g!.normal, [0, 1, 0])).toBeGreaterThan(0.98);
  });

  it('finds a floor at an arbitrary rotation, which is the whole point', () => {
    // no axis flip can level this — it is what a COLMAP scene looks like
    const n: [number, number, number] = [0.37, 0.72, -0.59];
    const L = Math.hypot(...n);
    const unit: [number, number, number] = [n[0] / L, n[1] / L, n[2] / L];
    const g = estimateGround(scene(unit));
    expect(g).not.toBeNull();
    expect(Math.abs(dot(g!.normal, unit))).toBeGreaterThan(0.97);
  });

  it('points the normal at the bulk of the scene, not away from it', () => {
    // the clutter sits along +normal, so the estimate must agree in sign
    const g = estimateGround(scene([0, 1, 0]));
    expect(dot(g!.normal, [0, 1, 0])).toBeGreaterThan(0);
  });

  it('reports the share of points it fitted', () => {
    const g = estimateGround(scene([0, 1, 0]));
    expect(g!.support).toBeGreaterThan(0.5);
    expect(g!.support).toBeLessThanOrEqual(1);
  });

  it('returns null rather than guessing on too few points', () => {
    expect(estimateGround(new Float32Array([0, 0, 0, 1, 1, 1]))).toBeNull();
  });

  it('is deterministic', () => {
    const s = scene([0, 1, 0]);
    expect(estimateGround(s)!.normal).toEqual(estimateGround(s)!.normal);
  });
});
