"use client";

import Link from "next/link";

const ENROLL_URL =
  "https://wa.me/919677606913?text=Hi!%20I%20would%20like%20to%20enroll%20today.";

const HERO_VIDEO_SRC = "/videos/hero-animation.mp4";

const HomeHero = () => {
  return (
    <section className="home-hero home-hero--video">
      <div className="home-hero__media" aria-hidden>
        <video
          className="home-hero__video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
      <div className="home-hero__dim" aria-hidden />
      <div className="home-hero__scrim" aria-hidden />

      <div className="home-hero__inner">
        <div className="home-hero__grid">
          <div className="home-hero__col home-hero__col--left">
            <h5 className="home-hero__eyebrow">Welcome to Astra!</h5>
            <h1 className="home-hero__title">
              Shape Your Future <span>Brighter</span>
            </h1>
            <p className="home-hero__text">
              Join a community dedicated to academic excellence and personal
              growth. Our proven curriculum helps learners unlock their full
              potential.
            </p>
            <div className="home-hero__actions">
              <a
                className="btn-hero-primary"
                href={ENROLL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enroll Today
              </a>
              <Link className="btn-hero-ghost btn-hero-ghost--on-video" href="/courses">
                View Courses
              </Link>
            </div>
          </div>

          <div className="home-hero__col home-hero__col--center" aria-hidden />

          <div className="home-hero__col home-hero__col--right">
            <h2 className="home-hero__title home-hero__title--sm">
              Study Flexibly at Your Own Pace
            </h2>
            <p className="home-hero__text">
              Our courses are designed to fit your schedule. Access high-quality
              training materials and expert mentorship from anywhere.
            </p>
            <div className="home-hero__actions">
              <Link className="btn-hero-ghost btn-hero-ghost--on-video" href="/courses">
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="home-hero__fade" aria-hidden />
    </section>
  );
};

export default HomeHero;
