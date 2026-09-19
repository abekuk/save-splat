import { describe, it, expect } from 'vitest';
import { buildVerdict, isStructural, severityOf, surfacePhrase } from './verdict';
import type { Plane } from '@/types';

function wall(label: string, drift: number, support: number, fill: number): Plane {
  return {
    id: 1,
    label,
    n: [1, 0, 0],
    d: 0,
    centroid: [0, 0, 0],
    u: [0, 1, 0],
    v: [0, 0, 1],
    umin: 0,
    umax: 1,
    vmin: 0,
    vmax: 1,
    count: 100,
    weight: 100,
    support,
    area: 1,
    bboxArea: 1,
    fill,
    rms: 0.01,
    cls: 'wall',
    tilt: Math.atan(drift),
    drift,
    band: null,
  };
}

describe('verdict', () => {
  it('bands drift the way the engineering bands do', () => {
    expect(severityOf(0.001)).toBe('sound');
    expect(severityOf(0.007)).toBe('minor');
    expect(severityOf(0.015)).toBe('moderate');
    expect(severityOf(0.05)).toBe('severe');
  });

  it('will not let a sliver speak for the building', () => {
    // the real case: a 31% "wall" on 1.3% support next to three plumb walls
    const planes = [
      wall('W5', 0.3127, 0.013, 0.36),
      wall('W1', 0.0017, 0.122, 0.52),
      wall('W3', 0.0139, 0.067, 0.35),
      wall('W4', 0.0029, 0.022, 0.38),
    ];
    const v = buildVerdict(planes);
    expect(v.fragments.map((p) => p.label)).toContain('W5');
    expect(v.worst?.label).toBe('W3');
    expect(v.level).toBe('moderate');
    expect(v.headline).not.toMatch(/unsafe/);
  });

  it('does call a genuinely severe, well-supported wall severe', () => {
    const v = buildVerdict([wall('W1', 0.05, 0.2, 0.6), wall('W2', 0.001, 0.1, 0.5)]);
    expect(v.level).toBe('severe');
    expect(v.headline).toMatch(/unsafe/);
    expect(v.detail).toMatch(/W1/);
  });

  it('says it cannot judge rather than guessing when only fragments were caught', () => {
    const v = buildVerdict([wall('W1', 0.4, 0.005, 0.1), wall('W2', 0.3, 0.008, 0.2)]);
    expect(v.level).toBe('unknown');
    expect(v.structural).toHaveLength(0);
    expect(v.detail).toMatch(/too small or too patchy/);
  });

  it('reports soundness when every measurable wall is plumb', () => {
    const v = buildVerdict([wall('W1', 0.001, 0.2, 0.6), wall('W2', 0.002, 0.1, 0.5)]);
    expect(v.level).toBe('sound');
    expect(v.headline).toMatch(/Nothing structurally alarming/);
  });

  it('ignores slabs — this is a verticality judgement', () => {
    const slab = { ...wall('S1', 0, 0.5, 0.9), cls: 'slab' as const, drift: null };
    expect(buildVerdict([slab]).level).toBe('unknown');
  });

  it('the structural gate is scale-free, so it holds for an uncalibrated scan', () => {
    expect(isStructural(wall('a', 0.01, 0.05, 0.5))).toBe(true);
    expect(isStructural(wall('b', 0.01, 0.005, 0.9))).toBe(false);
    expect(isStructural(wall('c', 0.01, 0.5, 0.1))).toBe(false);
  });
});

describe('surfacePhrase', () => {
  it('does not call a steeply tilted slab a floor that is merely off level', () => {
    const base = {
      id: 1,
      label: 'S1',
      n: [0, 1, 0] as [number, number, number],
      d: 0,
      centroid: [0, 0, 0] as [number, number, number],
      u: [1, 0, 0] as [number, number, number],
      v: [0, 0, 1] as [number, number, number],
      umin: 0,
      umax: 1,
      vmin: 0,
      vmax: 1,
      count: 10,
      weight: 10,
      support: 0.2,
      area: 1,
      bboxArea: 1,
      fill: 0.8,
      rms: 0.01,
      drift: null,
      band: null,
    };
    const gentle = { ...base, cls: 'slab' as const, tilt: (2 * Math.PI) / 180 };
    const steep = { ...base, cls: 'slab' as const, tilt: (20.8 * Math.PI) / 180 };
    const incline = { ...base, cls: 'incline' as const, tilt: (56 * Math.PI) / 180 };
    expect(surfacePhrase(gentle)).toBe('floor, off level by');
    expect(surfacePhrase(steep)).toMatch(/badly out of level/);
    expect(surfacePhrase(incline)).toBe('sloping surface at');
  });
});

describe('alignment gate', () => {
  const tilted = (label: string, deg: number, cls: 'wall' | 'incline'): Plane => ({
    id: 1,
    label,
    n: [0.5, 0.5, 0.7],
    d: 0,
    centroid: [0, 0, 0],
    u: [1, 0, 0],
    v: [0, 1, 0],
    umin: 0,
    umax: 2,
    vmin: 0,
    vmax: 2,
    count: 500,
    weight: 500,
    support: 0.1,
    area: 4,
    bboxArea: 4,
    fill: 0.9,
    rms: 0.01,
    cls,
    tilt: (deg * Math.PI) / 180,
    drift: cls === 'wall' ? Math.tan((deg * Math.PI) / 180) : null,
    band: null,
  });

  it('refuses to report a lean from a scan that is not gravity-aligned', () => {
    // the real case: every surface diagonal, no floor, a "wall" 25 degrees off vertical
    const planes = [
      tilted('I1', 64, 'incline'),
      tilted('I2', 61, 'incline'),
      tilted('I3', 52, 'incline'),
      tilted('W1', 25, 'wall'),
      tilted('W2', 23, 'wall'),
    ];
    const v = buildVerdict(planes);
    expect(v.level).toBe('unknown');
    expect(v.headline).toMatch(/not level/);
    expect(v.detail).toMatch(/coordinate frame rather than the building/);
  });

  it('still judges a scan that is properly squared up', () => {
    const planes = [
      tilted('W1', 0.3, 'wall'),
      tilted('W2', 0.5, 'wall'),
      tilted('W3', 1.1, 'wall'),
      tilted('I1', 60, 'incline'),
    ];
    const v = buildVerdict(planes);
    expect(v.level).not.toBe('unknown');
  });
});
