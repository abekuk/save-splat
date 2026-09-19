import { describe, expect, it } from 'vitest';
import { extractGeometry, wellSupported } from './extract';
import type { ExtractInput } from './extract';
import type { GeometryResult } from '@/types';

/** Deterministic LCG so the fixture is identical on every run. */
function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * A floor at y = 0 and a wall leaning 3% out of plumb.
 * The wall lies on z = 2 + 0.03y, so its normal is (0, -0.03, 1) normalised and the
 * drift ratio the extractor should recover is tan(asin(0.03/|n|)) ≈ 0.030 — SEVERE.
 */
function scene(): ExtractInput {
  const rnd = lcg(12345);
  const pts: number[] = [];
  for (let i = 0; i < 9000; i++) {
    const x = -4 + rnd() * 8;
    const y = rnd() * 3;
    pts.push(x, y, 2 + y * 0.03 + (rnd() - 0.5) * 0.004);
  }
  for (let i = 0; i < 9000; i++) {
    const x = -4 + rnd() * 8;
    const z = -3 + rnd() * 6;
    pts.push(x, (rnd() - 0.5) * 0.004, z);
  }
  const positions = new Float32Array(pts);
  return {
    positions,
    alphas: new Float32Array(positions.length / 3).fill(1),
    cov: null,
    // identity, column-major (three.js Matrix4.elements order)
    matrixWorld: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    radius: 5,
  };
}

function run(input: ExtractInput): Promise<GeometryResult> {
  return new Promise((resolve, reject) => {
    extractGeometry(input, () => {}, resolve, reject);
  });
}

describe('extractGeometry', () => {
  it('recovers a wall at its known drift ratio', async () => {
    const g = await run(scene());
    const walls = wellSupported(g.planes.filter((p) => p.cls === 'wall'));
    expect(walls.length).toBeGreaterThanOrEqual(1);
    const worst = walls.reduce((a, b) => ((b.drift ?? 0) > (a.drift ?? 0) ? b : a));
    expect(worst.drift).toBeCloseTo(0.03, 2);
    expect(worst.band?.name).toBe('SEVERE');
  });

  it('classifies the floor as a slab, near level', () => {
    return run(scene()).then((g) => {
      const slabs = g.planes.filter((p) => p.cls === 'slab');
      expect(slabs.length).toBeGreaterThanOrEqual(1);
      const flattest = slabs.reduce((a, b) => (b.tilt < a.tilt ? b : a));
      expect((flattest.tilt * 180) / Math.PI).toBeLessThan(1);
    });
  });

  it('is deterministic — a re-run gives identical planes', async () => {
    const a = await run(scene());
    const b = await run(scene());
    expect(JSON.stringify(a.planes)).toBe(JSON.stringify(b.planes));
  });

  it('assigns most of the cloud, leaving a small residual', async () => {
    const g = await run(scene());
    expect(g.residualFrac).toBeLessThan(0.35);
    expect(g.usedCovariance).toBe(false);
  });

  it('fails cleanly on a cloud too small to fit anything', async () => {
    const tiny: ExtractInput = {
      positions: new Float32Array([0, 0, 0, 1, 1, 1]),
      alphas: new Float32Array(2).fill(1),
      cov: null,
      matrixWorld: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      radius: 1,
    };
    await expect(run(tiny)).rejects.toThrow(/too few/);
  });
});

describe('wellSupported', () => {
  it('drops slivers that would otherwise set the headline drift', async () => {
    const g = await run(scene());
    const all = g.planes.filter((p) => p.cls === 'wall');
    expect(wellSupported(all).length).toBeLessThanOrEqual(all.length);
    expect(wellSupported(all).every((p) => p.support >= 0.01 && p.fill >= 0.25)).toBe(true);
  });
});
