import AgentShowcase, { type AgentStat } from "./AgentShowcase";

/* CONFIDENTIALITY — READ BEFORE EDITING.

   Saha's real qualification model (gate structure, vertical tiers, grading
   proxies) lives in a confidential ICP document and carries a standing
   constraint against exposure. Rendering its actual scoring components on a
   public page would leak it by another route.

   Everything below is invented: the companies, the criterion names, the
   scores and the bands. Criteria are shown as coarse bands rather than
   weighted numbers precisely so the display cannot be used to infer how the
   real model is built. Do not replace these with real criterion names,
   weights or gate names. Totals and rates are publishable; the mechanism is
   not. */

const prospects = [
  {
    criteria: [
      { band: "partial", name: "Sector alignment" },
      { band: "none", name: "Existing data maturity" },
      { band: "none", name: "Access to the decision" },
      { band: "partial", name: "Timing signal" },
    ],
    meta: "Freight and logistics · 40–60 staff · Hamilton",
    name: "Kowhai Freight Ltd",
    outcome:
      "Not contacted. Logged with the reason, and re-checked automatically if the trigger conditions change.",
    research:
      "Operationally strong but no evident data layer to build on — no integrated systems, and the work we would be automating is still on paper. The named contact is an operations lead with no visible budget authority. A call here would take an hour and go nowhere.",
    score: 31,
    status: "Rejected",
    tone: "rejected",
  },
  {
    criteria: [
      { band: "strong", name: "Sector alignment" },
      { band: "strong", name: "Existing data maturity" },
      { band: "strong", name: "Access to the decision" },
      { band: "partial", name: "Timing signal" },
    ],
    meta: "Professional services · 12 staff · Auckland",
    name: "Tasman Ridge Advisory",
    outcome:
      "Qualified. Brief written, call booked, with the research attached so nobody re-does it.",
    research:
      "Small professional services firm already running structured client workflows, which is the layer we attach to. Contact is a founding partner, so the decision and the budget sit with the same person. Recent hiring suggests capacity pressure rather than cost pressure.",
    score: 84,
    status: "Qualified",
    tone: "qualified",
  },
] as const;

/* No headline figure yet. The run over the existing prospect list is still
   being generated. When it lands, the REJECTION count is the primary stat —
   "screened 140, rejected 96" is the story, and it is what makes the rejected
   card land. Do not lead with the qualification rate. */
const stat: AgentStat = {
  claim: "It rejects more prospects than it qualifies. That's the point.",
  kind: "fallback",
};

export default function SalesAgent() {
  return (
    <AgentShowcase
      actions={[
        { label: "Prospect list", variant: "plain" },
        { label: "Re-run research", variant: "ghost" },
        { label: "Export briefs", variant: "solid" },
      ]}
      address="saha.co.nz/agents/sales-research"
      eyebrow="Internal ops · Sales Agent"
      headline={
        <>
          Cold outreach that <em>knows who not to call.</em>
        </>
      }
      lede="Growing Saha means finding the right businesses to talk to, not more of them. So we built the agent to disqualify. It researches a prospect, scores fit against a defined profile, and most of the time the answer is no."
      product="Saha Sales Research"
      replaced="Twenty to thirty minutes of manual research per prospect, done differently by whoever happened to be doing it that week, and usually skipped when the week got busy."
      stat={stat}
      status="Two prospects shown from a single batch · research and scoring run before any human opens the record"
      syntheticNote="Companies, criteria and scores are invented for this page. Saha's actual qualification model is confidential and is not shown here."
      title="Batch review"
    >
      <div className="as-prospects">
        {prospects.map((prospect) => (
          <article
            className={`as-prospect as-prospect--${prospect.tone}`}
            key={prospect.name}
          >
            <div className="as-prospect__verdict-bar">
              <span className={`as-pill as-pill--${
                prospect.tone === "rejected" ? "flag" : "pass"
              }`}
              >
                {prospect.status}
              </span>
            </div>

            <p className="as-prospect__name">{prospect.name}</p>
            <p className="as-prospect__meta">{prospect.meta}</p>

            <div className="as-prospect__score">
              <span className="as-prospect__score-value">{prospect.score}</span>
              <span className="as-prospect__score-label">Fit score</span>
            </div>

            {prospect.criteria.map((criterion) => (
              <div className="as-criterion" key={criterion.name}>
                <span className="as-criterion__name">{criterion.name}</span>
                <span
                  className={`as-criterion__band as-criterion__band--${criterion.band}`}
                >
                  {criterion.band === "strong"
                    ? "Strong"
                    : criterion.band === "partial"
                      ? "Partial"
                      : "No match"}
                </span>
              </div>
            ))}

            <p className="as-prospect__research">
              <strong>What the research found</strong>
              {prospect.research}
            </p>

            <p className="as-prospect__outcome">
              <strong>Outcome —</strong> {prospect.outcome}
            </p>
          </article>
        ))}
      </div>

      <p className="as-model-note">
        The criteria above are illustrative. Saha&rsquo;s actual qualification
        model is client-confidential and deliberately not published — what is
        shown here is the shape of the decision, not the mechanism behind it.
      </p>
    </AgentShowcase>
  );
}
