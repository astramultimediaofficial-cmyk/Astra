import React from "react";

const CategorySection = () => {
  return (
    <section className="tf__categories mt_95">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-md-8 col-lg-6 m-auto wow fadeInUp">
            <div className="tf__heading_area mb_15">
              <h5>OUR COURSE CATEGORIES</h5>
              <h2>Industry-ready programs for creative professionals.</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-md-6 wow fadeInUp">
            <div className="tf__single_category light_blue">
              <div className="tf__single_category_icon">
                <i className="fa fa-book"></i>
              </div>
              <div className="tf__single_category_text">
                <h3>Graphic Design</h3>
                <p>
                  Master visual communication, layout, and brand identity design.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 wow fadeInUp">
            <div className="tf__single_category blue">
              <div className="tf__single_category_icon">
                <i className="fa fa-book"></i>
              </div>
              <div className="tf__single_category_text">
                <h3>2D & 3D Animation</h3>
                <p>
                  Bring characters and worlds to life with rigging and motion.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 wow fadeInUp">
            <div className="tf__single_category green">
              <div className="tf__single_category_icon">
                <i className="fa fa-book"></i>
              </div>
              <div className="tf__single_category_text">
                <h3>VFX</h3>
                <p>
                  Learn compositing, simulations, and cinematic visual effects.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 wow fadeInUp">
            <div className="tf__single_category gray">
              <div className="tf__single_category_icon">
                <i className="fa fa-book"></i>
              </div>
              <div className="tf__single_category_text">
                <h3>Video Editing</h3>
                <p>
                  Master storytelling through editing, audio, and color grading.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 wow fadeInUp">
            <div className="tf__single_category orange">
              <div className="tf__single_category_icon">
                <i className="fa fa-book"></i>
              </div>
              <div className="tf__single_category_text">
                <h3>UI/UX Design</h3>
                <p>
                  Design user-focused digital experiences and prototypes.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 wow fadeInUp">
            <div className="tf__single_category red">
              <div className="tf__single_category_icon">
                <i className="fa fa-book"></i>
              </div>
              <div className="tf__single_category_text">
                <h3>Digital Marketing</h3>
                <p>
                  Build online growth using SEO, ads, and content strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
