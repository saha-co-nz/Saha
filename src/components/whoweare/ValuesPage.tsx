import { wwaValuesPageCards } from "./data";

const stats = [
  {
    label: "Core values that guide every decision we make",
    value: (
      <>
        4<span>+</span>
      </>
    ),
  },
  {
    label: "Commitment to honesty, even when it's difficult",
    value: (
      <>
        100<span>%</span>
      </>
    ),
  },
  {
    label:
      "Rooted in Aotearoa — our values reflect who we are and where we're from",
    value: "NZ",
  },
];

const principles = [
  {
    description:
      "We measure our success by the results we create for clients — not the hours we log or the reports we write.",
    icon: "🎯",
    title: "Outcome-focused",
  },
  {
    description:
      "No jargon, no runaround. We tell people what they need to hear, clearly and with respect.",
    icon: "💬",
    title: "Straight communication",
  },
  {
    description:
      "The quality is in the details. We take our work seriously and never cut corners where it counts.",
    icon: "🔬",
    title: "Detail-obsessed",
  },
  {
    description:
      "We play the long game — building relationships, reputation, and outcomes that last well beyond the engagement.",
    icon: "🌱",
    title: "Long-term thinking",
  },
];

type ValuesPageProps = {
  /** Folded into /whoweare as a section — demotes the heading from h1. */
  asSection?: boolean;
};

export default function ValuesPage({ asSection = false }: ValuesPageProps) {
  const Heading = asSection ? "h2" : "h1";

  return (
    <div id="values">
      <div className="values-hero">
        <div className="values-hero-left">
          <p className="v-eyebrow">Our Values</p>
          <Heading>
            The principles <em>we live by.</em>
          </Heading>
          <p>
            At Saha, our values aren&apos;t aspirational posters on a wall.
            They&apos;re the standards we hold ourselves to every single day —
            with clients, with each other, and with our communities.
          </p>
        </div>
        <div className="values-hero-right">
          {stats.map((stat, index) => (
            <div className="vh-stat" key={index}>
              <span className="vh-stat-num">{stat.value}</span>
              <span className="vh-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="values-grid-section">
        <div className="vg-intro">
          <p className="section-eyebrow">Core Values</p>
          <h2 className="section-title" style={{ marginBottom: "1.2rem" }}>
            What we believe <em>in.</em>
          </h2>
          <p>
            Each value is expressed in te reo Maori — a language that sits at
            the heart of Aotearoa — because these aren&apos;t just business
            principles. They&apos;re a reflection of our commitment to this
            place and the people in it.
          </p>
        </div>
        <div className="values-grid">
          {wwaValuesPageCards.map((value) => (
            <div className="value-card-wwa" key={value.maori}>
              <div className="vc-icon">{value.icon}</div>
              <div className="vc-maori">{value.maori}</div>
              <div className="vc-divider" />
              <div className="vc-english">{value.english}</div>
              <p className="vc-desc">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="values-principles">
        <div style={{ maxWidth: "600px", marginBottom: "3.5rem" }}>
          <p className="section-eyebrow light">Operating principles</p>
          <h2 className="section-title white" style={{ marginBottom: "1.2rem" }}>
            How we <em>show up.</em>
          </h2>
        </div>
        <div className="vp-grid">
          {principles.map((principle) => (
            <div className="vp-item" key={principle.title}>
              <div className="vp-icon">{principle.icon}</div>
              <p className="vp-title">{principle.title}</p>
              <p className="vp-desc">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
