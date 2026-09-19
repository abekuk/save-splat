/* Loading a .glb/.gltf mesh as a point cloud.
 *
 * Scaniverse and Polycam both export mesh as readily as splat, and a mesh is often the
 * better input for this pipeline: no floaters, even coverage, and glTF is metres by
 * specification, so areas and volumes come out genuinely metric instead of in arbitrary
 * scan units. What it does not carry is per-point opacity or covariance, so the extractor
 * falls back to a scene-scale tolerance.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { afterPaint, fmtBytes, fmtInt } from '@/core/util';
import { samplePoints, texturePixels } from './sample';
import type { SampledSource } from './sample';
import type { LoadCallbacks } from '@/core/ply/load';
import type { PlyHeaderInfo, PlyResult } from '@/types';
import { readAll } from '@/core/ply/load';

/** Points to sample per triangle. Five keeps a 78k-triangle scan comfortably dense
 *  without spending the whole budget on a small mesh. */
const PER_TRIANGLE = 5;
const MIN_POINTS = 150000;
const MAX_POINTS = 900000;

export function isMeshFile(name: string): boolean {
  return /\.(glb|gltf)$/i.test(name);
}

/** Compressed meshes need a decoder we do not ship; say so precisely rather than failing
 *  with whatever three throws three frames later. */
function unsupportedExtension(buf: ArrayBuffer): string | null {
  try {
    const head = new Uint8Array(buf, 0, Math.min(buf.byteLength, 1048576));
    const text = new TextDecoder('utf-8', { fatal: false }).decode(head);
    const m = text.match(/"extensionsRequired"\s*:\s*\[([^\]]*)\]/);
    if (!m) return null;
    const req = m[1];
    if (/KHR_draco_mesh_compression/.test(req)) return 'Draco (KHR_draco_mesh_compression)';
    if (/EXT_meshopt_compression/.test(req)) return 'meshopt (EXT_meshopt_compression)';
    return null;
  } catch {
    return null;
  }
}

function collectSources(scene: THREE.Object3D): { sources: SampledSource[]; triangles: number } {
  const sources: SampledSource[] = [];
  let triangles = 0;
  scene.updateMatrixWorld(true);
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!(mesh as { isMesh?: boolean }).isMesh || !mesh.geometry) return;
    const geo = mesh.geometry as THREE.BufferGeometry;
    const pos = geo.getAttribute('position');
    if (!pos) return;
    const uvAttr = geo.getAttribute('uv');
    const colAttr = geo.getAttribute('color');
    const mat = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as
      (THREE.MeshStandardMaterial & { map?: THREE.Texture | null }) | undefined;

    let texture: SampledSource['texture'] = null;
    const img = mat?.map?.image as
      (CanvasImageSource & { width?: number; height?: number }) | undefined;
    if (img) texture = texturePixels(img);

    const base: [number, number, number] = mat?.color
      ? [mat.color.r, mat.color.g, mat.color.b]
      : [0.6, 0.6, 0.6];

    const index = geo.index ? Uint32Array.from(geo.index.array as ArrayLike<number>) : null;
    triangles += index ? index.length / 3 : pos.count / 3;

    sources.push({
      positions: Float32Array.from(pos.array as ArrayLike<number>),
      colors: colAttr ? Float32Array.from(colAttr.array as ArrayLike<number>) : null,
      uvs: uvAttr ? Float32Array.from(uvAttr.array as ArrayLike<number>) : null,
      index,
      matrix: mesh.matrixWorld.clone(),
      texture,
      base,
    });
  });
  return { sources, triangles };
}

export function parseGltf(buf: ArrayBuffer): Promise<{ res: PlyResult; triangles: number }> {
  return new Promise((resolve, reject) => {
    const blocked = unsupportedExtension(buf);
    if (blocked) {
      reject(
        new Error(
          `this file needs ${blocked}, and the decoder for it is not bundled. ` +
            `Re-export without compression, or send the .ply instead.`,
        ),
      );
      return;
    }
    const loader = new GLTFLoader();
    loader.parse(
      buf,
      '',
      (gltf) => {
        try {
          const { sources, triangles } = collectSources(gltf.scene);
          if (!sources.length) {
            reject(new Error('no meshes in this file — it may contain only cameras or lights'));
            return;
          }
          const target = Math.min(
            MAX_POINTS,
            Math.max(MIN_POINTS, Math.round(triangles * PER_TRIANGLE)),
          );
          resolve({ res: samplePoints(sources, target), triangles });
        } catch (err) {
          reject(err instanceof Error ? err : new Error(String(err)));
        }
      },
      (err) => reject(err instanceof Error ? err : new Error('glTF parse failed')),
    );
  });
}

/** Mirrors loadPlyFile: never throws, every failure arrives through onFail. */
export async function loadMeshFile(file: File, cb: LoadCallbacks): Promise<void> {
  cb.onProgress({ phase: 'reading', frac: 0, message: `opening ${fmtBytes(file.size)} …` });

  let buf: ArrayBuffer;
  try {
    buf = await readAll(file, (frac) => {
      cb.onProgress({
        phase: 'reading',
        frac: frac * 0.9,
        message: `mesh · ${fmtBytes(file.size)}  ·  ${Math.round(frac * 100)}%`,
      });
    });
  } catch (err) {
    cb.onFail(err instanceof Error ? err.message : 'the read failed', err);
    return;
  }

  cb.onProgress({ phase: 'parsing', frac: 0.93, message: 'reading the mesh …' });
  await new Promise<void>((r) => afterPaint(r));

  let out: { res: PlyResult; triangles: number };
  try {
    out = await parseGltf(buf);
  } catch (err) {
    cb.onFail(err instanceof Error ? err.message : 'could not read this mesh', err);
    return;
  }

  cb.onProgress({
    phase: 'building',
    frac: 1,
    message: `sampling ${fmtInt(out.res.kept)} points over ${fmtInt(Math.round(out.triangles))} triangles …`,
  });
  await new Promise<void>((r) => afterPaint(r));

  const info: PlyHeaderInfo = {
    count: out.res.kept,
    format: 'gltf',
    splat: false,
    dc: false,
  };
  cb.onDone(out.res, info);
}
