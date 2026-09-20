"use client";

import Form from "next/form";
import Link from "next/link";
import { useState } from "react";

import { sendFormEmail } from "./Form";
import {
  workWithUsPaths,
  workWithUsPromises,
  workWithUsServiceOptions,
  workWithUsSourceOptions,
  workWithUsTimelineOptions,
} from "./data";

const budgetFormatter = new Intl.NumberFormat("en-NZ");

export default function WorkWithUsForm() {
  const [budget, setBudget] = useState(2500);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (formData: FormData) => {
    try {
      await sendFormEmail(formData);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
  };

  return (
    <div className="wuw-page-wrapper">
      <div className="wuw-left-panel">
        <div className="left-bg" />
        <div className="left-grid" />
        <div className="left-overlay" />
        <div className="left-content">
          <div className="left-top">
            <p className="left-eyebrow">Work with us</p>
            <h1 className="left-title">
              Let&apos;s build
              <br />
              something<em>together.</em>
            </h1>
            <p className="left-sub">
              Tell us about yourself or your business and what you&apos;re
              working toward. We&apos;ll come back to you within one business
              day.
            </p>
          </div>
          <div className="promises">
            {workWithUsPromises.map((promise) => (
              <div className="promise" key={promise.title}>
                <div className="promise-icon">{promise.icon}</div>
                <div className="promise-text">
                  <h4>{promise.title}</h4>
                  <p>{promise.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wuw-right-panel">
        {status === "success" ? (
          <div
            className="success-state"
            id="wuw-success-state"
            style={{ display: "flex" }}
          >
            <div className="success-icon">✓</div>
            <h3>Message received.</h3>
            <p>
              Thanks for reaching out. A member of the saha. team will be in
              touch within one business day.
            </p>
          </div>
        ) : (
          <div id="wuw-form-wrap">
            <div className="form-header">
              <p className="form-label-top">Get started</p>
              <h2>
                Tell us about
                <br />
                your project
              </h2>
              <p>
                Fields marked <span style={{ color: "var(--accent)" }}>*</span>{" "}
                are required.
              </p>
            </div>

            <div className="path-grid">
              {workWithUsPaths.map((path) => (
                <div className="path-card" key={path.title}>
                  <span className="path-price">{path.price}</span>
                  <h3 className="path-title">{path.title}</h3>
                  <p className="path-body">{path.body}</p>
                </div>
              ))}
            </div>

            <Form action={handleSubmit} className="contact-form" noValidate>
              <div className="field-row">
                <div className="field">
                  <label>
                    First name <span>*</span>
                  </label>
                  <input
                    autoComplete="given-name"
                    name="first_name"
                    placeholder="Jane"
                    required
                    type="text"
                  />
                </div>
                <div className="field">
                  <label>
                    Last name <span>*</span>
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

              <div className="field-row">
                <div className="field">
                  <label>
                    Email <span>*</span>
                  </label>
                  <input
                    autoComplete="email"
                    name="email"
                    placeholder="jane@company.co.nz"
                    required
                    type="email"
                  />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input
                    autoComplete="tel"
                    name="phone"
                    placeholder="+64 21 000 0000"
                    type="tel"
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label>
                    Company / Organisation <span>*</span>
                  </label>
                  <input
                    name="company"
                    placeholder="Acme Ltd"
                    required
                    type="text"
                  />
                </div>
                <div className="field">
                  <label>Your role</label>
                  <input
                    name="role"
                    placeholder="CEO, CFO, Director..."
                    type="text"
                  />
                </div>
              </div>

              <div className="field">
                <label>How did you hear about us?</label>
                <div className="select-wrapper">
                  <select defaultValue="" name="source">
                    <option disabled value="">
                      Select an option
                    </option>
                    {workWithUsSourceOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-divider" />

              <div className="field">
                <p className="services-label">Services you&apos;re interested in</p>
                <div className="services-check-grid">
                  {workWithUsServiceOptions.map((service) => (
                    <label
                      className={`check-item${selectedServices.includes(service) ? " is-checked" : ""}`}
                      key={service}
                    >
                      <input
                        checked={selectedServices.includes(service)}
                        name="services"
                        onChange={() => toggleService(service)}
                        type="checkbox"
                        value={service}
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="field">
                <label>Approximate monthly budget</label>
                <div className="budget-display">
                  <div className="budget-value">${budgetFormatter.format(budget)}</div>
                  <div className="budget-label">NZD / month</div>
                </div>
                <input
                  id="budget-slider"
                  max="25000"
                  min="500"
                  name="budget"
                  onChange={(event) => setBudget(Number(event.currentTarget.value))}
                  step="500"
                  type="range"
                  value={budget}
                />
                <div className="budget-range-labels">
                  <span>$500</span>
                  <span>$5k</span>
                  <span>$10k</span>
                  <span>$25k+</span>
                </div>
              </div>

              <div className="field">
                <label>When would you like to get started?</label>
                <div className="select-wrapper">
                  <select defaultValue="" name="timeline">
                    <option disabled value="">
                      Select a timeframe
                    </option>
                    {workWithUsTimelineOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-divider" />

              <div className="field">
                <label>
                  Tell us about your situation <span>*</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Give us a brief overview of your business, what you're working on, and what you'd like help with."
                  required
                />
              </div>

              <div className="form-footer">
                <p className="form-note">
                  By submitting you agree to our{" "}
                  <Link href="/privacy">Privacy Policy</Link>. We&apos;ll never
                  share your details.
                </p>
                <button className="btn-submit" type="submit">
                  Send message <span className="arrow">→</span>
                </button>
              </div>
              <p className="charity-note">
                Charities and schools: this form is for business clients. Head
                to <Link href="/kali">Kali Foundation</Link> instead &mdash;
                that&rsquo;s where your engagement lives.
              </p>
            </Form>

            {status === "error" ? (
              <div
                style={{
                  background: "#ef4444",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "0.9rem",
                  marginTop: "1.25rem",
                  padding: "0.95rem 1rem",
                }}
              >
                Failed to send message. Please try again or email us directly.
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
