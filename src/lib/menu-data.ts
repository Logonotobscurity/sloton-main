import type { LucideIcon } from 'lucide-react';

export type SitemapItem = {
  title: string;
  href: string;
  description: string;
  shortDescription?: string;
  icon?: string;
};

type Cta = {
  label: string;
  href: string;
};

type SitemapSectionBase = {
  key: string;
  heading: string;
  intro?: string;
  visual?: string;
  visualAlt?: string;
};

export type SectionWithItems = SitemapSectionBase & {
  items: SitemapItem[];
  cta?: Cta;
};

export type SectionWithCta = SitemapSectionBase & {
  cta: Cta;
  items?: SitemapItem[];
};

export type SectionLinkOnly = {
  key: string;
  heading: string;
  href: string;
};

export type SitemapSection = SectionWithItems | SectionWithCta | SectionLinkOnly;

export type MenuKey = 'solutions' | 'resources' | 'partners' | 'company' | 'contact';

export const menuData: SitemapSection[] = [
  {
    key: 'solutions',
    heading: 'Solutions',
    intro: 'Custom AI agents, automation, and software built for African operators.',
    visual: '/images/marks/hero-ai.svg',
    visualAlt: 'Abstract circuit illustration for LOG_ON solutions',
    cta: { label: 'Explore all solutions', href: '/solutions' },
    items: [
      {
        title: 'AI Solutions',
        href: '/ai-solutions',
        icon: 'BrainCircuit',
        description: 'Agents, RAG, and models tailored to your data.',
        shortDescription: 'Custom AI agents and models.',
      },
      {
        title: 'Process Automation',
        href: '/automation',
        icon: 'Workflow',
        description: 'RPA and workflows that cut repetitive work.',
        shortDescription: 'RPA and workflow design.',
      },
      {
        title: 'Web & Custom Development',
        href: '/web-development',
        icon: 'Code2',
        description: 'Sites and products on modern cloud stacks.',
        shortDescription: 'Web and custom software.',
      },
      {
        title: 'AI Chatbots',
        href: '/chatbots',
        icon: 'Bot',
        description: 'WhatsApp and web assistants that convert.',
        shortDescription: '24/7 virtual assistants.',
      },
      {
        title: 'Business Analytics',
        href: '/business-analytics',
        icon: 'LineChart',
        description: 'Dashboards that turn operations into decisions.',
        shortDescription: 'BI dashboards and reporting.',
      },
      {
        title: 'Database Solutions',
        href: '/database-solutions',
        icon: 'Database',
        description: 'Secure, scalable data architecture.',
        shortDescription: 'Data architecture and ops.',
      },
    ],
  },
  {
    key: 'resources',
    heading: 'Resources',
    intro: 'Guides, templates, and programmes to move from idea to delivery.',
    visual: '/images/marks/hero-insights.svg',
    visualAlt: 'Abstract editorial illustration for LOG_ON resources',
    cta: { label: 'Browse the library', href: '/resources' },
    items: [
      {
        title: 'All Resources',
        href: '/resources',
        icon: 'Library',
        description: 'The full library of tools and writing.',
        shortDescription: 'Complete resource library.',
      },
      {
        title: 'Insights',
        href: '/insights',
        icon: 'Newspaper',
        description: 'GEO, agents, and workplace AI analysis.',
        shortDescription: 'Expert analysis and articles.',
      },
      {
        title: 'Use Cases',
        href: '/use-cases',
        icon: 'Building2',
        description: 'How we apply AI by industry.',
        shortDescription: 'Industry applications.',
      },
      {
        title: 'Automation Library',
        href: '/automation',
        icon: 'LayoutTemplate',
        description: 'Ready workflow patterns you can adapt.',
        shortDescription: 'Workflow templates.',
      },
      {
        title: 'Training Programs',
        href: '/training',
        icon: 'GraduationCap',
        description: 'Hands-on AI and automation curriculum.',
        shortDescription: 'Professional training.',
      },
      {
        title: 'Visibility audit',
        href: '/audit',
        icon: 'Compass',
        description: 'Free community give-back: structure your business for Google and AI.',
        shortDescription: 'Free business profile.',
      },
    ],
  },
  {
    key: 'partners',
    heading: 'Partners',
    href: '/partners',
  },
  {
    key: 'company',
    heading: 'Company',
    intro: 'Lagos-based. Built to connect advantages across Africa.',
    visual: '/images/marks/hero-company.svg',
    visualAlt: 'Abstract Lagos skyline illustration for LOG_ON',
    cta: { label: 'About LOG_ON', href: '/about' },
    items: [
      {
        title: 'About Us',
        href: '/about',
        icon: 'Compass',
        description: 'Mission, values, and how we work.',
        shortDescription: 'Mission and values.',
      },
      {
        title: 'Analyst Reports',
        href: '/about/reports',
        icon: 'FileBarChart',
        description: 'Industry notes and downloadable reports.',
        shortDescription: 'Analyst reports.',
      },
      {
        title: 'Newsroom',
        href: '/about/newsroom',
        icon: 'Newspaper',
        description: 'Announcements and company updates.',
        shortDescription: 'Press and updates.',
      },
      {
        title: 'Our Leadership',
        href: '/about/our-leadership',
        icon: 'Users',
        description: 'The people shipping the work.',
        shortDescription: 'Leadership team.',
      },
      {
        title: 'Careers',
        href: '/about/careers',
        icon: 'Briefcase',
        description: 'Join the practice.',
        shortDescription: 'Open roles.',
      },
      {
        title: 'Partners',
        href: '/partners',
        icon: 'Handshake',
        description: 'Collaborate on delivery.',
        shortDescription: 'Partner with us.',
      },
      {
        title: 'Contact',
        href: '/contact',
        icon: 'Mail',
        description: 'Start a scoped conversation.',
        shortDescription: 'Get in touch.',
      },
    ],
  },
];

export type { LucideIcon };
