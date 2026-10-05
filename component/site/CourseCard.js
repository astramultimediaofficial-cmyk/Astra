import Link from "next/link";

export default function CourseCard({ course, delay = 0, reveal = true }) {
  const revealClass = reveal ? ` as-reveal${delay ? ` as-reveal-d${delay}` : ""}` : "";
  return (
    <Link href={`/courses/${course.slug}`} className={`as-course-card${revealClass}`}>
      <div className="as-course-top">
        <span className="as-course-num">{course.num}</span>
        <span className="as-tag">{course.category}</span>
      </div>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className="as-course-meta">
        <span>
          {course.students} students · {course.level}
        </span>
        <span className="as-course-go" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}
