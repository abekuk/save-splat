// server/swarm/env.ts
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
function buildReviewPrompt(req) {
  const ctx = req.context;
  const results = req.run.results.map((r) => ({
    agent: r.key,
    parameter: r.param,
    proposed: r.abstained ? "ABSTAINED" : r.value,
    verified: r.verified,
    self_confidence: r.selfConfidence,
    rationale: r.rationale,
    verdicts: r.verdicts.map((v) => `${v.check}: ${v.status} \u2014 ${v.detail}`),
    error: r.error ?? null
  }));
  const geometry = ctx.geometry ? {
    planes: ctx.geometry.planes?.length ?? 0,
    debris: ctx.geometry.debris ?? null,
    residual_fraction: ctx.geometry.residual_fraction ?? null
  } : null;
  return [
    "Review this savesplat swarm run for the incident commander. Answer in at most five short",
    "sentences, plain prose, no headings: (1) what the current rho ranking for this site rests",
    "on, (2) which verifiers failed or which agents abstained and what that means, (3) the one",
    "thing the operator should do next. Cite field names. Do not invent numbers.",
    "",
    `site: ${JSON.stringify(ctx.site ?? null)}`,
    `scan: ${JSON.stringify(ctx.scan ?? null)}`,
    `geometry_summary: ${JSON.stringify(geometry)}`,
    `ranking: ${JSON.stringify(ctx.ranking ?? [])}`,
    `operator_notes: ${JSON.stringify(req.operatorNotes?.trim() || null)}`,
    `swarm_results: ${JSON.stringify(results)}`
  ].join("\n");
}
async function reviewRun(req) {
  const cfg = athenaConfig();
  if (!cfg) throw new Error("Athena is not configured");
  const r = await askAthena(buildReviewPrompt(req));
  return { text: r.text, agent: r.agent, publicUrl: cfg.publicUrl, ms: r.ms };
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

// server/swarm/providers/anthropic.ts
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

// server/swarm/providers/openrouter.ts
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

// server/swarm/providers/openai.ts
import OpenAI2 from "openai";
import { zodResponseFormat as zodResponseFormat2 } from "openai/helpers/zod";

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

// server/swarm/http.ts
var MAX_BODY = 24 * 1024 * 1024;
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error("request body too large"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}
async function bodyOf(req) {
  if (req.body !== void 0 && req.body !== null) {
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  }
  const raw = await readBody(req);
  return raw.trim() ? JSON.parse(raw) : {};
}
function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(body));
}
async function handleReview(req, res) {
  if (req.method !== "POST") {
    json(res, 405, { error: "POST only" });
    return;
  }
  if (!athenaConfig()) {
    json(res, 503, { error: "Athena is not configured on this server" });
    return;
  }
  try {
    let body;
    try {
      const parsed = await bodyOf(req);
      if (!parsed || typeof parsed !== "object") throw new Error("not an object");
      body = parsed;
    } catch {
      json(res, 400, { error: "request body was not valid JSON" });
      return;
    }
    const run = body.run;
    const context = body.context;
    if (!run || !Array.isArray(run.results) || !context || typeof context !== "object") {
      json(res, 400, { error: "expected { run, context }" });
      return;
    }
    const review = await reviewRun({
      run,
      context,
      operatorNotes: typeof body.operatorNotes === "string" ? body.operatorNotes : null
    });
    json(res, 200, review);
  } catch (err) {
    json(res, 502, { error: err instanceof Error ? err.message : String(err) });
  }
}

// server/functions/review.ts
function handler(req, res) {
  return handleReview(req, res);
}
export {
  handler as default
};
