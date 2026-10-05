"use client";

import { useMemo, useState } from "react";
import { courses } from "@/data/siteContent";
import CourseCard from "./CourseCard";

export default function CourseGrid() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(courses.map((c) => c.category)))],
    []
  );
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? courses : courses.filter((c) => c.category === filter);

  return (
    <>
      <div className="as-filters" role="group" aria-label="Filter courses">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            aria-pressed={filter === cat}
            className={`as-filter${filter === cat ? " is-active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="as-course-grid">
        {list.map((c) => (
          <CourseCard course={c} reveal={false} key={c.slug} />
        ))}
      </div>
    </>
  );
}
