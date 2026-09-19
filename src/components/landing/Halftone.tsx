import { useEffect, useRef } from 'react';

/*
 * Halftone point field.
 *
 * A surface of revolution sampled on a parametric (u, v) grid and drawn as dots whose
 * radius tracks how dark the surface is under a fixed light. Sampling parametrically
 * rather than on a screen grid is what produces the radial banding and the star where
 * the rings converge at the centre — that structure is the point, not an artefact.
 *
 * The form is a shallow dish: an outer wall, a flat rim, and a paraboloid basin. It is a
 * surface of revolution, so rotating it about Y leaves the silhouette fixed while the dot
 * lattice turns underneath — the shimmer comes free.
 */

interface Sample {
  x: number;
  y: number;
  z: number;
  nx: number;
  ny: number;
  nz: number;
  /** how exposed this point is, 0..1. Stands in for ambient occlusion: the base of the
   *  outer wall sits in contact shadow, the rim is open, the basin is partly enclosed by
   *  its own walls. Computed per segment — deriving it from y alone gives the basin a
   *  negative height, which floods the whole interior black. */
  ao: number;
  /** multiplies dot size. The base of the outer wall sits at full ink and fuses into a
   *  solid black band with a hard bottom edge; fading it lets the form dissolve into
   *  dots the way the silhouette does. */
  fade: number;
}

const R = 1; // outer radius
const RI = 0.88; // inner rim radius
const H = 0.2; // wall height
const D = 0.44; // basin depth
/** world-space dot pitch — the lattice is isotropic, which is what stops the wall
 *  from banding into vertical stripes when rings are denser than the dots around them */
const PITCH = 0.0155;
/** floor on the shading, so unlit faces still carry tone rather than going flat black */
const AMBIENT = 0.34;
/** >1 pushes mid-tones lighter, which is what keeps the basin from filling in */
const GAMMA = 1.55;

/** the profile of the surface of revolution, as a dense polyline in (r, y) with normals */
interface Prof {
  r: number;
  y: number;
  nr: number;
  ny: number;
  ao: number;
  fade: number;
}

function profile(): Prof[] {
  const pts: Prof[] = [];
  const N = 400;
  // outer wall, bottom to rim — darkest where it meets the ground
  for (let i = 0; i <= N * 0.22; i++) {
    const a = i / (N * 0.22);
    // Only the lowest stretch dissolves; above that the wall keeps its full weight, or
    // the whole form goes weightless and reads as a ghost.
    const t = Math.min(1, a / 0.55);
    const f = t * t * (3 - 2 * t);
    pts.push({ r: R, y: H * a, nr: 1, ny: 0, ao: 0.3 + 0.7 * a, fade: 0.22 + 0.78 * f });
  }
  // flat rim — open, but held down a little so the annulus still reads as a band
  for (let i = 1; i <= N * 0.06; i++) {
    const a = i / (N * 0.06);
    pts.push({ r: R - (R - RI) * a, y: H, nr: 0, ny: 1, ao: 0.62, fade: 1 });
  }
  // paraboloid basin, rim down to centre — partly enclosed by its own walls
  for (let i = 1; i <= N * 0.72; i++) {
    const s = 1 - i / (N * 0.72);
    const r = RI * s;
    const y = H - D * (1 - s * s);
    const slope = (2 * D * r) / (RI * RI); // dy/dr
    const L = Math.hypot(slope, 1);
    pts.push({ r, y, nr: -slope / L, ny: 1 / L, ao: 0.7 + 0.3 * s, fade: 1 });
  }
  return pts;
}

function build(pitch: number): Sample[] {
  const prof = profile();
  // cumulative arc length, so rings are spaced evenly over the real surface
  const arc: number[] = [0];
  for (let i = 1; i < prof.length; i++) {
    arc.push(arc[i - 1] + Math.hypot(prof[i].r - prof[i - 1].r, prof[i].y - prof[i - 1].y));
  }
  const total = arc[arc.length - 1];
  const rings = Math.max(2, Math.round(total / pitch));

  const out: Sample[] = [];
  let cursor = 0;
  for (let k = 0; k <= rings; k++) {
    const target = (k / rings) * total;
    while (cursor < arc.length - 1 && arc[cursor + 1] < target) cursor++;
    const p = prof[cursor];

    // dots around the ring at the same pitch, so the lattice stays isotropic
    const count = Math.max(5, Math.round((2 * Math.PI * p.r) / pitch));
    for (let ui = 0; ui < count; ui++) {
      const u = (ui / count) * Math.PI * 2;
      const cu = Math.cos(u);
      const su = Math.sin(u);
      out.push({
        x: p.r * cu,
        y: p.y,
        z: p.r * su,
        nx: p.nr * cu,
        ny: p.ny,
        nz: p.nr * su,
        ao: p.ao,
        fade: p.fade,
      });
    }
  }
  return out;
}

const TILT = 0.62; // camera elevation, radians
/** how far the cursor swings the spin and lifts the elevation */
const SWING = 0.5;
const LIFT = 0.14;

const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
/* Behind and above. A light from the front would flood the basin white; the reference has
   the far interior dark and the near interior bright, which only happens with a back light. */
const LIGHT = (() => {
  const l = [-0.3, 0.81, -0.51];
  const m = Math.hypot(l[0], l[1], l[2]);
  return [l[0] / m, l[1] / m, l[2] / m] as const;
})();

export default function Halftone({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pts = build(PITCH);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let scale = 1;

    /* One scale, held for every frame and sized for the steepest tilt the cursor can
       reach. The dish's projected height grows with elevation — the rim spreads over
       2*R*sin(tilt) — so a scale fitted to the resting angle clips once the camera
       lifts. Refitting per frame cures the clipping but then the object zooms in and
       out as the pointer moves, which is worse than the problem. Fitting once to the
       worst case gives a stable size that never clips.

       No allowance is made for the faded base. The fade shrinks those dots but leaves
       them fully opaque, so they still reach the edge and still clip — measured, after
       trying exactly that shortcut. */
    const MAX_TILT = TILT + LIFT;
    const SPAN_AT_MAX = H * Math.cos(MAX_TILT) + 2 * R * Math.sin(MAX_TILT);

    const resize = (): void => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      // 0.96 leaves room for the dot radius itself, which spills past the geometry
      scale = Math.min((w * 0.96) / (2 * R), (h * 0.96) / SPAN_AT_MAX);
    };
    resize();
    window.addEventListener('resize', resize);

    /* Cursor tracking. Measured against the viewport rather than the canvas, so the
       dish keeps responding when the pointer is nowhere near it, and eased per frame
       so a fast flick glides instead of snapping. */
    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const onMove = (e: PointerEvent): void => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.x = clamp((e.clientX - cx) / (window.innerWidth / 2), -1, 1);
      target.y = clamp((e.clientY - cy) / (window.innerHeight / 2), -1, 1);
    };
    if (!reduced) window.addEventListener('pointermove', onMove);

    const start = performance.now();

    const draw = (now: number): void => {
      eased.x += (target.x - eased.x) * 0.055;
      eased.y += (target.y - eased.y) * 0.055;

      const theta = reduced ? 0.6 : ((now - start) / 1000) * 0.13 + eased.x * SWING;
      const cs = Math.cos(theta);
      const sn = Math.sin(theta);
      const tilt = clamp(TILT - eased.y * LIFT, 0.26, 1.02);
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2 + ((H * cosT) / 2) * scale;
      // let the darkest dots very nearly touch, as a real halftone does
      const maxR = Math.max(0.55, scale * PITCH * 0.6);

      // back to front, so nearer dots sit over farther ones
      const drawn: { sx: number; sy: number; r: number; depth: number }[] = [];

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        // spin about Y
        const x1 = p.x * cs + p.z * sn;
        const z1 = -p.x * sn + p.z * cs;
        const nx1 = p.nx * cs + p.nz * sn;
        const nz1 = -p.nx * sn + p.nz * cs;
        // tilt about X
        const y2 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;
        const ny2 = p.ny * cosT - nz1 * sinT;
        const nz2 = p.ny * sinT + nz1 * cosT;

        if (nz2 <= 0.02) continue; // facing away

        const lam = Math.max(0, nx1 * LIGHT[0] + ny2 * LIGHT[1] + nz2 * LIGHT[2]);
        // pure lambert leaves everything but the highlight solid black; the ambient term
        // is what gives the basin its readable mid-tones
        const shade = AMBIENT + (1 - AMBIENT) * lam;
        const dark = Math.min(1, Math.max(0, 1 - shade * p.ao));
        /* Foreshortening. Toward the silhouette the (u,v) lattice compresses in screen
           space, so dots pile into each other and the rim fuses into a solid black
           crescent. A halftone cell there covers less projected area — area scales with
           |n·view|, so the dot radius scales with its square root. Ink per unit screen
           area then stays put and the edge resolves back into dots. */
        const r = maxR * Math.pow(dark, GAMMA) * Math.sqrt(nz2) * p.fade;
        if (r < 0.1) continue;

        drawn.push({ sx: cx + x1 * scale, sy: cy - y2 * scale, r, depth: z2 });
      }

      drawn.sort((a, b) => a.depth - b.depth);

      // one path, one fill — 10k individual fill() calls will not hold 60fps
      ctx.fillStyle = '#0a0a0a';
      ctx.beginPath();
      for (let i = 0; i < drawn.length; i++) {
        const d = drawn[i];
        ctx.moveTo(d.sx + d.r, d.sy);
        ctx.arc(d.sx, d.sy, d.r, 0, Math.PI * 2);
      }
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
