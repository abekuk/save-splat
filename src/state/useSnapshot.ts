import { useMemo } from 'react';
import type { Viewer } from '@/scene/viewer';
import type { AppSnapshot } from '@/core/snapshot';
import { useAppState } from './store';

/** Bridges viewer-owned scan state into the pure AppSnapshot the exporters and the
 *  swarm context consume. Recomputed when the store changes or the viewer bumps
 *  slotsVersion. */
export function useSnapshot(viewer: Viewer | null): AppSnapshot {
  const s = useAppState();
  return useMemo(() => {
    const key = viewer ? viewer.getActiveSlot() : 'A';
    const slot = viewer ? viewer.getSlot(key) : null;
    return {
      sites: s.sites,
      slotKey: key,
      slot,
      geom: slot?.geom ?? null,
      metresPerUnit: s.metresPerUnit,
      selectedId: s.selectedId,
    };
  }, [viewer, s.sites, s.metresPerUnit, s.selectedId, s.slotsVersion]);
}
