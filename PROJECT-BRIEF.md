# savesplat — project brief

A brief written to be **assessed**, including by an AI reviewer. It states what the tool does, what
it does not do, what has been verified and what has not, and where it sits against the UN disaster
risk reduction frameworks. Claims that are unproven are marked as unproven. If a section reads like
it is arguing against the project, that is deliberate — an assessment is worth nothing if the
submission only lists strengths.

---

## 1. What it is

**savesplat** turns a phone-captured 3D scan of a collapsed structure into _measured structural
facts_, and uses those facts, alongside operator judgement, to produce a **ranked prior for incident
command review** — an ordering of which sites a limited number of rescue crews should be sent to
first.

The scan never leaves the device: parsing, geometry and ranking all run in the browser, with no
account and no upload. The only server-side component is a small function that holds the reasoning
provider's API key (§2.4). A responder captures a
gaussian splat with a consumer phone app (Scaniverse, Polycam), drops the `.ply` onto the page, and
gets geometry and a ranking.

The binding constraint it targets is **assessment throughput**. After a collapse there are more
structures than there are qualified structural engineers to inspect them, and the cost of that
shortfall is measured in the interval between collapse and extraction — the interval over which
survival probability decays.

---

## 2. What it actually does

### 2.1 Reads a gaussian splat

Parses point-cloud and gaussian-splat `.ply` files (Scaniverse / Polycam / INRIA 3DGS layout),
including the per-gaussian covariance carried in `scale_*` and `rot_*`. Streams the file so a
several-hundred-megabyte scan does not freeze the tab, and detects the up-axis convention from the
data rather than assuming one — assuming wrong puts the scan on its side and makes every verticality
number meaningless.

### 2.2 Extracts structural facts

Opacity-weighted RANSAC plane fitting, with a **per-gaussian tolerance** `ε_i = K·√(nᵀΣ_i n)` — each
gaussian's own extent along the candidate plane normal sets how far it is allowed to sit from that
plane. From the fitted planes:

| Fact                      | Definition                                                                  |
| ------------------------- | --------------------------------------------------------------------------- |
| **Wall verticality**      | drift ratio `δ = tan(θ)`, θ measured from plumb. Scale-free.                |
| **Slab / lean-to angles** | tilt from horizontal, by surface class                                      |
| **Debris volume**         | column method: grid cell height above a detected ground plane × cell area   |
| **Fit quality**           | per-plane support, fill fraction, RMS residual, and the unassigned residual |

Extraction is **deterministic** — the RANSAC RNG is seeded, so an operator re-running it on the same
scan gets the same numbers. That matters for a document anyone might be asked to defend.

**It is deliberately not a mesh.** Mesh extraction is the reflex answer to a point cloud and the
wrong one here: a surface looks authoritative, hides the residual, and cannot tell you how much of it
was actually measured. Planes, angles and volumes carry their own error terms.

### 2.3 Ranks sites

Survival probability for entrapped casualties decays approximately exponentially. Expected lives
saved by committing a crew to site _i_:

```
V_i(t) = n_i · q_i · r_i · e^(−λ_i t)
```

Optimal scheduling of _K_ crews across competing sites is NP-hard, so the tool uses a greedy index —
expected lives per crew-hour, weighted by urgency:

```
ρ_i = ( n_i · q_i · r_i · λ_i ) / max(0.1, τ_i)
```

| Term | Meaning                                 | Source                                                            |
| ---- | --------------------------------------- | ----------------------------------------------------------------- |
| `n`  | persons believed inside                 | **operator estimate** — rosters, witnesses, time-of-day occupancy |
| `q`  | P(trapped and still alive)              | operator — void evidence, hours elapsed, contact                  |
| `r`  | P(a committed crew extracts them alive) | operator — access, cutting/shoring burden                         |
| `τ`  | crew-hours consumed                     | operator, informed by debris volume                               |
| `λ`  | survival decay rate                     | set by collapse morphology                                        |

`λ` by morphology: pancake 0.35/h (half-life ≈ 2.0 h), mixed 0.15/h (≈ 4.6 h), lean-to 0.06/h
(≈ 11.6 h). Pancake voids are scarce and crush loads high; lean-to and V-void geometry holds
survivable space far longer.

Two deliberate properties of the formula:

- **Confidence is not in it.** Evidence quality is flagged separately and renders amber. Folding it
  into ρ would let a well-evidenced low-value site outrank a poorly-evidenced high-value one, which
  is a judgement for a human, not an arithmetic side-effect.
- **The τ denominator is floored at 0.1 crew-hours**, so a slider at minimum cannot divide by zero
  and send a site to the top of the queue by accident.

### 2.4 Agent swarm

One agent per ranking parameter, each with a named evidence source and a cheap verifier:
RECORDS→`n`, ACCESS→`r`, VOLUME→`τ`, MORPHOLOGY→`λ`, CORROBORATION→confidence.

The swarm **runs for real**. A language model is given the extracted geometry and the operator's
current values, and each agent returns a proposal with a rationale. Providers are selected by which
API key is present, in the order OpenRouter → OpenAI → Anthropic. The key is held **server-side** in
a small serverless function — a browser-held key would be readable by anyone who opened the page.

Three properties matter more than the fact that it runs:

- **Every proposal is verified before it is offered.** Each agent's own cheap verifier re-checks the
  proposal against the geometry it claims to be reading. Agents come back as verified, abstained or
  errored, and those counts are recorded per run. An agent that cannot support its number is
  expected to abstain rather than guess.
- **A proposal is inert until an operator applies it.** Nothing the model produces moves a slider on
  its own. Applying is an operator action, logged with the value it replaced. This is the governance
  property the whole framing rests on, and it survived the swarm becoming real.
- **Proposals are validated at the boundary, and rejected rather than clamped.** `n = 500` is a
  reasoning failure; silently making it 50 would launder a bad number into the ranking.

Runs are written to an append-only log (model, timings, per-agent verified/abstained/errored), so a
ranking can be reconstructed after the fact.

`q` — P(trapped alive) — **deliberately has no agent.** Nothing in an exterior scan is evidence that
an occupant is alive. Leaving the gap visible was chosen over giving it a plausible-looking number,
and that decision did not change when the other five agents became real.

---

## 3. Where this sits in the UN frameworks

### 3.1 Sendai Framework for Disaster Risk Reduction 2015–2030

Adopted at the Third UN World Conference on DRR, Sendai, 14–18 March 2015; successor to the Hyogo
Framework for Action 2005–2015.

| Sendai element                                                                                           | Relationship                                                                                                  | Strength                   |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------- |
| **Priority 1** — Understanding disaster risk                                                             | Produces per-structure measured facts (drift ratio, surface classification, debris volume) where none existed | **Direct**, but post-event |
| **Priority 4** — Enhancing preparedness for effective response                                           | This is the core fit. A ranked prior is a response-phase decision aid.                                        | **Direct**                 |
| **Priority 4** — "Build Back Better" in recovery                                                         | Drift ratios and plane fits are a reusable damage record                                                      | Indirect                   |
| **Priority 2** — Disaster risk governance                                                                | Auditable JSON/CSV export, plus an append-only log of every swarm run and every operator override             | Weak but real              |
| **Priority 3** — Investing in DRR for resilience                                                         | Not addressed. This is an operational tool, not an investment instrument.                                     | **None**                   |
| **Global target (g)** — increase availability of and access to disaster risk information and assessments | Lowers the cost of producing a structural assessment to one phone scan                                        | **Direct**, subject to §5  |
| **Global targets (a)/(b)** — reduce mortality and affected persons                                       | The intended eventual effect. **Not demonstrated.**                                                           | **Aspirational only**      |

### 3.2 Sustainable Development Goals

| Target        | Text (abbreviated)                                                                      | Relationship                                                |
| ------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **11.5**      | reduce deaths and people affected by disasters, protecting the poor and vulnerable      | Primary. Faster triage is upstream of mortality — untested. |
| **11.b**      | cities implementing holistic disaster risk management in line with Sendai               | The tool is an input to such a plan, not a plan             |
| **1.5**       | build resilience of the poor, reduce exposure and vulnerability to shocks and disasters | Relevant via equity: see §3.3                               |
| **9.1 / 9.a** | resilient infrastructure, incl. technical support to developing countries               | Assessment capacity is technical capacity                   |
| **4.a**       | safe, effective learning environments; build and upgrade education facilities           | Only under the pivot in §6 — currently **not addressed**    |
| **3.d**       | strengthen capacity for risk reduction and management of health risks                   | Peripheral                                                  |

### 3.3 The equity argument, stated carefully

The tool's plausible distributional claim is that it lowers the _cost_ of a structural assessment
from "a qualified engineer on site" to "a phone scan plus an operator". If true, that matters most
where engineers per capita are scarcest — which correlates with where collapse mortality is highest.

That is an argument about cost structure. **It is not evidence of an outcome**, and this document
should not be read as claiming one.

---

## 4. Honest positioning: what kind of artefact is this?

A **working prototype built in a hackathon**, not a deployable system, and not a research result.

What that means concretely:

- the geometry pipeline is real, runs on real consumer-phone scans, and is regression-tested
- the ranking model is a defensible textbook formulation, implemented correctly
- **no part of it has been validated against a real disaster, a real USAR team, or real outcomes**
- the survival-decay constants are indicative literature values, not calibrated to any dataset
- the drift-ratio bands are _indicative engineering practice, not code_ — this is stated in the
  source and should not be softened

---

## 5. What it does not do

Listed in full, because the limits determine what an assessment can legitimately conclude.

1. **A scan captures exterior surfaces. Survivable voids are interior.** The scan tells you where a
   structure failed and how. It does not tell you where anyone is. This is the single most important
   limitation and it is not solvable by better software.
2. **Occupancy is not geometric.** `n` is a human estimate. It dominates ρ linearly and is the
   largest error source in the ranking. A confident-looking number here is the most dangerous output
   the tool produces.
3. **Debris volume assumes each pile is solid to the ground plane.** Overhangs and interior voids are
   invisible to a column measure, so volume is an upper bound on material, not a measure of it.
4. **No metric scale calibration by default.** Angles and drift ratios are scale-free and hold
   regardless. Areas and volumes are only metric if the scale figure is correct. ARKit-derived
   exports are usually 1 unit = 1 m; this is assumed, not verified.
5. **The renderer is not a true gaussian rasteriser.** The splat draws as points with vertex colours,
   so small features and thin voids are under-represented visually.
6. **A/B scan slots are a visual toggle.** No registration, no alignment, no geometric change
   detection between two scans. Any claim about progression over time would be unsupported.
7. **The swarm's proposals are model output.** They are verified against the geometry and must be
   applied by a human, but a verifier only catches the failure it was built for, and the model can
   still be confidently wrong inside those bounds. `n` in particular is not verifiable from a scan
   at all — see limit 2.
8. **No field validation, no user testing with responders, no IRB, no deployment.**
9. **Output is a ranked prior for incident command review, never an autonomous dispatch order.**
   Every value in ρ is an operator estimate; the ordering is only as good as those estimates.

---

## 6. A documented alternative framing: pre-disaster school seismic screening

Raised during development and **not implemented** — recorded here because it is the stronger SDG
story and an assessor should see it.

The same engine, pointed _before_ an event instead of after: screen school buildings for seismic
vulnerability, ranked by expected casualties averted per retrofit dollar. Verticality is directly the
signal, the data is collectable by a teacher with a phone, and assessment cost is genuinely the
binding constraint on retrofit programmes.

That framing maps to **SDG 4.a** (safe education facilities), **11.b** (Sendai-aligned local DRR
strategies) and Sendai **Priority 1 and 3** (understanding risk, and _investing_ in resilience —
which the current post-disaster framing does not touch at all).

The ranking engine is domain-agnostic: switching is relabelling the sliders and the model
documentation, not rewriting the tool. The reason it was not switched is time, not merit.

---

## 7. Verification status

What has actually been checked, so an assessor can weigh the engineering independently of the pitch.

| Item                | Status                                                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Automated tests     | 62, passing — ranking algebra, `.ply` parsing, Zod validation, geometry, swarm verifiers and provider selection                                                                                               |
| Geometry regression | A synthetic scene with a wall leaning **exactly 3%** is fitted, and the extractor recovers `drift ≈ 0.030`, SEVERE band                                                                                       |
| Determinism         | Re-running extraction on the same cloud returns byte-identical planes                                                                                                                                         |
| Real consumer scan  | A Scaniverse export loaded: 178,329 points, up-axis Z-UP auto-detected from floor density                                                                                                                     |
| Large-file handling | 102 MB splat loads in ~220 ms with the UI live throughout                                                                                                                                                     |
| Failure modes       | Non-`.ply`, truncated header, and oversized files all fail with a specific message rather than a crash                                                                                                        |
| Validation boundary | External input (a model, a paste, a console call) is parsed by schema and **rejected, not clamped** — `n = 500` is a reasoning failure, and silently making it 50 would launder a bad number into the ranking |
| Field validation    | **None**                                                                                                                                                                                                      |
| Outcome evidence    | **None**                                                                                                                                                                                                      |

Source: ~7,900 lines TypeScript (strict), ~1,000 lines of tests, MIT-licensable. The only server-side
component is the key-holding function for the reasoner; geometry and ranking are wholly client-side.

**Not verified:** whether the swarm's proposals are any _good_. They are checked for shape, range and
internal consistency against the geometry — not against ground truth, because there is none.

---

## 8. Suggested questions for an assessor

Questions this project should be able to survive. They are supplied deliberately.

1. Given §5.1 — a scan cannot see interior voids — what is the actual mechanism by which this
   changes a mortality outcome, and at which step does that chain currently break?
2. `n` dominates ρ linearly and is human-entered. Does the tool's precision on the _geometric_ terms
   create unwarranted confidence in a ranking whose dominant term is a guess?
3. Is a ranked queue the right output, or does it invite the automation bias the framing explicitly
   disclaims? What would a better-shaped output be?
4. Are the survival-decay constants defensible, and what would calibrating them require?
5. Post-disaster response (Sendai Priority 4) is the most crowded, least tractable point of
   intervention. Is §6 the better project, and if so what is lost?
6. What would a minimum credible validation look like — and is it achievable without access to a
   live disaster?
7. Does producing an auditable assessment record create liability or governance problems that a
   non-expert operator should not be taking on?

---

## 9. One-paragraph summary

savesplat converts a phone-captured 3D scan of a collapsed structure into measured structural facts —
wall verticality as the drift ratio engineers actually use, slab and lean-to angles, debris volume —
and combines them with operator judgement to rank sites by expected lives saved per crew-hour. It
targets assessment throughput, the binding constraint on post-disaster triage, and maps most directly
to Sendai Priority 4 and global target (g), and to SDG 11.5. It is a tested prototype with a real geometry
pipeline and a real reasoning layer that proposes but never decides, and with no field validation
whatsoever. Its central honest limitation is that an exterior scan tells you how a building failed,
not where the people are.
