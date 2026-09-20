import Link from "next/link";

const serviceRows = [
  {
    href: "/services",
    name: "AI Consulting",
    tag: "Strategy · Automation · Training · Integration",
  },
  {
    href: "/services",
    name: "Personal Consulting",
    tag: "Career · Life Coaching · Study · Social Skills",
  },
  {
    href: "/services",
    name: "Digital Consulting",
    tag: "Web · Social Media · SEO · Automation",
  },
];

const introStats = [
  { label: "Service disciplines", value: "3" },
  { label: "Outcome focused", value: "100%", valueClassName: "with-percent" },
  { label: "Auckland based", value: "NZ" },
];

export default function HomeIntro() {
  return (
    <section className="intro reveal">
      <div className="intro-left">
        <p className="intro-eyebrow">About saha.</p>
        <h2 className="intro-heading">
          One firm.
          <br />
          <em>Three disciplines.</em>
        </h2>
        <p className="intro-body">
          Whether you&apos;re looking to harness AI, grow your career, or sharpen
          your digital presence — Saha brings together expertise across three
          disciplines so your advisor understands the full picture and gives you
          guidance that actually connects.
        </p>
        <div className="intro-stat-row">
          {introStats.map((stat) => (
            <div className="intro-stat" key={stat.label}>
              <div className="intro-stat-num">
                {stat.valueClassName === "with-percent" ? (
                  <>
                    100<span>%</span>
                  </>
                ) : (
                  stat.value
                )}
              </div>
              <div className="intro-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="intro-right">
        {serviceRows.map((service) => (
          <Link className="intro-service-row" href={service.href} key={service.name}>
            <div>
              <div className="intro-service-name">{service.name}</div>
              <div className="intro-service-tag">{service.tag}</div>
            </div>
            <span className="intro-service-arr">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
