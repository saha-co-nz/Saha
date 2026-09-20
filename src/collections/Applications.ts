import type { CollectionConfig } from "payload";

/* Internship applications. Previously these went nowhere — the form showed a
   success message and discarded everything. Now each one is a durable record
   with the CV attached, listable and searchable in the admin, so an
   application cannot be lost to a deleted or missed email. */
const Applications: CollectionConfig = {
  access: {
    create: () => true,
    delete: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ["fullName", "university", "year", "status", "createdAt"],
    description: "Internship applications from the careers form.",
    useAsTitle: "fullName",
  },
  fields: [
    { name: "fullName", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "university", type: "text" },
    { name: "year", type: "text" },
    { name: "areaOfStudy", type: "text" },
    { name: "stream", type: "text" },
    { name: "linkedin", type: "text" },
    { name: "whyHire", type: "textarea" },
    {
      name: "cv",
      admin: { description: "Downloadable from here. Not publicly readable." },
      relationTo: "application-files",
      type: "upload",
    },
    {
      name: "status",
      admin: { position: "sidebar" },
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Reviewing", value: "reviewing" },
        { label: "Interviewing", value: "interviewing" },
        { label: "Offered", value: "offered" },
        { label: "Closed", value: "closed" },
      ],
      type: "select",
    },
  ],
  slug: "applications",
};

export default Applications;
