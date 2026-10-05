"use client";

import Link from "next/link";
import { useState } from "react";
import { courses, durations } from "@/data/siteContent";

export default function CourseExplorer() {
  const [activeSlug, setActiveSlug] = useState(courses[0].slug);
  const active = courses.find((c) => c.slug === activeSlug) || courses[0];

  return (
    <>
      <div className="as-filters" role="tablist" aria-label="Courses">
        {courses.map((c) => (
          <button
            type="button"
            role="tab"
            key={c.slug}
            aria-selected={c.slug === activeSlug}
            className={`as-filter${c.slug === activeSlug ? " is-active" : ""}`}
            onClick={() => setActiveSlug(c.slug)}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div className="as-explorer" role="tabpanel">
        <div className="as-explorer-side">
          <div className="as-course-num">{active.num}</div>
          <h3>{active.title}</h3>
          <p>{active.tag}</p>
          <div className="as-careers">
            <span className="as-mono">Career opportunities</span>
            {active.careers.map((career) => (
              <span className="as-pill" key={career}>
                {career}
              </span>
            ))}
          </div>
        </div>
        <div className="as-explorer-body" key={active.slug}>
          {active.modules.map(([label, items]) => (
            <div className="as-mod" key={label}>
              <span className="as-mono">{label}</span>
              <div className="as-mod-items">{items}</div>
            </div>
          ))}
          <div className="as-explorer-foot">
            <div className="as-dur-pills">
              {durations.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <Link href={`/courses/${active.slug}`} className="as-btn as-btn--dark as-btn--sm">
              Course details <span className="as-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
