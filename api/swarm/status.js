// server/swarm/env.ts
function normalizeEnv() {
  if (!process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_API_KEY) {
    process.env.OPENROUTER_API_KEY = process.env.OPENROUTER_API_API_KEY;
  }
}
function runLogUrl() {
  const raw = process.env.SUPABASE_POOLER_URL ?? process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL;
  if (!raw) return null;
  if (!raw.includes("[YOUR-PASSWORD]")) return raw;
  const pass = process.env.SUPABASE_DB_PASS;
  if (!pass) return null;
  return raw.replace("[YOUR-PASSWORD]", encodeURIComponent(pass));
}
function athenaConfig() {
  const apiKey = process.env.ATHENA_ATHENA_AGENT_API_KEY;
  const mcpUrl = process.env.ATHENA_ATHENA_AGENT_MCP_URL;
  if (!apiKey || !mcpUrl) return null;
  return { apiKey, mcpUrl, publicUrl: process.env.ATHENA_ATHENA_AGENT_PUBLIC_URL ?? null };
}

// server/swarm/athena.ts
var TIMEOUT_MS = 55e3;
var toolName = null;
async function rpc(method, params, signal) {
  const cfg = athenaConfig();
  if (!cfg) throw new Error("Athena is not configured");
  const res = await fetch(cfg.mcpUrl, {
    method: "POST",
    headers: {
      authorization: `Bearer ${cfg.apiKey}`,
      "content-type": "application/json",
      accept: "application/json, text/event-stream"
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: Date.now(), method, params }),
    signal
  });
  if (!res.ok) throw new Error(`Athena MCP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const body = await res.json();
  if (body.error) throw new Error(`Athena MCP error: ${body.error.message ?? "unspecified"}`);
  return body.result;
}
async function resolveTool(signal) {
  if (toolName) return toolName;
  const result = await rpc("tools/list", {}, signal);
  const found = (result.tools ?? []).find((t) => t.name.endsWith("__get_response"));
  if (!found) throw new Error("Athena agent exposes no get_response tool");
  toolName = found.name;
  return toolName;
}
async function askAthena(prompt, timeoutMs = TIMEOUT_MS) {
  const started = Date.now();
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const name = await resolveTool(ctl.signal);
    const result = await rpc("tools/call", { name, arguments: { prompt } }, ctl.signal);
    const text = result.structuredContent?.text ?? result.content?.find((c) => c.type === "text")?.text ?? "";
    if (result.isError || !text.trim()) throw new Error("Athena returned no text");
    return {
      text: text.trim(),
      agent: result.structuredContent?.rawResult?.botName ?? "Athena",
      ms: Date.now() - started
    };
  } finally {
    clearTimeout(timer);
  }
}

// src/core/swarm/schema.ts
import { z } from "zod";
var CollapseTypeSchema = z.enum(["pancake", "mixed", "lean"]);
var ConfidenceSchema = z.enum(["low", "med", "high"]);
var PARAM_SCHEMAS = {
  n: z.number().int("occupancy is a headcount, so it must be a whole number").min(0).max(50).describe("persons believed inside"),
  r: z.number().min(0).max(1).describe("P(extraction succeeds)"),
  tau: z.number().min(0.5).max(24).describe("crew-hours until the outcome is decided"),
  type: CollapseTypeSchema.describe("collapse morphology, which sets lambda"),
  conf: ConfidenceSchema.describe("evidence-quality flag; never enters rho")
};
var ProposalInputSchema = z.object({
  value: z.unknown(),
  rationale: z.string().max(2e3).optional()
});
var Vec3Schema = z.object({ x: z.number(), y: z.number(), z: z.number() });
var SiteSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().min(1).max(80),
  pos: Vec3Schema,
  n: PARAM_SCHEMAS.n,
  q: z.number().min(0).max(1),
  r: PARAM_SCHEMAS.r,
  tau: PARAM_SCHEMAS.tau,
  type: CollapseTypeSchema,
  conf: ConfidenceSchema
});
var QueueExportSchema = z.object({
  generated: z.string(),
  sites: z.array(SiteSchema).max(500),
  metresPerUnit: z.number().positive().optional()
});

// src/core/swarm/prompts.ts
var PREAMBLE = `You are one agent in a post-disaster structural triage swarm. You own exactly ONE
parameter of a ranking model and you propose a value for it. An operator reviews and applies
every proposal; nothing you return is acted on automatically. This is assisted assessment,
never an autonomous dispatch order.

WHAT THE EVIDENCE IS
You are given a JSON payload built from a 3D scan of a damaged structure plus the operator's
current values. The scan is a Gaussian-splat or point-cloud capture, rendered as points and
reduced to measured facts:
- geometry.planes[]: fitted surfaces. cls is "wall" (near-vertical), "slab" (near-level) or
  "incline". tilt_deg is from plumb for walls and from level for slabs. For walls,
  drift_ratio = tan(tilt) is the out-of-plumb drift ratio structural engineers use, with
  drift_band naming its severity. area_m2 is measured by occupied-cell count, fill is how
  much of the patch's bounding rectangle is genuinely surface, support is the fraction of the
  cloud the plane holds, rms_m is the fit residual.
- geometry.debris: total_volume_m3 is a column measure above the detected ground plane. It
  assumes each pile is solid down to that plane.
- scan.metres_per_unit and scan.scale_calibrated: when scale_calibrated is false, every area
  and volume is in uncalibrated scan units. Angles and drift ratios are scale-free and hold
  regardless.

WHAT THE EVIDENCE IS NOT
A scan captures EXTERIOR SURFACES. Survivable voids are interior and are invisible to it.
Low fill or low support means a fragment, not a wall. Nothing in the geometry evidences
whether anyone is inside, or alive.

RULES
1. Use only what is in the payload. You have no other sources \u2014 no registry, no map, no
   imagery, no prior knowledge of this building.
2. Cite the payload paths you actually used in evidence_used, exactly as they appear, e.g.
   "geometry.planes[2].drift_ratio", "geometry.debris.total_volume_m3", "site.tau". Every
   path you cite is resolved against the payload and your proposal is rejected if one does
   not exist. Do not cite a path you did not use.
3. If the payload does not support a value for your parameter, set abstain=true and value=null
   and say plainly what is missing. Abstaining is a correct answer and is preferred over a
   plausible guess.
4. self_confidence reflects your read of your own evidence: "high" only when the payload
   directly measures what you need.
5. rationale is at most three sentences, states the number and why, and names the evidence.
   No hedging boilerplate.`;
var AGENT_PROMPTS = {
  morphology: `${PREAMBLE}

YOUR PARAMETER: collapse type, one of "pancake" | "mixed" | "lean".
It selects the survival decay rate lambda: pancake 0.35/h, mixed 0.15/h, lean 0.06/h. A faster
decay ranks a site more urgently, so this choice moves the queue.

HOW TO READ IT
- pancake: floor plates stacked near-level with little surviving vertical structure. Expect
  several slab-class planes at low tilt and few intact walls.
- lean: a slab resting against a wall or debris, holding a large stable void. Expect
  incline-class planes at substantial angles, with walls still standing.
- mixed: partial pancake with some structure surviving. The default when the picture is
  genuinely between the two.
Judge from the distribution of plane classes, their tilts and their support \u2014 not from one
plane. A single steep fragment at 2% support is not a lean-to.`,
  volume: `${PREAMBLE}

YOUR PARAMETER: tau, crew-hours, a number from 0.5 to 24.
Tau is how long this site is expected to occupy a crew before the outcome is decided. It is
the denominator of the ranking index, so a larger tau ranks a site lower.

HOW TO READ IT
Reason from debris volume, the number and size of piles, and the breaching burden implied by
the surfaces \u2014 a slab that must be cut costs more per cubic metre than loose rubble. State
the implied rate in your rationale, because it is checked: dividing debris volume by your tau
should land in a defensible range for a rescue crew moving structural debris.
If scan.scale_calibrated is false, volumes are uncalibrated; lower your self_confidence and
say so, or abstain if the volume is the only thing your estimate would rest on.`,
  access: `${PREAMBLE}

YOUR PARAMETER: r, P(extraction succeeds), a number from 0 to 1.
The probability that a committed crew gets a live occupant out.

HOW TO READ IT
What the payload gives you is approach and stability, not a route: wall planes and their
openings, debris clusters that must be crossed or cleared, and drift bands indicating whether
what remains standing is stable enough to work under. Severe drift raises the risk of
secondary collapse and lowers r.
You do NOT have a street network, an approach path, or imagery of the openings. Be explicit
about that limit. self_confidence of "high" is almost never justified for this parameter.`,
  records: `${PREAMBLE}

YOUR PARAMETER: n, occupancy \u2014 persons believed inside at collapse, a whole number 0 to 50.
n multiplies the ranking index directly and is the single largest source of error in it.

HOW TO READ IT
Occupancy is NOT geometric. Nothing in a scan evidences how many people were inside. Your
only admissible source is operator_notes in the payload \u2014 witness statements, rosters,
building use, time of day \u2014 if the operator supplied any.
If operator_notes is absent, empty, or says nothing about occupancy, you MUST abstain. Do not
infer a headcount from building size, plane area, or debris volume; floor area is not
occupancy and treating it as such launders a guess into the ranking. When notes do support a
figure, prefer a conservative reading and name the phrase you relied on.`,
  corroboration: `${PREAMBLE}

YOUR PARAMETER: confidence, one of "low" | "med" | "high".
This is an evidence-quality flag shown to the operator. It is deliberately NOT a factor in the
ranking index \u2014 it never changes rho. It tells the operator how much to trust the rest.

HOW TO READ IT
You are given the other agents' proposals and the result of each one's deterministic verifier
in upstream_results. Judge the assessment as a whole:
- "low" if any agent failed a verifier, if the agent owning a parameter that dominates the
  ranking abstained, or if the scan itself is weak (little support, high residual fraction,
  uncalibrated scale).
- "high" only when the geometry is well supported, the agents agree, and every verifier passed.
- "med" otherwise.
Disagreement between agents is a reason to flag, not something to average away. Name the
specific agent and check that drove your call.`
};

// src/core/swarm/proposal.ts
import { z as z2 } from "zod";
var SelfConfidence = z2.enum(["low", "med", "high"]);
var WIRE_VALUES = {
  n: z2.number().int(),
  r: z2.number(),
  tau: z2.number(),
  type: z2.enum(["pancake", "mixed", "lean"]),
  conf: z2.enum(["low", "med", "high"])
};
function wireSchemaFor(param) {
  return z2.object({
    abstain: z2.boolean(),
    value: z2.union([WIRE_VALUES[param], z2.null()]),
    self_confidence: SelfConfidence,
    rationale: z2.string(),
    evidence_used: z2.array(z2.string())
  });
}

// server/swarm/providers/anthropic.ts
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

// server/swarm/providers/types.ts
var ProviderError = class extends Error {
  constructor(message, retryable = false) {
    super(message);
    this.retryable = retryable;
    this.name = "ProviderError";
  }
};

// server/swarm/providers/anthropic.ts
var DEFAULT_MODEL = "claude-opus-5";
var AnthropicReasoner = class {
  constructor(apiKey) {
    this.name = "anthropic";
    this.resolved = null;
    this.client = new Anthropic({ apiKey });
  }
  /** Same discipline as the OpenAI side: confirm the account can actually reach the model
   *  before a run depends on it, so an unavailable id is a clear message at status time
   *  rather than a 404 five agents deep. */
  async model() {
    if (this.resolved) return this.resolved;
    const pinned = process.env.SWARM_MODEL;
    if (pinned) {
      this.resolved = pinned;
      return pinned;
    }
    let ids;
    try {
      const list = await this.client.models.list({ limit: 100 });
      ids = list.data.map((m) => m.id);
    } catch {
      this.resolved = DEFAULT_MODEL;
      return DEFAULT_MODEL;
    }
    if (ids.length === 0 || ids.includes(DEFAULT_MODEL)) {
      this.resolved = DEFAULT_MODEL;
      return DEFAULT_MODEL;
    }
    throw new ProviderError(
      `${DEFAULT_MODEL} is not available to this key. Set SWARM_MODEL to one of: ${ids.slice(0, 12).join(", ")}${ids.length > 12 ? ` (+${ids.length - 12} more)` : ""}`
    );
  }
  async complete(req) {
    const model = await this.model();
    const effort = process.env.SWARM_EFFORT ?? "high";
    try {
      const schema = req.schema ?? wireSchemaFor(req.param);
      const content = [];
      for (const img of req.images ?? []) {
        content.push({
          type: "image",
          source: { type: "base64", media_type: img.mediaType, data: img.data }
        });
      }
      content.push({ type: "text", text: req.user });
      const response = await this.client.messages.parse({
        model,
        max_tokens: 16e3,
        thinking: { type: "adaptive" },
        system: req.system,
        output_config: { format: zodOutputFormat(schema), effort },
        messages: [{ role: "user", content }]
      });
      if (response.stop_reason === "refusal") {
        throw new ProviderError(
          `model declined this request (category: ${response.stop_details?.category ?? "unspecified"})`
        );
      }
      if (response.stop_reason === "max_tokens") {
        throw new ProviderError("response hit max_tokens before the JSON was complete");
      }
      return {
        raw: response.parsed_output ?? null,
        usage: { input: response.usage.input_tokens, output: response.usage.output_tokens }
      };
    } catch (err) {
      if (err instanceof ProviderError) throw err;
      throw new ProviderError(describe(err), isRetryable(err));
    }
  }
};
function isRetryable(err) {
  return err instanceof Anthropic.RateLimitError || err instanceof Anthropic.APIError && (err.status ?? 0) >= 500;
}
function describe(err) {
  if (err instanceof Anthropic.AuthenticationError) {
    return "the API key was rejected (401) \u2014 check ANTHROPIC_API_KEY in .env.local";
  }
  if (err instanceof Anthropic.RateLimitError) return "rate limited (429)";
  if (err instanceof Anthropic.BadRequestError) return `request rejected (400): ${err.message}`;
  if (err instanceof Anthropic.APIConnectionError) return "could not reach the API";
  if (err instanceof Anthropic.APIError) return `API error ${err.status}: ${err.message}`;
  return err instanceof Error ? err.message : String(err);
}

// server/swarm/providers/openrouter.ts
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
var OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
var REQUEST_TIMEOUT_MS = 45e3;
var PAID_PREFERENCE = [
  /^anthropic\/claude-opus-5/,
  /^anthropic\/claude-sonnet-5/,
  /^openai\/gpt-5(?:\.\d+)?$/,
  /^anthropic\/claude-opus-4/,
  /^anthropic\/claude-sonnet-4/,
  /^openai\/gpt-4\.1$/,
  /^google\/gemini-2\.5-pro/
];
var FREE_PREFERENCE = [
  // measured 2026-09-19 on the openrouter/free key: deepseek-v4-flash answered a strict
  // JSON-schema request in 2.5 s; nex-n2.5-pro in 0.6 s; qwen3.8-27b in 6.6 s and stalled
  // on a long agent prompt; gemma routes returned 429; nemotron ignored response_format
  /^deepseek\/deepseek-[a-z0-9.-]+:free$/,
  /^nex-agi\/nex-[a-z0-9.-]*pro[a-z0-9.-]*:free$/,
  /^qwen\/qwen[0-9.]+[a-z0-9.-]*:free$/,
  /^dots-studio\/[a-z0-9.-]+:free$/,
  /^meta-llama\/llama-[0-9.]+-[0-9]+b[a-z0-9.-]*:free$/,
  /^[a-z0-9-]+\/[a-z0-9.-]+:free$/
];
function keyIsFreeOnly(info) {
  if (!info) return false;
  if (info.is_free_tier) return true;
  return typeof info.limit_remaining === "number" && info.limit_remaining <= 0;
}
function supportsStructuredOutput(m) {
  const p = m.supported_parameters ?? [];
  return p.includes("structured_outputs") || p.includes("response_format");
}
function pickOpenRouterModel(models, freeOnly = false) {
  const ids = models.map((m) => m.id);
  const structured = models.filter(supportsStructuredOutput).map((m) => m.id);
  const search = (prefs, pool) => {
    for (const re of prefs) {
      const hits = pool.filter((id) => re.test(id)).sort((a, b) => a.length - b.length);
      if (hits.length) return hits[0];
    }
    return null;
  };
  if (freeOnly) {
    const free = (pool) => pool.filter((id) => id.endsWith(":free"));
    return search(FREE_PREFERENCE, free(structured)) ?? search(FREE_PREFERENCE, free(ids));
  }
  return search(PAID_PREFERENCE, structured);
}
function extractJson(text) {
  const trimmed = text.trim();
  const fenced = /^```(?:json)?\s*([\s\S]*?)\s*```$/i.exec(trimmed);
  const body = fenced ? fenced[1] : trimmed;
  try {
    return JSON.parse(body);
  } catch {
    const start = body.indexOf("{");
    const end = body.lastIndexOf("}");
    if (start >= 0 && end > start) return JSON.parse(body.slice(start, end + 1));
    throw new ProviderError("model returned text that was not JSON");
  }
}
var OpenRouterReasoner = class {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.name = "openrouter";
    this.resolved = null;
    this.client = new OpenAI({
      apiKey,
      baseURL: OPENROUTER_BASE_URL,
      // free routes can stall indefinitely; a stalled agent must become an error the operator
      // can see, not a request that outlives the function. No SDK retries: the handler
      // already reports per-agent failures and a retry would double the wait.
      timeout: REQUEST_TIMEOUT_MS,
      maxRetries: 0,
      // attribution headers OpenRouter asks for; harmless elsewhere
      defaultHeaders: {
        "HTTP-Referer": process.env.SWARM_APP_URL ?? "https://github.com/forkiron/save-splat",
        "X-Title": "savesplat swarm"
      }
    });
  }
  async model() {
    if (this.resolved) return this.resolved;
    const pinned = process.env.SWARM_MODEL;
    if (pinned) {
      this.resolved = pinned;
      return pinned;
    }
    const headers = { authorization: `Bearer ${this.apiKey}` };
    let models;
    try {
      const res = await fetch(`${OPENROUTER_BASE_URL}/models`, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body = await res.json();
      models = body.data ?? [];
    } catch (err) {
      throw new ProviderError(`could not read the OpenRouter model catalogue: ${describe2(err)}`);
    }
    let info = null;
    try {
      const res = await fetch(`${OPENROUTER_BASE_URL}/auth/key`, { headers });
      if (res.ok) info = (await res.json()).data ?? null;
    } catch {
      info = null;
    }
    const freeOnly = keyIsFreeOnly(info);
    const picked = pickOpenRouterModel(models, freeOnly);
    if (!picked) {
      const sample = models.filter((m) => freeOnly ? m.id.endsWith(":free") : supportsStructuredOutput(m)).slice(0, 12).map((m) => m.id);
      throw new ProviderError(
        `no preferred ${freeOnly ? ":free " : ""}model found on OpenRouter \u2014 set SWARM_MODEL explicitly. Candidates: ${sample.join(", ")}`
      );
    }
    this.resolved = picked;
    return picked;
  }
  async complete(req) {
    const model = await this.model();
    try {
      const schema = req.schema ?? wireSchemaFor(req.param);
      const parts = req.images?.length ? [
        ...req.images.map((img) => ({
          type: "image_url",
          image_url: { url: `data:${img.mediaType};base64,${img.data}` }
        })),
        { type: "text", text: req.user }
      ] : [{ type: "text", text: req.user }];
      const completion = await this.client.chat.completions.create({
        model,
        messages: [
          { role: "system", content: req.system },
          { role: "user", content: parts }
        ],
        response_format: zodResponseFormat(schema, "proposal")
      });
      const inBody = completion.error;
      if (inBody) {
        throw new ProviderError(
          `upstream error via OpenRouter${inBody.code ? ` (${inBody.code})` : ""}: ${inBody.message ?? "unspecified"}`,
          inBody.code === 429 || (inBody.code ?? 0) >= 500
        );
      }
      const choice = completion.choices[0];
      if (choice?.message.refusal) {
        throw new ProviderError(`model declined this request: ${choice.message.refusal}`);
      }
      if (choice?.finish_reason === "length") {
        throw new ProviderError("response was cut off before the JSON was complete");
      }
      const content = choice?.message.content;
      if (typeof content !== "string" || !content.trim()) {
        throw new ProviderError("model returned an empty response");
      }
      return {
        raw: extractJson(content),
        usage: {
          input: completion.usage?.prompt_tokens ?? 0,
          output: completion.usage?.completion_tokens ?? 0
        }
      };
    } catch (err) {
      if (err instanceof ProviderError) throw err;
      throw new ProviderError(describe2(err), isRetryable2(err));
    }
  }
};
function isRetryable2(err) {
  const status = err.status;
  return status === 429 || typeof status === "number" && status >= 500;
}
function describe2(err) {
  const e = err;
  const status = e?.status;
  const msg = e?.error?.message ?? (err instanceof Error ? err.message : String(err));
  if (status === 401) return "the API key was rejected (401) \u2014 check OPENROUTER_API_KEY";
  if (status === 402) {
    return "this OpenRouter key has no credits left (402). The key itself is valid; top up at https://openrouter.ai/settings/credits or pin a free model with SWARM_MODEL.";
  }
  if (status === 429) return `rate limited (429) \u2014 retry shortly: ${msg}`;
  if (status === 404) return `model not routable for this key (404): ${msg}`;
  if (status === 400) return `request rejected (400): ${msg}`;
  return msg;
}

// server/swarm/providers/athena.ts
var AGENT_TIMEOUT_MS = 5e4;
var VALUE_SHAPE = {
  n: "an integer from 0 to 50, or null when abstaining",
  r: "a number from 0 to 1, or null when abstaining",
  tau: "a number from 0.5 to 24, or null when abstaining",
  type: 'one of "pancake" | "mixed" | "lean", or null when abstaining',
  conf: 'one of "low" | "med" | "high", or null when abstaining'
};
function buildAthenaPrompt(req) {
  return [
    req.system,
    "",
    req.user,
    "",
    "OUTPUT FORMAT \u2014 this is machine-parsed. Reply with ONE JSON object and nothing else:",
    "no prose before or after, no markdown fence, no comments. Shape:",
    "{",
    '  "abstain": boolean,',
    `  "value": ${VALUE_SHAPE[req.param]},`,
    '  "self_confidence": "low" | "med" | "high",',
    '  "rationale": string (at most three sentences),',
    '  "evidence_used": string[] (payload paths you actually used)',
    "}"
  ].join("\n");
}
var AthenaReasoner = class {
  constructor() {
    this.name = "athena";
    this.resolved = null;
  }
  /** The agent slug stands in for a model id; resolving it also proves the key works. */
  async model() {
    if (this.resolved) return this.resolved;
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 15e3);
    try {
      const tool = await resolveTool(ctl.signal);
      this.resolved = tool.replace(/__get_response$/, "");
      return this.resolved;
    } catch (err) {
      throw new ProviderError(
        `Athena agent unreachable: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      clearTimeout(timer);
    }
  }
  async complete(req) {
    if (req.images?.length) {
      throw new ProviderError(
        "Athena cannot look at images \u2014 the room assessment needs ANTHROPIC_API_KEY or OPENAI_API_KEY"
      );
    }
    if (!req.param) {
      throw new ProviderError("Athena answers the per-parameter agent prompts only");
    }
    let text;
    try {
      ({ text } = await askAthena(
        buildAthenaPrompt(req),
        AGENT_TIMEOUT_MS
      ));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new ProviderError(
        /abort/i.test(msg) ? "Athena did not answer within the time limit" : msg,
        /abort|429|5\d\d/.test(msg)
      );
    }
    let raw;
    try {
      raw = extractJson(text);
    } catch {
      throw new ProviderError(`Athena replied with prose instead of JSON: ${text.slice(0, 160)}`);
    }
    return { raw, usage: { input: 0, output: 0 } };
  }
};

// server/swarm/providers/openai.ts
import OpenAI2 from "openai";
import { zodResponseFormat as zodResponseFormat2 } from "openai/helpers/zod";
var SPECIALISED = /-(mini|nano|codex|pro|chat-latest|live|preview)/;
var FALLBACK_PREFIXES = ["o4", "o3", "gpt-4.1", "gpt-4o"];
function plainVersion(id) {
  const m = /^gpt-(\d+)(?:\.(\d+))?$/.exec(id);
  if (!m) return null;
  return Number(m[2] ? `${m[1]}.${m[2]}` : m[1]);
}
function pickModel(ids) {
  const usable = ids.filter((id) => !SPECIALISED.test(id));
  let best = null;
  for (const id of usable) {
    const v = plainVersion(id);
    if (v === null) continue;
    if (!best || v > best.v) best = { id, v };
  }
  if (best) return best.id;
  for (const pref of FALLBACK_PREFIXES) {
    const matches = usable.filter((id) => id.startsWith(pref)).sort((a, b) => a.length - b.length);
    if (matches.length) return matches[0];
  }
  return null;
}
var OpenAIReasoner = class {
  constructor(apiKey) {
    this.name = "openai";
    this.resolved = null;
    this.client = new OpenAI2({ apiKey });
  }
  async model() {
    if (this.resolved) return this.resolved;
    const pinned = process.env.SWARM_MODEL;
    if (pinned) {
      this.resolved = pinned;
      return pinned;
    }
    let ids;
    try {
      const list = await this.client.models.list();
      ids = list.data.map((m) => m.id);
    } catch (err) {
      throw new ProviderError(`could not list models for this key: ${describe3(err)}`);
    }
    const picked = pickModel(ids);
    if (!picked) {
      throw new ProviderError(
        `no general chat model found for this key \u2014 set SWARM_MODEL explicitly. Available: ${ids.slice(0, 15).join(", ")}${ids.length > 15 ? ` (+${ids.length - 15} more)` : ""}`
      );
    }
    this.resolved = picked;
    return picked;
  }
  async complete(req) {
    const model = await this.model();
    try {
      const schema = req.schema ?? wireSchemaFor(req.param);
      const parts = req.images?.length ? [
        ...req.images.map((img) => ({
          type: "image_url",
          image_url: { url: `data:${img.mediaType};base64,${img.data}` }
        })),
        { type: "text", text: req.user }
      ] : [{ type: "text", text: req.user }];
      const completion = await this.client.chat.completions.parse({
        model,
        messages: [
          { role: "system", content: req.system },
          { role: "user", content: parts }
        ],
        response_format: zodResponseFormat2(schema, "proposal")
      });
      const choice = completion.choices[0];
      if (choice?.message.refusal) {
        throw new ProviderError(`model declined this request: ${choice.message.refusal}`);
      }
      if (choice?.finish_reason === "length") {
        throw new ProviderError("response was cut off before the JSON was complete");
      }
      return {
        raw: choice?.message.parsed ?? null,
        usage: {
          input: completion.usage?.prompt_tokens ?? 0,
          output: completion.usage?.completion_tokens ?? 0
        }
      };
    } catch (err) {
      if (err instanceof ProviderError) throw err;
      throw new ProviderError(describe3(err), isRetryable3(err));
    }
  }
};
function isQuotaError(err) {
  const e = err;
  return e?.error?.type === "insufficient_quota" || e?.error?.code === "credit_balance_exhausted";
}
function isRetryable3(err) {
  const status = err.status;
  if (status === 429) return !isQuotaError(err);
  return typeof status === "number" && status >= 500;
}
function describe3(err) {
  const e = err;
  const status = e?.status;
  const msg = e?.error?.message ?? (err instanceof Error ? err.message : String(err));
  if (status === 401) return "the API key was rejected (401) \u2014 check OPENAI_API_KEY in .env.local";
  if (isQuotaError(err)) {
    return "this API key has no credits left, so no request will succeed until the account is topped up (429 insufficient_quota). The key itself is valid. Billing: https://platform.openai.com/settings/organization/billing/";
  }
  if (status === 429) return `rate limited (429) \u2014 retry shortly: ${msg}`;
  if (status === 404) return `model not available to this key (404): ${msg}`;
  if (status === 400) return `request rejected (400): ${msg}`;
  return msg;
}

// server/swarm/providers/index.ts
var KEY_ENV = {
  athena: "ATHENA_ATHENA_AGENT_API_KEY",
  openrouter: "OPENROUTER_API_KEY",
  openai: "OPENAI_API_KEY",
  anthropic: "ANTHROPIC_API_KEY"
};
var ORDER = ["anthropic", "openai", "athena"];
var MissingKeyError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingKeyError";
  }
};
function isProvider(s) {
  return s === "athena" || s === "openrouter" || s === "openai" || s === "anthropic";
}
function hasKey(p) {
  return p === "athena" ? athenaConfig() !== null : !!process.env[KEY_ENV[p]];
}
function detectProvider() {
  normalizeEnv();
  const pinned = process.env.SWARM_PROVIDER?.toLowerCase();
  if (isProvider(pinned)) return pinned;
  for (const p of ORDER) if (hasKey(p)) return p;
  return null;
}
function getReasoner() {
  const which = detectProvider();
  if (!which) {
    throw new MissingKeyError(
      `No API key found. Put ${ORDER.map((p) => KEY_ENV[p]).join(", ")} (any one) in .env.local at the repo root \u2014 it is already gitignored \u2014 or run \`stripe projects env --pull\`, then restart the dev server.`
    );
  }
  if (!hasKey(which)) {
    throw new MissingKeyError(`SWARM_PROVIDER=${which} but ${KEY_ENV[which]} is not set.`);
  }
  if (which === "athena") return new AthenaReasoner();
  const key = process.env[KEY_ENV[which]];
  if (which === "openrouter") return new OpenRouterReasoner(key);
  if (which === "openai") return new OpenAIReasoner(key);
  return new AnthropicReasoner(key);
}

// src/core/swarm/defects.ts
import { z as z3 } from "zod";
var DEFECT_KINDS = [
  "crack-diagonal",
  "crack-stepped",
  "crack-vertical",
  "crack-horizontal",
  "crack-map",
  "spalling",
  "exposed-reinforcement",
  "water-damage",
  "deflection",
  "separation",
  "out-of-plumb",
  "impact-damage",
  "finish-damage"
];
var DefectSchema = z3.object({
  kind: z3.enum(DEFECT_KINDS),
  where: z3.string(),
  severity: z3.enum(["slight", "moderate", "serious"]),
  confidence: z3.enum(["low", "med", "high"]),
  views: z3.array(z3.number().int()),
  note: z3.string()
});
var DefectReportWireSchema = z3.object({
  abstain: z3.boolean(),
  capture_quality: z3.enum(["unreadable", "poor", "usable", "good"]),
  room_type: z3.string(),
  defects: z3.array(DefectSchema),
  nothing_found_note: z3.string(),
  overall: z3.enum(["none", "cosmetic", "concerning", "serious", "unclear"]),
  views_used: z3.array(z3.number().int()),
  self_confidence: z3.enum(["low", "med", "high"])
});

// server/swarm/persist.ts
import postgres from "postgres";
function persistEnabled() {
  return runLogUrl() !== null;
}

// server/swarm/http.ts
var MAX_BODY = 24 * 1024 * 1024;
function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(body));
}
async function handleStatus(_req, res) {
  const which = detectProvider();
  if (!which) {
    json(res, 200, {
      configured: false,
      provider: null,
      model: "",
      effort: "",
      persist: false,
      review: reviewStatus()
    });
    return;
  }
  try {
    json(res, 200, {
      configured: true,
      provider: which,
      model: await getReasoner().model(),
      effort: process.env.SWARM_EFFORT ?? "high",
      persist: persistEnabled(),
      review: reviewStatus()
    });
  } catch (err) {
    json(res, 200, {
      configured: false,
      provider: which,
      model: "",
      effort: "",
      persist: persistEnabled(),
      review: reviewStatus(),
      error: err instanceof Error ? err.message : String(err)
    });
  }
}
function reviewStatus() {
  const a = athenaConfig();
  return { configured: a !== null, publicUrl: a?.publicUrl ?? null };
}

// server/functions/status.ts
function handler(req, res) {
  return handleStatus(req, res);
}
export {
  handler as default
};
