/* Runtime contract for the agent seam.
 *
 * Everything an external reasoner hands us crosses a trust boundary: it arrives as
 * unknown JSON from a model, a paste, or a console call. These schemas are where that
 * becomes typed data, and the parse is the only way in.
 *
 * Deliberate change from the pre-Zod version, which clamped out-of-range values into the
 * slider range: a proposal of n = 500 is a reasoning failure, and silently clamping it to
 * 50 launders a bad number into the ranking as though it were considered. It is rejected
 * with a readable message instead, which an agent can act on and retry.
 */
import { z } from 'zod';

export const CollapseTypeSchema = z.enum(['pancake', 'mixed', 'lean']);
export const ConfidenceSchema = z.enum(['low', 'med', 'high']);

/** Ranges mirror the sliders exactly — one source of truth for both. */
export const PARAM_SCHEMAS = {
  n: z
    .number()
    .int('occupancy is a headcount, so it must be a whole number')
    .min(0)
    .max(50)
    .describe('persons believed inside'),
  r: z.number().min(0).max(1).describe('P(extraction succeeds)'),
  tau: z.number().min(0.5).max(24).describe('crew-hours until the outcome is decided'),
  type: CollapseTypeSchema.describe('collapse morphology, which sets lambda'),
  conf: ConfidenceSchema.describe('evidence-quality flag; never enters rho'),
} as const;

export type AgentParam = keyof typeof PARAM_SCHEMAS;
export type ProposalValue = z.infer<(typeof PARAM_SCHEMAS)[AgentParam]>;

export const ProposalInputSchema = z.object({
  value: z.unknown(),
  rationale: z.string().max(2000).optional(),
});

/** Parse a proposal for one parameter. Returns a discriminated result rather than
 *  throwing, so callers can surface the message in the UI. */
export function parseProposal(
  param: AgentParam,
  value: unknown,
): { ok: true; value: ProposalValue } | { ok: false; error: string } {
  const res = PARAM_SCHEMAS[param].safeParse(value);
  if (res.success) return { ok: true, value: res.data as ProposalValue };
  const issue = res.error.issues[0];
  return { ok: false, error: issue?.message ?? 'invalid value' };
}

/* ---------------- persisted queue ---------------- */

export const Vec3Schema = z.object({ x: z.number(), y: z.number(), z: z.number() });

export const SiteSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().min(1).max(80),
  pos: Vec3Schema,
  n: PARAM_SCHEMAS.n,
  q: z.number().min(0).max(1),
  r: PARAM_SCHEMAS.r,
  tau: PARAM_SCHEMAS.tau,
  type: CollapseTypeSchema,
  conf: ConfidenceSchema,
});

/** The queue as written by EXPORT JSON. Validating on the way back in means a
 *  hand-edited or model-generated file cannot put the app into a state the UI
 *  cannot render. */
export const QueueExportSchema = z.object({
  generated: z.string(),
  sites: z.array(SiteSchema).max(500),
  metresPerUnit: z.number().positive().optional(),
});

export type QueueExport = z.infer<typeof QueueExportSchema>;

export function parseQueueImport(
  json: unknown,
): { ok: true; data: QueueExport } | { ok: false; error: string } {
  const res = QueueExportSchema.safeParse(json);
  if (res.success) return { ok: true, data: res.data };
  const issue = res.error.issues[0];
  const path = issue?.path.join('.') || '(root)';
  return { ok: false, error: `${path}: ${issue?.message ?? 'invalid'}` };
}
