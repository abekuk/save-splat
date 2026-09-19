import { useEffect } from 'react';
import type { AppSnapshot } from '@/core/snapshot';
import type { Viewer } from '@/scene/viewer';
import { runRoomRemote, swarmStatus } from '@/core/swarm/client';
import { buildCondition, CONDITION_CSS, CONDITION_WORD } from '@/core/swarm/condition';
import { DEFECT_LABEL, STRUCTURAL_KINDS } from '@/core/swarm/defects';
import { buildVerdict } from '@/core/geometry/verdict';
import { getState, setState, setStatus, useAppState } from '@/state/store';

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

/** Resolves once `test` holds, or gives up. Extraction is chunked across frames, so the
 *  capture has to wait for it rather than photograph a half-fitted scene. */
function waitFor(test: () => boolean, ms: number): Promise<boolean> {
  return new Promise((resolve) => {
    const t0 = Date.now();
    const tick = (): void => {
      if (test()) return resolve(true);
      if (Date.now() - t0 > ms) return resolve(false);
      window.setTimeout(tick, 120);
    };
    tick();
  });
}

export default function SwarmTab({
  viewer,
  snap,
  onGeometry,
}: {
  viewer: Viewer | null;
  snap: AppSnapshot;
  onGeometry: (focus?: boolean) => void;
}) {
  const s = useAppState();
  const { notes, status, vision: room, visionBusy: busy } = s.swarm;

  const verdict = snap.geom ? buildVerdict(snap.geom.planes) : null;
  const condition =
    room || verdict
      ? buildCondition(verdict?.level ?? 'unknown', verdict?.detail ?? '', room?.report ?? null)
      : null;

  useEffect(() => {
    if (s.swarm.status) return;
    void swarmStatus().then((st) => setState((x) => ({ swarm: { ...x.swarm, status: st } })));
  }, [s.swarm.status]);

  /* One action: fit the planes if they are not fitted, render the room, read the surfaces. */
  const capture = (): void => {
    if (!viewer || busy) return;
    setState((x) => ({ swarm: { ...x.swarm, visionBusy: true } }));

    void (async () => {
      try {
        if (!snap.geom) {
          setStatus('measuring the room …');
          onGeometry(false); // stay on this tab; the result lands here
          const ok = await waitFor(() => {
            const st = getState().geoStage;
            return st === 'done' || st === 'failed';
          }, 120000);
          if (!ok || getState().geoStage === 'failed') {
            setState((x) => ({ swarm: { ...x.swarm, visionBusy: false } }));
            setStatus('could not measure the room');
            return;
          }
        }

        const slot = viewer.getSlot(viewer.getActiveSlot());
        const v = slot?.geom ? buildVerdict(slot.geom.planes) : null;

        setStatus('rendering views …');
        const images = viewer.captureViews(4);

        setStatus(`${images.length} views — reading the surfaces …`);
        const res = await runRoomRemote({
          images,
          geometryNote: v ? v.detail : null,
          operatorNote: notes || null,
        });
        setState((x) => ({ swarm: { ...x.swarm, vision: res, visionBusy: false } }));
        setStatus(res.error ? res.error : `captured in ${(res.ms / 1000).toFixed(1)}s`);
      } catch (e) {
        setState((x) => ({ swarm: { ...x.swarm, visionBusy: false } }));
        setStatus(e instanceof Error ? e.message : String(e));
      }
    })();
  };

  const noKey = status ? !status.configured : false;
  const level = condition?.level ?? 'unknown';

  return (
    <>
      <button
        className="btn primary"
        style={{ width: '100%', marginBottom: 12 }}
        disabled={busy || noKey || !viewer || !snap.slot}
        onClick={capture}
      >
        {busy ? 'CAPTURING…' : 'CAPTURE DATA'}
      </button>

      {noKey && status && (
        <div className="gnote" style={{ color: 'var(--amber)' }}>
          {status.error ?? 'No API key — add one to .env.local and restart the dev server.'}
        </div>
      )}

      {condition && (
        <>
          <div className="verdict" style={{ borderLeftColor: CONDITION_CSS[level] }}>
            <div className="v-level" style={{ color: CONDITION_CSS[level] }}>
              {CONDITION_WORD[level]}
            </div>
            <div className="v-head">{condition.headline}</div>
            <div className="v-detail">{condition.detail}</div>
          </div>

          {condition.lines
            .filter((l) => !/not looked at yet|no geometry extracted/.test(l.text))
            .map((l) => (
              <div className="wline" key={l.label} style={{ cursor: 'default' }}>
                <i style={{ background: TONE[l.tone] }} />
                <span className="lbl">{l.label}</span>
                <span className="say">{l.text}</span>
              </div>
            ))}
        </>
      )}

      {room?.report && !room.report.abstain && room.report.defects.length > 0 && (
        <>
          <div className="ghead">DEFECTS</div>
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
                {!STRUCTURAL_KINDS.has(d.kind) && <span className="chip">surface</span>}
              </div>
              <div className="q">{d.where}</div>
              {d.note && <div className="rd">{d.note}</div>}
              <div className="scited">
                view{d.views.length === 1 ? '' : 's'} {d.views.join(', ') || '—'} · {d.confidence}{' '}
                confidence
              </div>
            </div>
          ))}
        </>
      )}

      {room?.error && <div className="gnote">{room.error}</div>}

      {room && (
        <details className="gnote-details">
          <summary>detail</summary>
          <textarea
            className="snotes"
            value={notes}
            placeholder="anything you know about this room — age, construction, known repairs"
            onChange={(e) => setState((x) => ({ swarm: { ...x.swarm, notes: e.target.value } }))}
          />
          <div style={{ marginTop: 8 }}>
            {room.verdicts.map((v, i) => (
              <div className={VCLASS[v.status]} key={i}>
                {MARK[v.status]} {v.check}: {v.detail}
              </div>
            ))}
          </div>
          {room.report && (
            <div className="scited">
              {room.report.room_type || 'unidentified'} · capture {room.report.capture_quality} ·{' '}
              {room.views} views · {room.model} · {(room.ms / 1000).toFixed(1)}s
            </div>
          )}
          <ul className="lim" style={{ marginTop: 8 }}>
            <li>Not a structural survey. It is a prompt to send someone qualified, or not.</li>
            <li>
              Geometry measures verticality and is blind to a crack; the views see cracking and are
              blind to a small lean. The condition is the worse of the two.
            </li>
            <li>
              Scan holes and speckle look like damage. Take “cannot judge” at face value and
              recapture.
            </li>
          </ul>
        </details>
      )}
    </>
  );
}
