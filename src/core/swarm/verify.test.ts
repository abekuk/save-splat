/* The verifiers are the part that must hold no matter what the model returns, so they are
 * tested against fabricated, incoherent and contradictory proposals — not happy paths. */
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { verify, isVerified } from './verify';
import {
  resolvePath,
  proposalSchemaFor,
  parseRawProposal,
  RATIONALE_MAX,
  CITATIONS_MAX,
} from './proposal';
import type { RawProposal } from './proposal';

const payload: Record<string, unknown> = {
  site: { id: 1, tau: 4, n: 8 },
  scan: { scale_calibrated: true, metres_per_unit: 1 },
  operator_notes: null,
  geometry: {
    planes: [
      { label: 'S1', cls: 'slab', support: 0.24, tilt_deg: 2.4, area_m2: 36 },
      {
        label: 'W2',
        cls: 'wall',
        support: 0.08,
        tilt_deg: 1.1,
        drift_ratio: 0.019,
        drift_band: 'MODERATE',
      },
      { label: 'I3', cls: 'incline', support: 0.07, tilt_deg: 38 },
    ],
    debris: { total_volume_m3: 40, clusters: 3, ground_plane: 'S1' },
  },
};

function prop(over: Partial<RawProposal> = {}): RawProposal {
  return {
    abstain: false,
    value: 'mixed',
    self_confidence: 'med',
    rationale: 'because',
    evidence_used: ['geometry.planes[0].cls'],
    ...over,
  };
}

test('resolvePath walks objects, arrays and reports misses', () => {
  assert.equal(resolvePath(payload, 'geometry.planes[1].drift_band').value, 'MODERATE');
  assert.equal(resolvePath(payload, 'geometry.debris.total_volume_m3').value, 40);
  assert.equal(resolvePath(payload, 'geometry.planes[9].cls').found, false);
  assert.equal(resolvePath(payload, 'geometry.nope').found, false);
  assert.equal(resolvePath(payload, 'site.n.deeper').found, false);
  // a null value still counts as present — absent and null are different failures
  assert.equal(resolvePath(payload, 'operator_notes').found, true);
});

test('citation check rejects paths that are not in the payload', () => {
  const v = verify({
    key: 'morphology',
    param: 'type',
    proposal: prop({
      evidence_used: ['geometry.planes[0].cls', 'geometry.thermal_imaging.hotspots'],
    }),
    payload,
  });
  const c = v.find((x) => x.check === 'citations')!;
  assert.equal(c.status, 'fail');
  assert.match(c.detail, /thermal_imaging/);
  assert.equal(isVerified(v), false);
});

test('citation check passes when every path resolves', () => {
  const v = verify({ key: 'morphology', param: 'type', proposal: prop(), payload });
  assert.equal(v.find((x) => x.check === 'citations')!.status, 'pass');
});

test('proposing a value while citing nothing fails', () => {
  const v = verify({
    key: 'morphology',
    param: 'type',
    proposal: prop({ evidence_used: [] }),
    payload,
  });
  assert.equal(v.find((x) => x.check === 'citations')!.status, 'fail');
});

test('contract check catches incoherent abstain/value pairs', () => {
  const a = verify({
    key: 'morphology',
    param: 'type',
    proposal: prop({ abstain: true, value: 'mixed' }),
    payload,
  });
  assert.equal(a.find((x) => x.check === 'contract')!.status, 'fail');
  const b = verify({
    key: 'morphology',
    param: 'type',
    proposal: prop({ abstain: false, value: null }),
    payload,
  });
  assert.equal(b.find((x) => x.check === 'contract')!.status, 'fail');
});

test('morphology: lean-to with no steep inclined plane fails', () => {
  const thin = {
    ...payload,
    geometry: {
      ...(payload.geometry as object),
      planes: [{ label: 'S1', cls: 'slab', support: 0.3, tilt_deg: 2 }],
    },
  };
  const v = verify({
    key: 'morphology',
    param: 'type',
    proposal: prop({ value: 'lean' }),
    payload: thin,
  });
  const d = v.find((x) => x.check === 'plane-consistency')!;
  assert.equal(d.status, 'fail');
  assert.match(d.detail, /no inclined plane/);
});

test('morphology: pancake fails when vertical structure dominates', () => {
  const walls = {
    ...payload,
    geometry: {
      ...(payload.geometry as object),
      planes: [
        { label: 'W1', cls: 'wall', support: 0.3, tilt_deg: 1 },
        { label: 'S1', cls: 'slab', support: 0.05, tilt_deg: 2 },
      ],
    },
  };
  const v = verify({
    key: 'morphology',
    param: 'type',
    proposal: prop({ value: 'pancake' }),
    payload: walls,
  });
  assert.equal(v.find((x) => x.check === 'plane-consistency')!.status, 'fail');
});

test('morphology: lean-to passes with a genuine steep incline', () => {
  const v = verify({
    key: 'morphology',
    param: 'type',
    proposal: prop({ value: 'lean' }),
    payload,
  });
  assert.equal(v.find((x) => x.check === 'plane-consistency')!.status, 'pass');
});

test('volume: an absurd clearance rate fails', () => {
  const v = verify({ key: 'volume', param: 'tau', proposal: prop({ value: 0.5 }), payload });
  const d = v.find((x) => x.check === 'clearance-rate')!;
  assert.equal(d.status, 'fail'); // 40 m3 in half an hour
  assert.match(d.detail, /m³\/crew-hour/);
});

test('volume: a plausible rate passes', () => {
  const v = verify({ key: 'volume', param: 'tau', proposal: prop({ value: 8 }), payload });
  assert.equal(v.find((x) => x.check === 'clearance-rate')!.status, 'pass'); // 5 m3/h
});

test('volume: uncalibrated scale is unverified, not passed', () => {
  const un = { ...payload, scan: { scale_calibrated: false } };
  const v = verify({ key: 'volume', param: 'tau', proposal: prop({ value: 8 }), payload: un });
  const d = v.find((x) => x.check === 'clearance-rate')!;
  assert.equal(d.status, 'unverified');
  assert.match(d.detail, /uncalibrated/);
  assert.equal(isVerified(v), true); // unverified does not block the operator
});

test('access: high r under a severe-drift wall is contradictory', () => {
  const severe = {
    ...payload,
    geometry: {
      ...(payload.geometry as object),
      planes: [{ label: 'W1', cls: 'wall', support: 0.1, drift_band: 'SEVERE', tilt_deg: 6 }],
    },
  };
  const v = verify({ key: 'access', param: 'r', proposal: prop({ value: 0.95 }), payload: severe });
  assert.equal(v.find((x) => x.check === 'stability-consistency')!.status, 'fail');
});

test('access: without route data the check is unverified, never a pass', () => {
  const v = verify({ key: 'access', param: 'r', proposal: prop({ value: 0.5 }), payload });
  const d = v.find((x) => x.check === 'stability-consistency')!;
  assert.equal(d.status, 'unverified');
  assert.match(d.detail, /no approach route/);
});

test('records: abstaining with no occupancy source is the correct outcome', () => {
  const v = verify({
    key: 'records',
    param: 'n',
    proposal: prop({ abstain: true, value: null, evidence_used: [] }),
    payload,
  });
  assert.equal(v.find((x) => x.check === 'source-present')!.status, 'pass');
  assert.equal(isVerified(v), true);
});

test('records: inventing an occupancy with no notes fails', () => {
  const v = verify({ key: 'records', param: 'n', proposal: prop({ value: 12 }), payload });
  const d = v.find((x) => x.check === 'source-present')!;
  assert.equal(d.status, 'fail');
  assert.match(d.detail, /no operator notes/);
});

test('records: a value from notes must actually cite the notes', () => {
  const withNotes = { ...payload, operator_notes: 'school, weekday, ~20 pupils' };
  const uncited = verify({
    key: 'records',
    param: 'n',
    proposal: prop({ value: 20 }),
    payload: withNotes,
  });
  assert.equal(uncited.find((x) => x.check === 'source-present')!.status, 'fail');
  const cited = verify({
    key: 'records',
    param: 'n',
    proposal: prop({ value: 20, evidence_used: ['operator_notes'] }),
    payload: withNotes,
  });
  assert.equal(cited.find((x) => x.check === 'source-present')!.status, 'pass');
});

test('corroboration must flag low when an upstream agent failed or abstained', () => {
  const up = [
    { key: 'morphology' as const, abstained: false, verified: true },
    { key: 'records' as const, abstained: true, verified: true },
  ];
  const high = verify({
    key: 'corroboration',
    param: 'conf',
    proposal: prop({ value: 'high' }),
    payload,
    upstream: up,
  });
  assert.equal(high.find((x) => x.check === 'agreement')!.status, 'fail');
  const low = verify({
    key: 'corroboration',
    param: 'conf',
    proposal: prop({ value: 'low' }),
    payload,
    upstream: up,
  });
  assert.equal(low.find((x) => x.check === 'agreement')!.status, 'pass');
});

test('corroboration may say high only when everything upstream held', () => {
  const up = [
    { key: 'morphology' as const, abstained: false, verified: true },
    { key: 'volume' as const, abstained: false, verified: true },
  ];
  const v = verify({
    key: 'corroboration',
    param: 'conf',
    proposal: prop({ value: 'high' }),
    payload,
    upstream: up,
  });
  assert.equal(v.find((x) => x.check === 'agreement')!.status, 'pass');
});

test('output schema rejects out-of-range values rather than clamping them', () => {
  const S = proposalSchemaFor('n');
  const bad = S.safeParse({
    abstain: false,
    value: 500,
    self_confidence: 'high',
    rationale: 'x',
    evidence_used: [],
  });
  assert.equal(bad.success, false);
  const frac = S.safeParse({
    abstain: false,
    value: 8.5,
    self_confidence: 'high',
    rationale: 'x',
    evidence_used: [],
  });
  assert.equal(frac.success, false, 'occupancy must be a whole number');
  const ok = S.safeParse({
    abstain: false,
    value: 8,
    self_confidence: 'high',
    rationale: 'x',
    evidence_used: [],
  });
  assert.equal(ok.success, true);
});

test('a long rationale is trimmed, not thrown away with the whole proposal', () => {
  const long = 'x'.repeat(5000);
  const res = parseRawProposal('type', {
    abstain: false,
    value: 'mixed',
    self_confidence: 'med',
    rationale: long,
    evidence_used: ['geometry.planes[0].cls'],
  });
  assert.equal(res.ok, true, 'prose length must not cost a sound proposal');
  if (res.ok) {
    assert.equal(res.value.rationale.length, RATIONALE_MAX);
    assert.match(res.value.rationale, /…$/);
  }
});

test('an over-long citation list is trimmed rather than rejected', () => {
  const many = Array.from({ length: 40 }, (_, i) => `geometry.planes[${i}].cls`);
  const res = parseRawProposal('type', {
    abstain: false,
    value: 'mixed',
    self_confidence: 'med',
    rationale: 'ok',
    evidence_used: many,
  });
  assert.equal(res.ok, true);
  if (res.ok) assert.equal(res.value.evidence_used.length, CITATIONS_MAX);
});

test('but a decision-bearing value is still rejected outright', () => {
  const res = parseRawProposal('n', {
    abstain: false,
    value: 500,
    self_confidence: 'high',
    rationale: 'ok',
    evidence_used: [],
  });
  assert.equal(res.ok, false, 'out-of-range values are reasoning failures, not formatting');
});
