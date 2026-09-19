/* Loading a scan without stalling the tab.
 *
 * A Scaniverse splat export is routinely hundreds of MB. The parse loop is bounded by
 * MAX_POINTS, so the cost that actually stalls the tab is reading the file and holding
 * it in memory — which is what gets progress reporting and a guard here.
 *
 * Progress is reported through a callback rather than written to DOM nodes, so the
 * overlay is an ordinary React component.
 */
import { afterPaint, fmtBytes, fmtInt } from '@/core/util';
import { MAX_POINTS, findHeaderEnd, parsePLY } from './parse';
import type { PlyHeaderInfo, PlyResult } from '@/types';

/** headers are far smaller than this; the slice is deliberately generous */
export const SNIFF_BYTES = 262144;
/** past this a tab is at real risk of an out-of-memory kill */
export const BIG_FILE = 700 * 1048576;

export type LoadPhase = 'reading' | 'parsing' | 'building';

export interface LoadProgress {
  phase: LoadPhase;
  /** 0..1 */
  frac: number;
  message: string;
}

export interface LoadCallbacks {
  onProgress: (p: LoadProgress) => void;
  onDone: (res: PlyResult, info: PlyHeaderInfo) => void;
  onFail: (message: string, err?: unknown) => void;
  /** asked only when the file is larger than BIG_FILE; return false to abort */
  confirmLarge: (message: string) => boolean;
  onCancel: () => void;
}

/** Read enough of the front of the file to say what it is before committing to the whole thing. */
export function sniffPLY(buf: ArrayBuffer): PlyHeaderInfo | null {
  const bytes = new Uint8Array(buf);
  const he = findHeaderEnd(bytes);
  if (!he) return null;
  const text = new TextDecoder('ascii').decode(bytes.subarray(0, he.textEnd));
  const mc = text.match(/element\s+vertex\s+(\d+)/i);
  const mf = text.match(/format\s+(\S+)/i);
  return {
    count: mc ? parseInt(mc[1], 10) || 0 : 0,
    format: mf ? mf[1].toLowerCase() : null,
    splat: /property\s+\S+\s+scale_0/i.test(text) && /property\s+\S+\s+rot_0/i.test(text),
    dc: /property\s+\S+\s+f_dc_0/i.test(text),
  };
}

function readSlice(blob: Blob): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(new Error('the browser refused to read this file'));
    fr.onload = (e) => resolve(e.target!.result as ArrayBuffer);
    fr.readAsArrayBuffer(blob);
  });
}

/** Stream into one pre-allocated buffer. Pre-allocating matters: collecting chunks and
 *  then joining them holds two full copies at once, which on a 500 MB scan is the
 *  difference between a load and a dead tab. */
export function readAll(file: File, onProg: (frac: number) => void): Promise<ArrayBuffer> {
  if (typeof file.stream !== 'function' || typeof ReadableStream === 'undefined') {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = () => reject(new Error('the browser refused to read this file'));
      fr.onprogress = (e) => {
        if (e.lengthComputable) onProg(e.loaded / e.total);
      };
      fr.onload = (e) => resolve(e.target!.result as ArrayBuffer);
      fr.readAsArrayBuffer(file);
    });
  }

  return new Promise((resolve, reject) => {
    let out: Uint8Array;
    try {
      out = new Uint8Array(file.size);
    } catch {
      reject(new Error(`could not reserve ${fmtBytes(file.size)} of memory for this scan`));
      return;
    }
    const reader = file.stream().getReader();
    let got = 0;
    const pump = (): void => {
      reader.read().then(({ done, value }) => {
        if (done) {
          resolve(out.buffer as ArrayBuffer);
          return;
        }
        if (got + value.length > out.length) {
          reject(new Error('the file changed size while it was being read'));
          return;
        }
        out.set(value, got);
        got += value.length;
        onProg(got / file.size);
        pump();
      }, reject);
    };
    pump();
  });
}

/** Full load pipeline: sniff → guard → stream → parse. Never throws; every failure
 *  arrives through onFail so the caller can keep the app alive. */
export async function loadPlyFile(file: File, cb: LoadCallbacks): Promise<void> {
  cb.onProgress({ phase: 'reading', frac: 0, message: 'opening …' });

  let info: PlyHeaderInfo | null;
  try {
    info = sniffPLY(await readSlice(file.slice(0, SNIFF_BYTES)));
  } catch (err) {
    cb.onFail('the browser refused to open this file', err);
    return;
  }
  if (!info) {
    cb.onFail(
      `no "end_header" in the first ${fmtBytes(SNIFF_BYTES)} — this is not a .ply, or it is truncated`,
    );
    return;
  }

  const kind = info.splat
    ? 'gaussian splat, covariance present'
    : info.dc
      ? 'splat, no covariance'
      : 'point cloud';
  const step = info.count ? Math.max(1, Math.ceil(info.count / MAX_POINTS)) : 1;
  const desc =
    `${fmtInt(info.count)} vertices · ${kind}` +
    (step > 1 ? ` · sampling 1:${step}` : ' · no sampling needed');
  cb.onProgress({ phase: 'reading', frac: 0, message: desc });

  if (file.size > BIG_FILE) {
    const ok = cb.confirmLarge(
      `"${file.name}" is ${fmtBytes(file.size)} (${fmtInt(info.count)} vertices).\n\n` +
        `A scan this large can exhaust the tab and kill the page. Rubble samples it down to ` +
        `${fmtInt(MAX_POINTS)} points, but the whole file has to be read in first.\n\nLoad it anyway?`,
    );
    if (!ok) {
      cb.onCancel();
      return;
    }
  }

  let buf: ArrayBuffer;
  try {
    buf = await readAll(file, (frac) => {
      cb.onProgress({
        phase: 'reading',
        frac: frac * 0.9,
        message: `${desc}  ·  ${Math.round(frac * 100)}%`,
      });
    });
  } catch (err) {
    cb.onFail(err instanceof Error ? err.message : 'the read failed', err);
    return;
  }

  cb.onProgress({
    phase: 'parsing',
    frac: 0.93,
    message: `parsing ${fmtInt(info.count)} vertices …`,
  });
  // let the overlay actually paint before the synchronous parse takes the main thread
  await new Promise<void>((r) => afterPaint(r));

  let res: PlyResult;
  try {
    res = parsePLY(buf);
  } catch (err) {
    cb.onFail(err instanceof Error ? err.message : 'parse failed', err);
    return;
  }

  cb.onProgress({ phase: 'building', frac: 1, message: 'building the point cloud …' });
  await new Promise<void>((r) => afterPaint(r));
  cb.onDone(res, info);
}
