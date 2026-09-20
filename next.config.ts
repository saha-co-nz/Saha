import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

/* The architecture folds deliberately, with redirects — nothing is deleted.
   Eight live routes are collapsing into their parents, and the whole point of
   being on Next.js is SEO-routable pages, so every folded route keeps a 301
   rather than starting to 404.

   Kept as-is: /privacy, /termsofuse, /kali.
   Personal and Digital consulting are cut for good, not deferred, so they
   redirect to /services rather than carrying content anywhere.

   statusCode: 301 rather than permanent: true — the latter emits a 308. */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Services collapse to a single AI Consulting page.
      { destination: "/services", statusCode: 301, source: "/services/ai" },
      {
        destination: "/services",
        statusCode: 301,
        source: "/services/digital",
      },
      {
        destination: "/services",
        statusCode: 301,
        source: "/services/personal",
      },

      // Who We Are absorbs its three children. Values were already
      // consolidated, and governance is written into the parent page.
      {
        destination: "/whoweare",
        statusCode: 301,
        source: "/whoweare/people",
      },
      {
        destination: "/whoweare",
        statusCode: 301,
        source: "/whoweare/values",
      },
      {
        destination: "/whoweare",
        statusCode: 301,
        source: "/whoweare/governance",
      },

      // Careers absorbs apply; contact belongs with the main enquiry form.
      { destination: "/careers", statusCode: 301, source: "/careers/apply" },
      {
        destination: "/contactus",
        statusCode: 301,
        source: "/careers/contact",
      },
    ];
  },
  serverExternalPackages: ["pino", "thread-stream", "pino-pretty"],
};

export default withPayload(nextConfig);
