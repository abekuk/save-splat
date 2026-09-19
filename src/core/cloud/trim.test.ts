import { describe, it, expect } from 'vitest';
import { robustExtent, trimFarField, FAR_FACTOR } from './trim';
import type { PlyResult } from '@/types';

function cloud(pts: number[][]): PlyResult {
  const n = pts.length;
  const positions = new Float32Array(n * 3);
  pts.forEach((p, i) => positions.set(p, i * 3));
  return {
    positions,
    colors: new Float32Array(n * 3).fill(0.5),
    alphas: new Float32Array(n).fill(1),
    cov: null,
    total: n,
    kept: n,
    step: 1,
    culled: 0,
    colorSource: 'test',
    format: 'test',
  };
}

/** A blob of `n` points inside `r`, plus `far` points out on a shell at `shellR`. */
function scene(n: number, r: number, far: number, shellR: number): PlyResult {
  const pts: number[][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i * 2.399) % (Math.PI * 2),
      b = (i * 1.111) % Math.PI;
    const rad = r * ((i % 97) / 97);
    pts.push([rad * Math.sin(b) * Math.cos(a), rad * Math.cos(b), rad * Math.sin(b) * Math.sin(a)]);
  }
  for (let i = 0; i < far; i++) {
    const a = (i * 2.399) % (Math.PI * 2);
    pts.push([shellR * Math.cos(a), 0, shellR * Math.sin(a)]);
  }
  return cloud(pts);
}

describe('robustExtent', () => {
  it('reports the scene, not the furthest straggler', () => {
    const e = robustExtent(scene(2000, 2.3, 90, 241).positions);
    expect(e.radius).toBeLessThan(4);
    expect(e.maxRadius).toBeGreaterThan(200);
  });

  it('centres on the median, so it is not dragged by a distant shell', () => {
    const e = robustExtent(scene(2000, 2, 100, 500).positions);
    expect(Math.hypot(...e.centre)).toBeLessThan(1);
  });
});

describe('trimFarField', () => {
  it('drops a far-field background shell', () => {
    const before = scene(2000, 2.3, 90, 241);
    const t = trimFarField(before);
    expect(t.removed).toBe(90);
    expect(t.res.kept).toBe(2000);
    expect(t.extent.maxRadius).toBeLessThan(5);
  });

  it('leaves a scene with no outliers completely alone', () => {
    const t = trimFarField(scene(2000, 2.3, 0, 0));
    expect(t.removed).toBe(0);
    expect(t.cutoff).toBeNull();
    expect(t.res.kept).toBe(2000);
  });

  it('declines to trim when the spread IS the scene', () => {
    // half the points far out is not an outlier population, it is a large scene
    const t = trimFarField(scene(1000, 2, 1000, 60));
    expect(t.removed).toBe(0);
  });

  it('keeps colours, alphas and covariance aligned with the points it keeps', () => {
    const src = scene(500, 2, 20, 200);
    src.cov = new Float32Array((500 + 20) * 6);
    for (let i = 0; i < 520; i++) src.cov[i * 6] = i; // tag each point
    src.alphas = new Float32Array(520);
    for (let i = 0; i < 520; i++) src.alphas[i] = i;
    const t = trimFarField(src);
    expect(t.removed).toBe(20);
    // the survivors are the first 500, so their tags must still read 0..499 in order
    expect(t.res.cov![0]).toBe(0);
    expect(t.res.cov![499 * 6]).toBe(499);
    expect(t.res.alphas[499]).toBe(499);
  });

  it('cuts off well outside the scene, never through it', () => {
    const t = trimFarField(scene(2000, 2, 50, 200));
    expect(t.cutoff).not.toBeNull();
    // the reported extent is recomputed after trimming, so the cutoff must sit above it
    expect(t.cutoff!).toBeGreaterThan(t.extent.maxRadius);
    expect(t.cutoff!).toBeLessThan(200);
    expect(FAR_FACTOR).toBeGreaterThan(1);
  });
});
