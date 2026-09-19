import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { collectPositions, isMeshFile } from './glb';

describe('isMeshFile', () => {
  it('recognises glTF containers and nothing else', () => {
    expect(isMeshFile('scan.glb')).toBe(true);
    expect(isMeshFile('scan.GLTF')).toBe(true);
    expect(isMeshFile('Scaniverse 2026-09-19.ply')).toBe(false);
    expect(isMeshFile('notes.txt')).toBe(false);
  });
});

describe('collectPositions', () => {
  const tri = (): THREE.Mesh =>
    new THREE.Mesh(
      new THREE.BufferGeometry().setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]), 3),
      ),
    );

  it('flattens every mesh in the tree', () => {
    const root = new THREE.Group();
    root.add(tri(), tri());
    const { positions, meshes } = collectPositions(root);
    expect(meshes).toBe(2);
    expect(positions.length).toBe(18); // 2 meshes * 3 verts * xyz
  });

  it('bakes a child transform into the vertices', () => {
    // a scan graph nests meshes under transformed nodes; ignoring those puts every
    // part at the origin on top of each other
    const root = new THREE.Group();
    const node = new THREE.Group();
    node.position.set(10, 0, 0);
    node.scale.setScalar(2);
    node.add(tri());
    root.add(node);

    const { positions } = collectPositions(root);
    expect(Array.from(positions.slice(0, 3))).toEqual([10, 0, 0]);
    expect(Array.from(positions.slice(3, 6))).toEqual([12, 0, 0]); // (1,0,0) scaled x2, offset 10
  });

  it('bakes nested transforms, not just the immediate parent', () => {
    const root = new THREE.Group();
    const outer = new THREE.Group();
    outer.position.set(0, 5, 0);
    const inner = new THREE.Group();
    inner.position.set(0, 0, 3);
    inner.add(tri());
    outer.add(inner);
    root.add(outer);

    const { positions } = collectPositions(root);
    expect(Array.from(positions.slice(0, 3))).toEqual([0, 5, 3]);
  });

  it('skips nodes that carry no geometry', () => {
    const root = new THREE.Group();
    root.add(new THREE.Group(), new THREE.Object3D(), tri());
    const { meshes, positions } = collectPositions(root);
    expect(meshes).toBe(1);
    expect(positions.length).toBe(9);
  });

  it('returns an empty result for a graph with no meshes', () => {
    const { meshes, positions } = collectPositions(new THREE.Group());
    expect(meshes).toBe(0);
    expect(positions.length).toBe(0);
  });
});
