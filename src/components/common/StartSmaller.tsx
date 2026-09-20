import Link from "next/link";

/* The two low-commitment ways in. Appears on both the homepage and the
   services page in the design source.

   The Kali routing is the commercially useful part: charities and schools are
   sent to the not-for-profit arm rather than turned away, which keeps the
   business pipeline clean without losing the relationship. */
const offers = [
  {
    body: "The same assessment we run for Kali Foundation schools, adapted for business. We look at where AI could actually help and tell you honestly if it's worth pursuing yet.",
    cta: "Request assessment",
    tag: "Free",
    title: "AI Readiness Assessment",
  },
  {
    body: "A straight conversation about what's actually possible for your business. Charities and schools go through Kali Foundation instead of this form.",
    cta: "Book a time",
    tag: "Free · Business clients",
    title: "1-Hour Consultation",
  },
];

export default function StartSmaller() {
  return (
    <section className="start-smaller">
      <div className="start-smaller-inner">
        <p className="section-label">Get started</p>
        <h2 className="section-title white">
          Not ready for a full engagement?
          <br />
          <em>Start smaller.</em>
        </h2>

        <div className="offer-grid">
          {offers.map((offer) => (
            <article className="offer-card" key={offer.title}>
              <span className="offer-tag">{offer.tag}</span>
              <h3 className="offer-title">{offer.title}</h3>
              <p className="offer-body">{offer.body}</p>
              <Link className="offer-cta" href="/contactus">
                {offer.cta} →
              </Link>
            </article>
          ))}
        </div>

        <p className="offer-note">
          Charities, schools and community organisations are looked after
          through <Link href="/kali">Kali Foundation</Link>, our not-for-profit
          arm — that is where those engagements live.
        </p>
      </div>
    </section>
  );
}
