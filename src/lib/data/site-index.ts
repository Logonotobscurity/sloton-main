/**
 * LOG_ON concept index — single list of public services, Insights hubs, and
 * company URLs. Sitemap, llms-full.txt, and homepage clusters consume this.
 * Article URLs still come from `insights` (catalogue-first).
 */

import { insights } from '@/lib/data/insights';
import { getTemplates } from '@/lib/data/workflow-templates';
import { getSiteUrl } from '@/lib/site';

export type ConceptKind = 'service' | 'hub' | 'company' | 'article' | 'workflow';

export type ConceptFaq = { question: string; answer: string };

export type SiteConcept = {
  path: string;
  title: string;
  definition: string;
  kind: ConceptKind;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  related?: string[];
  faq?: ConceptFaq[];
};

export const INSIGHT_HUBS: SiteConcept[] = [
  {
    path: '/insights',
    title: 'Insights Hub',
    definition:
      'LOG_ON Insights is operator-authored research on AI strategy, agents, LLMO/GEO, implementation, and governance for Nigerian, African, and global operators. Lead author Oluwamayowa Logo; reviewer Favour Alfred; 90-day cycle.',
    kind: 'hub',
    priority: 0.8,
    changeFrequency: 'daily',
  },
  {
    path: '/insights/ai-search',
    title: 'AI Search & LLMO',
    definition: 'How ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews retrieve brands — GEO, LLMO, schema, and llms.txt.',
    kind: 'hub',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/ai-seo',
    title: 'AI SEO',
    definition: 'Classic search plus generative-engine overlap: keywords, content formats, and citation-ready pages.',
    kind: 'hub',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/ai-agents',
    title: 'AI Agents',
    definition: 'Definitions, architecture, MCP/A2A, and production of agents that act in CRM, WhatsApp, and ops — with logs counsel can read.',
    kind: 'hub',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/ai-functions',
    title: 'AI for Business Functions',
    definition: 'Function plays for sales, marketing, HR, finance, legal, and operations scored on TCO and African channel fit.',
    kind: 'hub',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/generative-ai',
    title: 'Generative AI',
    definition: 'LLMs and multimodal systems for Nigerian enterprises: where generation belongs in a governed stack.',
    kind: 'hub',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/ai-strategy',
    title: 'AI Strategy',
    definition: 'Board-defensible roadmaps: TCO, payback, risk registers, and 12-month milestones a CFO will sign.',
    kind: 'hub',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/ai-implementation',
    title: 'AI Implementation',
    definition: 'Five-phase playbook: assess, prioritise, govern, pilot, scale — 2–4 week slices and 90-day pilots.',
    kind: 'hub',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/ai-automation',
    title: 'AI Automation',
    definition: 'RPA, BPA, and agents as a portfolio: deterministic bots where they belong; agents when the path is unknown.',
    kind: 'hub',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/ai-statistics',
    title: 'AI Statistics & Data',
    definition: 'Adoption, skills, and spend figures labelled as estimates. CFOs should use their own baselines.',
    kind: 'hub',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/ai-training',
    title: 'AI Training & Education',
    definition: 'Persona programmes for executives, operators, counsel, and builders — not prompt theatre.',
    kind: 'hub',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/ai-governance',
    title: 'AI Governance & Compliance',
    definition: 'NDPR, EU AI Act–style obligations for African exporters, risk registers, and ISO 42001 when it helps.',
    kind: 'hub',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/ai-industries',
    title: 'AI for Industries',
    definition: 'Vertical plays: finance, healthcare, manufacturing, logistics, public sector.',
    kind: 'hub',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/ai-tools',
    title: 'AI Tools & Technology',
    definition: 'Stacks that survive FX, latency, data residency, and WhatsApp for African operators.',
    kind: 'hub',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/ai-consulting',
    title: 'AI Consulting',
    definition: 'How enterprises buy AI in 2026: RFPs, TCO, scoped consulting vs vendor seats.',
    kind: 'hub',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
  {
    path: '/insights/ai-nigeria',
    title: 'AI in Nigeria & Africa',
    definition: 'National programmes, NDPR, and how a Lagos practice actually ships scoped work.',
    kind: 'hub',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
];

export const SERVICE_PAGES: SiteConcept[] = [
  {
    path: '/',
    title: 'LOG_ON — AI & automation consultancy',
    definition:
      'LOG_ON is a Lagos-based AI and automation consultancy. We design custom AI agents, workplace RPA, analytics, and web systems as scoped projects after a free efficiency assessment — not a packaged SaaS product.',
    kind: 'service',
    priority: 1,
    changeFrequency: 'daily',
  },
  {
    path: '/ai-solutions',
    title: 'AI agent development',
    definition:
      'LOG_ON designs and deploys custom AI agents, RAG over company documents, predictive models, and operational copilots for Nigerian and African businesses as scoped consulting work.',
    kind: 'service',
    priority: 0.9,
    changeFrequency: 'weekly',
    related: ['/insights/ai-agents', '/insights/generative-ai', '/contact'],
    faq: [
      {
        question: 'What is LOG_ON AI agent development?',
        answer:
          'Custom agents, document RAG, and operational copilots delivered as a fixed-scope or retainer project after a free efficiency assessment. Not a self-serve marketplace.',
      },
      {
        question: 'What proof do you cite?',
        answer:
          'LOG_ON delivery records only: loan processing −60% approval time; retail recommendations +15% AOV; support RAG −30% tickets; healthcare triage bot ~40% of inquiries autonomous.',
      },
    ],
  },
  {
    path: '/automation',
    title: 'Workplace automation & RPA',
    definition:
      'LOG_ON maps workflows and deploys RPA and AI-powered automation that integrate with CRM, ERP, and cloud tools. Deterministic bots for SOPs; agents when the path is unknown.',
    kind: 'service',
    priority: 0.9,
    changeFrequency: 'weekly',
    related: ['/insights/ai-automation', '/insights/ai-implementation', '/contact'],
    faq: [
      {
        question: 'What is workplace automation at LOG_ON?',
        answer:
          'RPA for rule-based clicks, BPA for end-to-end processes, and agents for unstructured work. Engagements start with a free workflow analysis.',
      },
      {
        question: 'Typical timelines?',
        answer: 'Automation slices typically 4–8 weeks; broader transformation 3–6 months (LOG_ON delivery records, 2024–2026).',
      },
    ],
  },
  {
    path: '/chatbots',
    title: 'Chatbots & WhatsApp assistants',
    definition:
      'LOG_ON builds support and sales assistants for web and WhatsApp, integrated with CRM. Healthcare triage bots in our records handled ~40% of inquiries autonomously; support RAG reduced tickets by 30%.',
    kind: 'service',
    priority: 0.8,
    changeFrequency: 'weekly',
    related: ['/insights/ai-functions', '/contact'],
    faq: [
      {
        question: 'Where do chatbots run?',
        answer: 'Website, app, WhatsApp, and Messenger — with backend actions (order status, booking) when systems allow.',
      },
      {
        question: 'Timeline?',
        answer: 'Chatbot work typically 2–4 weeks after a free assessment (LOG_ON delivery records).',
      },
    ],
  },
  {
    path: '/web-development',
    title: 'Web & custom development',
    definition:
      'LOG_ON builds Next.js and React applications, publisher platforms, and e-commerce with African payment rails (Paystack, Flutterwave) as scoped software work.',
    kind: 'service',
    priority: 0.8,
    changeFrequency: 'weekly',
    related: ['/solutions', '/contact'],
    faq: [
      {
        question: 'What stack?',
        answer: 'Next.js, React, and cloud hosting. Payments via Paystack, Flutterwave, Stripe where required.',
      },
    ],
  },
  {
    path: '/business-analytics',
    title: 'Business analytics',
    definition:
      'LOG_ON designs dashboards and BI reporting so operators can baseline cycle time, error rate, and cost-to-serve before an AI pilot.',
    kind: 'service',
    priority: 0.8,
    changeFrequency: 'weekly',
    related: ['/insights/ai-statistics', '/contact'],
    faq: [
      {
        question: 'What do you deliver?',
        answer: 'Interactive dashboards, KPI tracking, and a single source of truth — not a generic report pack.',
      },
    ],
  },
  {
    path: '/database-solutions',
    title: 'Database solutions',
    definition:
      'LOG_ON designs SQL/NoSQL architecture, cloud migration, performance tuning, and NDPR/GDPR-aware security for African operators.',
    kind: 'service',
    priority: 0.8,
    changeFrequency: 'weekly',
    related: ['/insights/ai-governance', '/contact'],
    faq: [
      {
        question: 'Do you migrate to the cloud?',
        answer: 'Yes — AWS, Google Cloud, Azure — with downtime planning and access control.',
      },
    ],
  },
  {
    path: '/training',
    title: 'AI & automation training',
    definition:
      'Persona-based programmes for executives, operators, counsel, and builders. Internal academies when they beat an imported bootcamp.',
    kind: 'service',
    priority: 0.8,
    changeFrequency: 'weekly',
    related: ['/insights/ai-training', '/contact'],
    faq: [
      {
        question: 'Who is training for?',
        answer: 'Directors who must supervise agents, operators after go-live, and builders who need evaluation and tool-use — not prompt novelty.',
      },
    ],
  },
  {
    path: '/solutions',
    title: 'All solutions',
    definition: 'Index of LOG_ON services: AI agents, automation, web, analytics, chatbots, databases, and training.',
    kind: 'service',
    priority: 0.8,
    changeFrequency: 'weekly',
    related: ['/contact'],
  },
  {
    path: '/use-cases',
    title: 'Industry use cases',
    definition: 'Finance, healthcare, and commerce patterns LOG_ON implements — with delivery-record proof only.',
    kind: 'service',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    path: '/audit',
    title: 'Business visibility profile',
    definition:
      'Free LOG_ON community give-back: a seven-step intake that structures a business into a digital profile Google and AI can understand. Drafts save locally. Not an account.',
    kind: 'service',
    priority: 0.8,
    changeFrequency: 'weekly',
    related: ['/contact', '/insights/ai-search'],
  },
  {
    path: '/resources',
    title: 'Resources',
    definition: 'Guides and materials that support LOG_ON delivery and Insights.',
    kind: 'service',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    path: '/contact',
    title: 'Contact / Book a demo',
    definition: 'Free AI Business Efficiency Assessment. Tally form and email fallback. WhatsApp +234 814 306 6320.',
    kind: 'company',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
];

export const COMPANY_PAGES: SiteConcept[] = [
  { path: '/about', title: 'About', definition: 'LOG_ON is a Lagos consultancy: connecting advantages, delivering results.', kind: 'company', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about/careers', title: 'Careers', definition: 'Roles at LOG_ON.', kind: 'company', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about/investors', title: 'Investors', definition: 'Investor information.', kind: 'company', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about/locations', title: 'Locations', definition: 'Lagos headquarters, serving clients globally.', kind: 'company', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about/our-leadership', title: 'Leadership', definition: 'Oluwamayowa Logo (CPO) and the delivery team.', kind: 'company', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about/newsroom', title: 'Newsroom', definition: 'LOG_ON announcements.', kind: 'company', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/about/research', title: 'Research', definition: 'Operator research published on Insights.', kind: 'company', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/about/trust', title: 'Trust', definition: 'How LOG_ON handles data and scoped delivery.', kind: 'company', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/about/global-impact', title: 'Global impact', definition: 'African and global delivery footprint.', kind: 'company', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/about/reports', title: 'Reports', definition: 'Published reports.', kind: 'company', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/partners', title: 'Partners', definition: 'Implementation and technology partners.', kind: 'company', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/support', title: 'Support', definition: 'Client support for live LOG_ON systems.', kind: 'company', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/ideas-lab', title: 'Ideas Lab', definition: 'Experiments and product sketches from LOG_ON.', kind: 'company', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/privacy', title: 'Privacy', definition: 'Privacy policy.', kind: 'company', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', title: 'Terms', definition: 'Terms of use.', kind: 'company', priority: 0.3, changeFrequency: 'yearly' },
];

export function getIndexedConcepts(): SiteConcept[] {
  return [...SERVICE_PAGES, ...INSIGHT_HUBS, ...COMPANY_PAGES];
}

export function getSitemapEntries() {
  const baseUrl = getSiteUrl();
  const currentDate = new Date();

  const staticUrls = getIndexedConcepts().map((c) => ({
    url: `${baseUrl}${c.path}`,
    lastModified: currentDate,
    changeFrequency: c.changeFrequency,
    priority: c.priority,
  }));

  const workflowUrls = getTemplates().map((template) => ({
    url: `${baseUrl}/automation/${template.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const insightUrls = insights.map((insight) => ({
    url: `${baseUrl}/insights/${insight.slug}`,
    lastModified: new Date(insight.date),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticUrls, ...workflowUrls, ...insightUrls];
}

export function renderLlmsFull(): string {
  const base = getSiteUrl();
  const lines: string[] = [
    '# LOG_ON — full concept index',
    '',
    '> Lagos AI and automation consultancy. Scoped projects after a free efficiency assessment. Not a packaged SaaS product.',
    `> Canonical host: ${base}`,
    '> Author: Oluwamayowa Logo — https://www.linkedin.com/in/logo-oluwamayowa-cpo-/',
    '> Reviewer: Favour Alfred. 90-day Insights cycle.',
    '',
    '## Proof (LOG_ON delivery records only)',
    '- Loan-processing automation: −60% approval time (financial services).',
    '- E-commerce recommendations: +15% AOV (retail).',
    '- Support RAG: −30% tickets (SaaS).',
    '- Healthcare triage bot: ~40% of inquiries autonomous.',
    '',
    '## Services',
  ];

  for (const s of SERVICE_PAGES) {
    lines.push(`- [${s.title}](${base}${s.path}): ${s.definition}`);
  }

  lines.push('', '## Insights hubs');
  for (const h of INSIGHT_HUBS) {
    lines.push(`- [${h.title}](${base}${h.path}): ${h.definition}`);
  }

  lines.push('', `## Insights articles (${insights.length})`);
  for (const a of insights) {
    lines.push(`- [${a.title}](${base}/insights/${a.slug}): ${a.description}`);
  }

  lines.push(
    '',
    '## Company',
    ...COMPANY_PAGES.map((c) => `- [${c.title}](${base}${c.path}): ${c.definition}`),
    '',
    '## Contact',
    `- ${base}/contact`,
    '- logonthepage@gmail.com · WhatsApp +234 814 306 6320',
    '- Short map: /llms.txt',
    '',
  );

  return lines.join('\n');
}

export function getServiceConcept(path: string): SiteConcept | undefined {
  return SERVICE_PAGES.find((s) => s.path === path);
}
