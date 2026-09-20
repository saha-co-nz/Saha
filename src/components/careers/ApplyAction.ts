"use server";

import { google } from "googleapis";
import nodemailer from "nodemailer";
import { getPayload } from "payload";

import configPromise from "@/src/payload.config";
import { CONTACT_EMAIL } from "@/src/lib/site";

/* Internship applications used to go nowhere at all — the form called
   preventDefault(), showed a success message and discarded everything.

   They now do two things, in this order of importance:

     1. A durable record in Payload, with the CV stored in S3 and readable
        only by a signed-in admin. This is the system of record: the team
        sees every application at /admin under "Applications", with a status
        field to work through them. An inbox is not a pipeline — mail gets
        deleted, missed, or buried, and nothing else can be searched or
        filtered.
     2. A notification email to business@saha.co.nz so nobody has to poll the
        admin. The CV rides along as an attachment for convenience.

   If the database write fails the email still goes, attachment included, so
   an application is never silently lost. The reverse also holds. Only a
   failure of both surfaces an error to the applicant. */

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

/* 5MB, matching the limit the upload zone states to applicants. */
const MAX_CV_BYTES = 5 * 1024 * 1024;

export async function sendApplicationEmail(formData: FormData) {
  const applicant =
    [field(formData, "first_name"), field(formData, "last_name")]
      .filter(Boolean)
      .join(" ") || "Unnamed applicant";
  const email = field(formData, "email");
  const why = field(formData, "why_hire");

  const cv = formData.get("cv");
  let cvBuffer: Buffer | null = null;
  let cvName = "";

  if (cv instanceof File && cv.size > 0) {
    if (cv.size > MAX_CV_BYTES) {
      throw new Error(
        "That CV is over 5MB. Please upload a smaller file, or email it to us directly.",
      );
    }

    cvBuffer = Buffer.from(await cv.arrayBuffer());
    cvName = cv.name || "cv";
  }

  let stored = false;

  try {
    const payload = await getPayload({ config: configPromise });

    /* Payload is configured with string IDs (db.defaultIDType). */
    let cvId: string | undefined;

    if (cvBuffer) {
      const file = await payload.create({
        collection: "application-files",
        data: {},
        file: {
          data: cvBuffer,
          mimetype:
            cv instanceof File && cv.type
              ? cv.type
              : "application/octet-stream",
          name: cvName,
          size: cvBuffer.length,
        },
      });
      cvId = String(file.id);
    }

    await payload.create({
      collection: "applications",
      data: {
        areaOfStudy: field(formData, "area_of_study"),
        cv: cvId,
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
      attachments:
        cvBuffer && cvName
          ? [{ content: cvBuffer, filename: cvName }]
          : [],
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
            ${cvName ? "CV attached." : "No CV was attached."}
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
