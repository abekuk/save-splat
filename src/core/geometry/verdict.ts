/* A plain-language read of what the geometry found.
 *
 * The panel used to open with plane normals, rms residuals and support fractions — the
 * extractor's working notes, not an answer. Someone deciding whether a building is safe to
 * enter needs the verdict first; the numbers that produced it belong underneath, for the
 * person who wants to check the reasoning.
 *
 * The verdict is deliberately conservative about what it will speak for. A sliver caught at
 * a steep angle produces a huge drift ratio off almost no material, and letting that drive
 * the headline would call a plumb room severe. Fragments still appear — they are named as
 * fragments rather than hidden — they just do not get a vote.
 */
import type { Plane } from '@/types';

export type Severity = 'unknown' | 'sound' | 'minor' | 'moderate' | 'severe';

/** A wall has to be a real piece of structure before it speaks for the building.
 *  Scale-free on purpose: support is a share of the cloud, so it holds for an
 *  uncalibrated scan too. */
export const VERDICT_MIN_SUPPORT = 0.02;
export const VERDICT_MIN_FILL = 0.3;

export function isStructural(p: Plane): boolean {
  return p.support >= VERDICT_MIN_SUPPORT && p.fill >= VERDICT_MIN_FILL;
}

export function severityOf(drift: number): Severity {
  if (drift >= 0.02) return 'severe';
  if (drift >= 0.01) return 'moderate';
  if (drift >= 0.005) return 'minor';
  return 'sound';
}

export const SEVERITY_CSS: Record<Severity, string> = {
  unknown: 'var(--dim)',
  sound: 'var(--dim)',
  minor: 'var(--r3)',
  moderate: 'var(--r2)',
  severe: 'var(--r1)',
};

export interface Verdict {
  level: Severity;
  /** the one line someone reads first */
  headline: string;
  /** what it rests on, in a sentence */
  detail: string;
  /** walls solid enough to judge, worst lean first */
  structural: Plane[];
  /** measured, but too small or too sparse to speak for the building */
  fragments: Plane[];
  worst: Plane | null;
}

function deg(p: Plane): string {
  return `${((p.tilt * 180) / Math.PI).toFixed(1)}°`;
}

export function buildVerdict(planes: Plane[]): Verdict {
  const walls = planes.filter((p) => p.cls === 'wall' && p.drift != null);
  const structural = walls.filter(isStructural).sort((a, b) => (b.drift ?? 0) - (a.drift ?? 0));
  const fragments = walls.filter((p) => !isStructural(p));

  if (structural.length === 0) {
    return {
      level: 'unknown',
      headline: 'Not enough wall captured to judge',
      detail: walls.length
        ? `${walls.length} wall surface${walls.length === 1 ? '' : 's'} came out too small or too patchy to speak for the building. Re-scan the standing walls from more angles.`
        : 'No near-vertical surfaces were found in this scan.',
      structural,
      fragments,
      worst: null,
    };
  }

  const worst = structural[0];
  const level = severityOf(worst.drift ?? 0);
  const others = structural.length - 1;
  const rest =
    others > 0
      ? ` The other ${others === 1 ? 'wall is' : `${others} walls are`} ${
          structural.slice(1).every((p) => severityOf(p.drift ?? 0) === 'sound')
            ? 'effectively plumb'
            : 'less affected'
        }.`
      : '';

  const headline: Record<Severity, string> = {
    severe: 'Serious lean — treat as unsafe',
    moderate: 'Noticeable lean — needs assessment',
    minor: 'Slight lean — worth a look',
    sound: 'Nothing structurally alarming',
    unknown: 'Not enough wall captured to judge',
  };

  const detail =
    level === 'sound'
      ? `The ${structural.length === 1 ? 'wall measured is' : `${structural.length} walls measured are`} within a whisker of plumb — worst is ${worst.label} at ${deg(worst)}.`
      : `${worst.label} is ${deg(worst)} off plumb, a ${((worst.drift ?? 0) * 100).toFixed(1)}% lean.${rest}`;

  return { level, headline: headline[level], detail, structural, fragments, worst };
}

/** Plain wording for one wall, so the list reads as sentences rather than a table. */
export function wallPhrase(p: Plane): string {
  const s = severityOf(p.drift ?? 0);
  if (s === 'sound') return 'plumb';
  if (s === 'minor') return 'leaning slightly';
  if (s === 'moderate') return 'leaning';
  return 'leaning badly';
}

/** Wording for a non-vertical surface. A slab 20 degrees off level is not a "floor" in any
 *  useful sense, and calling it one is the kind of readout that makes a panel untrustworthy. */
export function surfacePhrase(p: Plane): string {
  const d = (p.tilt * 180) / Math.PI;
  if (p.cls === 'slab') return d < 10 ? 'floor, off level by' : 'floor, badly out of level by';
  return 'sloping surface at';
}
