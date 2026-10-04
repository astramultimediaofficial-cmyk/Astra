import SiteShell from "@/component/site/SiteShell";
import PageHero from "@/component/site/PageHero";
import { EnrollSection } from "@/component/site/Sections";
import { contact } from "@/data/siteContent";

export const metadata = {
  title: "Contact | Astra Multimedia",
  description:
    "Get in touch with Astra Multimedia in Coimbatore for course guidance, workshop details and enrollment support.",
};

export default function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`;

  return (
    <SiteShell>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title={
          <>
            Get in touch with <span className="as-accent-red">Astra.</span>
          </>
        }
        lead="Reach out for course guidance, workshop details, and enrollment support. Our team will help you choose the right learning path."
      />

      <section className="as-section as-dark" style={{ paddingTop: 0 }}>
        <div className="as-wrap">
          <div className="as-contact-cards">
            <a className="as-contact-card as-reveal" href={contact.phoneHref}>
              <span className="as-mono">Call</span>
              <strong>{contact.phoneDisplay}</strong>
            </a>
            <a className="as-contact-card as-reveal as-reveal-d1" href={`mailto:${contact.email}`}>
              <span className="as-mono">Email</span>
              <strong>{contact.email}</strong>
            </a>
            <a
              className="as-contact-card as-reveal as-reveal-d2"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="as-mono">Visit</span>
              <strong>{contact.address}</strong>
            </a>
          </div>
          <div className="as-map as-reveal">
            <iframe
              title="Astra Multimedia location map"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <EnrollSection />
    </SiteShell>
  );
}
