"use client";

import { useEffect, useState } from "react";
import { contact, courses, qualifications } from "@/data/siteContent";

const emptyForm = {
  name: "",
  mobile: "",
  course: "",
  address: "",
  year: "",
  qualification: "",
};

function validate(form) {
  const year = parseInt(form.year, 10);
  return {
    name: !form.name.trim(),
    mobile: !/^\d{10}$/.test(form.mobile.trim()),
    course: !form.course,
    address: !form.address.trim(),
    year: !year || year < 1980 || year > 2035,
    qualification: !form.qualification,
  };
}

function buildMessage(form) {
  return [
    "Hello Astra Multimedia, I'd like to enroll.",
    "",
    `Name: ${form.name.trim()}`,
    `Mobile: ${form.mobile.trim()}`,
    `Course: ${form.course}`,
    `Qualification: ${form.qualification}`,
    `Graduated year: ${form.year}`,
    `Address: ${form.address.trim()}`,
  ].join("\n");
}

export default function EnrollForm({ defaultCourse = "" }) {
  const [form, setForm] = useState({ ...emptyForm, course: defaultCourse });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    setForm((prev) => ({ ...prev, course: defaultCourse || prev.course }));
  }, [defaultCourse]);

  const update = (key) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const check = () => {
    const next = validate(form);
    setErrors(next);
    const ok = !Object.values(next).some(Boolean);
    if (!ok) setMsg({ text: "Please fix the highlighted fields.", type: "is-err" });
    return ok;
  };

  const sendWhatsApp = (e) => {
    e.preventDefault();
    if (!check()) return;
    const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(buildMessage(form))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setMsg({ text: "Opening WhatsApp — just hit send and our team will call you back.", type: "is-ok" });
  };

  const sendEmail = () => {
    if (!check()) return;
    const subject = `Enrollment enquiry — ${form.course}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(form))}`;
    setMsg({ text: "Opening your email app with the details filled in.", type: "is-ok" });
  };

  const fieldClass = (key) => `as-field${errors[key] ? " is-invalid" : ""}`;

  return (
    <form className="as-form" onSubmit={sendWhatsApp} noValidate>
      <h3>Apply for admission</h3>
      <p>Takes under a minute. We&apos;ll confirm your batch over a call.</p>

      <div className={fieldClass("name")}>
        <label htmlFor="as-name">Full name</label>
        <input id="as-name" type="text" autoComplete="name" placeholder="e.g. Priya Kumar" value={form.name} onChange={update("name")} />
        <div className="as-field-error">Please enter your full name.</div>
      </div>

      <div className="as-two">
        <div className={fieldClass("mobile")}>
          <label htmlFor="as-mobile">Mobile number</label>
          <input id="as-mobile" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="10-digit mobile number" value={form.mobile} onChange={update("mobile")} />
          <div className="as-field-error">Enter a valid 10-digit mobile number.</div>
        </div>
        <div className={fieldClass("course")}>
          <label htmlFor="as-course">Course</label>
          <select id="as-course" value={form.course} onChange={update("course")}>
            <option value="">Select a course</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>
          <div className="as-field-error">Please choose a course.</div>
        </div>
      </div>

      <div className={fieldClass("address")}>
        <label htmlFor="as-address">Address</label>
        <textarea id="as-address" autoComplete="street-address" placeholder="Door no, street, city, pincode" value={form.address} onChange={update("address")} />
        <div className="as-field-error">Please enter your address.</div>
      </div>

      <div className="as-two">
        <div className={fieldClass("year")}>
          <label htmlFor="as-year">Graduated year</label>
          <input id="as-year" type="number" inputMode="numeric" placeholder="e.g. 2024" min={1980} max={2035} value={form.year} onChange={update("year")} />
          <div className="as-field-error">Enter a valid graduation year.</div>
        </div>
        <div className={fieldClass("qualification")}>
          <label htmlFor="as-qual">Educational qualification</label>
          <select id="as-qual" value={form.qualification} onChange={update("qualification")}>
            <option value="">Select qualification</option>
            {qualifications.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
          <div className="as-field-error">Please choose a qualification.</div>
        </div>
      </div>

      <div className="as-submit-row">
        <button type="submit" className="as-btn as-btn--solid">
          Send via WhatsApp <span className="as-arrow">→</span>
        </button>
        <span className={`as-form-msg ${msg.type}`} role="status">
          {msg.text}
        </span>
      </div>
      <p className="as-form-alt">
        Prefer email?{" "}
        <button type="button" onClick={sendEmail}>
          Send these details by email
        </button>{" "}
        or call <a href={contact.phoneHref}>{contact.phoneDisplay}</a>.
      </p>
    </form>
  );
}
