/* Dev-server endpoint for the swarm.
 *
 * The browser must never hold the API key, so the reasoner runs here, inside the Vite dev
 * server's Node process. The key is read with loadEnv using an empty prefix, which picks up
 * ANTHROPIC_API_KEY from .env.local — note the deliberate absence of a VITE_ prefix, since
 * anything so prefixed is inlined into the client bundle and shipped to every visitor.
 *
 * This is a dev-time convenience, not a production server: no auth, no rate limiting, bound
 * to the dev server's lifetime. Deploying the app means standing up a real endpoint.
 */
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';
import { loadEnv } from 'vite';
import { runSwarm } from './handler';
import { runVision } from './vision';
import { detectProvider, getReasoner } from './providers';

const MAX_BODY = 24 * 1024 * 1024; // six rendered JPEG views are the large case, not the JSON

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on('data', (c: Buffer) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error('request body too large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function json(res: ServerResponse, status: number, body: unknown): void {
  const text = JSON.stringify(body);
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(text);
}

export function swarmPlugin(): Plugin {
  return {
    name: 'rubble-swarm',
    configureServer(server) {
      // empty prefix => all vars, including ones deliberately not exposed to the client
      const env = loadEnv(server.config.mode, server.config.root, '');
      if (env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY) {
        process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;
      }
      for (const k of ['OPENAI_API_KEY', 'SWARM_PROVIDER', 'SWARM_MODEL', 'SWARM_EFFORT']) {
        if (env[k] && !process.env[k]) process.env[k] = env[k];
      }

      const provider = detectProvider();
      server.config.logger.info(
        provider
          ? `  \x1b[32m➜\x1b[0m  swarm:   ready via ${provider}`
          : `  \x1b[33m➜\x1b[0m  swarm:   no API key — add OPENAI_API_KEY to .env.local to enable`,
      );

      /** Lets the UI say "no key configured" instead of failing on the first click. */
      server.middlewares.use('/api/swarm/status', (_req, res) => {
        const which = detectProvider();
        if (!which) {
          json(res, 200, { configured: false, provider: null, model: '', effort: '' });
          return;
        }
        // resolving the model can mean asking the account what it can run, so report the
        // failure here rather than letting the first RUN click discover it
        void (async () => {
          try {
            json(res, 200, {
              configured: true,
              provider: which,
              model: await getReasoner().model(),
              effort: process.env.SWARM_EFFORT ?? 'high',
            });
          } catch (err) {
            json(res, 200, {
              configured: false,
              provider: which,
              model: '',
              effort: '',
              error: err instanceof Error ? err.message : String(err),
            });
          }
        })();
      });

      server.middlewares.use('/api/swarm/vision', (req, res) => {
        if (req.method !== 'POST') {
          json(res, 405, { error: 'POST only' });
          return;
        }
        void (async () => {
          try {
            const body = JSON.parse(await readBody(req)) as Record<string, unknown>;
            if (!Array.isArray(body.images) || body.images.length === 0) {
              json(res, 400, { error: 'missing "images"' });
              return;
            }
            json(
              res,
              200,
              await runVision({
                images: body.images as string[],
                geometryLevel: body.geometryLevel as never,
                sceneNote: typeof body.sceneNote === 'string' ? body.sceneNote : null,
              }),
            );
          } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            json(res, /API_KEY|No API key/.test(message) ? 503 : 500, { error: message });
          }
        })();
      });

      server.middlewares.use('/api/swarm/run', (req, res) => {
        if (req.method !== 'POST') {
          json(res, 405, { error: 'POST only' });
          return;
        }
        void (async () => {
          try {
            const raw = await readBody(req);
            let body: Record<string, unknown>;
            try {
              body = JSON.parse(raw) as Record<string, unknown>;
            } catch {
              json(res, 400, { error: 'request body was not valid JSON' });
              return;
            }
            const context = body.context;
            if (!context || typeof context !== 'object') {
              json(res, 400, { error: 'missing "context" object' });
              return;
            }
            const result = await runSwarm({
              context: context as Record<string, unknown>,
              operatorNotes: typeof body.operatorNotes === 'string' ? body.operatorNotes : null,
              siteId: typeof body.siteId === 'number' ? body.siteId : null,
              only: Array.isArray(body.only) ? (body.only as never) : undefined,
            });
            json(res, 200, result);
          } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            // a missing key is the operator's problem to fix, not a server fault
            json(res, /API_KEY|No API key/.test(message) ? 503 : 500, { error: message });
          }
        })();
      });
    },
  };
}
