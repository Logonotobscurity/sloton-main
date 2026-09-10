/** Structured overlays for insights that existed before the 2026 hub rebuild. */
export type LegacyBrief = {
  kind: string;
  cluster: "search" | "agents" | "functions" | "library";
  keyPoints: string[];
  contexts?: { label: string; quote: string }[];
  faqs?: { q: string; a: string }[];
};

export const LEGACY_BRIEFS: Record<string, LegacyBrief> = {
  "codebase-by-agent-for-agent": {
    kind: "Deep Dive",
    cluster: "agents",
    keyPoints: [
      "An agent that writes and maintains its own repo still needs evals, reviews, and a human owner.",
      "Self-improving loops amplify both speed and failure — gate merges.",
      "Nigerian teams should start with a bounded repo, not the whole monorepo.",
    ],
    contexts: [
      { label: "Internal tools", quote: "An agent opens a PR, CI fails, the agent reads the log, patches, and waits for a human approve." },
    ],
    faqs: [
      { q: "Should we let an agent merge to main?", a: "No. LOG_ON keeps a human merge gate on production branches." },
    ],
  },
  "agentic-code-review": {
    kind: "How-To",
    cluster: "agents",
    keyPoints: [
      "AI reviewing AI-generated code is a quality gate, not a replacement for a senior engineer.",
      "Define what the reviewer may change and what it may only comment.",
      "Log every review for audit.",
    ],
  },
  "gemini-flash-faster-ai-workflows": {
    kind: "How-To",
    cluster: "functions",
    keyPoints: [
      "Faster, cheaper models belong on high-volume low-risk steps.",
      "Keep a heavier model on judgment and customer-facing copy.",
      "Measure latency and quality on the same eval set.",
    ],
  },
  "visual-ai-document-analysis": {
    kind: "How-To",
    cluster: "functions",
    keyPoints: [
      "Vision models read invoices and IDs without stuffing the whole PDF into context.",
      "Extract structured fields; do not store raw PII in a vector store by default.",
      "Document-heavy Nigerian ops (finance, logistics) are the first fit.",
    ],
  },
  "organizing-ai-workflows-thread-management": {
    kind: "How-To",
    cluster: "agents",
    keyPoints: [
      "Labels, maps, and thread IDs are ops, not niceties.",
      "Counsel cannot audit a pile of untitled chats.",
      "One thread per SOP instance.",
    ],
  },
  "scaling-ai-agent-skills": {
    kind: "Deep Dive",
    cluster: "agents",
    keyPoints: [
      "AGENT.md / AGENTS.md is institutional memory: skills the org can reuse.",
      "Version skills like code. Do not keep them in a founder’s head.",
      "Nigerian enterprises scale by documenting, not by hiring a 40-person lab first.",
    ],
  },
  "how-to-build-ai-agent-guide": {
    kind: "How-To",
    cluster: "agents",
    keyPoints: [
      "Scope, tools, eval, HITL, observe, deploy, train operators.",
      "Workflow first if the SOP is known.",
      "Companion to /insights/how-to-build-ai-agent and /insights/what-is-an-ai-agent.",
    ],
  },
  "interactive-diagrams-codebase": {
    kind: "How-To",
    cluster: "library",
    keyPoints: [
      "Living diagrams beat stale Confluence screenshots.",
      "Link Mermaid (or equivalent) to the repo so docs age with the code.",
      "Useful for handover after a LOG_ON engagement.",
    ],
  },
  "why-llms-txt-matters-for-seo": {
    kind: "Definition",
    cluster: "search",
    keyPoints: [
      "llms.txt is a machine-readable map of what the organisation is.",
      "LOG_ON ships /llms.txt and /llms-full.txt on the public site.",
      "Pair with entity copy and robots that allow search crawlers.",
    ],
  },
  "10-content-formats-that-get-picked-up-by-llms": {
    kind: "How-To",
    cluster: "search",
    keyPoints: [
      "Tables, FAQs, entity blocks, and dated stats get retrieved more than slogans.",
      "Write the answer in the first two sentences.",
      "See the AI Search cluster for GEO/LLMO playbooks.",
    ],
  },
  "seo-vs-geo-invisible-in-ai-search": {
    kind: "Comparison",
    cluster: "search",
    keyPoints: [
      "SEO ranks blue links. GEO earns citations in ChatGPT, Perplexity, Overviews.",
      "You run both in 2026.",
      "African brands lose when a foreign wiki is more citable than their own About page.",
    ],
  },
  "ai-investment-playbook": {
    kind: "Deep Dive",
    cluster: "functions",
    keyPoints: [
      "Price is scoped after a free assessment. No public rate card.",
      "Typical calendars: chatbots 2–4 weeks, automation 4–8 weeks, transformation 3–6 months.",
      "Payback stories are LOG_ON records, not guarantees.",
    ],
  },
  "transforming-customer-support-with-ai": {
    kind: "How-To",
    cluster: "functions",
    keyPoints: [
      "Private agents over your documents. WhatsApp and web first.",
      "Measure deflection and CSAT.",
      "See /insights/ai-for-customer-service and /insights/ai-agents-for-customer-service.",
    ],
  },
  "prompt-engineering-for-developers": {
    kind: "How-To",
    cluster: "agents",
    keyPoints: [
      "2026 skill is eval + tools + policy, not clever one-liners.",
      "Typed outputs beat poetic prompts.",
      "Pair with Pydantic AI / LangGraph notes in the Agents cluster.",
    ],
  },
  "building-recommendation-systems": {
    kind: "Deep Dive",
    cluster: "functions",
    keyPoints: [
      "Nigerian e-commerce: catalogue, mobile, Paystack/Flutterwave reality.",
      "LOG_ON retail record: +15% AOV where we measured it.",
      "See /insights/ai-marketing-personalization.",
    ],
  },
  "ai-insights-a-practical-guide": {
    kind: "Definition",
    cluster: "library",
    keyPoints: [
      "Workplace AI types and when each belongs.",
      "Workflow first, agent only when the path is unpredictable.",
      "Board briefing companion to the Insights Hub.",
    ],
  },
  "prompt-engineering-for-business": {
    kind: "How-To",
    cluster: "functions",
    keyPoints: [
      "Operators need playbooks, not a prompt workshop.",
      "Persona training: exec, analyst, counsel.",
      "See /insights/ai-functions and the training page.",
    ],
  },
  "future-of-work-ai": {
    kind: "Deep Dive",
    cluster: "agents",
    keyPoints: [
      "Agents change who does the grind, not who owns the outcome.",
      "Nigerian firms adapt by documenting SOPs first.",
      "Supervision is the scarce skill.",
    ],
  },
  "guide-to-business-process-automation": {
    kind: "How-To",
    cluster: "functions",
    keyPoints: [
      "RPA and agents are a portfolio, not a slogan.",
      "Nigerian operating constraints: power, payments, WhatsApp.",
      "See /insights/guide-to-business-process-automation alongside the Agents production guide.",
    ],
  },
  "scaling-securely-cloud-infrastructure": {
    kind: "Deep Dive",
    cluster: "agents",
    keyPoints: [
      "Cloud and agent security: scoped tools, secrets, kill switch.",
      "NDPR / GDPR-minded tenancy.",
      "See /insights/ai-agent-security-risks.",
    ],
  },
  "no-code-low-code-nigeria": {
    kind: "Deep Dive",
    cluster: "agents",
    keyPoints: [
      "Visual tools expand who can ship a first agent.",
      "Production still needs evals and an owner.",
      "LOG_ON uses no-code for slices, not for the ledger.",
    ],
  },
  "cybersecurity-ai-threats-opportunities": {
    kind: "Deep Dive",
    cluster: "library",
    keyPoints: [
      "AI is used on both sides of the wire.",
      "Shadow AI and prompt injection belong in the risk register.",
      "See EU AI Act / NDPR notes in governance pieces.",
    ],
  },
  "primer-on-business-analytics": {
    kind: "Definition",
    cluster: "functions",
    keyPoints: [
      "Baseline the KPI before the pilot.",
      "CFOs buy cycle time, cost-to-serve, and hours — not dashboards.",
      "See /insights/ai-functions-roi-overview.",
    ],
  },
};
