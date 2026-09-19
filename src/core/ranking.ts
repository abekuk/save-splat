import type { CollapseType, Site } from '@/types';

/** Survival decay rate per hour, by collapse morphology. */
export const LAMBDA: Record<CollapseType, number> = {
  pancake: 0.35,
  mixed: 0.15,
  lean: 0.06,
};

export const TYPE_LABEL: Record<CollapseType, string> = {
  pancake: 'PANCAKE',
  mixed: 'MIXED',
  lean: 'LEAN-TO',
};

export const DEFAULTS = {
  n: 8,
  q: 0.35,
  r: 0.6,
  type: 'mixed' as CollapseType,
  tau: 4,
  conf: 'med' as const,
};

/** Greedy index rule: expected lives per crew-hour, weighted by urgency.
 *  The denominator is guarded at 0.1 crew-hours so a slider at minimum cannot
 *  divide by zero. Confidence is an evidence flag and is deliberately absent. */
export function rho(s: Pick<Site, 'n' | 'q' | 'r' | 'tau' | 'type'>): number {
  return (s.n * s.q * s.r * LAMBDA[s.type]) / Math.max(0.1, s.tau);
}

/** Descending by rho — the dispatch order. */
export function ranked(sites: Site[]): Site[] {
  return sites.slice().sort((a, b) => rho(b) - rho(a));
}

/** Half-life of survival probability, hours. */
export function halfLife(type: CollapseType): number {
  return Math.LN2 / LAMBDA[type];
}
