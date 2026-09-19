import { describe, expect, it } from 'vitest';
import { parseProposal, parseQueueImport } from './schema';

describe('parseProposal', () => {
  it('accepts a value inside the slider range', () => {
    expect(parseProposal('n', 22)).toEqual({ ok: true, value: 22 });
    expect(parseProposal('r', 0.8)).toEqual({ ok: true, value: 0.8 });
    expect(parseProposal('type', 'lean')).toEqual({ ok: true, value: 'lean' });
  });

  it('rejects rather than clamps an out-of-range occupancy', () => {
    // clamping 500 -> 50 would launder a reasoning failure into the ranking
    const r = parseProposal('n', 500);
    expect(r.ok).toBe(false);
  });

  it('rejects a fractional headcount', () => {
    const r = parseProposal('n', 3.5);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/whole number/);
  });

  it('rejects a value of the wrong type', () => {
    expect(parseProposal('type', 'banana').ok).toBe(false);
    expect(parseProposal('n', 'twelve').ok).toBe(false);
    expect(parseProposal('r', null).ok).toBe(false);
  });

  it('rejects NaN, which slips past a naive range check', () => {
    expect(parseProposal('tau', NaN).ok).toBe(false);
  });

  it('holds tau to the slider bounds', () => {
    expect(parseProposal('tau', 0.5).ok).toBe(true);
    expect(parseProposal('tau', 24).ok).toBe(true);
    expect(parseProposal('tau', 0.4).ok).toBe(false);
    expect(parseProposal('tau', 25).ok).toBe(false);
  });
});

describe('parseQueueImport', () => {
  const good = {
    generated: '2026-09-19T12:00:00.000Z',
    sites: [
      {
        id: 1,
        name: 'Site A',
        pos: { x: 0, y: 1, z: 2 },
        n: 8,
        q: 0.35,
        r: 0.6,
        tau: 4,
        type: 'mixed',
        conf: 'med',
      },
    ],
  };

  it('accepts a well-formed export', () => {
    const r = parseQueueImport(good);
    expect(r.ok).toBe(true);
  });

  it('names the offending field when a site is malformed', () => {
    const bad = { ...good, sites: [{ ...good.sites[0], q: 5 }] };
    const r = parseQueueImport(bad);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain('sites.0.q');
  });

  it('rejects a payload that is not an object at all', () => {
    expect(parseQueueImport('nope').ok).toBe(false);
    expect(parseQueueImport(null).ok).toBe(false);
  });
});
