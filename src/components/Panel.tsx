import type { Viewer } from '@/scene/viewer';
import { exportCsv, exportJson } from '@/core/export';
import { setState, setStatus, useAppState } from '@/state/store';
import type { TabKey } from '@/state/store';
import QueueTab from './tabs/QueueTab';
import AssessTab from './tabs/AssessTab';
import GeoTab from './tabs/GeoTab';
import SwarmTab from './tabs/SwarmTab';
import ModelTab from './tabs/ModelTab';
import { useSnapshot } from '@/state/useSnapshot';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'queue', label: 'QUEUE' },
  { key: 'assess', label: 'ASSESS' },
  { key: 'geo', label: 'GEO' },
  { key: 'swarm', label: 'SWARM' },
  { key: 'model', label: 'MODEL' },
];

export default function Panel({
  viewer,
  onGeometry,
}: {
  viewer: Viewer | null;
  onGeometry: (focus?: boolean) => void;
}) {
  const s = useAppState();
  const snap = useSnapshot(viewer);

  const guardEmpty = (): boolean => {
    if (!s.sites.length) {
      window.alert('The dispatch queue is empty — place at least one site before exporting.');
      return false;
    }
    return true;
  };

  return (
    <div id="panel">
      <div id="tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={s.tab === t.key ? 'on' : undefined}
            onClick={() => setState({ tab: t.key })}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id="panes">
        <div className={s.tab === 'queue' ? 'pane on' : 'pane'} id="pane-queue">
          <QueueTab viewer={viewer} />
        </div>
        <div className={s.tab === 'assess' ? 'pane on' : 'pane'} id="pane-assess">
          <AssessTab viewer={viewer} snap={snap} />
        </div>
        <div className={s.tab === 'geo' ? 'pane on' : 'pane'} id="pane-geo">
          <GeoTab viewer={viewer} snap={snap} onGeometry={onGeometry} />
        </div>
        <div className={s.tab === 'swarm' ? 'pane on' : 'pane'} id="pane-swarm">
          <SwarmTab viewer={viewer} snap={snap} onGeometry={onGeometry} />
        </div>
        <div className={s.tab === 'model' ? 'pane on' : 'pane'} id="pane-model">
          <ModelTab />
        </div>
      </div>

      <div id="exports">
        <button
          className="btn"
          onClick={() => {
            if (!guardEmpty()) return;
            exportJson(snap);
            setStatus(`exported JSON — ${s.sites.length} sites`);
          }}
        >
          EXPORT JSON
        </button>
        <button
          className="btn"
          onClick={() => {
            if (!guardEmpty()) return;
            exportCsv(snap);
            setStatus(`exported CSV — ${s.sites.length} sites`);
          }}
        >
          EXPORT CSV
        </button>
      </div>
    </div>
  );
}
