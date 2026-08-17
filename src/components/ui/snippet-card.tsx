"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, Terminal } from "lucide-react";

interface SnippetProps {
  title?: string;
  language?: string;
  code: string;
  caption?: string;
  className?: string;
}

/**
 * SnippetCard — dark card for code snippet library
 * - Dark bg (foreground), light text, teal accent top border
 * - Copy button 44px, focus ring, success state
 * - Monospace code, horizontal scroll, no overflow at 375
 */
export function SnippetCard({ title = "AI Agent — RAG Assistant", language = "typescript", code, caption, className }: SnippetProps) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-foreground text-background",
        "border-foreground shadow-lg",
        "flex flex-col",
        className
      )}
    >
      {/* Teal accent top */}
      <div className="h-1 w-full bg-primary" aria-hidden="true" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          <Terminal className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
          <p className="font-mono text-xs tracking-wide text-white/80 truncate">{title}</p>
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono tracking-wide text-white/70 border border-white/10">
            {language}
          </span>
        </div>
        <button
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="shrink-0 inline-flex items-center gap-1.5 min-h-[44px] min-w-[44px] justify-center px-3 rounded-md bg-white/10 hover:bg-white/15 text-white border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
        >
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
          <span className="hidden sm:inline text-xs font-mono">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Code */}
      <div className="relative overflow-x-auto">
        <pre className="text-xs sm:text-sm leading-relaxed p-4 sm:p-5 font-mono text-white/90 whitespace-pre overflow-x-auto max-w-full">
          <code>{code}</code>
        </pre>
      </div>

      {caption && (
        <div className="px-4 sm:px-5 py-3 bg-white/[0.04] border-t border-white/10">
          <p className="text-xs font-mono tracking-wide text-white/60">{caption}</p>
        </div>
      )}
    </div>
  );
}

export const defaultSnippet = `// Ask your docs — LOG_ON RAG
import { rag } from '@/lib/rag';

const answer = await rag.ask({
  question: "How do I automate invoicing?",
  context: await rag.load(["./docs/invoicing.md", "./ops/runbook.md"]),
  threadId: localStorage.getItem("logon-chat-thread-id"),
});

// → XSS-safe rendering via SafeMessage (never innerHTML)
return <SafeMessage content={answer} />;`;
