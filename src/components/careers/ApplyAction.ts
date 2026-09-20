"use server";

import { google } from "googleapis";
import nodemailer from "nodemailer";
import { getPayload } from "payload";

import configPromise from "@/src/payload.config";
import { CONTACT_EMAIL } from "@/src/lib/site";

/* Internship applications used to go nowhere at all — the form called
   preventDefault(), showed a success message and discarded everything.

   They now do two things, in this order of importance:

     1. A durable record in Payload. This is the system of record: the team
        sees every application at /admin under "Applications", with a status
        field to work through them. An inbox is not a pipeline — mail gets
        deleted, missed, or buried, and nothing else can be searched or
        filtered.
     2. A notification email to business@saha.co.nz so nobody has to poll
        the admin.

   No CV is collected here. Applicants send it to business@saha.co.nz, or
   reply with it attached once the team reaches out — which also means no
   personal documents are stored on our side until someone actually wants
   them.

   If the database write fails the email still goes, and the reverse also
   holds. Only a failure of both surfaces an error to the applicant. */

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground",
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

function field(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() ?? "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const FIELDS: [string, string][] = [
  ["email", "Email"],
  ["phone", "Phone"],
  ["university", "University"],
  ["year", "Year of study"],
  ["area_of_study", "Area of study"],
  ["stream", "Stream"],
  ["linkedin", "LinkedIn"],
];


export async function sendApplicationEmail(formData: FormData) {
  const applicant =
    [field(formData, "first_name"), field(formData, "last_name")]
      .filter(Boolean)
      .join(" ") || "Unnamed applicant";
  const email = field(formData, "email");
  const why = field(formData, "why_hire");

  let stored = false;

  try {
    const payload = await getPayload({ config: configPromise });

    await payload.create({
      collection: "applications",
      data: {
        areaOfStudy: field(formData, "area_of_study"),
        email,
        fullName: applicant,
        linkedin: field(formData, "linkedin"),
        phone: field(formData, "phone"),
        status: "new",
        stream: field(formData, "stream"),
        university: field(formData, "university"),
        whyHire: why,
        year: field(formData, "year"),
      },
    });

    stored = true;
  } catch (error) {
    /* Swallowed on purpose — the email below is the fallback path. */
    console.error("Failed to store application in Payload:", error);
  }

  const rows = FIELDS.map(([key, label]) => {
    const value = field(formData, key);

    return value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : "";
  }).join("");

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    if (!accessToken?.token) {
      throw new Error("Failed to retrieve access token");
    }

    const transporter = nodemailer.createTransport({
      auth: {
        accessToken: accessToken.token,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        type: "OAuth2",
        user: process.env.GMAIL_USER ?? CONTACT_EMAIL,
      },
      service: "gmail",
    });

    await transporter.sendMail({
      from: `"Saha Careers" <${process.env.GMAIL_USER ?? CONTACT_EMAIL}>`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Internship application — ${escapeHtml(applicant)}</h2>
          ${rows}
          <h3>Why they want to work here</h3>
          <p style="white-space: pre-wrap;">${escapeHtml(why)}</p>
          <hr />
          <p style="color:#666;font-size:12px;">
            ${
              stored
                ? "Saved to the Applications collection — open /admin to review and set a status."
                : "<strong>Not saved to the database.</strong> This email is the only copy, so keep it."
            }
            No CV is collected on the form — ask for it when you reply.
          </p>
        </div>
      `,
      /* So replying goes to the applicant rather than back to the inbox. */
      replyTo: email || undefined,
      subject: `Internship application — ${applicant}`,
      to: CONTACT_EMAIL,
    });
  } catch (error) {
    console.error("Failed to email application:", error);

    /* Only a total failure is worth telling the applicant about. */
    if (!stored) {
      throw new Error("Could not submit application");
    }
  }
}
