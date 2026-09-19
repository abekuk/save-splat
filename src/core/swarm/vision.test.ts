/* The vision agent's job is to report what is visible. The rule it must not break is
 * supplying an occupancy figure, because RECORDS abstains precisely on the grounds that a
 * scan cannot evidence one — a headcount arriving through the imagery would defeat that. */
import { describe, it, expect } from 'vitest';
import { claimsHeadcount, damageAgreement, parseVisionReport } from './vision';
import type { VisionReport } from './vision';

function report(over: Partial<VisionReport> = {}): VisionReport {
  return {
    abstain: false,
    scene_type: 'workshop',
    objects: ['tripod', 'tool cases'],
    occupancy_indicators: ['tools left out'],
    hazard_indicators: [],
    damage_read: 'light',
    notes: 'A workshop with equipment on the floor.',
    views_used: [0, 2],
    self_confidence: 'med',
    ...over,
  };
}

describe('headcount bar', () => {
  it('catches a figure smuggled into the prose', () => {
    expect(claimsHeadcount(report({ notes: 'Looks like about 30 people worked here.' }))).toMatch(
      /30/,
    );
    expect(claimsHeadcount(report({ occupancy_indicators: ['seating for 24 students'] }))).toMatch(
      /24/,
    );
    expect(claimsHeadcount(report({ notes: 'Perhaps 5 occupants.' }))).toMatch(/5/);
  });

  it('does not fire on ordinary mentions of people or on object counts', () => {
    expect(claimsHeadcount(report({ notes: 'A space people clearly used.' }))).toBeNull();
    expect(claimsHeadcount(report({ objects: ['3 tool cases', '2 tripods'] }))).toBeNull();
    expect(claimsHeadcount(report())).toBeNull();
  });
});

describe('cross-modal agreement', () => {
  it('fails when imagery and geometry are two bands apart', () => {
    expect(damageAgreement('severe', 'sound').status).toBe('fail');
    expect(damageAgreement('none', 'severe').status).toBe('fail');
    expect(damageAgreement('severe', 'sound').detail).toMatch(/one of them is wrong/);
  });

  it('passes when they broadly agree', () => {
    expect(damageAgreement('light', 'minor').status).toBe('pass');
    expect(damageAgreement('moderate', 'moderate').status).toBe('pass');
    expect(damageAgreement('none', 'sound').status).toBe('pass');
  });

  it('will not compare when either side has nothing to say', () => {
    expect(damageAgreement('unclear', 'severe').status).toBe('unverified');
    expect(damageAgreement('severe', 'unknown').status).toBe('unverified');
  });
});

describe('parseVisionReport', () => {
  it('drops view indices that were never sent', () => {
    const r = parseVisionReport(report({ views_used: [0, 1, 7, -2] }), 4);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.views_used).toEqual([0, 1]);
  });

  it('trims runaway lists and prose rather than rejecting the whole report', () => {
    const many = Array.from({ length: 40 }, (_, i) => `object ${i}`);
    const r = parseVisionReport(report({ objects: many, notes: 'x'.repeat(5000) }), 4);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.objects.length).toBeLessThanOrEqual(12);
      expect(r.value.notes.length).toBeLessThanOrEqual(1200);
    }
  });

  it('rejects a report of the wrong shape', () => {
    const r = parseVisionReport({ abstain: 'yes' }, 4);
    expect(r.ok).toBe(false);
  });

  it('has no field for an occupancy figure at all', () => {
    const r = parseVisionReport({ ...report(), occupancy_count: 30 }, 4);
    expect(r.ok).toBe(true);
    if (r.ok) expect('occupancy_count' in r.value).toBe(false);
  });
});
