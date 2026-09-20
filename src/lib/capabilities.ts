/* Single source of truth for what Saha sells.

   These names were previously hardcoded in six places — the services page,
   the homepage intro, the homepage ticker, the enquiry form's service picker,
   the careers stream picker and the internship stream card. When the firm
   collapsed from three disciplines to one, four of those six were missed, and
   they surfaced one at a time over several rounds: a ticker still scrolling
   SEO and life coaching, a disclaimer describing a firm that no longer
   existed, and two form dropdowns that let people select and submit a cut
   service.

   Anything that names a capability should import it from here, so the next
   positioning change is one edit rather than a hunt. */

export const DISCIPLINE = "AI Consulting";

export type Capability = {
  /** Full name, as used on the services page and the homepage. */
  name: string;
  /** Short form for tight spaces such as the ticker. */
  short: string;
  /** Sub-line listing what sits inside the capability. */
  tag: string;
  description: string;
  items: string[];
  number: string;
};

export const CAPABILITIES: Capability[] = [
  {
    description:
      "Before anything gets built, we work out whether it should be. We assess where AI actually fits, then put together a roadmap specific enough to act on — not a deck that sits in a drive folder.",
    items: [
      "Readiness assessment",
      "Opportunity mapping",
      "Roadmapping",
      "Decision advisory",
    ],
    name: "Strategy & Advisory",
    number: "01",
    short: "AI Strategy & Advisory",
    tag: "Readiness · Opportunity mapping · Roadmapping",
  },
  {
    description:
      "This is where most AI projects die — between the strategy and the working system. We build the thing: automated workflows, integrations with what you already use, and tooling your team will actually open.",
    items: [
      "Workflow automation",
      "System integration",
      "Custom tooling",
      "Testing & handover",
    ],
    name: "Implementation & Automation",
    number: "02",
    short: "Implementation & Automation",
    tag: "Workflows · Integration · Custom tooling",
  },
  {
    description:
      "A system nobody knows how to use is a system nobody uses. We make sure your team is confident and supported after handover, not just briefed and left to work it out.",
    items: ["Upskilling programmes", "Adoption support", "Change management"],
    name: "Enablement & Upskilling",
    number: "03",
    short: "Enablement & Upskilling",
    tag: "Upskilling · Adoption · Change management",
  },
];

/* A fourth line, AI Governance, is scoped but deliberately absent. It goes
   live once it is a staffed capability rather than a nice-to-have. */

export const CAPABILITY_NAMES = CAPABILITIES.map((c) => c.short);
