import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="cta-section reveal">
      <div className="cta-bg-circle1" />
      <div className="cta-bg-circle2" />
      <div className="cta-bg-circle3" />
      <p className="cta-eyebrow">Ready when you are</p>
      <h2 className="cta-heading">
        Let&apos;s build
        <br />
        something
        <br />
        <em>that lasts.</em>
      </h2>
      <p className="cta-sub">
        Tell us about yourself or your business and what you&apos;re working
        toward. We&apos;ll come back to you within one business day — no jargon,
        no obligation.
      </p>
      <div className="cta-actions">
        <Link className="btn-cta" href="/contactus">
          Contact us →
        </Link>
        <Link className="btn-cta-outline" href="/careers">
          View careers
        </Link>
      </div>
    </section>
  );
}
