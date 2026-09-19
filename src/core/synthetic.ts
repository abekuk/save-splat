/* The on-stage safety net: a synthetic rubble field so the app is never a blank screen.
 * Generated Y-up, so it skips orientation detection. */
import * as THREE from 'three';
import { clamp01 } from '@/core/util';
import type { PlyResult } from '@/types';

export function makeSynthetic(): PlyResult {
  var SLAB_N = 14000, WALL_N = 12000, DEBRIS_N = 32000;
  var TOTAL = SLAB_N * 6 + WALL_N * 2 + DEBRIS_N;         // ~140k
  var positions = new Float32Array(TOTAL * 3);
  var colors = new Float32Array(TOTAL * 3);
  var w = 0;

  function put(x: number, y: number, z: number, r: number, g: number, b: number): void {
    var o = w * 3;
    positions[o] = x; positions[o+1] = y; positions[o+2] = z;
    colors[o] = r; colors[o+1] = g; colors[o+2] = b;
    w++;
  }
  function tint(base: number[], jit: number): number[] {
    var k = 0.72 + Math.random() * 0.5;
    return [clamp01(base[0] * k + jit * (Math.random()-0.5)),
            clamp01(base[1] * k + jit * (Math.random()-0.5)),
            clamp01(base[2] * k + jit * (Math.random()-0.5))];
  }

  var v = new THREE.Vector3(), e = new THREE.Euler();
  // Darkened for the light viewer background. These were picked against a near-black
  // canvas; at the original values the fallback scene washes out on a light ground, and
  // this scene is the one that has to survive being shown on a projector.
  var CONCRETE = [0.30, 0.28, 0.26], DUST = [0.34, 0.30, 0.24], WALLC = [0.24, 0.22, 0.20];

  // six overlapping thin slabs at varied rotations and heights — collapsed floor plates
  var slabs = [
    { p:[ 0.0, 0.3,  0.0], s:[17, 0.30, 13], r:[ 0.05,  0.10, -0.03] },
    { p:[ 1.4, 1.5, -1.0], s:[14, 0.26, 11], r:[-0.14,  0.55,  0.09] },
    { p:[-2.2, 2.6,  1.6], s:[12, 0.24, 10], r:[ 0.22, -0.35, -0.12] },
    { p:[ 2.8, 3.6,  2.2], s:[10, 0.22,  9], r:[-0.30,  0.95,  0.20] },
    { p:[-1.0, 4.6, -2.4], s:[ 9, 0.20,  8], r:[ 0.38,  0.20, -0.26] },
    { p:[ 0.6, 5.6,  0.8], s:[ 7, 0.18,  6], r:[-0.10, -0.80,  0.34] }
  ];
  for (var si = 0; si < slabs.length; si++){
    var S = slabs[si];
    e.set(S.r[0], S.r[1], S.r[2]);
    for (var i = 0; i < SLAB_N; i++){
      v.set((Math.random()-0.5) * S.s[0], (Math.random()-0.5) * S.s[1], (Math.random()-0.5) * S.s[2]);
      v.applyEuler(e);
      var c = tint(CONCRETE, 0.06);
      put(v.x + S.p[0], v.y + S.p[1], v.z + S.p[2], c[0], c[1], c[2]);
    }
  }

  // two box-ish volumes — partial walls still standing
  var walls = [
    { p:[-7.5, 2.8, -4.0], s:[1.0, 5.6, 8.0], r: 0.18 },
    { p:[ 6.8, 2.2,  4.6], s:[7.0, 4.4, 0.9], r:-0.11 }
  ];
  for (var wi = 0; wi < walls.length; wi++){
    var W = walls[wi];
    e.set(0, W.r, W.r * 0.5);
    // Points land on the shell, and each face is sampled in proportion to its area — a scan
    // samples a big wall face far more densely than a narrow return, and equal-per-face
    // sampling left the large faces too sparse to measure.
    var fa = [ W.s[1]*W.s[2], W.s[1]*W.s[2],      // -x, +x
               W.s[0]*W.s[1], W.s[0]*W.s[1],      // -z, +z
               W.s[0]*W.s[2] ];                    // broken top
    var cum = [], tot = 0;
    for (var fi = 0; fi < 5; fi++){ tot += fa[fi]; cum[fi] = tot; }
    for (var k = 0; k < WALL_N; k++){
      var pick = Math.random() * tot, face = 0;
      while (face < 4 && cum[face] < pick) face++;
      var lx = (Math.random()-0.5) * W.s[0], ly = (Math.random()-0.5) * W.s[1], lz = (Math.random()-0.5) * W.s[2];
      if (face === 0)      lx = -0.5 * W.s[0];
      else if (face === 1) lx =  0.5 * W.s[0];
      else if (face === 2) lz = -0.5 * W.s[2];
      else if (face === 3) lz =  0.5 * W.s[2];
      else                 ly =  0.5 * W.s[1] * (0.8 + Math.random() * 0.2);   // broken top edge
      v.set(lx, ly, lz).applyEuler(e);
      var cw = tint(WALLC, 0.05);
      put(v.x + W.p[0], v.y + W.p[1], v.z + W.p[2], cw[0], cw[1], cw[2]);
    }
  }

  // radial scatter of debris across the ground
  for (var d = 0; d < DEBRIS_N; d++){
    var rr = Math.pow(Math.random(), 0.6) * 15.5;
    var a = Math.random() * Math.PI * 2;
    var yy = Math.abs(Math.random() * Math.random()) * 1.7 - 0.15;
    var cd = tint(DUST, 0.07);
    put(Math.cos(a) * rr + (Math.random()-0.5) * 0.6, yy, Math.sin(a) * rr + (Math.random()-0.5) * 0.6,
        cd[0], cd[1], cd[2]);
  }

  var unit = new Float32Array(w);
  unit.fill(1);                                    // no opacity channel: every point weighs the same
  return {
    positions: positions.subarray(0, w * 3),
    colors: colors.subarray(0, w * 3),
    alphas: unit, cov: null,
    // the generator's own parameters, so the plane extractor can be checked against known answers
    truth: { slabs: slabs, walls: walls },
    total: w, kept: w, step: 1, culled: 0, colorSource: 'procedural', format: 'synthetic'
  };
}
