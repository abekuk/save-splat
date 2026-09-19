export function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v));
}

export function clamp01(v: number): number {
  return clamp(v, 0, 1);
}

export function fmtBytes(b: number): string {
  return b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : (b / 1024).toFixed(0) + ' KB';
}

export function fmtInt(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function fmtNum(x: number, dp = 1): string {
  return x.toFixed(dp);
}

/** Run fn only once the browser has actually painted, so a long synchronous parse
 *  never hides behind a progress bar that was never drawn. */
export function afterPaint(fn: () => void): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(fn, 0);
    });
  });
}
