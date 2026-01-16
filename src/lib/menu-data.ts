// -- types --
export type SitemapItem = {
  title: string;
  href: string;
  description: string;
  shortDescription?: string;
};

type Cta = {
  label: string;
  href: string;
};

// Base shape for most sections
type SitemapSectionBase = {
  key: string;
  heading: string;
  intro?: string;
};

// Variants (union)
export type SectionWithItems = SitemapSectionBase & {
  items: SitemapItem[];
  cta?: Cta;
};

export type SectionWithCta = SitemapSectionBase & {
  cta: Cta;
  items?: SitemapItem[]; // optional if some CTA sections also have items
};

// A simple link-only section example
export type SectionLinkOnly = {
  key: string;
  heading: string;
  href: string;
};

// Union of all possible section shapes.
export type SitemapSection = SectionWithItems | SectionWithCta | SectionLinkOnly;

export type MenuKey = 'solutions' | 'resources' | 'partners' | 'company' | 'contact';

// -- data (example) --
export const menuData: SitemapSection[] = [
  {
     "key": "solutions",
     "heading": "Solutions",
     "intro": "Unite people, processes, and systems with AI-powered products for all your workflows.",
     "cta": {"label": "See All Solutions", "href": "/solutions"},
     "items": [
        {
          title: 'AI Solutions',
          href: '/ai-solutions',
          description: 'Custom AI models to solve complex business challenges.',
          shortDescription: 'Custom AI models to solve complex business challenges.'
        },
        {
          title: 'Process Automation',
          href: '/automation',
          description: 'Streamline workflows and boost operational efficiency.',
          shortDescription: 'Streamline workflows and boost operational efficiency.'
        },
        {
          title: 'Web & Custom Development',
          href: '/web-development',
          description: 'Scalable websites and applications tailored to your needs.',
          shortDescription: 'Scalable websites and applications tailored to your needs.'
        },
        {
          title: 'AI Chatbots',
          href: '/chatbots',
          description: 'Engage customers 24/7 with intelligent virtual assistants.',
          shortDescription: 'Engage customers 24/7 with intelligent virtual assistants.'
        },
        {
          title: 'Business Analytics',
          href: '/business-analytics',
          description: 'Turn data into actionable insights with custom dashboards.',
          shortDescription: 'Turn data into actionable insights with custom dashboards.'
        },
        {
          title: 'Database Solutions',
          href: '/database-solutions',
          description: 'Secure, scalable, and high-performance data management.',
          shortDescription: 'Secure, scalable, and high-performance data management.'
        }
      ]
  },
  {
    "key": "resources",
    "heading": "Resources",
    "intro": "Explore our expert insights, articles, and tools to stay ahead of the technology curve.",
    "items": [
      {"title": "Insights", "description": "Expert analysis on AI, automation, and tech trends.", "shortDescription": "Expert analysis on AI, automation, and tech trends.", "href": "/insights"},
      {"title": "Use Cases", "description": "Discover how our solutions apply to your industry.", "shortDescription": "Discover how our solutions apply to your industry.", "href": "/use-cases"},
      {"title": "Automation Library", "description": "Browse our library of pre-built workflow templates.", "shortDescription": "Browse our library of pre-built workflow templates.", "href": "/automation"},
      {"title": "Training Programs", "description": "Master in-demand skills with our hands-on curriculum.", "shortDescription": "Master in-demand skills with our hands-on curriculum.", "href": "/training"},
      {"title": "Ideas Lab", "description": "Experimental concepts and AI prompts we're testing.", "shortDescription": "Experimental concepts and AI prompts we're testing.", "href": "/ideas-lab"},
      {"title": "Support", "description": "Find help articles and get in touch with our team.", "shortDescription": "Find help articles and get in touch with our team.", "href": "/support"},
    ]
  },
  {
      "key": "partners",
      "heading": "Partners",
      "href": "/partners"
  },
  {
    "key": "company",
    "heading": "Company",
    "intro": "Learn more about our mission, values, and the team driving our innovation.",
    "items": [
      {"title": "About Us", "description": "Our mission, values, and company news.", "shortDescription": "Our mission, values, and company news.", "href": "/about"},
      {"title": "Our Leadership", "description": "Meet the LOG_ON leadership team.", "shortDescription": "Meet the LOG_ON leadership team.", "href": "/about/our-leadership"},
      {"title": "Careers", "description": "Explore open positions and join our team.", "shortDescription": "Explore open positions and join our team.", "href": "/about/careers"},
      {"title": "Partners", "description": "Collaborate with us to deliver innovative solutions.", "shortDescription": "Collaborate with us to deliver innovative solutions.", "href": "/partners"},
      {"title": "Contact", "description": "Get in touch with our team to start a project.", "shortDescription": "Get in touch with our team.", "href": "/contact"}
    ]
  },
  {
      "key": "contact",
      "heading": "Contact Us",
      "href": "/contact"
  }
];
