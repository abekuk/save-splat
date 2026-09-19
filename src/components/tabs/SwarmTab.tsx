import { useEffect } from 'react';
import type { AppSnapshot } from '@/core/snapshot';
import { SWARM_AGENTS, agentByKey, parseProposal } from '@/core/swarm/agents';
import type { AgentParam, ProposalValue } from '@/core/swarm/agents';
import { buildSwarmContext, copyText } from '@/core/swarm/context';
import { runSwarmRemote, runVisionRemote, swarmStatus } from '@/core/swarm/client';
import { buildVerdict } from '@/core/geometry/verdict';
import type { Viewer } from '@/scene/viewer';
import type { AgentResult, Verdict } from '@/core/swarm/proposal';
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

const MARK: Record<Verdict['status'], string> = { pass: '✓', fail: '✗', unverified: '·' };
const VCLASS: Record<Verdict['status'], string> = {
  pass: 'vline pass',
  fail: 'vline fail',
  unverified: 'vline unver',
};

export default function SwarmTab({ viewer, snap }: { viewer: Viewer | null; snap: AppSnapshot }) {
  const s = useAppState();
  const site = s.sites.find((x) => x.id === s.selectedId) ?? null;
  const ctx = buildSwarmContext(snap);
  const chars = JSON.stringify(ctx).length;
  const { run, busy, notes, status, vision, visionBusy } = s.swarm;

  const byKey = new Map<string, AgentResult>((run?.results ?? []).map((r) => [r.key, r]));

  /* Ask once whether a reasoner is reachable, so the button can say why it is disabled
     instead of failing on the first click. */
  useEffect(() => {
    if (s.swarm.status) return;
    void swarmStatus().then((st) => setState((x) => ({ swarm: { ...x.swarm, status: st } })));
  }, [s.swarm.status]);

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

  /* The vision agent sees the scan, so it needs pictures of it — taken here rather than
     server-side, because the renderer with the scan in it lives in this tab's process. */
  const lookNow = (): void => {
    if (!viewer || visionBusy) return;
    setState((x) => ({ swarm: { ...x.swarm, visionBusy: true } }));
    setStatus('capturing views for the vision agent …');
    let images: string[];
    try {
      images = viewer.captureViews(4);
    } catch (e) {
      setState((x) => ({ swarm: { ...x.swarm, visionBusy: false } }));
      setStatus(`could not capture views: ${e instanceof Error ? e.message : String(e)}`);
      return;
    }
    const level = snap.geom ? buildVerdict(snap.geom.planes).level : 'unknown';
    setStatus(`${images.length} views captured — asking the vision agent …`);
    void runVisionRemote({ images, geometryLevel: level, sceneNote: notes || null })
      .then((res) => {
        setState((x) => ({ swarm: { ...x.swarm, vision: res, visionBusy: false } }));
        setStatus(
          res.error
            ? `vision failed: ${res.error}`
            : `vision done in ${(res.ms / 1000).toFixed(1)}s · ${res.verdicts.filter((v) => v.status === 'fail').length} check(s) failed`,
        );
      })
      .catch((e: unknown) => {
        setState((x) => ({ swarm: { ...x.swarm, visionBusy: false } }));
        setStatus(`vision failed: ${e instanceof Error ? e.message : String(e)}`);
      });
  };

  const runNow = (): void => {
    if (busy) return;
    setState((x) => ({ swarm: { ...x.swarm, busy: true } }));
    setStatus('swarm running — five agents over the current evidence…');
    void runSwarmRemote({ context: ctx, operatorNotes: notes, siteId: site?.id ?? null })
      .then((res) => {
        // Only non-abstained results become applyable proposals. A failed verifier still
        // produces one, but the APPLY button stays locked and says why.
        const proposals: Record<string, { value: ProposalValue; rationale: string; at: Date }> = {};
        for (const r of res.results) {
          if (r.abstained || r.value === null || r.error) continue;
          proposals[r.key] = {
            value: r.value as ProposalValue,
            rationale: r.rationale,
            at: new Date(res.generated),
          };
        }
        setState((x) => ({ swarm: { ...x.swarm, run: res, busy: false }, proposals }));
        const failed = res.results.filter((r) => !r.verified || r.error).length;
        const abstained = res.results.filter((r) => r.abstained).length;
        setStatus(
          `swarm done in ${(res.totalMs / 1000).toFixed(1)}s · ${res.results.length} agents · ` +
            `${abstained} abstained · ${failed} did not verify`,
        );
      })
      .catch((e: unknown) => {
        setState((x) => ({ swarm: { ...x.swarm, busy: false } }));
        setStatus(`swarm failed: ${e instanceof Error ? e.message : String(e)}`);
      });
  };

  const noKey = status ? !status.configured : false;
  const runLabel = busy ? 'RUNNING…' : 'RUN SWARM';

  return (
    <>
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
        <div style={{ marginTop: 6, color: 'var(--dim)' }}>
          payload {fmtInt(chars)} chars
          {run ? ` · last run ${run.model} · ${(run.totalMs / 1000).toFixed(1)}s` : ''}
        </div>
      </div>

      <div className="ghead">OPERATOR NOTES</div>
      <textarea
        className="snotes"
        value={notes}
        placeholder="e.g. primary school, weekday 10:40, two classes reported unaccounted for"
        onChange={(e) => setState((x) => ({ swarm: { ...x.swarm, notes: e.target.value } }))}
      />

      <div className="row" style={{ margin: '10px 0 4px' }}>
        <button
          className="btn primary"
          disabled={busy || noKey || !site}
          title={
            noKey
              ? 'no ANTHROPIC_API_KEY on the dev server'
              : !site
                ? 'select a site first'
                : 'run all five agents'
          }
          onClick={runNow}
        >
          {runLabel}
        </button>
        <button
          className="btn"
          disabled={visionBusy || noKey || !viewer}
          title={
            noKey
              ? 'no API key on the dev server'
              : 'render four views and ask a vision model what it sees'
          }
          onClick={lookNow}
        >
          {visionBusy ? 'LOOKING…' : 'LOOK'}
        </button>
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
            setState((x) => ({ proposals: {}, swarm: { ...x.swarm, run: null } }));
            setStatus('proposals cleared — the override log is kept');
          }}
        >
          CLEAR
        </button>
      </div>
      {noKey ? (
        <div className="gnote" style={{ color: 'var(--amber)' }}>
          No reasoner reachable. Put <b>ANTHROPIC_API_KEY</b> in <b>.env.local</b> and restart the
          dev server. The key is read server-side only — it is never bundled into the page.
        </div>
      ) : status ? (
        <div className="gnote">
          reasoner: {status.provider} · {status.model} · runs in the dev server, key never reaches
          the browser
        </div>
      ) : null}

      {vision && (
        <>
          <div className="ghead">WHAT THE VIEWS SHOW</div>
          <div className="sagent">
            {vision.error ? (
              <div className="sverdict filled">vision agent failed: {vision.error}</div>
            ) : vision.report?.abstain ? (
              <div className="sverdict filled">
                <b>ABSTAINED</b> — the renders were too sparse to read. {vision.report.notes}
              </div>
            ) : vision.report ? (
              <>
                <div className="q">
                  <b>{vision.report.scene_type || 'unidentified space'}</b> · visible damage{' '}
                  <b>{vision.report.damage_read}</b> · confidence {vision.report.self_confidence}
                </div>
                <div className="sverdict filled">{vision.report.notes}</div>
                {vision.report.objects.length > 0 && (
                  <div className="rd">SEES · {vision.report.objects.join(', ')}</div>
                )}
                {vision.report.occupancy_indicators.length > 0 && (
                  <div className="rd">
                    SIGNS OF USE · {vision.report.occupancy_indicators.join(', ')}
                  </div>
                )}
                {vision.report.hazard_indicators.length > 0 && (
                  <div className="rd">HAZARDS · {vision.report.hazard_indicators.join(', ')}</div>
                )}
                <div style={{ marginTop: 6 }}>
                  {vision.verdicts.map((v, i) => (
                    <div className={VCLASS[v.status]} key={i}>
                      {MARK[v.status]} {v.check}: {v.detail}
                    </div>
                  ))}
                </div>
                <div className="scited">
                  {vision.views} views · {vision.model} · {(vision.ms / 1000).toFixed(1)}s
                </div>
              </>
            ) : null}
          </div>
        </>
      )}

      <div className="ghead">AGENTS</div>
      {SWARM_AGENTS.map((a) => {
        const res = byKey.get(a.key);
        const pr = s.proposals[a.key];
        const chip = res?.error
          ? 'ERROR'
          : res?.abstained
            ? 'ABSTAINED'
            : res && !res.verified
              ? 'UNVERIFIED'
              : pr
                ? 'PROPOSED'
                : 'NO PROPOSAL';
        return (
          <div className="sagent" key={a.key}>
            <div className="top">
              <span className="nm">{a.name}</span>
              <span className="chip">→ {a.label}</span>
              <span className={pr && res?.verified ? 'chip filled' : 'chip'}>{chip}</span>
            </div>
            <div className="q">
              operator value now: <b>{paramText(site, a.param)}</b>
            </div>

            <div className={res ? 'sverdict filled' : 'sverdict'}>
              {!res ? (
                'no proposal yet — RUN SWARM to put the agents over the current evidence'
              ) : res.error ? (
                `agent failed: ${res.error}`
              ) : (
                <>
                  {res.abstained ? (
                    <b>ABSTAINED — no admissible evidence for this parameter</b>
                  ) : (
                    <b>proposes: {proposalText(res.value as ProposalValue, a.param)}</b>
                  )}
                  {`  ·  self-confidence ${res.selfConfidence}  ·  ${(res.ms / 1000).toFixed(1)}s`}
                  <div style={{ marginTop: 5 }}>{res.rationale}</div>
                  {res.evidenceUsed.length > 0 ? (
                    <div className="scited">cited: {res.evidenceUsed.join('  ')}</div>
                  ) : null}
                  <div style={{ marginTop: 6 }}>
                    {res.verdicts.map((v, i) => (
                      <div className={VCLASS[v.status]} key={i}>
                        {MARK[v.status]} {v.check}: {v.detail}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              className="btn sbtn"
              disabled={!pr || !site || !res?.verified || res?.abstained}
              title={
                res && !res.verified
                  ? 'a verifier failed — review the proposal before applying it'
                  : res?.abstained
                    ? 'the agent abstained, so there is nothing to apply'
                    : 'apply this value to the slider and log the override'
              }
              onClick={() => apply(a.key)}
            >
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

      <details className="lim-details">
        <summary>what this is not</summary>
        <ul className="lim">
          <li>
            <b>q — P(trapped alive) has no agent.</b> Nothing in an exterior scan evidences whether
            an occupant is alive, so it is left wholly to the operator. The gap is deliberate.
          </li>
          <li>A proposal is inert until applied. Applying is logged with the value it replaced.</li>
          <li>
            <b>Unverified is not a pass</b> — the evidence to check that claim is not in the payload
            at all, which is the honest state for extraction probability and occupancy.
          </li>
          <li>
            Agents read the derived geometry, never the raw cloud, and inherit all its limits.
          </li>
        </ul>
      </details>
    </>
  );
}
