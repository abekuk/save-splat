import type { LoadProgress } from '@/core/ply/load';

const TITLE: Record<LoadProgress['phase'], string> = {
  reading: 'READING',
  parsing: 'PARSING',
  building: 'BUILDING',
};

export default function LoadOverlay({
  progress,
  file,
}: {
  progress: LoadProgress | null;
  file: string;
}) {
  return (
    <div id="loadbox" className={progress ? 'on' : undefined}>
      <div className="lt">{progress ? TITLE[progress.phase] : 'READING'}</div>
      <div className="lf">{file || '—'}</div>
      <div className="lm">{progress?.message ?? ''}</div>
      <span className="bar">
        <i style={{ width: `${((progress?.frac ?? 0) * 100).toFixed(1)}%` }} />
      </span>
    </div>
  );
}
