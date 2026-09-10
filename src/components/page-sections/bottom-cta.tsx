'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export interface BottomCtaProps {
  kicker?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

/**
 * BottomCta — Global Final Conversion Component
 * Editorial, premium conclusion for every page. Black-bordered card + teal shadow.
 * Responsive: full-width CTA on mobile, auto on desktop. No secondary action creep.
 */
export function BottomCta({
  kicker = 'CONNECTING ADVANTAGES',
  title = 'Ready to build something that actually moves your business?',
  description = 'We design your digital ecosystem — from AI agents that answer in seconds to automation that reclaims hours every week. One conversation could change how you work.',
  ctaLabel = 'Start a Project with Us',
  ctaHref = '/contact',
  className = '',
}: BottomCtaProps) {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className={`final-cta relative overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/marks/hero-contact.svg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="final-cta-card relative z-10">
        {/* Kicker — monospace + teal */}
        <div className="verdara-kicker final-cta-kicker">{kicker}</div>

        <h2
          id="final-cta-heading"
          className="verdara-title final-cta-title"
        >
          {title}
        </h2>

        <p className="final-cta-copy">{description}</p>

        <Button
          asChild
          variant="default"
          size="lg"
          className="final-cta-btn group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Link
            href={ctaHref}
            aria-label={ctaLabel}
          >
            {ctaLabel}
            <ArrowRight
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Button>

        {/* Trust microcopy — functional */}
        <p className="mt-5 text-xs font-mono text-muted-foreground">
          Free assessment · No pitch deck · Replies within hours
        </p>
      </div>
    </section>
  );
}

export default BottomCta;
