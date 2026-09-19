/* Vercel function: POST /api/swarm/run. Thin — everything lives in server/swarm/http.ts
 * so the dev server, the preview server and production run the same code. */
import type { ServerResponse } from 'node:http';
import { handleRun } from '../../server/swarm/http';
import type { Req } from '../../server/swarm/http';

export default function handler(req: Req, res: ServerResponse): Promise<void> {
  return handleRun(req, res);
}
