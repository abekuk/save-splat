/* Bundle each Vercel function into one self-contained ES module.
 *
 * Vercel compiles api/*.ts itself, but it leaves relative imports extensionless in the
 * emitted ESM, and Node's ESM loader then fails at cold start with ERR_MODULE_NOT_FOUND
 * (that was FUNCTION_INVOCATION_FAILED in production). So the sources live in
 * server/functions/ and this step emits api/swarm/*.js with every relative module inlined.
 * Packages stay external: Vercel traces node_modules for a .js entry on its own.
 */
import { build } from 'esbuild';
import { mkdirSync, readdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const src = resolve('server/functions');
const out = resolve('api/swarm');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
const entries = readdirSync(src).filter((f) => f.endsWith('.ts'));
await build({
  entryPoints: entries.map((f) => resolve(src, f)),
  outdir: out,
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  packages: 'external',
  sourcemap: false,
  logLevel: 'warning',
});
console.warn(`bundled ${entries.length} function(s) → api/swarm/`);
