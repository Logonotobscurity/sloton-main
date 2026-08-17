
import React from 'react';
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
import { DecisionSupportSection } from '@/components/page-sections/decision-support';
import { FeaturePanel } from '@/components/page-sections/feature-panel';
import { TestimonialStrip } from '@/components/ui/testimonial-strip';
import { DictionaryPill } from '@/components/ui/dictionary-pill';
import { SnippetCard, defaultSnippet } from '@/components/ui/snippet-card';
import { RotatingOrb } from '@/components/ui/rotating-orb';
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

      {/* Feature Panel — category pills update with fade (dense → technical) */}
      <FeaturePanel />

      <SmarterAutomation />

      {/* Dictionary pills — full-width teal word pills (editorial → technical) */}
      <section className="section-fluid section-muted">
        <div className="container-fluid text-center space-y-6">
          <p className="kicker kicker-teal">LANGUAGE OF AUTOMATION</p>
          <h2 className="editorial-headline text-fluid-xl max-w-3xl mx-auto text-balance">
            Words that actually mean something — built into every flow.
          </h2>
          <DictionaryPill />
          <p className="text-sm font-mono text-muted-foreground max-w-2xl mx-auto text-balance">
            Each word is a promise: no jargon, just systems that run while you sleep.
          </p>
        </div>
      </section>

      <PartnershipApproach />

      {/* Rotating orb + snippet — editorial dark (spacious → technical) */}
      <section className="section-fluid bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" aria-hidden="true" />
        <div className="container-fluid relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="flex justify-center order-1 lg:order-none">
              <RotatingOrb size={380} />
            </div>
            <div className="space-y-6 text-center lg:text-left">
              <p className="font-mono text-xs tracking-widest text-primary">ORCHESTRATION • IN MOTION</p>
              <h2
                className="text-3xl sm:text-4xl font-bold leading-tight text-balance"
                style={{ fontFamily: "var(--font-editorial)" }}
              >
                Your tools, finally speaking one language.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-white/70 max-w-xl mx-auto lg:mx-0 text-balance">
                We don&apos;t replace your stack — we weave it together. Slack, Sheets, CRMs, and custom APIs become one
                auditable flow. The orb is a reminder: everything circles back to clarity.
              </p>
              <SnippetCard code={defaultSnippet} caption="Copy-paste ready • Thread-persistent • XSS-safe render" />
            </div>
          </div>
        </div>
      </section>

      <TrainingCTA />
      <Statement />
      <IndustriesBento />

      {/* Testimonial strip — teal quote cards (horizontal scroll) */}
      <section className="section-fluid bg-background">
        <div className="container-fluid space-y-6">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <p className="kicker kicker-teal">VOICES • 5 STORIES</p>
            <h2 className="editorial-headline text-fluid-xl text-balance">What changes when work actually flows?</h2>
            <p className="text-muted-foreground text-balance">Swipe at 375 • scroll at 768 • breathe at 1280 — no overflow, no clipping.</p>
          </div>
          <TestimonialStrip />
        </div>
      </section>

      <TechStackCarousel />
      <FeaturedInsights />
      <IdeasLab />
      <Faq />
      <DecisionSupportSection />
      <BottomCta />
    </>
  );
}
