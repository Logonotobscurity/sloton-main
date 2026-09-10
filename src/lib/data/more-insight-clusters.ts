import imageData from "@/lib/placeholder-images.json";

export type MoreArticle = {
  slug: string;
  title: string;
  description: string;
  kind: string;
  section: string;
  cluster: string;
  clusterHref: string;
  date: string;
  author: string;
  tags: string[];
  body: { heading?: string; paragraphs: string[] }[];
};

const A = "Oluwamayowa Logo";

function art(
  cluster: string,
  href: string,
  section: string,
  slug: string,
  title: string,
  description: string,
  kind: string,
  date: string,
  extra = ""
): MoreArticle {
  return {
    slug,
    title,
    description,
    kind,
    section,
    cluster,
    clusterHref: href,
    date,
    author: A,
    tags: [cluster, kind],
    body: [
      {
        paragraphs: [
          description,
          extra ||
            "LOG_ON (Lagos) ships scoped work after a free assessment. Lead author Oluwamayowa Logo; reviewed by Favour Alfred. 90-day cycle. Africa/global — not Sweden.",
        ],
      },
    ],
  };
}

const I = "AI Implementation";
const Ih = "/insights/ai-implementation";
const U = "AI Automation";
const Uh = "/insights/ai-automation";
const S = "AI Statistics & Data";
const Sh = "/insights/ai-statistics";
const T = "AI Training & Education";
const Th = "/insights/ai-training";
const G = "AI Governance & Compliance";
const Gh = "/insights/ai-governance";
const N = "AI for Industries";
const Nh = "/insights/ai-industries";
const O = "AI Tools & Technology";
const Oh = "/insights/ai-tools";
const C = "AI Consulting";
const Ch = "/insights/ai-consulting";
const R = "AI in Nigeria & Africa";
const Rh = "/insights/ai-nigeria";

export const moreArticles: MoreArticle[] = [
  art(I, Ih, "01 — Playbooks", "ai-implementation-guide-2026", "AI Implementation Guide: The Complete Enterprise Playbook 2026", "Five phases: assess, prioritise, govern, pilot, scale. Failure points and a CFO metric.", "Complete Guide", "2026-04-16"),
  art(I, Ih, "01 — Playbooks", "ai-prototype-2-4-weeks-90-day-retail-pilot", "AI Prototype in 2–4 Weeks + 90-Day Retail Pilot", "Conversational slice to measured AOV and deflection — calendars LOG_ON already runs.", "How-To", "2026-05-02"),
  art(I, Ih, "01 — Playbooks", "ai-implementation-checklist-2026", "AI Implementation Checklist 2026: Owner, SOP, Kill Switch", "If you cannot name those three, you are still in slides.", "How-To", "2026-05-03"),
  art(I, Ih, "02 — Delivery", "ai-implementation-hitl-gates", "Human-in-the-Loop Gates for Production AI", "Where LOG_ON pauses agents: money, PII, legal, send.", "Deep Dive", "2026-05-04"),
  art(I, Ih, "02 — Delivery", "ai-implementation-eval-harness", "Evaluation Harnesses for Enterprise AI Slices", "Gold sets before go-live. No vibe-based production.", "How-To", "2026-05-05"),

  art(U, Uh, "01 — Consulting", "ai-automation-consulting-2026", "AI Automation Consulting 2026: Pilots to Production", "Why portfolios stall at three bots. Operating model for finance and logistics.", "Deep Dive", "2026-05-06"),
  art(U, Uh, "01 — Consulting", "rpa-vs-ai-agents-2026", "RPA vs AI Agents 2026: When Each Belongs", "Deterministic bots for the SOP; agents when the path is unknown.", "Comparison", "2026-05-07"),
  art(U, Uh, "02 — Patterns", "intelligent-automation-vs-bpa-2026", "Intelligent Automation vs BPA: A Practical Split", "BPA is the process. IA is the toolkit. Do not rename RPA and call it done.", "Comparison", "2026-05-08"),
  art(U, Uh, "02 — Patterns", "automation-portfolio-governance-2026", "Automation Portfolio Governance for African Mid-Market", "One owner per SOP, shared queue, on-call.", "How-To", "2026-05-09"),

  art(S, Sh, "01 — Adoption", "africa-ai-adoption-2026", "Africa AI Adoption 2026: Skills, Spend, and the Production Gap", "Production vs slideware. Supervision is the bottleneck.", "Data & Research", "2026-05-10"),
  art(S, Sh, "01 — Adoption", "ai-skills-gap-2026", "The 2026 AI Skills Gap Without Importing a Whole Lab", "Persona training: exec, operator, counsel, builder.", "Data & Research", "2026-05-11"),
  art(S, Sh, "02 — Markets", "ai-spend-statistics-2026", "AI Spend Statistics 2026: How to Read Analyst TAM", "Treat TAM as direction. Use your own prompt-panel and hours-back numbers.", "Data & Research", "2026-05-12"),

  art(T, Th, "01 — Persona", "best-ai-training-companies-by-persona-2026", "Best AI Training Companies by Persona 2026 | LOG_ON", "Exec literacy vs builder depth vs counsel. When an internal academy wins.", "Ranked List", "2026-05-13"),
  art(T, Th, "01 — Persona", "ai-literacy-for-executives-2026", "AI Literacy for Executives 2026: A One-Day Briefing", "Workflow vs agent, TCO, risk register. No demo theatre.", "How-To", "2026-05-14"),
  art(T, Th, "02 — Builders", "operator-training-after-go-live-2026", "Operator Training After Go-Live: The Missing Week", "No production without the people who click it on Monday.", "How-To", "2026-05-15"),

  art(G, Gh, "01 — Regimes", "eu-ai-act-compliance-consulting-2026", "EU AI Act Compliance Consulting 2026 | LOG_ON", "What African exporters must inventory, classify, document — without freezing every pilot.", "Deep Dive", "2026-05-16"),
  art(G, Gh, "01 — Regimes", "ndpr-ai-governance-nigeria-2026", "NDPR and AI Governance in Nigeria 2026", "Data rights, processors, residency. Pair with GDPR if you sell into the EU.", "Deep Dive", "2026-05-17"),
  art(G, Gh, "02 — Practice", "iso-42001-guide-2026", "ISO 42001 Guide 2026: When a Management System Helps", "Useful for exporters. Not a substitute for an owner and a kill switch.", "How-To", "2026-05-18"),
  art(G, Gh, "02 — Practice", "ai-risk-register-template-2026", "AI Risk Register Template 2026", "Shadow AI, injection, over-scoped tools, deepfakes, vendor lock-in.", "How-To", "2026-05-19"),

  art(N, Nh, "01 — Verticals", "ai-in-financial-services-use-cases", "AI in Financial Services: Risk, Compliance & Customer Use Cases", "Six use cases that survive a risk committee.", "Deep Dive", "2026-05-20"),
  art(N, Nh, "01 — Verticals", "ai-in-healthcare-operations-2026", "AI in Healthcare Operations 2026", "Scheduling, coding, follow-up — not unsupervised diagnosis.", "Deep Dive", "2026-05-21"),
  art(N, Nh, "01 — Verticals", "ai-in-manufacturing-2026", "AI in Manufacturing 2026: Quality, Downtime, Supply", "Vision QC and honest ROI ranges.", "Deep Dive", "2026-05-22"),
  art(N, Nh, "01 — Verticals", "ai-in-logistics-africa-2026", "AI in Logistics 2026: African Ports, FX, Last Mile", "The constraints belong in the model.", "Deep Dive", "2026-05-23"),
  art(N, Nh, "01 — Verticals", "ai-in-public-sector-africa-2026", "AI in African Public Sector 2026", "Procurement, transparency, residency.", "Deep Dive", "2026-05-24"),

  art(O, Oh, "01 — Stacks", "best-ai-tools-nigerian-african-enterprises-2026", "Best AI Tools for Nigerian & African Enterprises 2026 | LOG_ON", "Agents, RAG, RPA, analytics, WhatsApp — FX, latency, residency.", "Ranked List", "2026-05-25"),
  art(O, Oh, "01 — Stacks", "enterprise-ai-stack-2026", "Enterprise AI Stack 2026: Model, Orchestration, Eval, Channel", "Pin versions. Allow-list MCP servers.", "Deep Dive", "2026-05-26"),
  art(O, Oh, "02 — Channels", "whatsapp-ai-stack-africa-2026", "WhatsApp AI Stack for African Operators 2026", "Meet the customer where they already are.", "How-To", "2026-05-27"),

  art(C, Ch, "01 — Partners", "best-ai-roadmap-consulting-partners-2026", "Best AI Roadmap Consulting Partners 2026: Ranked", "18–36 month roadmaps, African delivery depth.", "Ranked List", "2026-05-28"),
  art(C, Ch, "01 — Partners", "best-ai-consulting-firms-for-bpa-2026", "Best AI Consulting Firms for BPA 2026: Compared", "Who still does process automation vs who rebranded a chatbot.", "Ranked List", "2026-05-29"),
  art(C, Ch, "02 — Buying", "ai-vendor-rfp-template-2026", "AI Vendor RFP Template 2026: Security, Data, Outcome SLAs", "Residency, subprocessors, eval sets, kill switch.", "How-To", "2026-05-30"),
  art(C, Ch, "02 — Buying", "ai-tco-2026", "AI TCO 2026: Tokens, People, Compliance, and Cloud", "The line items that blow “cheap API” cases.", "Deep Dive", "2026-05-31"),
  art(C, Ch, "02 — Buying", "scoped-consulting-vs-seat-based-ai", "Scoped Consulting vs Seat-Based AI: Which Model Fits", "Project, retainer, or vendor seat — failure mode of each.", "Comparison", "2026-06-01"),

  art(R, Rh, "01 — Policy", "ai-nigeria-africa-national-initiatives", "AI Nigeria & Africa: National Initiatives and How to Access Them", "Who qualifies, what they fund, how to plug in without a six-month liaison tour.", "Deep Dive", "2026-06-02"),
  art(R, Rh, "01 — Policy", "ai-policy-africa-2026", "AI Policy in Africa 2026: NDPR, AU, and Exporter Reality", "Dual compliance when you sell into Europe.", "Deep Dive", "2026-06-03"),
  art(R, Rh, "02 — Practice", "building-ai-practices-in-lagos-2026", "Building an AI Practice in Lagos 2026", "How LOG_ON actually operates: hours, WhatsApp, scoped SOWs.", "Deep Dive", "2026-06-04"),
];

export const moreClusterMeta: { label: string; href: string; intro: string; pick: string }[] = [
  { label: I, href: Ih, intro: "From assessment to production. Workflow first.", pick: "ai-implementation-guide-2026" },
  { label: U, href: Uh, intro: "RPA, BPA, and agents as a portfolio.", pick: "ai-automation-consulting-2026" },
  { label: S, href: Sh, intro: "Adoption, skills, spend — labelled estimates only.", pick: "africa-ai-adoption-2026" },
  { label: T, href: Th, intro: "Persona-based programmes, not prompt theatre.", pick: "best-ai-training-companies-by-persona-2026" },
  { label: G, href: Gh, intro: "EU-style obligations and NDPR for Nigerian operators.", pick: "eu-ai-act-compliance-consulting-2026" },
  { label: N, href: Nh, intro: "Vertical plays: finance, health, plants, logistics, public sector.", pick: "ai-in-financial-services-use-cases" },
  { label: O, href: Oh, intro: "Stacks that survive FX, latency, and WhatsApp.", pick: "best-ai-tools-nigerian-african-enterprises-2026" },
  { label: C, href: Ch, intro: "How enterprises buy AI in 2026.", pick: "best-ai-roadmap-consulting-partners-2026" },
  { label: R, href: Rh, intro: "National programmes and a Lagos practice.", pick: "ai-nigeria-africa-national-initiatives" },
];

const img = imageData.workflowAutomation;

export function moreClustersToInsights() {
  return moreArticles.map((a) => ({
    title: a.title,
    slug: a.slug,
    description: a.description,
    image: img.src,
    width: img.width,
    height: img.height,
    dataAiHint: img.dataAiHint,
    tags: a.tags,
    author: a.author,
    date: a.date,
    codeVisualType: "default" as const,
  }));
}
