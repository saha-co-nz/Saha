import type { Metadata } from "next";

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
