/* Area-weighted sampling is the whole reason this path exists: taking mesh vertices
 * straight would hand the extractor the exporter's tessellation instead of the surface. */
import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { samplePoints } from './sample';
import type { SampledSource } from './sample';

/** One triangle in the z=0 plane, spanning (0,0)-(size,size). */
function tri(size: number, ox = 0): SampledSource {
  return {
    positions: Float32Array.from([ox, 0, 0, ox + size, 0, 0, ox, size, 0]),
    colors: null,
    uvs: null,
    index: Uint32Array.from([0, 1, 2]),
    matrix: new THREE.Matrix4(),
    texture: null,
    base: [0.5, 0.5, 0.5],
  };
}

describe('samplePoints', () => {
  it('samples in proportion to area, not to triangle count', () => {
    // one big triangle at x>=10, one small at x<1: 100x the area should get ~100x the points
    const big = tri(10, 10);
    const small = tri(1, 0);
    const res = samplePoints([big, small], 20000);
    let inBig = 0;
    for (let i = 0; i < res.positions.length; i += 3) if (res.positions[i] >= 10) inBig++;
    const frac = inBig / (res.positions.length / 3);
    expect(frac).toBeGreaterThan(0.97);
    expect(frac).toBeLessThan(1.0);
  });

  it('is deterministic — the same mesh gives the same cloud', () => {
    const a = samplePoints([tri(4)], 3000);
    const b = samplePoints([tri(4)], 3000);
    expect(Array.from(a.positions.slice(0, 60))).toEqual(Array.from(b.positions.slice(0, 60)));
  });

  it('keeps every sample inside the triangle it came from', () => {
    const res = samplePoints([tri(2)], 4000);
    for (let i = 0; i < res.positions.length; i += 3) {
      const x = res.positions[i],
        y = res.positions[i + 1],
        z = res.positions[i + 2];
      expect(z).toBeCloseTo(0, 5);
      expect(x).toBeGreaterThanOrEqual(-1e-5);
      expect(y).toBeGreaterThanOrEqual(-1e-5);
      expect(x + y).toBeLessThanOrEqual(2 + 1e-4); // inside the hypotenuse
    }
  });

  it('applies the node transform, so an instanced mesh lands where it is drawn', () => {
    const moved = tri(2);
    moved.matrix = new THREE.Matrix4().makeTranslation(100, 0, 0);
    const res = samplePoints([moved], 500);
    for (let i = 0; i < res.positions.length; i += 3) {
      expect(res.positions[i]).toBeGreaterThan(99);
    }
  });

  it('interpolates vertex colours when there is no texture', () => {
    const src = tri(2);
    src.colors = Float32Array.from([1, 0, 0, 1, 0, 0, 1, 0, 0]); // all red
    const res = samplePoints([src], 200);
    expect(res.colorSource).toBe('vertex colour');
    for (let i = 0; i < res.colors.length; i += 3) {
      expect(res.colors[i]).toBeCloseTo(1, 5);
      expect(res.colors[i + 1]).toBeCloseTo(0, 5);
    }
  });

  it('falls back to the material colour with neither texture nor vertex colour', () => {
    const res = samplePoints([tri(2)], 100);
    expect(res.colorSource).toBe('material colour');
    expect(res.colors[0]).toBeCloseTo(0.5, 5);
  });

  it('reports no covariance, so the extractor uses a scene-scale tolerance', () => {
    const res = samplePoints([tri(2)], 100);
    expect(res.cov).toBeNull();
    expect(res.alphas.every((a) => a === 1)).toBe(true);
  });

  it('refuses a mesh with no area rather than returning an empty cloud', () => {
    const degenerate: SampledSource = {
      ...tri(1),
      positions: Float32Array.from([0, 0, 0, 0, 0, 0, 0, 0, 0]), // all three verts coincident
    };
    expect(() => samplePoints([degenerate], 100)).toThrow(/no triangles with area/);
  });
});
