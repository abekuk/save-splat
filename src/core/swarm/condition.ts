/* The room's condition, from two sources that see different things.
 *
 * Geometry measures verticality and level. It is blind to a crack, a stain or spalled
 * concrete. The vision agent sees those and is blind to a 0.6 degree lean. Neither overrides
 * the other, so the condition is the worse of the two reads, and a disagreement between them
 * is reported rather than averaged away — a room that measures plumb but shows diagonal
 * cracking is exactly the case worth a surveyor's attention.
 */
import { DEFECT_LABEL, structuralDefects } from './defects';
import type { Defect, DefectReport } from './defects';
import type { Severity } from '@/core/geometry/verdict';

export type ConditionLevel = 'unknown' | 'sound' | 'cosmetic' | 'concerning' | 'serious';

const ORDER: ConditionLevel[] = ['unknown', 'sound', 'cosmetic', 'concerning', 'serious'];
const rank = (l: ConditionLevel): number => Math.max(0, ORDER.indexOf(l));

export const CONDITION_WORD: Record<ConditionLevel, string> = {
  unknown: 'CANNOT JUDGE',
  sound: 'LOOKS SOUND',
  cosmetic: 'COSMETIC ONLY',
  concerning: 'CONCERNING',
  serious: 'SERIOUS',
};

export const CONDITION_CSS: Record<ConditionLevel, string> = {
  unknown: 'var(--dim)',
  sound: 'var(--dim)',
  cosmetic: 'var(--r3)',
  concerning: 'var(--r2)',
  serious: 'var(--r1)',
};

/** Geometry's verticality reading, on the shared scale. */
export function fromGeometry(s: Severity): ConditionLevel {
  if (s === 'unknown') return 'unknown';
  if (s === 'sound') return 'sound';
  if (s === 'minor') return 'cosmetic';
  if (s === 'moderate') return 'concerning';
  return 'serious';
}

/** What the visible defects amount to. Surface-only damage never reads above cosmetic,
 *  however much of it there is. */
export function fromDefects(r: DefectReport | null): ConditionLevel {
  if (!r || r.abstain) return 'unknown';
  if (r.overall === 'unclear') return 'unknown';
  const structural = structuralDefects(r);
  if (structural.length === 0) return r.defects.length > 0 ? 'cosmetic' : 'sound';
  const worst = structural.reduce(
    (a, d) =>
      d.severity === 'serious'
        ? 'serious'
        : d.severity === 'moderate' && a !== 'serious'
          ? 'moderate'
          : a,
    'slight' as 'slight' | 'moderate' | 'serious',
  );
  return worst === 'serious' ? 'serious' : worst === 'moderate' ? 'concerning' : 'cosmetic';
}

export interface ConditionLine {
  label: string;
  text: string;
  tone: 'ok' | 'warn' | 'bad' | 'dim';
}

export interface Condition {
  level: ConditionLevel;
  headline: string;
  detail: string;
  lines: ConditionLine[];
  /** the defects that bear on structure, worst first */
  structural: Defect[];
  /** set when the two sources disagree by more than one step */
  conflict: string | null;
}

const HEADLINE: Record<ConditionLevel, string> = {
  unknown: 'Not enough captured to judge this room',
  sound: 'Nothing structurally wrong is visible',
  cosmetic: 'Surface damage only',
  concerning: 'Signs worth a surveyor looking',
  serious: 'Serious defects — get someone qualified in',
};

export function buildCondition(
  geo: Severity,
  geoDetail: string,
  report: DefectReport | null,
): Condition {
  const g = fromGeometry(geo);
  const d = fromDefects(report);
  const level = rank(g) >= rank(d) ? g : d;

  const structural = report
    ? [...structuralDefects(report)].sort(
        (a, b) =>
          (b.severity === 'serious' ? 2 : b.severity === 'moderate' ? 1 : 0) -
          (a.severity === 'serious' ? 2 : a.severity === 'moderate' ? 1 : 0),
      )
    : [];

  // a gap of two steps means one source is seeing something the other flatly is not
  let conflict: string | null = null;
  if (g !== 'unknown' && d !== 'unknown' && Math.abs(rank(g) - rank(d)) >= 2) {
    conflict =
      rank(d) > rank(g)
        ? `the planes measure as ${CONDITION_WORD[g].toLowerCase()}, but the views show ${structural.map((s) => DEFECT_LABEL[s.kind]).join(', ') || 'clear damage'} — cracking does not need a wall to be out of plumb`
        : `the planes measure as ${CONDITION_WORD[g].toLowerCase()} but the views found little — movement can be old and the surface since made good`;
  }

  const lines: ConditionLine[] = [
    {
      label: 'Geometry',
      tone: g === 'serious' ? 'bad' : g === 'concerning' ? 'warn' : g === 'unknown' ? 'dim' : 'ok',
      text: geoDetail,
    },
    {
      label: 'Visible',
      tone: d === 'serious' ? 'bad' : d === 'concerning' ? 'warn' : d === 'unknown' ? 'dim' : 'ok',
      text: !report
        ? 'not looked at yet — run LOOK'
        : report.abstain
          ? 'the capture was too thin to read'
          : report.defects.length === 0
            ? report.nothing_found_note || 'no defects found in the views'
            : `${report.defects.length} defect${report.defects.length === 1 ? '' : 's'}: ${report.defects.map((x) => DEFECT_LABEL[x.kind]).join(', ')}`,
    },
    {
      label: 'Capture',
      tone:
        report && (report.capture_quality === 'good' || report.capture_quality === 'usable')
          ? 'ok'
          : 'warn',
      text: report ? report.capture_quality : 'unknown',
    },
  ];

  const detail =
    level === 'unknown'
      ? 'Neither the planes nor the views gave enough to work with. A denser capture of the walls would change that.'
      : conflict
        ? conflict
        : structural.length
          ? `${DEFECT_LABEL[structural[0].kind]} — ${structural[0].where}.`
          : geoDetail;

  return { level, headline: HEADLINE[level], detail, lines, structural, conflict };
}
