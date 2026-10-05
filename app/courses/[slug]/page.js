import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/component/site/SiteShell";
import PageHero from "@/component/site/PageHero";
import { EnrollSection, RelatedCourses } from "@/component/site/Sections";
import { contact, courses, durations, getCourse, mentors, testimonials } from "@/data/siteContent";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const course = getCourse(params.slug);
  if (!course) return { title: "Course not found | Astra Multimedia" };
  return {
    title: `${course.title} Course | Astra Multimedia`,
    description: course.description,
  };
}

export default function CourseDetails({ params }) {
  const course = getCourse(params.slug);
  if (!course) notFound();

  const mentor = mentors.find((m) => m.courseSlugs.includes(course.slug));

  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Courses", href: "/courses" }, { label: course.title }]}
        eyebrow={`Course ${course.num} · ${course.category}`}
        title={course.title}
        lead={course.description}
      >
        <div className="as-page-hero-row">
          <span className="as-chip">
            <b>{course.students}</b> students
          </span>
          <span className="as-chip">
            <b>5.0</b> rating · {course.reviews} reviews
          </span>
          <span className="as-chip">{course.level}</span>
        </div>
      </PageHero>

      <section className="as-section">
        <div className="as-wrap as-detail">
          <div>
            <div className="as-detail-block as-reveal">
              <div className="as-eyebrow">Overview</div>
              <h2>About this course</h2>
              {course.overview.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <div className="as-detail-block as-reveal">
              <div className="as-eyebrow">Outcomes</div>
              <h2>What you will learn</h2>
              <div className="as-learn-grid">
                {course.learn.map((item, i) => (
                  <div className="as-learn" key={item}>
                    <span className="as-learn-n">0{i + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="as-detail-block as-reveal">
              <div className="as-eyebrow">Curriculum</div>
              <h2>Modules &amp; tools</h2>
              <div className="as-modules">
                {course.modules.map(([label, items]) => (
                  <div className="as-mod" key={label}>
                    <span className="as-mono">{label}</span>
                    <div className="as-mod-items">{items}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="as-detail-block as-reveal">
              <div className="as-eyebrow">Careers</div>
              <h2>Where this course takes you</h2>
              <div className="as-learn-grid">
                {course.careers.map((career) => (
                  <div className="as-learn" key={career}>
                    <span className="as-learn-n">→</span>
                    <span>{career}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="as-detail-block as-reveal">
              <div className="as-eyebrow">Reviews</div>
              <h2>What students say</h2>
              <div className="as-reviews">
                {testimonials.map((t) => (
                  <div className="as-review" key={t.name}>
                    <span className="as-avatar" aria-hidden="true">
                      {t.initials}
                    </span>
                    <div>
                      <strong>
                        {t.name} <span className="as-stars" style={{ marginLeft: 6 }}>★★★★★</span>
                      </strong>
                      <p>{t.quote}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="as-aside">
            <div className="as-aside-card">
              <div className="as-aside-top">
                <span className="as-mono">Course fee</span>
                <strong>Contact for fee</strong>
              </div>
              <ul className="as-aside-list">
                <li>
                  <span>Instructor</span>
                  <span>{mentor ? mentor.name : "Astra Faculty"}</span>
                </li>
                <li>
                  <span>Category</span>
                  <span>{course.category}</span>
                </li>
                <li>
                  <span>Format</span>
                  <span>{course.level}</span>
                </li>
                <li>
                  <span>Durations</span>
                  <span>{durations.join(" · ")}</span>
                </li>
                <li>
                  <span>Students</span>
                  <span>{course.students}</span>
                </li>
              </ul>
              <div className="as-aside-actions">
                <a href="#enroll" className="as-btn as-btn--solid">
                  Enroll in this course <span className="as-arrow">→</span>
                </a>
                <a href={contact.phoneHref} className="as-btn as-btn--light">
                  Call {contact.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="as-aside-note">
              <strong style={{ display: "block", marginBottom: 6 }}>Course features</strong>
              <ul className="as-checks" style={{ marginTop: 12 }}>
                {course.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              {mentor ? (
                <p style={{ marginTop: 16 }}>
                  Mentored by <Link href={`/team/${mentor.slug}`}>{mentor.name}</Link>.
                </p>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      <section className="as-section as-dark">
        <div className="as-wrap">
          <div className="as-head as-head--split as-reveal">
            <div>
              <div className="as-eyebrow as-eyebrow--gold">Keep exploring</div>
              <h2>Other courses</h2>
            </div>
            <p>Many learners combine two disciplines to build a stronger portfolio.</p>
          </div>
          <RelatedCourses excludeSlug={course.slug} />
        </div>
      </section>

      <EnrollSection defaultCourse={course.title} title={`Enroll in ${course.title}`} />
    </SiteShell>
  );
}
