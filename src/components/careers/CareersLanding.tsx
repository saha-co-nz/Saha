import Image from "next/image";
import Link from "next/link";

import CareersSimpleFooter from "./CareersSimpleFooter";
import {
  careersBadges,
  careersInternshipStreams,
  careersLandingStats,
  careersValueCards,
} from "./data";

export default function CareersLanding() {
  return (
    <div id="section-careers">
      <div id="careers-page-internship" className="page active">
        <section className="careers-hero">
          <div className="careers-hero-left">
            <div className="careers-hero-left-grid" />
            <div className="careers-hero-left-glow" />
            <p className="hero-tag">Where potential meets real opportunity</p>
            <h1 className="hero-title">
              Students
              <br />
              first.<em>Always.</em>
            </h1>
            <div className="hero-maori">
              <strong>He tangata, he tangata, he tangata</strong>
              It is the people, it is the people, it is the people. This is not
              just a value we put on a wall - it is how we actually work.
            </div>
            <div className="hero-scroll-hint">
              <span className="scroll-line" />
              Scroll to explore
            </div>
          </div>
          <div className="careers-hero-right" style={{ position: "relative" }}>
            <Image
              alt="Students collaborating at saha."
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              src="/careers-hero.jpg"
              style={{
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
              }}
            />
          </div>
        </section>

        <section className="intro-band">
          <div className="intro-stat">
            {careersLandingStats.map((stat) => (
              <div className="stat-item" key={stat.label}>
                <span className="stat-num">
                  {stat.value === "Day 1" ? (
                    <>
                      Day<span>&nbsp;1</span>
                    </>
                  ) : (
                    stat.value
                  )}
                </span>
                <span className="stat-text">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="intro-copy">
            <h2>Work with our actual clients - from day one.</h2>
            <p>
              We are proud to offer internship experiences that go beyond
              observation. You will contribute to real outcomes, work alongside
              people who give a damn, and grow in ways that go well beyond
              what&apos;s on your CV.
            </p>
            <p>
              Whether you are in your first year or finishing your degree, if
              you have the curiosity and the drive - we have the space for you.
            </p>
          </div>
        </section>

        <section className="values-section">
          <p className="section-label">Our values</p>
          <h2 className="section-title">
            What we believe - <em>and what you&apos;ll live.</em>
          </h2>
          <div className="values-grid-careers">
            {careersValueCards.map((card) => (
              <div className="value-card-careers" key={card.maori}>
                <p className="value-num">{card.number}</p>
                <h3 className="value-maori">{card.maori}</h3>
                <div className="value-dash" />
                <p className="value-english">{card.english}</p>
                <p className="value-desc">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="areas-section">
          <div className="areas-photo">
            <div
              className="areas-photo-img"
              style={{ background: "none", inset: 0, position: "absolute" }}
            >
              <Image
                alt="Collaboration at saha."
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                src="/careers-streams.jpg"
                style={{
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "100%",
                }}
              />
            </div>
            <div className="areas-photo-overlay" />
            <div className="areas-photo-tag">Collaboration at saha.</div>
          </div>
          <div className="areas-content">
            <p className="section-label">Where you&apos;ll work</p>
            <h2 className="section-title">
              Internship <em>streams</em>
            </h2>
            <div className="area-list">
              {careersInternshipStreams.map((stream) => (
                <Link className="area-item" href={stream.href} key={stream.title}>
                  <div className="area-icon">{stream.icon}</div>
                  <div className="area-info">
                    <h4>{stream.title}</h4>
                    <p>{stream.description}</p>
                  </div>
                  <span className="area-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="looking-section">
          <div className="looking-copy">
            <p className="section-label">Who we want</p>
            <h2 className="section-title">
              You don&apos;t need experience. <em>You need drive.</em>
            </h2>
            <p>
              We are looking for students who are curious, motivated, and ready
              to show up. First year or final year - if you are ready to do
              real work, we are ready for you.
            </p>
            <p>
              We want you to leave with a deeper understanding of your field, a
              genuine sense of what it means to do good work, and the
              confidence that comes from knowing you contributed to something
              real.
            </p>
          </div>
          <div className="looking-badges">
            {careersBadges.map((badge) => (
              <div className="badge" key={badge.title}>
                <div className="badge-icon">{badge.icon}</div>
                <div className="badge-text">
                  <h4>{badge.title}</h4>
                  <p>{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-grid-bg" />
          <div className="cta-inner">
            <p className="cta-eyebrow">Ready to start?</p>
            <h2 className="cta-title">
              Gain experience that actually <em>means something.</em>
            </h2>
            <p className="cta-sub">
              Giving back to students is not a side thought at Saha - it is a
              priority. The best way to build a great company is to build great
              people along the way.
            </p>
            <div className="cta-buttons">
              <Link className="btn-primary-careers" href="/careers#apply">
                Apply Now →
              </Link>
              <Link className="btn-secondary-careers" href="/contactus">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        <CareersSimpleFooter note="© 2026 Saha NZ Limited - Students first, always." />
      </div>
    </div>
  );
}
