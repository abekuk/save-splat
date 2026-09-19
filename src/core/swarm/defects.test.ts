import { describe, it, expect } from 'vitest';
import {
  citationCheck,
  parseDefectReport,
  qualityCheck,
  structuralDefects,
  STRUCTURAL_KINDS,
} from './defects';
import type { Defect, DefectReport } from './defects';

const defect = (over: Partial<Defect> = {}): Defect => ({
  kind: 'crack-diagonal',
  where: 'rear wall, upper left',
  severity: 'moderate',
  confidence: 'med',
  views: [0],
  note: 'runs to the ceiling junction',
  ...over,
});
const report = (over: Partial<DefectReport> = {}): DefectReport => ({
  abstain: false,
  capture_quality: 'usable',
  room_type: 'lab',
  defects: [defect()],
  nothing_found_note: '',
  overall: 'concerning',
  views_used: [0, 1],
  self_confidence: 'med',
  ...over,
});

describe('defect taxonomy', () => {
  it('separates structural defects from surface-only ones', () => {
    expect(STRUCTURAL_KINDS.has('crack-diagonal')).toBe(true);
    expect(STRUCTURAL_KINDS.has('crack-stepped')).toBe(true);
    expect(STRUCTURAL_KINDS.has('exposed-reinforcement')).toBe(true);
    // a room can be visually wrecked and structurally fine
    expect(STRUCTURAL_KINDS.has('finish-damage')).toBe(false);
    expect(STRUCTURAL_KINDS.has('crack-map')).toBe(false);
    expect(STRUCTURAL_KINDS.has('water-damage')).toBe(false);
  });

  it('picks out only the structural ones', () => {
    const r = report({
      defects: [defect(), defect({ kind: 'finish-damage' }), defect({ kind: 'crack-map' })],
    });
    expect(structuralDefects(r).map((d) => d.kind)).toEqual(['crack-diagonal']);
  });
});

describe('parseDefectReport', () => {
  it('drops view indices that were never sent', () => {
    const r = parseDefectReport(
      report({ defects: [defect({ views: [0, 9, -1] })], views_used: [0, 5] }),
      4,
    );
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.defects[0].views).toEqual([0]);
      expect(r.value.views_used).toEqual([0]);
    }
  });

  it('caps a runaway defect list rather than rejecting the report', () => {
    const many = Array.from({ length: 40 }, () => defect());
    const r = parseDefectReport(report({ defects: many }), 4);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.defects.length).toBeLessThanOrEqual(12);
  });

  it('rejects an unknown defect kind instead of passing it through', () => {
    const r = parseDefectReport(report({ defects: [{ ...defect(), kind: 'vibes' as never }] }), 4);
    expect(r.ok).toBe(false);
  });
});

describe('self-checks', () => {
  it('fails a defect that cites no view', () => {
    const c = citationCheck(report({ defects: [defect({ views: [] })] }));
    expect(c.ok).toBe(false);
    expect(c.detail).toMatch(/cite no view/);
  });

  it('fails serious claims made off a capture it called unreadable', () => {
    const q = qualityCheck(
      report({ capture_quality: 'unreadable', defects: [defect({ severity: 'serious' })] }),
    );
    expect(q.ok).toBe(false);
    expect(q.detail).toMatch(/still reported/);
  });

  it('allows slight findings on a poor capture', () => {
    expect(
      qualityCheck(report({ capture_quality: 'poor', defects: [defect({ severity: 'slight' })] }))
        .ok,
    ).toBe(true);
  });
});
