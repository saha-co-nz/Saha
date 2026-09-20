import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/src/components/common/Footer";
import Header from "@/src/components/common/Header";
import MailSorter from "@/src/components/case-studies/MailSorter";
import OwairoaBoardReporting from "@/src/components/case-studies/OwairoaBoardReporting";
import SalesAgent from "@/src/components/case-studies/SalesAgent";

import "../globals.css";
import "../tokens.css";
import "@/src/components/case-studies/agent-showcase.css";

export const metadata: Metadata = {
  description:
    "Three AI agents Saha designed, built and runs — a board reporting system for an Auckland primary school, and the mail triage and sales research agents we built for ourselves first.",
  title: "Case Studies | Saha",
};

/* A contents strip so the page can be read at a glance. Three full case
   studies is roughly four thousand pixels of scroll, and without this the
   only way to find out what is on the page is to scroll all of it. Each
   figure here is the same one the case study itself reports. */
const contents = [
  {
    href: "#board-reporting",
    index: "01",
    name: "Board reporting",
    stat: "27–36 hours a year",
    statNote: "Preparation removed, across nine board meetings",
    tag: "Client engagement",
  },
  {
    href: "#mail-sorter",
    index: "02",
    name: "Mail sorter",
    stat: "12 emails in 24 hours",
    statNote: "Classified and routed before anyone opened the inbox",
    tag: "Internal ops",
  },
  {
    href: "#sales-agent",
    index: "03",
    name: "Sales agent",
    stat: "5–8 hours a week",
    statNote: "Returned across research, outreach and CRM admin",
    tag: "Internal ops",
  },
];

export default function CaseStudiesPage() {
  return (
    <div>
      <Header />
      <div className="cs-page">
        <header className="cs-page__head">
          <p className="cs-page__eyebrow">What we&rsquo;ve built</p>
          <h1 className="cs-page__title">
            Working software, <em>not slideware.</em>
          </h1>
          <p className="cs-page__lede">
            Most AI consultancies show you a strategy deck. These are three
            agents we designed, built and run — one for a client, two for
            ourselves. Every screen below is the real interface, with the data
            replaced.
          </p>

          {/* A div rather than <nav>: globals.css styles the bare `nav`
              element as the fixed site header (twice over — position, height,
              background and backdrop-filter), so any <nav> on the site becomes
              a 64px dark overlay. role="navigation" keeps the landmark. */}
          <div
            aria-label="Case studies"
            className="cs-contents"
            role="navigation"
          >
            {contents.map((item) => (
              <Link className="cs-contents__item" href={item.href} key={item.href}>
                <span className="cs-contents__index">{item.index}</span>
                <span className="cs-contents__tag">{item.tag}</span>
                <span className="cs-contents__name">{item.name}</span>
                <span className="cs-contents__stat">{item.stat}</span>
                <span className="cs-contents__note">{item.statNote}</span>
              </Link>
            ))}

            <div className="cs-contents__item cs-contents__item--soon">
              <span className="cs-contents__index">04</span>
              <span className="cs-contents__tag">Coming soon</span>
              <span className="cs-contents__name">
                A fourth story, in progress
              </span>
              <span className="cs-contents__note">
                We&rsquo;re writing this one up properly rather than rushing it.
                Check back shortly, or ask us directly.
              </span>
            </div>
          </div>
        </header>

        <div className="cs-page__stack">
          <OwairoaBoardReporting />
          <MailSorter />
          <SalesAgent />
        </div>
      </div>
      <Footer />
    </div>
  );
}
