/* Cheap verifiers. Pure functions over the payload and the proposal — no second model call,
 * which is what makes them cheap enough to run on every proposal.
 *
 * The citation check applies to every agent and is the one that catches fabrication: an agent
 * must name the payload paths it used, and every one is resolved against the payload it was
 * actually given. Reasoning from geometry it was never shown fails here.
 *
 * A verifier returns "unverified" when the evidence to check it is genuinely absent. That is
 * not a pass. Access has no route network and occupancy has no registry, so those say so
 * rather than rubber-stamping.
 */
import type { AgentKey, AgentParam } from './agents';
import { resolvePath } from './proposal';
import type { AgentValue, RawProposal, Verdict } from './proposal';

export interface VerifyInput {
  key: AgentKey;
  param: AgentParam;
  proposal: RawProposal;
  /** the exact payload the agent was sent */
  payload: Record<string, unknown>;
  /** for corroboration only */
  upstream?: { key: AgentKey; abstained: boolean; verified: boolean }[];
}

type PlaneLike = {
  cls?: string;
  support?: number;
  tilt_deg?: number;
  drift_band?: string | null;
};

function planes(payload: Record<string, unknown>): PlaneLike[] {
  const g = payload.geometry as { planes?: PlaneLike[] } | null | undefined;
  return Array.isArray(g?.planes) ? g.planes : [];
}
function supportBy(ps: PlaneLike[], cls: string): number {
  return ps.filter((p) => p.cls === cls).reduce((a, p) => a + (p.support ?? 0), 0);
}
function num(payload: Record<string, unknown>, path: string): number | null {
  const r = resolvePath(payload, path);
  return r.found && typeof r.value === 'number' && isFinite(r.value) ? r.value : null;
}

/** Contract: abstain and value must agree. A value alongside abstain=true is incoherent. */
function contractCheck(p: RawProposal): Verdict {
  if (p.abstain && p.value !== null) {
    return { check: 'contract', status: 'fail', detail: 'abstained but still returned a value' };
  }
  if (!p.abstain && p.value === null) {
    return { check: 'contract', status: 'fail', detail: 'returned no value without abstaining' };
  }
  return {
    check: 'contract',
    status: 'pass',
    detail: p.abstain ? 'abstained cleanly' : 'value present',
  };
}

/** Every cited path must exist in the payload the agent was handed. */
function citationCheck(p: RawProposal, payload: Record<string, unknown>): Verdict {
  if (p.evidence_used.length === 0) {
    return p.abstain
      ? { check: 'citations', status: 'pass', detail: 'abstained, nothing cited' }
      : { check: 'citations', status: 'fail', detail: 'proposed a value citing no evidence' };
  }
  const bad = p.evidence_used.filter((path) => !resolvePath(payload, path).found);
  if (bad.length) {
    return {
      check: 'citations',
      status: 'fail',
      detail: `cited ${bad.length} path(s) absent from the payload: ${bad.slice(0, 3).join(', ')}`,
    };
  }
  return {
    check: 'citations',
    status: 'pass',
    detail: `all ${p.evidence_used.length} cited path(s) resolve`,
  };
}

function morphologyCheck(v: AgentValue | null, payload: Record<string, unknown>): Verdict {
  const ps = planes(payload);
  if (!ps.length) {
    return { check: 'plane-consistency', status: 'unverified', detail: 'no planes extracted' };
  }
  const slab = supportBy(ps, 'slab');
  const wall = supportBy(ps, 'wall');
  const leanCandidates = ps.filter(
    (p) => p.cls === 'incline' && (p.support ?? 0) >= 0.02 && (p.tilt_deg ?? 0) >= 25,
  );
  if (v === 'lean' && leanCandidates.length === 0) {
    return {
      check: 'plane-consistency',
      status: 'fail',
      detail: 'lean-to proposed but no inclined plane holds >=2% support at >=25 degrees',
    };
  }
  if (v === 'pancake' && wall > slab * 2 && wall > 0.1) {
    return {
      check: 'plane-consistency',
      status: 'fail',
      detail: `pancake proposed but vertical structure dominates (wall support ${(wall * 100).toFixed(0)}% vs slab ${(slab * 100).toFixed(0)}%)`,
    };
  }
  return {
    check: 'plane-consistency',
    status: 'pass',
    detail: `slab ${(slab * 100).toFixed(0)}% / wall ${(wall * 100).toFixed(0)}% support, ${leanCandidates.length} steep incline(s)`,
  };
}

/** tau must imply a defensible clearance rate, and the column volume must respect its bound. */
const RATE_MIN = 0.2;
const RATE_MAX = 20;
function volumeCheck(v: AgentValue | null, payload: Record<string, unknown>): Verdict {
  if (typeof v !== 'number') {
    return { check: 'clearance-rate', status: 'unverified', detail: 'no tau proposed' };
  }
  const calibrated = resolvePath(payload, 'scan.scale_calibrated').value === true;
  const vol = num(payload, 'geometry.debris.total_volume_m3');
  if (vol === null) {
    return { check: 'clearance-rate', status: 'unverified', detail: 'no debris volume measured' };
  }
  if (!calibrated) {
    return {
      check: 'clearance-rate',
      status: 'unverified',
      detail: 'scan scale is uncalibrated, so volume is in scan units and the rate is not checkable',
    };
  }
  if (vol < 0.5) {
    return {
      check: 'clearance-rate',
      status: 'unverified',
      detail: `debris volume ${vol.toFixed(2)} m³ is too small to constrain tau`,
    };
  }
  const rate = vol / v;
  if (rate < RATE_MIN || rate > RATE_MAX) {
    return {
      check: 'clearance-rate',
      status: 'fail',
      detail: `tau ${v}h against ${vol.toFixed(1)} m³ implies ${rate.toFixed(2)} m³/crew-hour, outside ${RATE_MIN}–${RATE_MAX}`,
    };
  }
  return {
    check: 'clearance-rate',
    status: 'pass',
    detail: `implies ${rate.toFixed(2)} m³/crew-hour`,
  };
}

/** No route network exists in the payload, so this only catches a contradiction. */
function accessCheck(v: AgentValue | null, payload: Record<string, unknown>): Verdict {
  if (typeof v !== 'number') {
    return { check: 'stability-consistency', status: 'unverified', detail: 'no r proposed' };
  }
  const severe = planes(payload).filter(
    (p) => p.cls === 'wall' && p.drift_band === 'SEVERE' && (p.support ?? 0) >= 0.02,
  );
  if (severe.length > 0 && v > 0.8) {
    return {
      check: 'stability-consistency',
      status: 'fail',
      detail: `r=${v} is high with ${severe.length} well-supported SEVERE-drift wall(s) overhead`,
    };
  }
  return {
    check: 'stability-consistency',
    status: 'unverified',
    detail:
      severe.length > 0
        ? `consistent with ${severe.length} SEVERE-drift wall(s), but no approach route in the payload`
        : 'no approach route, street network or opening imagery in the payload to verify against',
  };
}

/** Occupancy may only come from operator notes, and the notes must actually be cited. */
function recordsCheck(p: RawProposal, payload: Record<string, unknown>): Verdict {
  if (p.abstain) {
    return {
      check: 'source-present',
      status: 'pass',
      detail: 'abstained — no occupancy source, which is the correct outcome',
    };
  }
  const notes = resolvePath(payload, 'operator_notes');
  const hasNotes = notes.found && typeof notes.value === 'string' && notes.value.trim().length > 0;
  if (!hasNotes) {
    return {
      check: 'source-present',
      status: 'fail',
      detail: 'proposed an occupancy with no operator notes in the payload — nothing else evidences it',
    };
  }
  if (!p.evidence_used.some((e) => e.startsWith('operator_notes'))) {
    return {
      check: 'source-present',
      status: 'fail',
      detail: 'proposed an occupancy without citing operator_notes as its source',
    };
  }
  return { check: 'source-present', status: 'pass', detail: 'occupancy traced to operator notes' };
}

function corroborationCheck(v: AgentValue | null, up: VerifyInput['upstream']): Verdict {
  if (!up || up.length === 0) {
    return { check: 'agreement', status: 'unverified', detail: 'no upstream results supplied' };
  }
  const failed = up.filter((u) => !u.verified).map((u) => u.key);
  const abstained = up.filter((u) => u.abstained).map((u) => u.key);
  if ((failed.length > 0 || abstained.length > 0) && v !== 'low') {
    return {
      check: 'agreement',
      status: 'fail',
      detail: `conf="${String(v)}" but ${[
        failed.length ? `${failed.join(', ')} failed a verifier` : '',
        abstained.length ? `${abstained.join(', ')} abstained` : '',
      ]
        .filter(Boolean)
        .join('; ')}`,
    };
  }
  if (v === 'high' && (failed.length > 0 || abstained.length > 0)) {
    return { check: 'agreement', status: 'fail', detail: 'high confidence despite upstream gaps' };
  }
  return {
    check: 'agreement',
    status: 'pass',
    detail: failed.length + abstained.length === 0 ? 'all upstream verified' : 'flagged the gaps',
  };
}

export function verify(input: VerifyInput): Verdict[] {
  const { key, proposal, payload, upstream } = input;
  const out: Verdict[] = [contractCheck(proposal), citationCheck(proposal, payload)];
  if (proposal.abstain && key !== 'records') {
    out.push({ check: 'domain', status: 'unverified', detail: 'abstained, nothing to check' });
    return out;
  }
  switch (key) {
    case 'morphology':
      out.push(morphologyCheck(proposal.value, payload));
      break;
    case 'volume':
      out.push(volumeCheck(proposal.value, payload));
      break;
    case 'access':
      out.push(accessCheck(proposal.value, payload));
      break;
    case 'records':
      out.push(recordsCheck(proposal, payload));
      break;
    case 'corroboration':
      out.push(corroborationCheck(proposal.value, upstream));
      break;
  }
  return out;
}

/** A proposal is applyable only if nothing failed. "unverified" is not a pass, but it does
 *  not block the operator — it is surfaced so they know what was not checked. */
export function isVerified(verdicts: Verdict[]): boolean {
  return !verdicts.some((v) => v.status === 'fail');
}
