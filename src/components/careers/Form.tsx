"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { CONTACT_EMAIL } from "@/src/lib/site";

import { sendApplicationEmail } from "./ApplyAction";

import {
  careersApplyPromises,
  careersApplyStreamOptions,
  careersApplyYearOptions,
} from "./data";

export default function CareersApplyForm() {
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  /* This used to preventDefault and flip straight to the success screen, so
     every application was silently discarded. It only reports success now if
     the send actually resolved. */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFailed(false);
    setSending(true);

    try {
      await sendApplicationEmail(new FormData(event.currentTarget));
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFileName = event.target.files?.[0]?.name ?? "";
    setFileName(nextFileName);
  };

  return (
    <div className="apply-page-wrap">
      <div
        className="apply-sidebar"
        style={{
          backgroundImage: 'url("/careers-apply-sidebar.jpg")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          className="apply-sidebar-grid"
          style={{
            background:
              "linear-gradient(135deg, rgba(10, 22, 40, 0.82) 0%, rgba(10, 22, 40, 0.72) 60%, rgba(10, 22, 40, 0.78) 100%)",
            backgroundImage: "none",
            inset: 0,
            position: "absolute",
            zIndex: 0,
          }}
        />
        <div className="apply-sidebar-glow" />
        <div className="apply-sidebar-top">
          <p className="apply-sidebar-eyebrow">Join the team</p>
          <h2 className="apply-sidebar-title">
            Apply for an<em>internship.</em>
          </h2>
          <p className="apply-sidebar-sub">
            Fill in the form and we&apos;ll be in touch. No cover letter
            required - we&apos;d rather hear your thoughts in your own words.
          </p>
        </div>
        <div className="apply-promises">
          {careersApplyPromises.map((promise) => (
            <div className="apply-promise" key={promise}>
              {promise}
            </div>
          ))}
        </div>
      </div>

      <div className="apply-form-panel">
        {!submitted ? (
          <div id="apply-form-wrap">
            <div className="apply-form-header">
              <p className="apply-form-step">Application form</p>
              <h2>Tell us about yourself</h2>
              <p>
                Fields marked <span style={{ color: "var(--accent)" }}>*</span>{" "}
                are required.
              </p>
            </div>
            <form className="af" noValidate onSubmit={handleSubmit}>
              <div className="af-row">
                <div className="af-field">
                  <label>
                    First name <span className="req">*</span>
                  </label>
                  <input
                    autoComplete="given-name"
                    name="first_name"
                    placeholder="Jane"
                    required
                    type="text"
                  />
                </div>
                <div className="af-field">
                  <label>
                    Last name <span className="req">*</span>
                  </label>
                  <input
                    autoComplete="family-name"
                    name="last_name"
                    placeholder="Smith"
                    required
                    type="text"
                  />
                </div>
              </div>
              <div className="af-row">
                <div className="af-field">
                  <label>
                    Email <span className="req">*</span>
                  </label>
                  <input
                    autoComplete="email"
                    name="email"
                    placeholder="jane@university.ac.nz"
                    required
                    type="email"
                  />
                </div>
                <div className="af-field">
                  <label>Phone</label>
                  <input
                    autoComplete="tel"
                    name="phone"
                    placeholder="+64 21 000 0000"
                    type="tel"
                  />
                </div>
              </div>
              <div className="af-row">
                <div className="af-field">
                  <label>
                    University / Institution <span className="req">*</span>
                  </label>
                  <input
                    name="university"
                    placeholder="e.g. University of Auckland"
                    required
                    type="text"
                  />
                </div>
                <div className="af-field">
                  <label>
                    Year of study <span className="req">*</span>
                  </label>
                  <div className="af-select-wrap">
                    <select defaultValue="" name="year" required>
                      <option disabled value="">
                        Select year
                      </option>
                      {careersApplyYearOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="af-field">
                <label>
                  Area of study <span className="req">*</span>
                </label>
                <input
                  name="area_of_study"
                  placeholder="e.g. Commerce, Computer Science, Marketing..."
                  required
                  type="text"
                />
              </div>
              <div className="af-field">
                <label>
                  Internship stream <span className="req">*</span>
                </label>
                <div className="af-select-wrap">
                  <select defaultValue="" name="stream" required>
                    <option disabled value="">
                      Select a stream
                    </option>
                    {careersApplyStreamOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="af-divider" />
              <div className="af-field">
                <label>
                  CV / Resume <span className="req">*</span>
                </label>
                <div
                  className={`file-upload-zone${fileName ? " has-file" : ""}`}
                  id="cv-drop-zone"
                >
                  <input
                    accept=".pdf,.doc,.docx"
                    name="cv"
                    onChange={handleFileChange}
                    required
                    type="file"
                  />
                  <div className="file-icon">📄</div>
                  <h4>Upload your CV</h4>
                  <p>PDF, Word (.doc / .docx) - Max 5MB</p>
                  <p
                    className={`file-name-display${fileName ? " visible" : ""}`}
                    id="cv-name-display"
                  >
                    {fileName}
                  </p>
                </div>
              </div>
              <div className="af-divider" />
              <div className="af-field">
                <label>
                  Why should we hire you? <span className="req">*</span>
                </label>
                <textarea
                  name="why_hire"
                  placeholder="This is your chance to speak directly - tell us what makes you the right fit, what drives you, and what you'd bring to the saha. team. Keep it genuine."
                  required
                />
              </div>
              <div className="af-field">
                <label>
                  LinkedIn profile <span className="optional-tag">Optional</span>
                </label>
                <input
                  name="linkedin"
                  placeholder="https://linkedin.com/in/yourname"
                  type="url"
                />
              </div>
              <div className="af-footer">
                <p className="af-footer-note">
                  Your information is kept confidential and only used for this
                  application.
                </p>
                {failed ? (
                  <p className="af-error" role="alert">
                    Something went wrong sending your application. Email it to{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and
                    we&rsquo;ll pick it up from there.
                  </p>
                ) : null}
                <button
                  className="btn-apply-submit"
                  disabled={sending}
                  type="submit"
                >
                  Submit application <span>→</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="apply-success" id="apply-success" style={{ display: "flex" }}>
            <div className="apply-success-icon">✓</div>
            <h3>Application received.</h3>
            <p>
              Thank you for applying. We review every application personally and
              will be in touch within five business days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
