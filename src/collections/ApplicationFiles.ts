import type { CollectionConfig } from "payload";

/* CVs, stored in S3 alongside the rest of the media but in their own
   collection for one reason: access control.

   The `media` collection is `read: () => true` because it holds site imagery
   that has to be publicly fetchable. A CV is not site imagery — it carries a
   student's full name, phone number, address and education history. Putting
   them in `media` would make every applicant's CV readable by anyone who
   guessed the URL, with no login. So they live here, readable only by a
   signed-in admin user. */
const ApplicationFiles: CollectionConfig = {
  access: {
    /* Applications arrive from logged-out visitors, so create is open. */
    create: () => true,
    delete: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    description: "CVs submitted through the careers form. Not public.",
    useAsTitle: "filename",
  },
  fields: [],
  labels: {
    plural: "Application files",
    singular: "Application file",
  },
  slug: "application-files",
  upload: {
    mimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
};

export default ApplicationFiles;
