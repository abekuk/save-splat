/* Runs the vision agent. Server-side for the same reason as the rest: the key stays in Node. */
import {
  VISION_PROMPT,
  VisionWireSchema,
  claimsHeadcount,
  damageAgreement,
  parseVisionReport,
} from '../../src/core/swarm/vision';
import type { VisionReport } from '../../src/core/swarm/vision';
import type { Verdict } from '../../src/core/swarm/proposal';
import { getReasoner } from './providers';
import type { ReasonerImage } from './providers/types';

export interface VisionRunOptions {
  /** data: URLs or bare base64 */
  images: string[];
  /** the geometry layer's own reading, for the cross-modal check */
  geometryLevel?: 'unknown' | 'sound' | 'minor' | 'moderate' | 'severe';
  sceneNote?: string | null;
}

export interface VisionRunResult {
  generated: string;
  model: string;
  views: number;
  report: VisionReport | null;
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
  if (/^[A-Za-z0-9+/=]+$/.test(src) && src.length > 100) {
    return { mediaType: 'image/jpeg', data: src };
  }
  return null;
}

export async function runVision(opts: VisionRunOptions): Promise<VisionRunResult> {
  const started = Date.now();
  const images = opts.images
    .slice(0, MAX_VIEWS)
    .map(toImage)
    .filter((i): i is ReasonerImage => !!i);
  const base: VisionRunResult = {
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
      system: VISION_PROMPT,
      user:
        `${images.length} views of the same scan, numbered 0 to ${images.length - 1}, taken at ` +
        `equal angles around it.` +
        (opts.sceneNote ? `\n\nOperator note about this site: ${opts.sceneNote}` : '') +
        `\n\nReport what you can see.`,
      schema: VisionWireSchema,
      images,
    });

    const parsed = parseVisionReport(raw, images.length);
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
    const verdicts: Verdict[] = [];

    verdicts.push(
      report.views_used.length > 0 || report.abstain
        ? {
            check: 'views cited',
            status: 'pass',
            detail: report.abstain ? 'abstained' : `read views ${report.views_used.join(', ')}`,
          }
        : {
            check: 'views cited',
            status: 'fail',
            detail: 'reported findings without naming a view it read',
          },
    );

    const head = claimsHeadcount(report);
    verdicts.push(
      head
        ? {
            check: 'no headcount',
            status: 'fail',
            detail: `estimated occupancy from imagery ("${head}") — that is not inferable from a scan`,
          }
        : {
            check: 'no headcount',
            status: 'pass',
            detail: 'reported what is visible without inferring a headcount',
          },
    );

    if (!report.abstain) {
      const a = damageAgreement(report.damage_read, opts.geometryLevel ?? 'unknown');
      verdicts.push({ check: 'agrees with geometry', ...a });
    }

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
