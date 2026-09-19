/* A deliberately small external store.
 *
 * The app has one writer (the App shell) and a handful of readers, so useSyncExternalStore
 * over a frozen object beats pulling in a state library. Sites live here; their three.js
 * meshes live in the viewer, reconciled by id.
 */
import { useSyncExternalStore } from 'react';
import { DEFAULTS } from '@/core/ranking';
import type { LoadProgress } from '@/core/ply/load';
import type { OverrideEntry, Proposal } from '@/core/swarm/agents';
import type { SwarmRunResult } from '@/core/swarm/proposal';
import type { GeoStage, Site, Vec3 } from '@/types';

export type TabKey = 'queue' | 'assess' | 'geo' | 'swarm' | 'model';

export interface AppState {
  sites: Site[];
  selectedId: number | null;
  selectedPlane: number;
  tab: TabKey;
  status: string;
  hint: string;
  metresPerUnit: number;
  markMode: boolean;
  planesVisible: boolean;
  loading: LoadProgress | null;
  loadFile: string;
  geoStage: GeoStage;
  geoProgress: { planes: number; stage: string; frac: number } | null;
  proposals: Partial<Record<string, Proposal>>;
  /** last swarm run, plus the operator notes that fed it and whether a reasoner is reachable */
  swarm: {
    run: SwarmRunResult | null;
    busy: boolean;
    notes: string;
    status: { configured: boolean; provider?: string | null; model: string; effort: string; error?: string } | null;
  };
  overrideLog: OverrideEntry[];
  /** bumped whenever viewer-owned slot state changes, to re-render readers of it */
  slotsVersion: number;
}

let nextId = 1;
let nameSeq = 0;

let state: AppState = {
  sites: [],
  selectedId: null,
  selectedPlane: -1,
  tab: 'queue',
  status: 'ready — LOAD .PLY (or drop one here), or click SYNTHETIC SCENE',
  hint: '',
  metresPerUnit: 1,
  markMode: false,
  planesVisible: true,
  loading: null,
  loadFile: '',
  geoStage: 'idle',
  geoProgress: null,
  proposals: {},
  swarm: { run: null, busy: false, notes: '', status: null },
  overrideLog: [],
  slotsVersion: 0,
};

const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((l) => l());
}

export function setState(patch: Partial<AppState> | ((s: AppState) => Partial<AppState>)): void {
  const next = typeof patch === 'function' ? patch(state) : patch;
  state = { ...state, ...next };
  emit();
}

export function getState(): AppState {
  return state;
}

function subscribe(l: () => void): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useStore<T>(select: (s: AppState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => select(state),
    () => select(state),
  );
}

export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

/* ---------------- site actions ---------------- */

function siteLetter(i: number): string {
  let s = '';
  let k = i | 0;
  do {
    s = String.fromCharCode(65 + (k % 26)) + s;
    k = Math.floor(k / 26) - 1;
  } while (k >= 0);
  return s;
}

export function addSite(pos: Vec3): Site {
  const site: Site = {
    id: nextId++,
    name: 'Site ' + siteLetter(nameSeq++),
    pos,
    n: DEFAULTS.n,
    q: DEFAULTS.q,
    r: DEFAULTS.r,
    type: DEFAULTS.type,
    tau: DEFAULTS.tau,
    conf: DEFAULTS.conf,
  };
  setState((s) => ({
    sites: [...s.sites, site],
    selectedId: site.id,
    tab: 'assess',
    status: `placed ${site.name} — ${s.sites.length + 1} site${s.sites.length === 0 ? '' : 's'} marked`,
  }));
  return site;
}

export function updateSite(id: number, patch: Partial<Site>): void {
  setState((s) => ({
    sites: s.sites.map((x) => (x.id === id ? { ...x, ...patch } : x)),
  }));
}

export function deleteSite(id: number): void {
  setState((s) => {
    const gone = s.sites.find((x) => x.id === id);
    const rest = s.sites.filter((x) => x.id !== id);
    return {
      sites: rest,
      selectedId: s.selectedId === id ? null : s.selectedId,
      status: gone
        ? `deleted ${gone.name} — ${rest.length} site${rest.length === 1 ? '' : 's'} remaining`
        : s.status,
    };
  });
}

export function selectSite(id: number | null): void {
  setState({ selectedId: id });
}

export function getSelected(): Site | null {
  return state.sites.find((x) => x.id === state.selectedId) ?? null;
}

export function setStatus(status: string): void {
  setState({ status });
}

export function setHint(hint: string): void {
  setState({ hint });
}

export function setTab(tab: TabKey): void {
  setState({ tab });
}
