import { servicesCapabilities } from "./data";

export default function ServicesLanding() {
  return (
    <div id="section-svc">
      <div className="svc-landing-hero">
        <div className="lh-grid" />
        <div className="lh-glow" />
        <p className="lh-eyebrow">Our Services</p>
        <h1 className="lh-title" style={{ position: "relative", zIndex: 1 }}>
          Where expertise
          <br />
          <em>meets execution.</em>
        </h1>
        <p
          className="lh-body"
          style={{ position: "relative", zIndex: 1, marginBottom: "1.5rem" }}
        >
          Saha provides focused AI consulting for businesses ready to move
          forward with clarity and confidence. One discipline, done properly.
        </p>
        <p className="lh-disclaimer">
          Saha is not a licensed financial advice provider (FAP) under the
          Financial Markets Conduct Act 2013. Nothing on this website
          constitutes regulated financial advice.
        </p>
      </div>

      <div className="sector-tiles">
        {servicesCapabilities.map((capability) => (
          <div className="sector-tile sector-tile--static" key={capability.name}>
            <p className="st-num">{capability.number}</p>
            <h2 className="st-name">{capability.name}</h2>
            <p className="st-desc">{capability.description}</p>
            <ul className="st-items">
              {capability.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <section className="landing-overview">
        <div className="lo-left">
          <p className="section-eyebrow">Why Saha</p>
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
            One firm. <em>One discipline.</em>
          </h2>
          <p>
            Most AI consultants sell strategy decks. We sell things that run.
            Every project starts from the same question: does this actually save
            time or make money, or is it just a slide?
          </p>
          <p>
            We don&apos;t hand you a template and wish you luck. We work
            alongside you — through the complexity, through the milestones, and
            through whatever comes next. Every engagement is tied to a real
            outcome, not a deliverable count.
          </p>
        </div>
      </section>
    </div>
  );
}
