/* Agent swarm — the contract only. No reasoning runs, nothing is generated.
 *
 * One agent per ranking parameter, each with its own evidence source and a cheap verifier.
 * The geometry layer is the evidence substrate. A proposal is inert until an operator
 * applies it, and applying is logged with the value it replaced — the framing is assisted
 * assessment, never autonomous dispatch.
 *
 * q — P(trapped alive) deliberately has no agent. Nothing in an exterior scan evidences
 * whether an occupant is alive, so it is left wholly to the operator rather than given a
 * plausible-looking number.
 */
import type { AgentParam, ProposalValue } from './schema';

export type { AgentParam, ProposalValue };
export { parseProposal, PARAM_SCHEMAS } from './schema';

export type AgentKey = 'records' | 'access' | 'volume' | 'morphology' | 'corroboration';

export interface SwarmAgent {
  key: AgentKey;
  name: string;
  param: AgentParam;
  label: string;
  evidence: string;
  verifier: string;
}

export interface Proposal {
  value: ProposalValue;
  rationale: string;
  at: Date;
}

export interface OverrideEntry {
  at: Date;
  agent: string;
  label: string;
  from: string;
  to: string;
}

export const SWARM_AGENTS: SwarmAgent[] = [
  {
    key: 'records',
    name: 'RECORDS',
    param: 'n',
    label: 'n — occupancy',
    evidence: 'rosters, shift patterns, witness statements, time-of-day occupancy',
    verifier: 'two independent sources; disagreement widens the band instead of averaging it away',
  },
  {
    key: 'access',
    name: 'ACCESS',
    param: 'r',
    label: 'r — P(extraction)',
    evidence: 'plane extents, debris columns, detected ground plane, route clearance',
    verifier: 're-run the route with the largest debris cluster removed; r must not jump a band',
  },
  {
    key: 'volume',
    name: 'VOLUME',
    param: 'tau',
    label: 'τ — crew-hours',
    evidence: 'debris volume by column method, plane fill%, breaching and shoring burden',
    verifier: 'column volume against a convex-hull bound; a gap past tolerance flags an overhang',
  },
  {
    key: 'morphology',
    name: 'MORPHOLOGY',
    param: 'type',
    label: 'λ — collapse type',
    evidence: 'plane classes, slab tilt distribution, lean-to angles, wall drift bands',
    verifier: 're-fit on a held-out half of the cloud; the λ band must agree',
  },
  {
    key: 'corroboration',
    name: 'CORROBORATION',
    param: 'conf',
    label: 'confidence',
    evidence: 'agreement across the other four agents and the quality of what they read',
    verifier: 'flags LOW whenever any upstream agent failed its own verifier',
  },
];

export function agentByKey(k: string): SwarmAgent | null {
  return SWARM_AGENTS.find((a) => a.key === k) ?? null;
}
