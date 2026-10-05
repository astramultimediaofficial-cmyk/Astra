"use client";

import { useAstraContext } from "@/context/AstraContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ENROLL_URL =
  "https://wa.me/919677606913?text=Hi!%20I%20would%20like%20to%20enroll%20today.";

const courseLinks = [
  { href: "/courses", label: "Graphic Design" },
  { href: "/courses", label: "2D & 3D Animation" },
  { href: "/courses", label: "VFX" },
  { href: "/courses", label: "Video Editing" },
  { href: "/courses", label: "Digital Marketing" },
  { href: "/courses", label: "UI/UX" },
  { href: "/courses", label: "SAP" },
  { href: "/courses", label: "Web Development" },
  { href: "/courses", label: "DSA" },
];

const HomeNavbar = ({ logo = "images/logo.png" }) => {
  const pathname = usePathname();
  const { isMobileNavOpen, setIsMobileNavOpen, handleMobileNavOpen } =
    useAstraContext();
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileNavOpen(false);
        setCoursesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsMobileNavOpen]);

  const closeMobile = () => setIsMobileNavOpen(false);

  const isHome = pathname === "/";
  const navLinkClass = (href, matchPrefix = false) => {
    const active =
      pathname === href ||
      (matchPrefix && href !== "/" && pathname.startsWith(href));
    return `home-nav__link${active ? " is-active" : ""}`;
  };

  return (
    <header
      ref={navRef}
      className={`home-nav${
        isHome || scrolled ? " home-nav--scrolled home-nav--solid" : ""
      }`}
    >
      <div className="home-nav__inner">
        <Link className="home-nav__brand" href="/" onClick={closeMobile}>
          <img src={logo} alt="Astra Multimedia" />
        </Link>

        <nav className="home-nav__pill d-none d-lg-flex" aria-label="Main">
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>
          <div
            className={`home-nav__dropdown${coursesOpen ? " is-open" : ""}`}
          >
            <button
              type="button"
              className={`home-nav__link home-nav__link--toggle${
                pathname.startsWith("/courses") ? " is-active" : ""
              }`}
              onClick={() => setCoursesOpen((o) => !o)}
              aria-expanded={coursesOpen}
            >
              Our Courses
              <i className="fa fa-angle-down" aria-hidden />
            </button>
            <ul className="home-nav__menu">
              {courseLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} onClick={() => setCoursesOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/team" className={navLinkClass("/team")}>
            Mentors
          </Link>
          <Link href="/about" className={navLinkClass("/about")}>
            About Us
          </Link>
          <Link href="/contact" className={navLinkClass("/contact")}>
            Contact
          </Link>
        </nav>

        <div className="home-nav__actions">
          <button type="button" className="home-nav__icon-btn" aria-label="Search">
            <i className="fas fa-search" aria-hidden />
          </button>
          <button
            type="button"
            className="home-nav__icon-btn d-lg-none"
            aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
            onClick={() =>
              isMobileNavOpen ? closeMobile() : handleMobileNavOpen()
            }
          >
            <i
              className={`fa ${isMobileNavOpen ? "fa-times" : "fa-bars"}`}
              aria-hidden
            />
          </button>
          <a
            className="btn-hero-primary home-nav__cta d-none d-lg-inline-flex"
            href={ENROLL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enroll Today
          </a>
        </div>
      </div>

      <div
        className={`home-nav__mobile${isMobileNavOpen ? " is-open" : ""}`}
        aria-hidden={!isMobileNavOpen}
      >
        <Link href="/" className={navLinkClass("/")} onClick={closeMobile}>
          Home
        </Link>
        <p className="home-nav__mobile-label">Our Courses</p>
        {courseLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="home-nav__mobile-sub"
            onClick={closeMobile}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/team" className={navLinkClass("/team")} onClick={closeMobile}>
          Mentors
        </Link>
        <Link href="/about" className={navLinkClass("/about")} onClick={closeMobile}>
          About Us
        </Link>
        <Link
          href="/contact"
          className={navLinkClass("/contact")}
          onClick={closeMobile}
        >
          Contact
        </Link>
        <a
          className="btn-hero-primary"
          href={ENROLL_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enroll Today
        </a>
      </div>
    </header>
  );
};

export default HomeNavbar;
