import Link from "next/link";

import { wwaPeople } from "./data";

type PeoplePageProps = {
  /** Folded into /whoweare as a section — demotes the heading from h1. */
  asSection?: boolean;
};

export default function PeoplePage({ asSection = false }: PeoplePageProps) {
  const Heading = asSection ? "h2" : "h1";

  return (
    <div id="people">
      <div className="people-hero">
        <div className="people-hero-grid" />
        <div className="people-hero-glow" />
        <div className="ph-inner">
          <p className="ph-eyebrow">Our People</p>
          <Heading className="ph-title">
            Leadership that <em>shows up.</em>
          </Heading>
          <p className="ph-body">
            Our team brings together expertise across AI, personal development,
            and digital consulting. What ties us together isn&apos;t just
            experience — it&apos;s a shared commitment to doing right by our
            clients and each other.
          </p>
        </div>
      </div>

      <section className="people-section">
        <div className="people-grid">
          {wwaPeople.map((person) => (
            <div className="person-card" key={person.name}>
              <div className="person-card-top">
                <div className="person-card-top-overlay" />
                <div className="person-card-name-overlay">
                  <h3>{person.name}</h3>
                  <span className="role">{person.role}</span>
                </div>
              </div>
              <div className="person-card-body">
                <p className="person-bio">{person.bio}</p>
                <div className="person-contacts">
                  <div className="person-contact-item">
                    <span className="ci-icon">📞</span>
                    <span>{person.phone}</span>
                  </div>
                  <div className="person-contact-item">
                    <span className="ci-icon">✉️</span>
                    <span>{person.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="people-note">
          <p>
            <strong>Growing our team.</strong> We&apos;re always open to
            connecting with talented people who share our values. If you&apos;re
            curious about working with Saha — whether as a future team member or
            an intern — we&apos;d love to hear from you.
          </p>
          <Link className="ls-cta" href="/careers">
            View internships →
          </Link>
        </div>
      </section>
    </div>
  );
}
