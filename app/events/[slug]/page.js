import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/component/site/SiteShell";
import PageHero from "@/component/site/PageHero";
import { EnrollSection, WorkshopCard } from "@/component/site/Sections";
import { contact, getMentor, getWorkshop, workshops } from "@/data/siteContent";

export function generateStaticParams() {
  return workshops.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }) {
  const workshop = getWorkshop(params.slug);
  if (!workshop) return { title: "Workshop not found | Astra Multimedia" };
  return {
    title: `${workshop.title} | Astra Workshops`,
    description: workshop.desc,
  };
}

export default function WorkshopDetails({ params }) {
  const workshop = getWorkshop(params.slug);
  if (!workshop) notFound();

  const mentor = getMentor(workshop.mentorSlug);
  const others = workshops.filter((w) => w.slug !== workshop.slug);
  const whatsapp = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    `Hi Astra, I'd like to book a seat for the "${workshop.title}" workshop.`
  )}`;

  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Workshops", href: "/events" }, { label: workshop.title }]}
        eyebrow={`${workshop.category} workshop`}
        title={workshop.longTitle}
        lead={workshop.desc}
      >
        <div className="as-page-hero-row">
          <span className="as-chip">{workshop.location}</span>
          <span className="as-chip">{workshop.time}</span>
          <span className="as-chip">
            <b>Trainer</b> {workshop.trainer}
          </span>
        </div>
      </PageHero>

      <section className="as-section">
        <div className="as-wrap as-detail">
          <div>
            <div className="as-detail-block as-reveal">
              <div className="as-eyebrow">About the workshop</div>
              <h2>What this session covers</h2>
              <p>{workshop.longDesc}</p>
              <p>
                Every Astra workshop is hands-on: you&apos;ll work through practical exercises with
                your trainer and leave with a clear next step for your learning path.
              </p>
            </div>

            {mentor ? (
              <div className="as-detail-block as-reveal">
                <div className="as-eyebrow">Your trainer</div>
                <h2>{mentor.name}</h2>
                <p>{mentor.about}</p>
                <div style={{ marginTop: 22 }}>
                  <Link href={`/team/${mentor.slug}`} className="as-btn as-btn--dark as-btn--sm">
                    View profile <span className="as-arrow">→</span>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>

          <aside className="as-aside">
            <div className="as-aside-card">
              <div className="as-aside-top">
                <span className="as-mono">Format</span>
                <strong>One-day workshop</strong>
              </div>
              <ul className="as-aside-list">
                <li>
                  <span>Category</span>
                  <span>{workshop.category}</span>
                </li>
                <li>
                  <span>Where</span>
                  <span>{workshop.location}</span>
                </li>
                <li>
                  <span>Timing</span>
                  <span>{workshop.time}</span>
                </li>
                <li>
                  <span>Trainer</span>
                  <span>{workshop.trainer}</span>
                </li>
              </ul>
              <div className="as-aside-actions">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="as-btn as-btn--solid">
                  Book a seat <span className="as-arrow">→</span>
                </a>
                <a href={contact.phoneHref} className="as-btn as-btn--light">
                  Call {contact.phoneDisplay}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="as-section as-paper-2">
        <div className="as-wrap">
          <div className="as-head as-reveal">
            <div className="as-eyebrow">More workshops</div>
            <h2>Keep learning</h2>
          </div>
          <div className="as-workshops">
            {others.map((w) => (
              <WorkshopCard workshop={w} index={workshops.indexOf(w)} key={w.slug} />
            ))}
          </div>
        </div>
      </section>

      <EnrollSection title="Go further with a full course" />
    </SiteShell>
  );
}
