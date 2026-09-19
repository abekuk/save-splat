import type { Viewer } from '@/scene/viewer';
import { LAMBDA, TYPE_LABEL, ranked, rho } from '@/core/ranking';
import { selectSite, useAppState } from '@/state/store';

export default function QueueTab({ viewer }: { viewer: Viewer | null }) {
  const s = useAppState();
  const list = ranked(s.sites);

  return (
    <>
      <div className="qhead">DISPATCH QUEUE — DESC BY ρ</div>
      {!list.length && (
        <div className="empty">
          Queue empty.
          <br />
          <br />
          Press <b>m</b> or the <b>⊕ MARK</b> button, then click a structure in the 3D view to place
          your first assessment marker. Sites rank themselves by ρ as you score them — the order
          updates live.
        </div>
      )}
      {list.map((site, i) => {
        const rank = i + 1;
        const low = site.conf === 'low';
        const cls =
          'qrow' +
          (rank <= 3 ? ` rk${rank}` : '') +
          (low ? ' low' : '') +
          (site.id === s.selectedId ? ' sel' : '');
        return (
          <div
            key={site.id}
            className={cls}
            onClick={() => {
              selectSite(site.id);
              viewer?.flyTo(site.pos); // clicking a row moves the camera target to it
            }}
          >
            <div className="top">
              <span className="rank">{rank}</span>
              <span className="nm">
                {site.name}
                {low && <span className="badge">LOW CONF</span>}
              </span>
              <span className="rho">{rho(site).toFixed(3)}</span>
            </div>
            <div className="meta">
              n {site.n} · q {site.q.toFixed(2)} · r {site.r.toFixed(2)} · {TYPE_LABEL[site.type]} λ
              {LAMBDA[site.type].toFixed(2)} · τ {site.tau.toFixed(1)}h · conf{' '}
              {site.conf.toUpperCase()}
            </div>
          </div>
        );
      })}
    </>
  );
}
