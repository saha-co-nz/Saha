import { NextResponse, type NextRequest } from "next/server";

/* Maintenance mode. While it is on, every public route answers with the
   holding page below — no frontend page, image or CMS read is reachable.

   On by default. To bring the site back, set MAINTENANCE_MODE=false in the
   Vercel project's environment variables and redeploy (or delete this file).

   It answers 503 with Retry-After rather than 200, so search engines treat the
   outage as temporary and keep the existing index instead of replacing it with
   the holding page.

   The Payload admin stays reachable so the CMS can still be worked on:
   /admin always, and /api only for its auth endpoints or a logged-in session.
   Anonymous /api reads are blocked, since those would expose the content. */
const MAINTENANCE_ON = process.env.MAINTENANCE_MODE !== "false";

const PUBLIC_ASSETS = new Set(["/favicon.ico", "/saha-logo.png"]);

function isAllowed(request: NextRequest): boolean {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ASSETS.has(pathname)) return true;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return true;
  if (pathname.startsWith("/api/")) {
    return (
      pathname.startsWith("/api/users") ||
      request.cookies.has("payload-token")
    );
  }
  return false;
}

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>saha. — back soon</title>
<link rel="icon" href="/favicon.ico" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Inter:wght@400;500&family=Syne:wght@600&display=swap" rel="stylesheet" />
<style>
  :root {
    --bg: #faf8f4;
    --ink: #12192e;
    --ink-soft: #4b5570;
    --line: #e5e7ec;
    --blue: #2347d4;
  }
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    background: var(--bg);
    color: var(--ink);
    font-family: Inter, system-ui, -apple-system, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
  }
  main { max-width: 560px; text-align: center; }
  img { width: 64px; height: 64px; display: block; margin: 0 auto 32px; }
  .eyebrow {
    font-family: Syne, system-ui, sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--blue);
    margin: 0 0 16px;
  }
  h1 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 600;
    font-size: clamp(2.4rem, 7vw, 3.6rem);
    line-height: 1.05;
    margin: 0 0 20px;
  }
  h1 em { font-style: italic; color: var(--blue); }
  p { color: var(--ink-soft); font-size: 1.02rem; line-height: 1.65; margin: 0; }
  .contact {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid var(--line);
    font-size: 0.95rem;
  }
  a { color: var(--ink); font-weight: 500; text-underline-offset: 3px; }
  a:hover { color: var(--blue); }
</style>
</head>
<body>
<main>
  <img src="/saha-logo.png" alt="saha." />
  <p class="eyebrow">Under maintenance</p>
  <h1>We&rsquo;ll be <em>back soon.</em></h1>
  <p>We&rsquo;re making some updates to the site and will be back shortly. Thanks for your patience.</p>
  <p class="contact">Need us in the meantime? <a href="mailto:business@saha.co.nz">business@saha.co.nz</a></p>
</main>
</body>
</html>`;

export function proxy(request: NextRequest) {
  if (!MAINTENANCE_ON || isAllowed(request)) return NextResponse.next();

  return new NextResponse(PAGE, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": "3600",
      "X-Robots-Tag": "noindex",
    },
    status: 503,
  });
}

export const config = {
  // Everything except Next's own JS/CSS chunks, which the admin needs.
  matcher: ["/((?!_next/static|_next/webpack-hmr).*)"],
};
