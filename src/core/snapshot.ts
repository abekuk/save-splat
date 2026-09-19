import type { GeometryResult, Site, Slot, SlotKey } from '@/types';

/** Everything the pure exporters and the swarm context need, with no reach into
 *  module globals — the single-file build read `sites`, `slots[activeSlot]` and
 *  `metresPerUnit` straight out of closure scope, which made all of it untestable. */
export interface AppSnapshot {
  sites: Site[];
  slotKey: SlotKey;
  slot: Slot | null;
  geom: GeometryResult | null;
  metresPerUnit: number;
  selectedId: number | null;
}
