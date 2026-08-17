"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Feature {
  id: string;
  pill: string;
  title: string;
  description: string;
  points: string[];
  cta: { label: string; href: string };
  aspect?: string;
}

const defaultFeatures: Feature[] = [
  {
    id: "automate",
    pill: "AUTOMATE",
    title: "Hands-free invoicing, reconciliation, and reporting",
    description:
      "From spreadsheets to self-running workflows. We map your process, then automate the busywork so your team focuses on growth.",
    points: ["2.5 days → 20 mins per close", "99.2% data accuracy", "Audit-ready logs"],
    cta: { label: "Explore Automation", href: "/automation" },
    aspect: "aspect-[4/3]",
  },
  {
    id: "orchestrate",
    pill: "ORCHESTRATE",
    title: "One flow across Slack, Sheets, and your CRM",
    description:
      "No more tab-hopping. We connect your tools into a single orchestrated flow with human-in-the-loop where it matters.",
    points: ["5 tools → 1 flow", "Human approval gates", "Real-time status"],
    cta: { label: "See Orchestration", href: "/solutions" },
    aspect: "aspect-[4/3]",
  },
  {
    id: "agent",
    pill: "AGENT",
    title: "AI that answers from your own docs, 24/7",
    description:
      "Deploy a RAG assistant that cites your runbooks and policies — not the public web. Safe, private, and always on.",
    points: ["70% tickets auto-resolved", "Cited answers", "Thread-persistent memory"],
    cta: { label: "Meet AI Agents", href: "/ai-solutions" },
    aspect: "aspect-[4/3]",
  },
];

interface FeaturePanelProps {
  features?: Feature[];
  className?: string;
}

/**
 * FeaturePanel — category pills update feature panel with fade transition
 * - Pills: full-width stacked <640, wrap ≥640, 44px, focus rings
 * - Panel: fade (opacity + translate) on pill change, respects prefers-reduced-motion
 * - Works at 375, 768, 1280
 */
export function FeaturePanel({ features = defaultFeatures, className }: FeaturePanelProps) {
  const [activeId, setActiveId] = React.useState(features[0]?.id ?? "");
  const [fading, setFading] = React.useState(false);
  const active = features.find((f) => f.id === activeId) ?? features[0];

  const handleSelect = (id: string) => {
    if (id === activeId) return;
    setFading(true);
    window.setTimeout(() => {
      setActiveId(id);
      setFading(false);
    }, 160);
  };

  return (
    <section className={cn("section-fluid bg-background", className)} aria-label="Feature showcase">
      <div className="container-fluid">
        {/* Pills — persona pills scale down and stay tappable on mobile */}
        <div
          role="tablist"
          aria-label="Feature categories"
          className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-3 max-w-3xl mx-auto mb-8"
        >
          {features.map((f) => {
            const isActive = f.id === activeId;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`feature-panel-${f.id}`}
                onClick={() => handleSelect(f.id)}
                className={cn(
                  "w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-full border text-sm font-mono tracking-wide font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-foreground border-border hover:border-primary/30 hover:bg-primary/5"
                )}
              >
                {f.pill}
              </button>
            );
          })}
        </div>

        {/* Panel — fade transition */}
        <div
          id={`feature-panel-${active.id}`}
          role="tabpanel"
          aria-live="polite"
          className={cn(
            "max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-10 items-center",
            "bg-card border border-border rounded-2xl p-6 sm:p-8 lg:p-10",
            "shadow-sm transition-all duration-200",
            fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
            "motion-reduce:transition-none"
          )}
        >
          <div className="space-y-4">
            <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono tracking-widest text-primary">
              {active.pill} • FEATURE
            </div>
            <h3
              className="text-2xl sm:text-3xl font-bold leading-tight text-balance"
              style={{ fontFamily: "var(--font-editorial)" }}
            >
              {active.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-balance">{active.description}</p>
            <ul className="space-y-2 pt-2">
              {active.points.map((pt) => (
                <li key={pt} className="flex gap-2 items-start text-sm">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-4 rounded-full min-h-[44px]">
              <Link href={active.cta.href}>
                {active.cta.label} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* Aspect visual — snippet / placeholder */}
          <div
            className={cn(
              "relative rounded-xl overflow-hidden border bg-foreground text-background p-5 sm:p-6",
              "min-h-[260px] flex flex-col justify-center",
              active.aspect
            )}
          >
            <div className="h-1 w-full bg-primary absolute top-0 left-0" aria-hidden="true" />
            <p className="font-mono text-xs tracking-wide text-white/60 mb-3">PREVIEW • {active.pill}</p>
            <div className="font-mono text-sm leading-relaxed text-white/90 whitespace-pre-wrap">
              {`// ${active.pill} — LOG_ON
const flow = await automate({
  trigger: "invoice.uploaded",
  steps: ["extract", "validate", "post"],
  threadId: getThreadId(), // persisted
});`}
            </div>
            <div className="mt-4 text-xs font-mono text-white/50">Cited from your docs • XSS-safe render</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturePanel;
