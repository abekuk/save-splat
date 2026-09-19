import { describe, it, expect } from 'vitest';
import { buildJudgement } from './judgement';
import type { AgentResult, SwarmRunResult } from './proposal';
import type { Site } from '@/types';

const site: Site = {
  id: 1,
  name: 'Site A',
  pos: { x: 0, y: 0, z: 0 },
  n: 8,
  q: 0.35,
  r: 0.6,
  tau: 4,
  type: 'mixed',
  conf: 'med',
};

function agent(
  key: string,
  param: string,
  value: unknown,
  over: Partial<AgentResult> = {},
): AgentResult {
  return {
    key: key as AgentResult['key'],
    param: param as AgentResult['param'],
    value: value as AgentResult['value'],
    abstained: false,
    rationale: 'because',
    selfConfidence: 'med',
    evidenceUsed: ['site.n'],
    verdicts: [],
    verified: true,
    ms: 10,
    ...over,
  };
}
const run = (results: AgentResult[]): SwarmRunResult => ({
  generated: '',
  model: 'test',
  siteId: 1,
  results,
  totalMs: 1,
  note: '',
});

describe('buildJudgement', () => {
  it('refuses to prioritise when occupancy has no source', () => {
    const j = buildJudgement(
      run([
        agent('records', 'n', null, { abstained: true, value: null }),
        agent('morphology', 'type', 'mixed'),
        agent('volume', 'tau', 6),
        agent('access', 'r', 0.5),
        agent('corroboration', 'conf', 'low'),
      ]),
      site,
    );
    expect(j.level).toBe('unrankable');
    expect(j.projectedRho).toBeNull();
    expect(j.headline).toMatch(/Cannot prioritise/);
    expect(j.detail).toMatch(/multiplies the ranking/);
  });

  it('mentions what the views saw when occupancy is missing, without turning it into a number', () => {
    const j = buildJudgement(
      run([agent('records', 'n', null, { abstained: true, value: null })]),
      site,
      'minor',
      ['clothing left on the floor', 'a tripod set up'],
    );
    expect(j.detail).toMatch(/clothing left on the floor/);
    expect(j.detail).not.toMatch(/\d+\s*(people|persons)/);
  });

  it('projects rho once occupancy has a source', () => {
    const j = buildJudgement(
      run([
        agent('records', 'n', 28),
        agent('morphology', 'type', 'pancake'),
        agent('volume', 'tau', 6),
        agent('access', 'r', 0.5),
        agent('corroboration', 'conf', 'med'),
      ]),
      site,
    );
    expect(j.level).toBe('ranked');
    // 28 * 0.35 * 0.5 * 0.35 / 6
    expect(j.projectedRho).toBeCloseTo((28 * 0.35 * 0.5 * 0.35) / 6, 5);
    expect(j.headline).toMatch(/lives per crew-hour/);
  });

  it('flags a run where a verifier failed rather than presenting it as a clean answer', () => {
    const j = buildJudgement(
      run([
        agent('records', 'n', 12),
        agent('volume', 'tau', 0.5, { verified: false }),
        agent('corroboration', 'conf', 'low'),
      ]),
      site,
    );
    expect(j.level).toBe('flagged');
    expect(j.detail).toMatch(/volume/);
  });

  it('reports a dead swarm as failed, not as a judgement', () => {
    const j = buildJudgement(
      run([agent('records', 'n', null, { error: 'rate limited (429)' })]),
      site,
    );
    expect(j.level).toBe('failed');
    expect(j.headline).toMatch(/could not run/);
  });

  it('only offers proposals that passed their verifier', () => {
    const j = buildJudgement(
      run([
        agent('records', 'n', 12),
        agent('volume', 'tau', 6, { verified: false }),
        agent('access', 'r', 0.5, { abstained: true, value: null }),
      ]),
      site,
    );
    expect(j.applicable.map((a) => a.key)).toEqual(['records']);
  });
});
