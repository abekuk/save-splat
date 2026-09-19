import { useRef } from 'react';
import type { Viewer } from '@/scene/viewer';
import { makeSynthetic } from '@/core/synthetic';
import { setState, setStatus, useAppState } from '@/state/store';
import type { SlotKey } from '@/types';

export default function TopBar({
  viewer,
  ready,
  onLoadFile,
  onGeometry,
}: {
  viewer: Viewer | null;
  ready: boolean;
  onLoadFile: (f: File) => void;
  onGeometry: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const s = useAppState();
  // slotsVersion is read so this re-renders when viewer-owned slot state changes
  void s.slotsVersion;

  const active = ready && viewer ? viewer.getActiveSlot() : 'A';

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
    <div id="topbar">
      <div className="brand">
        RUBBLE <span>/ triage</span>
      </div>

      <button className="btn" onClick={() => fileRef.current?.click()}>
        LOAD .PLY
      </button>
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

      <button className="btn" onClick={synthetic}>
        SYNTHETIC SCENE
      </button>
      <button
        className={s.markMode ? 'btn on' : 'btn'}
        onClick={() => viewer?.setMarkMode(!viewer.isMarkMode())}
      >
        ⊕ MARK<em>m</em>
      </button>

      <span className="sep" />
      {(['A', 'B'] as SlotKey[]).map((k) => (
        <button
          key={k}
          className={active === k ? 'btn slot on' : 'btn slot'}
          title={`Scan slot ${k}`}
          onClick={() => viewer?.setActiveSlot(k)}
        >
          {k}
        </button>
      ))}

      <span className="sep" />
      <button className="btn" onClick={() => viewer?.resetView()}>
        RESET VIEW
      </button>
      <button className="btn" title="Cycle the up-axis convention: Y-up, Y-down, Z-up, Z-down" onClick={upAxis}>
        UP-AXIS<em>f</em>
      </button>

      <span className="sep" />
      <button className="btn" title="Fit planes, verticality and debris volume" onClick={onGeometry}>
        GEOMETRY<em>g</em>
      </button>
      <button
        className={s.planesVisible ? 'btn on' : 'btn'}
        title="Show or hide the fitted planes"
        onClick={() => {
          if (!viewer) return;
          const next = !viewer.planesVisible();
          viewer.setPlanesVisible(next);
          setState({ planesVisible: next });
        }}
      >
        PLANES
      </button>
    </div>
  );
}
