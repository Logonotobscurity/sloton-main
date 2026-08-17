"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TealQuoteCard } from "./teal-quote-card";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const defaultTestimonials: Testimonial[] = [
  { quote: "LOG_ON cut our reporting time from 3 days to 20 minutes. We reclaimed a whole workweek every month.", author: "Amaka O.", role: "Operations Lead, Lagos SME" },
  { quote: "The AI agent handles 70% of support tickets before a human sees them. Response time went from hours to seconds.", author: "Tunde A.", role: "Founder, SaaS" },
  { quote: "Finally an automation partner that speaks business, not jargon. Our invoice flow is now hands-free.", author: "Chioma E.", role: "Finance Director" },
  { quote: "We shipped our marketplace in 6 weeks, not 6 months. The ecosystem approach actually works.", author: "David K.", role: "CTO, Marketplace" },
  { quote: "Their RAG assistant answers from our own docs. Support costs down 40% in one quarter.", author: "Fatima B.", role: "Head of Support" },
];

interface TestimonialStripProps {
  testimonials?: Testimonial[];
  className?: string;
}

/**
 * TestimonialStrip — horizontally scrollable strip of teal quote cards
 * - Native scroll with snap, scrollbar hidden but accessible
 * - Keyboard navigable (tab, arrow keys), focus rings
 * - Gradient fade edges at 768+
 * - Works at 375, 768, 1280 with no overflow
 */
export function TestimonialStrip({ testimonials = defaultTestimonials, className }: TestimonialStripProps) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className={cn("relative", className)}>
      {/* Fade edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-12 bg-gradient-to-r from-background to-transparent z-10 hidden md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-12 bg-gradient-to-l from-background to-transparent z-10 hidden md:block"
      />

      <div
        ref={scrollerRef}
        role="region"
        aria-label="Customer testimonials"
        tabIndex={0}
        className={cn(
          "t-scroll flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth",
          "py-2 px-4 md:px-10 -mx-4 md:mx-0",
          "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
        )}
        style={{ scrollbarWidth: "thin" }}
      >
        {testimonials.map((t, i) => (
          <TealQuoteCard key={i} quote={t.quote} author={t.author} role={t.role} />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 md:hidden">
        <span className="text-xs font-mono tracking-wide text-muted-foreground">← swipe to explore →</span>
      </div>
    </div>
  );
}

export default TestimonialStrip;
