/* Vercel function: GET /api/swarm/status. */
import type { ServerResponse } from 'node:http';
import { handleStatus } from '../swarm/http';
import type { Req } from '../swarm/http';

export default function handler(req: Req, res: ServerResponse): Promise<void> {
  return handleStatus(req, res);
}
