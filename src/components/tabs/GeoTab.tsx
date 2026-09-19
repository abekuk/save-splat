import { useState } from 'react';
import type { Viewer } from '@/scene/viewer';
import type { AppSnapshot } from '@/core/snapshot';
import { CLS_CSS, DRIFT_BANDS, wellSupported } from '@/core/geometry/extract';
import { mArea, mLen, mVol } from '@/core/units';
import { clamp01, fmtInt, fmtNum } from '@/core/util';
import { setState, useAppState } from '@/state/store';
import type { Plane } from '@/types';

const planeCss = (p: Plane): string => (p.cls === 'wall' && p.band ? p.band.css : CLS_CSS[p.cls]);

/** What the number means, in words. The degrees and the band name are still there under
 *  DETAILS; this is the line you should be able to read without a key. */
function verdict(p: Plane): string {
  const deg = (p.tilt * 180) / Math.PI;
  if (p.cls === 'wall') {
    const d = (p.drift ?? 0) * 100;
    if (d < 0.5) return 'plumb';
    if (d < 1) return 'barely off plumb';
    if (d < 2) return 'leaning';
    return 'leaning badly';
  }
  if (p.cls === 'slab') {
    if (deg < 2) return 'level';
    if (deg < 6) return 'slightly sloped';
    return 'sloped';
  }
  return 'leaning slab';
}

function PlaneRow({
  p,
  index,
  mpu,
  selected,
  details,
  onClick,
}: {
  p: Plane;
  index: number;
  mpu: number;
  selected: boolean;
  details: boolean;
  onClick: () => void;
}) {
  const css = planeCss(p);
  const sub = verdict(p);
  return (
    <div className={selected ? 'grow sel' : 'grow'} data-i={index} onClick={onClick}>
      <div className="top">
        <span className="tag" style={{ borderColor: css, color: css }}>
          {p.label}
        </span>
        <span className="nm">{sub}</span>
        <span className="num" style={{ color: css }}>
          {p.cls === 'wall' && p.drift != null
            ? `${(p.drift * 100).toFixed(2)}%`
            : `${((p.tilt * 180) / Math.PI).toFixed(1)}°`}
        </span>
      </div>
      {details && (
        <div className="meta">
          {p.cls === 'wall' ? `${((p.tilt * 180) / Math.PI).toFixed(2)}° off plumb · ` : ''}
          area {fmtNum(mArea(p.area, mpu))}&nbsp;m² · fill {Math.round(p.fill * 100)}% · support{' '}
          {(p.support * 100).toFixed(1)}% · rms {fmtNum(mLen(p.rms, mpu), 3)}&nbsp;m
        </div>
      )}
    </div>
  );
}

export default function GeoTab({
  viewer,
  snap,
  onGeometry,
}: {
  viewer: Viewer | null;
  snap: AppSnapshot;
  onGeometry: () => void;
}) {
  const s = useAppState();
  const [details, setDetails] = useState(false);
  const g = snap.geom;
  const mpu = snap.metresPerUnit;

  if (!g) {
    return (
      <>
        {s.geoStage === 'ransac' || s.geoStage === 'prep' ? (
          <div className="prog">
            {s.geoProgress?.stage === 'debris'
              ? 'measuring debris volume…'
              : `fitting planes… ${s.geoProgress?.planes ?? 0} found`}
            <span className="bar">
              <i style={{ width: `${Math.round(clamp01(s.geoProgress?.frac ?? 0) * 100)}%` }} />
            </span>
          </div>
        ) : (
          <div className="empty">
            No geometry extracted yet.
            <br />
            <br />
            Press <b>g</b> or the <b>GEOMETRY</b> button to fit planes to the loaded scan. You get
            wall verticality (the drift ratio structural engineers actually use), slab and lean-to
            angles, and debris volume — measured facts rather than a mesh.
            <br />
            <br />
            <button className="btn" onClick={onGeometry}>
              RUN GEOMETRY
            </button>
          </div>
        )}
      </>
    );
  }

  const walls = g.planes.filter((p) => p.cls === 'wall');
  const slabs = g.planes.filter((p) => p.cls === 'slab');
  const incl = g.planes.filter((p) => p.cls === 'incline');
  const worst = wellSupported(walls).reduce<Plane | null>(
    (a, b) => (!a || (b.drift ?? 0) > (a.drift ?? 0) ? b : a),
    null,
  );
  const rest = [...slabs, ...incl].sort((a, b) => b.area - a.area);
  const sortedWalls = [...walls].sort((a, b) => (b.drift ?? 0) - (a.drift ?? 0));
  const pick = (p: Plane): void => {
    const i = g.planes.indexOf(p);
    setState({ selectedPlane: i });
    viewer?.focusPlane(i);
  };

  return (
    <>
      <div className="gverdict" style={{ borderColor: worst?.band?.css ?? 'var(--line)' }}>
        <b style={{ color: worst?.band?.css ?? 'var(--fg)' }}>
          {worst?.band?.name ?? 'NO WALLS FOUND'}
        </b>
        <span>
          {worst?.drift != null
            ? `worst wall ${(worst.drift * 100).toFixed(1)}% off plumb`
            : 'nothing vertical enough to measure'}
        </span>
      </div>

      <div className="gsum">
        <div>
          <span>WALLS</span>
          <b>{walls.length}</b>
        </div>
        <div>
          <span>FLOORS</span>
          <b>{slabs.length}</b>
        </div>
        <div>
          <span>DEBRIS</span>
          <b>{fmtNum(mVol(g.debris.totalVolume, mpu))} m³</b>
        </div>
      </div>

      <button className="btn gtoggle" onClick={() => setDetails(!details)}>
        {details ? '− hide the numbers' : '+ show the numbers'}
      </button>

      {details && (
        <>
          <div className="gsum">
            <div>
              <span>PLANES</span>
              <b>{g.planes.length}</b>
            </div>
            <div>
              <span>INCLINED</span>
              <b>{incl.length}</b>
            </div>
            <div>
              <span>UNASSIGNED</span>
              <b>{Math.round(g.residualFrac * 100)}%</b>
            </div>
            <div>
              <span>FIT TIME</span>
              <b>{g.ms} ms</b>
            </div>
          </div>

          <div className="scalebox">
            <label htmlFor="f-scale">1 SCAN UNIT =</label>
            <input
              id="f-scale"
              type="number"
              min={0.0001}
              step={0.01}
              value={mpu}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                setState({ metresPerUnit: isFinite(v) && v > 0 ? v : 1 });
              }}
            />
            <label>METRES</label>
          </div>
          <details className="gnote-details">
            <summary>how to read these numbers</summary>
            <div className="gnote">
              Worst drift counts only walls holding at least 1% of the cloud at 25% fill or better;
              thinner fragments still appear in the list, with their support and fill shown.{' '}
              {fmtInt(g.workingSet)} points fitted · epsilon from{' '}
              {g.usedCovariance
                ? 'each Gaussian’s own extent along the normal (n′Σn)'
                : 'scene scale — this cloud carries no scale_*/rot_*, so there is no per-point covariance'}
              {g.droppedDiffuse > 0 ? (
                <>
                  {' · '}
                  <b>{g.droppedDiffuse}</b> fit{g.droppedDiffuse === 1 ? '' : 's'} discarded as too
                  diffuse to draw — their points were spread too thin across the patch to represent
                  as a surface
                </>
              ) : null}
            </div>
            <div className="gnote">
              Angles and drift ratios are scale-free and hold whatever this is set to. Areas and
              volumes do not — they are only metric if this figure is right. ARKit-derived exports
              (Scaniverse, Polycam) are usually already 1 unit = 1 m.
            </div>
          </details>

          <div className="legend">
            {[...DRIFT_BANDS].reverse().map((b) => (
              <span key={b.name}>
                <i style={{ background: b.css }} />
                {b.name}
              </span>
            ))}
            <span>
              <i style={{ background: CLS_CSS.slab }} />
              SLAB
            </span>
            <span>
              <i style={{ background: CLS_CSS.incline }} />
              INCLINED
            </span>
          </div>
        </>
      )}

      <div className="ghead">WALLS — VERTICALITY</div>
      {!sortedWalls.length && <div className="gempty">No near-vertical planes found.</div>}
      {sortedWalls.map((p) => (
        <PlaneRow
          key={p.label}
          p={p}
          index={g.planes.indexOf(p)}
          mpu={mpu}
          selected={s.selectedPlane === g.planes.indexOf(p)}
          details={details}
          onClick={() => pick(p)}
        />
      ))}

      <div className="ghead">SLABS &amp; INCLINED SURFACES</div>
      {!rest.length && <div className="gempty">No horizontal or inclined planes found.</div>}
      {rest.map((p) => (
        <PlaneRow
          key={p.label}
          p={p}
          index={g.planes.indexOf(p)}
          mpu={mpu}
          selected={s.selectedPlane === g.planes.indexOf(p)}
          details={details}
          onClick={() => pick(p)}
        />
      ))}

      <div className="ghead">DEBRIS — BULK VOLUME ABOVE GROUND</div>
      <div className="gnote">
        Ground taken from{' '}
        {g.debris.groundPlane
          ? `plane ${g.debris.groundPlane}`
          : 'the 2nd percentile of height (no ground slab was fitted)'}
        . Column method: each grid cell contributes its height above ground × cell area.
      </div>
      {!g.debris.clusters.length && <div className="gempty">No debris above the ground plane.</div>}
      {g.debris.clusters.map((c) => (
        <div className="grow deb" key={c.id}>
          <div className="top">
            <span className="tag" style={{ borderColor: 'var(--dim)', color: 'var(--dim)' }}>
              D{c.id}
            </span>
            <span className="nm">debris pile {c.id}</span>
            <span className="num">{fmtNum(mVol(c.volume, mpu))} m³</span>
          </div>
          <div className="meta">
            footprint {fmtNum(mArea(c.footprint, mpu))}&nbsp;m² · max height{' '}
            {fmtNum(mLen(c.maxHeight, mpu), 2)}&nbsp;m · {c.cells} cells
          </div>
        </div>
      ))}

      <div className="ghead">WHAT THIS IS NOT</div>
      <ul className="lim">
        <li>
          Not a mesh. Planes, angles and volumes are the measurable facts; a surface adds nothing to
          an assessment and hides the residual.
        </li>
        <li>
          A splat captures <b>exterior surfaces</b>. Debris volume is a column measure that assumes
          each pile is solid down to the ground plane — overhangs and interior voids are invisible.
        </li>
        <li>
          Plane extent is trimmed to the 1st–99th percentile of its own points; <b>fill%</b> says
          how much of that rectangle is really surface.
        </li>
        <li>These are inputs an assessor reads. They do not move the sliders by themselves.</li>
      </ul>
    </>
  );
}
