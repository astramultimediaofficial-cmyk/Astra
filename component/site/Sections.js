import Link from "next/link";
import EnrollForm from "./EnrollForm";
import CourseCard from "./CourseCard";
import {
  contact,
  courses,
  faqs,
  highlights,
  programPerks,
  programs,
  testimonials,
  workshops,
} from "@/data/siteContent";

export function ProgramTracks({ showHead = true }) {
  return (
    <section className="as-section as-dark as-grain" id="programs">
      <div className="as-wrap">
        {showHead ? (
          <div className="as-head as-head--split as-reveal">
            <div>
              <div className="as-eyebrow as-eyebrow--gold">Program structure</div>
              <h2>
                Pick your <span className="as-accent-red">pace.</span>
              </h2>
            </div>
            <p>
              Every course runs in four tracks. Fast or full — each includes live mentoring,
              recordings and study material.
            </p>
          </div>
        ) : null}
        <div className="as-tracks as-reveal">
          {programs.map((p, i) => (
            <div className="as-track" key={p.track}>
              <span className="as-mono">{p.track}</span>
              <h3>{p.title}</h3>
              <div className="as-track-dur">{p.dur}</div>
              <p>{p.copy}</p>
              <div className="as-track-bar" aria-hidden="true">
                <span style={{ width: `${(i + 1) * 25}%` }} />
              </div>
            </div>
          ))}
        </div>
        <ul className="as-perks as-reveal">
          {programPerks.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Highlights() {
  return (
    <section className="as-section">
      <div className="as-wrap">
        <div className="as-head as-head--split as-reveal">
          <div>
            <div className="as-eyebrow">Why Astra</div>
            <h2>Success stories from our academy.</h2>
          </div>
          <p>
            Real projects, real portfolios and real confidence — here&apos;s what learning at Astra
            looks like beyond the classroom.
          </p>
        </div>
        <div className="as-highlights">
          {highlights.map((h, i) => (
            <article className={`as-highlight as-reveal as-reveal-d${i % 4}`} key={h.title}>
              <img src={h.img} alt="" loading="lazy" />
              <div className="as-highlight-body">
                <span className="as-mono">0{i + 1}</span>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkshopCard({ workshop, index }) {
  return (
    <Link href={`/events/${workshop.slug}`} className="as-workshop as-reveal">
      <div className="as-workshop-date" aria-hidden="true">
        <strong>0{index + 1}</strong>
        <span>One day</span>
      </div>
      <div>
        <span className="as-tag">{workshop.category}</span>
        <h3>{workshop.title}</h3>
        <p>{workshop.desc}</p>
        <div className="as-workshop-meta">
          <span>{workshop.location}</span>
          <span>{workshop.time}</span>
          <span>{workshop.trainer}</span>
        </div>
      </div>
    </Link>
  );
}

export function WorkshopsSection({ withHead = true, className = "as-paper-2" }) {
  return (
    <section className={`as-section ${className}`}>
      <div className="as-wrap">
        {withHead ? (
          <div className="as-head as-head--split as-reveal">
            <div>
              <div className="as-eyebrow">Workshops</div>
              <h2>Join our intensive one-day workshops.</h2>
            </div>
            <div>
              <p>
                Focused, hands-on sessions led by our mentors — perfect for trying a field before
                committing to a full program.
              </p>
              <div style={{ marginTop: 22 }}>
                <Link href="/events" className="as-btn as-btn--dark as-btn--sm">
                  All workshops <span className="as-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
        <div className="as-workshops">
          {workshops.map((w, i) => (
            <WorkshopCard workshop={w} index={i} key={w.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="as-section as-dark-2 as-grain">
      <div className="as-wrap">
        <div className="as-head as-head--split as-reveal">
          <div>
            <div className="as-eyebrow as-eyebrow--gold">Student voices</div>
            <h2>
              We have helped create students who <span className="as-accent-gold">say:</span>
            </h2>
          </div>
          <p>Straight from learners who trained with our mentors in Coimbatore.</p>
        </div>
        <div className="as-testimonials">
          {testimonials.map((t, i) => (
            <figure className={`as-testimonial as-reveal as-reveal-d${i}`} key={t.name}>
              <div className="as-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption className="as-person">
                <span className="as-avatar" aria-hidden="true">
                  {t.initials}
                </span>
                <span>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqList({ items = faqs, dark = false }) {
  return (
    <div className={`as-faq${dark ? " as-faq--dark" : ""}`}>
      {items.map((item, i) => (
        <details key={item.q} open={i === 0}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({ limit }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <section className="as-section">
      <div className="as-wrap as-faq-layout">
        <div className="as-reveal">
          <div className="as-eyebrow">FAQ</div>
          <h2 style={{ fontSize: "clamp(30px, 3.8vw, 46px)" }}>Frequently asked questions.</h2>
          <p style={{ marginTop: 18, fontSize: 17, color: "var(--graphite)", maxWidth: "40ch" }}>
            Everything you need to know about our courses, certifications, and how we help you
            launch your professional career.
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {limit ? (
              <Link href="/faq" className="as-btn as-btn--dark as-btn--sm">
                All questions <span className="as-arrow">→</span>
              </Link>
            ) : null}
            <a href={contact.phoneHref} className="as-btn as-btn--solid as-btn--sm">
              Call {contact.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="as-reveal as-reveal-d1">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title = (
    <>
      Shape your future
      <br />
      brighter.
    </>
  ),
  copy = "Admissions are open. Talk to our team and find the right course and track for your goals.",
}) {
  return (
    <section className="as-cta as-grain">
      <div className="as-wrap as-cta-inner">
        <div className="as-reveal">
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
        <div className="as-cta-actions as-reveal as-reveal-d1">
          <Link href="/contact#enroll" className="as-btn as-btn--white">
            Enroll Now <span className="as-arrow">→</span>
          </Link>
          <a href={contact.phoneHref} className="as-btn as-btn--outline-white">
            {contact.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

export function EnrollSection({ defaultCourse = "", title = "Enroll at Astra" }) {
  return (
    <section className="as-section as-dark as-grain" id="enroll">
      <div className="as-wrap as-enroll">
        <div className="as-enroll-intro as-reveal">
          <div className="as-eyebrow as-eyebrow--gold">Admissions open</div>
          <h2>{title}</h2>
          <p>
            Tell us a bit about yourself and the course you&apos;re interested in — our admissions
            team will call you back to confirm your batch.
          </p>
          <div className="as-contact-list" id="contact-details">
            <a href={contact.phoneHref}>
              <span className="as-mono">Call</span>
              <span>{contact.phoneDisplay}</span>
            </a>
            <a href={`mailto:${contact.email}`}>
              <span className="as-mono">Mail</span>
              <span>{contact.email}</span>
            </a>
            <div>
              <span className="as-mono">Visit</span>
              <span>{contact.address}</span>
            </div>
          </div>
        </div>
        <div className="as-reveal as-reveal-d1">
          <EnrollForm defaultCourse={defaultCourse} />
        </div>
      </div>
    </section>
  );
}

export function RelatedCourses({ excludeSlug, slugs }) {
  const list = slugs
    ? courses.filter((c) => slugs.includes(c.slug))
    : courses.filter((c) => c.slug !== excludeSlug).slice(0, 3);
  if (list.length === 0) return null;
  return (
    <div className="as-course-grid">
      {list.map((c, i) => (
        <CourseCard course={c} delay={i} key={c.slug} />
      ))}
    </div>
  );
}
