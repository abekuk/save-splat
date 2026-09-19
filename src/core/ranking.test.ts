import { describe, expect, it } from 'vitest';
import { DEFAULTS, LAMBDA, halfLife, ranked, rho } from './ranking';
import type { Site } from '@/types';

const site = (over: Partial<Site> = {}): Site => ({
  id: 1,
  name: 'S',
  pos: { x: 0, y: 0, z: 0 },
  n: DEFAULTS.n,
  q: DEFAULTS.q,
  r: DEFAULTS.r,
  tau: DEFAULTS.tau,
  type: DEFAULTS.type,
  conf: DEFAULTS.conf,
  ...over,
});

describe('rho', () => {
  it('is (n q r lambda) / tau', () => {
    const s = site({ n: 10, q: 0.5, r: 0.5, tau: 2, type: 'mixed' });
    expect(rho(s)).toBeCloseTo((10 * 0.5 * 0.5 * LAMBDA.mixed) / 2, 10);
  });

  it('guards the denominator at 0.1 crew-hours so a slider at minimum cannot divide by zero', () => {
    const s = site({ tau: 0 });
    expect(Number.isFinite(rho(s))).toBe(true);
    expect(rho(s)).toBeCloseTo(rho(site({ tau: 0.1 })), 10);
  });

  it('ignores confidence — it is an evidence flag, not a factor', () => {
    expect(rho(site({ conf: 'low' }))).toBe(rho(site({ conf: 'high' })));
  });

  it('is zero when nobody is believed inside', () => {
    expect(rho(site({ n: 0 }))).toBe(0);
  });

  it('rises with the decay rate: a pancake outranks a lean-to, all else equal', () => {
    expect(rho(site({ type: 'pancake' }))).toBeGreaterThan(rho(site({ type: 'lean' })));
  });
});

describe('ranked', () => {
  it('orders descending by rho without mutating the input', () => {
    const input = [
      site({ id: 1, name: 'low', n: 1 }),
      site({ id: 2, name: 'high', n: 40 }),
      site({ id: 3, name: 'mid', n: 10 }),
    ];
    const copy = [...input];
    const out = ranked(input);
    expect(out.map((s) => s.name)).toEqual(['high', 'mid', 'low']);
    expect(input).toEqual(copy);
  });
});

describe('halfLife', () => {
  it('matches the figures quoted in the MODEL tab', () => {
    expect(halfLife('pancake')).toBeCloseTo(2.0, 1);
    expect(halfLife('mixed')).toBeCloseTo(4.6, 1);
    expect(halfLife('lean')).toBeCloseTo(11.6, 1);
  });
});
