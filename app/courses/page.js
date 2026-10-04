import SiteShell from "@/component/site/SiteShell";
import PageHero from "@/component/site/PageHero";
import CourseGrid from "@/component/site/CourseGrid";
import CourseExplorer from "@/component/site/CourseExplorer";
import { CtaBand, ProgramTracks } from "@/component/site/Sections";
import { durations } from "@/data/siteContent";

export const metadata = {
  title: "Our Courses | Astra Multimedia",
  description:
    "Hands-on programs in Graphic Design, 2D & 3D Animation, VFX, Video Editing, Digital Marketing and UI/UX Design, aligned with industry expectations.",
};

export default function Courses() {
  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Courses" }]}
        eyebrow="Our courses"
        title={
          <>
            Hands-on programs aligned with <span className="as-accent-red">industry.</span>
          </>
        }
        lead="Six career courses taught by Astra Faculty — from beginner foundations to portfolio-ready projects. Fees vary by track; contact us for details."
      >
        <div className="as-page-hero-row">
          {durations.map((d) => (
            <span className="as-chip" key={d}>
              {d}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="as-section as-dark">
        <div className="as-wrap">
          <CourseGrid />
        </div>
      </section>

      <section className="as-section as-paper-2">
        <div className="as-wrap">
          <div className="as-head as-reveal">
            <div className="as-eyebrow">Curriculum</div>
            <h2>Inside every course.</h2>
            <p>Compare modules, tools and career paths side by side.</p>
          </div>
          <div className="as-reveal">
            <CourseExplorer />
          </div>
        </div>
      </section>

      <ProgramTracks />
      <CtaBand
        title={
          <>
            Not sure which
            <br />
            course fits?
          </>
        }
        copy="Talk to our admissions team — we'll help you choose the right learning path for your goals."
      />
    </SiteShell>
  );
}
