import Link from "next/link";
import { contact, courses, navLinks } from "@/data/siteContent";

export default function SiteFooter() {
  return (
    <footer className="as-footer">
      <div className="as-wrap">
        <div className="as-footer-grid">
          <div>
            <Link href="/" className="as-logo" aria-label="Astra Multimedia home">
              <img src="/images/logo.png" alt="Astra Multimedia" width={170} height={43} />
            </Link>
            <p className="as-footer-about">
              Astra Multimedia is a full-service creative powerhouse dedicated to stellar digital
              solutions. We combine expert graphic design, video production, and multimedia
              strategy to give your brand the celestial edge it deserves.
            </p>
          </div>

          <div>
            <h4>Explore</h4>
            <ul className="as-footer-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Courses</h4>
            <ul className="as-footer-links">
              {courses.map((c) => (
                <li key={c.slug}>
                  <Link href={`/courses/${c.slug}`}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Our Contacts</h4>
            <div className="as-footer-contact">
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <address style={{ fontStyle: "normal" }}>
                {contact.addressLines.map((line) => (
                  <span key={line} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </div>
        </div>

        <div className="as-wordmark" aria-hidden="true">
          Astra Multimedia
        </div>

        <div className="as-footer-note">
          <span>© {new Date().getFullYear()} Astra Institute of Multimedia. All rights reserved.</span>
          <span>Design · Animate · Create</span>
        </div>
      </div>
    </footer>
  );
}
