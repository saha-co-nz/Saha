import type { ServiceDetailPageProps } from "./ServiceDetailPage";

/* Saha is one discipline now, not three. Personal and Digital consulting are
   cut for good rather than deferred, so their content does not migrate
   anywhere — /services/personal and /services/digital 301 to /services.

   What were three services are now three capabilities inside AI Consulting.
   They are not separate routes: the page is the destination. */
export const servicesCapabilities = [
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
  },
  {
    description:
      "A system nobody knows how to use is a system nobody uses. We make sure your team is confident and supported after handover, not just briefed and left to work it out.",
    items: [
      "Upskilling programmes",
      "Adoption support",
      "Change management",
    ],
    name: "Enablement & Upskilling",
    number: "03",
  },
];

/* A fourth line, AI Governance, is scoped but deliberately not listed here.
   It goes live once it is a staffed capability rather than a nice-to-have. */

export const aiServicePage = {
  ctaBody:
    "Let's talk — no jargon, no obligation. We'll give you an honest picture of where AI can genuinely help.",
  ctaLabel: "Book a conversation →",
  ctaTitle: "Ready to bring AI into your world?",
  eyebrow: "AI Consulting",
  gridCards: [
    {
      description:
        "We assess your readiness, identify the highest-value use cases, and build a practical AI roadmap — covering what to build, what to buy, and in what order. No hype, just a clear plan.",
      icon: "🗺️",
      title: "AI Strategy & Advisory",
    },
    {
      description:
        "From deploying tools like ChatGPT, Copilot, and Gemini to building custom GPTs and AI agents — we get AI working inside your existing systems and workflows, not alongside them.",
      icon: "⚙️",
      title: "Implementation & Integration",
    },
    {
      description:
        "We identify the repetitive, time-consuming work in your business and automate it — document processing, reporting, client communications, and beyond. Time back. Errors down.",
      icon: "🤖",
      title: "Process Automation",
    },
    {
      description:
        "We train your team to use AI tools confidently — from prompt engineering to building internal AI policies and usage guidelines. Change management included, not bolted on.",
      icon: "🎓",
      title: "Training & Enablement",
    },
    {
      description:
        "We build AI solutions tailored to your sector — automating workpapers in accounting, streamlining contract review in legal, powering content in marketing, and more.",
      icon: "🏭",
      title: "Industry-Specific AI Solutions",
    },
    {
      description:
        "The AI landscape never sits still. We monitor the tools that matter, manage your prompt libraries, and keep you informed about what's worth adopting — so you're always ahead.",
      icon: "🔄",
      title: "Ongoing AI Retainer",
    },
  ],
  gridColumns: 3,
  introBody:
    "Whether you're just starting to explore AI or ready to integrate it deep into your operations, we build the right approach for your context.",
  introTitleEmphasis: "end to end.",
  introTitlePrefix: "AI services",
  summary:
    "Artificial intelligence is transforming how businesses operate — but knowing where to start, what to adopt, and how to make it work is another matter. We cut through the noise and help you harness AI practically, confidently, and in a way that actually fits how you work.",
  titleEmphasis: "We help you keep up.",
  titlePrefix: "AI is moving fast.",
  highlights: [
    {
      description: "Where to start, what to build, and when",
      icon: "🗺️",
      title: "AI Strategy & Roadmap",
    },
    {
      description: "Deploying AI tools into your existing workflows",
      icon: "⚙️",
      title: "Implementation & Integration",
    },
    {
      description: "Upskilling your team to use AI effectively",
      icon: "🎓",
      title: "Training & Enablement",
    },
    {
      description:
        "AI built for your sector — finance, legal, marketing & more",
      icon: "🏭",
      title: "Industry-Specific Solutions",
    },
    {
      description: "Staying ahead of new tools and keeping you informed",
      icon: "🔄",
      title: "Ongoing Retainer",
    },
  ],
} satisfies ServiceDetailPageProps;

