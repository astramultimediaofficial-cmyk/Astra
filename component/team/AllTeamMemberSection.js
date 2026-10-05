"use client";
import { useAstraContext } from "@/context/AstraContext";
import React, { useCallback, useEffect, useRef, useState } from "react";

// ─── Config ───────────────────────────────────────────────────────────────────
const AUTO_SLIDE_INTERVAL_MS = 4000;

// ─── Scoped styles (injected once, isolated to this section) ─────────────────
const TEAM_STYLES = `
  /* ── Progress bar ──────────────────────────────────────────────── */
  @keyframes tf-team-progress {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  .tf-team__progress-track {
    height: 3px;
    background: rgba(0, 0, 0, 0.07);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 40px;
  }
  .tf-team__progress-fill {
    height: 100%;
    transform-origin: left center;
    border-radius: 2px;
    background: linear-gradient(90deg, #e74c3c 0%, #ff6b35 100%);
    animation: tf-team-progress ${AUTO_SLIDE_INTERVAL_MS}ms linear forwards;
  }
  .tf-team__progress-fill.paused {
    animation-play-state: paused;
  }

  /* ── Card entrance (staggered) ─────────────────────────────────── */
  @keyframes tf-team-card-in {
    from {
      opacity: 0;
      transform: translateY(28px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  .tf-team__card-animate {
    animation: tf-team-card-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .tf-team__card-animate:nth-child(1) { animation-delay: 0ms; }
  .tf-team__card-animate:nth-child(2) { animation-delay: 70ms; }
  .tf-team__card-animate:nth-child(3) { animation-delay: 140ms; }

  /* ── Card hover lift + glow ────────────────────────────────────── */
  .tf-team__card-animate .tf__single_team {
    transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1),
                box-shadow 0.38s ease !important;
    will-change: transform, box-shadow;
  }
  .tf-team__card-animate .tf__single_team:hover {
    transform: translateY(-12px) !important;
    box-shadow: 0 28px 56px rgba(0, 0, 0, 0.13) !important;
  }

  /* ── Social links: hidden → slide-up on card hover ────────────── */
  .tf-team__card-animate .tf__single_team_img ul {
    transition: opacity 0.3s ease,
                transform 0.38s cubic-bezier(0.22, 1, 0.36, 1) !important;
    transform: translateY(14px) !important;
    opacity: 0 !important;
  }
  .tf-team__card-animate .tf__single_team:hover .tf__single_team_img ul {
    transform: translateY(0) !important;
    opacity: 1 !important;
  }

  /* ── Pill-dot pagination ───────────────────────────────────────── */
  .tf-team__dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .tf-team__dot {
    width: 10px;
    height: 10px;
    border-radius: 20px;
    background: #d9dfe8;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                background 0.3s ease,
                box-shadow 0.3s ease;
    outline: none;
  }
  .tf-team__dot.active {
    width: 36px;
    background: linear-gradient(90deg, #e74c3c, #ff6b35);
    box-shadow: 0 3px 12px rgba(231, 76, 60, 0.42);
  }
  .tf-team__dot:focus-visible {
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.35);
  }

  /* ── Circular arrow buttons ────────────────────────────────────── */
  .tf-team__nav-btn {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 2px solid #e2e8f0;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    color: #64748b;
    transition: background 0.25s ease,
                border-color 0.25s ease,
                color 0.25s ease,
                box-shadow 0.25s ease,
                transform 0.2s ease;
    outline: none;
    flex-shrink: 0;
  }
  .tf-team__nav-btn:hover {
    background: linear-gradient(135deg, #e74c3c, #ff6b35);
    border-color: transparent;
    color: #ffffff;
    box-shadow: 0 8px 24px rgba(231, 76, 60, 0.38);
    transform: scale(1.1);
  }
  .tf-team__nav-btn:active {
    transform: scale(0.96);
  }
  .tf-team__nav-btn:focus-visible {
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.35);
  }

  /* ── Pause badge ───────────────────────────────────────────────── */
  .tf-team__pause-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(15, 23, 42, 0.62);
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    padding: 4px 11px;
    border-radius: 20px;
    opacity: 0;
    pointer-events: none;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: opacity 0.2s ease;
    z-index: 10;
    text-transform: uppercase;
  }
  .tf-team__section:hover .tf-team__pause-badge {
    opacity: 1;
  }

  /* ── Controls row ──────────────────────────────────────────────── */
  .tf-team__controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 44px;
  }

  /* ── Page counter badge ────────────────────────────────────────── */
  .tf-team__counter {
    font-size: 12px;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.05em;
    min-width: 40px;
    text-align: center;
    user-select: none;
  }
  .tf-team__counter span {
    color: #e74c3c;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
const AllTeamMemberSection = () => {
  const {
    currentTeamItems,
    currentTeamPage,
    setCurrentTeamPage,   // silent — no scroll side-effect
    handleTeamPageChange, // manual — scrolls to section
    totalTeamPages,
  } = useAstraContext();

  const [isPaused, setIsPaused] = useState(false);

  // Interval ref — stable reference prevents duplicates
  const intervalRef = useRef(null);

  // Refs mirror context values to fix stale closures inside setInterval
  const currentTeamPageRef = useRef(currentTeamPage);
  const totalTeamPagesRef  = useRef(totalTeamPages);

  useEffect(() => { currentTeamPageRef.current = currentTeamPage; }, [currentTeamPage]);
  useEffect(() => { totalTeamPagesRef.current  = totalTeamPages;  }, [totalTeamPages]);

  // ── Auto-slide ─────────────────────────────────────────────────────────────
  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      const next =
        currentTeamPageRef.current >= totalTeamPagesRef.current
          ? 1
          : currentTeamPageRef.current + 1;
      setCurrentTeamPage(next);
    }, AUTO_SLIDE_INTERVAL_MS);
  }, [stopAutoSlide, setCurrentTeamPage]);

  useEffect(() => {
    if (isPaused) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
    return stopAutoSlide; // cleanup on unmount
  }, [isPaused, startAutoSlide, stopAutoSlide]);

  // ── Navigation handlers (circular) ────────────────────────────────────────
  const handlePrev = () => {
    const prev = currentTeamPage > 1 ? currentTeamPage - 1 : totalTeamPages;
    handleTeamPageChange(prev);
  };

  const handleNext = () => {
    const next = currentTeamPage < totalTeamPages ? currentTeamPage + 1 : 1;
    handleTeamPageChange(next);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Scoped styles — injected into <head> once per mount */}
      <style>{TEAM_STYLES}</style>

      <section
        className="tf__team_page tf-team__section mt_190 xs_mt_95"
        style={{ position: "relative" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ── Pause badge (visible on hover) ─────────────────────────── */}
        <span className="tf-team__pause-badge" aria-hidden="true">
          ⏸ Paused
        </span>

        <div className="container">
          {/* ── Heading ──────────────────────────────────────────────── */}
          <div className="row wow fadeInUp">
            <div className="col-xl-6 col-md-8 col-lg-6 m-auto">
              <div className="tf__heading_area mb_15">
                <h5>OUR MENTORS</h5>
                <h2>Learn from experienced industry professionals.</h2>
              </div>
            </div>
          </div>

          {/* ── Animated progress bar ────────────────────────────────── */}
          {/* key re-mounts the fill div on every page change, restarting the animation */}
          <div
            className="tf-team__progress-track"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={totalTeamPages}
            aria-valuenow={currentTeamPage}
            aria-label="Auto-slide progress"
          >
            <div
              key={`progress-${currentTeamPage}`}
              className={`tf-team__progress-fill${isPaused ? " paused" : ""}`}
            />
          </div>

          {/* ── Team cards ───────────────────────────────────────────── */}
          {/* key forces React to remount the row, triggering entrance animation */}
          <div className="row" key={`slide-${currentTeamPage}`}>
            {currentTeamItems.map((item) => (
              <div
                className="col-xl-4 col-md-6 tf-team__card-animate"
                key={item.id}
              >
                <div className="tf__single_team">
                  <div className="tf__single_team_img">
                    <img
                      src={item.imgSrc}
                      alt={item.name}
                      className="img-fluid w-100"
                    />
                    <ul aria-label={`${item.name} social links`}>
                      <li>
                        <a href="#" aria-label="Facebook">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" aria-label="LinkedIn">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" aria-label="Twitter">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" aria-label="Pinterest">
                          <i className="fab fa-pinterest-p"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tf__single_team_text">
                    <span className="title">{item.name}</span>
                    <p>{item.designation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Controls: Prev | Progress dots | Counter | Next ──────── */}
          <div className="tf-team__controls">
            {/* Prev button */}
            <button
              className="tf-team__nav-btn"
              onClick={handlePrev}
              aria-label="Previous team group"
            >
              <i className="far fa-angle-left"></i>
            </button>

            {/* Pill dots */}
            <div className="tf-team__dots" role="tablist" aria-label="Team page navigation">
              {Array.from({ length: totalTeamPages }, (_, i) => (
                <button
                  key={i}
                  className={`tf-team__dot${currentTeamPage === i + 1 ? " active" : ""}`}
                  onClick={() => handleTeamPageChange(i + 1)}
                  role="tab"
                  aria-selected={currentTeamPage === i + 1}
                  aria-label={`Go to team group ${i + 1}`}
                />
              ))}
            </div>

            {/* Page counter e.g. "1 / 2" */}
            <span className="tf-team__counter" aria-live="polite">
              <span>{currentTeamPage}</span> / {totalTeamPages}
            </span>

            {/* Next button */}
            <button
              className="tf-team__nav-btn"
              onClick={handleNext}
              aria-label="Next team group"
            >
              <i className="far fa-angle-right"></i>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllTeamMemberSection;
