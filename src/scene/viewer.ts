/* All three.js lives here.
 *
 * React owns the panel; this module owns the canvas, and the two talk through a small
 * callback surface. Site markers and plane labels are DOM elements positioned per-frame
 * from projected world coordinates, so they stay outside React's render loop on purpose —
 * re-rendering them at 60fps through the component tree would be pure waste.
 *
 * Orbit/pan/zoom is hand-written: OrbitControls was absent from the CDN build this was
 * ported from, and the behaviour is now load-bearing for the demo.
 */
import * as THREE from 'three';
import { clamp, fmtInt } from '@/core/util';
import { ORIENTS, detectOrientation } from '@/core/orientation';
import { estimateGround } from '@/core/geometry/level';
import type { OrientationDetection } from '@/core/orientation';
import { CLS_CSS, CLS_HEX } from '@/core/geometry/extract';
import type { ExtractInput } from '@/core/geometry/extract';
import type { GeometryResult, Plane, PlyResult, Site, Slot, SlotKey, Vec3 } from '@/types';

export interface ViewerCallbacks {
  onStatus: (msg: string) => void;
  onHint: (msg: string) => void;
  onSitePlaced: (pos: Vec3) => void;
  onSelectSite: (id: number) => void;
  onSelectPlane: (index: number) => void;
  onMarkModeChange: (on: boolean) => void;
  onSlotsChanged: () => void;
}

interface SlotInternal {
  /** THREE.Points for a cloud, a glTF scene graph for a mesh */
  obj: THREE.Object3D;
  kind: 'points' | 'mesh';
  /** every vertex, flattened xyz, in the object's local space. The geometry pass reads
   *  this rather than reaching into a geometry attribute, so a mesh and a cloud are
   *  interchangeable to it. */
  positions: Float32Array;
  /** local-space bounding centre, so framing does not depend on the object's shape */
  center: THREE.Vector3;
  name: string;
  kept: number;
  total: number;
  orient: number;
  auto: boolean;
  detected: OrientationDetection | null;
  alphas: Float32Array | null;
  cov: Float32Array | null;
  radius: number;
  geom: GeometryResult | null;
}

interface MarkerHandle {
  mesh: THREE.Mesh;
  el: HTMLDivElement;
}

export function createViewer(
  canvas: HTMLCanvasElement,
  view: HTMLElement,
  labelLayer: HTMLElement,
  cb: ViewerCallbacks,
) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.01, 4000);
  const raycaster = new THREE.Raycaster();

  const orbit = { target: new THREE.Vector3(0, 0, 0), radius: 24, theta: 0.7, phi: 1.15 };
  const HOME = { radius: 24, theta: 0.7, phi: 1.15, target: new THREE.Vector3(0, 0, 0) };
  let flyGoal: THREE.Vector3 | null = null;

  const slots: Record<SlotKey, SlotInternal | null> = { A: null, B: null };
  let activeSlot: SlotKey = 'A';

  const markerGeo = new THREE.SphereGeometry(1, 12, 10);
  const markers = new Map<number, MarkerHandle>();
  let markMode = false;
  let selectedId: number | null = null;

  const planeGroup = new THREE.Group();
  scene.add(planeGroup);
  let showPlanes = true;
  let planeLabels: { el: HTMLDivElement; pos: THREE.Vector3 }[] = [];

  let raf = 0;
  let disposed = false;

  /* ---------------- camera ---------------- */

  function resize(): void {
    const w = Math.max(1, view.clientWidth);
    const h = Math.max(1, view.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function applyOrbit(): void {
    const sp = Math.sin(orbit.phi);
    const cp = Math.cos(orbit.phi);
    camera.position.set(
      orbit.target.x + orbit.radius * sp * Math.sin(orbit.theta),
      orbit.target.y + orbit.radius * cp,
      orbit.target.z + orbit.radius * sp * Math.cos(orbit.theta),
    );
    camera.lookAt(orbit.target);
  }

  const _right = new THREE.Vector3();
  const _up = new THREE.Vector3();
  function panBy(dx: number, dy: number): void {
    camera.updateMatrixWorld();
    _right.setFromMatrixColumn(camera.matrix, 0);
    _up.setFromMatrixColumn(camera.matrix, 1);
    const k = orbit.radius * 0.0016;
    orbit.target.addScaledVector(_right, -dx * k);
    orbit.target.addScaledVector(_up, dy * k);
    flyGoal = null;
  }

  function resetView(): void {
    orbit.target.copy(HOME.target);
    orbit.radius = HOME.radius;
    orbit.theta = HOME.theta;
    orbit.phi = HOME.phi;
    flyGoal = null;
  }

  /* ---------------- pointer input ---------------- */

  const ptrs = new Map<number, { x: number; y: number }>();
  let drag: { id: number; pan: boolean } | null = null;
  let travel = 0;
  let pinchDist = 0;

  function twoDist(): number {
    let a: { x: number; y: number } | null = null;
    let b: { x: number; y: number } | null = null;
    ptrs.forEach((p) => {
      if (!a) a = p;
      else if (!b) b = p;
    });
    if (!a || !b) return 0;
    const pa = a as { x: number; y: number };
    const pb = b as { x: number; y: number };
    return Math.hypot(pa.x - pb.x, pa.y - pb.y);
  }

  const onPointerDown = (e: PointerEvent): void => {
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      /* capture is best-effort */
    }
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.size === 2) {
      pinchDist = twoDist();
      drag = null;
      travel = 999;
      return;
    }
    drag = { id: e.pointerId, pan: e.button === 2 || e.shiftKey };
    travel = 0;
  };

  const onPointerMove = (e: PointerEvent): void => {
    const p = ptrs.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    p.x = e.clientX;
    p.y = e.clientY;

    if (ptrs.size >= 2) {
      const d = twoDist();
      if (pinchDist > 0 && d > 0) orbit.radius = clamp(orbit.radius * (pinchDist / d), 0.3, 600);
      pinchDist = d;
      travel = 999;
      return;
    }
    if (!drag || drag.id !== e.pointerId) return;
    travel += Math.abs(dx) + Math.abs(dy);

    if (drag.pan) {
      panBy(dx, dy);
    } else {
      orbit.theta -= dx * 0.006;
      orbit.phi = clamp(orbit.phi - dy * 0.006, 0.05, Math.PI - 0.05);
    }
  };

  const endPointer = (e: PointerEvent): void => {
    const wasDrag = drag && drag.id === e.pointerId;
    ptrs.delete(e.pointerId);
    if (ptrs.size < 2) pinchDist = 0;
    if (wasDrag) {
      drag = null;
      if (travel < 5) handleClick(e); // click vs drag discrimination
    }
  };

  const onContextMenu = (e: Event): void => e.preventDefault();
  const onWheel = (e: WheelEvent): void => {
    e.preventDefault();
    orbit.radius = clamp(orbit.radius * (1 + Math.sign(e.deltaY) * 0.11), 0.3, 600);
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', endPointer);
  canvas.addEventListener('pointercancel', endPointer);
  canvas.addEventListener('contextmenu', onContextMenu);
  canvas.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('resize', resize);

  /* ---------------- marker placement ---------------- */

  /** Dispose a whole subtree — a glTF scene is not one geometry and one material. */
  function disposeObject(root: THREE.Object3D): void {
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat?.dispose();
    });
  }

  function visibleClouds(): THREE.Object3D[] {
    const out: THREE.Object3D[] = [];
    (Object.keys(slots) as SlotKey[]).forEach((k) => {
      const s = slots[k];
      if (s && s.obj.visible) out.push(s.obj);
    });
    return out;
  }

  function handleClick(e: PointerEvent): void {
    if (!markMode) return;
    const targets = visibleClouds();
    if (!targets.length) {
      cb.onStatus('nothing loaded — click SYNTHETIC SCENE or LOAD .PLY first');
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(ndc, camera);
    // threshold must scale with zoom or picking fails at distance
    raycaster.params.Points!.threshold = Math.max(0.02, orbit.radius * 0.012);

    const hits = raycaster.intersectObjects(targets, false);
    if (!hits.length) {
      cb.onStatus('no surface under the cursor — aim at the rubble and click again (ESC cancels)');
      return; // stay in marking mode on a miss
    }
    const p = hits[0].point;
    cb.onSitePlaced({ x: p.x, y: p.y, z: p.z });
    setMarkMode(false);
  }

  function setMarkMode(on: boolean): void {
    markMode = on;
    document.body.classList.toggle('marking', markMode);
    cb.onHint(markMode ? 'MARKING — click a structure to place a site · ESC cancels' : '');
    cb.onMarkModeChange(markMode);
  }

  /* ---------------- site markers ---------------- */

  /** Reconcile marker meshes and labels against the store's site list.
   *  The 3D label carries the live dispatch RANK, not the name — it changes as scores change. */
  function syncSites(sites: Site[], selId: number | null, ranks: Map<number, number>): void {
    selectedId = selId;
    const seen = new Set<number>();

    for (const s of sites) {
      seen.add(s.id);
      let h = markers.get(s.id);
      if (!h) {
        // depthTest off so a marker behind rubble is never lost on stage
        const mat = new THREE.MeshBasicMaterial({
          color: 0xe8590c,
          depthTest: false,
          transparent: true,
          opacity: 0.95,
        });
        const mesh = new THREE.Mesh(markerGeo, mat);
        mesh.renderOrder = 10;
        scene.add(mesh);

        const el = document.createElement('div');
        el.className = 'label';
        el.addEventListener('pointerdown', (e) => e.stopPropagation());
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          cb.onSelectSite(s.id);
        });
        labelLayer.appendChild(el);

        h = { mesh, el };
        markers.set(s.id, h);
      }
      h.mesh.position.set(s.pos.x, s.pos.y, s.pos.z);
      h.el.textContent = String(ranks.get(s.id) ?? '–');
      h.el.classList.toggle('low', s.conf === 'low');
      h.el.classList.toggle('sel', s.id === selectedId);
      (h.mesh.material as THREE.MeshBasicMaterial).color.setHex(
        s.conf === 'low' ? 0xb45309 : 0xe8590c,
      );
    }

    for (const [id, h] of markers) {
      if (seen.has(id)) continue;
      scene.remove(h.mesh);
      (h.mesh.material as THREE.Material).dispose();
      h.el.remove();
      markers.delete(id);
    }
  }

  /* per-frame upkeep: constant screen size + projected labels */
  const _v = new THREE.Vector3();
  function updateMarkers(): void {
    const base = orbit.radius * 0.012;
    const w = view.clientWidth;
    const h = view.clientHeight;
    for (const [id, m] of markers) {
      m.mesh.scale.setScalar(base * (id === selectedId ? 1.45 : 1));
      _v.copy(m.mesh.position).project(camera);
      if (_v.z >= 1) {
        m.el.style.display = 'none';
        continue;
      }
      m.el.style.display = '';
      m.el.style.left = (_v.x * 0.5 + 0.5) * w + 'px';
      m.el.style.top = (-_v.y * 0.5 + 0.5) * h + 'px';
    }
    for (const pl of planeLabels) {
      _v.copy(pl.pos).project(camera);
      if (_v.z >= 1) {
        pl.el.style.display = 'none';
        continue;
      }
      pl.el.style.display = '';
      pl.el.style.left = (_v.x * 0.5 + 0.5) * w + 'px';
      pl.el.style.top = (-_v.y * 0.5 + 0.5) * h + 'px';
    }
  }

  /* ---------------- plane overlay ---------------- */

  function clearOverlay(): void {
    for (let i = planeGroup.children.length - 1; i >= 0; i--) {
      const c = planeGroup.children[i] as THREE.Mesh;
      planeGroup.remove(c);
      c.geometry?.dispose();
      if (c.material) (c.material as THREE.Material).dispose();
    }
    planeLabels.forEach((p) => p.el.remove());
    planeLabels = [];
  }

  const planeHex = (p: Plane): number => (p.cls === 'wall' && p.band ? p.band.hex : CLS_HEX[p.cls]);
  const planeCss = (p: Plane): string => (p.cls === 'wall' && p.band ? p.band.css : CLS_CSS[p.cls]);

  function buildOverlay(geom: GeometryResult | null): void {
    clearOverlay();
    if (!geom || !showPlanes) return;
    geom.planes.forEach((p, i) => {
      const hex = planeHex(p);
      const c = p.centroid;
      const u = p.u;
      const v = p.v;
      const corner = (a: number, b: number): number[] => [
        c[0] + u[0] * a + v[0] * b,
        c[1] + u[1] * a + v[1] * b,
        c[2] + u[2] * a + v[2] * b,
      ];
      const q = [
        corner(p.umin, p.vmin),
        corner(p.umax, p.vmin),
        corner(p.umax, p.vmax),
        corner(p.umin, p.vmax),
      ];
      const verts = new Float32Array(([] as number[]).concat(q[0], q[1], q[2], q[3]));

      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(verts, 3));
      g.setIndex([0, 1, 2, 0, 2, 3]);
      const mesh = new THREE.Mesh(
        g,
        new THREE.MeshBasicMaterial({
          color: hex,
          transparent: true,
          // paint in proportion to how much of the patch is real surface; the fill runs
          // higher than it did on the dark ground, where far less was needed to register
          opacity: 0.07 + 0.2 * p.fill,
          side: THREE.DoubleSide,
          depthWrite: false,
          // A fitted plane sits exactly on the surface it was fitted to. Against a point
          // cloud that is invisible; against a mesh the two are coplanar and z-fight into
          // a mottled mess, so nudge the overlay towards the camera.
          polygonOffset: true,
          polygonOffsetFactor: -2,
          polygonOffsetUnits: -2,
        }),
      );
      mesh.renderOrder = 4;
      planeGroup.add(mesh);

      const lg = new THREE.BufferGeometry();
      lg.setAttribute('position', new THREE.BufferAttribute(verts.slice(), 3));
      const line = new THREE.LineLoop(
        lg,
        new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.85 }),
      );
      line.renderOrder = 5;
      planeGroup.add(line);

      // a short normal stub, so orientation reads at a glance when you orbit
      const len = Math.max(p.umax - p.umin, p.vmax - p.vmin) * 0.12;
      const ng = new THREE.BufferGeometry();
      ng.setAttribute(
        'position',
        new THREE.BufferAttribute(
          new Float32Array([
            c[0],
            c[1],
            c[2],
            c[0] + p.n[0] * len,
            c[1] + p.n[1] * len,
            c[2] + p.n[2] * len,
          ]),
          3,
        ),
      );
      planeGroup.add(
        new THREE.Line(
          ng,
          new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.55 }),
        ),
      );

      const el = document.createElement('div');
      el.className = 'plabel';
      el.style.borderColor = planeCss(p);
      el.style.color = planeCss(p);
      el.textContent =
        p.label +
        (p.cls === 'wall' && p.drift != null
          ? '  ' + (p.drift * 100).toFixed(1) + '%'
          : '  ' + ((p.tilt * 180) / Math.PI).toFixed(0) + '°');
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        focusPlane(i);
      });
      labelLayer.appendChild(el);
      planeLabels.push({ el, pos: new THREE.Vector3(c[0], c[1], c[2]) });
    });
  }

  function refreshOverlay(): void {
    const s = slots[activeSlot];
    buildOverlay(s?.geom ?? null);
  }

  function focusPlane(i: number): void {
    const s = slots[activeSlot];
    const p = s?.geom?.planes[i];
    if (!p) return;
    flyGoal = new THREE.Vector3(p.centroid[0], p.centroid[1], p.centroid[2]);
    cb.onSelectPlane(i);
  }

  /* ---------------- slots ---------------- */

  /** Size points so they very nearly touch, instead of using a fixed fraction of the scene.
   *
   *  A scan is a surface, so N points over a patch of side ~2r sit roughly 2r/sqrt(N) apart.
   *  Drawing them smaller than that leaves the gaps you see when you zoom in; drawing them at
   *  about that spacing reads as a continuous surface. The fixed 0.0035·r this replaced was
   *  tuned against one scene and went sparse on any cloud with fewer points. */
  function pointSizeFor(radius: number, count: number): number {
    const spacing = (2 * radius) / Math.sqrt(Math.max(1, count));
    return clamp(spacing * 1.15, radius * 0.0012, radius * 0.03);
  }

  /* Bounds that ignore floaters.
   *
   * A real 3DGS scene carries stray gaussians flung far from the subject — background,
   * sky, reconstruction noise. A true bounding sphere is sized by the worst of them, and
   * everything downstream is scale-relative: framing puts the subject in a corner, point
   * size collapses, and the geometry pass derives its plane tolerance from a radius that
   * is mostly empty space. Taking a high percentile of the distance from the centroid
   * gives the size of the thing you actually scanned. */
  function robustBounds(positions: Float32Array): { center: THREE.Vector3; radius: number } {
    const n = Math.floor(positions.length / 3);
    const center = new THREE.Vector3();
    if (!n) return { center, radius: 10 };

    // stride-sample so a huge cloud costs the same as a small one
    const step = Math.max(1, Math.floor(n / 50000));
    let cx = 0, cy = 0, cz = 0, count = 0;
    for (let i = 0; i < n; i += step) {
      cx += positions[i * 3];
      cy += positions[i * 3 + 1];
      cz += positions[i * 3 + 2];
      count++;
    }
    cx /= count; cy /= count; cz /= count;

    const d: number[] = [];
    for (let i = 0; i < n; i += step) {
      const dx = positions[i * 3] - cx;
      const dy = positions[i * 3 + 1] - cy;
      const dz = positions[i * 3 + 2] - cz;
      d.push(Math.sqrt(dx * dx + dy * dy + dz * dz));
    }
    d.sort((a, b) => a - b);
    // 95th percentile: keeps the subject, drops the tail of floaters
    const r = d[Math.min(d.length - 1, Math.floor(d.length * 0.95))] || 10;
    center.set(cx, cy, cz);
    return { center, radius: r > 0 ? r : 10 };
  }

  function targetSlot(): SlotKey {
    // The boot-time synthetic field is provisional: the first real load replaces it, so a
    // user's first .ply lands in A rather than being pushed into B by the safety net.
    if (slots.A && slots.A.auto) return 'A';
    if (!slots.A) return 'A';
    if (!slots.B) return 'B';
    return activeSlot;
  }

  function setActiveSlot(k: SlotKey): void {
    activeSlot = k;
    (Object.keys(slots) as SlotKey[]).forEach((key) => {
      const s = slots[key];
      if (s) s.obj.visible = key === activeSlot;
    });
    refreshOverlay();
    cb.onSlotsChanged();
    const s = slots[activeSlot];
    cb.onStatus(
      s
        ? `slot ${activeSlot}: ${s.name} — ${fmtInt(s.kept)} pts`
        : `slot ${activeSlot} is empty — load a .ply into it`,
    );
  }

  function frameSlot(key: SlotKey): void {
    const s = slots[key];
    if (!s) return;
    const c = s.center.clone();
    s.obj.updateMatrixWorld();
    c.applyMatrix4(s.obj.matrixWorld);
    const rad = isFinite(s.radius) && s.radius > 0 ? s.radius : 10;

    orbit.target.copy(c);
    orbit.radius = clamp(rad * 2.2, 0.3, 600);
    orbit.theta = 0.7;
    orbit.phi = 1.15;
    flyGoal = null;
    HOME.target.copy(c);
    HOME.radius = orbit.radius;
    HOME.theta = 0.7;
    HOME.phi = 1.15;

    camera.near = Math.max(0.01, rad / 2000);
    camera.far = Math.max(100, rad * 60);
    camera.updateProjectionMatrix();
  }

  function installCloud(res: PlyResult, name: string, orient: number | null, auto = false): void {
    const key = targetSlot();
    const outgoing = slots[key];
    if (outgoing) {
      scene.remove(outgoing.obj);
      disposeObject(outgoing.obj);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(res.positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(res.colors, 3));
    geo.computeBoundingSphere(); // still needed for three's frustum culling
    const rb = robustBounds(res.positions);
    const rad = rb.radius;

    const mat = new THREE.PointsMaterial({
      size: pointSizeFor(rad, res.kept),
      vertexColors: true,
      sizeAttenuation: true,
    });
    const pts = new THREE.Points(geo, mat);

    let det: OrientationDetection | null = null;
    let idx = orient;
    let levelled: number | null = null;
    if (idx == null) {
      det = detectOrientation(res.positions);
      idx = det.index;
    }
    pts.rotation.x = ORIENTS[idx].rx;

    /* When no axis convention fits, the scan has no convention to find — a COLMAP-derived
       3DGS scene is at an arbitrary rotation and no axis flip will make its floor level.
       Everything measured here is defined against up, so fall back to estimating the ground
       plane and rotating that onto +Y. */
    if (det && !det.confident) {
      const ground = estimateGround(res.positions);
      if (ground && ground.support >= 0.06) {
        const from = new THREE.Vector3(...ground.normal).normalize();
        pts.quaternion.setFromUnitVectors(from, new THREE.Vector3(0, 1, 0));
        levelled = ground.support;
      }
    }
    scene.add(pts);

    slots[key] = {
      obj: pts,
      kind: 'points',
      positions: res.positions,
      center: rb.center,
      name,
      kept: res.kept,
      total: res.total,
      orient: idx,
      auto,
      detected: det,
      alphas: res.alphas ?? null,
      cov: res.cov ?? null,
      radius: rad,
      geom: null,
    };
    activeSlot = key;
    setActiveSlot(key);
    frameSlot(key);

    cb.onStatus(
      `${name} → slot ${key} · ${fmtInt(res.kept)} / ${fmtInt(res.total)} pts · 1:${res.step} sampling · ` +
        `${fmtInt(res.culled)} culled · colour ${res.colorSource}` +
        (levelled != null
          ? ` · levelled onto its largest flat surface (${Math.round(levelled * 100)}% of points) — press f to override`
          : det
            ? ` · up-axis ${ORIENTS[idx].name}` +
              (det.confident
                ? ` (detected, floor holds ${Math.round(det.score * 100)}% of points)`
                : ' (UNCERTAIN — press f if this looks wrong)')
            : ''),
    );
  }

  /** Install a glTF scene graph. Mirrors installCloud: same slot rules, same orientation
   *  detection (run on the mesh's own vertices), same framing. */
  function installMesh(
    root: THREE.Object3D,
    res: PlyResult,
    name: string,
    orient: number | null,
  ): void {
    const positions = res.positions;
    const key = targetSlot();
    const outgoing = slots[key];
    if (outgoing) {
      scene.remove(outgoing.obj);
      disposeObject(outgoing.obj);
    }

    const box = new THREE.Box3().setFromObject(root);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const rad = isFinite(sphere.radius) && sphere.radius > 0 ? sphere.radius : 10;

    let det: OrientationDetection | null = null;
    let idx = orient;
    if (idx == null) {
      det = detectOrientation(positions);
      idx = det.index;
    }
    root.rotation.x = ORIENTS[idx].rx;
    scene.add(root);

    slots[key] = {
      obj: root,
      kind: 'mesh',
      positions,
      center: sphere.center.clone(),
      name,
      kept: res.kept,
      total: res.total,
      orient: idx,
      auto: false,
      detected: det,
      alphas: null,
      cov: null,
      radius: rad,
      geom: null,
    };
    activeSlot = key;
    setActiveSlot(key);
    frameSlot(key);

    cb.onStatus(
      `${name} → slot ${key} · textured mesh · ${fmtInt(res.kept)} points sampled over its surface` +
        ` · colour ${res.colorSource}` +
        (det
          ? ` · up-axis ${ORIENTS[idx].name}` +
            (det.confident ? '' : ' (UNCERTAIN — press f if this looks wrong)')
          : ''),
    );
  }

  /** Cycle the up-axis convention. Returns the new name, and whether it invalidated geometry. */
  function cycleOrientation(): { name: string; clearedGeometry: boolean } | null {
    const s = slots[activeSlot];
    if (!s) {
      cb.onStatus(`slot ${activeSlot} is empty — nothing to reorient`);
      return null;
    }
    s.orient = (s.orient + 1) % ORIENTS.length;
    // drop any auto-levelling: the operator is taking over
    s.obj.quaternion.identity();
    s.obj.rotation.x = ORIENTS[s.orient].rx;
    // Markers hold their world positions; reorienting moves the cloud under them by design.
    let cleared = false;
    if (s.geom) {
      // every angle was measured against world up, so this invalidates them
      s.geom = null;
      clearOverlay();
      cleared = true;
    }
    frameSlot(activeSlot);
    cb.onSlotsChanged();
    return { name: ORIENTS[s.orient].name, clearedGeometry: cleared };
  }

  function publicSlot(k: SlotKey): Slot | null {
    const s = slots[k];
    if (!s) return null;
    return {
      kind: s.kind,
      name: s.name,
      kept: s.kept,
      total: s.total,
      orient: ORIENTS[s.orient],
      hasCov: !!s.cov,
      radius: s.radius,
      auto: s.auto,
      geom: s.geom,
    };
  }

  /** Vertex data + world matrix for the geometry pass — the extractor never sees three.js. */
  function getExtractInput(): ExtractInput | null {
    const s = slots[activeSlot];
    if (!s) return null;
    s.obj.updateMatrixWorld();
    return {
      positions: s.positions,
      alphas: s.alphas,
      cov: s.cov,
      matrixWorld: s.obj.matrixWorld.elements,
      radius: s.radius,
    };
  }

  function setGeom(g: GeometryResult | null): void {
    const s = slots[activeSlot];
    if (s) s.geom = g;
    refreshOverlay();
    cb.onSlotsChanged();
  }

  /* ---------------- render loop ---------------- */

  function tick(): void {
    if (disposed) return;
    raf = requestAnimationFrame(tick);
    if (flyGoal) {
      orbit.target.lerp(flyGoal, 0.18);
      if (orbit.target.distanceTo(flyGoal) < orbit.radius * 0.001) flyGoal = null;
    }
    applyOrbit();
    updateMarkers();
    renderer.render(scene, camera);
  }

  resize();
  tick();

  return {
    resize,
    resetView,
    installCloud,
    installMesh,
    setActiveSlot,
    frameSlot,
    cycleOrientation,
    getExtractInput,
    setGeom,
    refreshOverlay,
    focusPlane,
    syncSites,
    setMarkMode,
    getSlot: publicSlot,
    getActiveSlot: (): SlotKey => activeSlot,
    isMarkMode: (): boolean => markMode,
    flyTo: (p: Vec3): void => {
      flyGoal = new THREE.Vector3(p.x, p.y, p.z);
    },
    setPlanesVisible: (v: boolean): void => {
      showPlanes = v;
      refreshOverlay();
    },
    planesVisible: (): boolean => showPlanes,
    dispose: (): void => {
      disposed = true;
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', endPointer);
      canvas.removeEventListener('pointercancel', endPointer);
      canvas.removeEventListener('contextmenu', onContextMenu);
      canvas.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', resize);
      clearOverlay();
      markers.forEach((m) => {
        scene.remove(m.mesh);
        m.el.remove();
      });
      markers.clear();
      renderer.dispose();
    },
  };
}

export type Viewer = ReturnType<typeof createViewer>;
