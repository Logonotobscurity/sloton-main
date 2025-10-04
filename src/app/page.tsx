
import React from 'react';
import { Faq } from '@/components/faq';
import { FeaturedInsights } from '@/components/featured-insights';
import { Hero } from '@/components/hero';
import { PartnershipApproach } from '@/components/partnership-approach';
import { Statement } from '@/components/statement';
import { TechStackCarousel } from '@/components/tech-stack-carousel';
import { TrainingCTA } from '@/components/training-cta';
import { BottomCta } from '@/components/bottom-cta';
import { IndustriesBento } from '@/components/industries-bento';
import { IdeasLab } from '@/components/ideas-lab';
import { SmarterAutomation } from '@/components/smarter-automation';
import { ServicesOffered } from '@/components/services-offered';
import type { Metadata } from 'next';
import { StrategicPartner } from '@/components/strategic-partner';

export const metadata: Metadata = {
  title: 'LOG_ON | AI & Automation for Business Efficiency',
  description: 'We design your digital ecosystem. Get a free AI assessment to discover automation and IT solutions tailored to your business needs.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="w-full space-y-4 md:space-y-8">
          <StrategicPartner />
          <ServicesOffered />
          <IdeasLab />
          <SmarterAutomation />
          <PartnershipApproach />
          <TrainingCTA />
          <Statement />
          <IndustriesBento />
          <TechStackCarousel />
          <FeaturedInsights />
          <Faq />
        <BottomCta />
      </div>
    </>
  );
}
