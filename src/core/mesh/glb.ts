/* GLB / glTF loading.
 *
 * Scaniverse's realistic view is a texture-mapped mesh, and a `.ply` export throws both the
 * faces and the texture away. Loading the GLB instead is what gets that view into the app.
 *
 * Two decisions worth stating:
 *
 * 1. Materials are replaced with unlit `MeshBasicMaterial`. The scene has no lights — it was
 *    built for point clouds and unlit marker meshes — so a `MeshStandardMaterial` would render
 *    solid black. Unlit is also the *correct* choice for photogrammetry: the texture already
 *    has the real lighting baked into it, and relighting it would double it up.
 *
 * 2. Vertex positions are collected into one flat array in the root's local space, so the
 *    geometry extractor can run on a mesh exactly as it runs on a point cloud. It fits planes
 *    to vertices and never needs to know faces exist.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface GlbResult {
  root: THREE.Object3D;
  /** every mesh vertex, flattened xyz, in root-local space */
  positions: Float32Array;
  vertices: number;
  meshes: number;
  textured: boolean;
}

/** Flatten every mesh's vertices into one array, baked into the root's space.
 *  Exported for testing: it is the part that can silently produce a mis-scaled or
 *  mis-placed cloud, and it does not need a real GLB to exercise. */
export function collectPositions(root: THREE.Object3D): {
  positions: Float32Array;
  meshes: number;
} {
  root.updateMatrixWorld(true);
  const parts: { attr: THREE.BufferAttribute; matrix: THREE.Matrix4 }[] = [];
  let total = 0;
  let meshes = 0;

  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh || !mesh.geometry) return;
    const attr = mesh.geometry.getAttribute('position') as THREE.BufferAttribute | undefined;
    if (!attr) return;
    meshes++;
    total += attr.count;
    parts.push({ attr, matrix: mesh.matrixWorld.clone() });
  });

  const positions = new Float32Array(total * 3);
  const v = new THREE.Vector3();
  let w = 0;
  for (const { attr, matrix } of parts) {
    for (let i = 0; i < attr.count; i++) {
      v.fromBufferAttribute(attr, i).applyMatrix4(matrix);
      positions[w++] = v.x;
      positions[w++] = v.y;
      positions[w++] = v.z;
    }
  }
  return { positions, meshes };
}

/** Swap lit materials for unlit ones, keeping the texture. See the note at the top. */
function makeUnlit(root: THREE.Object3D): boolean {
  let textured = false;
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh || !mesh.material) return;
    const src = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as
      | THREE.MeshStandardMaterial
      | THREE.MeshBasicMaterial;
    const map = (src as THREE.MeshStandardMaterial).map ?? null;
    if (map) textured = true;
    const flat = new THREE.MeshBasicMaterial({
      map,
      // scan meshes routinely have inconsistent winding; a single-sided material
      // punches holes through the model wherever a triangle faces away
      side: THREE.DoubleSide,
      vertexColors: !!mesh.geometry.getAttribute('color'),
    });
    if (!map && !flat.vertexColors) flat.color.setHex(0x9aa0a6);
    mesh.material = flat;
    if (Array.isArray(src)) src.forEach((m) => m.dispose());
    else src.dispose();
  });
  return textured;
}

export function parseGlb(buf: ArrayBuffer): Promise<GlbResult> {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.parse(
      buf,
      '',
      (gltf) => {
        const root = gltf.scene;
        const textured = makeUnlit(root);
        const { positions, meshes } = collectPositions(root);
        if (!meshes || positions.length === 0) {
          reject(new Error('this glTF contains no mesh geometry'));
          return;
        }
        resolve({ root, positions, vertices: positions.length / 3, meshes, textured });
      },
      (err) => reject(err instanceof Error ? err : new Error(String(err))),
    );
  });
}

export function isMeshFile(name: string): boolean {
  return /\.(glb|gltf)$/i.test(name);
}
