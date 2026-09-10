
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { generateMetadata, KEYWORD_SETS, JsonLd, generateServiceSchema, BreadcrumbSchema } from '@/lib/seo';
import { CaseStudyFeature } from '@/components/page-sections/case-study-feature';
import { PageHero } from '@/components/page-sections/page-hero';
import { aiServices, aiSolutionsBenefits } from '@/lib/data/services-data';
import { EntityLead, PricingNote } from '@/components/entity-lead';
import { PageFaq } from '@/components/page-faq';

export const metadata = generateMetadata({
  title: 'AI Agent Development & Custom AI Solutions in Nigeria',
  description: 'Expert AI agent development and custom machine learning solutions in Nigeria. We design and deploy intelligent AI agents for workplace automation, predictive analytics, and business innovation. Transform your operations with cutting-edge AI technology.',
  keywords: [
    ...KEYWORD_SETS.ai,
    'AI agent development Nigeria',
    'custom AI solutions Lagos',
    'machine learning Nigeria',
    'AI consulting Nigeria',
    'intelligent agents',
    'AI automation Nigeria',
    'predictive analytics',
    'NLP solutions',
    'computer vision Nigeria',
  ],
  canonical: 'https://logonai.netlify.app/ai-solutions',
});

const aiServiceSchema = generateServiceSchema({
  name: 'AI Agent Development & Custom AI Solutions',
  description: 'Expert AI agent development and custom machine learning solutions. We design and deploy AI agents for workplace automation to solve complex business challenges and drive growth in Nigeria.',
  url: 'https://logonai.netlify.app/ai-solutions',
  provider: 'LOG_ON',
  areaServed: 'Nigeria',
});

export default function AiSolutionsPage() {
  return (
    <div className="bg-background">
      <JsonLd data={aiServiceSchema} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://logonai.netlify.app' },
        { name: 'AI Solutions', url: 'https://logonai.netlify.app/ai-solutions' },
      ]} />
      <PageHero
        visual="/images/marks/hero-ai.svg"
        kicker="AI practice"
        title="Custom AI Solutions & Agent Development"
        description="At LOG_ON, we don't just use AI—we build it. We specialize in creating bespoke artificial intelligence, AI agents, and machine learning solutions that integrate seamlessly with your operations to solve your most complex challenges. Our expert team partners with you to transform your data into a strategic asset, driving efficiency, innovation, and measurable growth."
      />
      <div className="container mx-auto px-fluid-sm py-fluid-lg">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <EntityLead text="LOG_ON AI solutions cover agent development, RAG over company documents, predictive models, and operational copilots. Work is delivered as a fixed-scope or retainer project after a free efficiency assessment." />
             <PricingNote />
             <div className="space-y-4 pt-4">
                {aiSolutionsBenefits.map(benefit => (
                    <div key={benefit} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">{benefit}</span>
                    </div>
                ))}
            </div>
            <Button asChild size="lg" className="mt-4">
              <Link href="/contact">Free AI Consultation</Link>
            </Button>
          </div>
          <div className="relative h-80 lg:h-96 mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-primary/10 rounded-2xl -rotate-3 transition-transform duration-300 ease-in-out hover:rotate-0"></div>
            <Card className="absolute inset-2 sm:inset-5 bg-background/80 backdrop-blur-lg rotate-2 transition-transform duration-300 ease-in-out hover:rotate-0 hover:scale-105">
                 <CardHeader>
                    <div className="flex justify-center mb-4">
                        <BrainCircuit className="h-12 w-12 md:h-16 md:w-16 text-primary" />
                    </div>
                    <CardTitle className="text-center text-fluid-lg">Artificial Intelligence</CardTitle>
                    <CardDescription className="text-center">
                        Building the brains behind your business operations.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-fluid-base">
                    <p className="leading-relaxed">We leverage cutting-edge algorithms and data science to build intelligent systems that learn, adapt, and drive value.</p>
                </CardContent>
            </Card>
          </div>
        </section>

        <section className="verdara-section -mx-fluid-sm px-5 lg:px-10 py-16">
            <p className="verdara-kicker">Practice</p>
            <h2 className="verdara-title mt-2">Our AI development <em>services</em></h2>
            <p className="verdara-lede mt-4">
                    We offer a comprehensive suite of AI services designed to address your specific needs and deliver tangible results.
            </p>
             <div className="verdara-grid verdara-grid-2 mt-10">
                {aiServices.map((service) => (
                <article key={service.title} className="verdara-card">
                    <span className="verdara-tag verdara-tag-sage">AI</span>
                    <h3 className="mt-4">{service.title}</h3>
                    <p className="verdara-lede mt-auto pt-3">{service.description}</p>
                </article>
                ))}
            </div>
        </section>

        <CaseStudyFeature 
            tags={["AI", "Chatbot", "Analytics", "Design Thinking"]}
            title="Real-World AI Success Stories"
            description="See how our custom AI solutions have transformed businesses, from automating support to providing critical data insights. Explore our design thinking process that transforms abstract ideas into concrete visual prototypes."
            showDesignProcess={true}
        />

        <PageFaq
          items={[
            {
              question: 'What is LOG_ON AI agent development?',
              answer:
                'LOG_ON designs and deploys custom AI agents for Nigerian and African businesses—document RAG, operational copilots, and workflow bots—as scoped consulting work, not a self-serve SaaS product.',
            },
            {
              question: 'Who is it for?',
              answer:
                'Operators in finance, healthcare, commerce, manufacturing, and the public sector who need to cut manual work and keep data on systems they control.',
            },
            {
              question: 'How much does it cost?',
              answer:
                'Pricing is scoped after a free AI Business Efficiency Assessment. Chatbot work typically lands in 2–4 weeks; broader automation in 4–8 weeks (LOG_ON delivery records, 2024–2026).',
            },
            {
              question: 'What are the limitations?',
              answer:
                'We do not sell a pre-built agent marketplace. Outcomes depend on data quality, process access, and a named owner on the client side. High-risk decisions stay with humans.',
            },
          ]}
        />

        <section className="verdara-section mt-8 px-5 py-16 text-center">
            <h2 className="verdara-title">Ready to unlock your AI <em>potential</em>?</h2>
            <p className="verdara-lede mt-4 mx-auto">
                Let's discuss how our custom AI solutions can transform your business. Schedule a free, no-obligation consultation with our AI experts today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
                <Button asChild size="lg">
                    <Link href="/contact">
                        Schedule Consultation <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/automation">See Automation Solutions</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/use-cases">View Industry Use Cases</Link>
                </Button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
                Learn more in our <Link href="/insights" className="text-primary underline hover:no-underline">AI insights library</Link> or explore our{' '}
                <Link href="/training" className="text-primary underline hover:no-underline">AI training programmes</Link>.
            </p>
        </section>

      </div>
    </div>
  );
}
