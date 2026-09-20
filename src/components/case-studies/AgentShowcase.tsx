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
      /** Renders a visible badge when the figure is not yet client-confirmed. */
      provisional?: boolean;
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
  eyebrow: string;
  headline: ReactNode;
  lede: string;
  /** Window chrome. */
  product: string;
  address: string;
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
        <span className="as-stat__provisional">
          Provisional — pending client confirmation
        </span>
      ) : null}
    </div>
  );
}

export default function AgentShowcase({
  eyebrow,
  headline,
  lede,
  product,
  address,
  title,
  actions = [],
  status,
  replaced,
  stat,
  syntheticNote,
  children,
}: AgentShowcaseProps) {
  return (
    <section className="agent-showcase">
      <p className="as-eyebrow">{eyebrow}</p>
      <h2 className="as-headline">{headline}</h2>
      <p className="as-lede">{lede}</p>

      <div className="as-frame">
        <div className="as-frame__bar">
          <span className="as-frame__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="as-frame__addr">{address}</span>
        </div>

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

      <div className="as-result">
        <div>
          <p className="as-result__label">What it replaced</p>
          <p className="as-result__replaced">{replaced}</p>
        </div>
        <StatBlock stat={stat} />
      </div>
    </section>
  );
}
