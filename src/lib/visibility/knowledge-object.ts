import { serviceAreaLabels } from "./intake-options";
import { sentenceCase, toItems } from "./ai-structure";
import type { BusinessKnowledgeObject, IntakeAnswers, SeoArtifacts, ServiceArea } from "./types";

export const emptyAnswers = (): IntakeAnswers => ({
  businessName: "",
  whatYouDo: "",
  category: "",
  categoryOther: "",
  city: "",
  state: "",
  country: "Nigeria",
  serviceArea: "",
  offerings: "",
  primaryServices: [],
  customers: "",
  customerProblems: "",
  differentiators: [],
  differentiatorOther: "",
  yearsOperating: "",
  credentials: "",
  proofTypes: [],
  links: "",
  contactMethods: [],
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  existingMaterial: "",
  attachments: [],
  goals: [],
  anythingElse: "",
  ownerName: "",
});

function splitLinks(links: string): string[] {
  return links
    .split(/\s+/)
    .map((item) => item.trim())
    .filter((item) => /^https?:\/\//i.test(item));
}

function isSocial(url: string): boolean {
  return /(instagram|facebook|tiktok|x\.com|twitter|linkedin|whatsapp)/i.test(url);
}

export function buildKnowledgeObject(answers: IntakeAnswers): BusinessKnowledgeObject {
  const urls = splitLinks(answers.links);
  const website = urls.find((url) => !isSocial(url)) ?? "";
  const socials = urls.filter(isSocial);
  const category = answers.category === "Other" ? answers.categoryOther : answers.category;
  const area = answers.serviceArea ? serviceAreaLabels[answers.serviceArea] ?? answers.serviceArea : "";

  return {
    business: {
      name: answers.businessName.trim(),
      category: category.trim(),
      description: sentenceCase(answers.whatYouDo),
      location: {
        city: answers.city.trim(),
        state: answers.state.trim(),
        country: answers.country.trim(),
      },
      service_area: area ? [area] : [],
      services: toItems(answers.offerings).map(sentenceCase),
      primary_services: answers.primaryServices,
      target_customers: toItems(answers.customers).map(sentenceCase),
      customer_problems: toItems(answers.customerProblems).map(sentenceCase),
      differentiators: [
        ...answers.differentiators,
        ...(answers.differentiatorOther ? [answers.differentiatorOther] : []),
      ],
      experience: answers.yearsOperating,
      credentials: toItems(answers.credentials).map(sentenceCase),
      proof: answers.proofTypes,
      contact: {
        phone: answers.phone.trim(),
        whatsapp: answers.whatsapp.trim(),
        email: answers.email.trim(),
        website,
      },
      socials,
      source_material: [
        answers.existingMaterial ? "pasted copy" : "",
        ...answers.attachments.map((name) => `file:${name}`),
        answers.anythingElse ? "owner notes" : "",
      ].filter(Boolean),
      business_goals: answers.goals,
    },
  };
}

const WEIGHTS: Array<[keyof IntakeAnswers | "anyContact", number]> = [
  ["businessName", 10],
  ["whatYouDo", 14],
  ["category", 5],
  ["city", 8],
  ["serviceArea", 5],
  ["offerings", 14],
  ["primaryServices", 7],
  ["customers", 9],
  ["customerProblems", 5],
  ["differentiators", 5],
  ["yearsOperating", 3],
  ["proofTypes", 5],
  ["contactMethods", 4],
  ["goals", 3],
  ["anyContact", 3],
];

function filled(answers: IntakeAnswers, key: keyof IntakeAnswers): boolean {
  const value = answers[key];
  if (Array.isArray(value)) return value.length > 0;
  return String(value ?? "").trim().length > 0;
}

export function computeCompleteness(answers: IntakeAnswers): number {
  const anyContact = Boolean(
    answers.phone.trim() || answers.whatsapp.trim() || answers.email.trim() || answers.address.trim()
  );
  let score = 0;
  for (const [key, weight] of WEIGHTS) {
    if (key === "anyContact") {
      if (anyContact) score += weight;
    } else if (filled(answers, key)) {
      score += weight;
    }
  }
  return Math.min(100, score);
}

export function buildSeoArtifacts(bko: BusinessKnowledgeObject): SeoArtifacts {
  const { business } = bko;
  const primary = business.primary_services[0] || business.services[0] || business.category || "Services";
  const city = business.location.city;
  const title = `${business.name || "Business"} — ${primary}${city ? ` in ${city}` : ""}`.slice(0, 60);
  const h1 = `${primary}${city ? ` in ${city}` : ""}`;
  const metaDescription = [business.name, primary, city, business.differentiators.slice(0, 2).join(", "), "Get in touch"]
    .filter(Boolean)
    .join(" · ")
    .slice(0, 155);
  const keywords = Array.from(
    new Set(
      [primary, city, business.name, ...business.services.slice(0, 4)]
        .filter(Boolean)
        .map((item) => item.toLowerCase())
    )
  ).slice(0, 9);
  const sections = [
    "Hero",
    "About",
    "Services",
    "Who we serve",
    "Why choose us",
    business.proof.length ? "Proof & testimonials" : "Trust signals",
    "FAQ",
    "Contact",
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.location.city,
      addressRegion: business.location.state,
      addressCountry: business.location.country,
    },
    telephone: business.contact.phone || business.contact.whatsapp,
    email: business.contact.email,
    url: business.contact.website || undefined,
    sameAs: business.socials,
    areaServed: business.service_area,
    makesOffer: business.services.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  };
  return { title, metaDescription, h1, sections, keywords, jsonLd };
}

export function toggleInList(list: string[], value: string, max?: number): string[] {
  if (list.includes(value)) return list.filter((item) => item !== value);
  if (max && list.length >= max) return list;
  return [...list, value];
}

export type { ServiceArea };
