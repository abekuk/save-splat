/* densePatch decides where a plane's drawn rectangle ends. The cases that matter are the
 * ones that produced rectangles across empty space on a real scan: a dense core with a
 * sparse trail running off it, and material that is diffuse everywhere. */
import { describe, it, expect } from 'vitest';
import { densePatch } from './extract';

/** A solid block of points from (0,0) to (w,h), `per` points per unit cell. */
function block(w: number, h: number, n: number, ox = 0, oy = 0): { u: number[]; v: number[] } {
  const u: number[] = [],
    v: number[] = [];
  const side = Math.ceil(Math.sqrt(n));
  for (let i = 0; i < n; i++) {
    u.push(ox + ((i % side) / side) * w);
    v.push(oy + (Math.floor(i / side) / side) * h);
  }
  return { u, v };
}

describe('densePatch', () => {
  it('returns the box around a solid patch, roughly its true size', () => {
    const { u, v } = block(1, 1, 4000);
    const p = densePatch(u, v, u.length, 0, 1, 0, 1);
    expect(p.used).toBeGreaterThan(0);
    expect(p.umax - p.umin).toBeGreaterThan(0.8);
    expect(p.umax - p.umin).toBeLessThanOrEqual(1.05);
    expect(p.area / ((p.umax - p.umin) * (p.vmax - p.vmin))).toBeGreaterThan(0.8);
  });

  it('ignores a sparse trail of stragglers that would otherwise stretch the box', () => {
    // dense 1x1 core, plus 40 scattered points trailing out to u=10
    const { u, v } = block(1, 1, 4000);
    for (let i = 0; i < 40; i++) {
      u.push(1 + i * 0.22);
      v.push(0.5);
    }
    const p = densePatch(u, v, u.length, 0, 10, 0, 1);
    expect(p.umax, 'the trail must not drag the rectangle across the scene').toBeLessThan(3);
    expect(p.area / ((p.umax - p.umin) * (p.vmax - p.vmin))).toBeGreaterThan(0.5);
  });

  it('keeps two genuinely dense regions of comparable size', () => {
    const a = block(1, 1, 2500, 0, 0);
    const b = block(1, 1, 2500, 3, 0);
    const u = [...a.u, ...b.u],
      v = [...a.v, ...b.v];
    const p = densePatch(u, v, u.length, 0, 4, 0, 1);
    expect(p.umin).toBeLessThan(0.3);
    expect(p.umax).toBeGreaterThan(3.7);
  });

  it('keeps sparse material that is evenly spread — low density is not the same as diffuse', () => {
    // 600 points spread uniformly over 4x4. Thin, but it is a real surface everywhere, and
    // the resolution adapts to the count so it must not be penalised for being sparse.
    const u: number[] = [],
      v: number[] = [];
    let seed = 1;
    const rnd = (): number => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    for (let i = 0; i < 600; i++) {
      u.push(rnd() * 4);
      v.push(rnd() * 4);
    }
    const p = densePatch(u, v, u.length, 0, 4, 0, 4);
    const fill = p.area / ((p.umax - p.umin) * (p.vmax - p.vmin));
    expect(fill).toBeGreaterThan(0.6);
  });

  it('reports a low fill for clumps separated by voids — the real-scan failure', () => {
    // three small dense clumps at the corners of a 4x4 area. Each is real, but a rectangle
    // spanning all three is mostly empty and misstates where the surface is.
    const u: number[] = [],
      v: number[] = [];
    for (const [ox, oy] of [
      [0, 0],
      [3.6, 0],
      [0, 3.6],
    ]) {
      const b = block(0.4, 0.4, 700, ox, oy);
      u.push(...b.u);
      v.push(...b.v);
    }
    const p = densePatch(u, v, u.length, 0, 4, 0, 4);
    const fill = p.used === 0 ? 0 : p.area / ((p.umax - p.umin) * (p.vmax - p.vmin));
    expect(fill, 'clumps with voids must fail the fill gate, not be drawn').toBeLessThan(0.25);
  });

  it('does not crash on an empty or degenerate input', () => {
    expect(densePatch([], [], 0, 0, 1, 0, 1).used).toBe(0);
    const p = densePatch([0.5], [0.5], 1, 0, 1, 0, 1);
    expect(p.used).toBeGreaterThanOrEqual(0);
  });
});
