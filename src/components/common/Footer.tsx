import Link from "next/link";

const footerItems = [
  { href: "/", label: "Home" },
  { href: "/whoweare", label: "Who We Are" },
  { href: "/services", label: "Services" },
  { href: "/kali", label: "Kali" },
  { href: "/careers", label: "Careers" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contactus", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer" id="main-footer">
      <div className="footer-top">
        <Link className="footer-logo" href="/" id="main-footer-logo">
          <img alt="" className="logo-mark" src="/saha-logo.png" />
          <span>saha.</span>
        </Link>
        <div className="footer-links-row">
          {footerItems.map((item) => (
            <Link className="footer-nav-link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <span className="footer-note">
          © 2022–2026 Saha Group ANZ
        </span>
      </div>
      <div className="footer-disclaimer-bar">
        <span className="fdb-icon">⚖</span>
        <p className="fdb-text">
          <strong>Legal disclaimer&nbsp;&nbsp;</strong>Saha provides AI,
          personal, and digital consulting services. Nothing on this website
          constitutes professional legal, financial, or regulated advice of any
          kind. All information provided is general in nature and for
          informational purposes only. Clients should seek independent, licensed
          advice where required.
        </p>
      </div>
    </footer>
  );
}
