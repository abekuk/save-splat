import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { swarmPlugin } from './server/swarm/plugin';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react(), swarmPlugin()],
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  // relative base so `npm run build` output also opens from a file:// path or any subdir
  base: './',
  build: { outDir: 'dist', sourcemap: true },
});
