import RegulatoryMap from "./RegulatoryMap";

import { wwaGovernanceCommitments, wwaGovernancePrinciples, wwaGovernanceStructures } from "./data";

type GovernancePageProps = {
  /** Folded into /whoweare as a section — demotes the heading from h1. */
  asSection?: boolean;
};

export default function GovernancePage({ asSection = false }: GovernancePageProps) {
  const Heading = asSection ? "h2" : "h1";

  return (
    <div id="governance">
      <div className="gov-hero">
        <div className="gov-hero-grid" />
        <div className="gov-hero-left">
          <p className="gov-eyebrow">Governance</p>
          <Heading>
            Strong governance for <em>a bold future.</em>
          </Heading>
          <p>
            Good governance sits at the heart of Saha. Our work is built on
            trust — trust that comes from honesty, discipline, and doing the
            right thing even when no one is watching.
          </p>
        </div>
        <div className="gov-hero-right">
          {wwaGovernancePrinciples.map((principle) => (
            <div className="gov-principle" key={principle.title}>
              <span className="gov-p-icon">{principle.icon}</span>
              <div>
                <p className="gov-p-title">{principle.title}</p>
                <p className="gov-p-desc">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RegulatoryMap />

      <section className="gov-commitment">
        <div className="gc-header">
          <p className="ls-eyebrow">Our commitment</p>
          <h2 className="gc-title">
            Responsible business, <em>every day.</em>
          </h2>
          <p className="gc-subtitle">
            We hold ourselves to a high standard — not because we have to, but
            because our clients, our team, and our community deserve it.
          </p>
        </div>
        <div className="gc-grid">
          {wwaGovernanceCommitments.map((commitment) => (
            <div className="gc-item" key={commitment.title}>
              <div className="gc-icon">{commitment.icon}</div>
              <h3>{commitment.title}</h3>
              <p>{commitment.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gov-structures">
        <p className="gs-eyebrow">Governance Structures</p>
        <h2 className="gs-title">How we hold ourselves accountable</h2>
        <div className="gs-list">
          {wwaGovernanceStructures.map((structure) => (
            <div className="gs-item" key={structure.number}>
              <p className="gs-item-num">{structure.number}</p>
              <h3>{structure.title}</h3>
              <p>{structure.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
