/** Canonical public origin. Override with NEXT_PUBLIC_SITE_URL. */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://logonai.netlify.app').replace(/\/$/, '');
}

export const SITE = {
  name: 'LOG_ON',
  legalName: 'LOG_ON Solutions',
  tagline: 'Connecting Advantages. Delivering Results.',
  email: 'logonthepage@gmail.com',
  phone: '+234 814 306 6320',
  whatsapp: 'https://wa.me/2348143066320',
  entityDefinition:
    'LOG_ON is a Lagos-based AI and automation consultancy that designs custom AI agents, workplace RPA, analytics dashboards, and web systems for Nigerian and African businesses. We implement scoped projects—not a packaged SaaS product—and start with a free efficiency assessment.',
  pricingSummary:
    'Pricing is scoped per engagement after a free AI Business Efficiency Assessment. Typical delivery: chatbots 2–4 weeks, process automation 4–8 weeks, broader transformation 3–6 months. Clients usually see measurable operational return within 6–9 months (LOG_ON delivery records, 2024–2026).',
} as const;
