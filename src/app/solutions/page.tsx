
import {
  ArrowRight,
  CheckCircle,
  Search,
} from "lucide-react";
import { PageHero } from "@/components/page-sections/page-hero";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BottomCta } from '@/components/page-sections/bottom-cta';
import { DecisionSupportSection } from '@/components/page-sections/decision-support';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SolutionRecommendationForm from "@/components/solution-recommendation-form";
import { services, industryApplications } from "@/lib/data/solutions-data";
import { generateMetadata, KEYWORD_SETS, BreadcrumbSchema, ServiceCatalogSchema } from "@/lib/seo";
import { EntityLead, PricingNote } from '@/components/entity-lead';
import { SITE } from '@/lib/site';

export const metadata = generateMetadata({
  title: 'Technology Solutions | Custom AI, Automation & Development in Nigeria',
  description:
    "Explore LOG_ON's full suite of AI and automation technology solutions in Nigeria: custom AI agents, RPA workplace automation, web development, business analytics, and AI chatbots. Designed to drive efficiency and measurable growth.",
  keywords: [
    ...KEYWORD_SETS.ai,
    ...KEYWORD_SETS.automation,
    'technology solutions Nigeria',
    'AI solutions Lagos',
    'RPA automation Nigeria',
    'chatbot development Nigeria',
    'business analytics Lagos',
    'custom software Nigeria',
  ],
  canonical: '/solutions',
});

export default function SolutionsPage() {
  return (
    <div className="bg-background">
      <ServiceCatalogSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://logonai.netlify.app' },
        { name: 'Solutions', url: 'https://logonai.netlify.app/solutions' },
      ]} />
      <PageHero 
        kicker="Solutions"
        title="Turn Your Biggest Challenges into Growth Opportunities"
        description="LOG_ON is a Lagos consultancy. We design custom AI agents, workplace RPA, analytics, and web systems — scoped projects, not a packaged SaaS product. Discover how integrated services can cut grind and unlock measurable return."
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mt-8">
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg">Get Your Free AI Assessment</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl md:max-w-2xl bg-background">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Free AI Business Assessment</DialogTitle>
                        <DialogDescription>
                        Describe your business needs to receive tailored IT solution recommendations from our AI consultant.
                        </DialogDescription>
                    </DialogHeader>
                    <SolutionRecommendationForm />
                </DialogContent>
            </Dialog>
            <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Schedule a Free Consultation</Link>
            </Button>
        </div>
      </PageHero>
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-20">
        <section className="max-w-3xl space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Entity</p>
          <EntityLead />
          <PricingNote />
          <p className="text-sm text-muted-foreground">
            Free assessment — <a className="text-primary underline" href="/contact">{SITE.email}</a> · WhatsApp {SITE.phone}. Playbooks:{" "}
            <a className="text-primary underline" href="/insights/ai-implementation">implementation</a>,{" "}
            <a className="text-primary underline" href="/insights/ai-agents">agents</a>,{" "}
            <a className="text-primary underline" href="/insights/ai-automation">automation</a>.
          </p>
        </section>
        {/* Core Services Section */}
        <div className="space-y-16">
            {services.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <section key={service.id} id={service.id} className="scroll-mt-20">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                        <div className="lg:sticky top-24">
                           <p className="verdara-kicker">{service.id}</p>
                           <h2 className="verdara-title mt-2">{service.title}</h2>
                           <p className="verdara-lede mt-3">{service.description}</p>
                           <Button asChild className="mt-6">
                               <Link href={service.cta.href}>
                                   {service.cta.text} <ArrowRight className="ml-2 h-4 w-4"/>
                               </Link>
                           </Button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-primary">Key Capabilities</h3>
                                <ul className="space-y-2">
                                    {service.capabilities.map(cap => (
                                        <li key={cap} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                                            <span className="text-muted-foreground">{cap}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-primary">Business Benefits</h3>
                                <ul className="space-y-2">
                                    {service.benefits.map(benefit => (
                                        <li key={benefit} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                                            <span className="text-muted-foreground">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
              );
            })}
        </div>

        {/* Solutions Audit Section */}
        <section className="py-16 md:py-24 bg-secondary/20 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 sm:rounded-2xl">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                             <Search className="h-8 w-8 text-primary" />
                             <h2 className="text-3xl md:text-4xl font-bold font-headline">The LOG_ON Solutions Audit</h2>
                        </div>
                        <p className="text-muted-foreground md:text-lg">Before we build, we analyze. Our process begins with a comprehensive audit of your existing digital ecosystem—from your main page and sub-pages to your navigation flows. We map out user journeys and data pathways to identify critical opportunities for optimization.</p>
                        <p className="text-muted-foreground md:text-lg">This strategic approach ensures that any solution we implement is perfectly aligned with your business goals and has a clearly defined path to delivering a return on investment. We don't guess; we provide a data-driven roadmap to success.</p>
                    </div>
                    <Card className="bg-background">
                        <CardHeader>
                            <CardTitle>Your Free AI Business Assessment</CardTitle>
                            <CardDescription>Our audit process starts here. Answer a few questions about your business, and our AI consultant will generate a high-level report identifying your top opportunities for automation and digital transformation.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href="/contact?subject=AI+Business+Assessment">
                                    Get Your Free Assessment <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
        
        {/* Industry Applications Section */}
        <section>
            <div className="max-w-3xl mb-10">
                <p className="verdara-kicker">Sectors</p>
                <h2 className="verdara-title mt-2">Industry-specific <em>solutions</em></h2>
                <p className="verdara-lede mt-3">We apply our core services to solve the unique challenges of your industry.</p>
            </div>
            <div className="verdara-grid verdara-grid-3">
                {industryApplications.map(app => {
                  const AppIcon = app.icon;
                  return (
                    <article key={app.industry} className="verdara-card">
                        <span className="verdara-tag verdara-tag-sage">{app.industry}</span>
                        <AppIcon className="mt-4 h-5 w-5" aria-hidden />
                        <h3 className="mt-3">{app.industry}</h3>
                        <p className="verdara-lede mt-2 font-semibold text-[var(--color-emphasis)]">{app.challenge}</p>
                        <p className="verdara-lede mt-auto pt-3">
                                  {app.solution.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
                                    part.startsWith('**') && part.endsWith('**') ? (
                                      <strong key={i}>{part.slice(2, -2)}</strong>
                                    ) : (
                                      <span key={i}>{part}</span>
                                    )
                                  )}
                        </p>
                        <Button asChild variant="outline" size="sm" className="mt-4">
                                <Link href={app.cta.href}>{app.cta.text}</Link>
                        </Button>
                    </article>
                  )
                })}
            </div>
        </section>

      </div>
      <DecisionSupportSection />
      <BottomCta />
    </div>
  );
}
