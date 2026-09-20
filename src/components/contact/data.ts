/* "What happens next" from the design source. The previous four promises
   (fast response / confidential / no obligation / NZ-based team) were generic
   reassurance; these describe what actually happens after someone submits. */
export const workWithUsPromises = [
  {
    description: "We read what you sent and reply, no auto-responder loop.",
    icon: "\u26a1",
    title: "Within 1 business day",
  },
  {
    description:
      "If it's a fit, we book the consultation or assessment directly.",
    icon: "\ud83d\udcac",
    title: "A real conversation",
  },
  {
    description:
      "The free options stay free. You decide if a full engagement makes sense after that.",
    icon: "\ud83c\udfaf",
    title: "No obligation",
  },
];

/* The three ways in. Charities and schools are routed to Kali Foundation
   rather than turned away — see the note under the form. */
export const workWithUsPaths = [
  {
    body: "Not sure where to start. We'll look at your business and tell you honestly if AI is worth pursuing yet.",
    price: "Free",
    title: "AI Readiness Assessment",
  },
  {
    body: "A straight conversation about what's actually possible. Business clients only.",
    price: "Free \u00b7 Business clients",
    title: "1-Hour Consultation",
  },
  {
    body: "Ready to go further. Tell us what you're working on and we'll come back with a real plan.",
    price: "Scoped",
    title: "Full Engagement",
  },
];

export const workWithUsSourceOptions = [
  "Google search",
  "LinkedIn",
  "Referral from a colleague",
  "Social media",
  "Word of mouth",
  "Other",
];

export const workWithUsServiceOptions = [
  "AI Strategy & Advisory",
  "AI Implementation",
  "AI Training & Enablement",
  "Career Coaching",
  "Life Coaching & Goal Setting",
  "Study & Academic Coaching",
  "Relationship & Social Skills",
  "Web Presence & Branding",
  "Social Media Consulting",
  "SEO & Online Visibility",
  "Digital Tools & Automation",
  "Not sure / Other",
];

export const workWithUsTimelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1-3 months",
  "3-6 months",
  "Just exploring for now",
];
