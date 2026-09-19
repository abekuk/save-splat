import { useEffect, useRef, useState } from 'react';
import type { Viewer } from '@/scene/viewer';
import { makeSynthetic } from '@/core/synthetic';
import { setState, setStatus, useAppState } from '@/state/store';
import type { SlotKey } from '@/types';

/* The viewer's controls, as a rail instead of a strip of labelled buttons.
 *
 * The old top bar spent the full width of the window on nine text buttons that were mostly
 * idle, over a 3D view that wants the room. Everything here is one icon; the things with
 * options — the scan slot, the up-axis — open a flyout rather than each spending a slot of
 * their own. Labels have not been thrown away, they moved into the tooltip and the flyout. */

const I = {
  home: 'M3 9.5 10 4l7 5.5V16a1 1 0 0 1-1 1h-4v-4H8v4H4a1 1 0 0 1-1-1z',
  upload: 'M10 13V4m0 0L6.5 7.5M10 4l3.5 3.5M4 13v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2',
  cube: 'M10 3 3.5 6.5v7L10 17l6.5-3.5v-7zM3.5 6.5 10 10m0 0 6.5-3.5M10 10v7',
  mark: 'M10 3v14M3 10h14',
  scan: 'M3 7V4h3M17 7V4h-3M3 13v3h3m11-3v3h-3M6 10h8',
  layers: 'M10 3 3 7l7 4 7-4zM3 12l7 4 7-4',
  axis: 'M10 17V6m0 0L6.5 9.5M10 6l3.5 3.5M3 17h14',
  target: 'M10 4v2m0 8v2M4 10h2m8 0h2M10 13.2A3.2 3.2 0 1 0 10 6.8a3.2 3.2 0 0 0 0 6.4z',
};

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

function Btn({
  icon,
  label,
  hint,
  on,
  busy,
  disabled,
  onClick,
}: {
  icon: string;
  label: string;
  hint?: string;
  on?: boolean;
  busy?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={'hud-btn' + (on ? ' on' : '') + (busy ? ' busy' : '')}
      title={hint ? `${label} (${hint})` : label}
      aria-label={label}
      aria-pressed={on}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon d={icon} />
    </button>
  );
}

type Flyout = null | 'slot' | 'axis';

export default function Hud({
  viewer,
  onLoadFile,
  onGeometry,
  onExit,
}: {
  viewer: Viewer | null;
  onLoadFile: (f: File) => void;
  onGeometry: () => void;
  onExit: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [flyout, setFlyout] = useState<Flyout>(null);
  const s = useAppState();
  void s.slotsVersion; // re-render when viewer-owned slot state changes

  /* A flyout that survives a click anywhere else is a flyout you have to dismiss twice. */
  useEffect(() => {
    if (!flyout) return;
    const close = (e: MouseEvent): void => {
      if (!rootRef.current?.contains(e.target as Node)) setFlyout(null);
    };
    const esc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setFlyout(null);
    };
    window.addEventListener('mousedown', close);
    window.addEventListener('keydown', esc);
    return () => {
      window.removeEventListener('mousedown', close);
      window.removeEventListener('keydown', esc);
    };
  }, [flyout]);

  const active = viewer ? viewer.getActiveSlot() : 'A';
  const running = s.geoStage === 'prep' || s.geoStage === 'ransac' || s.geoStage === 'debris';

  const synthetic = (): void => {
    if (!viewer) return;
    setStatus('generating synthetic rubble field …');
    window.setTimeout(() => {
      try {
        viewer.installCloud(makeSynthetic(), 'synthetic rubble field', 0);
        setState({ selectedPlane: -1, geoStage: 'idle' });
      } catch (err) {
        console.error(err);
        const msg = err instanceof Error ? err.message : String(err);
        setStatus('synthetic scene failed: ' + msg);
        window.alert('Could not build the synthetic scene: ' + msg);
      }
    }, 30);
  };

  const upAxis = (): void => {
    if (!viewer) return;
    const r = viewer.cycleOrientation();
    if (!r) return;
    if (r.clearedGeometry) setState({ geoStage: 'idle', selectedPlane: -1 });
    setStatus(
      `slot ${viewer.getActiveSlot()} up-axis ${r.name}` +
        (r.clearedGeometry ? ' — extracted geometry cleared, re-run GEOMETRY' : ''),
    );
  };

  return (
    <div className="hud" ref={rootRef}>
      <div className="hud-rail">
        <Btn icon={I.home} label="Back to the start" onClick={onExit} />
        <span className="hud-sep" />

        <Btn icon={I.upload} label="Load .ply" onClick={() => fileRef.current?.click()} />
        <input
          ref={fileRef}
          type="file"
          accept=".ply,application/octet-stream"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onLoadFile(f);
            e.target.value = ''; // allow re-loading the same file
          }}
        />
        <Btn icon={I.cube} label="Synthetic scene" onClick={synthetic} />
        <span className="hud-sep" />

        <Btn
          icon={I.mark}
          label="Mark a site"
          hint="m"
          on={s.markMode}
          onClick={() => viewer?.setMarkMode(!viewer.isMarkMode())}
        />
        <Btn
          icon={I.scan}
          label="Extract geometry"
          hint="g"
          busy={running}
          disabled={running}
          onClick={onGeometry}
        />
        <Btn
          icon={I.layers}
          label="Show fitted planes"
          on={s.planesVisible}
          onClick={() => {
            if (!viewer) return;
            const next = !viewer.planesVisible();
            viewer.setPlanesVisible(next);
            setState({ planesVisible: next });
          }}
        />
        <span className="hud-sep" />

        <button
          className={'hud-btn slot' + (flyout === 'slot' ? ' open' : '')}
          title={`Scan slot ${active}`}
          aria-label={`Scan slot ${active}`}
          onClick={() => setFlyout(flyout === 'slot' ? null : 'slot')}
        >
          {active}
        </button>
        <Btn
          icon={I.axis}
          label="Up-axis"
          hint="f"
          on={flyout === 'axis'}
          onClick={() => setFlyout(flyout === 'axis' ? null : 'axis')}
        />
        <Btn icon={I.target} label="Reset view" onClick={() => viewer?.resetView()} />
      </div>

      {flyout === 'slot' ? (
        <div className="hud-flyout" style={{ top: 214 }}>
          <div className="hud-flyout-t">scan slot</div>
          {(['A', 'B'] as SlotKey[]).map((k) => (
            <button
              key={k}
              className={active === k ? 'hud-opt on' : 'hud-opt'}
              onClick={() => {
                viewer?.setActiveSlot(k);
                setFlyout(null);
              }}
            >
              {k}
              <em>{k === 'A' ? 'first load' : 'second load'}</em>
            </button>
          ))}
          <div className="hud-flyout-n">A/B is a visual toggle. Markers persist across it.</div>
        </div>
      ) : null}

      {flyout === 'axis' ? (
        <div className="hud-flyout" style={{ top: 250 }}>
          <div className="hud-flyout-t">up-axis</div>
          <button
            className="hud-opt"
            onClick={() => {
              upAxis();
            }}
          >
            cycle<em>Y-up → Y-down → Z-up → Z-down</em>
          </button>
          <div className="hud-flyout-n">
            Detected from the scan. Splat exports land Y-down, point clouds are usually Z-up.
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* The status line used to run the width of the view and wrap to two lines for a message
 * the operator reads once. It says the short version now, and opens for the rest. */
export function StatusChip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  if (!text) return null;
  // the head of the message is the part that matters; the rest is provenance
  const head = text.split(' · ')[0];
  const hasMore = head !== text;
  return (
    <button
      className={'hud-status' + (open ? ' open' : '')}
      onClick={() => setOpen(!open)}
      title={open ? 'collapse' : text}
    >
      <span className="txt">{open || !hasMore ? text : head}</span>
      {hasMore ? <span className="more">{open ? '−' : '+'}</span> : null}
    </button>
  );
}
