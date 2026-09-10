
import React from 'react';
import { AnimatedCodeBackground } from "@/components/ui/animated-code-background";
import { generateMetadata, KEYWORD_SETS, WebSiteSchema, ServiceCatalogSchema, LocalBusinessSchema, BreadcrumbSchema, PersonSchema } from '@/lib/seo';
import { Hero } from '@/components/page-sections/hero';
import StrategicPartner from '@/components/page-sections/strategic-partner';
import { ServicesOffered } from '@/components/page-sections/services-offered';
import { SmarterAutomation } from '@/components/page-sections/smarter-automation';
import { PartnershipApproach } from '@/components/page-sections/partnership-approach';
import { TrainingCTA } from '@/components/page-sections/training-cta';
import { Statement } from '@/components/page-sections/statement';
import { IndustriesBento } from '@/components/page-sections/industries-bento';
import { TechStackCarousel } from '@/components/page-sections/tech-stack-carousel';
import { FeaturedInsights } from '@/components/page-sections/featured-insights';
import { HomeInsightsClusters } from '@/components/page-sections/home-insights-clusters';
import { BottomCta } from '@/components/page-sections/bottom-cta';
import { LogonExperience } from '@/components/page-sections/logon-experience';
import { TestimonialStrip } from '@/components/ui/testimonial-strip';
import Faq from '@/components/faq';
import { IdeasLab } from '@/components/page-sections/ideas-lab';
import { EntityLead, PricingNote } from '@/components/entity-lead';
import { VisibilityHomeBand } from '@/components/visibility/visibility-home-band';
import { SITE } from '@/lib/site';

export const metadata = generateMetadata({
  title: 'AI Agent Development & Workplace Automation in Nigeria | LOG_ON',
  description: 'Transform your business with expert AI agent development and workplace automation in Nigeria. Custom AI solutions, intelligent RPA, and digital transformation services in Lagos. Get a free AI assessment today.',
  keywords: [
    ...KEYWORD_SETS.ai,
    ...KEYWORD_SETS.automation,
    'AI agent development Nigeria',
    'workplace automation Lagos',
    'business process automation Nigeria',
    'RPA solutions Nigeria',
    'digital transformation Nigeria',
    'AI consulting Lagos',
    'intelligent automation',
    'AI solutions Nigeria',
  ],
  canonical: '/',
});

export default function Home() {
  return (
    <>
      <WebSiteSchema />
      <ServiceCatalogSchema />
      <LocalBusinessSchema />
      <PersonSchema
        name="Oluwamayowa Logo"
        role="Lead Developer & Automation Solution Architect"
        email="logonthepage@gmail.com"
        linkedin="https://www.linkedin.com/in/logo-oluwamayowa-cpo-/"
        twitter="https://x.com/Logo_obscurity"
        github="https://github.com/Logonotobscurity/"
      />
      <Hero />
      <VisibilityHomeBand />
      <section className="container mx-auto px-fluid-sm py-12 md:py-16">
        <div className="max-w-3xl space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Entity</p>
          <h2 className="text-2xl md:text-4xl font-bold font-headline">What LOG_ON is</h2>
          <EntityLead />
          <PricingNote />
          <p className="text-sm text-muted-foreground">
            Start with a free assessment — <a className="text-primary underline" href="/contact">{SITE.email}</a> or WhatsApp {SITE.phone}.
          </p>
        </div>
      </section>
      <StrategicPartner />
      <ServicesOffered />

      <SmarterAutomation />

      <PartnershipApproach />

      <TrainingCTA />
      <Statement />
      <IndustriesBento />

      {/* VOICES • 5 STORIES — Infinity Motion like IdeasLab, restored per request */}
      <section className="section-fluid bg-background overflow-hidden">
      <AnimatedCodeBackground variant="insights" density="low" />
        <div className="container-fluid space-y-6">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <p className="kicker kicker-teal">VOICES • 5 STORIES</p>
            <h2 className="editorial-headline text-fluid-xl text-balance">What changes when work actually flows?</h2>
            <p className="text-muted-foreground text-balance">Infinite motion at 375, 768 and 1280 — like Ideas Lab.</p>
          </div>
          <TestimonialStrip />
        </div>
      </section>

      <TechStackCarousel />
      <HomeInsightsClusters />
      <FeaturedInsights />
      <IdeasLab />
      <Faq />
      <BottomCta />
      <LogonExperience />
    </>
  );
}
