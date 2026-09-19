/* Domain types shared across the app.
   Site is deliberately plain serializable data: the old single-file build hung the
   three.js marker mesh and its DOM label off each site record, which made the list
   impossible to export or diff. The viewer now owns those handles, keyed by site id. */

export type CollapseType = 'pancake' | 'mixed' | 'lean';
export type Confidence = 'low' | 'med' | 'high';
export type SlotKey = 'A' | 'B';
export type PlaneClass = 'wall' | 'slab' | 'incline';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Site {
  id: number;
  name: string;
  pos: Vec3;
  /** persons believed inside — operator estimate, not derived from geometry */
  n: number;
  /** P(trapped alive) */
  q: number;
  /** P(extraction) */
  r: number;
  /** crew-hours */
  tau: number;
  type: CollapseType;
  /** evidence-quality flag for the operator; deliberately absent from rho */
  conf: Confidence;
}

export interface DriftBand {
  name: string;
  hex: number;
  css: string;
}

export interface Plane {
  id: number;
  label: string;
  /** unit normal */
  n: [number, number, number];
  d: number;
  centroid: [number, number, number];
  /** in-plane basis */
  u: [number, number, number];
  v: [number, number, number];
  umin: number;
  umax: number;
  vmin: number;
  vmax: number;
  count: number;
  weight: number;
  support: number;
  area: number;
  bboxArea: number;
  fill: number;
  rms: number;
  cls: PlaneClass;
  /** radians; from plumb for walls, from level for slabs/inclines */
  tilt: number;
  /** tan(tilt) — the drift ratio engineers use. Walls only. */
  drift: number | null;
  band: DriftBand | null;
  /** points absorbed from later fits of the same physical surface; set only on dedup */
  claimed?: number;
}

export interface DebrisCluster {
  /** 1-based rank by volume, assigned after sorting */
  id: number;
  volume: number;
  footprint: number;
  maxHeight: number;
  /** [x, groundY, z] */
  centre: number[];
  cells: number;
}

export interface DebrisField {
  groundY: number;
  groundPlane: string | null;
  clusters: DebrisCluster[];
  totalVolume: number;
  cell: number;
}

export interface GeometryResult {
  planes: Plane[];
  debris: DebrisField;
  workingSet: number;
  sampleStep: number;
  radius: number;
  usedCovariance: boolean;
  totalWeight: number;
  /** fits discarded because their patch was too diffuse to represent as a surface */
  droppedDiffuse: number;
  residualPoints: number;
  residualFrac: number;
  ms: number;
}

export interface PlyResult {
  positions: Float32Array;
  colors: Float32Array;
  alphas: Float32Array;
  /** upper triangle of Sigma per point, local frame; null for plain point clouds */
  cov: Float32Array | null;
  total: number;
  kept: number;
  step: number;
  culled: number;
  colorSource: string;
  format: string;
  /** only the synthetic generator sets this: its own parameters, so the plane
   *  extractor can be checked against known answers */
  truth?: { slabs: unknown[]; walls: unknown[] } | null;
}

export interface PlyHeaderInfo {
  count: number;
  format: string | null;
  /** has scale_* and rot_*, so per-Gaussian covariance is available */
  splat: boolean;
  /** has f_dc_* spherical-harmonic colour */
  dc: boolean;
}

export interface Orientation {
  name: string;
  rx: number;
}

export interface Slot {
  /** a sampled point cloud, or a glTF mesh */
  kind: 'points' | 'mesh';
  name: string;
  kept: number;
  total: number;
  orient: Orientation;
  hasCov: boolean;
  radius: number;
  auto: boolean;
  geom: GeometryResult | null;
}

export type GeoStage = 'idle' | 'prep' | 'ransac' | 'debris' | 'done' | 'failed';
