import SiteShell from "@/component/site/SiteShell";
import PageHero from "@/component/site/PageHero";
import { CtaBand, FaqList } from "@/component/site/Sections";
import { contact } from "@/data/siteContent";

export const metadata = {
  title: "FAQ | Astra Multimedia",
  description:
    "Answers about Astra Multimedia courses, prerequisites, certifications, placement assistance, durations and flexible schedules.",
};

export default function Faq() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "FAQ" }]}
        eyebrow="Help centre"
        title={
          <>
            Frequently asked <span className="as-accent-red">questions.</span>
          </>
        }
        lead="Everything you need to know about our courses, certifications, and how we help you launch your professional career."
      />

      <section className="as-section">
        <div className="as-wrap as-faq-layout">
          <div className="as-reveal">
            <div className="as-eyebrow">Still curious?</div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)" }}>Talk to a real person.</h2>
            <p style={{ marginTop: 16, fontSize: 17, color: "var(--graphite)", maxWidth: "40ch" }}>
              Our admissions team is happy to walk you through courses, schedules and fees.
            </p>
            <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={contact.phoneHref} className="as-btn as-btn--solid as-btn--sm">
                Call {contact.phoneDisplay}
              </a>
              <a href={`mailto:${contact.email}`} className="as-btn as-btn--dark as-btn--sm">
                Email us
              </a>
            </div>
          </div>
          <div className="as-reveal as-reveal-d1">
            <FaqList />
          </div>
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}
