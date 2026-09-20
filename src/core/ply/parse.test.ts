import { describe, expect, it } from 'vitest';
import { findHeaderEnd, parsePLY } from './parse';

/** Build a binary little-endian .ply in memory: x,y,z float + rgb uchar. */
function makePly(points: [number, number, number, number, number, number][]): ArrayBuffer {
  const header =
    'ply\nformat binary_little_endian 1.0\n' +
    `element vertex ${points.length}\n` +
    'property float x\nproperty float y\nproperty float z\n' +
    'property uchar red\nproperty uchar green\nproperty uchar blue\n' +
    'end_header\n';
  const head = new TextEncoder().encode(header);
  const stride = 15;
  const buf = new ArrayBuffer(head.length + points.length * stride);
  const u8 = new Uint8Array(buf);
  u8.set(head, 0);
  const dv = new DataView(buf);
  points.forEach((p, i) => {
    const o = head.length + i * stride;
    dv.setFloat32(o, p[0], true);
    dv.setFloat32(o + 4, p[1], true);
    dv.setFloat32(o + 8, p[2], true);
    dv.setUint8(o + 12, p[3]);
    dv.setUint8(o + 13, p[4]);
    dv.setUint8(o + 14, p[5]);
  });
  return buf;
}

describe('findHeaderEnd', () => {
  it('locates end_header without assuming a fixed header length', () => {
    const buf = makePly([[0, 0, 0, 255, 0, 0]]);
    const he = findHeaderEnd(new Uint8Array(buf));
    expect(he).not.toBeNull();
  });

  it('returns null when there is no header at all', () => {
    expect(findHeaderEnd(new TextEncoder().encode('not a ply'))).toBeNull();
  });
});

describe('parsePLY', () => {
  it('reads coordinates and 8-bit colour', () => {
    const res = parsePLY(makePly([[1, 2, 3, 255, 0, 128]]));
    expect(res.kept).toBe(1);
    expect(res.total).toBe(1);
    expect(res.colorSource).toBe('rgb');
    expect(Array.from(res.positions)).toEqual([1, 2, 3]);
    expect(res.colors[0]).toBeCloseTo(1, 5);
    expect(res.colors[1]).toBeCloseTo(0, 5);
    expect(res.colors[2]).toBeCloseTo(128 / 255, 5);
  });

  it('reports no covariance for a plain point cloud', () => {
    const res = parsePLY(makePly([[0, 0, 0, 1, 1, 1]]));
    expect(res.cov).toBeNull();
  });

  it('throws a readable error on a file that is not a .ply', () => {
    const buf = new TextEncoder().encode('definitely not a ply file').buffer as ArrayBuffer;
    expect(() => parsePLY(buf)).toThrow(/end_header/);
  });

  it('throws when the header declares no vertex element', () => {
    const header = 'ply\nformat binary_little_endian 1.0\nelement face 3\nend_header\n';
    const buf = new TextEncoder().encode(header).buffer as ArrayBuffer;
    expect(() => parsePLY(buf)).toThrow(/mesh-only|element vertex/i);
  });

  it('rejects a truncated binary vertex body', () => {
    const complete = makePly([
      [0, 0, 0, 255, 0, 0],
      [1, 1, 1, 0, 255, 0],
    ]);
    const truncated = complete.slice(0, complete.byteLength - 15);
    expect(() => parsePLY(truncated)).toThrow(/truncated binary PLY/i);
  });

  it('rejects a truncated ASCII vertex body', () => {
    const text =
      'ply\nformat ascii 1.0\nelement vertex 2\n' +
      'property float x\nproperty float y\nproperty float z\nend_header\n0 0 0\n';
    const buf = new TextEncoder().encode(text).buffer as ArrayBuffer;
    expect(() => parsePLY(buf)).toThrow(/truncated ASCII PLY/i);
  });
});
