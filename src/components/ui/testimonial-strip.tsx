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
 * TestimonialStrip — Infinity Motion Carousel
 * Exactly like "From the Ideas Lab" — infinite linear motion across ALL screens (375, 768, 1280)
 * Triples items for seamless loop, framer-motion linear 5s per card, no swipe fallback
 */
export function TestimonialStrip({ testimonials = defaultTestimonials, className }: TestimonialStripProps) {
  const duplicated = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: [0, -(360 + 16) * testimonials.length] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: testimonials.length * 5,
              ease: "linear",
            },
          }}
        >
          {duplicated.map((t, i) => (
            <TealQuoteCard key={`${t.author}-${i}`} quote={t.quote} author={t.author} role={t.role} className="shrink-0" />
          ))}
        </motion.div>
      </div>

      {/* Gradient Overlays — like IdeasLab */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none hidden md:block" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none hidden md:block" />

      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="text-xs font-mono tracking-wide text-muted-foreground">∞ infinite motion — like Ideas Lab</span>
      </div>
    </div>
  );
}

export default TestimonialStrip;
