/* What an agent is allowed to hand back.
 *
 * Everything below this line crosses a trust boundary: it is JSON produced by a model.
 * The schemas here are the only way in, and they are deliberately strict — an out-of-range
 * value is a reasoning failure, not something to clamp quietly into the slider range.
 *
 * MERGE NOTE: the ranges duplicate PARAM_SCHEMAS in the zod work landing on main in
 * parallel. When that merges, delete VALUE_SCHEMAS and import PARAM_SCHEMAS instead —
 * they are the same shape on purpose. This is the single reconciliation point.
 */
import { z } from 'zod';
import type { AgentKey, AgentParam } from './agents';

/** Mirrors the sliders exactly. */
export const VALUE_SCHEMAS = {
  n: z.number().int('occupancy is a headcount, so it must be a whole number').min(0).max(50),
  r: z.number().min(0).max(1),
  tau: z.number().min(0.5).max(24),
  type: z.enum(['pancake', 'mixed', 'lean']),
  conf: z.enum(['low', 'med', 'high']),
} as const satisfies Record<AgentParam, z.ZodTypeAny>;

export type AgentValue<P extends AgentParam = AgentParam> = z.infer<(typeof VALUE_SCHEMAS)[P]>;

/** Self-reported certainty. Distinct from the `conf` parameter, which is a site-level
 *  operator flag — this one is about the agent's own read of its evidence. */
export const SelfConfidence = z.enum(['low', 'med', 'high']);

/**
 * Every agent answers in this shape.
 *
 * `abstain` is load-bearing. An agent with no evidence for its parameter must say so rather
 * than produce a plausible number — a fabricated occupancy is worse than a blank one,
 * because it enters rho linearly and looks considered.
 *
 * `evidence_used` is what makes the rationale checkable. Each entry is a dot/bracket path
 * into the context payload the agent was given; the verifier resolves every one of them and
 * fails the proposal if any path does not exist. An agent cannot cite geometry it was
 * never shown.
 */
export function proposalSchemaFor(param: AgentParam) {
  return z.object({
    abstain: z.boolean(),
    value: z.union([VALUE_SCHEMAS[param], z.null()]),
    self_confidence: SelfConfidence,
    rationale: z.string().min(1).max(600),
    evidence_used: z.array(z.string().min(1).max(200)).max(12),
  });
}

/* What goes on the wire to the model, as distinct from what we accept back.
 *
 * OpenAI's strict structured-output subset rejects numeric minimum/maximum, so the wire
 * schema carries shape and enums only. That is the right split regardless of provider: the
 * model is told the ranges in its prompt, and the hard check happens here on the way back,
 * where an out-of-range value is a reasoning failure to surface rather than a number to clamp.
 */
const WIRE_VALUES = {
  n: z.number().int(),
  r: z.number(),
  tau: z.number(),
  type: z.enum(['pancake', 'mixed', 'lean']),
  conf: z.enum(['low', 'med', 'high']),
} as const satisfies Record<AgentParam, z.ZodTypeAny>;

export function wireSchemaFor(param: AgentParam) {
  return z.object({
    abstain: z.boolean(),
    value: z.union([WIRE_VALUES[param], z.null()]),
    self_confidence: SelfConfidence,
    rationale: z.string(),
    evidence_used: z.array(z.string()),
  });
}

/** The gate. Anything a model hands back passes through here before it is a proposal. */
export function parseRawProposal(
  param: AgentParam,
  raw: unknown,
): { ok: true; value: RawProposal } | { ok: false; error: string } {
  const res = proposalSchemaFor(param).safeParse(raw);
  if (res.success) return { ok: true, value: res.data as RawProposal };
  const issue = res.error.issues[0];
  const where = issue?.path.join('.') || '(root)';
  return { ok: false, error: `${where}: ${issue?.message ?? 'invalid'}` };
}

export type RawProposal = {
  abstain: boolean;
  value: AgentValue | null;
  self_confidence: 'low' | 'med' | 'high';
  rationale: string;
  evidence_used: string[];
};

export type VerdictStatus = 'pass' | 'fail' | 'unverified';

export interface Verdict {
  check: string;
  status: VerdictStatus;
  detail: string;
}

export interface AgentResult {
  key: AgentKey;
  param: AgentParam;
  /** null when the agent abstained or the call failed */
  value: AgentValue | null;
  abstained: boolean;
  rationale: string;
  selfConfidence: 'low' | 'med' | 'high';
  evidenceUsed: string[];
  verdicts: Verdict[];
  /** false if any verdict failed — the UI must not present this as ready to apply */
  verified: boolean;
  error?: string;
  usage?: { input: number; output: number };
  ms: number;
}

export interface SwarmRunResult {
  generated: string;
  model: string;
  siteId: number | null;
  results: AgentResult[];
  totalMs: number;
  note: string;
}

/** Resolve a dotted/bracketed path such as `geometry.planes[2].drift_ratio`. */
export function resolvePath(root: unknown, path: string): { found: boolean; value: unknown } {
  const parts = path
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);
  let cur: unknown = root;
  for (const part of parts) {
    if (cur === null || cur === undefined) return { found: false, value: undefined };
    if (Array.isArray(cur)) {
      const i = Number(part);
      if (!Number.isInteger(i) || i < 0 || i >= cur.length) return { found: false, value: undefined };
      cur = cur[i];
      continue;
    }
    if (typeof cur !== 'object') return { found: false, value: undefined };
    if (!(part in (cur as Record<string, unknown>))) return { found: false, value: undefined };
    cur = (cur as Record<string, unknown>)[part];
  }
  return { found: true, value: cur };
}
