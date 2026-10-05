import Link from "next/link";
import React from "react";

const FooterSection = () => {
  return (
    <footer className="tf__footer mt_100">
      <div className="tf__footer_overlay pt_75">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-xl-3 col-sm-10 col-md-7 col-lg-6">
              <div className="tf__footer_logo_area">
                <Link className="footer_logo" href="/">
                  <img
                    src="/images/logo.png"
                    alt="Astra Multimedia"
                    className="img-fluid w-100"
                  />
                </Link>
                <p>
                  Astra Multimedia is a full-service creative powerhouse
                  dedicated to stellar digital solutions. We combine expert
                  graphic design, video production, and multimedia strategy to
                  give your brand the celestial edge it deserves.
                </p>
                <ul className="d-flex flex-wrap">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-pinterest-p"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-sm-10 col-md-5 col-lg-5">
              <div className="tf__footer_content xs_mt_50">
                <h3>Quick Links</h3>
                <ul>
                  <li>
                    <Link href="/courses">Best Services</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/contact">Business Contact</Link>
                  </li>
                  <li>
                    <Link href="/contact">Make an appointment</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-sm-10 col-md-7 col-lg-col-lg-6">
              <div className="tf__footer_content xs_mt_30">
                <h3>Our Contacts</h3>
                <p>
                  Address: Third floor, 2, Sarkarayar St, BR Puram, Peelamedu
                  Post, Hope College, Coimbatore, Tamil Nadu 641004
                </p>
                <p>
                  <span>Phone: 096002 92830</span>
                </p>
                <p>
                  <span>Email: astramultimediaofficial@gmail.com</span>
                  <span>Website:</span>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="tf__copyright">
                <p>Copyright © Astra Multimedia. All rights reserved.</p>
                <ul className="d-flex flex-wrap">
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
