/* Vercel function: POST /api/swarm/review — Athena's incident review of a finished run. */
import type { ServerResponse } from 'node:http';
import { handleReview } from '../swarm/http';
import type { Req } from '../swarm/http';

export default function handler(req: Req, res: ServerResponse): Promise<void> {
  return handleReview(req, res);
}
