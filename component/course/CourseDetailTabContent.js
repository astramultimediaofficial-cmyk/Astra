import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";

const CourseDetailTabContent = ({ courseData }) => {
  const [activeKey, setActiveKey] = useState("overview");
  const overviewParagraphs = courseData.overviewParagraphs ?? [
    `${courseData.title} is designed with a practical, job-ready approach so learners can confidently apply skills in real projects.`,
    "The curriculum combines guided sessions, assignments, and mentorship to build both fundamentals and advanced capability.",
  ];
  const learningPoints = courseData.learningPoints ?? [
    "Hands-on activities and practical exercises.",
    "Structured modules from basics to advanced concepts.",
    "Mentor guidance with regular progress feedback.",
    "Project work aligned to industry expectations.",
  ];
  const courseFeatures = courseData.courseFeatures ?? [
    "Flexible learning schedule.",
    "Career-focused curriculum.",
    "Portfolio development support.",
    "Certification on completion.",
  ];

  const handleSelect = (key) => {
    setActiveKey(key);
  };

  return (
    <Tab.Container activeKey={activeKey} onSelect={handleSelect}>
      <div>
        <Nav
          variant="pills"
          className="nav nav-pills"
          id="pills-tab"
          role="tablist"
        >
          <Nav.Item>
            <Nav.Link eventKey="overview">Overview</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="instructors">Instructors</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reviews" id="reviews">
              Reviews
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <Tab.Content id="pills-tabContent">
        <Tab.Pane eventKey="overview">
          <div className="tf__course_overview">
            <h3>Description</h3>
            {overviewParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <h3>What you will learn:</h3>
            <ul>
              {learningPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            <h3>Course features:</h3>
            <ul>
              {courseFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </Tab.Pane>
        <Tab.Pane eventKey="instructors">
          <div className="tf__course_instructor">
            <div className="row">
              <div className="col-xl-5 col-md-6">
                <div className="tf__course_instructor_img">
                  <img
                    src={`/${courseData.instructorImg}`}
                    alt="instructor"
                    className="img-fluid w-100"
                  />
                </div>
              </div>
              <div className="col-xl-7 col-md-6">
                <div className="tf__course_instructor_text">
                  <h4>{courseData.instructor}</h4>
                  <p>096002 92830</p>
                  <p>astramultimediaofficial@gmail.com</p>
                  <p>
                    <span>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </span>
                    ({courseData.rating} Rating)
                  </p>
                  <ul className="d-flex flex-wrap align-items-center">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-pinterest-p"></i>
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
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>
        <Tab.Pane eventKey="reviews">
          <div className="tf__courses_review">
            <div className="tf__blog_comment">
              <h3>reviews (03)</h3>
              <div className="tf__single_comment">
                <div className="tf__single_comment_img">
                  <img
                    src="/images/client_img_1.png"
                    alt="client"
                    className="img-fluid w-100"
                  />
                </div>
                <div className="tf__single_comment_text">
                  <h4>
                    Akalya Senthilkumar <span>recent student review</span>
                  </h4>
                  <span className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </span>
                  <p>
                    Astra multimedia is the best place to gain knowledge. The
                    teaching guides are very supportive.
                  </p>
                </div>
              </div>
              <div className="tf__single_comment">
                <div className="tf__single_comment_img">
                  <img
                    src="/images/client_img_2.png"
                    alt="client"
                    className="img-fluid w-100"
                  />
                </div>
                <div className="tf__single_comment_text">
                  <h4>
                    Prithivraj Sridevi <span>recent student review</span>
                  </h4>
                  <span className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </span>
                  <p>
                    They do not just teach tools; they teach artistic thinking
                    with high-quality mentorship.
                  </p>
                </div>
              </div>
              <div className="tf__single_comment">
                <div className="tf__single_comment_img">
                  <img
                    src="/images/client_img_3.png"
                    alt="client"
                    className="img-fluid w-100"
                  />
                </div>
                <div className="tf__single_comment_text">
                  <h4>
                    SarthKannan <span>recent student review</span>
                  </h4>
                  <span className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </span>
                  <p>
                    Great animation institute in Coimbatore with clear
                    step-by-step teaching.
                  </p>
                </div>
              </div>
            </div>
            <div className="tf__comment_reply mt_65">
              <h3>leave a review</h3>
              <p>
                <span>select your rating:</span>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </p>
              <form>
                <div className="row">
                  <div className="col-xl-6">
                    <input type="text" placeholder="Name" />
                  </div>
                  <div className="col-xl-6">
                    <input type="email" placeholder="Email" />
                  </div>
                  <div className="col-xl-12">
                    <textarea rows="5" placeholder="Text..."></textarea>
                    <button type="submit">submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default CourseDetailTabContent;
