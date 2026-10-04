import Link from "next/link";

export default function PageHero({ crumbs = [], eyebrow, title, lead, children }) {
  return (
    <section className="as-page-hero as-grain">
      <div className="as-gridlines" aria-hidden="true" />
      <div className="as-wrap">
        <nav className="as-crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((crumb, i) => (
            <span key={crumb.label} style={{ display: "contents" }}>
              <span className="as-sep">/</span>
              {crumb.href && i < crumbs.length - 1 ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        {eyebrow ? <div className="as-eyebrow as-eyebrow--gold">{eyebrow}</div> : null}
        <h1>{title}</h1>
        {lead ? <p className="as-page-lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
