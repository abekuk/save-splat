/* Assessing a room. One model call, not five.
 *
 * Verticality is already measured by the extractor, and asking a model to restate a
 * measurement costs money and adds a place for it to be wrong. So the only agent that runs
 * here is the one doing something no measurement can: looking at the surfaces and naming
 * what is wrong with them. Everything else — the condition, the cross-check between the two
 * sources, the confidence — is computed from what they each returned.
 */
import {
  DEFECTS_PROMPT,
  DefectReportWireSchema,
  citationCheck,
  parseDefectReport,
  qualityCheck,
} from '../../src/core/swarm/defects';
import type { DefectReport } from '../../src/core/swarm/defects';
import type { Verdict } from '../../src/core/swarm/proposal';
import { getReasoner } from './providers';
import type { ReasonerImage } from './providers/types';

export interface RoomRunOptions {
  images: string[];
  /** what the planes already say, so the model is not asked to guess at verticality */
  geometryNote?: string | null;
  operatorNote?: string | null;
}

export interface RoomRunResult {
  generated: string;
  model: string;
  views: number;
  report: DefectReport | null;
  verdicts: Verdict[];
  verified: boolean;
  error?: string;
  usage?: { input: number; output: number };
  ms: number;
}

const MAX_VIEWS = 6;

function toImage(src: string): ReasonerImage | null {
  const m = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(src);
  if (m) return { mediaType: m[1], data: m[2] };
  return /^[A-Za-z0-9+/=]+$/.test(src) && src.length > 100
    ? { mediaType: 'image/jpeg', data: src }
    : null;
}

export async function runRoom(opts: RoomRunOptions): Promise<RoomRunResult> {
  const started = Date.now();
  const images = opts.images
    .slice(0, MAX_VIEWS)
    .map(toImage)
    .filter((i): i is ReasonerImage => !!i);
  const base: RoomRunResult = {
    generated: new Date().toISOString(),
    model: '',
    views: images.length,
    report: null,
    verdicts: [],
    verified: false,
    ms: 0,
  };
  if (images.length === 0) {
    return { ...base, error: 'no readable images were supplied', ms: Date.now() - started };
  }

  const reasoner = getReasoner();
  const model = await reasoner.model();

  try {
    const { raw, usage } = await reasoner.complete({
      system: DEFECTS_PROMPT,
      user:
        `${images.length} views of the same room, numbered 0 to ${images.length - 1}, at equal ` +
        `angles around it.` +
        (opts.geometryNote
          ? `\n\nThe plane fit already measured verticality: ${opts.geometryNote}. You do not need ` +
            `to re-measure that — look for what it cannot see.`
          : '') +
        (opts.operatorNote ? `\n\nSurveyor note: ${opts.operatorNote}` : '') +
        `\n\nReport the defects you can see.`,
      schema: DefectReportWireSchema,
      images,
    });

    const parsed = parseDefectReport(raw, images.length);
    if (!parsed.ok) {
      return {
        ...base,
        model: `${reasoner.name}:${model}`,
        error: `rejected the report — ${parsed.error}`,
        usage,
        ms: Date.now() - started,
      };
    }
    const report = parsed.value;
    const cite = citationCheck(report);
    const qual = qualityCheck(report);
    const verdicts: Verdict[] = [
      { check: 'defects cite a view', status: cite.ok ? 'pass' : 'fail', detail: cite.detail },
      {
        check: 'claims match capture quality',
        status: qual.ok ? 'pass' : 'fail',
        detail: qual.detail,
      },
    ];

    return {
      generated: base.generated,
      model: `${reasoner.name}:${model}`,
      views: images.length,
      report,
      verdicts,
      verified: !verdicts.some((v) => v.status === 'fail'),
      usage,
      ms: Date.now() - started,
    };
  } catch (err) {
    return {
      ...base,
      model: `${reasoner.name}:${model}`,
      error: err instanceof Error ? err.message : String(err),
      ms: Date.now() - started,
    };
  }
}
