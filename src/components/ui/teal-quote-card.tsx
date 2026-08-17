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
 * TealQuoteCard — teal left border, quote mark, editorial body
 * Used in testimonial strip and other editorial sections
 */
export function TealQuoteCard({ quote, author, role, className }: TealQuoteCardProps) {
  return (
    <figure
      className={cn(
        "tq bg-card border border-border border-l-[4px] border-l-primary rounded-xl p-6 flex flex-col gap-4 min-w-[280px] max-w-[360px] snap-start shrink-0",
        "shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary",
        className
      )}
    >
      <Quote className="h-6 w-6 text-primary/70 shrink-0" aria-hidden="true" />
      <blockquote
        className="text-[15px] leading-relaxed text-foreground text-balance"
        style={{ fontFamily: "var(--font-editorial)" }}
      >
        “{quote}”
      </blockquote>
      {(author || role) && (
        <figcaption className="mt-auto pt-3 border-t border-border/60 flex flex-col">
          {author && <span className="text-sm font-semibold">{author}</span>}
          {role && <span className="text-xs font-mono tracking-wide text-muted-foreground">{role}</span>}
        </figcaption>
      )}
    </figure>
  );
}
