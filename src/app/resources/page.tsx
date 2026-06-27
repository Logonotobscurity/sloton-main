
import Link from 'next/link';
import { ExternalLink, BookOpen, Zap, BrainCircuit, Globe, GraduationCap, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/page-sections/page-hero';
import { generateMetadata, KEYWORD_SETS, BreadcrumbSchema, JsonLd } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'AI & Automation Resources for Nigerian SMEs | Free Guides & Tools',
  description: 'A curated library of free AI, automation, and digital transformation resources for Nigerian businesses and African SMEs. Guides, tools, frameworks, and thought leadership from LOG_ON and across the ecosystem.',
  keywords: [
    ...KEYWORD_SETS.ai,
    ...KEYWORD_SETS.automation,
    'AI resources Nigeria',
    'automation guides Nigeria',
    'digital transformation Africa',
    'AI tools for SMEs',
    'GEO resources',
    'llms.txt guide',
    'AI productivity Nigeria',
  ],
  canonical: 'https://logonsolutions.netlify.app/resources',
});

const resourcesSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'AI & Automation Resources for Nigerian SMEs',
  description: 'A curated library of free AI, automation, and digital transformation resources for businesses in Nigeria and across Africa.',
  url: 'https://logonsolutions.netlify.app/resources',
  publisher: {
    '@type': 'Organization',
    name: 'LOG_ON',
    url: 'https://logonsolutions.netlify.app',
  },
};

const resources = [
  {
    category: 'GEO & AI Search',
    icon: BrainCircuit,
    items: [
      {
        title: 'Why llms.txt Matters for Modern SEO',
        description: 'A practical guide to the emerging llms.txt standard and how to implement it so AI models like ChatGPT and Perplexity can accurately represent your brand.',
        href: '/insights/why-llms-txt-matters-for-seo',
        type: 'Guide',
        internal: true,
      },
      {
        title: 'SEO vs GEO: Are You Invisible in AI Search?',
        description: 'The essential primer on Generative Engine Optimization. Understand why traditional SEO tactics fail in AI-driven search and what to do about it.',
        href: '/insights/seo-vs-geo-invisible-in-ai-search',
        type: 'Article',
        internal: true,
      },
      {
        title: '10 Content Formats That Get Picked Up by LLMs',
        description: 'Actionable guide to structuring your content so AI models cite, quote, and surface it in generated responses.',
        href: '/insights/10-content-formats-that-get-picked-up-by-llms',
        type: 'Guide',
        internal: true,
      },
    ],
  },
  {
    category: 'AI for Business',
    icon: Zap,
    items: [
      {
        title: 'Gemini Flash: Faster AI Workflows',
        description: 'How businesses can leverage Google Gemini Flash for faster, cheaper AI-powered workflows without sacrificing quality.',
        href: '/insights/gemini-flash-faster-ai-workflows',
        type: 'Article',
        internal: true,
      },
      {
        title: 'Agentic Code Review: AI as Your Senior Developer',
        description: 'A deep dive into AI-powered code review systems and how they reduce review time by 40% while improving code quality.',
        href: '/insights/agentic-code-review',
        type: 'Article',
        internal: true,
      },
      {
        title: 'Visual AI Document Analysis',
        description: 'How multimodal AI models are transforming document processing, contract review, and invoice extraction for African businesses.',
        href: '/insights/visual-ai-document-analysis',
        type: 'Guide',
        internal: true,
      },
    ],
  },
  {
    category: 'Training & Learning',
    icon: GraduationCap,
    items: [
      {
        title: 'Process Automation Mastery — LOG_ON Programme',
        description: 'Our expert-led training course covering RPA, BPA, and AI workflow automation. Designed for teams at Nigerian and African enterprises.',
        href: '/training',
        type: 'Course',
        internal: true,
      },
      {
        title: 'Prompt Engineering for Developers',
        description: 'Advanced prompt engineering techniques to improve development velocity, code quality, and AI system outputs.',
        href: '/insights/prompt-engineering-for-developers',
        type: 'Course',
        internal: true,
      },
      {
        title: 'Applied AI: Building Recommendation Systems',
        description: 'Hands-on training: build and deploy scalable recommendation models using Python, Pandas, and Pinecone.',
        href: '/training',
        type: 'Course',
        internal: true,
      },
    ],
  },
  {
    category: 'Tools & Frameworks',
    icon: Globe,
    items: [
      {
        title: 'LOG_ON Free AI Business Assessment',
        description: 'Answer 10 questions about your business and receive a tailored AI readiness report identifying your top automation opportunities. Free, no obligation.',
        href: '/solutions',
        type: 'Tool',
        internal: true,
      },
      {
        title: 'AI Workflow Designer',
        description: 'Describe a business process in plain language and our AI generates a structured, optimized automation blueprint. Available free on our platform.',
        href: '/automation',
        type: 'Tool',
        internal: true,
      },
      {
        title: 'Schema.org — Structured Data Reference',
        description: 'The canonical reference for structured data markup. Essential for any business implementing GEO and SEO improvements.',
        href: 'https://schema.org',
        type: 'Reference',
        internal: false,
      },
      {
        title: 'Google Search Console',
        description: 'Free tool from Google to monitor your site\'s search performance, submit sitemaps, and diagnose indexing issues.',
        href: 'https://search.google.com/search-console',
        type: 'Tool',
        internal: false,
      },
      {
        title: 'llms.txt Standard Specification',
        description: 'The emerging standard for providing AI-readable summaries of website content. See our implementation at logonsolutions.netlify.app/llms.txt.',
        href: 'https://llmstxt.org',
        type: 'Standard',
        internal: false,
      },
    ],
  },
  {
    category: 'Africa AI Ecosystem',
    icon: Globe,
    items: [
      {
        title: 'Techpoint Africa — Tech News',
        description: 'Nigeria and Africa\'s leading technology news publication covering AI, startups, and digital transformation across the continent.',
        href: 'https://techpoint.africa',
        type: 'Publication',
        internal: false,
      },
      {
        title: 'TechCabal — African Tech Coverage',
        description: 'Authoritative African tech journalism covering AI adoption, fintech, and the digital economy in Nigeria, Kenya, Ghana, and beyond.',
        href: 'https://techcabal.com',
        type: 'Publication',
        internal: false,
      },
      {
        title: 'Omdena — AI for Social Good',
        description: 'Collaborative AI project hub connecting African AI practitioners with real-world challenges. A key ecosystem partner for Africa-first AI development.',
        href: 'https://omdena.com',
        type: 'Community',
        internal: false,
      },
    ],
  },
];

const badgeVariants: Record<string, string> = {
  Guide: 'bg-blue-500/10 text-blue-400',
  Article: 'bg-purple-500/10 text-purple-400',
  Course: 'bg-green-500/10 text-green-400',
  Tool: 'bg-yellow-500/10 text-yellow-400',
  Reference: 'bg-gray-500/10 text-gray-400',
  Standard: 'bg-orange-500/10 text-orange-400',
  Publication: 'bg-red-500/10 text-red-400',
  Community: 'bg-teal-500/10 text-teal-400',
};

export default function ResourcesPage() {
  return (
    <div className="bg-background">
      <JsonLd data={resourcesSchema} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://logonsolutions.netlify.app' },
        { name: 'Resources', url: 'https://logonsolutions.netlify.app/resources' },
      ]} />
      <PageHero
        title="AI & Automation Resources"
        description="A curated library of free guides, tools, and thought leadership to help Nigerian businesses and African SMEs navigate AI adoption, workplace automation, and digital transformation. Built by practitioners, for practitioners."
      />

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-20">

        {resources.map((section) => (
          <section key={section.category} aria-labelledby={`section-${section.category.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="flex items-center gap-3 mb-8">
              <section.icon className="h-6 w-6 text-primary" />
              <h2
                id={`section-${section.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-2xl md:text-3xl font-bold font-headline"
              >
                {section.category}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => (
                <Card key={item.title} className="bg-secondary/30 flex flex-col hover:bg-secondary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeVariants[item.type] ?? 'bg-secondary text-muted-foreground'}`}>
                        {item.type}
                      </span>
                      {!item.internal && <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    </div>
                    <CardTitle className="text-base leading-snug">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between gap-4">
                    <CardDescription className="text-sm leading-relaxed">{item.description}</CardDescription>
                    {item.internal ? (
                      <Link
                        href={item.href}
                        className="text-sm text-primary font-medium hover:underline flex items-center gap-1 mt-auto"
                      >
                        Read more <ArrowRight className="h-3 w-3" />
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary font-medium hover:underline flex items-center gap-1 mt-auto"
                      >
                        Visit resource <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}

        {/* CTA cluster */}
        <section className="border-t pt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">
            Ready to Apply These Insights?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            LOG_ON helps Nigerian and African businesses turn AI and automation knowledge into measurable results.
            Start with a free, no-obligation business assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link href="/solutions">Get Your Free AI Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/insights">Browse All Insights</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/training">Explore Training Programmes</Link>
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
}
