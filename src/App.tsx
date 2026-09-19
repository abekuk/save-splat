import { useState } from 'react';
import Landing from '@/components/landing/Landing';
import ViewerApp from '@/components/ViewerApp';

/** Two surfaces, one bundle: the landing, and the viewer it hands a file to.
 *  Uploading is the whole navigation model — there is nothing else to route to. */
export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [inViewer, setInViewer] = useState(
    () => typeof location !== 'undefined' && location.hash === '#viewer',
  );

  if (!inViewer) {
    return (
      <Landing
        onFile={(f) => {
          setFile(f);
          setInViewer(true);
        }}
        onDemo={() => setInViewer(true)}
      />
    );
  }
  return (
    <ViewerApp
      initialFile={file}
      onExit={() => {
        setFile(null);
        setInViewer(false);
      }}
    />
  );
}
