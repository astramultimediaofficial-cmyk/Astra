import Link from "next/link";
import SiteShell from "@/component/site/SiteShell";
import CourseExplorer from "@/component/site/CourseExplorer";
import CourseCard from "@/component/site/CourseCard";
import {
  CtaBand,
  EnrollSection,
  FaqSection,
  Highlights,
  ProgramTracks,
  Testimonials,
  WorkshopsSection,
} from "@/component/site/Sections";
import { aboutPoints, courses, stats } from "@/data/siteContent";

export const metadata = {
  title: "Astra Multimedia — Upgrade Your Skills. Build Your Career.",
  description:
    "Coimbatore's industry-oriented training hub for Graphic Design, 2D/3D Animation, VFX, Video Editing, UI/UX and Digital Marketing — with live mentoring and 100% placement support.",
};

export default function Home() {
  const marquee = [...courses.map((c) => c.title), "SAP", "Workshops", "Placement Support"];

  return (
    <SiteShell>
      <section className="as-hero as-grain">
        <div className="as-gridlines" aria-hidden="true" />
        <div className="as-hero-glow" aria-hidden="true" />
        <div className="as-wrap as-hero-grid">
          <div>
            <div className="as-eyebrow as-eyebrow--gold">All courses with AI integration</div>
            <h1>
              <span className="as-line">Shape your</span>
              <span className="as-line">
                future <span className="as-accent-red">brighter.</span>
              </span>
            </h1>
            <p className="as-hero-lead">
              Join a community dedicated to academic excellence and personal growth. Industry-oriented
              training in Graphic Design, Animation, VFX, Video Editing, UI/UX and Digital Marketing —
              built to unlock your full potential.
            </p>
            <div className="as-hero-ctas">
              <Link href="/contact#enroll" className="as-btn as-btn--solid">
                Enroll Now <span className="as-arrow">→</span>
              </Link>
              <Link href="/courses" className="as-btn as-btn--light">
                Explore Courses
              </Link>
            </div>
            <div className="as-hero-badges">
              <span className="as-chip">
                <b>Free</b> Professional English course
              </span>
              <span className="as-chip">
                <b>100%</b> Placement support
              </span>
              <span className="as-chip">
                <b>Live</b> Mentoring &amp; recordings
              </span>
            </div>
          </div>

          <div className="as-reel" aria-hidden="true">
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="asCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e31e2b" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#e31e2b" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="120" fill="url(#asCore)" />
              <g className="as-spin">
                <circle cx="200" cy="200" r="170" fill="none" stroke="#f4b400" strokeWidth="1" strokeDasharray="2 12" />
                <circle cx="200" cy="30" r="5" fill="#f4b400" />
              </g>
              <g className="as-spin-rev">
                <circle cx="200" cy="200" r="140" fill="none" stroke="#e31e2b" strokeWidth="2" />
                <g fill="#f6f4ef" opacity=".9">
                  <circle cx="200" cy="80" r="9" />
                  <circle cx="304" cy="140" r="9" />
                  <circle cx="304" cy="260" r="9" />
                  <circle cx="200" cy="320" r="9" />
                  <circle cx="96" cy="260" r="9" />
                  <circle cx="96" cy="140" r="9" />
                </g>
              </g>
              <circle cx="200" cy="200" r="52" fill="#0b0b0d" stroke="rgba(246,244,239,.4)" strokeWidth="1.5" />
              <path d="M186 176 L230 200 L186 224 Z" fill="#e31e2b" />
            </svg>
            <div className="as-reel-card as-reel-card--a">
              <span className="as-mono">Learners trained</span>
              <strong>1000+</strong>
            </div>
            <div className="as-reel-card as-reel-card--b">
              <span className="as-mono">Placement support</span>
              <strong>100%</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="as-marquee" aria-hidden="true">
        <div className="as-marquee-track">
          {[...marquee, ...marquee].map((item, i) => (
            <span className="as-marquee-item" key={`${item}-${i}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="as-stats">
        <div className="as-wrap">
          {stats.map((s) => (
            <div className="as-stat" key={s.label}>
              <div className="as-num">{s.num}</div>
              <div className="as-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="as-section" id="about">
        <div className="as-wrap as-about">
          <div className="as-quote-card as-reveal">
            <div className="as-qmark">“</div>
            <p>
              Build your skills. <span className="as-accent-gold">Shape your career.</span> Create
              your future.
            </p>
            <div className="as-quote-meta">
              <span className="as-mono" style={{ color: "var(--graphite)" }}>
                Learners trained
              </span>
              <span className="as-big-stat">1000+</span>
            </div>
          </div>
          <div className="as-about-copy as-reveal as-reveal-d1">
            <div className="as-eyebrow">About Astra</div>
            <h2>Shaping the next generation of creative professionals.</h2>
            <p>
              We provide <strong>industry-standard training in multimedia and digital arts.</strong>{" "}
              Our mission is to bridge the gap between classroom learning and professional career
              demands — we don&apos;t just teach software, we build careers.
            </p>
            <ul className="as-checks">
              {aboutPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div style={{ marginTop: 34 }}>
              <Link href="/about" className="as-btn as-btn--dark">
                More about us <span className="as-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="as-section as-dark as-grain" id="courses">
        <div className="as-wrap">
          <div className="as-head as-head--split as-reveal">
            <div>
              <div className="as-eyebrow as-eyebrow--gold">Our courses</div>
              <h2>
                Study flexibly at <span className="as-accent-red">your own pace.</span>
              </h2>
            </div>
            <div>
              <p>
                Our courses are designed to fit your schedule. Access high-quality training
                materials and expert mentorship from anywhere.
              </p>
              <div style={{ marginTop: 22 }}>
                <Link href="/courses" className="as-btn as-btn--light as-btn--sm">
                  View all courses <span className="as-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="as-course-grid">
            {courses.map((c, i) => (
              <CourseCard course={c} delay={i % 3} key={c.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="as-section as-paper-2">
        <div className="as-wrap">
          <div className="as-head as-reveal">
            <div className="as-eyebrow">Curriculum</div>
            <h2>What you&apos;ll master.</h2>
            <p>
              Six industry-oriented programs, each stacked with core modules, real tools and
              AI-powered workflows. Pick a course to see what&apos;s inside.
            </p>
          </div>
          <div className="as-reveal">
            <CourseExplorer />
          </div>
        </div>
      </section>

      <ProgramTracks />
      <Highlights />
      <WorkshopsSection />
      <Testimonials />
      <CtaBand />
      <FaqSection limit={4} />
      <EnrollSection />
    </SiteShell>
  );
}
