/* One judgement from the whole swarm, instead of five parameter cards.
 *
 * The panel used to show an agent per slider, each with its own proposal and its own APPLY
 * button. That is the machinery, not the finding. What an operator needs is what the swarm
 * concluded from the scan, in a sentence, and what it could not conclude.
 *
 * The honest shape of that answer is dominated by one thing: occupancy. n multiplies the
 * ranking index directly, RECORDS abstains whenever the operator has supplied no source for
 * it, and no amount of geometry substitutes. So a judgement with no occupancy is reported as
 * unrankable rather than being quietly ranked on a default of 8.
 */
import { LAMBDA, rho } from '@/core/ranking';
import type { AgentResult, SwarmRunResult } from './proposal';
import type { Site } from '@/types';
import type { Severity } from '@/core/geometry/verdict';

export type JudgementLevel = 'failed' | 'unrankable' | 'flagged' | 'ranked';

export interface JudgementLine {
  label: string;
  text: string;
  tone: 'ok' | 'warn' | 'bad' | 'dim';
}

export interface Judgement {
  level: JudgementLevel;
  headline: string;
  detail: string;
  lines: JudgementLine[];
  /** proposals that passed their verifier and are not abstentions */
  applicable: AgentResult[];
  /** rho if the swarm's own values were used, or null when occupancy is missing */
  projectedRho: number | null;
}

const byKey = (run: SwarmRunResult, key: string): AgentResult | undefined =>
  run.results.find((r) => r.key === key);

function fmt(r: AgentResult | undefined, unit: (v: unknown) => string): string {
  if (!r) return 'not run';
  if (r.error) return `failed — ${r.error.split('—')[0].trim()}`;
  if (r.abstained) return 'abstained';
  return unit(r.value);
}

/** Plain wording per dimension, so the panel reads as findings rather than as parameters. */
export function buildJudgement(
  run: SwarmRunResult,
  site: Site | null,
  geometryLevel: Severity = 'unknown',
  visionUse: string[] = [],
): Judgement {
  const records = byKey(run, 'records');
  const access = byKey(run, 'access');
  const volume = byKey(run, 'volume');
  const morph = byKey(run, 'morphology');
  const corr = byKey(run, 'corroboration');

  const applicable = run.results.filter(
    (r) => !r.error && !r.abstained && r.verified && r.value !== null,
  );
  const failedChecks = run.results.filter((r) => !r.error && !r.verified);
  const dead = run.results.filter((r) => r.error);

  const lines: JudgementLine[] = [
    {
      label: 'Occupancy',
      tone: records?.abstained ? 'warn' : records?.value != null ? 'ok' : 'dim',
      text: records?.abstained
        ? visionUse.length
          ? `no source — though the views show ${visionUse.slice(0, 2).join(' and ')}`
          : 'no source in the payload; the operator has to supply it'
        : fmt(records, (v) => `${String(v)} people, from operator notes`),
    },
    {
      label: 'Structure',
      tone: geometryLevel === 'severe' ? 'bad' : geometryLevel === 'moderate' ? 'warn' : 'ok',
      text: fmt(morph, (v) => {
        const t = String(v);
        const word =
          t === 'pancake' ? 'pancake collapse' : t === 'lean' ? 'lean-to voids' : 'mixed collapse';
        return `${word} (λ ${LAMBDA[t as keyof typeof LAMBDA].toFixed(2)}/h)`;
      }),
    },
    {
      label: 'Access',
      tone:
        (access?.value as number) >= 0.6 ? 'ok' : (access?.value as number) > 0 ? 'warn' : 'dim',
      text: fmt(access, (v) => `${Math.round(Number(v) * 100)}% chance of getting someone out`),
    },
    {
      label: 'Effort',
      tone: 'ok',
      text: fmt(volume, (v) => `about ${Number(v)} crew-hours`),
    },
    {
      label: 'Confidence',
      tone: corr?.value === 'high' ? 'ok' : corr?.value === 'low' ? 'warn' : 'dim',
      text: fmt(corr, (v) => String(v).toUpperCase()),
    },
  ];

  if (dead.length === run.results.length) {
    return {
      level: 'failed',
      headline: 'The swarm could not run',
      detail: dead[0]?.error ?? 'every agent failed',
      lines,
      applicable: [],
      projectedRho: null,
    };
  }

  // what rho would be if the swarm's values were taken
  let projectedRho: number | null = null;
  if (site && records && !records.abstained && records.value != null) {
    const merged: Site = { ...site };
    for (const r of applicable) (merged as unknown as Record<string, unknown>)[r.param] = r.value;
    projectedRho = rho(merged);
  }

  if (records?.abstained) {
    return {
      level: 'unrankable',
      headline: 'Cannot prioritise this site yet',
      detail:
        'Everything the scan can answer has been answered. Occupancy cannot be read from ' +
        'geometry and it multiplies the ranking directly, so the site stays unranked until ' +
        'you put what you know in the notes above.' +
        (visionUse.length ? ` The views do show ${visionUse.slice(0, 2).join(' and ')}.` : ''),
      lines,
      applicable,
      projectedRho: null,
    };
  }

  if (failedChecks.length > 0) {
    return {
      level: 'flagged',
      headline: 'Judgement made, but checks disagree',
      detail: `${failedChecks.map((r) => r.key).join(', ')} did not survive ${failedChecks.length === 1 ? 'its' : 'their'} verifier. Read the detail before using any of this.`,
      lines,
      applicable,
      projectedRho,
    };
  }

  return {
    level: 'ranked',
    headline:
      projectedRho != null
        ? `Ranks at ${projectedRho.toFixed(3)} lives per crew-hour`
        : 'Judgement complete',
    detail:
      `Every agent returned a value and passed its verifier.` +
      (corr?.value === 'low' ? ' Confidence is LOW — treat the ordering as provisional.' : ''),
    lines,
    applicable,
    projectedRho,
  };
}
