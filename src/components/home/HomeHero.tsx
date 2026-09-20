import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="hero">
      <div className="hero-img" />
      <div className="hero-gradient" />
      <div className="hero-grain" />
      <div className="hero-content">
        <p className="hero-location">Auckland, New Zealand</p>
        <h1 className="hero-headline">
          We build AI
          <br />
          <em>that actually gets used.</em>
        </h1>
        <p className="hero-sub">
          Saha is an AI consultancy in Auckland. We build the systems ourselves
          before we sell them — so when we tell you something works, it is
          because it is already running in our own business, or in a client&apos;s.
        </p>
        <div className="hero-actions">
          <Link className="btn-hero-primary" href="/contactus">
            Contact us →
          </Link>
          <Link className="btn-hero-secondary" href="/case-studies">
            See what we&apos;ve built ↓
          </Link>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-text">Scroll</span>
      </div>
    </section>
  );
}
