"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DictionaryWord {
  word: string;
  pos?: string;
  def: string;
}

interface DictionaryPillProps {
  words?: DictionaryWord[];
  className?: string;
}

const defaultWords: DictionaryWord[] = [
  { word: "AUTOMATE", pos: "verb", def: "to turn a manual process into a self-running system" },
  { word: "ORCHESTRATE", pos: "verb", def: "to coordinate tools and people into one flow" },
  { word: "AGENT", pos: "noun", def: "an AI that acts on your behalf, 24/7" },
  { word: "INTELLIGENCE", pos: "noun", def: "data turned into a decision you can trust" },
];

/**
 * DictionaryPill — full-width teal pills on mobile, inline on desktop
 * Each pill: teal background, white text, word + pos + definition
 * At <640: full-width stacked, at ≥640: inline wrap
 */
export function DictionaryPill({ words = defaultWords, className }: DictionaryPillProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center", className)}>
      {words.map((w) => (
        <div
          key={w.word}
          className={cn(
            "group w-full sm:w-auto flex-1 sm:flex-none",
            "bg-primary text-primary-foreground rounded-full",
            "px-5 py-3 sm:py-2.5 flex items-baseline gap-2 sm:gap-3",
            "min-h-[44px] flex-wrap sm:flex-nowrap",
            "hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "text-sm sm:text-[13px]"
          )}
          tabIndex={0}
          role="text"
        >
          <span className="font-mono font-bold tracking-widest text-xs sm:text-xs shrink-0" style={{ fontFamily: "var(--font-mono)" }}>
            {w.word}
          </span>
          {w.pos && (
            <span className="italic opacity-80 text-xs shrink-0" style={{ fontFamily: "var(--font-editorial)" }}>
              {w.pos}
            </span>
          )}
          <span className="opacity-95 leading-tight text-[13px] sm:text-xs font-normal">
            — {w.def}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Single pill for reuse inside other sections */
export function WordPill({ word, pos, def, className }: DictionaryWord & { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-mono tracking-wide min-h-[44px] focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
    >
      <strong>{word}</strong>
      {pos && <em className="opacity-80 font-normal">{pos}</em>}
      <span className="opacity-90">— {def}</span>
    </span>
  );
}
