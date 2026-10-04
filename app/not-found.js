import Link from "next/link";
import SiteShell from "@/component/site/SiteShell";

export const metadata = {
  title: "Page not found | Astra Multimedia",
};

export default function NotFound() {
  return (
    <SiteShell>
      <section className="as-page-hero as-grain as-404">
        <div className="as-gridlines" aria-hidden="true" />
        <div className="as-wrap">
          <h1>404</h1>
          <p className="as-page-lead">
            This scene didn&apos;t make the final cut. The page you&apos;re looking for doesn&apos;t
            exist or has moved.
          </p>
          <div className="as-page-hero-row">
            <Link href="/" className="as-btn as-btn--solid">
              Back to home <span className="as-arrow">→</span>
            </Link>
            <Link href="/courses" className="as-btn as-btn--light">
              Browse courses
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
