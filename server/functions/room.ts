/* Vercel function: POST /api/swarm/room — the vision pass over rendered views. */
import type { ServerResponse } from 'node:http';
import { handleRoom } from '../swarm/http';
import type { Req } from '../swarm/http';

export default function handler(req: Req, res: ServerResponse): Promise<void> {
  return handleRoom(req, res);
}
