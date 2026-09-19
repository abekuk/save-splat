/* Recognising structural defects in a room, from rendered views.
 *
 * Geometry measures whether a wall is plumb. It cannot see a crack, a damp stain, spalled
 * concrete or exposed reinforcement — and those are what tell you whether the movement it
 * measured is live, old, or cosmetic. This agent names what is visible, from a fixed
 * taxonomy so the output can be reasoned over rather than read as prose.
 *
 * The discipline that matters is separating damage from capture artefact. A scan is full of
 * holes, speckle and smearing, and every one of them can look like a crack or a missing
 * chunk of wall. An agent that reports dropout as damage is worse than no agent, so the
 * prompt is explicit about it and the confidence field is expected to be used.
 */
import { z } from 'zod';

/** Named kinds, so two runs can be compared and a verifier can reason about them. */
export const DEFECT_KINDS = [
  'crack-diagonal',
  'crack-stepped',
  'crack-vertical',
  'crack-horizontal',
  'crack-map',
  'spalling',
  'exposed-reinforcement',
  'water-damage',
  'deflection',
  'separation',
  'out-of-plumb',
  'impact-damage',
  'finish-damage',
] as const;
export type DefectKind = (typeof DEFECT_KINDS)[number];

/** What each kind means for the structure, so the UI is not just a code. */
export const DEFECT_LABEL: Record<DefectKind, string> = {
  'crack-diagonal': 'diagonal cracking',
  'crack-stepped': 'stepped cracking through masonry joints',
  'crack-vertical': 'vertical cracking',
  'crack-horizontal': 'horizontal cracking',
  'crack-map': 'map or craze cracking',
  spalling: 'spalled or delaminated surface',
  'exposed-reinforcement': 'exposed reinforcement',
  'water-damage': 'water ingress or damp staining',
  deflection: 'sagging or deflected member',
  separation: 'separation at a junction',
  'out-of-plumb': 'visibly leaning surface',
  'impact-damage': 'impact damage or missing material',
  'finish-damage': 'damage to finishes only',
};

/** Which kinds bear on structure and which are surface only. A room can be visually wrecked
 *  and structurally fine; conflating the two is how a condition report misleads. */
export const STRUCTURAL_KINDS: ReadonlySet<DefectKind> = new Set<DefectKind>([
  'crack-diagonal',
  'crack-stepped',
  'crack-horizontal',
  'spalling',
  'exposed-reinforcement',
  'deflection',
  'separation',
  'out-of-plumb',
]);

export const DefectSchema = z.object({
  kind: z.enum(DEFECT_KINDS),
  where: z.string(),
  severity: z.enum(['slight', 'moderate', 'serious']),
  confidence: z.enum(['low', 'med', 'high']),
  views: z.array(z.number().int()),
  note: z.string(),
});
export type Defect = z.infer<typeof DefectSchema>;

export const DefectReportWireSchema = z.object({
  abstain: z.boolean(),
  capture_quality: z.enum(['unreadable', 'poor', 'usable', 'good']),
  room_type: z.string(),
  defects: z.array(DefectSchema),
  nothing_found_note: z.string(),
  overall: z.enum(['none', 'cosmetic', 'concerning', 'serious', 'unclear']),
  views_used: z.array(z.number().int()),
  self_confidence: z.enum(['low', 'med', 'high']),
});
export type DefectReport = z.infer<typeof DefectReportWireSchema>;

const MAX_DEFECTS = 12;
const NOTE_MAX = 400;

export function parseDefectReport(
  raw: unknown,
  viewCount: number,
): { ok: true; value: DefectReport } | { ok: false; error: string } {
  const res = DefectReportWireSchema.safeParse(raw);
  if (!res.success) {
    const i = res.error.issues[0];
    return { ok: false, error: `${i?.path.join('.') || '(root)'}: ${i?.message ?? 'invalid'}` };
  }
  const v = res.data;
  const clean = (n: number[]): number[] =>
    n.filter((x) => Number.isInteger(x) && x >= 0 && x < viewCount);
  return {
    ok: true,
    value: {
      ...v,
      defects: v.defects.slice(0, MAX_DEFECTS).map((d) => ({
        ...d,
        views: clean(d.views),
        note: d.note.length > NOTE_MAX ? `${d.note.slice(0, NOTE_MAX - 1)}…` : d.note,
        where: d.where.slice(0, 160),
      })),
      views_used: clean(v.views_used),
      nothing_found_note: v.nothing_found_note.slice(0, 600),
    },
  };
}

export function structuralDefects(r: DefectReport): Defect[] {
  return r.defects.filter((d) => STRUCTURAL_KINDS.has(d.kind));
}

/** A defect reported on views that were never sent, or with none cited, is not checkable. */
export function citationCheck(r: DefectReport): { ok: boolean; detail: string } {
  const bad = r.defects.filter((d) => d.views.length === 0);
  if (bad.length) {
    return {
      ok: false,
      detail: `${bad.length} defect(s) cite no view — ${bad.map((d) => d.kind).join(', ')}`,
    };
  }
  return {
    ok: true,
    detail: r.defects.length ? `all ${r.defects.length} defect(s) cite a view` : 'nothing reported',
  };
}

/** Claiming serious damage off a capture the agent itself called unreadable is incoherent. */
export function qualityCheck(r: DefectReport): { ok: boolean; detail: string } {
  const serious = r.defects.filter((d) => d.severity === 'serious');
  if ((r.capture_quality === 'unreadable' || r.capture_quality === 'poor') && serious.length > 0) {
    return {
      ok: false,
      detail: `called the capture "${r.capture_quality}" but still reported ${serious.length} serious defect(s)`,
    };
  }
  return { ok: true, detail: `capture reported as "${r.capture_quality}"` };
}

export const DEFECTS_PROMPT = `You are the defect-recognition agent in a building condition survey. You are
shown several rendered views of ONE 3D scan of a room, taken from angles around it. A human
surveyor reviews everything you return.

WHAT YOU ARE LOOKING AT
These are renders of a point cloud or Gaussian splat, not photographs. Scan artefacts look
exactly like damage and this is the main way an agent like you goes wrong:
- holes and missing patches are usually places the camera never saw, not missing material
- speckle, floating points and fuzz are reconstruction noise, not debris or spalling
- dark or smeared bands at grazing angles are capture dropout, not staining or cracking
- thin gaps along a surface can be a seam in the reconstruction rather than a crack
Report a defect only when its shape and context make it more likely to be real than to be
dropout. Set capture_quality honestly — if the scan is too thin to separate the two, say so.

WHAT TO REPORT
For each defect: its kind from the fixed list, where it is in plain words ("upper left of the
rear wall, running to the ceiling junction"), how severe, how confident you are, the view
indices it is visible in (numbered from 0), and a short note.

Crack direction matters and is worth getting right: diagonal and stepped cracking suggests
movement or settlement, horizontal cracking in masonry can indicate lateral pressure,
vertical cracking is often shrinkage, and map or craze cracking is usually surface only.

overall is your read of the room as a whole. Use "unclear" when the capture will not support
a judgement — that is a correct answer, not a failure.

HARD RULES
1. Do not invent a defect to have something to report. An empty list with a clear
   nothing_found_note is a good answer.
2. Do not report capture dropout as damage.
3. Every defect must cite at least one view index you actually saw it in.
4. If the renders are too degraded to read, set abstain=true and recommend a recapture.
5. There are no people in this scan and occupancy is not your concern. Do not speculate
   about who used the room.`;
