import { CAPABILITY_NAMES } from "@/src/lib/capabilities";

/* Names come from the shared source. This previously listed career coaching,
   life coaching, study coaching, social skills, SEO, e-commerce and social
   media — all cut services, still scrolling on the homepage. */
const tickerContent = `${CAPABILITY_NAMES.join(" — ")} — `;

export default function HomeTicker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-track" id="ticker">
        <div className="ticker-item">{tickerContent.repeat(3)}</div>
        <div aria-hidden="true" className="ticker-item">
          {tickerContent.repeat(3)}
        </div>
      </div>
    </div>
  );
}
