/* Scan units are uncalibrated. Angles and drift ratios are scale-free and hold whatever
 * this is set to; areas and volumes are only metric if it is right. ARKit-derived exports
 * (Scaniverse, Polycam) are usually already 1 unit = 1 m. */

export function mLen(x: number, metresPerUnit: number): number {
  return x * metresPerUnit;
}

export function mArea(x: number, metresPerUnit: number): number {
  return x * metresPerUnit * metresPerUnit;
}

export function mVol(x: number, metresPerUnit: number): number {
  return x * metresPerUnit * metresPerUnit * metresPerUnit;
}
