import { describe, it, expect } from 'vitest';
import { buildCondition, fromDefects, fromGeometry } from './condition';
import type { Defect, DefectReport } from './defects';

const defect = (over: Partial<Defect> = {}): Defect => ({
  kind: 'crack-diagonal',
  where: 'rear wall',
  severity: 'moderate',
  confidence: 'high',
  views: [0],
  note: '',
  ...over,
});
const report = (over: Partial<DefectReport> = {}): DefectReport => ({
  abstain: false,
  capture_quality: 'good',
  room_type: 'lab',
  defects: [],
  nothing_found_note: 'nothing visible',
  overall: 'none',
  views_used: [0],
  self_confidence: 'high',
  ...over,
});

describe('condition', () => {
  it('maps the geometry verdict onto the shared scale', () => {
    expect(fromGeometry('severe')).toBe('serious');
    expect(fromGeometry('moderate')).toBe('concerning');
    expect(fromGeometry('sound')).toBe('sound');
    expect(fromGeometry('unknown')).toBe('unknown');
  });

  it('never reads surface-only damage above cosmetic, however much of it there is', () => {
    const surface = report({
      defects: [
        defect({ kind: 'finish-damage', severity: 'serious' }),
        defect({ kind: 'crack-map', severity: 'serious' }),
        defect({ kind: 'water-damage', severity: 'serious' }),
      ],
    });
    expect(fromDefects(surface)).toBe('cosmetic');
  });

  it('takes the worse of the two sources, because they see different things', () => {
    // planes measure plumb, but the views show serious structural cracking
    const c = buildCondition(
      'sound',
      'walls are plumb',
      report({
        defects: [defect({ severity: 'serious' })],
        overall: 'serious',
      }),
    );
    expect(c.level).toBe('serious');
  });

  it('reports a disagreement rather than averaging it away', () => {
    const c = buildCondition(
      'sound',
      'walls are plumb',
      report({
        defects: [defect({ severity: 'serious' })],
        overall: 'serious',
      }),
    );
    expect(c.conflict).toBeTruthy();
    expect(c.conflict).toMatch(/does not need a wall to be out of plumb/);
  });

  it('keeps the geometry reading when the views find nothing', () => {
    const c = buildCondition('severe', 'W1 is 3° off plumb', report());
    expect(c.level).toBe('serious');
  });

  it('says it cannot judge when neither source has anything', () => {
    const c = buildCondition('unknown', 'no walls measured', report({ abstain: true }));
    expect(c.level).toBe('unknown');
    expect(c.detail).toMatch(/denser capture/);
  });

  it('treats an abstaining defect agent as unknown, not as clean', () => {
    expect(fromDefects(report({ abstain: true }))).toBe('unknown');
    expect(fromDefects(report({ overall: 'unclear' }))).toBe('unknown');
    expect(fromDefects(null)).toBe('unknown');
  });
});
