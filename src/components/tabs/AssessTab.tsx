import type { Viewer } from '@/scene/viewer';
import type { AppSnapshot } from '@/core/snapshot';
import { LAMBDA, rho } from '@/core/ranking';
import { nearestPlane } from '@/core/geometry/extract';
import { mArea, mLen } from '@/core/units';
import { fmtNum } from '@/core/util';
import { deleteSite, updateSite, useAppState } from '@/state/store';
import type { CollapseType, Confidence } from '@/types';

const TYPES: { v: CollapseType; label: string }[] = [
  { v: 'pancake', label: 'PANCAKE' },
  { v: 'mixed', label: 'MIXED' },
  { v: 'lean', label: 'LEAN-TO' },
];
const CONFS: Confidence[] = ['low', 'med', 'high'];

export default function AssessTab({ viewer, snap }: { viewer: Viewer | null; snap: AppSnapshot }) {
  const s = useAppState();
  const site = s.sites.find((x) => x.id === s.selectedId) ?? null;

  if (!site) {
    return (
      <div className="empty">
        No site selected.
        <br />
        <br />
        Press <b>m</b> (or the <b>⊕ MARK</b> button), then click a structure in the 3D view to place
        an assessment marker. Selecting a row in the <b>QUEUE</b> tab also opens it here.
      </div>
    );
  }

  const low = site.conf === 'low';
  const np = nearestPlane(site, snap.geom);
  const set = (patch: Parameters<typeof updateSite>[1]): void => updateSite(site.id, patch);

  return (
    <>
      <div className="field">
        <div className="lab">
          <b>Site name</b>
          <span className="val">#{site.id}</span>
        </div>
        <input
          type="text"
          maxLength={40}
          spellCheck={false}
          value={site.name}
          onChange={(e) => set({ name: e.target.value || `Site #${site.id}` })}
        />
      </div>

      <div className="field">
        <div className="lab">
          <b>n — occupancy</b>
          <span className="val">{site.n}</span>
        </div>
        <div className="note">
          Persons believed inside this structure when it came down.{' '}
          <b>This is the weakest input and it is not derived from the scan geometry</b> — it comes
          from witnesses, rosters, neighbours or time-of-day occupancy estimates.
        </div>
        <input
          type="range"
          min={0}
          max={50}
          step={1}
          value={site.n}
          onChange={(e) => set({ n: parseInt(e.target.value, 10) })}
        />
      </div>

      <div className="field">
        <div className="lab">
          <b>q — P(trapped alive)</b>
          <span className="val">{site.q.toFixed(2)}</span>
        </div>
        <div className="note">
          Probability an occupant is trapped and still alive now. From void-space evidence, hours
          since collapse, weather exposure, and any contact — voice, tapping, phone ping, canine
          alert.
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={site.q}
          onChange={(e) => set({ q: parseFloat(e.target.value) })}
        />
      </div>

      <div className="field">
        <div className="lab">
          <b>r — P(extraction)</b>
          <span className="val">{site.r.toFixed(2)}</span>
        </div>
        <div className="note">
          Probability a committed crew actually gets them out alive. From access route, debris type,
          cutting and shoring burden, secondary-collapse risk and crew capability.
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={site.r}
          onChange={(e) => set({ r: parseFloat(e.target.value) })}
        />
      </div>

      <div className="field">
        <div className="lab">
          <b>τ — crew-hours</b>
          <span className="val">{site.tau.toFixed(1)}</span>
        </div>
        <div className="note">
          Crew-hours this site is expected to consume before the outcome is decided. From debris
          volume to move, breaching and shoring required, and site access.
        </div>
        <input
          type="range"
          min={0.5}
          max={24}
          step={0.5}
          value={site.tau}
          onChange={(e) => set({ tau: parseFloat(e.target.value) })}
        />
      </div>

      <div className="field">
        <div className="lab">
          <b>Collapse type</b>
          <span className="val">λ {LAMBDA[site.type].toFixed(3)} /h</span>
        </div>
        <div className="note">
          Sets the survival decay rate λ. Pancake voids are scarce and crush loads high; lean-to and
          V-void geometry holds survivable space far longer.
        </div>
        <div className="seg">
          {TYPES.map((t) => (
            <button
              key={t.v}
              className={site.type === t.v ? 'on' : undefined}
              onClick={() => set({ type: t.v })}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <div className="lab">
          <b>Confidence</b>
          <span className="val">{site.conf.toUpperCase()}</span>
        </div>
        <div className="note">
          Evidence-quality flag for the operator. <b>LOW</b> renders amber everywhere and badges the
          queue row — it does <b>not</b> enter ρ.
        </div>
        <div className="seg">
          {CONFS.map((c) => (
            <button
              key={c}
              className={site.conf === c ? (c === 'low' ? 'on amber' : 'on') : undefined}
              onClick={() => set({ conf: c })}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="readout">
        <span className="dim">ρ = ( n × q × r × λ ) / max(0.1, τ)</span>
        <br />ρ = ( {site.n} × {site.q.toFixed(2)} × {site.r.toFixed(2)} ×{' '}
        {LAMBDA[site.type].toFixed(3)} ) / {Math.max(0.1, site.tau).toFixed(1)}
        <span className={low ? 'big amber' : 'big'}>{rho(site).toFixed(3)}</span>
        <span className="unit">LIVES / CREW-HOUR</span>
        {low && (
          <>
            <br />
            <span className="dim">LOW CONF — evidence flag only, not a factor in ρ</span>
          </>
        )}
      </div>

      {np && (
        <div className="evbox">
          <div className="t">GEOMETRY AT THIS SITE</div>
          Sits on <b>{np.plane.label}</b>, a{' '}
          {np.plane.cls === 'wall'
            ? 'near-vertical wall '
            : np.plane.cls === 'slab'
              ? 'near-level slab '
              : 'inclined slab '}
          {np.plane.cls === 'wall' && np.plane.drift != null ? (
            <>
              out of plumb by <b>{((np.plane.tilt * 180) / Math.PI).toFixed(2)}°</b>, drift ratio{' '}
              <b style={{ color: np.plane.band?.css }}>{(np.plane.drift * 100).toFixed(2)}%</b> (
              {np.plane.band?.name}).
            </>
          ) : (
            <>
              at <b>{((np.plane.tilt * 180) / Math.PI).toFixed(1)}°</b> from horizontal.
            </>
          )}{' '}
          Area <b>{fmtNum(mArea(np.plane.area, snap.metresPerUnit))} m²</b>, rms residual{' '}
          <b>{fmtNum(mLen(np.plane.rms, snap.metresPerUnit), 3)} m</b>.
          <br />
          <span className="dim">
            Measured evidence for the operator. It does not set any slider.
          </span>
        </div>
      )}

      <div className="row">
        <button className="btn primary" onClick={() => viewer?.flyTo(site.pos)}>
          FLY TO
        </button>
        <button className="btn danger" onClick={() => deleteSite(site.id)}>
          DELETE SITE
        </button>
      </div>
    </>
  );
}
