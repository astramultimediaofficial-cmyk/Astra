"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const TRANSITION_MS = 500;
const AUTOPLAY_MS = 4000;
const DRAG_THRESHOLD_RATIO = 0.2;
const CLICK_GUARD_PX = 8;

const PLATFORM_STYLES = {
  DESIGN: { label: "Astra", className: "movie-3d-card__platform--astra" },
  MARKETING: { label: "Prime", className: "movie-3d-card__platform--prime" },
  SAP: { label: "Learn+", className: "movie-3d-card__platform--learn" },
  MULTIMEDIA: { label: "Studio", className: "movie-3d-card__platform--studio" },
  food: { label: "Live", className: "movie-3d-card__platform--live" },
};

const RATINGS = [9.1, 8.7, 8.9, 9.0, 8.5];

const getCardMetrics = (viewportWidth) => {
  if (viewportWidth <= 480) return { cardWidth: 220, gap: 12 };
  if (viewportWidth <= 768) return { cardWidth: 240, gap: 14 };
  if (viewportWidth <= 1200) return { cardWidth: 255, gap: 16 };
  return { cardWidth: 268, gap: 18 };
};

const MovieCard = ({ item, offset, isActive, onSelect, suppressClick }) => {
  const platform = PLATFORM_STYLES[item.category] || PLATFORM_STYLES.DESIGN;
  const rating = RATINGS[item.id % RATINGS.length];

  const clampedOffset = Math.max(-2, Math.min(2, offset));

  const handleClick = () => {
    if (suppressClick || offset === 0) return;
    onSelect?.();
  };

  return (
    <div className="movie-3d-carousel__slot">
      <article
        className={`movie-3d-card${isActive ? " movie-3d-card--active" : ""}`}
        data-offset={clampedOffset}
        onClick={handleClick}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && offset !== 0 && !suppressClick) {
            e.preventDefault();
            onSelect?.();
          }
        }}
        role="button"
        tabIndex={offset === 0 ? 0 : -1}
        aria-hidden={Math.abs(offset) > 2}
      >
        <Link
          href={`/events/${item.slug}`}
          className="movie-3d-card__link"
          tabIndex={-1}
          aria-label={item.title}
          draggable={false}
        >
          <div className="movie-3d-card__poster">
            <img src={item.imgSrc} alt="" loading="lazy" draggable={false} />
            <div className="movie-3d-card__dim" aria-hidden />
            <span className={`movie-3d-card__platform ${platform.className}`}>
              {platform.label}
            </span>
            <span className="movie-3d-card__rating" aria-label={`Rating ${rating}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="currentColor"
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
                />
              </svg>
              {rating.toFixed(1)}
            </span>
            <h3 className="movie-3d-card__title">{item.title}</h3>
          </div>
        </Link>
      </article>
    </div>
  );
};

const MovieCarousel3D = ({ items, autoplay = true }) => {
  const count = items.length;

  // Triple the items: [copy-A | copy-B (real) | copy-C]
  // We always start in copy-B (index = count).
  // After every transition we silently snap back to copy-B so
  // the track can keep moving forward indefinitely.
  const extendedItems = useMemo(
    () => [...items, ...items, ...items],
    [items]
  );

  const [activeIndex, setActiveIndex] = useState(count);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [suppressClick, setSuppressClick] = useState(false);
  // When snapping, we disable the CSS transition for one frame
  const [isSnapping, setIsSnapping] = useState(false);

  const viewportRef = useRef(null);
  const activeIndexRef = useRef(count);
  const dragStartRef = useRef({ x: 0, moved: false });
  const snapTimerRef = useRef(null);
  const isDraggingRef = useRef(false);

  const { cardWidth, gap } = getCardMetrics(viewportWidth || 1200);
  const stride = cardWidth + gap;

  activeIndexRef.current = activeIndex;

  const measure = useCallback(() => {
    if (viewportRef.current) {
      setViewportWidth(viewportRef.current.offsetWidth);
    }
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // After each animated transition finishes, silently jump back to the
  // middle copy if we've drifted into copy-A or copy-C.
  const scheduleSnap = useCallback(() => {
    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    snapTimerRef.current = setTimeout(() => {
      const current = activeIndexRef.current;
      const needsSnap = current < count || current >= count * 2;
      if (!needsSnap) return;

      // Disable transition → move index → re-enable transition
      setIsSnapping(true);
      setActiveIndex((idx) => {
        if (idx >= count * 2) return idx - count;
        if (idx < count) return idx + count;
        return idx;
      });
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsSnapping(false))
      );
    }, TRANSITION_MS + 16);
  }, [count]);

  const goTo = useCallback(
    (index) => {
      if (count === 0) return;
      setActiveIndex(index);
      scheduleSnap();
    },
    [count, scheduleSnap]
  );

  const goNext = useCallback(() => goTo(activeIndexRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(activeIndexRef.current - 1), [goTo]);

  const goNextRef = useRef(goNext);
  goNextRef.current = goNext;

  useEffect(() => {
    if (!autoplay || count <= 1) return undefined;
    const timer = setInterval(() => {
      if (!isDraggingRef.current) goNextRef.current();
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [autoplay, count]);

  useEffect(
    () => () => {
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    },
    []
  );

  /* ── Pointer / drag handlers ── */
  const handlePointerDown = (e) => {
    if (count <= 1) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isDraggingRef.current = true;
    setIsDragging(true);
    setSuppressClick(false);
    dragStartRef.current = { x: e.clientX, moved: false };
    viewportRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartRef.current.x;
    if (Math.abs(delta) > CLICK_GUARD_PX) dragStartRef.current.moved = true;
    setDragOffset(delta);
  };

  const finishDrag = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    if (viewportRef.current?.hasPointerCapture(e.pointerId)) {
      viewportRef.current.releasePointerCapture(e.pointerId);
    }
    const delta = e.clientX - dragStartRef.current.x;
    const threshold = stride * DRAG_THRESHOLD_RATIO;
    if (dragStartRef.current.moved) {
      setSuppressClick(true);
      if (delta < -threshold) goNext();
      else if (delta > threshold) goPrev();
      setTimeout(() => setSuppressClick(false), 50);
    }
    setDragOffset(0);
  };

  const handlePointerUp = (e) => finishDrag(e);
  const handlePointerCancel = (e) => finishDrag(e);

  if (count === 0) return null;

  const baseTranslateX =
    viewportWidth > 0
      ? viewportWidth / 2 - cardWidth / 2 - activeIndex * stride
      : 0;

  const trackTranslateX = baseTranslateX + dragOffset;

  // Map virtual activeIndex → real item index (for dots)
  const realActiveIndex = ((activeIndex % count) + count) % count;

  return (
    <div className="movie-3d-carousel">
      <div className="movie-3d-carousel__glow" aria-hidden />

      <div
        className={`movie-3d-carousel__viewport${isDragging ? " movie-3d-carousel__viewport--dragging" : ""}`}
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={(e) => {
          if (isDraggingRef.current && e.buttons === 0) finishDrag(e);
        }}
        style={{
          "--movie-card-width": `${cardWidth}px`,
          "--movie-card-gap": `${gap}px`,
          touchAction: "pan-y",
        }}
      >
        <div
          className="movie-3d-carousel__perspective"
          style={{ perspective: "1400px" }}
        >
          <div
            className="movie-3d-carousel__track"
            style={{
              transform: `translateX(${trackTranslateX}px)`,
              transition:
                isDragging || isSnapping
                  ? "none"
                  : `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          >
            {extendedItems.map((item, index) => {
              const offset = index - activeIndex;
              // Skip rendering cards that are too far away (keep their slot for layout)
              if (Math.abs(offset) > 3) {
                return (
                  <div
                    key={`${item.id}-${index}`}
                    className="movie-3d-carousel__slot"
                  />
                );
              }
              return (
                <MovieCard
                  key={`${item.id}-${index}`}
                  item={item}
                  offset={offset}
                  isActive={offset === 0}
                  onSelect={() => goTo(index)}
                  suppressClick={suppressClick || isDragging}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="movie-3d-carousel__dots"
        role="tablist"
        aria-label="Workshops"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={index === realActiveIndex}
            aria-label={`Go to ${item.title}`}
            className={`movie-3d-carousel__dot${
              index === realActiveIndex ? " movie-3d-carousel__dot--active" : ""
            }`}
            onClick={() => {
              // Jump to the equivalent position in the middle copy
              goTo(count + index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel3D;
