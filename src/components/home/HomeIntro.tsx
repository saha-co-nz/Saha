import Link from "next/link";

import { CAPABILITIES } from "@/src/lib/capabilities";

export default function HomeIntro() {
  return (
    <section className="intro reveal">
      <div className="intro-left">
        <p className="intro-eyebrow">About saha.</p>
        <h2 className="intro-heading">
          One firm.
          <br />
          <em>One discipline.</em>
        </h2>
        <p className="intro-body">
          Most AI consultants sell strategy decks. We sell things that run.
          Every project starts from the same question: does this actually save
          time or make money, or is it just a slide? Three capabilities, one
          discipline, no hedging.
        </p>
        <Link className="intro-cta" href="/case-studies">
          See what we&apos;ve built →
        </Link>
      </div>

      <div className="intro-right">
        {CAPABILITIES.map((capability) => (
          <Link
            className="intro-service-row"
            href="/services"
            key={capability.name}
          >
            <div>
              <div className="intro-service-name">{capability.name}</div>
              <div className="intro-service-tag">{capability.tag}</div>
            </div>
            <span className="intro-service-arr">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
