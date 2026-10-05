import { testimonialData } from "@/data/Data";
import React from "react";
import Slider from "react-slick";

const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TestimonialSlider = () => {
  return (
    <Slider
      className="row testimonial_slider"
      slidesToShow={2}
      infinite={true}
      dots={true}
      arrows={false}
      autoplay={true}
      autoplaySpeed={5000}
      speed={800}
      slidesToScroll={1}
      responsive={[
        {
          breakpoint: 992,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 1 },
        },
      ]}
    >
      {testimonialData.map((item, index) => (
        <div
          className="col-xl-6 wow fadeInUp"
          key={item.id}
          data-wow-delay={`${index * 0.15}s`}
        >
          <div className="tf__single_testimonial">
            <div className="icon">
              <i className="fas fa-quote-left" aria-hidden />
            </div>
            <p className="description">{item.desc}</p>
            <div className="home-testimonial__avatar" aria-label={item.name}>
              <span>{getInitials(item.name)}</span>
            </div>
            <h3 className="title">{item.name}</h3>
            <p className="designation">{item.designation}</p>
            <p className="rating" aria-label="3 out of 5 stars">
              <i className="fas fa-star fill" />
              <i className="fas fa-star fill" />
              <i className="fas fa-star fill" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
            </p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TestimonialSlider;
