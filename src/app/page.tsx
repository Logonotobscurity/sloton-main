
import React from 'react';
import type { Metadata } from 'next';
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
import Faq from '@/components/faq';
import { IdeasLab } from '@/components/page-sections/ideas-lab';

export const metadata: Metadata = {
  title: 'AI Agent Development & Workplace Automation in Nigeria',
  description: 'Specialists in AI agent development and workplace automation in Nigeria. Learn how to put AI agents to work and transform your business with our intelligent automation solutions.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <StrategicPartner />
      <ServicesOffered />
      <SmarterAutomation />
      <PartnershipApproach />
      <TrainingCTA />
      <Statement />
      <IndustriesBento />
      <TechStackCarousel />
      <FeaturedInsights />
      <IdeasLab />
      <Faq />
      <BottomCta />
    </>
  );
}
