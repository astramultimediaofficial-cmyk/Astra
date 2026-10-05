"use client";
import { useAstraContext } from "@/context/AstraContext";
import Link from "next/link";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const BannerSection = () => {
  const { handleVideoShow } = useAstraContext();

  return (
    <section className="tf__banner">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-8">
            <div className="tf__banner_text wow fadeInUp">
              <h5>Welcome to Astra!</h5>
              <h1>
                Shape Your Future <span>Brighter</span>
              </h1>
              <p>
                Join a community dedicated to academic excellence and personal
                growth. Our proven curriculum helps learners unlock their full
                potential.
              </p>
              <ul className="d-flex flex-wrap align-items-center">
                <li>
                  <a
                    className="common_btn"
                    href="https://wa.me/919677606913?text=Hi!%20I%20would%20like%20to%20enroll%20today."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ENROLL TODAY
                  </a>
                </li>
                <li>
                  <a
                    className="venobox play_btn"
                    role="button"
                    onClick={handleVideoShow}
                  >
                    <i className="fas fa-play"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
