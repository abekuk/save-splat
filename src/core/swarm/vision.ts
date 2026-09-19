/* The agent that looks instead of reading.
 *
 * Geometry answers "is this wall plumb". It cannot answer "is this a classroom", "is that a
 * gas cylinder", or "did people use this room" — and a scan is full of objects that say so.
 * This agent is handed rendered views from several angles around the scene and reports what
 * is visible.
 *
 * It is deliberately barred from producing a headcount. Seeing school bags is evidence a
 * space was used, not evidence of how many people are in it, and the whole reason RECORDS
 * abstains is that nothing in a scan supports that number. Letting a vision model supply one
 * through the back door would defeat it, so the schema has no field for it and the verifier
 * rejects a headcount smuggled into the prose.
 */
import { z } from 'zod';

export const DAMAGE_READS = ['none', 'light', 'moderate', 'severe', 'unclear'] as const;
export type DamageRead = (typeof DAMAGE_READS)[number];

/** Shape only — the range and content checks happen on the way back. */
export const VisionWireSchema = z.object({
  abstain: z.boolean(),
  scene_type: z.string(),
  objects: z.array(z.string()),
  occupancy_indicators: z.array(z.string()),
  hazard_indicators: z.array(z.string()),
  damage_read: z.enum(DAMAGE_READS),
  notes: z.string(),
  views_used: z.array(z.number().int()),
  self_confidence: z.enum(['low', 'med', 'high']),
});

export type VisionReport = z.infer<typeof VisionWireSchema>;

const LIST_MAX = 12;
const NOTES_MAX = 1200;

/** Same split as the proposal gate: trim what is presentation, reject what is a claim. */
export function parseVisionReport(
  raw: unknown,
  viewCount: number,
): { ok: true; value: VisionReport } | { ok: false; error: string } {
  const res = VisionWireSchema.safeParse(raw);
  if (!res.success) {
    const issue = res.error.issues[0];
    return {
      ok: false,
      error: `${issue?.path.join('.') || '(root)'}: ${issue?.message ?? 'invalid'}`,
    };
  }
  const v = res.data;
  return {
    ok: true,
    value: {
      ...v,
      objects: v.objects.slice(0, LIST_MAX),
      occupancy_indicators: v.occupancy_indicators.slice(0, LIST_MAX),
      hazard_indicators: v.hazard_indicators.slice(0, LIST_MAX),
      notes: v.notes.length > NOTES_MAX ? `${v.notes.slice(0, NOTES_MAX - 1)}…` : v.notes,
      views_used: v.views_used.filter((i) => Number.isInteger(i) && i >= 0 && i < viewCount),
    },
  };
}

/** A headcount smuggled into prose. Deliberately narrow: it looks for a number attached to
 *  people, not for any mention of people at all. */
const HEADCOUNT =
  /\b(?:about|around|roughly|approx\.?|approximately|~)?\s*\d+\s*(?:\+|or more)?\s*(?:people|persons?|occupants?|children|pupils|students|staff|adults|victims|bodies)\b/i;

export function claimsHeadcount(v: VisionReport): string | null {
  const haystacks = [v.notes, ...v.occupancy_indicators, ...v.objects];
  for (const h of haystacks) {
    const m = HEADCOUNT.exec(h);
    if (m) return m[0].trim();
  }
  return null;
}

/** Geometry and imagery reading the same scene should not contradict each other. When they
 *  do, that is the most useful thing either of them said. */
export function damageAgreement(
  vision: DamageRead,
  geometry: 'unknown' | 'sound' | 'minor' | 'moderate' | 'severe',
): { status: 'pass' | 'fail' | 'unverified'; detail: string } {
  if (vision === 'unclear' || geometry === 'unknown') {
    return {
      status: 'unverified',
      detail: `imagery says "${vision}", geometry says "${geometry}" — not enough on one side to compare`,
    };
  }
  const rank: Record<string, number> = {
    none: 0,
    sound: 0,
    light: 1,
    minor: 1,
    moderate: 2,
    severe: 3,
  };
  const gap = Math.abs(rank[vision] - rank[geometry]);
  if (gap >= 2) {
    return {
      status: 'fail',
      detail: `imagery reads "${vision}" but the planes read "${geometry}" — one of them is wrong, and which matters`,
    };
  }
  return {
    status: 'pass',
    detail: `imagery "${vision}" is consistent with the geometry's "${geometry}"`,
  };
}

export const VISION_PROMPT = `You are the vision agent in a post-disaster structural triage swarm. You are
shown several rendered views of ONE 3D scan, taken from angles around it. An operator reviews
everything you return; nothing you say is acted on automatically.

WHAT YOU ARE LOOKING AT
These are renders of a point cloud or Gaussian splat, not photographs. Expect scan artefacts:
holes where nothing was captured, smearing, floating specks, missing ceilings, and surfaces
that dissolve at grazing angles. Do not report an artefact as damage. A gap in the cloud is
usually a gap in the capture.

WHAT TO REPORT
- scene_type: what kind of space this is, in a few words, if it is legible.
- objects: what is actually visible. Be concrete and only list what you can see.
- occupancy_indicators: signs that people use or used this space — bags, bedding, tools in
  use, personal effects, vehicles. These are evidence of USE.
- hazard_indicators: visible hazards — exposed reinforcement, standing water, fire damage,
  leaning or unsupported members, cylinders, spills.
- damage_read: your read of visible structural damage across the views.
- views_used: the indices of the views you actually relied on. They are numbered from 0 and
  are checked against what you were sent.
- notes: at most three sentences.

HARD RULES
1. Never estimate how many people are or were present. Not a number, not a range, not
   "a class of about thirty". Occupancy is not inferable from imagery and a headcount here
   would be rejected. Report what you SEE and let the operator draw that conclusion.
2. If the renders are too sparse or degraded to read, set abstain=true and say so. Abstaining
   is a correct answer.
3. Report only what is in these views. You have no other information about this building.`;
