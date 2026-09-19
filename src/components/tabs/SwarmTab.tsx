import { useEffect } from 'react';
import type { AppSnapshot } from '@/core/snapshot';
import { SWARM_AGENTS, agentByKey, parseProposal } from '@/core/swarm/agents';
import type { AgentParam, ProposalValue } from '@/core/swarm/agents';
import { buildSwarmContext, copyText } from '@/core/swarm/context';
import { LAMBDA, TYPE_LABEL, rho } from '@/core/ranking';
import { mVol } from '@/core/units';
import { fmtInt, fmtNum } from '@/core/util';
import { getState, setState, setStatus, updateSite, useAppState } from '@/state/store';
import type { Site } from '@/types';

/** Display form of a parameter as the operator currently has it. */
function paramText(s: Partial<Site> | null, param: AgentParam): string {
  if (!s) return '—';
  if (param === 'type') {
    const t = s.type;
    return t ? `${TYPE_LABEL[t]} (λ ${LAMBDA[t].toFixed(3)})` : '—';
  }
  if (param === 'conf') return String(s.conf ?? '—').toUpperCase();
  if (param === 'n') return String(s.n ?? '—');
  if (param === 'tau') return s.tau != null ? s.tau.toFixed(1) : '—';
  const v = s[param as 'r'];
  return v != null ? Number(v).toFixed(2) : '—';
}

function proposalText(v: ProposalValue, param: AgentParam): string {
  const shim: Partial<Site> = {};
  if (param === 'type') shim.type = v as Site['type'];
  else if (param === 'conf') shim.conf = v as Site['conf'];
  else if (param === 'n') shim.n = v as number;
  else if (param === 'tau') shim.tau = v as number;
  else shim.r = v as number;
  return paramText(shim, param);
}

export default function SwarmTab({ snap }: { snap: AppSnapshot }) {
  const s = useAppState();
  const site = s.sites.find((x) => x.id === s.selectedId) ?? null;
  const ctx = buildSwarmContext(snap);
  const chars = JSON.stringify(ctx).length;

  /* The seam a reasoner plugs into. Deliberately the whole public surface. */
  useEffect(() => {
    const api = {
      agents: SWARM_AGENTS,
      context: () => buildSwarmContext(snap),
      propose(key: string, value: unknown, rationale?: string) {
        const a = agentByKey(key);
        if (!a) {
          throw new Error(
            `no such agent "${key}" — try one of: ${SWARM_AGENTS.map((x) => x.key).join(', ')}`,
          );
        }
        const parsed = parseProposal(a.param, value);
        if (!parsed.ok) {
          throw new Error(`${a.label}: ${parsed.error} (received ${JSON.stringify(value)})`);
        }
        setState((st) => ({
          proposals: {
            ...st.proposals,
            [key]: { value: parsed.value, rationale: rationale ?? '', at: new Date() },
          },
        }));
        return parsed.value;
      },
      clear: () => setState({ proposals: {} }),
      log: () => getState().overrideLog.slice(),
    };
    (window as unknown as { RubbleSwarm: typeof api }).RubbleSwarm = api;
  }, [snap]);

  const apply = (key: string): void => {
    const a = agentByKey(key);
    const pr = s.proposals[key];
    if (!a || !pr || !site) return;
    const from = paramText(site, a.param);
    updateSite(site.id, { [a.param]: pr.value } as Partial<Site>);
    const to = proposalText(pr.value, a.param);
    setState((st) => ({
      overrideLog: [...st.overrideLog, { at: new Date(), agent: a.name, label: a.label, from, to }],
    }));
    setStatus(`${a.name} proposal applied to ${site.name} — override logged`);
  };

  return (
    <>
      <div className="h">AGENT SWARM — SHELL</div>
      <p>
        One agent per ranking parameter, each with its own evidence source and a cheap verifier. The
        geometry layer is the evidence substrate. <b>No reasoning runs in this build</b> — the cards
        are the contract, and every proposal slot stays empty until a reasoner is attached.
      </p>
      <div className="warn" style={{ marginBottom: 12 }}>
        <b>Assisted assessment, not autonomous dispatch.</b> An agent proposes; the operator
        applies. Sliders stay operator-set, and every override is recorded in the log below.
      </div>

      <div className="ghead">CONTEXT HANDED TO EVERY AGENT</div>
      <div className="sctx">
        <div>
          SITE&nbsp;&nbsp;
          {site ? (
            <>
              <b>{site.name}</b> · ρ {rho(site).toFixed(3)} · n {site.n} q {site.q.toFixed(2)} r{' '}
              {site.r.toFixed(2)} τ {site.tau.toFixed(1)}
            </>
          ) : (
            <>
              <b>none selected</b> — agents have no site to reason about
            </>
          )}
        </div>
        <div>
          SCAN&nbsp;&nbsp;
          {snap.slot ? (
            <>
              <b>{snap.slot.name}</b> · {fmtInt(snap.slot.kept)} pts · covariance{' '}
              {snap.slot.hasCov ? 'yes' : 'no'} · 1 unit = {snap.metresPerUnit} m
            </>
          ) : (
            <>
              <b>slot {snap.slotKey} empty</b>
            </>
          )}
        </div>
        <div>
          GEO&nbsp;&nbsp;&nbsp;
          {snap.geom ? (
            <>
              <b>{snap.geom.planes.length} planes</b> · debris{' '}
              {fmtNum(mVol(snap.geom.debris.totalVolume, snap.metresPerUnit))} m³ · residual{' '}
              {(snap.geom.residualFrac * 100).toFixed(1)}%
            </>
          ) : (
            <>
              <b>not extracted</b> — press g to give the agents evidence
            </>
          )}
        </div>
        <div style={{ marginTop: 6, color: 'var(--dim)' }}>payload {fmtInt(chars)} chars</div>
      </div>

      <div className="row" style={{ marginBottom: 12 }}>
        <button
          className="btn"
          onClick={() => {
            const t = JSON.stringify(ctx, null, 2);
            void copyText(t).then((ok) =>
              ok
                ? setStatus(`agent context copied — ${fmtInt(t.length)} chars`)
                : (console.warn(t),
                  setStatus('clipboard refused — the payload is on the console instead')),
            );
          }}
        >
          COPY CONTEXT
        </button>
        <button
          className="btn"
          onClick={() => {
            setState({ proposals: {} });
            setStatus('proposals cleared — the override log is kept');
          }}
        >
          CLEAR PROPOSALS
        </button>
      </div>

      <div className="ghead">AGENTS</div>
      {SWARM_AGENTS.map((a) => {
        const pr = s.proposals[a.key];
        return (
          <div className="sagent" key={a.key}>
            <div className="top">
              <span className="nm">{a.name}</span>
              <span className="chip">→ {a.label}</span>
              <span className={pr ? 'chip filled' : 'chip'}>{pr ? 'PROPOSED' : 'NO PROPOSAL'}</span>
            </div>
            <div className="q">
              operator value now: <b>{paramText(site, a.param)}</b>
            </div>
            <div className="rd">EVIDENCE · {a.evidence}</div>
            <div className="rd">VERIFIER · {a.verifier}</div>
            <div className={pr ? 'sverdict filled' : 'sverdict'}>
              {pr
                ? `${pr.rationale || 'no rationale given'}\n\nproposes: ${proposalText(pr.value, a.param)}`
                : 'no proposal — no reasoner is attached in this build'}
            </div>
            <button className="btn sbtn" disabled={!pr || !site} onClick={() => apply(a.key)}>
              APPLY TO SLIDER
            </button>
          </div>
        );
      })}

      <div className="ghead">OVERRIDE LOG</div>
      {!s.overrideLog.length ? (
        <div className="gempty">
          No overrides yet. Applying a proposal records what it replaced.
        </div>
      ) : (
        [...s.overrideLog].reverse().map((e, i) => (
          <div className="grow deb" key={i}>
            <div className="top">
              <span className="nm">
                {e.at.toTimeString().slice(0, 8)} · {e.agent}
              </span>
            </div>
            <div className="meta">
              {e.label} · {e.from} → {e.to} · operator applied
            </div>
          </div>
        ))
      )}

      <div className="ghead">WHAT THIS IS NOT</div>
      <ul className="lim">
        <li>
          Not a running swarm. No backend, no API key, no network call — <b>COPY CONTEXT</b> puts
          the exact payload on the clipboard so it can be reasoned over elsewhere and pasted back
          in.
        </li>
        <li>
          <b>q — P(trapped alive) has no agent.</b> Nothing in an exterior scan evidences whether an
          occupant is alive, so it is left wholly to the operator rather than given a
          plausible-looking number. The gap is deliberate.
        </li>
        <li>
          A proposal is inert until an operator applies it. Applying is an operator decision, logged
          with the value it replaced.
        </li>
        <li>
          A verifier is a cheap disagreement check, not a proof. It catches only the failure it was
          built for.
        </li>
      </ul>
    </>
  );
}
