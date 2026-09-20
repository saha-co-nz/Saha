import type { Metadata } from "next";

import Footer from "@/src/components/common/Footer";
import Header from "@/src/components/common/Header";
import "../globals.css";
import "./kali.css";

const KALI_URL = "https://www.kali-foundation.com";

/* Kali used to run Fraunces + Inter, a fourth and fifth family on top of the
   site's own. It now shares the global display and body faces, and keeps its
   separation through colour and type TREATMENT instead — see kali.css, where
   the display face is set in italic at a lighter weight than Saha uses it.
   Sage and the warmer paper do the rest of the work. */

export const metadata: Metadata = {
  description:
    "Kali Foundation is Saha's not-for-profit arm, helping New Zealand charities, schools and community organisations use AI carefully — as a support layer for admin and reporting, not a replacement for people.",
  title: "Kali Foundation | Saha",
};

const highlights = [
  {
    description:
      "Built for volunteer boards, tight budgets and funder reporting cycles — not adapted from corporate advice.",
    icon: "🌱",
    title: "Sector-first",
  },
  {
    description:
      "AI drafts, summarises and spots patterns. A board, not an algorithm, makes the call.",
    icon: "🤝",
    title: "Human oversight",
  },
  {
    description:
      "We'd rather teach your team something they still use in two years than sell them something they're stuck with.",
    icon: "🎓",
    title: "Capability, not dependency",
  },
];

const cards = [
  {
    description:
      "A short, scoped engagement that looks at your workflows, data, team confidence and governance position — and hands back an honest picture of where AI could help, where it can't, and what order to tackle things in.",
    icon: "🧭",
    title: "AI Readiness Assessment",
  },
  {
    description:
      "The repetitive work: the same report reformatted five ways, the inbox triaged every morning, the spreadsheet that's really three spreadsheets stitched together by hand.",
    icon: "⚙️",
    title: "AI Automation",
  },
  {
    description:
      "Support that scales up and down month to month — someone to call when a question comes up. Is this tool safe to use? Would it actually save time? What should our AI policy say?",
    icon: "🔄",
    title: "Ongoing Consulting",
  },
  {
    description:
      "Privacy, data security and governance treated as the starting point rather than the paperwork at the end — including honest advice about where AI shouldn't be used at all.",
    icon: "🛡️",
    title: "Responsible AI & Governance",
  },
];

export default function KaliPage() {
  return (
    <div>
      <Header />
      <div className="kali-page">
        <section className="kali-hero">
          <div className="kali-wrap kali-hero__grid">
            <div>
              <div className="kali-lockup">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <defs>
                    <linearGradient id="kfMark" x1="0" y1="0" x2="0.85" y2="1">
                      <stop offset="0%" stopColor="#7C9A6C" />
                      <stop offset="55%" stopColor="#5C7A4E" />
                      <stop offset="100%" stopColor="#3E5836" />
                    </linearGradient>
                  </defs>
                  <rect width="48" height="48" rx="13" fill="url(#kfMark)" />
                  <rect
                    x="10.5"
                    y="33"
                    width="27"
                    height="4.6"
                    rx="2.3"
                    fill="#FFFFFF"
                    opacity="0.96"
                  />
                  <rect
                    x="13.5"
                    y="25.6"
                    width="21"
                    height="4.6"
                    rx="2.3"
                    fill="#FFFFFF"
                    opacity="0.62"
                  />
                  <rect
                    x="16.5"
                    y="18.2"
                    width="15"
                    height="4.6"
                    rx="2.3"
                    fill="#FFFFFF"
                    opacity="0.36"
                  />
                  <g transform="rotate(-14 24 13)">
                    <path
                      d="M24 6.6 C28.9 9.7 28.9 15.4 24 18.6 C19.1 15.4 19.1 9.7 24 6.6 Z"
                      fill="#FFFFFF"
                      opacity="0.97"
                    />
                    <path
                      d="M24 9 V16.6"
                      stroke="#5C7A4E"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      opacity="0.55"
                    />
                  </g>
                </svg>
                <span className="kali-lockup__text">
                  <span className="kali-lockup__name">Kali</span>
                  <span className="kali-lockup__sub">Foundation</span>
                </span>
              </div>
              <p className="kali-eyebrow">Our not-for-profit arm</p>
              <h1>
                Strengthening the organisations that{" "}
                <em>strengthen our communities.</em>
              </h1>
              <p className="kali-lede">
                Kali Foundation helps New Zealand charities, schools and
                community organisations use AI carefully — as a support layer
                for admin, reporting and everyday workflows, never as a
                replacement for the people doing the work.
              </p>
            </div>
            <div className="kali-highlights">
              {highlights.map((item) => (
                <div className="kali-highlight" key={item.title}>
                  <span className="kali-highlight__icon">{item.icon}</span>
                  <span className="kali-highlight__body">
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="kali-section kali-section--sage">
          <div className="kali-wrap">
            <div className="kali-intro">
              <p className="kali-eyebrow">What Kali Foundation does</p>
              <h2>
                Practical help, <em>with the load they already have.</em>
              </h2>
              <p>
                Most not-for-profits are running on less than they need.
                Reporting to multiple funders, chasing the same information
                across different spreadsheets, writing the same update for the
                fifth time this quarter. None of it is the mission — all of it
                takes time away from the mission.
              </p>
            </div>
            <div className="kali-grid">
              {cards.map((card) => (
                <article className="kali-card" key={card.title}>
                  <div className="kali-card__icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="kali-cta">
          <div className="kali-wrap kali-cta__inner">
            <div>
              <h2>Visit Kali Foundation</h2>
              <p>
                Kali Foundation has its own site, with the full picture of how
                it works, who it&apos;s for, and the story behind it.
              </p>
            </div>
            <a
              className="kali-btn"
              href={KALI_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Open kali-foundation.com →
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
