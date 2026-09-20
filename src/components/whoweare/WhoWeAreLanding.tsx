import Link from "next/link";

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

    </div>
  );
}
