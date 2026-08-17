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
 * TestimonialStrip — Infinity Motion Carousel
 * - Duplicates testimonials for seamless infinite loop
 * - CSS animation: translateX(-50%) 40s linear infinite, pauses on hover/focus
 * - Respects prefers-reduced-motion (no animation, becomes scrollable)
 * - Gradient fade edges at 768+, no overflow at 375/768/1280
 * - Keyboard navigable, focus rings, 44px hint
 */
export function TestimonialStrip({ testimonials = defaultTestimonials, className }: TestimonialStripProps) {
  // Duplicate for seamless infinite loop (2x)
  const looped = [...testimonials, ...testimonials];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Fade edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-12 bg-gradient-to-r from-background to-transparent z-10 hidden md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-12 bg-gradient-to-l from-background to-transparent z-10 hidden md:block"
      />

      {/* Infinite track — wraps on reduced-motion, animates otherwise */}
      <div
        role="region"
        aria-label="Customer testimonials — infinite carousel, pause on hover"
        tabIndex={0}
        className={cn(
          "group relative flex overflow-hidden py-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg",
          "hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
        )}
      >
        {/* Scrollable fallback for reduced-motion or no-JS: allow manual scroll */}
        <div
          className={cn(
            "flex gap-4 w-max will-change-transform",
            // Motion-safe infinite scroll
            "motion-safe:animate-infinite-scroll motion-safe:group-hover:[animation-play-state:paused] motion-safe:group-focus-within:[animation-play-state:paused]",
            // Reduced-motion: become horizontally scrollable instead
            "motion-reduce:animate-none motion-reduce:overflow-x-auto motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:scroll-smooth",
            "motion-reduce:w-full motion-reduce:max-w-full"
          )}
          style={
            {
              // Ensure animation duration scales with content
              animationDuration: "40s",
            } as React.CSSProperties
          }
        >
          {looped.map((t, i) => (
            <TealQuoteCard
              key={`${t.author}-${i}`}
              quote={t.quote}
              author={t.author}
              role={t.role}
              className="shrink-0"
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="text-xs font-mono tracking-wide text-muted-foreground">
          <span className="motion-safe:hidden">← swipe to explore →</span>
          <span className="hidden motion-safe:inline">↔ infinite motion — hover to pause →</span>
        </span>
      </div>

      <style>{`
        /* Ensure infinite-scroll is defined (fallback if tailwind not loaded) */
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default TestimonialStrip;
