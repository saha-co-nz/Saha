import Link from "next/link";

import { wwaPeople, wwaValueCards } from "./data";

const navTiles = [
  {
    description:
      "The principles that guide every decision, every client engagement, and every interaction — from Kia Pono to Kia Tūhono.",
    href: "/whoweare#values",
    label: "Explore values",
    name: "Our Values",
    number: "01",
  },
  {
    description:
      "The leaders and advisors who bring clarity, confidence, and deep expertise to every client relationship.",
    href: "/whoweare#people",
    label: "Meet the team",
    name: "Our People",
    number: "02",
  },
  {
    description:
      "How we hold ourselves accountable — the structures, standards, and commitments that keep us trustworthy.",
    href: "/whoweare#governance",
    label: "Read more",
    name: "Governance",
    number: "03",
  },
];

export default function WhoWeAreLanding() {
  return (
    <div id="section-wwa">
      <div className="wwa-landing-hero">
        <div className="wwa-hero-grid" />
        <div className="wwa-hero-glow" />
        <p className="lh-eyebrow">Who We Are</p>
        <h1 className="lh-title">
          Built on trust.
          <br />
          <em>Driven by people.</em>
        </h1>
        <p className="lh-body">
          At Saha, we help clients build trust and turn complexity into
          competitive advantage. We&apos;re passionate about helping businesses
          succeed, the public sector achieve more, and our communities to grow.
        </p>
      </div>

      <div className="wwa-nav-tiles">
        {navTiles.map((tile) => (
          <Link className="wwa-tile" href={tile.href} key={tile.href}>
            <p className="tile-num">{tile.number}</p>
            <h2 className="tile-name">{tile.name}</h2>
            <p className="tile-desc">{tile.description}</p>
            <span className="tile-link">
              {tile.label} <span className="tile-arr">→</span>
            </span>
          </Link>
        ))}
      </div>

      <section className="wwa-landing-section cream">
        <div className="ls-header">
          <div>
            <p className="ls-eyebrow">Our Values</p>
            <h2 className="ls-title">
              What we stand for, <em>every day.</em>
            </h2>
          </div>
          <Link className="ls-cta" href="/whoweare#values">
            View all values →
          </Link>
        </div>
        <div className="preview-grid-4">
          {wwaValueCards.map((value) => (
            <div className="value-card-wwa" key={value.maori}>
              <div className="vc-icon">{value.icon}</div>
              <div className="vc-maori">{value.maori}</div>
              <div className="vc-divider" />
              <div className="vc-english">{value.english}</div>
              <p className="vc-desc">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wwa-landing-section">
        <div className="ls-header">
          <div>
            <p className="ls-eyebrow">Our People</p>
            <h2 className="ls-title">
              Leadership that <em>shows up.</em>
            </h2>
          </div>
          <Link className="ls-cta" href="/whoweare#people">
            Meet the team →
          </Link>
        </div>
        <div className="preview-grid-2">
          {wwaPeople.map((person) => (
            <div className="person-mini" key={person.name}>
              <div>
                <h3>{person.name}</h3>
                <p className="role">{person.role}</p>
                <p>{person.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
