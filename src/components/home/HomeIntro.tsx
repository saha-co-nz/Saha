import Link from "next/link";

/* Three capabilities inside one discipline — not three services. All three
   lead to /services, which is now the single destination. */
const capabilityRows = [
  {
    name: "Strategy & Advisory",
    tag: "Readiness · Opportunity mapping · Roadmapping",
  },
  {
    name: "Implementation & Automation",
    tag: "Workflows · Integration · Custom tooling",
  },
  {
    name: "Enablement & Upskilling",
    tag: "Upskilling · Adoption · Change management",
  },
];

export default function HomeIntro() {
  return (
    <section className="intro reveal">
      <div className="intro-left">
        <p className="intro-eyebrow">About saha.</p>
        <h2 className="intro-heading">
          One firm.
          <br />
          <em>One discipline.</em>
        </h2>
        <p className="intro-body">
          Most AI consultants sell strategy decks. We sell things that run.
          Every project starts from the same question: does this actually save
          time or make money, or is it just a slide? Three capabilities, one
          discipline, no hedging.
        </p>
        <Link className="intro-cta" href="/case-studies">
          See what we&apos;ve built →
        </Link>
      </div>

      <div className="intro-right">
        {capabilityRows.map((capability) => (
          <Link
            className="intro-service-row"
            href="/services"
            key={capability.name}
          >
            <div>
              <div className="intro-service-name">{capability.name}</div>
              <div className="intro-service-tag">{capability.tag}</div>
            </div>
            <span className="intro-service-arr">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
