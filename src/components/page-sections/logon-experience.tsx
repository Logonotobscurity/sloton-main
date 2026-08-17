"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { PulseButton } from "@/components/ui/pulse-button";

/**
 * LogonExperience — trimmed to RAG/Snippet aspect only
 * Hero/orb and the two "still not sure" sections removed per request.
 * Now showcases LOGON Agentic SEO / EGO / GEO Visibility as a service.
 */
export function LogonExperience() {
  const [copied, setCopied] = useState(false);
  const code = `// LOG_ON — Agentic SEO & GEO Visibility
import { seoVisibility } from '@/lib/seo';

const audit = await seoVisibility.run({
  domain: "yourbusiness.com",
  services: ["agentic SEO", "EGO", "GEO", "technical SEO"],
  threadId: getThreadId(), // persisted per thread
  // → checks EGO signals, GEO citations, agentic discoverability
});

return <VisibilityReport data={audit} />;`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="logon-experience">
      <div className="logon-shell">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="logon-kicker">Agentic Visibility • EGO • GEO • SEO</p>
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl sm:text-4xl font-bold leading-tight text-balance">
            LOGON Agentic SEO — be discoverable everywhere agents look
          </h2>
          <p className="mt-4 text-muted-foreground text-balance max-w-2xl mx-auto">
            We offer <strong>Agentic SEO</strong>, <strong>EGO (Entity Graph Optimization)</strong>, <strong>GEO (Generative Engine Optimization)</strong> and technical SEO as services — so your business is visible in search, in LLMs, and in agent workflows.
          </p>
        </div>

        <div className="logon-snippet-card max-w-3xl mx-auto">
          <div className="logon-card-head">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            <span>Agentic Visibility • snippet</span>
            <button
              onClick={onCopy}
              className="ml-auto inline-flex items-center gap-1 text-xs border border-white/20 rounded-full px-3 py-1.5 min-h-[44px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={copied ? "Copied" : "Copy code"}
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <code>
            <span>1</span>
            <span>{code}</span>
          </code>
          <p className="text-xs font-mono tracking-wide text-white/60">
            XSS-safe render via SafeMessage • Thread-ID persisted per conversation
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <PulseButton
            onClick={() => (window.location.href = "/contact")}
            aria-label="Check your agentic visibility"
            className="w-full sm:w-auto"
          >
            Check your Agentic Visibility
          </PulseButton>
        </div>
      </div>
    </div>
  );
}

export default LogonExperience;
