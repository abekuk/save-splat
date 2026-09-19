import { useEffect } from 'react';
import type { AppSnapshot } from '@/core/snapshot';
import type { Viewer } from '@/scene/viewer';
import { runRoomRemote, swarmStatus } from '@/core/swarm/client';
import { buildCondition, CONDITION_CSS, CONDITION_WORD } from '@/core/swarm/condition';
import { DEFECT_LABEL, STRUCTURAL_KINDS } from '@/core/swarm/defects';
import { buildVerdict } from '@/core/geometry/verdict';
import { setState, setStatus, useAppState } from '@/state/store';

const TONE: Record<string, string> = {
  ok: 'var(--dim)',
  warn: 'var(--r2)',
  bad: 'var(--r1)',
  dim: 'var(--dim)',
};
const SEV_CSS: Record<string, string> = {
  slight: 'var(--dim)',
  moderate: 'var(--r2)',
  serious: 'var(--r1)',
};
const MARK: Record<string, string> = { pass: '✓', fail: '✗', unverified: '·' };
const VCLASS: Record<string, string> = {
  pass: 'vline pass',
  fail: 'vline fail',
  unverified: 'vline unver',
};

export default function SwarmTab({ viewer, snap }: { viewer: Viewer | null; snap: AppSnapshot }) {
  const s = useAppState();
  const { notes, status, vision: room, visionBusy: busy } = s.swarm;

  const verdict = snap.geom ? buildVerdict(snap.geom.planes) : null;
  const geoLevel = verdict ? verdict.level : 'unknown';
  const geoDetail = verdict ? verdict.detail : 'no geometry extracted yet — press g';
  const condition = buildCondition(geoLevel, geoDetail, room?.report ?? null);

  useEffect(() => {
    if (s.swarm.status) return;
    void swarmStatus().then((st) => setState((x) => ({ swarm: { ...x.swarm, status: st } })));
  }, [s.swarm.status]);

  const assess = (): void => {
    if (!viewer || busy) return;
    setState((x) => ({ swarm: { ...x.swarm, visionBusy: true } }));
    setStatus('rendering views of the room …');
    let images: string[];
    try {
      images = viewer.captureViews(4);
    } catch (e) {
      setState((x) => ({ swarm: { ...x.swarm, visionBusy: false } }));
      setStatus(`could not capture views: ${e instanceof Error ? e.message : String(e)}`);
      return;
    }
    setStatus(`${images.length} views — looking for defects …`);
    void runRoomRemote({
      images,
      geometryNote: verdict ? `${CONDITION_WORD[condition.level]} — ${verdict.detail}` : null,
      operatorNote: notes || null,
    })
      .then((res) => {
        setState((x) => ({ swarm: { ...x.swarm, vision: res, visionBusy: false } }));
        setStatus(
          res.error
            ? `assessment failed: ${res.error}`
            : `assessed in ${(res.ms / 1000).toFixed(1)}s`,
        );
      })
      .catch((e: unknown) => {
        setState((x) => ({ swarm: { ...x.swarm, visionBusy: false } }));
        setStatus(`assessment failed: ${e instanceof Error ? e.message : String(e)}`);
      });
  };

  const noKey = status ? !status.configured : false;
  const level = condition.level;

  return (
    <>
      <div className="row" style={{ marginBottom: 8 }}>
        <button
          className="btn primary"
          style={{ flex: 1 }}
          disabled={busy || noKey || !viewer || !snap.slot}
          title={
            noKey
              ? 'no API key on the dev server'
              : !snap.slot
                ? 'load a scan first'
                : 'render the room and look for defects'
          }
          onClick={assess}
        >
          {busy ? 'LOOKING…' : 'ASSESS THIS ROOM'}
        </button>
      </div>
      {noKey && (
        <div className="gnote" style={{ color: 'var(--amber)' }}>
          {status?.error ??
            'No reasoner reachable — put a key in .env.local and restart the dev server.'}
        </div>
      )}
      {!snap.geom && (
        <div className="gnote">
          Extract the geometry first (press <b>g</b>). Verticality is measured, not guessed, and the
          defect agent is told what the planes already found so it looks for what they cannot see.
        </div>
      )}

      <div className="verdict" style={{ borderLeftColor: CONDITION_CSS[level] }}>
        <div className="v-level" style={{ color: CONDITION_CSS[level] }}>
          {CONDITION_WORD[level]}
        </div>
        <div className="v-head">{condition.headline}</div>
        <div className="v-detail">{condition.detail}</div>
      </div>

      {condition.lines.map((l) => (
        <div className="wline" key={l.label} style={{ cursor: 'default' }}>
          <i style={{ background: TONE[l.tone] }} />
          <span className="lbl">{l.label}</span>
          <span className="say">{l.text}</span>
        </div>
      ))}

      {room?.report && !room.report.abstain && room.report.defects.length > 0 && (
        <>
          <div className="ghead">WHAT IT FOUND</div>
          {room.report.defects.map((d, i) => (
            <div className="sagent" key={i}>
              <div className="top">
                <span className="nm">{DEFECT_LABEL[d.kind]}</span>
                <span
                  className="chip"
                  style={{ borderColor: SEV_CSS[d.severity], color: SEV_CSS[d.severity] }}
                >
                  {d.severity}
                </span>
                {!STRUCTURAL_KINDS.has(d.kind) && <span className="chip">surface only</span>}
              </div>
              <div className="q">{d.where}</div>
              {d.note && <div className="rd">{d.note}</div>}
              <div className="scited">
                seen in view{d.views.length === 1 ? '' : 's'} {d.views.join(', ') || '—'} ·
                confidence {d.confidence}
              </div>
            </div>
          ))}
        </>
      )}

      {room?.report && !room.report.abstain && room.report.defects.length === 0 && (
        <div className="vfact">
          {room.report.nothing_found_note || 'No defects were visible in the views.'}
        </div>
      )}

      {room?.error && <div className="gnote">the defect agent failed: {room.error}</div>}

      <div className="ghead">ANYTHING YOU KNOW ABOUT THIS ROOM</div>
      <textarea
        className="snotes"
        value={notes}
        placeholder="optional — age, construction, known repairs, what the room is used for. It goes to the defect agent as context."
        onChange={(e) => setState((x) => ({ swarm: { ...x.swarm, notes: e.target.value } }))}
      />

      {room && (
        <details className="gnote-details">
          <summary>how it checked itself</summary>
          {room.verdicts.map((v, i) => (
            <div className={VCLASS[v.status]} key={i}>
              {MARK[v.status]} {v.check}: {v.detail}
            </div>
          ))}
          {room.report && (
            <div className="scited">
              room read as “{room.report.room_type || 'unidentified'}” · capture{' '}
              {room.report.capture_quality} · overall {room.report.overall} · confidence{' '}
              {room.report.self_confidence} · {room.views} views · {room.model} ·{' '}
              {(room.ms / 1000).toFixed(1)}s
            </div>
          )}
        </details>
      )}

      <details className="gnote-details">
        <summary>what this is not</summary>
        <ul className="lim">
          <li>
            <b>Not a structural survey.</b> It is a prompt to send someone qualified, or not. No
            part of it is a substitute for an engineer standing in the room.
          </li>
          <li>
            The two sources see different things. Geometry measures verticality and is blind to a
            crack; the views see cracking and are blind to a 0.6° lean. The condition is the worse
            of the two, and a disagreement between them is reported rather than averaged away.
          </li>
          <li>
            <b>A scan is full of holes, speckle and smearing</b>, and every one of them can look
            like damage. The agent is told to separate the two and to say when the capture will not
            support the call — take “cannot judge” at face value and recapture.
          </li>
        </ul>
      </details>
    </>
  );
}
