"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/siteContent";

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`as-header${scrolled ? " is-scrolled" : ""}`}>
        <nav className="as-wrap as-nav" aria-label="Primary">
          <Link href="/" className="as-logo" aria-label="Astra Multimedia home">
            <img src="/images/logo.png" alt="Astra Multimedia" width={150} height={38} />
          </Link>

          <div className="as-navlinks">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(pathname, link.href) ? "is-active" : undefined}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/contact#enroll" className="as-btn as-btn--solid as-btn--sm as-nav-cta">
            Enroll Now <span className="as-arrow">→</span>
          </Link>

          <button
            type="button"
            className={`as-burger${open ? " is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="as-mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div
        id="as-mobile-menu"
        className={`as-mobile-menu${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            tabIndex={open ? 0 : -1}
            className={`as-mobile-link${isActive(pathname, link.href) ? " is-active" : ""}`}
          >
            {link.label}
            <small>0{i + 1}</small>
          </Link>
        ))}
        <Link
          href="/contact#enroll"
          tabIndex={open ? 0 : -1}
          className="as-btn as-btn--solid"
        >
          Enroll Now <span className="as-arrow">→</span>
        </Link>
      </div>
    </>
  );
}
