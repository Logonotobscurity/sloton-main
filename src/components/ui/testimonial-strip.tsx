"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TealQuoteCard } from "./teal-quote-card";
import { motion } from "framer-motion";

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
 * TestimonialStrip — Infinity Motion Carousel (matches IdeasLab)
 * - Triples testimonials for seamless infinite loop (like IdeasLab)
 * - Framer-motion linear infinite (5s per card) — runs on both mobile + desktop
 * - Hover/focus pauses via state, respects prefers-reduced-motion
 * - Uses same full-teal card as duplicate (logon-quote-card) for consistency
 * - Works at 375, 768, 1280 with no overflow
 */
export function TestimonialStrip({ testimonials = defaultTestimonials, className }: TestimonialStripProps) {
  // Triple for seamless infinite (like IdeasLab) — ensures no gap at any viewport
  const duplicated = [...testimonials, ...testimonials, ...testimonials];
  const cardWidth = 360 + 16; // 360px card + 16px gap — matches TealQuoteCard min-w + gap-4
  const [isPaused, setIsPaused] = React.useState(false);
  const shouldReduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (shouldReduceMotion) {
    return (
      <div className={cn("relative", className)}>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth py-2 px-1 -mx-1">
          {testimonials.map((t, i) => (
            <TealQuoteCard key={i} quote={t.quote} author={t.author} role={t.role} className="shrink-0 snap-start" />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-xs font-mono tracking-wide text-muted-foreground">← swipe to explore →</span>
        </div>
      </div>
    );
  }

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

      {/* Infinite track — framer-motion like IdeasLab, runs on both mobile + desktop */}
      <div
        role="region"
        aria-label="Customer testimonials — infinite carousel, hover to pause"
        tabIndex={0}
        className={cn(
          "relative overflow-hidden py-2 group",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-4 w-max will-change-transform"
          animate={{ x: isPaused ? undefined : [0, -cardWidth * testimonials.length] }}
          transition={
            isPaused
              ? {}
              : {
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: testimonials.length * 5, // 5s per card like IdeasLab
                    ease: "linear",
                  },
                }
          }
          style={{ x: isPaused ? undefined : 0 } as any}
        >
          {duplicated.map((t, i) => (
            <TealQuoteCard
              key={`${t.author}-${i}`}
              quote={t.quote}
              author={t.author}
              role={t.role}
              className="shrink-0"
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="text-xs font-mono tracking-wide text-muted-foreground">∞ infinite motion — hover to pause • swipe on mobile</span>
      </div>
    </div>
  );
}

export default TestimonialStrip;
