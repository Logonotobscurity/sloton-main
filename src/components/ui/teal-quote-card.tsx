"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface TealQuoteCardProps {
  quote: string;
  author?: string;
  role?: string;
  className?: string;
}

/**
 * TealQuoteCard — full teal card, matches duplicate logon-quote-card for Infinity Motion
 * Used in testimonial strip (both mobile + desktop) — same card as LogonExperience duplicate
 * Full teal background, primary-foreground text, quote, footer mono uppercase
 */
export function TealQuoteCard({ quote, author, role, className }: TealQuoteCardProps) {
  return (
    <figure
      className={cn(
        "flex flex-col justify-between gap-4 p-6 rounded-lg bg-primary text-primary-foreground min-h-[220px] min-w-[280px] max-w-[360px] w-[min(360px,86vw)] shrink-0 snap-start",
        "shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary-foreground",
        className
      )}
    >
      <Quote className="h-6 w-6 text-primary-foreground/80 shrink-0" aria-hidden="true" />
      <blockquote
        className="text-[1.35rem] leading-[1.25] text-balance"
        style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
      >
        “{quote}”
      </blockquote>
      {(author || role) && (
        <figcaption className="mt-auto pt-3 border-t border-primary-foreground/20 flex flex-col gap-0.5">
          {author && <span className="text-sm font-semibold text-primary-foreground">{author}</span>}
          {role && <span className="text-xs font-mono tracking-wide text-primary-foreground/80 uppercase">{role}</span>}
        </figcaption>
      )}
    </figure>
  );
}
