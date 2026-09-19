/* .ply parsing — point clouds and INRIA/Scaniverse gaussian splats.
 * Ported verbatim; only types were added. */
import { clamp01, fmtInt } from '@/core/util';
import type { PlyResult } from '@/types';

interface Prop {
  name: string;
  type: string;
  size: number;
  offset: number;
  order: number;
}

export const MAX_POINTS = 900000;
var C0 = 0.28209479177387814;          // 0.5 * sqrt(1/pi) — SH band-0 constant
var OPACITY_MIN = 0.12;                // post-sigmoid floater cull

const TYPE_SIZE: Record<string, number> = {
  char:1, uchar:1, int8:1, uint8:1,
  short:2, ushort:2, int16:2, uint16:2,
  int:4, uint:4, int32:4, uint32:4, float:4, float32:4,
  double:8, float64:8
};
const IS_BYTE: Record<string, number> = { char:1, uchar:1, int8:1, uint8:1 };

/* Sigma = R S S^T R^T for one Gaussian, stored as the upper triangle [00,01,02,11,12,22].
   scale_* is log-scale and rot_* is a (w,x,y,z) quaternion — the INRIA 3DGS convention that
   Scaniverse and Polycam both follow. If an exporter ever disagrees, the epsilon clamp in the
   extractor bounds the damage rather than letting a wrong tolerance run away. */
export function writeCovariance(
  out: Float32Array, idx: number,
  s0: number, s1: number, s2: number,
  qw: number, qx: number, qy: number, qz: number,
): void {
  var l0 = Math.exp(2 * s0), l1 = Math.exp(2 * s1), l2 = Math.exp(2 * s2);
  if (!isFinite(l0)) l0 = 0; if (!isFinite(l1)) l1 = 0; if (!isFinite(l2)) l2 = 0;
  var nq = Math.sqrt(qw*qw + qx*qx + qy*qy + qz*qz);
  if (!(nq > 1e-12)) { qw = 1; qx = qy = qz = 0; nq = 1; }
  qw /= nq; qx /= nq; qy /= nq; qz /= nq;
  var R00 = 1 - 2*(qy*qy + qz*qz), R01 = 2*(qx*qy - qw*qz),     R02 = 2*(qx*qz + qw*qy);
  var R10 = 2*(qx*qy + qw*qz),     R11 = 1 - 2*(qx*qx + qz*qz), R12 = 2*(qy*qz - qw*qx);
  var R20 = 2*(qx*qz - qw*qy),     R21 = 2*(qy*qz + qw*qx),     R22 = 1 - 2*(qx*qx + qy*qy);
  var o = idx * 6;
  out[o    ] = l0*R00*R00 + l1*R01*R01 + l2*R02*R02;
  out[o + 1] = l0*R00*R10 + l1*R01*R11 + l2*R02*R12;
  out[o + 2] = l0*R00*R20 + l1*R01*R21 + l2*R02*R22;
  out[o + 3] = l0*R10*R10 + l1*R11*R11 + l2*R12*R12;
  out[o + 4] = l0*R10*R20 + l1*R11*R21 + l2*R12*R22;
  out[o + 5] = l0*R20*R20 + l1*R21*R21 + l2*R22*R22;
}

/* byte-by-byte scan for the literal "end_header" + newline; no fixed header length assumed */
export function findHeaderEnd(bytes: Uint8Array): { textEnd: number; dataStart: number } | null {
  var needle = [101,110,100,95,104,101,97,100,101,114];   // "end_header"
  var lim = Math.min(bytes.length, 4194304);              // headers are small; cap the scan at 4 MB
  for (var i = 0; i + needle.length < lim; i++){
    if (bytes[i] !== needle[0]) continue;
    var ok = true;
    for (var j = 1; j < needle.length; j++){ if (bytes[i+j] !== needle[j]){ ok = false; break; } }
    if (!ok) continue;
    var k = i + needle.length;
    if (bytes[k] === 13) k++;                              // tolerate CRLF
    if (bytes[k] === 10) return { textEnd: k + 1, dataStart: k + 1 };
  }
  return null;
}

export function parsePLY(buffer: ArrayBuffer): PlyResult {
  var bytes = new Uint8Array(buffer);
  var he = findHeaderEnd(bytes);
  if (!he) throw new Error('no "end_header" found — this file is not a .ply, or it is truncated');

  var headerText = new TextDecoder('ascii').decode(bytes.subarray(0, he.textEnd));
  var lines = headerText.split(/\r?\n/);
  if (!/^ply\s*$/i.test((lines[0] || '').trim())) throw new Error('missing the "ply" magic line at the top of the file');

  var format: string | null = null, count = 0, props: Prop[] = [], stride = 0,
      inVertex = false, sawVertex = false;
  for (var i = 1; i < lines.length; i++){
    var t = lines[i].trim();
    if (!t) continue;
    var p = t.split(/\s+/);
    if (p[0] === 'format') {
      format = (p[1] || '').toLowerCase();
    } else if (p[0] === 'element') {
      inVertex = (p[1] === 'vertex');
      if (inVertex){ count = parseInt(p[2], 10) || 0; sawVertex = true; }
    } else if (p[0] === 'property' && inVertex) {
      if (p[1] === 'list') continue;                       // skip property list
      var ty = (p[1] || '').toLowerCase(), nm = p[2];
      var sz = TYPE_SIZE[ty];
      if (!sz) throw new Error('unsupported property type "' + p[1] + '" in the vertex element');
      props.push({ name: nm, type: ty, size: sz, offset: stride, order: props.length });
      stride += sz;
    }
  }

  if (!format) throw new Error('header has no "format" line');
  if (format !== 'binary_little_endian' && format !== 'binary_big_endian' && format !== 'ascii')
    throw new Error('unrecognised ply format "' + format + '"');
  if (!sawVertex) throw new Error('no "element vertex" in the header — this looks like a mesh-only or empty .ply');
  if (!count) throw new Error('the header declares 0 vertices');

  var map: Record<string, Prop> = {};
  for (var m = 0; m < props.length; m++) map[props[m].name] = props[m];
  if (!map.x || !map.y || !map.z)
    throw new Error('vertex element has no x/y/z properties — this .ply carries no point coordinates');

  var le = (format !== 'binary_big_endian');
  var ascii = (format === 'ascii');

  var hasDC  = !!(map.f_dc_0 && map.f_dc_1 && map.f_dc_2);
  var rgbSet = (map.red && map.green && map.blue) ? ['red','green','blue']
             : (map.r && map.g && map.b)          ? ['r','g','b'] : null;
  var hasOp  = !!map.opacity;
  var rgbScale = rgbSet && IS_BYTE[map[rgbSet[0]].type] ? (1/255) : 1;

  // scale_* / rot_* give each Gaussian its covariance, which the geometry pass needs to set a
  // per-point plane tolerance. Absent (plain point cloud) the extractor falls back to a global epsilon.
  var hasCov = !!(map.scale_0 && map.scale_1 && map.scale_2 &&
                  map.rot_0 && map.rot_1 && map.rot_2 && map.rot_3);

  var step = Math.max(1, Math.ceil(count / MAX_POINTS));   // stride sampling keeps spatial coverage uniform
  var cap = Math.ceil(count / step);
  var positions = new Float32Array(cap * 3);
  var colors = new Float32Array(cap * 3);
  var alphas = new Float32Array(cap);                      // post-sigmoid opacity, the RANSAC weight
  var cov = hasCov ? new Float32Array(cap * 6) : null;     // upper triangle of Sigma, local frame
  var w = 0;

  function emit(x: number, y: number, z: number, cr: number, cg: number, cb: number, al: number): void {
    var o = w * 3;
    positions[o] = x; positions[o+1] = y; positions[o+2] = z;
    colors[o] = cr; colors[o+1] = cg; colors[o+2] = cb;
    alphas[w] = al;
    w++;
  }

  var culled = 0;

  if (!ascii) {
    var dv = new DataView(buffer);
    function reader(name: string): ((b: number) => number) | null {
      var pr = map[name]; if (!pr) return null;
      var off = pr.offset;
      switch (pr.type){
        case 'float': case 'float32':  return function(b){ return dv.getFloat32(b + off, le); };
        case 'double': case 'float64': return function(b){ return dv.getFloat64(b + off, le); };
        case 'uchar': case 'uint8':    return function(b){ return dv.getUint8(b + off); };
        case 'char': case 'int8':      return function(b){ return dv.getInt8(b + off); };
        case 'ushort': case 'uint16':  return function(b){ return dv.getUint16(b + off, le); };
        case 'short': case 'int16':    return function(b){ return dv.getInt16(b + off, le); };
        case 'uint': case 'uint32':    return function(b){ return dv.getUint32(b + off, le); };
        case 'int': case 'int32':      return function(b){ return dv.getInt32(b + off, le); };
      }
      return null;
    }
    var rx = reader('x'), ry = reader('y'), rz = reader('z');
    var d0 = hasDC ? reader('f_dc_0') : null, d1 = hasDC ? reader('f_dc_1') : null, d2 = hasDC ? reader('f_dc_2') : null;
    var c0 = rgbSet ? reader(rgbSet[0]) : null, c1 = rgbSet ? reader(rgbSet[1]) : null, c2 = rgbSet ? reader(rgbSet[2]) : null;
    var ro = hasOp ? reader('opacity') : null;
    var s0r = hasCov ? reader('scale_0') : null, s1r = hasCov ? reader('scale_1') : null, s2r = hasCov ? reader('scale_2') : null;
    var q0r = hasCov ? reader('rot_0') : null, q1r = hasCov ? reader('rot_1') : null,
        q2r = hasCov ? reader('rot_2') : null, q3r = hasCov ? reader('rot_3') : null;
    var base0 = he.dataStart;

    for (var v = 0; v < count; v += step){
      var base = base0 + v * stride;
      if (base + stride > buffer.byteLength) break;         // bounds check inside the read loop
      var al = 1;
      if (hasOp){
        al = 1 / (1 + Math.exp(-ro!(base)));                 // opacity is stored pre-sigmoid
        if (al < OPACITY_MIN){ culled++; continue; }        // floater filter
      }
      var cr = 0.6, cg = 0.6, cb = 0.6;                     // fall back to flat grey when no colour exists
      if (hasDC){
        cr = clamp01(0.5 + C0 * d0!(base));
        cg = clamp01(0.5 + C0 * d1!(base));
        cb = clamp01(0.5 + C0 * d2!(base));
      } else if (rgbSet){
        cr = clamp01(c0!(base) * rgbScale);
        cg = clamp01(c1!(base) * rgbScale);
        cb = clamp01(c2!(base) * rgbScale);
      }
      if (hasCov) writeCovariance(cov!, w, s0r!(base), s1r!(base), s2r!(base),
                                  q0r!(base), q1r!(base), q2r!(base), q3r!(base));
      emit(rx!(base), ry!(base), rz!(base), cr, cg, cb, al);
    }
  } else {
    // ASCII bodies are rare for splat exports; parsed the simple way.
    var body = new TextDecoder('utf-8').decode(bytes.subarray(he.dataStart));
    var rows = body.split('\n');
    var ix = map.x.order, iy = map.y.order, iz = map.z.order;
    var seen = 0;
    for (var li = 0; li < rows.length && seen < count; li++){
      var line = rows[li].trim();
      if (!line) continue;
      var idx = seen++;
      if (idx % step !== 0) continue;
      var tk = line.split(/\s+/);
      if (tk.length < props.length) continue;
      var aal = 1;
      if (hasOp){
        aal = 1 / (1 + Math.exp(-parseFloat(tk[map.opacity.order])));
        if (aal < OPACITY_MIN){ culled++; continue; }
      }
      var ar = 0.6, ag = 0.6, ab = 0.6;
      if (hasDC){
        ar = clamp01(0.5 + C0 * parseFloat(tk[map.f_dc_0.order]));
        ag = clamp01(0.5 + C0 * parseFloat(tk[map.f_dc_1.order]));
        ab = clamp01(0.5 + C0 * parseFloat(tk[map.f_dc_2.order]));
      } else if (rgbSet){
        ar = clamp01(parseFloat(tk[map[rgbSet[0]].order]) * rgbScale);
        ag = clamp01(parseFloat(tk[map[rgbSet[1]].order]) * rgbScale);
        ab = clamp01(parseFloat(tk[map[rgbSet[2]].order]) * rgbScale);
      }
      if (hasCov) writeCovariance(cov!, w,
        parseFloat(tk[map.scale_0.order]), parseFloat(tk[map.scale_1.order]), parseFloat(tk[map.scale_2.order]),
        parseFloat(tk[map.rot_0.order]), parseFloat(tk[map.rot_1.order]),
        parseFloat(tk[map.rot_2.order]), parseFloat(tk[map.rot_3.order]));
      emit(parseFloat(tk[ix]), parseFloat(tk[iy]), parseFloat(tk[iz]), ar, ag, ab, aal);
    }
  }

  if (w === 0)
    throw new Error('every point was rejected — all ' + fmtInt(count) +
                    ' gaussians fell below the opacity floor, or the vertex data is unreadable');

  return {
    positions: positions.subarray(0, w * 3),
    colors: colors.subarray(0, w * 3),
    alphas: alphas.subarray(0, w),
    cov: cov ? cov.subarray(0, w * 6) : null,
    total: count, kept: w, step: step, culled: culled,
    colorSource: hasDC ? 'SH dc' : (rgbSet ? 'rgb' : 'flat grey'),
    format: format
  };
}
