"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", id: "nav-btn-home", label: "Home" },
  { href: "/whoweare", id: "nav-btn-wwa", label: "Who We Are" },
  { href: "/services", id: "nav-btn-svc", label: "Services" },
  { href: "/case-studies", id: "nav-btn-cs", label: "Case Studies" },
  { href: "/kali", id: "nav-btn-kali", label: "Kali" },
  { href: "/careers", id: "nav-btn-careers", label: "Careers" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const showBack = pathname !== "/";

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navClass = (href: string) => `nav-link${isActive(href) ? " active" : ""}`;

  // Every in-app navigation closes the panel, so it never lingers over the new page.
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    // The burger is hidden above 900px, so close if the viewport grows past it.
    const desktop = window.matchMedia("(min-width: 901px)");
    const handleChange = () => {
      if (desktop.matches) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleChange);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleChange);
      document.body.style.removeProperty("overflow");
    };
  }, [menuOpen]);

  return (
    <nav id="main-nav">
      <div className="nav-blur" />
      <Link
        className="nav-logo"
        href="/"
        id="global-nav-logo"
        onClick={closeMenu}
      >
        <img alt="" className="logo-mark" src="/saha-logo.png" />
        <span>saha.</span>
      </Link>
      <div className="nav-center" id="nav-center">
        {navItems.map((item) => (
          <Link
            className={navClass(item.href)}
            href={item.href}
            id={item.id}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="nav-right">
        <button
          className={`nav-back-btn${showBack ? " visible" : ""}`}
          id="global-nav-back"
          onClick={() => {
            closeMenu();
            router.back();
          }}
          type="button"
        >
          Back
        </button>
        <Link className="nav-work-btn" href="/contactus" id="nav-btn-wuw">
          Work with us
        </Link>
        <button
          aria-controls="nav-mobile"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={`nav-burger${menuOpen ? " open" : ""}`}
          id="global-nav-burger"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {menuOpen ? (
        <>
          <button
            aria-label="Close menu"
            className="nav-mobile-overlay"
            onClick={() => setMenuOpen(false)}
            type="button"
          />
          <div className="nav-mobile" id="nav-mobile">
            {navItems.map((item) => (
              <Link
                className={`nav-mobile-link${isActive(item.href) ? " active" : ""}`}
                href={item.href}
                id={`${item.id}-m`}
                key={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="nav-mobile-cta"
              href="/contactus"
              id="nav-btn-wuw-m"
              onClick={closeMenu}
            >
              Work with us
            </Link>
          </div>
        </>
      ) : null}
    </nav>
  );
}
