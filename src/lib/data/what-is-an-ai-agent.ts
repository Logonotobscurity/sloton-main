import type { StructuredInsight } from "@/components/articles/insight-article-layout";

export const whatIsAnAiAgent: StructuredInsight = {
  clusterLabel: "AI Agents",
  clusterHref: "/insights/ai-agents",
  kind: "Definition",
  title: "What Is an AI Agent? Definition, Architecture & Examples",
  shortTitle: "AI Agent",
  pronunciation: "/ˌeɪ.aɪ ˈeɪ.dʒənt/",
  definition:
    "A software system that uses an LLM as its reasoning engine to perceive, plan, act with tools, and observe — looping until a goal is achieved.",
  alsoKnownAs: ["LLM agent", "Autonomous agent", "Agentic AI", "Intelligent agent", "AI assistant (informal)"],
  category: "Artificial Intelligence",
  coined:
    "The “intelligent agent” framing dates to mid-1990s AI research (Russell & Norvig 1995). The modern LLM-powered “AI agent” usage rose with OpenAI Function Calling (June 2023) and the AutoGPT / BabyAGI demos of early 2023.",
  coinedBy:
    "Stuart Russell and Peter Norvig (intelligent agent framing); modern usage popularised by OpenAI, LangChain, and the open-source community.",
  published: "2026-04-15",
  updated: "2026-05-15",
  readingTime: "7 min read",
  tldr:
    "An AI agent is an LLM-powered software system that perceives inputs, plans actions, calls tools (APIs, code, retrieval), and acts on results — looping until a goal is reached. Unlike a chatbot that answers single turns, an agent makes autonomous decisions across multi-step workflows.",
  contexts: [
    {
      label: "Customer support automation",
      quote:
        "An AI agent reads an incoming support ticket, queries the order system, checks shipping status via the carrier API, drafts a response, and either sends it or escalates to a human reviewer.",
    },
    {
      label: "Research and report generation",
      quote:
        "Given a research question, an AI agent searches multiple sources, summarizes findings, generates a structured report, and cites sources — all in a single autonomous run.",
    },
    {
      label: "Software engineering",
      quote:
        "An AI coding agent (Cursor, Claude Code, Devin) reads a bug report, navigates the codebase, makes edits, runs the test suite, and iterates until tests pass.",
    },
    {
      label: "Sales prospecting",
      quote:
        "An agent enriches a lead from public sources, scores fit against ICP criteria, drafts a personalized outreach message, and adds the lead to the CRM with a recommended next action.",
    },
  ],
  relatedTerms: [
    { label: "Multi-agent system", href: "/insights/multi-agent-systems-explained" },
    { label: "Agentic AI", href: "/insights/what-is-agentic-ai" },
    { label: "Tool use / Function calling", href: "/insights/what-is-tool-use-ai" },
    { label: "ReAct", href: "/insights/what-is-react-agent" },
    { label: "RAG", href: "/insights/gdpr-compliant-rag-implementation-partners-2026" },
  ],
  keyPoints: [
    "An AI agent is defined by its loop: perceive → reason → act with tools → observe → repeat. A single-turn chatbot is not an agent.",
    "All modern AI agents share four components: an LLM brain, tools (functions/APIs), memory (short and long term), and a control loop (the orchestrator).",
    "The modern “AI agent” usage emerged with OpenAI Function Calling (June 2023) and AutoGPT earlier that year — though “intelligent agent” as research dates to the mid-1990s (Russell & Norvig).",
    "Agentic AI is the broader paradigm; AI agents are the concrete software artifacts that implement it.",
    "Anthropic’s December 2024 “Building effective agents” guide distinguishes workflows (predefined steps) from agents (dynamic, model-driven decisions). Many production systems should stay workflows.",
  ],
  sections: [
    {
      id: "agent-architecture",
      title: "The four components of every AI agent",
      inShort:
        "Every modern AI agent has four parts: (1) an LLM as the reasoning engine, (2) tools the agent can invoke, (3) memory (short-term context and optional long-term store), and (4) a control loop that decides when to act, when to call a tool, and when to stop. LangGraph, CrewAI, and AutoGen all express variations of this architecture.",
      paragraphs: [
        "LOG_ON ships this stack for Lagos and African operators: WhatsApp and CRM tools first, ledger writes last, a human gate on money and PII.",
      ],
      bullets: [
        "LLM brain. GPT-4-class, Claude, or Gemini. Parses the task, decides the next step, writes the final response.",
        "Tools. Search, APIs, SQL, code, email, files — via function-calling schemas. Never unbounded production writes on day one.",
        "Memory. Short-term in the context window. Long-term in a store you can audit. The system of record stays the CRM or warehouse.",
        "Control loop. Perceive → reason → act → observe. LangGraph makes it a graph; CrewAI makes it roles; AutoGen makes it conversation.",
      ],
    },
    {
      id: "agent-vs-chatbot",
      title: "AI agent vs chatbot vs workflow",
      inShort:
        "A chatbot answers single turns. A workflow executes predefined steps. An AI agent decides which steps to take. Anthropic recommends workflows when the path is predictable, and agents only when dynamic decision-making is required.",
      paragraphs: [
        "The clean distinction: chatbot output is text; workflow order is fixed by the developer; agent order is model-driven. Agents add power, cost, latency, and unpredictability.",
        "Workflow first, agent only when needed. That is LOG_ON’s default in every assessment.",
      ],
      bullets: [
        "Chatbot — dialogue, no autonomous action.",
        "Workflow — known SOP, LLM fills steps.",
        "Agent — the model chooses the next tool or stop.",
      ],
    },
    {
      id: "agent-types",
      title: "Common types of AI agents",
      inShort:
        "In 2026 the common types are tool-use agents, ReAct agents, planner-executor, multi-agent systems, and human-in-the-loop agents.",
      paragraphs: [
        "Most LOG_ON productions are tool-use or HITL. Multi-agent only when one tool list is already unsafe.",
      ],
      bullets: [
        "Tool-use agent — one LLM, a list of tools, a loop. Dominant pattern.",
        "ReAct — Thought / Action / Observation (Yao et al. 2022).",
        "Planner-executor — decompose then run. Long-horizon tasks.",
        "Multi-agent — researcher, writer, reviewer. CrewAI / AutoGen.",
        "HITL — pause before high-risk actions. Required for many EU AI Act and NDPR-sensitive flows.",
      ],
    },
    {
      id: "when-to-use",
      title: "When to use an AI agent (and when not to)",
      inShort:
        "Use an agent when the path is unpredictable, needs many tools, or iterative refinement. Skip it for a fixed sequence (workflow), a single turn (chatbot), or low tolerance for non-determinism (code).",
      paragraphs: [
        "LLMs are weak at exact math, lookups, and strict business rules — keep those in deterministic code. LOG_ON will not sign a scope that replaces a ledger posting rule with a prompt.",
      ],
    },
  ],
  faqs: [
    {
      q: "What is an AI agent in simple terms?",
      a: "Software that uses a large language model as its brain to decide and act — calling APIs, searching data, writing code, or sending messages — until a goal is achieved. Unlike a chatbot, it works multi-step problems autonomously.",
    },
    {
      q: "What is the difference between AI and an AI agent?",
      a: "AI is the field. An agent is a system that acts over multiple steps with tools. An image classifier is AI but not an agent. Single-turn ChatGPT is AI but not an agent. ChatGPT inside a loop that calls APIs is an agent.",
    },
    {
      q: "What is the difference between an AI agent and a chatbot?",
      a: "A chatbot answers turns. An agent decides the next action in the world — API, database, message, code — and loops until the task is done.",
    },
    {
      q: "Are ChatGPT and Claude AI agents?",
      a: "Consumer chat products are mostly chatbots with occasional built-in tools. Custom GPTs, the Assistants/Responses APIs, Claude tool use and Computer Use let you build agents. The model is the engine; the agent is the system around it.",
    },
    {
      q: "What is agentic AI?",
      a: "The paradigm of systems that act toward goals with tools and feedback. Agents are the artifacts. Terms are often mixed; “agentic” is the strategy word, “agent” is the software.",
    },
    {
      q: "How is an AI agent built?",
      a: "Pick a framework (LangGraph, CrewAI, AutoGen/AG2, Semantic Kernel, LlamaIndex, Pydantic AI), an LLM API, typed tools, a system prompt, and an orchestrator. LOG_ON’s builder path is /insights/how-to-build-ai-agent.",
    },
    {
      q: "Are AI agents safe to use in production?",
      a: "Yes, with scoped tools, guardrails, HITL on high-risk actions, observability, and evals. High-risk EU AI Act / NDPR cases need extra governance. No go-live without a kill switch.",
    },
  ],
  sources: [
    { title: "Russell & Norvig — Artificial Intelligence: A Modern Approach (4th ed.)", href: "https://aima.cs.berkeley.edu/", note: "(accessed 2026-04-15)" },
    { title: "Anthropic — Building effective agents (Dec 2024)", href: "https://www.anthropic.com/research/building-effective-agents", note: "(accessed 2026-04-15)" },
    { title: "OpenAI — Function calling", href: "https://platform.openai.com/docs/guides/function-calling", note: "(accessed 2026-04-15)" },
    { title: "Yao et al. — ReAct (arXiv:2210.03629, 2022)", href: "https://arxiv.org/abs/2210.03629", note: "(accessed 2026-04-15)" },
    { title: "LangGraph documentation", href: "https://langchain-ai.github.io/langgraph/", note: "(accessed 2026-04-15)" },
  ],
  next: {
    title: "Best AI Agent Frameworks 2026: 6 Compared (Open-Source)",
    href: "/insights/best-ai-agent-frameworks-2026",
  },
};
