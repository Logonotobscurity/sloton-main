import imageData from "@/lib/placeholder-images.json";

export type FnBlock = { heading?: string; paragraphs: string[] };

export type FunctionsArticle = {
  slug: string;
  title: string;
  description: string;
  kind: string;
  section: string;
  date: string;
  author: string;
  tags: string[];
  body: FnBlock[];
};

const A = "Oluwamayowa Logo";

function art(
  slug: string,
  title: string,
  description: string,
  kind: string,
  section: string,
  date: string,
  extra: string[]
): FunctionsArticle {
  return {
    slug,
    title,
    description,
    kind,
    section,
    date,
    author: A,
    tags: ["AI Functions", kind, section.split("—")[1]?.trim() || "Functions"],
    body: [
      {
        paragraphs: [
          description,
          extra[0] ||
            "Written for Nigerian, African, and global function leaders. LOG_ON implements scoped systems after a free efficiency assessment — not a seat licence.",
          extra[1] ||
            "Oluwamayowa Logo is the lead author. Favour Alfred reviews for operator fit. 90-day review cycle.",
        ],
      },
    ],
  };
}

export const functionsArticles: FunctionsArticle[] = [
  art("ai-for-communications", "AI for Corporate Communications: Writing, Monitoring & Crisis Response", "How CCOs use AI for drafts, media monitoring, and crisis packs — with a human on the send button.", "Deep Dive", "01 — Communications", "2026-05-04", ["Do not auto-publish crisis copy. LOG_ON treats comms as HITL."]),
  art("ai-functions-roi-overview", "AI ROI by Business Function: Where AI Creates the Most Value", "Where LOG_ON sees payback first: support deflection, finance hours, commerce AOV — not invented McKinsey pie charts.", "Data & Research", "02 — Cross-function", "2026-05-05", ["Cite our delivery records: support −30% tickets, loan cycle −60%, retail AOV +15% where we measured them."]),
  art("ai-for-customer-service", "AI for Customer Service: Beyond Chatbots to Intelligent Support", "WhatsApp, web, and voice. Architectures that resolve routine work and escalate the rest. Measure CSAT and deflection.", "Deep Dive", "03 — Customer experience", "2026-05-06", ["Ties to LOG_ON support agents. No vanity ‘tickets closed by AI’."]),
  art("ai-chatbot-guide-2026", "Best Enterprise AI Chatbots 2026: Platforms & Deployment", "Intercom Fin, Salesforce Agentforce, Copilot Studio, custom WhatsApp builds — costs, channels, and when LOG_ON builds instead of buying.", "How-To", "03 — Customer experience", "2026-05-07", ["African buyers need WhatsApp and Paystack-class rails, not only US helpdesks."]),
  art("ai-for-the-cfo", "AI Guide for CFOs: Financial Planning, Risk & Cost Management", "FP&A drafts, recon, and risk registers. Dual control on any posting tool. TCO includes eval labour and FX.", "Deep Dive", "04 — C-suite", "2026-05-08", ["A CFO metric first. Transformation slides last."]),
  art("ai-for-the-cmo", "AI Guide for CMOs: Marketing Transformation & AI Strategy", "LLMO plus paid and CRM. Citation-grade pages and WhatsApp journeys. No fake 84% adoption claims as budget law.", "Deep Dive", "04 — C-suite", "2026-05-09", ["Pair GEO with a landing page worth a click."]),
  art("ai-for-the-chro", "AI Guide for CHROs: People Strategy in the Age of AI", "Talent, training, and NDPR/EU-style high-risk rules for HR AI. A human still decides who gets the offer.", "Deep Dive", "04 — C-suite", "2026-05-10", ["Annex-style HR systems need extra governance."]),
  art("ai-financial-forecasting", "AI Financial Forecasting: More Accurate Predictions with Less Work", "Models that help FP&A — and when a spreadsheet plus judgment still wins. Implementation notes for mid-market finance teams.", "Deep Dive", "05 — Finance", "2026-05-11", ["Read-only on the warehouse first."]),
  art("ai-for-finance-guide", "AI for Finance: FP&A, Risk, Compliance & Reporting Use Cases", "Recon, packs, and compliance drafts. Close-cycle gains only when the SOP is written.", "Deep Dive", "05 — Finance", "2026-05-12", ["See also /insights/ai-agents-for-finance."]),
  art("ai-for-hr-guide", "AI for HR: Transforming Talent Acquisition, Development & Retention", "Screening assist, onboarding checklists, internal knowledge. Bias and NDPR notes.", "Deep Dive", "06 — HR", "2026-05-13", ["See also /insights/ai-agents-for-hr."]),
  art("ai-recruitment-tools-2026", "Best AI Recruitment Tools 2026: Hire Faster Without Bias", "Ranked on bias controls, audit logs, and African hiring reality — not speed-theatre.", "Ranked List", "06 — HR", "2026-05-14", ["A human still makes the offer."]),
  art("ai-for-it-operations", "AIOps: AI for IT Operations, Incident Response & Infrastructure", "Alert noise, MTTR, and when not to let an agent restart production.", "Deep Dive", "07 — IT", "2026-05-15", ["Kill switch and on-call human required."]),
  art("ai-for-legal-operations", "AI for Legal Operations: Contract, Research & Compliance Automation", "Review assist, not unsupervised advice. YMYL. Lawyer in the loop.", "Deep Dive", "08 — Legal", "2026-05-16", ["See /insights/ai-agents-for-legal."]),
  art("ai-contract-analysis", "Artificial Intelligence Contract Analysis: 2026 Guide", "Clause extract, risk flags, vendors (Harvey-class, CLM suites), ROI, EU AI Act / NDPR notes.", "Deep Dive", "08 — Legal", "2026-05-17", ["Do not let a model invent case law."]),
  art("ai-for-marketing-guide", "AI for Marketing: Strategy, Tools & Use Cases for 2026", "Content, journeys, LLMO, WhatsApp. Tools second; entity and offer first.", "Deep Dive", "09 — Marketing", "2026-05-18", []),
  art("ai-marketing-personalization", "AI Marketing Personalization: How to Scale 1:1 Experiences", "Personalisation that moves AOV on Nigerian catalogues and mobile-first traffic. LOG_ON retail record: +15% AOV where we measured it.", "Deep Dive", "09 — Marketing", "2026-05-19", []),
  art("top-ai-marketing-platforms-2026", "Top AI Marketing Platforms 2026: 8 Compared | LOG_ON", "Eight stacks: Salesforce Agentic Marketing, Adobe Journey Optimizer, HubSpot Breeze, Braze, Twilio Segment, Hightouch, plus WhatsApp-native and custom LOG_ON builds. Scored for African channel fit.", "Ranked List", "09 — Marketing", "2026-06-02", ["Editor’s pick for this cluster."]),
  art("ai-demand-forecasting", "AI Demand Forecasting: Cut Stock-Outs & Overstock with ML", "Which models we use, what data you need, and honest ranges — not a guaranteed 50% cut.", "Deep Dive", "10 — Operations", "2026-05-20", []),
  art("ai-for-supply-chain", "AI for Supply Chain: Demand Forecasting, Logistics & Risk Optimization", "Forecast, routing, and risk. African logistics constraints (ports, FX, last mile) belong in the model.", "Deep Dive", "10 — Operations", "2026-05-21", []),
  art("ai-predictive-maintenance", "AI Predictive Maintenance: Reduce Downtime & Cut Maintenance Costs", "Sensors, models, and when a simple threshold still wins. Manufacturing and utilities.", "Deep Dive", "10 — Operations", "2026-05-22", []),
  art("ai-for-product-management", "AI for Product Management: Tools, Workflows & 2026 Guide", "ChatGPT/Claude for specs, Productboard/Amplitude-class stacks, anti-patterns for PMs.", "Deep Dive", "11 — Product", "2026-05-23", []),
  art("ai-for-sales-guide", "AI for Sales: Tools, Use Cases & ROI for Revenue Teams in 2026", "Prospecting, CRM hygiene, WhatsApp. HITL on first outreach. Hours back, not invented 2.6× growth law.", "Deep Dive", "12 — Sales", "2026-05-24", ["See /insights/ai-agents-for-sales."]),
  art("ai-sales-automation-tools", "Best AI Sales Automation Tools 2026: Ranked & Reviewed", "Prospecting, CRM, deal intel — scored for Lagos B2B teams.", "Ranked List", "12 — Sales", "2026-05-25", []),
  art("top-hr-ai-tools-2026", "Best AI Tools for HR 2026: 9 Compared | LOG_ON", "Workday, Greenhouse, Lattice, Eightfold, ServiceNow HR, Microsoft Viva, SAP SuccessFactors, BambooHR, Personio — plus NDPR / EU Annex-style notes. No Swedish-only list.", "Ranked List", "13 — HR tools", "2026-06-04", []),
  art(
    "best-ai-hr-tools-nigeria-africa-2026",
    "Best AI HR Tools for Nigerian & African Teams 2026 | LOG_ON",
    "Nine HR AI stacks scored for NDPR, EU Annex-style high-risk rules, and African payroll/hiring reality — the English counterpart to a Sweden-only listicle.",
    "Ranked List",
    "13 — HR tools",
    "2026-06-05",
    ["Human still decides the offer. LOG_ON will not implement unsupervised hiring agents."]
  ),
];

export const functionsSections = [
  "01 — Communications",
  "02 — Cross-function",
  "03 — Customer experience",
  "04 — C-suite",
  "05 — Finance",
  "06 — HR",
  "07 — IT",
  "08 — Legal",
  "09 — Marketing",
  "10 — Operations",
  "11 — Product",
  "12 — Sales",
  "13 — HR tools",
];

const img = imageData.professionalsMeeting;

export function functionsToInsights() {
  return functionsArticles.map((a) => ({
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
