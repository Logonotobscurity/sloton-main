"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Check, Terminal } from "lucide-react";

const pillWords = ["AUTOMATE", "ORCHESTRATE", "AGENT", "INTELLIGENCE"];

const categories = [
  { id: "automate", label: "AUTOMATE", title: "Hands-free invoicing", desc: "From spreadsheets to self-running workflows.", stat: "2.5d → 20m", statLabel: "per close" },
  { id: "orchestrate", label: "ORCHESTRATE", title: "One flow across tools", desc: "Slack, Sheets, CRM become one auditable flow.", stat: "5 → 1", statLabel: "flow" },
  { id: "agent", label: "AGENT", title: "AI from your docs", desc: "RAG assistant that cites your runbooks, 24/7.", stat: "70%", statLabel: "auto-resolved" },
];

export function LogonExperience() {
  const [active, setActive] = useState(categories[0]);
  const [copied, setCopied] = useState(false);
  const code = `// LOG_ON — automate
const flow = await automate({
  trigger: "invoice.uploaded",
  steps: ["extract","validate","post"],
  threadId: getThreadId(),
});`;

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
        {/* Hero row — copy + orb */}
        <div className="logon-hero-row">
          <div className="logon-copy">
            <p className="logon-kicker">Connecting Advantages • Delivering Results</p>
            <h2>
              Do More <br />
              with Less
              <br />
              <span style={{ color: "hsl(var(--primary))" }}>for Growth.</span>
            </h2>
            <p>We build AI agents and automation that turn manual work into growth for Nigerian businesses.</p>
            <div className="logon-actions">
              <Button asChild size="large" variant="primary" className="logon-cta">
                <Link href="/contact">Get Your Free Efficiency Assessment</Link>
              </Button>
              <Button asChild size="large" variant="outline" className="logon-cta">
                <Link href="/solutions">Explore Solutions</Link>
              </Button>
            </div>
          </div>

          <div className="logon-orb" aria-hidden="true">
            <svg className="logon-orb-svg" viewBox="0 0 200 200">
              <defs>
                <path id="logon-circle" d="M100,100 m -72,0 a72,72 0 1,0 144,0 a72,72 0 1,0 -144,0" />
              </defs>
              <text fontSize="8" letterSpacing="1.2">
                <textPath href="#logon-circle">LOG_ON • CONNECTING ADVANTAGES • AI AUTOMATION • </textPath>
              </text>
            </svg>
            <div className="logon-orb-core">
              LOG<span><strong>O</strong></span>N
            </div>
            <div className="logon-wave-bars" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} style={{ ["--i" as any]: i } as React.CSSProperties} />
              ))}
            </div>
          </div>
        </div>

        {/* Pill block — full-bleed teal */}
        <div className="logon-pill-block" role="list" aria-label="Core verbs">
          {pillWords.map((w) => (
            <span key={w} role="listitem">
              {w}
            </span>
          ))}
        </div>


        {/* Feature grid — snippet + AI card */}
        <div className="logon-feature-grid">
          <div className="logon-snippet-card">
            <div className="logon-card-head">
              <Terminal className="h-4 w-4" aria-hidden="true" />
              <span>RAG Assistant • snippet</span>
              <button
                onClick={onCopy}
                className="ml-auto inline-flex items-center gap-1 text-xs border border-white/20 rounded-full px-2 py-1 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
          </div>

          <div className="logon-ai-card">
            <div>
              <p className="logon-kicker" style={{ marginBottom: 10 }}>
                Not sure yet?
              </p>
              <h3>Still not sure LOG_ON is right for you?</h3>
              <p>You don&apos;t need to figure everything out alone. Ask an AI assistant to explore LOG_ON with you.</p>
            </div>
            <div className="logon-ai-buttons">
              <a href="https://chatgpt.com/?q=Is%20LOG_ON%20right%20for%20my%20business" target="_blank" rel="noopener noreferrer" className="logon-lavender-btn">
                Ask ChatGPT <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="https://claude.ai/new?q=Is%20LOG_ON%20right%20for%20my%20business" target="_blank" rel="noopener noreferrer" className="logon-lavender-btn">
                Ask Claude <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="https://www.perplexity.ai/search?q=Is%20LOG_ON%20right%20for%20my%20business" target="_blank" rel="noopener noreferrer" className="logon-lavender-btn">
                Ask Perplexity <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Category panel — persona pills */}
        <div className="logon-category-panel">
          <div className="logon-category-controls" role="tablist" aria-label="Categories">
            {categories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={active.id === c.id}
                className={active.id === c.id ? "active" : ""}
                onClick={() => setActive(c)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="logon-feature-panel">
            <div>
              <h3>{active.title}</h3>
              <p>{active.desc}</p>
              <div className="logon-persona-row">
                <button>SME</button>
                <button>STARTUP</button>
                <button>ENTERPRISE</button>
              </div>
            </div>
            <p className="hidden sm:block text-sm text-muted-foreground max-w-[28ch]">{active.desc}</p>
            <div className="logon-panel-stat">
              <strong>{active.stat}</strong>
              <span>{active.statLabel}</span>
            </div>
          </div>
        </div>

        {/* Unsure — pre-footer decision support (matches DecisionSupportSection) */}
        <div className="logon-unsure">
          <p className="logon-kicker">Not sure yet?</p>
          <h2>Still not sure LOG_ON is right for you?</h2>
          <p>You don&apos;t need to figure everything out alone. Ask an AI assistant to help you understand whether LOG_ON fits your needs, workflow, or situation.</p>
          <div className="logon-ai-buttons">
            <a className="logon-lavender-btn" href="https://chatgpt.com/?q=LOG_ON" target="_blank" rel="noopener noreferrer">
              Ask ChatGPT
            </a>
            <a className="logon-lavender-btn" href="https://claude.ai/new?q=LOG_ON" target="_blank" rel="noopener noreferrer">
              Ask Claude
            </a>
            <a className="logon-lavender-btn" href="https://www.perplexity.ai/search?q=LOG_ON" target="_blank" rel="noopener noreferrer">
              Ask Perplexity
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogonExperience;
