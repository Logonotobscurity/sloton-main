
import React from 'react';
import { AnimatedCodeBackground } from "@/components/ui/animated-code-background";
import { generateMetadata, KEYWORD_SETS, WebSiteSchema, ServiceCatalogSchema, LocalBusinessSchema, BreadcrumbSchema } from '@/lib/seo';
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
import { BottomCta } from '@/components/page-sections/bottom-cta';
import { LogonExperience } from '@/components/page-sections/logon-experience';
import { TestimonialStrip } from '@/components/ui/testimonial-strip';
import Faq from '@/components/faq';
import { IdeasLab } from '@/components/page-sections/ideas-lab';

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
  canonical: 'https://logonsolutions.netlify.app',
});

export default function Home() {
  return (
    <>
      <WebSiteSchema />
      <ServiceCatalogSchema />
      <LocalBusinessSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://logonsolutions.netlify.app' },
      ]} />
      <Hero />
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
      <FeaturedInsights />
      <IdeasLab />
      <Faq />
      <BottomCta />
      <LogonExperience />
    </>
  );
}
