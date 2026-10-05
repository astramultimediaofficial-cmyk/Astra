import Link from "next/link";
import React from "react";

const AboutSection = () => {
  return (
    <section className="tf__about mt_250 xs_mt_195">
      <div className="container">
        <div className="tf__about_top wow fadeInUp">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className="tf__about_top_img">
                <img
                  src="images/about_top_img.png"
                  alt="about"
                  className="img-fluid w-100"
                />
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="tf__about_top_text">
                <div className="tf__about_top_text_center">
                  <h4>Study Flexibly at Your Own Pace</h4>
                  <p>
                    Our courses are designed to fit your schedule. Access
                    high-quality training materials and expert mentorship from
                    anywhere.
                  </p>
                </div>
                <a
                  href="/courses"
                  className="common_btn"
                  style={{
                    background: "white",
                    color: "#4582ff",
                    marginTop: "25px",
                    fontWeight: "700",
                  }}
                >
                  View Courses
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6 col-md-9 col-lg-6 wow fadeInLeft">
            <div className="tf__about_text">
              <div className="tf__heading_area tf__heading_area_left mb_25">
                <h5>ABOUT OUR ACADEMY</h5>
                <h2>Shaping the Next Generation of Creative Professionals.</h2>
              </div>
              <p>
                We provide industry-standard training in multimedia and digital
                arts. Our mission is to bridge the gap between classroom
                learning and professional career demands.
              </p>
              <ul>
                <li>Dedicated career mentorship and support.</li>
                <li>Flexible learning modes.</li>
                <li>Hands-on project-based learning.</li>
                <li>Industry-relevant course curriculum.</li>
                <li>Comprehensive portfolio development.</li>
              </ul>
              <Link href="/about" className="common_btn">
                About Us
              </Link>
            </div>
          </div>
          <div className="col-xl-6 col-sm-9 col-md-8 col-lg-6 wow fadeInRight">
            <div className="tf__about_img">
              <img
                src="images/about_img.jpg"
                alt="about"
                className="img-fluid w-100"
              />
              <div className="text">
                <i className="far fa-check-circle"></i>
                <h3>1000+</h3>
                <p>Learners Trained</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
