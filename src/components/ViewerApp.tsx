import { useCallback, useEffect, useRef, useState } from 'react';
import { createViewer } from '@/scene/viewer';
import type { Viewer } from '@/scene/viewer';
import { extractGeometry } from '@/core/geometry/extract';
import { ranked } from '@/core/ranking';
import { loadPlyFile } from '@/core/ply/load';
import { isMeshFile, loadMeshFile } from '@/core/mesh/load';
import { trimFarField } from '@/core/cloud/trim';
import { fmtInt } from '@/core/util';
import { makeSynthetic } from '@/core/synthetic';
import {
  addSite,
  getState,
  selectSite,
  setHint,
  setState,
  setStatus,
  useAppState,
} from '@/state/store';
import Hud, { StatusChip } from '@/components/Hud';
import LoadOverlay from '@/components/LoadOverlay';
import Panel from '@/components/Panel';

export default function ViewerApp({
  initialFile,
  onExit,
}: {
  initialFile: File | null;
  onExit: () => void;
}) {
  const viewRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const initialFileRef = useRef<File | null>(initialFile);
  const s = useAppState();

  /* ---- viewer lifecycle ---- */
  useEffect(() => {
    if (!canvasRef.current || !viewRef.current || !labelsRef.current) return;
    const v = createViewer(canvasRef.current, viewRef.current, labelsRef.current, {
      onStatus: setStatus,
      onHint: setHint,
      onSitePlaced: (pos) => addSite(pos),
      onSelectSite: (id) => selectSite(id),
      onSelectPlane: (i) => setState({ selectedPlane: i, tab: 'geo' }),
      onMarkModeChange: (on) => setState({ markMode: on }),
      onSlotsChanged: () => setState((st) => ({ slotsVersion: st.slotsVersion + 1 })),
    });
    setViewer(v);

    // The synthetic field auto-loads so the app is never a blank screen on open. It is
    // provisional: the first real .ply replaces it rather than being pushed into slot B.
    // Skipped when the landing handed us a file, so the demo scan never flashes first.
    const t = window.setTimeout(() => {
      if (!initialFileRef.current && !v.getSlot('A') && !v.getSlot('B')) {
        try {
          v.installCloud(makeSynthetic(), 'synthetic rubble field', 0, true);
          setStatus(
            'synthetic rubble field loaded — press m and click a structure to place the first site',
          );
        } catch (err) {
          console.error(err);
        }
      }
    }, 60);

    return () => {
      window.clearTimeout(t);
      v.dispose();
      setViewer(null);
    };
  }, []);

  /* ---- keep viewer markers in step with the store ---- */
  useEffect(() => {
    const ranks = new Map(ranked(s.sites).map((x, i) => [x.id, i + 1] as const));
    viewer?.syncSites(s.sites, s.selectedId, ranks);
  }, [viewer, s.sites, s.selectedId]);

  /* ---- loading ---- */
  const load = useCallback(
    (file: File) => {
      const v = viewer;
      if (!v) return;
      if (getState().loading) {
        setStatus('already loading a scan — let it finish first');
        return;
      }
      setState({
        loadFile: `${file.name}`,
        loading: { phase: 'reading', frac: 0, message: 'opening …' },
      });
      const mesh = isMeshFile(file.name);
      void (mesh ? loadMeshFile : loadPlyFile)(file, {
        onProgress: (p) => setState({ loading: p }),
        onDone: (res, _info, root) => {
          // Background shells sit two orders of magnitude outside the scene and would set
          // both the camera framing and every scale-relative tolerance in the extractor.
          const trimmed = trimFarField(res);
          try {
            // A glTF hands back both: the textured mesh to render, and a cloud sampled
            // evenly over its surface for the extractor. A .ply has only the cloud.
            if (root) v.installMesh(root, res, file.name, null);
            else v.installCloud(trimmed.res, file.name, null);
          } catch (err) {
            console.error(err);
            setState({ loading: null });
            setStatus(`could not build the point cloud: ${(err as Error).message}`);
            return;
          }
          setState({ loading: null, selectedPlane: -1 });
          if (trimmed.removed > 0) {
            setStatus(
              `${getState().status} · ${fmtInt(trimmed.removed)} far-field points dropped ` +
                `(beyond ${trimmed.cutoff!.toFixed(1)} units; the scene is ${trimmed.extent.radius.toFixed(1)} across)`,
            );
          }
        },
        onFail: (msg, err) => {
          if (err) console.error(err);
          setState({ loading: null });
          setStatus(`load failed: ${msg}`);
          window.alert(
            `Could not load "${file.name}".\n\n${msg}\n\n` +
              (mesh
                ? 'Meshes are read from .glb/.gltf and sampled into a point cloud. Compressed ' +
                  'geometry (Draco, meshopt) needs a decoder that is not bundled — re-export ' +
                  'without compression, or send the .ply.'
                : 'Point and splat clouds are read from .ply (Scaniverse, Polycam, gaussian-splat ' +
                  'exports). For a mesh, export .glb instead.'),
          );
        },
        confirmLarge: (msg) => window.confirm(msg),
        onCancel: () => {
          setState({ loading: null });
          setStatus(`cancelled — ${file.name} was not loaded`);
        },
      });
    },
    [viewer],
  );

  /* ---- a file handed over from the landing ---- */
  useEffect(() => {
    const f = initialFileRef.current;
    if (!viewer || !f) return;
    initialFileRef.current = null;
    load(f);
  }, [viewer, load]);

  /* ---- geometry ---- */
  /** `focus` switches to the GEO tab. The swarm runs extraction as a step of its own
   *  capture, and stealing the tab mid-flow would hide the result it is about to show. */
  const runGeometry = useCallback(
    (focus = true) => {
      const v = viewer;
      if (!v) return;
      const input = v.getExtractInput();
      if (!input) {
        setStatus(`slot ${v.getActiveSlot()} is empty — load a scan before extracting geometry`);
        return;
      }
      if (getState().geoStage === 'ransac' || getState().geoStage === 'prep') return;
      const targetSlot = v.getActiveSlot();
      const targetRevision = v.getSlotRevision(targetSlot);
      if (targetRevision === null) return;
      setState({
        geoStage: 'prep',
        geoProgress: null,
        selectedPlane: -1,
        ...(focus ? { tab: 'geo' as const } : {}),
      });
      v.setGeomFor(targetSlot, targetRevision, null);
      extractGeometry(
        input,
        (planes, stage, frac) =>
          setState({ geoStage: 'ransac', geoProgress: { planes, stage, frac } }),
        (g) => {
          if (!v.setGeomFor(targetSlot, targetRevision, g)) {
            setState({ geoStage: 'idle', geoProgress: null });
            setStatus('geometry discarded — the source scan was replaced while measuring');
            return;
          }
          setState({ geoStage: 'done', geoProgress: null });
          const walls = g.planes.filter((p) => p.cls === 'wall');
          const worst = walls.reduce((m, p) => Math.max(m, p.drift ?? 0), 0);
          setStatus(
            `slot ${targetSlot}: ${g.planes.length} planes in ${g.ms} ms · ${walls.length} wall${walls.length === 1 ? '' : 's'}` +
              (walls.length ? ` · worst drift ${(worst * 100).toFixed(1)}%` : ''),
          );
        },
        (err) => {
          console.error(err);
          setState({ geoStage: 'failed', geoProgress: null });
          setStatus(`geometry failed: ${err.message}`);
        },
      );
    },
    [viewer],
  );

  /* ---- keyboard ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) {
        if (e.key === 'Escape') t.blur();
        return;
      }
      const v = viewer;
      if (!v) return;
      if (e.key === 'm' || e.key === 'M') v.setMarkMode(!v.isMarkMode());
      else if (e.key === 'Escape') {
        if (v.isMarkMode()) {
          v.setMarkMode(false);
          setStatus('marking cancelled');
        }
      } else if (e.key === 'f' || e.key === 'F') {
        const r = v.cycleOrientation();
        if (r) {
          if (r.clearedGeometry) setState({ geoStage: 'idle', selectedPlane: -1 });
          setStatus(
            `slot ${v.getActiveSlot()} up-axis ${r.name}` +
              (r.clearedGeometry ? ' — extracted geometry cleared, re-run GEOMETRY' : '') +
              ' — if the scene is mirrored rather than inverted that is a handedness issue, not this rotation',
          );
        }
      } else if (e.key === 'g' || e.key === 'G') runGeometry();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewer, runGeometry]);

  const onDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    const f = e.dataTransfer?.files?.[0];
    if (f) load(f);
  };

  return (
    <div id="app">
      <div id="view" ref={viewRef} onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
        <canvas id="gl" ref={canvasRef} />
        <div id="labels" ref={labelsRef} />
        <Hud viewer={viewer} onLoadFile={load} onGeometry={runGeometry} onExit={onExit} />
        <StatusChip text={s.status} />
        <div id="hintbar" className={s.hint ? 'on' : undefined}>
          {s.hint}
        </div>
        <LoadOverlay progress={s.loading} file={s.loadFile} />
      </div>
      <Panel viewer={viewer} onGeometry={runGeometry} />
    </div>
  );
}
