import Link from "next/link";
import SiteShell from "@/component/site/SiteShell";
import PageHero from "@/component/site/PageHero";
import {
  CtaBand,
  FaqSection,
  Highlights,
  ProgramTracks,
  Testimonials,
} from "@/component/site/Sections";
import { aboutPoints, stats } from "@/data/siteContent";

export const metadata = {
  title: "About Us | Astra Multimedia",
  description:
    "Astra Multimedia provides industry-standard training in multimedia and digital arts, bridging classroom learning and professional career demands.",
};

export default function About() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "About" }]}
        eyebrow="About Astra"
        title={
          <>
            We don&apos;t just teach software. <span className="as-accent-red">We build careers.</span>
          </>
        }
        lead="Astra Institute of Multimedia is a creative learning hub in Coimbatore, focused on building the next generation of digital designers and tech professionals."
      />

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

      <section className="as-section">
        <div className="as-wrap as-about">
          <div className="as-quote-card as-reveal">
            <div className="as-qmark">“</div>
            <p>
              Creativity is best nurtured through <span className="as-accent-gold">action.</span>
            </p>
            <div className="as-quote-meta">
              <span className="as-mono" style={{ color: "var(--graphite)" }}>
                Based in
              </span>
              <span className="as-big-stat">Coimbatore</span>
            </div>
          </div>
          <div className="as-about-copy as-reveal as-reveal-d1">
            <div className="as-eyebrow">Our mission</div>
            <h2>Shaping the next generation of creative professionals.</h2>
            <p>
              We provide <strong>industry-standard training in multimedia and digital arts.</strong>{" "}
              Our mission is to bridge the gap between classroom learning and professional career
              demands.
            </p>
            <p>
              As a premier professional training center, we offer industry-oriented training in{" "}
              <strong>
                UI/UX Design, Graphic Design, Web Development, 2D/3D Animation, VFX, Video Editing,
                SAP, DSA and Digital Marketing
              </strong>{" "}
              — taught with licensed, AI-powered tools.
            </p>
            <ul className="as-checks">
              {aboutPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div style={{ marginTop: 34, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/courses" className="as-btn as-btn--solid">
                Explore courses <span className="as-arrow">→</span>
              </Link>
              <Link href="/team" className="as-btn as-btn--dark">
                Meet the mentors
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProgramTracks />
      <Highlights />
      <Testimonials />
      <FaqSection />
      <CtaBand />
    </SiteShell>
  );
}
