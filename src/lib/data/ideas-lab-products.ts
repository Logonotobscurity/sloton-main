import { Rocket, Briefcase, GraduationCap, Home, Globe, Wrench, FileText, Shield, Zap, ShieldAlert, type LucideIcon } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'DEPLOYED' | 'MVP' | 'PROTOTYPE' | 'ACTIVE BUILD' | 'Q2 2026' | 'PRODUCTION';
  impact: string;
  icon: LucideIcon;
  features?: string[];
}

export const productCategories = [
  { id: 'all', name: 'All Products', count: 18 },
  { id: 'ai-automation', name: 'AI Systems & Automation', count: 3 },
  { id: 'intelligent-agents', name: 'Intelligent Agents', count: 2 },
  { id: 'education', name: 'AI-Powered Education', count: 2 },
  { id: 'web3', name: 'Web3 Platforms', count: 2 },
  { id: 'security', name: 'Security & Intelligence', count: 1 },
  { id: 'oss', name: 'OSS Infrastructure', count: 2 },
  { id: 'intelligence', name: 'Intelligence Tools', count: 1 },
  { id: 'content', name: 'Content & Research', count: 2 },
  { id: 'frameworks', name: 'Frameworks & Libraries', count: 3 },
];

export const products: Product[] = [
  // AI Systems & Automation
  {
    id: 'logon-ai-agency',
    name: 'LOG_ON AI Agency',
    category: 'ai-automation',
    description: 'Full AI workflow architecture for SMEs with 50–80% reduction in manual operations within 90 days',
    status: 'DEPLOYED',
    impact: '₦1M+ per SME client',
    icon: Briefcase,
    features: [
      '6-phase modular pipelines',
      'ASE orchestration layer',
      'SKILL.md library integration',
      'Discourse-native design',
    ],
  },
  {
    id: 'ase',
    name: 'ASE (Agentic System Engine)',
    category: 'ai-automation',
    description: 'Architecture-aware orchestration engine combining online research, 14 paradigm selection matrix, and production-grade refactoring patterns for intelligent system design',
    status: 'ACTIVE BUILD',
    impact: '10× faster second deployment',
    icon: Zap,
    features: [
      'Architecture-aware initialization with best practices research',
      '14 paradigm decision matrix (Layered, Hexagonal, CQRS/ES, Microservices, etc.)',
      'Context-driven selection: team size, domain complexity, tech stack',
      'Automated template customization per paradigm',
      'ADR generation with rationale documentation',
      'Refactoring: 1000+ line monoliths → modular architecture',
      'Custom hooks layer (Audio, Video, Chat, Utility)',
      'State encapsulation: 20+ useState → organized modules',
      'Testing pyramid: 80%+ coverage with 5-phase QA pipeline',
      'Performance optimization via targeted re-renders',
    ],
  },
  {
    id: 'b08',
    name: 'B08 Automation System',
    category: 'ai-automation',
    description: 'Advanced automation system for enterprise workflow optimization',
    status: 'ACTIVE BUILD',
    impact: 'Enterprise-grade automation',
    icon: Wrench,
  },

  // Intelligent Agents
  {
    id: 'job-scout',
    name: 'Job Scouting Agent',
    category: 'intelligent-agents',
    description: 'Automated job listing filtering that saves 5–8 hrs/week vs. manual job board scanning',
    status: 'PROTOTYPE',
    impact: 'Subscription SaaS model',
    icon: Briefcase,
    features: [
      'Automated job filtering',
      'Sampling Strategy Framework',
      'ASE integration',
      'Time-saving automation',
    ],
  },
  {
    id: 'house-hunter',
    name: 'House Hunter Agent',
    category: 'intelligent-agents',
    description: 'Property listing intelligence with scoring system that removes decision fatigue from property search',
    status: 'PROTOTYPE',
    impact: 'Subscription SaaS model',
    icon: Home,
    features: [
      'Property intelligence scoring',
      'Decision support system',
      'Sampling Strategy Framework',
      'Automated property analysis',
    ],
  },

  // AI-Powered Education
  {
    id: 'gigpilot-lms',
    name: 'GigPilot + LMS Merge',
    category: 'education',
    description: "Africa's first AI job-training platform that helps SMEs find talent and upskill teams simultaneously",
    status: 'Q2 2026',
    impact: 'Platform SaaS recurring',
    icon: GraduationCap,
    features: [
      'AI job-matching',
      'Training platform integration',
      'Discourse-native LMS',
      'URL Analyzer curriculum pipeline',
    ],
  },
  {
    id: 'ai-lms',
    name: 'AI LMS',
    category: 'education',
    description: 'Discourse-native Learning Management System with auto-curriculum generation',
    status: 'ACTIVE BUILD',
    impact: 'Platform SaaS recurring',
    icon: GraduationCap,
    features: [
      'Auto-curriculum generation',
      'URL Strategic Analyzer integration',
      'African-language interfaces',
      'Cultural alignment',
    ],
  },

  // Web3 Platforms
  {
    id: 'safechain',
    name: 'SafeChain MVP',
    category: 'web3',
    description: 'AI×Web3 knowledge attribution infrastructure for on-chain AI knowledge tracking',
    status: 'MVP',
    impact: 'Grant-fundable',
    icon: Shield,
    features: [
      'On-chain attribution',
      'AI knowledge tracking',
      'Web3 integration',
      'Novel AI×Web3 architecture',
    ],
  },
  {
    id: 'peculiar',
    name: 'Peculiar Platform',
    category: 'web3',
    description: 'Intelligence ecosystem for the $3-5T agentic commerce economy. Built on GAME framework ($8B+ volume) with all 6 core APC protocols integrated.',
    status: 'ACTIVE BUILD',
    impact: '$3-5T market opportunity',
    icon: Shield,
    features: [
      'Prediction markets & browser extension',
      'AI Agent Studio & Marketplace (GAME)',
      'Token Pitching (60-day trial)',
      'Quest Markets (verified work)',
      'Quadratic Funding distribution',
      'ACP, UCP, MCP, AP2, A2A, GAME protocols',
    ],
  },

  // Security & Intelligence
  {
    id: 'threathunter360',
    name: 'ThreatHunter360',
    category: 'security',
    description: 'Production-grade dark ops intelligence platform with real-time threat detection, APT tracking, KYC/AML verification, and dark web monitoring.',
    status: 'ACTIVE BUILD',
    impact: 'Enterprise security SaaS',
    icon: ShieldAlert,
    features: [
      'Live threat intel feed with IOC data',
      'Real-time network graph visualization',
      '5 APT groups with MITRE ATT&CK TTPs',
      '10 KYC/AML modules (Crypto KYB, Corporate KYB)',
      'Nigerian regulatory compliance (EFCC, CBN, NDPA)',
      '6-factor travel risk scoring model',
      '6 OSINT intelligence modules',
      'Dark web monitoring & breach alerts',
      'Credential exposure checking',
      'Terminal-style query interface',
    ],
  },

  // OSS Infrastructure
  {
    id: 'toolscout',
    name: 'ToolScout',
    category: 'oss',
    description: 'Open-source agent skill marketplace that fills a genuine gap in African AI tooling',
    status: 'ACTIVE BUILD',
    impact: 'Gitcoin community funding',
    icon: Wrench,
    features: [
      'SKILL.md library',
      'Community contributions',
      'Reusable across all builds',
      'Open-source marketplace',
    ],
  },
  {
    id: 'agentbase',
    name: 'AgentBase',
    category: 'oss',
    description: 'Foundation infrastructure for agent development and deployment',
    status: 'ACTIVE BUILD',
    impact: 'Gitcoin community funding',
    icon: Wrench,
    features: [
      'Agent development framework',
      'SKILL.md integration',
      'Community-driven',
      'OSS infrastructure',
    ],
  },

  // Intelligence Tools
  {
    id: 'url-analyzer',
    name: 'URL Strategic Analyzer',
    category: 'intelligence',
    description: 'Any website → full intelligence report in 20 minutes. Market research in 20 minutes vs. 3 days',
    status: 'DEPLOYED',
    impact: 'Competitive intelligence',
    icon: Globe,
    features: [
      '6-phase autonomous conversion',
      'Site-to-intelligence pipeline',
      'Repeatable output',
      'No comparable open tool',
    ],
  },

  // Content & Research
  {
    id: 'research-series',
    name: 'Building AI That Thinks in African Languages',
    category: 'content',
    description: '5-part research series (~16,000 words) with 4 novel NLP contributions and 16+ citations',
    status: 'PRODUCTION',
    impact: 'Grant evidence + authority',
    icon: FileText,
    features: [
      'Citation-grade research',
      'Benchmark paradox diagnosis',
      '4 new benchmark task types',
      'arXiv-ready preprint',
    ],
  },
  {
    id: 'newsletter',
    name: "Builder's Signal Newsletter",
    category: 'content',
    description: 'Technical newsletter documenting the building process and architectural decisions',
    status: 'PRODUCTION',
    impact: 'Grant evidence + authority',
    icon: FileText,
    features: [
      '4 issues ready to send',
      'Zero additional writing required',
      'Immediate distribution asset',
      'Technical documentation',
    ],
  },

  // Frameworks & Libraries
  {
    id: 'skill-library',
    name: 'SKILL.md Module Library',
    category: 'frameworks',
    description: 'Reusable agent skill modules with documentation - each skill reusable across all agent builds',
    status: 'PRODUCTION',
    impact: '10× faster deployment',
    icon: FileText,
    features: [
      '18+ reusable prompt templates',
      '8 strategic use cases',
      'Documented and deployable',
      'OSS-ready',
    ],
  },
  {
    id: 'prompt-patterns',
    name: '8 Prompt Patterns Library',
    category: 'frameworks',
    description: '18+ reusable prompt templates across 8 strategic use cases for AI agent development',
    status: 'PRODUCTION',
    impact: 'Transferable knowledge',
    icon: FileText,
    features: [
      'Documented patterns',
      'Deployable templates',
      'OSS-ready',
      'Strategic use cases',
    ],
  },
];

export const getProductsByCategory = (categoryId: string) => {
  if (categoryId === 'all') return products;
  return products.filter(product => product.category === categoryId);
};

export const getProductStats = () => {
  return {
    total: products.length,
    deployed: products.filter(p => p.status === 'DEPLOYED' || p.status === 'PRODUCTION').length,
    inProgress: products.filter(p => p.status === 'ACTIVE BUILD' || p.status === 'MVP' || p.status === 'PROTOTYPE').length,
    domains: [...new Set(products.map(p => p.category))].length,
  };
};
