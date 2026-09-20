/* Australasia-centred, not a world map.

   A world map at this width is roughly 275px tall, mostly ocean, and renders
   New Zealand about eight pixels across — it would fill the empty column with
   a picture whose subject is invisible. Centring on Australasia makes the
   market the subject and keeps the factual surface to a handful of named
   regimes rather than a claim about every country.

   The coastlines are deliberately simplified: this is a diagram, not an
   atlas. Coordinates are real longitude/latitude, projected below, so the
   shapes stay honest even though the outlines are coarse.

   REVIEW DATE MATTERS. Everything here is a statement about law, and AI
   regulation moves quickly. AS_AT renders on the page. Re-check before it
   goes stale, and keep the wording indicative rather than advisory — the
   footer disclaimer says Saha does not give regulated advice. */

const AS_AT = "September 2026";

/* Equirectangular, tuned to frame Australia and New Zealand. */
const LON_MIN = 110;
const LON_MAX = 182;
const LAT_MAX = -8;
const LAT_MIN = -50;
const W = 560;
const H = 360;

const x = (lon: number) => ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W;
const y = (lat: number) => ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;
const path = (pts: [number, number][]) =>
  pts.map(([lon, lat]) => `${x(lon).toFixed(1)},${y(lat).toFixed(1)}`).join(" ");

const AUSTRALIA: [number, number][] = [
  [142.5, -10.7], [145.3, -15.0], [146.3, -18.6], [149.0, -21.0],
  [153.0, -25.9], [153.6, -28.6], [151.3, -33.9], [150.0, -37.5],
  [146.3, -38.9], [140.9, -38.1], [138.5, -35.6], [137.0, -35.0],
  [135.9, -34.9], [134.0, -32.6], [129.0, -31.7], [123.5, -34.0],
  [117.9, -35.1], [115.0, -34.3], [115.7, -31.9], [113.7, -26.0],
  [114.1, -22.3], [118.0, -20.4], [122.2, -18.1], [125.0, -16.4],
  [128.5, -15.3], [130.8, -12.4], [132.5, -12.2], [135.5, -12.2],
  [136.8, -15.5], [139.5, -17.5], [141.6, -15.0],
];

const TASMANIA: [number, number][] = [
  [144.7, -40.7], [148.3, -40.8], [148.3, -42.9], [146.9, -43.6],
  [145.5, -43.0], [144.6, -41.2],
];

const NZ_NORTH: [number, number][] = [
  [172.7, -34.4], [174.5, -35.2], [175.5, -36.4], [176.2, -37.0],
  [178.5, -37.6], [177.9, -39.3], [176.9, -40.4], [175.3, -41.6],
  [174.6, -41.3], [174.8, -40.0], [174.0, -39.5], [174.6, -38.8],
  [174.8, -37.0], [173.0, -35.1],
];

const NZ_SOUTH: [number, number][] = [
  [172.6, -40.5], [174.3, -41.7], [174.0, -42.5], [173.0, -43.4],
  [171.3, -44.4], [170.9, -45.9], [168.4, -46.6], [166.5, -45.9],
  [167.4, -44.6], [170.0, -43.0], [171.5, -41.8],
];

/* Only regimes that actually reach a New Zealand business are named. Each
   line is deliberately descriptive, not advice. */
const MARKERS = [
  {
    body: "No standalone AI statute. Existing law applies — the Privacy Act 2020, the Fair Trading Act, sector regulators.",
    lat: -41.0,
    lon: 174.2,
    place: "left" as const,
    title: "New Zealand",
    tone: "home" as const,
  },
  {
    body: "No standalone AI statute. Government consultation on mandatory guardrails for high-risk settings.",
    lat: -25.5,
    lon: 133.5,
    place: "left" as const,
    title: "Australia",
    tone: "near" as const,
  },
];

/* Offshore regimes shown as edge markers rather than drawn territory — they
   matter here because of their reach, not their geography. */
const OFFSHORE = [
  {
    body: "The EU AI Act reaches providers outside the EU whose systems are used there.",
    title: "European Union",
  },
  {
    body: "No single federal AI statute; state-level law and sector rules apply.",
    title: "United States",
  },
];

export default function RegulatoryMap() {
  return (
    <figure className="reg-map">
      <figcaption className="reg-map__cap">
        <span className="reg-map__cap-title">
          The rules that reach an Auckland business
        </span>
        <span className="reg-map__cap-note">
          Indicative only, as at {AS_AT}. Not legal advice.
        </span>
      </figcaption>

      <svg
        aria-label="Australia and New Zealand, with the AI regulatory regimes that reach a New Zealand business."
        className="reg-map__svg"
        role="img"
        viewBox={`0 0 ${W} ${H}`}
      >
        <defs>
          <linearGradient id="regSea" x1="0" x2="0.6" y1="0" y2="1">
            <stop offset="0%" stopColor="#12203f" />
            <stop offset="100%" stopColor="#0a1628" />
          </linearGradient>
        </defs>

        <rect fill="url(#regSea)" height={H} width={W} />

        {/* Graticule — reads as a chart rather than decoration. */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
          {[120, 135, 150, 165, 180].map((lon) => (
            <line key={lon} x1={x(lon)} x2={x(lon)} y1={0} y2={H} />
          ))}
          {[-15, -25, -35, -45].map((lat) => (
            <line key={lat} x1={0} x2={W} y1={y(lat)} y2={y(lat)} />
          ))}
        </g>

        <g className="reg-map__land">
          <polygon points={path(AUSTRALIA)} />
          <polygon points={path(TASMANIA)} />
        </g>
        <g className="reg-map__land reg-map__land--home">
          <polygon points={path(NZ_NORTH)} />
          <polygon points={path(NZ_SOUTH)} />
        </g>

        {MARKERS.map((m) => (
          <circle
            className={`reg-map__dot reg-map__dot--${m.tone}`}
            cx={x(m.lon)}
            cy={y(m.lat)}
            key={m.title}
            r="4"
          />
        ))}
      </svg>

      <ul className="reg-map__key">
        {MARKERS.map((m) => (
          <li className={`reg-map__item reg-map__item--${m.tone}`} key={m.title}>
            <span className="reg-map__item-title">{m.title}</span>
            <span className="reg-map__item-body">{m.body}</span>
          </li>
        ))}
        {OFFSHORE.map((o) => (
          <li className="reg-map__item reg-map__item--offshore" key={o.title}>
            <span className="reg-map__item-title">{o.title}</span>
            <span className="reg-map__item-body">{o.body}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
