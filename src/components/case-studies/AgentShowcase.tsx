import type { ReactNode } from "react";

/* Shared chrome for every agent case study. The three agents differ only in
   what goes in `children` — everything around it is identical so they read as
   one product family rather than three one-off screenshots. */

export type StatFigure = {
  value: string;
  /** Rendered smaller alongside the value, e.g. "hours". */
  unit?: string;
  caption: string;
};

export type DerivedFigure = StatFigure & {
  /** Required by design. A derived number without its basis visible on the
      page is worse than no number — see the standing no-invented-stats rule. */
  assumption: string;
};

export type AgentStat =
  | {
      kind: "figures";
      primary: StatFigure;
      secondary?: StatFigure;
      derived?: DerivedFigure;
      /** Badge text shown when the figure is not yet firm. The wording
          differs by case — a client engagement awaiting sign-off is not the
          same as an internal estimate that was never instrumented. */
      provisional?: string;
    }
  | {
      /** Used when real numbers are not yet available. Carries a claim that is
          verifiable from what is already on screen. Never a placeholder. */
      kind: "fallback";
      claim: string;
    };

export type AgentAction = {
  label: string;
  variant?: "plain" | "ghost" | "solid";
};

export type AgentShowcaseProps = {
  /** "01" / "02" / "03" — gives the three a visible sequence. */
  index: string;
  /** Anchor target, so the contents strip at the top can jump here. */
  id: string;
  eyebrow: string;
  headline: ReactNode;
  lede: string;
  /** Window chrome. */
  product: string;
  title: string;
  actions?: AgentAction[];
  status: string;
  /** The line under the frame: what this replaced. */
  replaced: string;
  /** Required. Either real figures or an explicit fallback claim. */
  stat: AgentStat;
  /** Disclosure shown when the figures on screen are synthetic. */
  syntheticNote?: string;
  children: ReactNode;
};

function StatBlock({ stat }: { stat: AgentStat }) {
  if (stat.kind === "fallback") {
    return (
      <div>
        <p className="as-result__label">The result</p>
        <p className="as-stat--fallback">{stat.claim}</p>
      </div>
    );
  }

  return (
    <div>
      <p className="as-result__label">The result</p>

      <span className="as-stat__primary">
        {stat.primary.value}
        {stat.primary.unit ? (
          <span className="as-stat__unit"> {stat.primary.unit}</span>
        ) : null}
      </span>
      <p className="as-stat__caption">{stat.primary.caption}</p>

      {stat.secondary ? (
        <>
          <span className="as-stat__secondary">{stat.secondary.value}</span>
          <p className="as-stat__caption">{stat.secondary.caption}</p>
        </>
      ) : null}

      {stat.derived ? (
        <div className="as-stat__derived">
          <span className="as-stat__derived-value">
            {stat.derived.value}
            {stat.derived.unit ? ` ${stat.derived.unit}` : ""}
          </span>
          <p className="as-stat__caption">{stat.derived.caption}</p>
          <p className="as-stat__assumption">{stat.derived.assumption}</p>
        </div>
      ) : null}

      {stat.provisional ? (
        <span className="as-stat__provisional">{stat.provisional}</span>
      ) : null}
    </div>
  );
}

export default function AgentShowcase({
  index,
  id,
  eyebrow,
  headline,
  lede,
  product,
  title,
  actions = [],
  status,
  replaced,
  stat,
  syntheticNote,
  children,
}: AgentShowcaseProps) {
  return (
    <section className="agent-showcase" id={id}>
      <div className="as-inner">
      {/* Headline and the number sit together, above the screenshot. The
          figure used to live at the very bottom, after the frame, which put
          the payoff last and buried it. */}
      <header className="as-head">
        <div className="as-head__main">
          <div className="as-head__tag">
            <span className="as-index">{index}</span>
            <p className="as-eyebrow">{eyebrow}</p>
          </div>
          <h2 className="as-headline">{headline}</h2>
          <p className="as-lede">{lede}</p>
        </div>
        <aside className="as-head__stat">
          <StatBlock stat={stat} />
        </aside>
      </header>

      <div className="as-frame">
        <div className="as-frame__head">
          <div>
            <p className="as-frame__product">{product}</p>
            <p className="as-frame__title">{title}</p>
          </div>
          {actions.length > 0 ? (
            <div className="as-frame__actions">
              {actions.map((action) => (
                <span
                  className={`as-btn${
                    action.variant && action.variant !== "plain"
                      ? ` as-btn--${action.variant}`
                      : ""
                  }`}
                  key={action.label}
                >
                  {action.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="as-frame__status">
          <span className="as-frame__status-dot" aria-hidden="true" />
          <span>{status}</span>
        </div>

        <div className="as-frame__body">{children}</div>

        {syntheticNote ? (
          <p className="as-synthetic">
            <strong>Synthetic data</strong>
            <span>{syntheticNote}</span>
          </p>
        ) : null}
      </div>

      <div className="as-replaced">
        <p className="as-result__label">What it replaced</p>
        <p className="as-result__replaced">{replaced}</p>
      </div>
      </div>
    </section>
  );
}
