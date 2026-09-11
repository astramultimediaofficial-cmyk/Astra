"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const COURSES = [
  {
    id: "dm",
    num: "01",
    name: "Digital Marketing",
    tag: "Learn online marketing strategies to grow businesses digitally.",
    modules: [
      ["Core Modules", "SEO, SEM, Social Media Marketing (SMM), Google Ads, PPC Campaigns, Content Marketing"],
      ["Advanced Topics", "Keyword Research, Competitor Analysis, On/Off-Page SEO, Technical SEO, Local SEO, YouTube Marketing"],
      ["Performance & Analytics", "Google Analytics, Google Search Console, Campaign Tracking & Reporting, Conversion Tracking"],
      ["Advertising & Growth", "Meta Ads, Facebook & Instagram Ads, Display Advertising, Remarketing, Lead Generation"],
      ["Content & Branding", "Copywriting, Blogging, Content Strategy, Email Marketing, Funnel Building"],
    ],
    careers: ["Digital Marketer", "SEO Specialist", "Freelancer"],
  },
  {
    id: "gd",
    num: "02",
    name: "Graphic Designing",
    tag: "Learn creative visual design, branding, and digital content creation.",
    modules: [
      ["Core Modules", "Design Principles, Color Theory, Typography, Layout Design, Photoshop & Illustrator Basics"],
      ["Creative Design Skills", "Logo Design, Branding, Poster & Flyer Design, Business Card & Brochure Design"],
      ["Advanced Topics", "Photo Retouching, Image Manipulation, Vector Illustration, Packaging Design, UI Elements"],
      ["Digital & Marketing Design", "Instagram Posts, Facebook Ads, YouTube Thumbnails, Ad Creatives"],
      ["Tools & Technology", "Photoshop, Illustrator, Canva, AI Design Tools, AI Image Generation"],
    ],
    careers: ["Graphic Designer", "Brand Designer", "Freelancer", "Social Media Designer", "Entrepreneur"],
  },
  {
    id: "an",
    num: "03",
    name: "2D / 3D Animation",
    tag: "Create animations for films, ads, and digital media.",
    modules: [
      ["Core Modules", "Principles of Animation, Storyboarding, Character Design, Timing, Visual Storytelling"],
      ["2D Animation", "Frame-by-Frame Animation, Motion Graphics, Explainer Videos, Typography Animation"],
      ["3D Animation", "3D Modeling, Texturing, Lighting, Rigging, Rendering, Scene Creation"],
      ["Tools & Software", "Blender, After Effects, Maya, AI Animation Tools"],
      ["Advanced Topics", "Visual Effects Basics, Compositing, Camera Animation, Simulation, Short Film Creation"],
    ],
    careers: ["2D Animator", "3D Animator", "Motion Graphics Designer", "VFX Artist"],
  },
  {
    id: "ux",
    num: "04",
    name: "UI/UX Design",
    tag: "Turn your creativity into high-paying digital skills.",
    modules: [
      ["Core Modules", "UI Design Fundamentals, UX Principles, Design Thinking, Color Theory, Typography"],
      ["UI Design", "Wireframing, Prototyping, Mobile App Design, Website Design, Design Systems"],
      ["UX Design", "User Research, Personas, User Journey Mapping, Usability Testing, Interaction Design"],
      ["Tools & Technology", "Figma, Adobe XD, Photoshop, Illustrator, HTML/CSS/JavaScript, AI Design Tools"],
      ["Advanced Topics", "Micro Interactions, Accessibility Design, UX Strategy, Real-world Case Studies"],
    ],
    careers: ["UI Designer", "UX Designer", "Product Designer", "Freelancer"],
  },
  {
    id: "vfx",
    num: "05",
    name: "VFX",
    tag: "Turn your creativity into cinematic visual effects.",
    modules: [
      ["Core Modules", "Compositing, Layers & Blending, Green Screen Editing, Masking & Keying, Motion Tracking"],
      ["Editing & Techniques", "Rotoscoping, Object Removal, Clean Plate Creation, Scene Composition"],
      ["Color & Finishing", "Color Correction, Color Grading, Cinematic Effects, Visual Enhancement"],
      ["Tools & Technology", "Adobe After Effects, Premiere Pro, Nuke, VFX Plugins, AI Tools"],
      ["Advanced Topics", "Camera Tracking, 3D Tracking, CGI Compositing, Lighting & Shadow Matching"],
    ],
    careers: ["VFX Artist", "Compositor", "Video Effects Editor", "Motion Graphics Artist"],
  },
  {
    id: "ve",
    num: "06",
    name: "Video Editing",
    tag: "Create engaging videos with industry-level skills.",
    modules: [
      ["Core Modules", "Timeline & Interface, Clip Arrangement, Cutting, Trimming, Transitions, Export Settings"],
      ["Editing & Techniques", "Multi-layer Editing, Speed Ramping, Slow Motion, Jump Cuts, Match Cuts"],
      ["Audio & Sound", "Background Music Sync, Sound Effects, Voice Over Editing, Noise Reduction, Mixing"],
      ["Tools & Technology", "Adobe After Effects, Premiere Pro, Media Encoder, Plugins & Presets, AI Tools"],
      ["Advanced Topics", "Motion Graphics Basics, Green Screen Editing, Multi-Camera Editing, Cinematic Effects"],
    ],
    careers: ["Video Editor", "Content Creator", "Film Editor", "Motion Graphics Editor"],
  },
];

const PROGRAMS = [
  {
    track: "Track / 01",
    title: "1 Month",
    dur: "Fast-Track Certificate",
    copy: "Quick skill development program to get you job-ready on the essentials.",
  },
  {
    track: "Track / 02",
    title: "3 Month",
    dur: "Professional Mastery",
    copy: "Advanced skill building combined with live client-style projects.",
  },
  {
    track: "Track / 03",
    title: "6 Month",
    dur: "Advanced Diploma",
    copy: "Comprehensive training with a full portfolio development track.",
  },
  {
    track: "Track / 04",
    title: "1 Year",
    dur: "Professional Diploma",
    copy: "Complete career training with internship and 100% placement support.",
  },
];

const LEADS_KEY = "astra_enroll_leads_v1";

const emptyForm = {
  fname: "",
  fmobile: "",
  fcourse: "",
  faddress: "",
  fyear: "",
  fqual: "",
};

function loadLeads() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLead(record) {
  const leads = loadLeads();
  leads.unshift(record);
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  return leads;
}

export default function AstraLandingPage() {
  const [activeCourse, setActiveCourse] = useState(COURSES[0].id);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [formMsg, setFormMsg] = useState({ text: "", type: "" });
  const [submitting, setSubmitting] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const rootRef = useRef(null);

  const active = useMemo(
    () => COURSES.find((c) => c.id === activeCourse) || COURSES[0],
    [activeCourse]
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const nodes = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const preselectCourse = (name) => {
    setForm((prev) => ({ ...prev, fcourse: name }));
    setErrors((prev) => ({ ...prev, fcourse: false }));
  };

  const validate = () => {
    const next = {
      fname: !form.fname.trim(),
      fmobile: !/^\d{10}$/.test(form.fmobile.trim()),
      fcourse: !form.fcourse,
      faddress: !form.faddress.trim(),
      fyear: (() => {
        const yearNum = parseInt(form.fyear, 10);
        return !yearNum || yearNum < 1980 || yearNum > 2030;
      })(),
      fqual: !form.fqual,
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setFormMsg({ text: "Please fix the highlighted fields.", type: "err" });
      return;
    }
    setSubmitting(true);
    setFormMsg({ text: "", type: "" });
    try {
      const record = {
        ...form,
        submittedAt: new Date().toISOString(),
      };
      const updated = saveLead(record);
      setLeads(updated);
      setFormMsg({
        text: "Application submitted! Our team will call you shortly.",
        type: "ok",
      });
      setForm(emptyForm);
    } catch {
      setFormMsg({
        text: "Something went wrong — please try again.",
        type: "err",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleAdmin = () => {
    setAdminOpen((open) => {
      const next = !open;
      if (next) setLeads(loadLeads());
      return next;
    });
  };

  return (
    <div className="astra-landing" ref={rootRef}>
      <header className="al-header">
        <nav className="wrap">
          <div className="logo">
            <a href="#top" aria-label="Astra Institute of Multimedia">
              <img src="/images/logo.png" alt="Astra Multimedia" width={150} height={50} />
            </a>
          </div>
          <div className="navlinks">
            <a href="#about">About</a>
            <a href="#programs">Programs</a>
            <a href="#courses">Courses</a>
            <a href="#enroll">Enroll</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="#enroll" className="btn btn-solid navcta">
            Enroll Now
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">All courses with AI integration</div>
            <h1>
              Upgrade your <span className="hl">skills.</span>
              <br />
              Build your <span className="hl2">career.</span>
            </h1>
            <p className="lead">
              Coimbatore&apos;s industry-oriented training hub for UI/UX, Graphic Design, Web
              Development, 2D/3D Animation, VFX, Video Editing, SAP, DSA and Digital Marketing —
              taught with 100% licensed, AI-powered tools.
            </p>
            <div className="hero-ctas">
              <a href="#enroll" className="btn btn-solid">
                Enroll Now →
              </a>
              <a href="#courses" className="btn btn-ghost" style={{ color: "var(--paper)" }}>
                View Courses
              </a>
            </div>
            <div className="hero-badges">
              <div className="badge">
                <b>Free</b>&nbsp;Professional English course
              </div>
              <div className="badge">
                <b>100%</b>&nbsp;Placement support
              </div>
              <div className="badge">
                <b>Live</b>&nbsp;Mentoring &amp; recordings
              </div>
            </div>
          </div>
          <div className="reel-visual" aria-hidden="true">
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="150" fill="none" stroke="#e31e2b" strokeWidth="2" />
              <circle
                cx="200"
                cy="200"
                r="150"
                fill="none"
                stroke="#f4b400"
                strokeWidth="1"
                strokeDasharray="2 10"
              />
              <circle
                cx="200"
                cy="200"
                r="46"
                fill="none"
                stroke="#f6f4ef"
                strokeWidth="2"
                opacity=".5"
              />
              <g fill="#f6f4ef" opacity=".9">
                <circle cx="200" cy="80" r="8" />
                <circle cx="304" cy="140" r="8" />
                <circle cx="304" cy="260" r="8" />
                <circle cx="200" cy="320" r="8" />
                <circle cx="96" cy="260" r="8" />
                <circle cx="96" cy="140" r="8" />
              </g>
              <path d="M186 176 L228 200 L186 224 Z" fill="#e31e2b" />
            </svg>
          </div>
        </div>
      </section>

      <div className="stat-strip">
        <div className="wrap">
          <div className="stat">
            <div className="num">8</div>
            <div className="lbl">Programs offered</div>
          </div>
          <div className="stat">
            <div className="num">4</div>
            <div className="lbl">Flexible durations</div>
          </div>
          <div className="stat">
            <div className="num">100%</div>
            <div className="lbl">Placement support</div>
          </div>
          <div className="stat">
            <div className="num">AI</div>
            <div className="lbl">Integrated in every course</div>
          </div>
        </div>
      </div>

      <section id="about">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-quote reveal">
              <div className="mark-big">“</div>
              <p>
                Build your skills. <span className="accent">Shape your career.</span> Create your
                future.
              </p>
            </div>
            <div className="about-copy reveal">
              <div className="section-head" style={{ marginBottom: 20 }}>
                <div className="eyebrow">About Astra</div>
                <h2 style={{ fontSize: "clamp(26px,3.6vw,38px)" }}>
                  Empowering the next generation of digital creators
                </h2>
              </div>
              <p>
                At <strong>Astra Institute of Multimedia</strong>, we believe creativity is best
                nurtured through action. As a premier professional training center, we bridge the gap
                between academic theory and industry reality — we don&apos;t just teach software, we
                build careers.
              </p>
              <p>
                We&apos;re a creative learning hub focused on building the next generation of digital
                designers and tech professionals, with industry-oriented training in{" "}
                <strong>
                  UI/UX Design, Graphic Design, Web Development, 2D/3D Animation, VFX, Video Editing,
                  SAP, DSA and Digital Marketing.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="program-strip">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 10 }}>
            <div className="eyebrow" style={{ color: "var(--gold)" }}>
              Program structure
            </div>
            <h2 style={{ color: "var(--paper)" }}>Pick your pace</h2>
            <p style={{ color: "rgba(246,244,239,.7)" }}>
              Every track — fast or full — includes live mentoring, recordings and study material.
            </p>
          </div>
          <div className="program-grid reveal">
            {PROGRAMS.map((p) => (
              <div className="program-card" key={p.track}>
                <span className="fr">{p.track}</span>
                <h3>{p.title}</h3>
                <div className="dur">{p.dur}</div>
                <p>{p.copy}</p>
              </div>
            ))}
          </div>
          <div className="checklist">
            <div className="item">
              <span className="dot" />
              Industry Experts
            </div>
            <div className="item">
              <span className="dot" />
              Live Mentoring
            </div>
            <div className="item">
              <span className="dot" />
              Recording Available
            </div>
            <div className="item">
              <span className="dot" />
              Study Material Provided
            </div>
          </div>
        </div>
      </section>

      <section id="courses">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Courses</div>
            <h2>What you&apos;ll master</h2>
            <p>
              Six industry-oriented programs, each stacked with core modules, real tools and
              AI-powered workflows.
            </p>
          </div>

          <div className="course-tabs">
            {COURSES.map((c) => (
              <button
                type="button"
                key={c.id}
                className={`tab${activeCourse === c.id ? " active" : ""}`}
                onClick={() => setActiveCourse(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="course-panel active">
            <div className="course-card">
              <div className="course-side">
                <div className="num">{active.num}</div>
                <h3>{active.name}</h3>
                <p>{active.tag}</p>
                <div className="careers">
                  <span className="mono">Career opportunities</span>
                  {active.careers.map((chip) => (
                    <span className="chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <div className="course-body">
                {active.modules.map(([label, items]) => (
                  <div className="mod-group" key={label}>
                    <span className="mono">{label}</span>
                    <div className="items">{items}</div>
                  </div>
                ))}
                <div className="course-foot">
                  <div className="dur-pills">
                    <span>1 Month</span>
                    <span>3 Months</span>
                    <span>6 Months</span>
                    <span>1 Year</span>
                  </div>
                  <a
                    href="#enroll"
                    className="btn btn-ghost"
                    style={{
                      borderColor: "var(--ink)",
                      color: "var(--ink)",
                      padding: "9px 16px",
                      fontSize: 11,
                    }}
                    onClick={() => preselectCourse(active.name)}
                  >
                    Enroll for this course →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="enroll" className="enroll">
        <div className="wrap enroll-grid">
          <div className="enroll-intro reveal">
            <div className="eyebrow" style={{ color: "var(--gold)" }}>
              Admissions open
            </div>
            <h2>Enroll at Astra</h2>
            <p>
              Tell us a bit about yourself and the course you&apos;re interested in — our admissions
              team will call you back to confirm your batch.
            </p>
            <div className="contact-block" id="contact">
              <div className="row">
                <span className="ic">TEL</span> 096002 92830
              </div>
              <div className="row">
                <span className="ic">MAIL</span> astramultimediaofficial@gmail.com
              </div>
              <div className="row">
                <span className="ic">ADDR</span> First floor, 2, Sarkarayar St, BR Puram, Peelamedu
                Post, Coimbatore, Tamil Nadu 641004
              </div>
            </div>
          </div>

          <div>
            <form className="enroll-form" onSubmit={onSubmit} noValidate>
              <div className={`field${errors.fname ? " invalid" : ""}`}>
                <label htmlFor="fname">Full name</label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="e.g. Priya Kumar"
                  value={form.fname}
                  onChange={(e) => updateField("fname", e.target.value)}
                />
                <div className="field-error">Please enter your full name.</div>
              </div>

              <div className="two-col">
                <div className={`field${errors.fmobile ? " invalid" : ""}`}>
                  <label htmlFor="fmobile">Mobile number</label>
                  <input
                    type="tel"
                    id="fmobile"
                    name="fmobile"
                    placeholder="10-digit mobile number"
                    value={form.fmobile}
                    onChange={(e) => updateField("fmobile", e.target.value)}
                  />
                  <div className="field-error">Enter a valid 10-digit mobile number.</div>
                </div>
                <div className={`field${errors.fcourse ? " invalid" : ""}`}>
                  <label htmlFor="fcourse">Course</label>
                  <select
                    id="fcourse"
                    name="fcourse"
                    value={form.fcourse}
                    onChange={(e) => updateField("fcourse", e.target.value)}
                  >
                    <option value="">Select a course</option>
                    {COURSES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <div className="field-error">Please choose a course.</div>
                </div>
              </div>

              <div className={`field${errors.faddress ? " invalid" : ""}`}>
                <label htmlFor="faddress">Address</label>
                <textarea
                  id="faddress"
                  name="faddress"
                  placeholder="Door no, street, city, pincode"
                  value={form.faddress}
                  onChange={(e) => updateField("faddress", e.target.value)}
                />
                <div className="field-error">Please enter your address.</div>
              </div>

              <div className="two-col">
                <div className={`field${errors.fyear ? " invalid" : ""}`}>
                  <label htmlFor="fyear">Graduated year</label>
                  <input
                    type="number"
                    id="fyear"
                    name="fyear"
                    placeholder="e.g. 2024"
                    min={1980}
                    max={2030}
                    value={form.fyear}
                    onChange={(e) => updateField("fyear", e.target.value)}
                  />
                  <div className="field-error">Enter a valid graduation year.</div>
                </div>
                <div className={`field${errors.fqual ? " invalid" : ""}`}>
                  <label htmlFor="fqual">Educational qualification</label>
                  <select
                    id="fqual"
                    name="fqual"
                    value={form.fqual}
                    onChange={(e) => updateField("fqual", e.target.value)}
                  >
                    <option value="">Select qualification</option>
                    <option>Below 10th</option>
                    <option>10th Pass</option>
                    <option>12th Pass</option>
                    <option>Diploma</option>
                    <option>Undergraduate (UG)</option>
                    <option>Postgraduate (PG)</option>
                    <option>Other</option>
                  </select>
                  <div className="field-error">Please choose a qualification.</div>
                </div>
              </div>

              <div className="submit-row">
                <button type="submit" className="btn btn-solid" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit Application"}
                </button>
                <span className={`form-msg ${formMsg.type}`}>{formMsg.text}</span>
              </div>

              <button type="button" className="admin-link" onClick={toggleAdmin}>
                View submitted enrollments (admin)
              </button>
              <div className={`admin-panel${adminOpen ? " open" : ""}`}>
                <h4>Stored enrollments</h4>
                <div>
                  {leads.length === 0 ? (
                    <span className="lead-empty">No enrollments submitted yet.</span>
                  ) : (
                    leads.map((it) => (
                      <div className="lead-row" key={`${it.submittedAt}-${it.fmobile}`}>
                        <div>
                          <b>{it.fname}</b> — {it.fcourse} · {it.fmobile}
                        </div>
                        <div>
                          {it.fqual}, grad. {it.fyear} · {it.faddress}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="al-footer">
        <div className="wrap foot-grid">
          <div>
            <span className="logo-text">ASTRA MULTIMEDIA</span>
            <p style={{ marginTop: 10, maxWidth: "34ch", fontSize: 13.5 }}>
              Design. Animate. Create. Industry-oriented training with 100% placement support in
              Coimbatore, Tamil Nadu.
            </p>
          </div>
          <div className="mono" style={{ lineHeight: 2 }}>
            <div>
              First floor, 2, Sarkarayar St,
              <br />
              BR Puram, Peelamedu Post,
              <br />
              Coimbatore, Tamil Nadu 641004
            </div>
          </div>
          <div className="mono" style={{ lineHeight: 2 }}>
            <div>096002 92830</div>
            <div>astramultimediaofficial@gmail.com</div>
          </div>
        </div>
        <div className="wrap foot-note">
          <span>© 2026 Astra Institute of Multimedia. All rights reserved.</span>
          <span>Design · Animate · Create</span>
        </div>
      </footer>
    </div>
  );
}
