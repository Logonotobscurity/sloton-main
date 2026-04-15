export interface AnalystReport {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  analystFirm: string;
  focus: string;
  rating: number;
  highlights: string[];
  keyMetrics: {
    label: string;
    value: string;
  }[];
  downloadUrl: string;
  color: string;
}

export const analystReports: AnalystReport[] = [
  {
    id: "afritech-market-intelligence",
    number: 1,
    title: "African AI Market Position",
    subtitle: "Innovation Leadership",
    analystFirm: "AfriTech Market Intelligence",
    focus: "African AI Market Position & Innovation Leadership",
    rating: 4.5,
    highlights: [
      "★★★★★ Innovation Leadership - Research series is citation-grade",
      "★★★★★ Market Understanding - Deep contextual grasp of African cognitive architecture",
      "★★★★☆ Delivery Capability - Multiple MVPs active",
      "★★★★★ Strategic Clarity - Unusually coherent 3-track model"
    ],
    keyMetrics: [
      { label: "African-language speakers served", value: "500M+" },
      { label: "Revenue target Q1-Q2 2026", value: "₦6M" },
      { label: "Grant funders matched", value: "5" },
      { label: "Market Differentiation", value: "5/5" }
    ],
    downloadUrl: "/reports/afritech-market-intelligence-q1-2026.html",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "workflow-automation-insights",
    number: 2,
    title: "Agentic AI & SME Automation",
    subtitle: "Workflow Automation Landscape",
    analystFirm: "Workflow Automation Insights",
    focus: "Agentic AI & SME Workflow Automation Landscape 2026",
    rating: 4.0,
    highlights: [
      "★★★★★ Technical Architecture - System-level multi-agent design",
      "★★★★★ SME Market Fit - 18-24 months ahead of market standard",
      "★★★★☆ Agentic AI Readiness - SKILL.md modular architecture",
      "★★★★☆ Pricing Accessibility - Tiered offers for SMEs"
    ],
    keyMetrics: [
      { label: "Faster second deployment", value: "10x" },
      { label: "Manual operations reduction", value: "50-80%" },
      { label: "SME market size (Nigeria)", value: "5-10M" },
      { label: "Architectural depth", value: "5/5" }
    ],
    downloadUrl: "/reports/workflow-automation-insights-q1-2026.html",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "global-ai-safety-review",
    number: 3,
    title: "Behavioral Informatics",
    subtitle: "Responsible AI Research",
    analystFirm: "Global AI Safety Review",
    focus: "Behavioral Informatics & Responsible AI Research 2026",
    rating: 5.0,
    highlights: [
      "★★★★★ Safety Research Rigor - Citation-grade benchmark paradox diagnosis",
      "★★★★★ Novelty of Contribution - First formal characterization",
      "★★★★★ Practical Applicability - 4 new benchmark task types",
      "★★★★★ Community Accountability - Community ownership framework"
    ],
    keyMetrics: [
      { label: "Research series word count", value: "16,000" },
      { label: "Novel contributions", value: "4" },
      { label: "Languages addressed", value: "64" },
      { label: "Safety Research Rigor", value: "5/5" }
    ],
    downloadUrl: "/reports/global-ai-safety-review-q1-2026.html",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "digital-enterprise-index",
    number: 4,
    title: "Multi-Product Ecosystem",
    subtitle: "Delivery Excellence",
    analystFirm: "Digital Enterprise Index",
    focus: "Multi-Product Ecosystem & Delivery Excellence 2026",
    rating: 4.0,
    highlights: [
      "★★★★★ Portfolio Coherence - Connected ecosystem, not separate projects",
      "★★★★★ Delivery Infrastructure - Research, frameworks, tools all connected",
      "★★★★☆ Financial Architecture - Multiple revenue streams identified",
      "★★★★☆ Market Execution Readiness - Infrastructure built, delivery sprint now"
    ],
    keyMetrics: [
      { label: "Active builds", value: "16" },
      { label: "Domains covered", value: "7" },
      { label: "Completed deliverables", value: "8+" },
      { label: "Portfolio Coherence", value: "5/5" }
    ],
    downloadUrl: "/reports/digital-enterprise-index-q1-2026.html",
    color: "from-orange-500 to-red-500"
  },
  {
    id: "peculiar-agentic-commerce",
    number: 5,
    title: "Agentic Protocol Commerce",
    subtitle: "Intelligence Infrastructure",
    analystFirm: "Web3 Commerce Intelligence",
    focus: "Agentic Protocol Commerce & Intelligence Infrastructure 2026",
    rating: 5.0,
    highlights: [
      "★★★★★ Protocol Integration Depth - All 6 core APC protocols integrated",
      "★★★★★ Architectural Coherence - Five-pillar compounding ecosystem",
      "★★★★★ Market Timing - $3-5T agentic commerce inflection point",
      "★★★★★ Technical Foundation - GAME framework with $8B+ proven volume"
    ],
    keyMetrics: [
      { label: "Global market projection", value: "$3-5T" },
      { label: "Core protocols integrated", value: "6" },
      { label: "Platform pillars", value: "5" },
      { label: "GAME ecosystem volume", value: "$8B+" }
    ],
    downloadUrl: "/reports/peculiar-agentic-commerce-q1-2026.html",
    color: "from-violet-500 to-purple-500"
  }
];

export const overallRating = {
  composite: 4.6,
  dimensions: [
    { name: "Innovation Leadership", score: 5.0 },
    { name: "Market Understanding", score: 4.8 },
    { name: "Research Credibility", score: 5.0 },
    { name: "Technical Architecture", score: 5.0 },
    { name: "Delivery & Execution", score: 3.5 },
    { name: "Customer Results", score: 3.67 },
    { name: "Strategic Clarity", score: 5.0 }
  ]
};
