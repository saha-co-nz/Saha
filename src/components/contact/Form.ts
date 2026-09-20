"use server";

import nodemailer from "nodemailer";
import { google } from "googleapis";

import { CONTACT_EMAIL } from "@/src/lib/site";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

function getFieldValue(formData: FormData, keys: string[]) {
  for (const key of keys) {
    const value = formData.get(key)?.toString().trim();
    if (value) {
      return value;
    }
  }

  return "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendFormEmail(formData: FormData) {
  const topic = getFieldValue(formData, ["topic"]) || "General enquiry";
  const first =
    getFieldValue(formData, ["firstName", "first_name"]) || "No first name";
  const last =
    getFieldValue(formData, ["lastName", "last_name"]) || "No last name";
  const email = getFieldValue(formData, ["email"]) || "No email";
  const phone = getFieldValue(formData, ["phone"]) || "No phone";
  const message = getFieldValue(formData, ["message"]) || "No message";
  const company = getFieldValue(formData, ["company"]);
  const role = getFieldValue(formData, ["role"]);
  const source = getFieldValue(formData, ["source"]);
  const timeline = getFieldValue(formData, ["timeline"]);
  const budget = getFieldValue(formData, ["budget"]);
  const services = formData
    .getAll("services")
    .map((value) => value.toString().trim())
    .filter(Boolean);

  const isBusinessEnquiry = Boolean(company);
  const subject = isBusinessEnquiry
    ? `[Business enquiry] ${company}`
    : `[Contact Form] New Query: ${topic}`;
  const footerLabel = isBusinessEnquiry ? "business enquiry" : "contact";
  const detailRows = isBusinessEnquiry
    ? [
        `<p><strong>Company:</strong> ${escapeHtml(company)}</p>`,
        role ? `<p><strong>Role:</strong> ${escapeHtml(role)}</p>` : "",
        source ? `<p><strong>Source:</strong> ${escapeHtml(source)}</p>` : "",
        timeline
          ? `<p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>`
          : "",
        budget
          ? `<p><strong>Budget:</strong> NZD ${escapeHtml(budget)} / month</p>`
          : "",
        services.length
          ? `<p><strong>Services:</strong> ${escapeHtml(services.join(", "))}</p>`
          : "",
      ].join("")
    : `<p><strong>Topic:</strong> ${escapeHtml(topic)}</p>`;

  try {
    const accessTokenResponse = await oAuth2Client.getAccessToken();

    if (!accessTokenResponse?.token) {
      throw new Error("Failed to retrieve access token");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail", // Simplified - nodemailer handles the host/port
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER, // business@saha.co.nz
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessTokenResponse.token,
      },
    });

    await transporter.sendMail({
      from: `"Saha Contact Form" <${process.env.GMAIL_USER}>`,
      /* Explicit rather than whatever GMAIL_USER happens to be set to. */
      to: CONTACT_EMAIL,
      replyTo: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New form submission</h2>
          ${detailRows}
          <p><strong>Name:</strong> ${escapeHtml(first)} ${escapeHtml(last)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          <hr />
          <footer style="font-size: 12px; color: #666;">Sent from saha.co.nz ${footerLabel} form</footer>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
}
