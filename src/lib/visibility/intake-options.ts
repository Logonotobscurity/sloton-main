export const stepMeta = [
  { id: "business", number: "01", name: "Business" },
  { id: "services", number: "02", name: "Services" },
  { id: "customers", number: "03", name: "Customers" },
  { id: "credibility", number: "04", name: "Credibility" },
  { id: "contact", number: "05", name: "Contact" },
  { id: "material", number: "06", name: "Material" },
  { id: "review", number: "07", name: "Review" },
] as const;

export const categories = [
  "Food & catering",
  "Beauty & personal care",
  "Retail & fashion",
  "Education & tutoring",
  "Health & wellness",
  "Trades & repairs",
  "Professional services",
  "Events",
  "Logistics",
  "Agriculture",
  "Creative & media",
  "Technology",
  "Hospitality",
  "Real estate",
  "Faith & community",
  "Other",
];

export const serviceAreas = [
  { id: "local", label: "Local / neighbourhood", description: "One city or a few streets." },
  { id: "multi-city", label: "Multi-city", description: "Several cities in one country." },
  { id: "nationwide", label: "Nationwide", description: "Anywhere in the country." },
  { id: "international", label: "International", description: "Cross-border." },
  { id: "online", label: "Online only", description: "No physical location needed." },
] as const;

export const serviceAreaLabels: Record<string, string> = Object.fromEntries(
  serviceAreas.map((s) => [s.id, s.label])
);

export const differentiators = [
  "Speed",
  "Price",
  "Quality / finish",
  "Years of practice",
  "Personal service",
  "After-hours",
  "WhatsApp-first",
  "Certified / licensed",
  "Community reputation",
  "Custom work",
];

export const yearsOperating = ["Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"];

export const proofTypes = [
  "Photos of work",
  "Customer reviews",
  "WhatsApp chats",
  "Before / after",
  "Certificates",
  "Repeat clients",
  "Referrals",
  "Press / features",
  "Numbers / results",
  "Walk-in shop",
];

export const contactMethods = [
  "WhatsApp",
  "Phone call",
  "Email",
  "Instagram",
  "Walk-in",
  "Website form",
  "Facebook",
  "Other social",
];

export const businessGoals = [
  "Be found on Google",
  "Be cited by AI assistants",
  "More WhatsApp orders",
  "Look professional",
  "Replace flyers",
  "Explain services clearly",
  "Show location",
  "Collect inquiries",
  "Not sure yet",
];

export const messyExample =
  "I sell cakes I do weddings and birthdays people just DM me on WhatsApp I’m around Ikeja I’ve been doing this like 5 years";
