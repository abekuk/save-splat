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
const GAMMA = 1.72;

/** the profile of the surface of revolution, as a dense polyline in (r, y) with normals */
interface Prof {
  r: number;
  y: number;
  nr: number;
  ny: number;
  ao: number;
}

function profile(): Prof[] {
  const pts: Prof[] = [];
  const N = 400;
  // outer wall, bottom to rim — darkest where it meets the ground
  for (let i = 0; i <= N * 0.22; i++) {
    const a = i / (N * 0.22);
    pts.push({ r: R, y: H * a, nr: 1, ny: 0, ao: 0.22 + 0.78 * a });
  }
  // flat rim — open, but held down a little so the annulus still reads as a band
  for (let i = 1; i <= N * 0.06; i++) {
    const a = i / (N * 0.06);
    pts.push({ r: R - (R - RI) * a, y: H, nr: 0, ny: 1, ao: 0.62 });
  }
  // paraboloid basin, rim down to centre — partly enclosed by its own walls
  for (let i = 1; i <= N * 0.72; i++) {
    const s = 1 - i / (N * 0.72);
    const r = RI * s;
    const y = H - D * (1 - s * s);
    const slope = (2 * D * r) / (RI * RI); // dy/dr
    const L = Math.hypot(slope, 1);
    pts.push({ r, y, nr: -slope / L, ny: 1 / L, ao: 0.7 + 0.3 * s });
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
      });
    }
  }
  return out;
}

const TILT = 0.62; // camera elevation, radians
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

    const resize = (): void => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);
    const start = performance.now();

    const draw = (now: number): void => {
      const theta = reduced ? 0.6 : ((now - start) / 1000) * 0.13;
      const cs = Math.cos(theta);
      const sn = Math.sin(theta);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const scale = Math.min(w / 2.12, h / 1.32);
      const cx = w / 2;
      const cy = h / 2 + scale * 0.12;
      // let the darkest dots very nearly touch, as a real halftone does
      const maxR = Math.max(0.55, scale * PITCH * 0.62);

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
        const r = maxR * Math.pow(dark, GAMMA) * Math.sqrt(nz2);
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
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
