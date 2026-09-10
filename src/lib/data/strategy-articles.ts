import imageData from "@/lib/placeholder-images.json";

export type StratBlock = { heading?: string; paragraphs: string[] };

export type StrategyArticle = {
  slug: string;
  title: string;
  description: string;
  kind: string;
  section: string;
  date: string;
  author: string;
  tags: string[];
  body: StratBlock[];
};

const A = "Oluwamayowa Logo";

function art(
  slug: string,
  title: string,
  description: string,
  kind: string,
  section: string,
  date: string,
  extra: string[] = []
): StrategyArticle {
  return {
    slug,
    title,
    description,
    kind,
    section,
    date,
    author: A,
    tags: ["AI Strategy", kind],
    body: [
      {
        paragraphs: [
          description,
          extra[0] ||
            "Written for Nigerian, African, and global operators. LOG_ON is a scoped consultancy — assessment, written scope, then delivery.",
          extra[1] ||
            "Lead author: Oluwamayowa Logo. Reviewer: Favour Alfred. 90-day review. No invented Nordic case numbers.",
        ],
      },
    ],
  };
}

export const strategyArticles: StrategyArticle[] = [
  art("enterprise-ai-strategy-framework", "Enterprise AI Strategy: 6-Step Framework for 2026", "Readiness, use-case priority, governance, pilots, scale, ROI — with NDPR / EU-style alignment for exporters.", "How-To", "01 — Frameworks", "2026-04-20"),
  art("build-vs-buy-ai", "Build vs Buy AI: Decision Framework for 2026", "Twelve dimensions: cost, time, IP, privacy, moat, ops. Default: buy the model, build the SOP.", "Comparison", "01 — Frameworks", "2026-04-21"),
  art("ai-readiness-assessment", "AI Readiness Assessment: 15-Question Scorecard (5 Dimensions)", "Strategy, data, talent, technology, governance — then a 30/60/90 plan. LOG_ON’s free assessment is the live version.", "How-To", "01 — Frameworks", "2026-05-02"),
  art("ai-maturity-model", "AI Maturity Model: Five Levels from Experiment to AI-Native", "Experiment → validate → operate → scale → AI-native. Where African mid-market actually sits.", "Deep Dive", "01 — Frameworks", "2026-05-03"),
  art("how-to-get-board-buy-in-for-ai", "How to Get Board Buy-In for AI Investment: 5-Slide Briefing", "CFO metric, risk register, owner, calendar, kill switch. RAND-style failure: no owner.", "How-To", "01 — Frameworks", "2026-05-04"),
  art("ai-strategy-roadmap-30-60-90", "AI Strategy Roadmap: 30/60/90 Day Plan (LOG_ON Methodology)", "From assessment to first measurable slice. Chatbots 2–4 weeks; automation 4–8 weeks.", "How-To", "01 — Frameworks", "2026-05-05"),
  art("ai-strategy-template", "AI Strategy Template: The 10-Section LOG_ON Roadmap (2026)", "Walkthrough of the sections we put in a written scope — not a 40-page theatre deck.", "Data & Research", "01 — Frameworks", "2026-05-06"),
  art("ai-change-management", "AI Change Management: Leading Your Organization Through AI Adoption", "Five steps: name the SOP, train the operator, measure hours, not slogans.", "Deep Dive", "01 — Frameworks", "2026-05-07"),
  art("ai-center-of-excellence", "AI Center of Excellence: 2026 Guide, Structure & Governance", "Operating models that fit a Lagos practice, not a 200-person CoE.", "How-To", "01 — Frameworks", "2026-05-08"),
  art("ai-use-case-prioritization", "AI Use Case Prioritization: How to Pick the Projects That Matter", "Score value, data rights, risk, and whether a workflow beats an agent.", "How-To", "01 — Frameworks", "2026-05-09"),
  art("build-ai-business-case", "How to Build an AI Business Case: Template & Executive Presentation", "TCO, NPV-style thinking, EU-style line items, 12-month milestones.", "How-To", "01 — Frameworks", "2026-05-10"),
  art("ai-vendor-selection-framework", "AI Vendor Selection Framework: Evaluate, Score & Choose Confidently", "Seven steps and an RFP a theatre vendor cannot fake.", "How-To", "01 — Frameworks", "2026-05-11"),
  art("ai-scaling-framework", "Scaling AI Across the Enterprise: From Pilot to a Portfolio", "Why programmes stall at 1–3 pilots. Governance, data, and an owner per SOP.", "Deep Dive", "01 — Frameworks", "2026-05-12"),
  art("ai-pilot-to-production", "From AI Pilot to Production: Why Most Get Stuck & How to Move Fast", "Eval, HITL, runbook, on-call. Workflow first.", "How-To", "01 — Frameworks", "2026-05-13"),
  art("ai-strategy-for-enterprise", "Enterprise AI Strategy: Large-Org Playbook for 2026", "Federated CoE, multi-region, Annex-style high-risk lists.", "Deep Dive", "02 — By size", "2026-05-14"),
  art("ai-strategy-for-smes", "AI Strategy for SMEs: Practical Guide Under a Tight Budget (2026)", "Three-use-case approach. Buy vs build for SMEs. LOG_ON’s typical mid-market path.", "Deep Dive", "02 — By size", "2026-05-15"),
  art("ai-strategy-for-startups", "AI Strategy for Startups: Move Fast, Build Smart & Stay Lean", "90-day roadmaps, fractional advisors, EU-style hygiene without a legal army.", "Deep Dive", "02 — By size", "2026-05-16"),
  art("ai-strategy-mid-market", "AI Strategy for Mid-Market Companies: Practical Guide for 2026", "50–500 people. One owner, three SOPs, one metric.", "Deep Dive", "02 — By size", "2026-05-17"),
  art("ai-strategy-for-financial-services", "AI Strategy for Financial Services: Risk, Compliance & Growth (2026)", "Credit, fraud, service, reporting. NDPR and exporter rules.", "Deep Dive", "03 — By industry", "2026-05-18"),
  art("ai-strategy-for-retail", "AI Strategy for Retail: Personalization, Inventory & Customer Experience", "AOV, WhatsApp, stock. LOG_ON +15% AOV where measured.", "Deep Dive", "03 — By industry", "2026-05-19"),
  art("ai-strategy-for-public-sector", "AI Strategy for Public Sector: Government & Municipal AI Adoption", "Procurement, transparency, residency. No surveillance theatre.", "Deep Dive", "03 — By industry", "2026-05-20"),
  art("ai-strategy-for-energy", "AI Strategy for Energy & Utilities: Grid, Operations & Sustainability", "Predictive maintenance and ops — workflow first.", "Deep Dive", "03 — By industry", "2026-05-21"),
  art("ai-strategy-for-healthcare", "AI Strategy for Healthcare: Regulation, Use Cases & Implementation", "Scheduling, coding, EHR — not unsupervised diagnosis.", "Deep Dive", "03 — By industry", "2026-05-22"),
  art("ai-strategy-for-manufacturing", "AI Strategy for Manufacturing: Smart Factory & Operations Roadmap", "Vision QC, downtime, supply. Honest ROI ranges.", "Deep Dive", "03 — By industry", "2026-05-23"),
  art("ai-strategy-for-legal", "AI Strategy for Law Firms: Productivity, Research & Client Service", "Assist, don’t unsupervised-advise. YMYL.", "Deep Dive", "03 — By industry", "2026-05-24"),
  art("ai-strategy-for-logistics", "AI Strategy for Logistics: Route Optimization, Forecasting & Last Mile", "African ports, FX, last mile belong in the model.", "Deep Dive", "03 — By industry", "2026-05-25"),
  art("ai-strategy-for-media", "AI Strategy for Media Companies: Content, Audience & Monetization", "LLMO + publisher stacks. Citation-grade pages.", "Deep Dive", "03 — By industry", "2026-05-26"),
  art("what-is-ai-strategy", "What Is AI Strategy? Definition, Components & 6-Step Framework", "A multi-year plan that ties AI spend to P&L and risk. Six components.", "Definition", "04 — Concepts", "2026-05-27"),
  art("what-is-ai-governance", "What Is AI Governance? Frameworks & Compliance (2026)", "Policy, process, tooling. EU AI Act, NIST, ISO 42001, NDPR — compared, not copied blindly.", "Definition", "04 — Concepts", "2026-05-28"),
  art("what-is-shadow-ai", "What Is Shadow AI? Risks, Examples & How to Manage It", "Unsanctioned tools. Five risk categories, audit method.", "Definition", "04 — Concepts", "2026-05-29"),
  art("what-is-ai-roi", "What Is AI ROI? How to Measure Return on AI Investment (2026)", "Net benefit / TCO. LOG_ON records vs analyst folklore.", "Definition", "04 — Concepts", "2026-05-30"),
  art("ai-operating-model", "AI Operating Model: How to Structure Your Organization for AI at Scale", "Who owns the SOP, the model, and the incident channel.", "Deep Dive", "04 — Concepts", "2026-05-31"),
  art("ai-transformation-vs-digital-transformation", "AI Transformation vs Digital Transformation: What's the Difference?", "Digitise the process before you agent it.", "Comparison", "04 — Concepts", "2026-06-01"),
  art("what-is-ai-product-strategy", "AI Product Strategy: Framework, Roadmap & Examples 2026", "Platform vs feature vs SOP automation.", "Definition", "04 — Concepts", "2026-06-02"),
  art("ai-data-strategy", "AI Data Strategy: Build the Data Foundation That AI Requires", "Rights, quality, residency. Five pillars.", "Deep Dive", "04 — Concepts", "2026-06-03"),
  art("ai-communications-strategy", "AI Communications Strategy: How to Talk to Employees, Customers & Press", "Message maps without fake scarcity.", "Deep Dive", "04 — Concepts", "2026-06-04"),
  art("business-case-ai-strategy-consulting-2026", "Business Case for AI Strategy Consulting 2026: ROI Framework", "Board-defensible TCO, payback, 12-month milestones. Editor’s pick.", "Deep Dive", "05 — Business case", "2026-08-12"),
  art("ai-strategy-consulting-for-startups", "AI Strategy Consulting for Startups 2026 | LOG_ON", "90-day roadmaps, fractional advisors, Lagos-based, works globally.", "Deep Dive", "06 — Startups", "2026-08-13"),
  art("enterprise-ai-roadmap-consulting", "Enterprise AI Roadmap Consulting 2026 | LOG_ON", "18–36 month portfolios, sequencing, quarterly re-plan tied to P&L.", "Deep Dive", "07 — Enterprise", "2026-08-14"),
  art(
    "best-ai-strategy-consultants-nigeria-africa-2026",
    "Best AI Strategy Consultants in Nigeria & Africa 2026 | LOG_ON",
    "Ranked for CIO/CTO/MD shortlists. African delivery and production refs — not a Sweden SI list.",
    "Ranked List",
    "08 — Listicles",
    "2026-08-15"
  ),
  art("what-is-ai-guide-nigeria-2026", "What Is AI? Guide for Nigerian Enterprises 2026", "Plain definition, types, cost, EU-style risk, concrete uses.", "Deep Dive", "09 — Informational", "2026-08-16"),
  art("what-is-an-ai-strategy-nigeria-2026", "What Is an AI Strategy? Framework for African Firms 2026", "Seven components, national context, mid-market roadmap.", "Deep Dive", "09 — Informational", "2026-08-17"),
  art("how-ai-works-in-companies-2026", "How Does AI Work in Companies? Practical Guide 2026", "Data pipelines, LLM, RAG, agents, integration, cost, ROI.", "Deep Dive", "09 — Informational", "2026-08-18"),
  art("what-does-ai-stand-for-2026", "What Does AI Stand For? Simple Explanation 2026 | LOG_ON", "Artificial Intelligence. History in brief, modern types, African examples.", "Deep Dive", "09 — Informational", "2026-08-19"),
];

export const strategySections = [
  "01 — Frameworks",
  "02 — By size",
  "03 — By industry",
  "04 — Concepts",
  "05 — Business case",
  "06 — Startups",
  "07 — Enterprise",
  "08 — Listicles",
  "09 — Informational",
];

const img = imageData.stockMarketChart;

export function strategyToInsights() {
  return strategyArticles.map((a) => ({
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
    codeVisualType: "workflow" as const,
  }));
}
