/* The two endpoints, written once against Node's http types so the same code mounts in
 * the Vite dev server, the Vite preview server (the on-stage fallback) and a Vercel
 * function. Only the host differs; the request handling, error mapping and the rule that
 * the key never leaves the server process are shared.
 */
import type { IncomingMessage, ServerResponse } from 'node:http';
import { reviewRun } from './athena';
import { athenaConfig } from './env';
import { runSwarm } from './handler';
import { persistEnabled, recordRun } from './persist';
import { detectProvider, getReasoner } from './providers';

const MAX_BODY = 4 * 1024 * 1024; // a context payload with many planes is still small

/** Vercel parses JSON bodies before the handler runs; Vite hands us the raw stream. */
export type Req = IncomingMessage & { body?: unknown };

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

async function bodyOf(req: Req): Promise<unknown> {
  if (req.body !== undefined && req.body !== null) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }
  const raw = await readBody(req);
  return raw.trim() ? JSON.parse(raw) : {};
}

export function json(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
}

/** Lets the UI say "no key configured" instead of failing on the first click. Resolving
 *  the model can mean asking the account what it can run, so that failure is reported here
 *  rather than discovered five agents deep. */
export async function handleStatus(_req: Req, res: ServerResponse): Promise<void> {
  const which = detectProvider();
  if (!which) {
    json(res, 200, {
      configured: false,
      provider: null,
      model: '',
      effort: '',
      persist: false,
      review: reviewStatus(),
    });
    return;
  }
  try {
    json(res, 200, {
      configured: true,
      provider: which,
      model: await getReasoner().model(),
      effort: process.env.SWARM_EFFORT ?? 'high',
      persist: persistEnabled(),
      review: reviewStatus(),
    });
  } catch (err) {
    json(res, 200, {
      configured: false,
      provider: which,
      model: '',
      effort: '',
      persist: persistEnabled(),
      review: reviewStatus(),
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

function reviewStatus(): { configured: boolean; publicUrl: string | null } {
  const a = athenaConfig();
  return { configured: a !== null, publicUrl: a?.publicUrl ?? null };
}

/** POST /api/swarm/review — the Athena pass over a finished run. Separate from /run so the
 *  verdicts render the moment they exist and the narrative arrives after, and so a slow
 *  reviewer can never push the run itself past the function limit. */
export async function handleReview(req: Req, res: ServerResponse): Promise<void> {
  if (req.method !== 'POST') {
    json(res, 405, { error: 'POST only' });
    return;
  }
  if (!athenaConfig()) {
    json(res, 503, { error: 'Athena is not configured on this server' });
    return;
  }
  try {
    let body: Record<string, unknown>;
    try {
      const parsed = await bodyOf(req);
      if (!parsed || typeof parsed !== 'object') throw new Error('not an object');
      body = parsed as Record<string, unknown>;
    } catch {
      json(res, 400, { error: 'request body was not valid JSON' });
      return;
    }
    const run = body.run as { results?: unknown } | undefined;
    const context = body.context;
    if (!run || !Array.isArray(run.results) || !context || typeof context !== 'object') {
      json(res, 400, { error: 'expected { run, context }' });
      return;
    }
    const review = await reviewRun({
      run: run as never,
      context: context as Record<string, unknown>,
      operatorNotes: typeof body.operatorNotes === 'string' ? body.operatorNotes : null,
    });
    json(res, 200, review);
  } catch (err) {
    json(res, 502, { error: err instanceof Error ? err.message : String(err) });
  }
}

export async function handleRun(req: Req, res: ServerResponse): Promise<void> {
  if (req.method !== 'POST') {
    json(res, 405, { error: 'POST only' });
    return;
  }
  try {
    let body: Record<string, unknown>;
    try {
      const parsed = await bodyOf(req);
      if (!parsed || typeof parsed !== 'object') throw new Error('not an object');
      body = parsed as Record<string, unknown>;
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
    // the log write is not on the operator's critical path, and it awaits inside a
    // serverless function anyway because the response has not been sent yet
    const logged = await recordRun(result);
    json(res, 200, { ...result, logged });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // a missing key is the operator's problem to fix, not a server fault
    json(res, /API_KEY|No API key/.test(message) ? 503 : 500, { error: message });
  }
}
