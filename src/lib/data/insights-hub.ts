/**
 * LOG_ON Insights Hub — editorial architecture (2026).
 * Swedish / Alice Labs market language is remapped to Nigeria, Africa, and global.
 * Featured hrefs point at existing /insights/[slug] articles where a match exists.
 */

export type HubArticle = {
  title: string;
  summary: string;
  href: string;
  kind?: string;
};

export type HubCategory = {
  name: string;
  description: string;
  articles: HubArticle[];
};

export type HubPillar = {
  index: string;
  name: string;
  intro: string;
  categories: HubCategory[];
};

export const insightsHubHero = {
  kicker: "Insights Hub",
  headline: "LOG_ON: AI insights that move organizations forward.",
  subheadline:
    "Research-backed guides on AI strategy, implementation, AI search (LLMO/GEO), agents, statistics and governance — updated as the stack evolves for Nigerian, African, and global operators.",
  editorPick: {
    title: "AI Implementation Guide: The Complete Enterprise Playbook 2026",
    pitch:
      "A five-phase framework — assess, prioritise, govern, pilot, scale — that steers boards past the usual failure points (no owner, no data rights, no EU-style risk register, no P&L metric). Built for Lagos-to-London operators who need measurable ROI inside two quarters, not another slide deck.",
    href: "/insights/ai-implementation-guide-2026",
  },
  stats: [
    { value: "live", label: "Articles live" },
    { value: "15", label: "Topics" },
    { value: "90d", label: "Review cycle" },
  ],
};

export const insightsHubLatest: HubArticle[] = [
  {
    title: "Best AI Roadmap Consulting Partners 2026: Ranked",
    summary:
      "C-suites no longer fund discovery theatre. Ranked on 18–36 month roadmap quality and African delivery depth — for CIO, CTO, and COO shortlists.",
    href: "/insights/best-ai-roadmap-consulting-partners-2026",
    kind: "Consulting",
  },
  {
    title: "Business Case for AI Strategy Consulting 2026: ROI Framework",
    summary:
      "Board-defensible TCO, payback, and 12-month milestones for operators who cannot assume cheap inference or dollar-stable budgets.",
    href: "/insights/business-case-ai-strategy-consulting-2026",
    kind: "Strategy",
  },
  {
    title: "Best AI Training Companies by Persona 2026 | LOG_ON",
    summary:
      "Exec literacy vs builder depth vs counsel — and when an internal academy beats an imported bootcamp.",
    href: "/insights/best-ai-training-companies-by-persona-2026",
    kind: "Training",
  },
  {
    title: "AI Automation Consulting 2026: Pilots to Production",
    summary:
      "Why portfolios stall at three bots, and the operating model that takes a Nigerian finance or logistics team into a governed portfolio.",
    href: "/insights/ai-automation-consulting-2026",
    kind: "Automation",
  },
  {
    title: "AI Search Optimization: The Complete Guide for 2026",
    summary:
      "GEO, LLMO, schema, llms.txt, and citation strategy for ChatGPT, Perplexity, Claude, and Google AI Overviews.",
    href: "/insights/ai-search-optimization-guide",
    kind: "LLMO",
  },
  {
    title: "The 2026 AI Skills Gap Without Importing a Whole Lab",
    summary:
      "Persona training: exec, operator, counsel, builder. Supervision is the bottleneck, not prompt novelty.",
    href: "/insights/ai-skills-gap-2026",
    kind: "Training",
  },
];

export const insightsHubPillars: HubPillar[] = [
  {
    index: "01",
    name: "LEARN",
    intro:
      "Foundations and research for leaders who need a shared vocabulary before they spend. Statistics, search surfaces, tools, and the African policy landscape — written so a director can brief a board the same afternoon.",
    categories: [
      {
        name: "AI Search & LLMO",
        description:
          "Generative Engine Optimisation and Large-Language-Model Optimisation: how ChatGPT, Perplexity, Gemini, and Copilot retrieve — or ignore — your brand. Standard practice in 2026, not a side experiment.",
        articles: [
          {
            title: "AI Search Optimization: The Complete Guide for 2026",
            summary:
              "Pillar guide: GEO, LLMO, schema, llms.txt, and citation strategy for ChatGPT, Perplexity, Claude, and Google AI Overviews.",
            href: "/insights/ai-search-optimization-guide",
          },
          {
            title: "Browse the AI Search & LLMO cluster",
            summary:
              "Forty-plus articles across foundations, tactics, technical crawl, industry plays, and crawlability consulting.",
            href: "/insights/ai-search",
          },
        ],
      },
      {
        name: "AI Statistics & Data",
        description:
          "2026 adoption numbers, skills-gap data, and the metrics CFOs actually accept. Global studies translated for Nigerian and pan-African operating constraints.",
        articles: [
          {
            title: "Data-Driven Decisions for Workplace Automation",
            summary:
              "Which operational KPIs move when you automate — cycle time, error rate, cost-to-serve — and how to baseline them before the first pilot.",
            href: "/insights/primer-on-business-analytics",
          },
          {
            title: "Africa AI Adoption 2026: Skills, Spend, and the Production Gap",
            summary:
              "Where African enterprises actually run models in production versus slideware, and why the skills bottleneck is supervision — not prompt novelty.",
            href: "/insights/africa-ai-adoption-2026",
          },
        ],
      },
      {
        name: "AI Tools & Technology",
        description:
          "Production-ready stacks: models, orchestration, evaluation, and the commerce rails African firms already pay through. Comparisons, not vendor brochures.",
        articles: [
          {
            title: "Speed Up Your AI Workflows with Gemini Flash",
            summary:
              "When a faster, cheaper model is the right production choice for Nigerian workloads — and when quality still demands a heavier model.",
            href: "/insights/gemini-flash-faster-ai-workflows",
          },
          {
            title: "Best AI Tools for Nigerian & African Enterprises 2026 | LOG_ON",
            summary:
              "A practitioner shortlist: agents, RAG, RPA, analytics, and WhatsApp stacks that survive FX, latency, and data-residency questions. Partner patterns included.",
            href: "/insights/best-ai-tools-nigerian-african-enterprises-2026",
          },
        ],
      },
      {
        name: "AI in Nigeria & Africa",
        description:
          "National programmes, regulators, and how a Lagos, Accra, or Nairobi operator actually gets access — funding windows, sandboxes, and public-private rails.",
        articles: [
          {
            title: "AI Nigeria & Africa: National Initiatives and How to Access Them",
            summary:
              "A 2026 map of Nigerian, AU, and partner-country AI programmes: who qualifies, what they fund, and how enterprises plug in without a six-month liaison tour.",
            href: "/insights/ai-nigeria-africa-national-initiatives",
          },
          {
            title: "A Guide to Workplace Automation in Nigeria",
            summary:
              "Process automation in the Nigerian operating environment — power, payments, WhatsApp, and the compliance conversations that follow.",
            href: "/insights/guide-to-business-process-automation",
          },
        ],
      },
      {
        name: "AI data residency",
        description:
          "On-continent inference, NDPR / GDPR dual compliance, and when a European or US model endpoint is still defensible.",
        articles: [
          {
            title: "NDPR and AI Governance in Nigeria 2026",
            summary:
              "Data rights, processors, residency. Pair with GDPR if you sell into the EU.",
            href: "/insights/ndpr-ai-governance-nigeria-2026",
          },
        ],
      },
    ],
  },
  {
    index: "02",
    name: "PLAN & BUILD",
    intro:
      "Strategy, implementation, and governance for teams that have left the sandbox. Agentic systems are mainstream; EU-style risk controls and African data rules now sit on the same roadmap.",
    categories: [
      {
        name: "AI Agents",
        description:
          "Design, supervise, and productise agents that act in CRM, WhatsApp, and core ops — with logs a counsel can read.",
        articles: [
          {
            title: "Best AI Agencies in Nigeria & Africa 2026: 13 Compared",
            summary:
              "Editor’s pick for the agents cluster — African and global implementers, not a Sweden list.",
            href: "/insights/best-ai-agencies-nigeria-africa-2026",
          },
          {
            title: "Browse the AI Agents cluster",
            summary:
              "Definitions, architecture, frameworks, MCP/A2A, production, and use cases — fifty-plus routed articles.",
            href: "/insights/ai-agents",
          },
        ],
      },
      {
        name: "AI Strategy",
        description:
          "Board-defensible roadmaps: TCO, NPV, IRR, risk registers, and 12-month milestones a CFO will sign.",
        articles: [
          {
            title: "Business Case for AI Strategy Consulting 2026: ROI Framework",
            summary:
              "Editor’s pick: board-defensible TCO, payback, 12-month milestones.",
            href: "/insights/business-case-ai-strategy-consulting-2026",
          },
          {
            title: "Browse the AI Strategy cluster",
            summary: "Frameworks, size, industry, concepts — 44 routed articles.",
            href: "/insights/ai-strategy",
          },
        ],
      },
      {
        name: "AI Implementation",
        description:
          "How work actually ships: thin slices, 2–4 week prototypes, 90-day pilots, and the handoff that stops pilots dying in staging.",
        articles: [
          {
            title: "AI Prototype in 2–4 Weeks + 90-Day Retail Pilot",
            summary:
              "A retail and commerce path from conversational prototype to measured AOV and ticket deflection — timelines LOG_ON already runs.",
            href: "/insights/ai-prototype-2-4-weeks-90-day-retail-pilot",
          },
          {
            title: "How to Build Your First AI Agent: A Step-by-Step Guide",
            summary:
              "Scope, tools, evaluation, and go-live for the first agent a director can defend in a steering committee.",
            href: "/insights/how-to-build-ai-agent-guide",
          },
        ],
      },
      {
        name: "AI Automation",
        description:
          "From RPA pilots to production portfolios. Deterministic bots where they belong; agents where judgment starts.",
        articles: [
          {
            title: "AI Automation Consulting 2026: Pilots to Production",
            summary:
              "Why most automation stalls at three bots — and the operating model that takes a Nigerian finance or logistics team into a governed portfolio.",
            href: "/insights/ai-automation-consulting-2026",
          },
          {
            title: "Organizing AI Workflows: Labels, Maps, and Thread Management",
            summary:
              "Operational hygiene for agent fleets: labelling, thread maps, and the audit trail auditors now expect.",
            href: "/insights/organizing-ai-workflows-thread-management",
          },
        ],
      },
      {
        name: "AI for Business Functions",
        description:
          "Marketing, support, finance, HR — function plays with platforms compared on TCO, data rights, and African channel fit.",
        articles: [
          {
            title: "Top AI Marketing Platforms 2026: 8 Compared | LOG_ON",
            summary:
              "Editor’s pick: eight stacks scored for African channel fit, not a US-only brochure.",
            href: "/insights/top-ai-marketing-platforms-2026",
          },
          {
            title: "Browse AI for Business Functions",
            summary:
              "Sales, marketing, HR, finance, legal, ops, C-suite guides — 24 routed articles.",
            href: "/insights/ai-functions",
          },
        ],
      },
      {
        name: "AI Training & Education",
        description:
          "Persona-based programmes for executives, operators, and builders. Partner curricula referenced where they match African delivery.",
        articles: [
          {
            title: "Best AI Training Companies by Persona 2026 | LOG_ON",
            summary:
              "Who to hire for exec literacy vs builder depth vs counsel — and when an internal academy beats an imported bootcamp.",
            href: "/insights/best-ai-training-companies-by-persona-2026",
          },
          {
            title: "Prompt Engineering for AI Agent Development",
            summary:
              "The 2026 skill is not clever prompts; it is evaluation, tool use, and policy. A builder’s course outline.",
            href: "/insights/prompt-engineering-for-developers",
          },
        ],
      },
      {
        name: "AI Governance & Compliance",
        description:
          "EU AI Act–style obligations, NDPR, sector rules, and the dual-compliance path for African firms that sell into Europe.",
        articles: [
          {
            title: "EU AI Act Compliance Consulting 2026 | LOG_ON",
            summary:
              "What African exporters and EU-facing groups must inventory, classify, and document in 2026 — without freezing every pilot.",
            href: "/insights/eu-ai-act-compliance-consulting-2026",
          },
          {
            title: "Cybersecurity in the Age of Workplace AI: Threats and Opportunities",
            summary:
              "Shadow AI, prompt injection, and data leakage — the control set security and legal can agree on.",
            href: "/insights/cybersecurity-ai-threats-opportunities",
          },
        ],
      },
      {
        name: "Generative AI",
        description:
          "LLMs, multimodal systems, and where generation belongs in a governed stack. Plain language for Nigerian operators.",
        articles: [
          {
            title: "What Is Generative AI? Guide for Nigerian Enterprises 2026",
            summary:
              "Definition, models, EU-style risk, and African adoption — remapped from a Sweden-only guide.",
            href: "/insights/what-is-generative-ai-nigeria-2026",
          },
          {
            title: "Browse the Generative AI cluster",
            summary: "Enterprise, foundations, risks, models, tools, consultants — 18 routed articles.",
            href: "/insights/generative-ai",
          },
        ],
      },
      {
        name: "AI for Industries",
        description:
          "Vertical plays: finance, healthcare, retail, manufacturing, logistics — risk and customer use cases first.",
        articles: [
          {
            title: "AI in Financial Services: Risk, Compliance & Customer Use Cases",
            summary:
              "Credit, fraud, service, and reporting under tightening African and EU-adjacent rules. Six use cases that survive a risk committee.",
            href: "/insights/ai-in-financial-services-use-cases",
          },
          {
            title: "Building Recommendation Systems for E-Commerce in Nigeria",
            summary:
              "Personalisation that moves AOV on local catalogues, payments, and mobile-first traffic.",
            href: "/insights/building-recommendation-systems",
          },
        ],
      },
      {
        name: "AI SEO",
        description:
          "Keyword systems, content formats, and the overlap with LLMO — still required for classic search, now insufficient alone.",
        articles: [
          {
            title: "AI Keyword Research Tools 2026: Find Opportunities Faster",
            summary:
              "How research tools changed once answer engines started citing sources — and which queries still belong to Google.",
            href: "/insights/seo-vs-geo-invisible-in-ai-search",
          },
          {
            title: "10 Content Formats to Supercharge Workplace AI",
            summary:
              "Formats models actually retrieve: tables, FAQs, entity blocks, and llms.txt companions.",
            href: "/insights/10-content-formats-that-get-picked-up-by-llms",
          },
        ],
      },
      {
        name: "Evaluation practice",
        description: "Gold sets and harnesses before go-live. No vibe-based production.",
        articles: [
          {
            title: "Evaluation Harnesses for Enterprise AI Slices",
            summary:
              "How LOG_ON scores slices before production — gold sets, not demo theatre.",
            href: "/insights/ai-implementation-eval-harness",
          },
        ],
      },
    ],
  },
  {
    index: "03",
    name: "ENGAGE",
    intro:
      "Hiring and commercial models. How enterprises buy AI in 2026 — roadmaps, RFPs, TCO — and how to pick a partner who will still be on the incident channel after go-live.",
    categories: [
      {
        name: "AI Consulting",
        description:
          "Roadmap houses, BPA specialists, and full-stack implementers. Ranked on production evidence, not logo walls.",
        articles: [
          {
            title: "Best AI Roadmap Consulting Partners 2026: Ranked",
            summary:
              "Scored on 18–36 month roadmap quality, EU-style sequencing, and African delivery depth — for CIO, CTO, and COO shortlists.",
            href: "/insights/best-ai-roadmap-consulting-partners-2026",
          },
          {
            title: "Best AI Consulting Firms for BPA 2026: Compared",
            summary:
              "Who still does real process automation versus who rebranded a chatbot as BPA. Comparison for procurement.",
            href: "/insights/best-ai-consulting-firms-for-bpa-2026",
          },
        ],
      },
      {
        name: "AI Vendor Selection & RFPs",
        description:
          "How to write an RFP an honest implementer can answer — and a theatre vendor cannot.",
        articles: [
          {
            title: "AI Vendor RFP Template 2026: Security, Data, and Outcome SLAs",
            summary:
              "The clauses African and EU-facing buyers now require: residency, subprocessors, evaluation sets, and kill-switch language.",
            href: "/insights/ai-vendor-rfp-template-2026",
          },
          {
            title: "Scoring Agent Vendors: A 12-Dimension Sheet for Procurement",
            summary:
              "Cost, lock-in, observability, WhatsApp/channel fit, and who owns the prompts when the contract ends.",
            href: "/insights/how-to-build-ai-agent-guide",
          },
        ],
      },
      {
        name: "AI Pricing & TCO Models",
        description:
          "Tokens are not the invoice. TCO for scoped consulting, retainers, and usage — in naira and dollars.",
        articles: [
          {
            title: "AI TCO 2026: Tokens, People, Compliance, and Cloud",
            summary:
              "A CFO model that includes NDPR/EU documentation, evaluation labour, and FX — the line items that blow “cheap API” business cases.",
            href: "/insights/ai-investment-playbook",
          },
          {
            title: "Scoped Consulting vs Seat-Based AI: Which Commercial Model Fits",
            summary:
              "When a Lagos operator should buy a project, a retainer, or a vendor seat — and the failure mode of each.",
            href: "/insights/scoped-consulting-vs-seat-based-ai",
          },
        ],
      },
    ],
  },
];
