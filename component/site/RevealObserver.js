"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("as-js");
    const nodes = Array.from(document.querySelectorAll(".as-reveal:not(.is-in)"));
    const show = (el) => el.classList.add("is-in");

    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    const pending = nodes.filter((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportH && rect.bottom > 0) {
        show(el);
        return false;
      }
      return true;
    });

    if (!("IntersectionObserver" in window)) {
      pending.forEach(show);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
