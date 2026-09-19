import { useEffect } from 'react';
import type { AppSnapshot } from '@/core/snapshot';
import type { Viewer } from '@/scene/viewer';
import { SWARM_AGENTS, agentByKey, parseProposal } from '@/core/swarm/agents';
import type { AgentParam, ProposalValue } from '@/core/swarm/agents';
import { buildSwarmContext, copyText } from '@/core/swarm/context';
import { runSwarmRemote, runVisionRemote, swarmStatus } from '@/core/swarm/client';
import type { AgentResult, Verdict } from '@/core/swarm/proposal';
import { buildJudgement } from '@/core/swarm/judgement';
import { buildVerdict } from '@/core/geometry/verdict';
import { LAMBDA, TYPE_LABEL } from '@/core/ranking';
import { fmtInt } from '@/core/util';
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
const LEVEL_WORD: Record<string, string> = {
  failed: 'NO RESULT',
  unrankable: 'INCOMPLETE',
  flagged: 'CHECK THIS',
  ranked: 'ASSESSED',
};
const TONE: Record<string, string> = {
  ok: 'var(--dim)',
  warn: 'var(--r2)',
  bad: 'var(--r1)',
  dim: 'var(--dim)',
};

export default function SwarmTab({ viewer, snap }: { viewer: Viewer | null; snap: AppSnapshot }) {
  const s = useAppState();
  const site = s.sites.find((x) => x.id === s.selectedId) ?? null;
  const ctx = buildSwarmContext(snap);
  const { run, busy, notes, status, vision, visionBusy } = s.swarm;

  const geoLevel = snap.geom ? buildVerdict(snap.geom.planes).level : 'unknown';
  const visionUse = vision?.report?.occupancy_indicators ?? [];
  const judgement = run ? buildJudgement(run, site, geoLevel, visionUse) : null;

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

  /* One action instead of five. Each value is still recorded against what it replaced —
     the operator decides to take the swarm's reading, and that decision is on the record. */
  const useThese = (): void => {
    if (!site || !judgement?.applicable.length) return;
    const patch: Partial<Site> = {};
    const entries: { agent: string; label: string; from: string; to: string }[] = [];
    for (const r of judgement.applicable) {
      const a = agentByKey(r.key);
      if (!a || r.value === null) continue;
      entries.push({
        agent: a.name,
        label: a.label,
        from: paramText(site, a.param),
        to: proposalText(r.value as ProposalValue, a.param),
      });
      (patch as Record<string, unknown>)[a.param] = r.value;
    }
    updateSite(site.id, patch);
    setState((st) => ({
      overrideLog: [...st.overrideLog, ...entries.map((e) => ({ at: new Date(), ...e }))],
    }));
    setStatus(`applied ${entries.length} of the swarm's values to ${site.name} — each one logged`);
  };

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
    setStatus(`${images.length} views captured — asking the vision agent …`);
    void runVisionRemote({ images, geometryLevel: geoLevel, sceneNote: notes || null })
      .then((res) => {
        setState((x) => ({ swarm: { ...x.swarm, vision: res, visionBusy: false } }));
        setStatus(
          res.error
            ? `vision failed: ${res.error}`
            : `vision done in ${(res.ms / 1000).toFixed(1)}s`,
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
        setState((x) => ({ swarm: { ...x.swarm, run: res, busy: false } }));
        setStatus(`swarm done in ${(res.totalMs / 1000).toFixed(1)}s`);
      })
      .catch((e: unknown) => {
        setState((x) => ({ swarm: { ...x.swarm, busy: false } }));
        setStatus(`swarm failed: ${e instanceof Error ? e.message : String(e)}`);
      });
  };

  const noKey = status ? !status.configured : false;

  return (
    <>
      {!site && (
        <div className="gnote">
          No site selected. Press <b>m</b> and click the scan to place one — the swarm reasons about
          a site, not about the whole scan.
        </div>
      )}

      <div className="ghead">WHAT YOU KNOW THAT THE SCAN DOES NOT</div>
      <textarea
        className="snotes"
        value={notes}
        placeholder="who was inside, time of day, building use, anything from witnesses — occupancy cannot be read from geometry, and without this the swarm will not rank the site"
        onChange={(e) => setState((x) => ({ swarm: { ...x.swarm, notes: e.target.value } }))}
      />

      <div className="row" style={{ margin: '10px 0 6px' }}>
        <button
          className="btn primary"
          disabled={busy || noKey || !site}
          title={
            noKey ? 'no API key on the dev server' : !site ? 'select a site first' : 'run the swarm'
          }
          onClick={runNow}
        >
          {busy ? 'THINKING…' : 'ASSESS THIS SITE'}
        </button>
        <button
          className="btn"
          disabled={visionBusy || noKey || !viewer}
          title="render four views and ask a vision model what it sees"
          onClick={lookNow}
        >
          {visionBusy ? 'LOOKING…' : 'LOOK'}
        </button>
      </div>
      {noKey && (
        <div className="gnote" style={{ color: 'var(--amber)' }}>
          {status?.error ??
            'No reasoner reachable — put a key in .env.local and restart the dev server.'}
        </div>
      )}

      {judgement && (
        <>
          <div
            className="verdict"
            style={{ borderLeftColor: judgement.level === 'ranked' ? 'var(--dim)' : 'var(--r2)' }}
          >
            <div
              className="v-level"
              style={{ color: judgement.level === 'ranked' ? 'var(--dim)' : 'var(--r2)' }}
            >
              {LEVEL_WORD[judgement.level]}
            </div>
            <div className="v-head">{judgement.headline}</div>
            <div className="v-detail">{judgement.detail}</div>
          </div>

          <div className="ghead">WHAT THE SWARM FOUND</div>
          {judgement.lines.map((l) => (
            <div className="wline" key={l.label} style={{ cursor: 'default' }}>
              <i style={{ background: TONE[l.tone] }} />
              <span className="lbl">{l.label}</span>
              <span className="say">{l.text}</span>
            </div>
          ))}

          {judgement.applicable.length > 0 && site && (
            <button
              className="btn primary"
              style={{ width: '100%', marginTop: 8 }}
              onClick={useThese}
            >
              USE THESE {judgement.applicable.length} VALUE
              {judgement.applicable.length === 1 ? '' : 'S'}
            </button>
          )}
        </>
      )}

      {vision && !vision.error && vision.report && (
        <>
          <div className="ghead">WHAT THE VIEWS SHOW</div>
          {vision.report.abstain ? (
            <div className="vfact">Too sparse to read. {vision.report.notes}</div>
          ) : (
            <>
              <div className="vfact">
                <b>{vision.report.scene_type || 'unidentified space'}</b> — {vision.report.notes}
              </div>
              {vision.report.objects.length > 0 && (
                <div className="wline" style={{ cursor: 'default' }}>
                  <i style={{ background: 'var(--dim)' }} />
                  <span className="lbl">Sees</span>
                  <span className="say">{vision.report.objects.join(', ')}</span>
                </div>
              )}
              {vision.report.occupancy_indicators.length > 0 && (
                <div className="wline" style={{ cursor: 'default' }}>
                  <i style={{ background: 'var(--r3)' }} />
                  <span className="lbl">Use</span>
                  <span className="say">{vision.report.occupancy_indicators.join(', ')}</span>
                </div>
              )}
              {vision.report.hazard_indicators.length > 0 && (
                <div className="wline" style={{ cursor: 'default' }}>
                  <i style={{ background: 'var(--r1)' }} />
                  <span className="lbl">Hazard</span>
                  <span className="say">{vision.report.hazard_indicators.join(', ')}</span>
                </div>
              )}
            </>
          )}
        </>
      )}

      {vision?.error && <div className="gnote">vision agent failed: {vision.error}</div>}

      {(run || vision) && (
        <details className="gnote-details">
          <summary>how each agent reasoned</summary>
          {run?.results.map((r: AgentResult) => {
            const a = agentByKey(r.key);
            return (
              <div className="sagent" key={r.key}>
                <div className="top">
                  <span className="nm">{a?.name ?? r.key}</span>
                  <span className="chip">{a?.label ?? r.param}</span>
                </div>
                <div className="sverdict filled">
                  {r.error
                    ? `failed: ${r.error}`
                    : r.abstained
                      ? `ABSTAINED — ${r.rationale}`
                      : `${proposalText(r.value as ProposalValue, r.param)} — ${r.rationale}`}
                </div>
                {r.evidenceUsed.length > 0 && (
                  <div className="scited">cited: {r.evidenceUsed.join('  ')}</div>
                )}
                {r.verdicts.map((v, i) => (
                  <div className={VCLASS[v.status]} key={i}>
                    {MARK[v.status]} {v.check}: {v.detail}
                  </div>
                ))}
              </div>
            );
          })}
          {vision?.verdicts.map((v, i) => (
            <div className={VCLASS[v.status]} key={`v${i}`}>
              {MARK[v.status]} vision / {v.check}: {v.detail}
            </div>
          ))}
          <div className="row" style={{ marginTop: 8 }}>
            <button
              className="btn"
              onClick={() => {
                const t = JSON.stringify(ctx, null, 2);
                void copyText(t).then((ok) =>
                  ok
                    ? setStatus(`agent context copied — ${fmtInt(t.length)} chars`)
                    : (console.warn(t), setStatus('clipboard refused — payload is on the console')),
                );
              }}
            >
              COPY CONTEXT
            </button>
            <button
              className="btn"
              onClick={() => {
                setState((x) => ({
                  proposals: {},
                  swarm: { ...x.swarm, run: null, vision: null },
                }));
                setStatus('cleared — the override log is kept');
              }}
            >
              CLEAR
            </button>
          </div>
        </details>
      )}

      {s.overrideLog.length > 0 && (
        <details className="gnote-details">
          <summary>what was applied ({s.overrideLog.length})</summary>
          {[...s.overrideLog].reverse().map((e, i) => (
            <div className="scited" key={i}>
              {e.at.toTimeString().slice(0, 8)} · {e.agent} · {e.label} · {e.from} → {e.to}
            </div>
          ))}
        </details>
      )}

      <details className="gnote-details">
        <summary>what this is not</summary>
        <ul className="lim">
          <li>
            <b>Assisted assessment, not autonomous dispatch.</b> The swarm proposes; applying is
            still your decision, and every applied value is logged against what it replaced.
          </li>
          <li>
            <b>q — P(trapped alive) has no agent.</b> Nothing in an exterior scan evidences whether
            an occupant is alive. The gap is deliberate.
          </li>
          <li>
            <b>Unverified is not a pass</b> — it means the evidence to check that claim was not in
            the payload, which is the honest state for extraction probability and occupancy.
          </li>
        </ul>
      </details>
    </>
  );
}
