import { useRef, useState } from 'react';
import Halftone from './Halftone';

export default function Landing({
  onFile,
  onDemo,
}: {
  onFile: (f: File) => void;
  onDemo: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  return (
    <div
      className={over ? 'landing over' : 'landing'}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const f = e.dataTransfer?.files?.[0];
        if (f) onFile(f);
      }}
    >
      <div className="rules" aria-hidden="true">
        <i /><i /><i /><i />
      </div>

      <header className="lhead">
        <div className="wordmark">
          <span className="mk" aria-hidden="true" />
          savesplt
        </div>
        <nav>
          <a href="#what">What is savesplt</a>
        </nav>
      </header>

      <main className="lmain">
        <Halftone className="hero" />

        <div className="pitch">
          <h1>Measurable structure from a scan.</h1>
          <p className="sub">
            Drop a gaussian splat. Get wall verticality, slab angles and debris volume — not a mesh.
          </p>

          <div className="cta">
            <button className="primary" onClick={() => fileRef.current?.click()}>
              Upload a .ply
            </button>
            <button className="ghost" onClick={onDemo}>
              or open the demo scan
            </button>
          </div>
          <p className="drophint">or drop a file anywhere on this page</p>

          <input
            ref={fileRef}
            type="file"
            accept=".ply,application/octet-stream"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
              e.target.value = '';
            }}
          />
        </div>
      </main>

      <footer className="lfoot">
        <span id="what">Post-disaster triage, ranked by expected lives per crew-hour</span>
        <a href="https://github.com/forkiron/save-splat" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>

      <div className="dropveil" aria-hidden="true">
        <span>Release to load</span>
      </div>
    </div>
  );
}
