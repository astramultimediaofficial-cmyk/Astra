import Link from "next/link";
import SiteShell from "@/component/site/SiteShell";
import PageHero from "@/component/site/PageHero";
import { CtaBand, Testimonials } from "@/component/site/Sections";
import { mentors } from "@/data/siteContent";

export const metadata = {
  title: "Mentors | Astra Multimedia",
  description:
    "Learn from experienced industry professionals — meet the Astra Multimedia mentors for UI/UX, Digital Marketing, SAP, Animation and VFX.",
};

export default function Team() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Mentors" }]}
        eyebrow="Our mentors"
        title={
          <>
            Learn from experienced <span className="as-accent-red">industry professionals.</span>
          </>
        }
        lead="Every Astra learner is guided by mentors who work in the field — with live sessions, project reviews and career guidance."
      />

      <section className="as-section as-dark">
        <div className="as-wrap">
          <div className="as-mentors">
            {mentors.map((m, i) => (
              <Link href={`/team/${m.slug}`} className={`as-mentor as-reveal as-reveal-d${i % 4}`} key={m.slug}>
                <div className="as-mentor-art" aria-hidden="true">
                  <span>{m.initials}</span>
                </div>
                <div className="as-mentor-body">
                  <span className="as-mono">{m.role}</span>
                  <h3>{m.name}</h3>
                  <p>{m.about}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBand />
    </SiteShell>
  );
}
