"use client";

import React from "react";
import EventSlider from "../slider/EventSlider";

const EventSection = ({ section, startIndex, endIndex }) => {
  return (
    <section className={`${section} event-section--movie-3d`}>
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-8 m-auto wow fadeInUp">
            <div className="tf__heading_area mb_40 event-section--movie-3d__heading">
              <h5>OUR Upcoming Events</h5>
              <h2>Join Our Intensive One-Day Workshops.</h2>
            </div>
          </div>
        </div>
        <EventSlider startIndex={startIndex} endIndex={endIndex} />
      </div>
    </section>
  );
};

export default EventSection;
