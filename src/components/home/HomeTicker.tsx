/* Three capabilities, matching the services collapse. This previously listed
   career coaching, life coaching, study coaching, social skills, SEO,
   e-commerce and social media — all part of the personal and digital
   practices that have been cut. */
const tickerItems = [
  "AI Strategy & Advisory",
  "Implementation & Automation",
  "Enablement & Upskilling",
];

const tickerContent = `${tickerItems.join(" — ")} — `;

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
