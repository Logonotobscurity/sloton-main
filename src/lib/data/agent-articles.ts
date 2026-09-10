import imageData from "@/lib/placeholder-images.json";

export type AgentBlock = { heading?: string; paragraphs: string[] };

export type AgentArticle = {
  slug: string;
  title: string;
  description: string;
  kind: string;
  section: string;
  date: string;
  author: string;
  tags: string[];
  body: AgentBlock[];
};

const A = "Oluwamayowa Logo";
const F = "Favour Alfred";

function art(
  slug: string,
  title: string,
  description: string,
  kind: string,
  section: string,
  date: string,
  author: string,
  extra: string[]
): AgentArticle {
  return {
    slug,
    title,
    description,
    kind,
    section,
    date,
    author,
    tags: ["AI Agents", "Agents", kind],
    body: [
      {
        paragraphs: [
          description,
          extra[0] ??
            "Written for Nigerian, African, and global operators. LOG_ON ships scoped agents — not a packaged SaaS seat.",
          extra[1] ??
            "Reviewed on a 90-day cycle. Book an assessment if you want this architecture on your stack.",
        ],
      },
    ],
  };
}

export const agentArticles: AgentArticle[] = [
  art("what-is-an-ai-agent", "What Is an AI Agent? Definition, Architecture & Examples", "An AI agent is an LLM-powered system that perceives, reasons, and acts with tools to reach a goal — unlike a chatbot that only talks.", "Definition", "01 — Definitions", "2026-04-10", A, ["Architecture: model + tools + memory + policy. Examples: WhatsApp order bot, recon agent, support RAG."]),
  art("what-is-agentic-ai", "What Is Agentic AI? How It Differs from Generative AI", "Agentic AI plans and acts; generative AI mainly produces text or media. 2026 enterprises run both, with different controls.", "Definition", "01 — Definitions", "2026-04-12", F, ["Generative = content. Agentic = tool calls, loops, and side effects. Governance is stricter for agents."]),
  art("what-is-tool-use-ai", "What Is Tool Use in AI? How Agents Call APIs & Execute Actions", "Tool use (function calling) lets an agent invoke APIs, SQL, or browsers instead of hallucinating an answer.", "Definition", "01 — Definitions", "2026-05-01", A, ["Schema the tool, constrain arguments, log every call. Never give an agent production write access on day one."]),
  art("what-is-react-agent", "What Is a ReAct Agent? The Reasoning-Action Loop Explained", "ReAct interleaves Thought, Action, and Observation so the model can correct itself mid-task.", "Definition", "01 — Definitions", "2026-05-03", F, ["Use ReAct when the path is unknown. Use a fixed graph when the process is already a SOP."]),
  art("ai-agent-architecture-patterns", "AI Agent Architecture: ReAct, Tool Use & Memory Patterns", "Three patterns we actually ship: ReAct loops, typed tool use, and split short/long memory.", "Deep Dive", "02 — Architecture", "2026-05-05", A, ["Pick the thinnest pattern that completes the SOP. Multi-agent is not the default."]),
  art("ai-agent-tool-use-patterns", "AI Agent Tool Use: Patterns, Best Practices & Common Pitfalls", "Idempotent tools, timeouts, and human gates beat clever prompts when the agent hits a payment or ledger API.", "Deep Dive", "02 — Architecture", "2026-05-06", F, ["Pitfalls: unbounded retries, silent tool failure, and tools that return novels instead of structured JSON."]),
  art("ai-agent-memory-systems", "AI Agent Memory Systems: Short-Term, Long-Term & External Memory", "Short-term is the thread. Long-term is a store you can audit. External is the CRM or warehouse — the system of record stays there.", "Deep Dive", "02 — Architecture", "2026-05-07", A, ["Do not dump PII into a vector store because it was easy."]),
  art("multi-agent-systems-explained", "Multi-Agent Systems: How AI Agents Work Together at Enterprise Scale", "Specialists plus an orchestrator. Useful when sales, finance, and support must not share one god-prompt.", "Deep Dive", "02 — Architecture", "2026-05-08", F, ["Add agents only when a single agent’s tool list is already unsafe or unreadable."]),
  art("react-agent-pattern", "ReAct Agent Pattern: How Reasoning + Acting Powers Modern AI Agents", "Step-through of Thought → Action → Observation with a Lagos ops example (invoice status).", "How-To", "02 — Architecture", "2026-05-09", A, ["Cap the loop. Log each thought if counsel needs the trail."]),
  art("ai-agent-orchestration", "AI Agent Orchestration: How to Coordinate Complex Multi-Agent Pipelines", "Graphs, queues, and human-in-the-loop gates for 2026 pipelines.", "Deep Dive", "02 — Architecture", "2026-05-10", F, ["Orchestration is ops: retries, dead letters, and who gets paged."]),
  art("best-ai-agent-frameworks-2026", "Best AI Agent Frameworks 2026: 6 Compared (Open-Source)", "LangGraph, CrewAI, AutoGen/AG2, Semantic Kernel, LlamaIndex, Pydantic AI — scored on architecture, DX, and production readiness for African teams.", "Ranked List", "03 — Platforms", "2026-04-14", A, ["We pick per job, not a religion. LangGraph for state. Pydantic AI for typed Python. CrewAI for role crews."]),
  art("open-source-ai-agent-frameworks-comparison-2026", "Open Source AI Agent Frameworks Comparison 2026", "Head-to-head including a LOG_ON production score from live deliveries — not a lab bake-off.", "Comparison", "03 — Platforms", "2026-04-16", F, ["Score: typed I/O, observability, HITL, MCP, and whether a mid-market team can run it after we leave."]),
  art("langgraph-guide-2026", "LangGraph Tutorial 2026: Build Stateful AI Agents for Enterprise", "Six steps: state, nodes, edges, memory, HITL, deploy. When LangGraph beats a linear LangChain chain.", "How-To", "03 — Platforms", "2026-05-11", A, ["Use it when the SOP has branches and you need replayable state."]),
  art("crewai-guide-2026", "CrewAI Guide 2026: Multi-Agent Workflows for Enterprise Teams", "Crews, flows, and when role-playing agents help versus when they just burn tokens.", "How-To", "03 — Platforms", "2026-05-12", F, ["Good for research crews. Weak if you need hard transactional guarantees."]),
  art("autogen-guide-enterprise", "Microsoft AutoGen Guide 2026: Enterprise Multi-Agent AI", "AutoGen / AG2 / Magentic-One in an Azure-friendly shop. Migration notes toward Microsoft Agent Framework.", "How-To", "03 — Platforms", "2026-05-13", A, ["If you are already on M365 and AKS, this path is political as much as technical."]),
  art("pydantic-ai-guide", "Pydantic AI Guide: Type-Safe AI Agents for Production", "Structured outputs and tools in Python you can test. Our default for finance-adjacent agents.", "How-To", "03 — Platforms", "2026-05-14", F, ["Types are a control, not a style choice."]),
  art("langgraph-vs-crewai-vs-autogen", "LangGraph vs CrewAI vs AutoGen: Which Agent Framework to Choose?", "Ten dimensions: state, DX, cloud lock-in, cost, HITL, MCP, community, .NET, testing, ops.", "Comparison", "03 — Platforms", "2026-05-15", A, ["Default LOG_ON advice: LangGraph or Pydantic AI unless the client is already Crew- or Azure-native."]),
  art("ai-agents-for-sales", "AI Agents for Sales: Automate Prospecting, Outreach & Pipeline Management", "Prospecting and CRM hygiene agents for African B2B teams who live in WhatsApp and HubSpot-class tools.", "Deep Dive", "04 — Use cases", "2026-05-16", F, ["Never auto-send outreach without a human approve step on first deploy."]),
  art("ai-agents-for-customer-service", "AI Customer Service Agents: The 2026 Enterprise Playbook", "Voice, chat, WhatsApp. Architectures, deflection, and when to escalate. Ties to LOG_ON support deliveries.", "Deep Dive", "04 — Use cases", "2026-05-17", A, ["Measure deflection and CSAT, not ‘tickets closed by AI’ vanity."]),
  art("ai-agents-for-research", "AI Research Agents: How to Automate Market Research & Competitive Intel", "Hours, not weeks — with source lists counsel can check.", "Deep Dive", "04 — Use cases", "2026-05-18", F, ["Force citations. Ban unsourced market-size invention."]),
  art("ai-agents-for-data-analysis", "AI Agents for Data Analysis: From Raw Data to Insights Automatically", "Agentic BI on warehouses you already pay for. Cost and eval in 2026.", "Deep Dive", "04 — Use cases", "2026-05-19", A, ["Read-only SQL first. Writes never."]),
  art("ai-agents-for-hr", "AI Agents for HR: Recruiting, Onboarding & Performance Automation", "Screening assist and onboarding checklists. Bias and NDPR/GDPR notes. Do not claim a universal 40% time-to-hire cut.", "Deep Dive", "04 — Use cases", "2026-05-20", F, ["A human still decides who gets the offer."]),
  art("ai-agents-for-finance", "AI Finance Agents: Automate FP&A, Reconciliation & Reporting", "Recon and pack drafts. Close-cycle gains only when the SOP is already written.", "Deep Dive", "04 — Use cases", "2026-05-21", A, ["Dual control on any posting tool."]),
  art("ai-agent-security-risks", "AI Agent Security Risks: Prompt Injection, Privilege Escalation & More", "Injection, over-scoped tools, supply chain. The control set we put in every SOW.", "Deep Dive", "04 — Use cases", "2026-05-22", F, ["Treat every tool as an API with IAM, not a toy."]),
  art("ai-agents-for-legal", "AI Legal Agents: Contract Review, Research & Compliance Automation", "Review assist, not unsupervised advice. Time savings only with a lawyer in the loop.", "Deep Dive", "04 — Use cases", "2026-05-23", A, ["YMYL: no anonymous legal tips on this site either."]),
  art("how-to-build-ai-agent", "How to Build an AI Agent: Enterprise Guide from Design to Deployment", "Seven steps: scope, tools, eval, HITL, observe, deploy, train the operators. Complements our existing builder tutorial.", "How-To", "04 — Use cases", "2026-05-24", F, ["If you need the hands-on Nigerian builder path, also read /insights/how-to-build-ai-agent-guide."]),
  art("ai-agents-enterprise-roi", "Enterprise AI Agent ROI: What Returns Are Businesses Seeing in 2026?", "Use LOG_ON records (support −30% tickets, finance hours back) plus public analyst caution: most programmes miss the target without an owner and a metric.", "Data & Research", "04 — Use cases", "2026-05-25", A, ["We do not invent McKinsey numbers. We cite our deliveries and say when a figure is industry research."]),
  art("claude-agent-sdk-guide-2026", "Claude Agent SDK Guide 2026: Production Anthropic Agents", "Loop, tools, subagents, MCP, permissions. When we pick Anthropic’s SDK over a graph framework.", "Deep Dive", "05 — Framework guides", "2026-08-04", A, ["Strong for coding and research agents. Watch token cost on long loops."]),
  art("microsoft-agent-framework-guide-2026", "Microsoft Agent Framework Guide 2026 (MAF) | LOG_ON", "MAF as the Semantic Kernel + AutoGen convergence path. .NET/Python, MCP, A2A. For Azure-heavy African enterprises.", "Deep Dive", "05 — Framework guides", "2026-08-05", F, ["Treat GA dates as vendor claims; pin the version you deploy."]),
  art("openai-agents-sdk-guide-2026", "OpenAI Agents SDK Guide 2026: Production Best Practices", "Handoffs, tracing, sandbox vs harness. Multi-model routing notes.", "Deep Dive", "05 — Framework guides", "2026-08-06", A, ["Good DX. Price the traces before you turn them all on."]),
  art("google-adk-guide-2026", "Google ADK Guide 2026: Agent Development Kit Explained", "ADK, Gemini grounding, Vertex Agent Engine. Fits teams already on GCP.", "Deep Dive", "05 — Framework guides", "2026-08-07", F, ["Grounding helps Nigerian factual tasks; still eval every tool path."]),
  art("llamaindex-workflows-guide-2026", "LlamaIndex Workflows Guide 2026: Event-Driven Agents", "Event-driven agents, RAG, HITL, llama-deploy. Our RAG-heavy default alongside Pydantic AI.", "Deep Dive", "05 — Framework guides", "2026-08-08", A, ["Use when documents are the product, not just a side tool."]),
  art("model-context-protocol-guide-2026", "Model Context Protocol (MCP) Guide 2026: Complete Reference", "MCP as the USB-C of tools: servers, auth, and what we allow in production.", "Deep Dive", "06 — Protocols", "2026-08-09", F, ["Do not install 17,000 community servers. Allow-list yours."]),
  art("a2a-protocol-guide-2026", "A2A Protocol Guide 2026: Cross-Cloud Agent Communication", "Agent Cards, JSON-RPC/gRPC, when A2A matters versus a simple queue.", "Deep Dive", "06 — Protocols", "2026-08-10", A, ["Most mid-market jobs do not need A2A on day one."]),
  art("mcp-vs-a2a-comparison-2026", "MCP vs A2A Protocol 2026: When to Use Each", "MCP = tools. A2A = agent-to-agent. LOG_ON reference: MCP first, A2A only for multi-cloud programmes.", "Comparison", "06 — Protocols", "2026-08-11", F, []),
  art("langgraph-vs-claude-agent-sdk-2026", "LangGraph vs Claude Agent SDK 2026: Which to Choose?", "Graph control versus Anthropic-native loop. Decision: regulated SOP → LangGraph; coding/research → Claude SDK.", "Comparison", "07 — Comparisons", "2026-08-12", A, []),
  art("crewai-vs-microsoft-agent-framework-2026", "CrewAI vs Microsoft Agent Framework 2026: Which to Choose?", "Role crews vs Azure-native MAF. Choose MAF if the CIO already signed Microsoft.", "Comparison", "07 — Comparisons", "2026-08-13", F, []),
  art("langgraph-vs-crewai-2026", "LangGraph vs CrewAI 2026: Head-to-Head Comparison", "State, HITL, MCP, cost. LOG_ON matrix from deliveries, not a tweet thread.", "Comparison", "07 — Comparisons", "2026-08-14", A, []),
  art("langgraph-vs-autogen-2026", "LangGraph vs AutoGen 2026: AG2 Migration | LOG_ON", "When to stay on a graph, when to follow Microsoft’s consolidation.", "Comparison", "07 — Comparisons", "2026-08-15", F, []),
  art("crewai-vs-autogen-2026", "CrewAI vs AutoGen 2026: Which Multi-Agent Framework Wins?", "Honest 2026 comparison including deprecation risk. Wins = operable in Lagos after handover.", "Comparison", "07 — Comparisons", "2026-08-16", A, []),
  art("microsoft-agent-framework-vs-langgraph-2026", "Microsoft Agent Framework vs LangGraph 2026: Head-to-Head", "Azure Foundry vs LangGraph Platform. .NET vs Python. Cost and lock-in.", "Comparison", "07 — Comparisons", "2026-08-17", F, []),
  art("openai-agents-sdk-vs-crewai-2026", "OpenAI Agents SDK vs CrewAI 2026: Cost + Decision Guide", "Tracing, sandbox, multi-model, token cost. Eight-point selector we use in assessments.", "Comparison", "07 — Comparisons", "2026-08-18", A, []),
  art("open-source-vs-proprietary-ai-agent-frameworks-2026", "Open Source vs Proprietary AI Agent Frameworks in 2026", "License is not the axis. Lock-in, TCO, MCP, and who pages at 2 a.m.", "Comparison", "07 — Comparisons", "2026-08-19", F, []),
  art("production-ai-agents-deployment-guide-2026", "Production AI Agents Deployment Guide 2026: Best Practices", "Infra, state, OpenTelemetry, cost caps, guardrails, HITL, MCP security, EU-style risk notes for exporters.", "Deep Dive", "08 — Production", "2026-08-20", A, ["No go-live without an on-call human and a kill switch."]),
  art("ai-agent-observability-guide-2026", "AI Agent Observability Guide 2026 | LOG_ON", "LangSmith, Langfuse, Phoenix, Braintrust — what we actually wire for traces, eval, cost, latency.", "Deep Dive", "08 — Production", "2026-08-21", F, ["One tracer in year one. Not four."]),
  art("best-ai-coding-agents-2026", "Best AI Coding Agents 2026: 7 Tools Developers Actually Use", "Claude Code, Cursor, Copilot, Aider, OpenCode, Cline, Devin — pros, cons, when LOG_ON uses which.", "Ranked List", "09 — Agent products", "2026-04-18", A, ["We do not pretend one IDE agent replaces a senior engineer."]),
  art("ai-agent-development-companies-2026", "AI Agent Development Companies 2026: 13 Compared", "Buyer-fit comparison including LOG_ON for African scoped builds, plus global productised agent vendors. Not a Sweden listicle.", "Ranked List", "10 — Development firms", "2026-06-15", F, ["Score: production refs, industry, who stays after go-live, NDPR/GDPR literacy."]),
  art("gdpr-compliant-rag-implementation-partners-2026", "NDPR & GDPR-Aware RAG Implementation Partners 2026", "Partners who can keep African and EU-facing data in a defensible tenancy. LOG_ON plus global RAG specialists — no invented EU boutique list.", "Ranked List", "11 — RAG", "2026-08-22", A, ["Residency, subprocessors, and eval sets beat a GDPR logo on the homepage."]),
  art("best-ai-agencies-nigeria-africa-2026", "Best AI Agencies in Nigeria & Africa 2026: 13 Compared | LOG_ON", "Thirteen implementation partners scored for African operators: LOG_ON, regional houses, and global SI benches. Prices are ranges, EU AI Act notes for exporters, references you can actually call.", "Ranked List", "12 — Listicles", "2026-08-23", F, ["This is the cluster editor’s pick. Sweden lists do not help a Lagos CIO."]),
  art("best-ai-agents-for-enterprise-2026", "Best AI Agents for Enterprise 2026 | LOG_ON", "Twelve stacks African enterprises actually evaluate: LangGraph, Claude Agent SDK, Copilot Studio, Agentforce, CrewAI, WhatsApp-native builds, and more — with a risk note.", "Ranked List", "12 — Listicles", "2026-08-24", A, []),
  art("what-is-an-ai-agent-complete-guide-2026", "What Is an AI Agent? Complete Guide 2026 | LOG_ON", "Definition, examples, architecture, EU-style risk, and African adoption in 2026. Operator guide from LOG_ON deliveries.", "Deep Dive", "13 — Informational", "2026-08-25", F, ["Start here if you need one page for the board. Then read production and security."]),
];

export const agentSections = [
  "01 — Definitions",
  "02 — Architecture",
  "03 — Platforms",
  "04 — Use cases",
  "05 — Framework guides",
  "06 — Protocols",
  "07 — Comparisons",
  "08 — Production",
  "09 — Agent products",
  "10 — Development firms",
  "11 — RAG",
  "12 — Listicles",
  "13 — Informational",
];

const img = imageData.glowingAiBrain;

export function agentToInsights() {
  return agentArticles.map((a) => ({
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
    codeVisualType: "agent-code" as const,
  }));
}
