import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/component/site/SiteShell";
import { CtaBand, RelatedCourses, WorkshopCard } from "@/component/site/Sections";
import { contact, getMentor, mentors, workshops } from "@/data/siteContent";

export function generateStaticParams() {
  return mentors.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }) {
  const mentor = getMentor(params.slug);
  if (!mentor) return { title: "Mentor not found | Astra Multimedia" };
  return {
    title: `${mentor.name} — ${mentor.role} | Astra Multimedia`,
    description: mentor.about,
  };
}

export default function MentorDetails({ params }) {
  const mentor = getMentor(params.slug);
  if (!mentor) notFound();

  const mentorWorkshops = workshops.filter((w) => w.mentorSlug === mentor.slug);
  const firstName = mentor.name.split(" ")[0];

  return (
    <SiteShell>
      <section className="as-page-hero as-grain">
        <div className="as-gridlines" aria-hidden="true" />
        <div className="as-wrap">
          <nav className="as-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="as-sep">/</span>
            <Link href="/team">Mentors</Link>
            <span className="as-sep">/</span>
            <span aria-current="page">{mentor.name}</span>
          </nav>
          <div className="as-mentor-hero">
            <div className="as-mentor-art" aria-hidden="true">
              <span>{mentor.initials}</span>
            </div>
            <div>
              <div className="as-eyebrow as-eyebrow--gold">{mentor.role}</div>
              <h1>{mentor.name}</h1>
              <p className="as-page-lead">{mentor.about}</p>
              <div className="as-page-hero-row">
                {mentor.focus.map((f) => (
                  <span className="as-chip" key={f}>
                    {f}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={contact.phoneHref} className="as-btn as-btn--solid">
                  Call {contact.phoneDisplay}
                </a>
                <a href={`mailto:${contact.email}`} className="as-btn as-btn--light">
                  Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {mentor.courseSlugs.length > 0 ? (
        <section className="as-section">
          <div className="as-wrap">
            <div className="as-head as-reveal">
              <div className="as-eyebrow">Courses</div>
              <h2>Learn with {firstName}</h2>
            </div>
            <RelatedCourses slugs={mentor.courseSlugs} />
          </div>
        </section>
      ) : null}

      {mentorWorkshops.length > 0 ? (
        <section className="as-section as-paper-2">
          <div className="as-wrap">
            <div className="as-head as-reveal">
              <div className="as-eyebrow">Workshops</div>
              <h2>Workshops by {firstName}</h2>
            </div>
            <div className="as-workshops">
              {mentorWorkshops.map((w) => (
                <WorkshopCard workshop={w} index={workshops.indexOf(w)} key={w.slug} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </SiteShell>
  );
}
