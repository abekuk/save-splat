/* Vite-hosted endpoints for the swarm.
 *
 * The browser must never hold the API key, so the reasoner runs here, inside Vite's Node
 * process. Keys are read with loadEnv using an empty prefix, which picks up .env.local
 * without the VITE_ prefix — anything so prefixed is inlined into the client bundle.
 *
 * Mounted on both the dev server and the preview server, because `npm run preview` is the
 * on-stage fallback and the swarm has to work there too. Deployed, the same handlers run
 * as Vercel functions from api/swarm/.
 */
import type { Connect, Plugin } from 'vite';
import { loadEnv } from 'vite';
import { hydrateEnv } from './env';
import { handleReview, handleRoom, handleRun, handleStatus } from './http';
import { detectProvider } from './providers';
import { persistEnabled } from './persist';
import { athenaConfig } from './env';

function mount(
  middlewares: Connect.Server,
  logger: { info(msg: string): void },
  mode: string,
  root: string,
): void {
  hydrateEnv(loadEnv(mode, root, '')); // empty prefix => all vars, not just VITE_*
  const provider = detectProvider();
  logger.info(
    provider
      ? `  \x1b[32m➜\x1b[0m  swarm:   ready via ${provider}` +
          (persistEnabled() ? ', runs logged to supabase' : '') +
          (athenaConfig() ? ', athena review on' : '')
      : `  \x1b[33m➜\x1b[0m  swarm:   no API key — add ANTHROPIC_API_KEY to .env.local to enable`,
  );
  middlewares.use('/api/swarm/status', (req, res) => void handleStatus(req, res));
  middlewares.use('/api/swarm/run', (req, res) => void handleRun(req, res));
  middlewares.use('/api/swarm/review', (req, res) => void handleReview(req, res));
  middlewares.use('/api/swarm/room', (req, res) => void handleRoom(req, res));
}

export function swarmPlugin(): Plugin {
  return {
    name: 'savesplat-swarm',
    configureServer(server) {
      mount(server.middlewares, server.config.logger, server.config.mode, server.config.root);
    },
    configurePreviewServer(server) {
      mount(server.middlewares, server.config.logger, server.config.mode, server.config.root);
    },
  };
}
