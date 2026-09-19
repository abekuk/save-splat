/* A committed API key is not a style problem, so it fails the build rather than a linter.
 *
 * This exists because a real Anthropic key was once committed into `.env.example` — the one
 * env file that is deliberately NOT gitignored, so the usual `.env*` ignore rules could not
 * catch it. Scanning tracked files is the only place that mistake is visible.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/** Shapes of real credentials. Deliberately requires a long tail, so documentation that
 *  merely names a prefix (`sk-ant-`, `sk-or-v1-`) does not trip the guard. */
const SECRET_PATTERNS: { name: string; re: RegExp }[] = [
  { name: 'Anthropic API key', re: /sk-ant-api03-[A-Za-z0-9_-]{30,}/ },
  { name: 'OpenAI API key', re: /sk-proj-[A-Za-z0-9_-]{30,}/ },
  { name: 'OpenRouter API key', re: /sk-or-v1-[A-Za-z0-9]{40,}/ },
  { name: 'Supabase/JWT service key', re: /eyJhbGciOi[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\./ },
  { name: 'Stripe secret key', re: /sk_live_[A-Za-z0-9]{20,}/ },
  { name: 'GitHub token', re: /gh[pousr]_[A-Za-z0-9]{30,}/ },
  { name: 'AWS access key id', re: /AKIA[0-9A-Z]{16}/ },
];

function trackedFiles(): string[] {
  return execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);
}

describe('no credentials in tracked files', () => {
  it('finds no key-shaped strings anywhere git is tracking', () => {
    const hits: string[] = [];

    for (const file of trackedFiles()) {
      let body: string;
      try {
        // skip anything large or binary; keys live in text
        if (statSync(file).size > 2_000_000) continue;
        body = readFileSync(file, 'utf8');
      } catch {
        continue;
      }
      if (file === 'src/secrets.test.ts') continue; // the patterns themselves live here

      for (const { name, re } of SECRET_PATTERNS) {
        if (re.test(body)) hits.push(`${file}: looks like a ${name}`);
      }
    }

    expect(hits).toEqual([]);
  });

  it('keeps .env.example free of values, not just free of real keys', () => {
    const body = readFileSync('.env.example', 'utf8');
    const assigned = body
      .split('\n')
      .filter((l) => !l.trimStart().startsWith('#'))
      .filter((l) => /=\s*\S/.test(l));
    // every uncommented line must be `NAME=` with nothing after it
    expect(assigned).toEqual([]);
  });
});
