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
        <i />
        <i />
        <i />
        <i />
      </div>

      <header className="lhead">
        <div className="wordmark">
          <span className="mk" aria-hidden="true" />
          savesplat
        </div>
      </header>

      <main className="lmain">
        <Halftone className="hero" />

        <div className="pitch">
          <h1>Measurable 3D structure.</h1>
          <div className="cta">
            <button className="primary" onClick={() => fileRef.current?.click()}>
              Upload splat
            </button>
            <button className="ghost" onClick={onDemo}>
              View demo
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".ply,.glb,.gltf,application/octet-stream"
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
