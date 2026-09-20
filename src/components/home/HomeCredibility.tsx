import Link from "next/link";

/* Four facts that only connect for Saha. Individually each is a line buried
   on a different page; together they are the reason a school board picks Saha
   over a generic agency. This sits directly under the hero deliberately —
   it is the positioning, not a footnote. */
const chain = [
  {
    body: "Satyam is a chartered accountant who audits New Zealand schools and charities at UHY Haines Norton in Auckland.",
    label: "The background",
  },
  {
    body: "Kali Foundation, our not-for-profit arm, works with exactly those organisations — schools, charities, community groups.",
    label: "The same sector",
    href: "/kali",
    linkText: "Kali Foundation →",
  },
  {
    body: "Our AI readiness assessment was built and proven on Kali Foundation schools before it was ever offered to a business.",
    label: "The same assessment",
  },
  {
    body: "The board reporting agent we run for an Auckland primary school carries a review module built on five years of Auditor-General school audit findings.",
    label: "The same standard",
    href: "/case-studies",
    linkText: "See it running →",
  },
];

export default function HomeCredibility() {
  return (
    <section className="credibility reveal">
      <div className="credibility-inner">
        <div className="credibility-head">
          <p className="credibility-eyebrow">Why us, specifically</p>
          <h2 className="credibility-title">
            An auditor&apos;s standard,
            <br />
            <em>applied to AI.</em>
          </h2>
          <p className="credibility-body">
            Most AI consultancies can tell you what a model does. Very few can
            tell you whether the output would survive an audit. That is the
            whole difference, and it is not a claim we invented for the website
            — it is where we came from.
          </p>
        </div>

        <ol className="credibility-chain">
          {chain.map((step) => (
            <li className="credibility-step" key={step.label}>
              <span className="credibility-step-label">{step.label}</span>
              <p className="credibility-step-body">{step.body}</p>
              {step.href ? (
                <Link className="credibility-step-link" href={step.href}>
                  {step.linkText}
                </Link>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
