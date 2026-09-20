"use client";

import { useEffect, useRef, useState } from "react";

/* ALL SENDERS AND SUBJECTS BELOW ARE INVENTED.

   Every real-world domain from the original mockup has been replaced. The two
   called out in the brief were bnz.co.nz and veiraglobal.com, but the same
   reasoning applies to the rest of it — xero.com, vodafone.co.nz,
   booking.com, techcrunch.com, github.com and slack.com were all real
   companies shown next to fabricated subject lines, which implies commercial
   relationships and, in the overdue-invoice case, a fabricated debt.

   Live Saha addresses (business@ and dan@) are gone too. Internal senders are
   shown by first name with an "Internal" tag and no address at all. */

type Mail = {
  from: string;
  internal?: boolean;
  confidence: number;
  subject: string;
  /** Below the filing threshold — routed to a person instead. */
  handoff?: boolean;
};

const quadrants: {
  key: string;
  label: string;
  mails: Mail[];
  variant: string;
}[] = [
  {
    key: "critical",
    label: "Urgent & important",
    mails: [
      {
        confidence: 99,
        from: "claire@harbourside-legal.co.nz",
        subject: "Contract counter-signature needed by 5pm",
      },
      {
        confidence: 96,
        from: "Dan",
        internal: true,
        subject: "Client proposal — needs sign-off today",
      },
    ],
    variant: "critical",
  },
  {
    key: "schedule",
    label: "Important, not urgent",
    mails: [
      {
        confidence: 95,
        from: "priya@tasman-ridge.co.nz",
        subject: "Coffee next week — growth discussion",
      },
      {
        confidence: 91,
        from: "j.okafor@northvale-capital.co.nz",
        subject: "Q4 facility review — schedule a call",
      },
      {
        confidence: 88,
        from: "Sarah",
        internal: true,
        subject: "Draft newsletter for review",
      },
      {
        confidence: 61,
        from: "hello@kowhai-property.co.nz",
        handoff: true,
        subject: "Re: the thing we discussed",
      },
    ],
    variant: "schedule",
  },
  {
    key: "delegate",
    label: "Urgent, not important",
    mails: [
      {
        confidence: 97,
        from: "billing@ledgerline.app",
        subject: "Invoice #4471 — payment due",
      },
      {
        confidence: 93,
        from: "accounts@connectiv.co.nz",
        subject: "August bill ready to view",
      },
      {
        confidence: 89,
        from: "bookings@staywise.travel",
        subject: "Booking confirmed — check-in tomorrow",
      },
    ],
    variant: "delegate",
  },
  {
    key: "ignore",
    label: "Neither",
    mails: [
      {
        confidence: 98,
        from: "hello@thesignal.news",
        subject: "This week in AI — weekly newsletter",
      },
      {
        confidence: 96,
        from: "alerts@repohost.dev",
        subject: "Automated security advisory",
      },
      {
        confidence: 94,
        from: "digest@teamloop.app",
        subject: "Weekly activity digest",
      },
    ],
    variant: "ignore",
  },
];

/* The "before" pile is deliberately the same messages in arrival order, so the
   toggle shows one inbox in two states rather than two different inboxes. */
const arrivalOrder = [0, 5, 9, 1, 12, 6, 2, 10, 3, 13, 7, 4, 11, 8];

const pile: Mail[] = (() => {
  const flat = quadrants.flatMap((quadrant) => quadrant.mails);

  return arrivalOrder
    .filter((index) => index < flat.length)
    .map((index) => flat[index]);
})();

export default function MailSorterBody() {
  const [view, setView] = useState<"after" | "before">("after");
  const [animate, setAnimate] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = gridRef.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [view]);

  return (
    <div>
      <div className="as-toggle" role="group" aria-label="Inbox view">
        <button
          aria-pressed={view === "before"}
          className="as-toggle__btn"
          onClick={() => setView("before")}
          type="button"
        >
          Before
        </button>
        <button
          aria-pressed={view === "after"}
          className="as-toggle__btn"
          onClick={() => setView("after")}
          type="button"
        >
          After
        </button>
      </div>

      {view === "before" ? (
        <div className="as-pile">
          {pile.map((mail) => (
            <div className="as-pile__row" key={mail.from + mail.subject}>
              <span className="as-pile__from">
                {mail.internal ? (
                  <span className="as-mail__internal">Internal</span>
                ) : null}
                {mail.from}
              </span>
              <span className="as-pile__subj">{mail.subject}</span>
            </div>
          ))}
          <div className="as-pile__fade">
            Everything, in arrival order, ranked by nothing.
          </div>
        </div>
      ) : (
        <div
          className="as-quadrants"
          data-animate={animate ? "true" : undefined}
          ref={gridRef}
        >
          {quadrants.map((quadrant) => (
            <div
              className={`as-quadrant as-quadrant--${quadrant.variant}`}
              key={quadrant.key}
            >
              <div className="as-quadrant__head">
                <span className="as-col-head__name">{quadrant.label}</span>
                <span className="as-col-head__count">
                  ({quadrant.mails.length})
                </span>
              </div>
              {quadrant.mails.map((mail, index) => (
                <div
                  className={`as-mail${mail.handoff ? " as-mail--handoff" : ""}`}
                  key={mail.from + mail.subject}
                  style={
                    animate ? { animationDelay: `${index * 70}ms` } : undefined
                  }
                >
                  <div className="as-mail__top">
                    <span className="as-mail__from">
                      {mail.internal ? (
                        <span className="as-mail__internal">Internal</span>
                      ) : null}
                      {mail.from}
                    </span>
                    <span className="as-conf">{mail.confidence}%</span>
                  </div>
                  <p className="as-mail__subj">{mail.subject}</p>
                  {mail.handoff ? (
                    <span className="as-mail__handoff-note">
                      Below threshold — sent to a person, not filed.
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
