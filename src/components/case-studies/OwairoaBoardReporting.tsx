import AgentShowcase, { type AgentStat } from "./AgentShowcase";

/* Automated monthly board reporting for an Auckland primary school.

   Naming the school needs written board sign-off we do not have, so the
   client stays "an Auckland primary school" throughout. Sector specificity
   carries the credibility on its own.

   EVERY FIGURE BELOW IS SYNTHETIC. Real school financial data must not
   appear in a public screenshot — it would breach the engagement's
   data-control posture. Do not swap these for live numbers. */

const sources = [
  {
    detail: "PDF, from the school's outsourced accountant",
    name: "EdTech monthly finance pack",
    state: { label: "Ingested", tone: "pass" },
  },
  {
    detail: "Banking staffing position and usage to date",
    name: "EdPay Banking Staffing Report",
    state: { label: "Ingested", tone: "pass" },
  },
  {
    detail: "Board and finance correspondence, read-only",
    name: "Two connected Outlook mailboxes",
    state: { label: "Ingested", tone: "pass" },
  },
  {
    detail: "Auto-carried from the prior month, edited where changed",
    name: "Manual data entry form",
    state: { label: "Carried forward", tone: "info" },
  },
] as const;

const packSections = [
  { name: "Cover, agenda and prior minutes", range: "1–2" },
  { name: "Statement of financial position and revenue", range: "3–7" },
  { name: "Variance against adopted budget", range: "8–12" },
  { name: "Staffing and banking staffing position", range: "13–16" },
  { name: "Cashflow, reserves and working capital", range: "17–19" },
  { name: "Compliance, risks and recommendations", range: "20–22" },
] as const;

/* The Auditor's Point of View module — a sceptical review layer built on
   FISH, the Education and Training Act 2020, the Education (School Planning
   and Reporting) Regulations 2023, and five years of Auditor-General school
   audit findings. Its job is to challenge the numbers before a board sees
   them, not to summarise them. */
const auditorFlags = [
  {
    authority:
      "Cyclical maintenance is a recurring qualification theme in Auditor-General school audits. Provision movements are expected to be explained to the board, not absorbed in the property line.",
    detail:
      "Property and maintenance is tracking at 214% of year-to-date budget. The variance sits almost entirely in one line and no cyclical maintenance provision movement has been recorded against it.",
    severity: "Review before issue",
    title: "Maintenance variance not reconciled to provision",
    tone: "flag",
  },
  {
    authority:
      "Banking staffing overuse becomes a payable to the Ministry. FISH treats an unexplained overdrawn position as a matter for board attention in the month it arises.",
    detail:
      "Banking staffing is overdrawn by 1.8 FTE against entitlement. The finance pack presents this as a staffing note only, with no corresponding liability recognised.",
    severity: "Review before issue",
    title: "Overdrawn banking staffing not carried to the accounts",
    tone: "flag",
  },
  {
    authority:
      "Education and Training Act 2020 and the Education (School Planning and Reporting) Regulations 2023 require related party transactions to be identified and disclosed.",
    detail:
      "Two payments to a supplier sharing a surname with a board member were not flagged in the source pack. Relationship unconfirmed — this needs a human to check the interests register, not an assumption either way.",
    severity: "Human check required",
    title: "Possible related party transaction, undisclosed",
    tone: "hold",
  },
] as const;

/* Provisional: 3–4 hours of manual preparation per report across 9 board
   meetings a year. Supplied by Raj, NOT yet client-confirmed — the badge
   renders on the page for exactly that reason. Replace only once confirmed. */
const stat: AgentStat = {
  derived: {
    assumption:
      "Derived: 3–4 hours × 9 meetings. Preparation only — excludes board review and distribution.",
    caption: "Preparation time removed across a full board year.",
    unit: "hours/year",
    value: "27–36",
  },
  kind: "figures",
  primary: {
    caption:
      "Manual preparation per board report, before the agent was introduced.",
    unit: "hours",
    value: "3–4",
  },
  provisional: "Provisional — pending client confirmation",
  secondary: {
    caption: "Board meetings a year, each needing a full pack.",
    value: "9 meetings",
  },
};

export default function OwairoaBoardReporting() {
  return (
    <AgentShowcase
      actions={[
        { label: "Sources", variant: "plain" },
        { label: "Review Pass 1", variant: "ghost" },
        { label: "Generate pack", variant: "solid" },
      ]}
      address="saha.co.nz/agents/board-reporting"
      eyebrow="Client engagement · Board Reporting"
      headline={
        <>
          The board pack that <em>argues with itself first.</em>
        </>
      }
      lede="An Auckland primary school produces a full finance pack for nine board meetings a year. We built an agent that assembles all 22 slides from the source documents — and then runs a sceptical audit layer over its own output before a human ever sees it."
      product="Saha Board Reporting"
      replaced="A monthly manual rebuild: reading the accountant's finance pack, cross-checking the staffing report, chasing context out of two mailboxes, then retyping it all into last month's slides."
      stat={stat}
      status="Pass 1 synthesis complete · 3 items raised for human attention · files not yet generated"
      syntheticNote="All figures, names and variances shown are invented for this page. No real school financial data appears here."
      title="November board pack"
    >
      <div className="as-board">
        <div className="as-board__col">
          <div className="as-col-head">
            <span className="as-col-head__name">Sources in</span>
            <span className="as-col-head__count">(4)</span>
          </div>
          {sources.map((source) => (
            <div className="as-source" key={source.name}>
              <p className="as-source__name">{source.name}</p>
              <p className="as-source__meta">{source.detail}</p>
              <span className={`as-pill as-pill--${source.state.tone}`}>
                {source.state.label}
              </span>
            </div>
          ))}
          <p className="as-pack-total">
            Runs monthly, three working days before the board meeting. Sources
            are read where they already live — nothing is re-keyed.
          </p>
        </div>

        <div className="as-board__col">
          <div className="as-col-head">
            <span className="as-col-head__name">Pack assembled</span>
            <span className="as-col-head__count">(22 slides)</span>
          </div>
          {packSections.map((section) => (
            <div className="as-slide-group" key={section.range}>
              <span className="as-slide-group__range">{section.range}</span>
              <span className="as-slide-group__name">{section.name}</span>
            </div>
          ))}
          <p className="as-pack-total">
            Built from scratch with <strong>python-pptx</strong> — output as
            PPTX and PDF. No template to fall out of date.
          </p>
          <p className="as-pack-total">
            Prior-month figures carry into the comparatives automatically, so
            the pack opens already reconciled to <strong>October</strong>.
          </p>
        </div>

        <div className="as-board__col">
          <div className="as-col-head">
            <span className="as-col-head__name">Auditor&rsquo;s point of view</span>
            <span className="as-col-head__count">(3 raised)</span>
          </div>
          {auditorFlags.map((flag) => (
            <div className="as-flag" key={flag.title}>
              <div className="as-flag__head">
                <span className={`as-pill as-pill--${flag.tone}`}>
                  {flag.severity}
                </span>
              </div>
              <p className="as-flag__title">{flag.title}</p>
              <p className="as-flag__detail">{flag.detail}</p>
              <span className="as-flag__authority">{flag.authority}</span>
            </div>
          ))}
          <p className="as-checks-passed">
            <strong>14 further checks passed</strong> — casting, prior-month
            carry-forward, budget alignment and disclosure completeness.
          </p>
        </div>
      </div>

      <div className="as-gate">
        <div className="as-gate__pass">
          <p className="as-gate__label">Pass 1 · synthesis</p>
          <p className="as-gate__state">Complete, visible in chat</p>
          <p className="as-gate__note">
            Every figure, variance and flag is shown for review as text. Nothing
            is written to a file at this stage.
          </p>
        </div>

        <div className="as-gate__divider">
          <span className="as-gate__divider-label">Human sign-off</span>
          <span className="as-gate__divider-note">
            A person reviews Pass&nbsp;1 and approves before Pass&nbsp;2 runs.
          </span>
        </div>

        <div className="as-gate__pass as-gate__pass--locked">
          <p className="as-gate__label">Pass 2 · generation</p>
          <p className="as-gate__state">Locked until approved</p>
          <p className="as-gate__note">
            The 22-slide PPTX and PDF are only built after sign-off. The agent
            cannot produce a board-ready file on its own.
          </p>
        </div>
      </div>
    </AgentShowcase>
  );
}
