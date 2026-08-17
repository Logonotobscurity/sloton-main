"use client";

import { useEffect, useMemo, useState } from "react";

import { testimonials } from "@/data/site";
import { AssistCard } from "@/components/studio/AssistCard";

/* ---------------------------------- Orb ---------------------------------- */

function Waveform({ bars = 9 }: { bars?: number }) {
  return (
    <div className="wave" aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} style={{ animationDelay: `${i * 90}ms` }} />
      ))}
    </div>
  );
}

function Orb() {
  return (
    <div className="orb-wrap">
      <svg className="orb" viewBox="0 0 220 220" role="img" aria-label="Agentic commerce orb">
        <defs>
          <path id="orb-circle" d="M110,110 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" />
        </defs>
        <circle cx="110" cy="110" r="62" className="orb-core" />
        <circle cx="110" cy="110" r="84" className="orb-ring" />
        <g className="orb-spin">
          <text className="orb-text">
            <textPath href="#orb-circle" startOffset="0%">
              DISCOVERABLE · RECOMMENDABLE · TRANSACTABLE · DISCOVERABLE · RECOMMENDABLE · TRANSACTABLE ·
            </textPath>
          </text>
        </g>
      </svg>
      <Waveform />
    </div>
  );
}

/* ----------------------------- Testimonials ------------------------------ */

function TestimonialStrip() {
  // Infinity Motion like IdeasLab — triple, linear, across all screens
  const duplicated = [...testimonials, ...testimonials, ...testimonials];
  return (
    <div className="relative overflow-hidden mt-8">
      <div className="overflow-hidden">
        {/* Use motion for infinite like IdeasLab */}
        <div className="flex gap-4 w-max will-change-transform motion-safe:animate-infinite-scroll">
          {duplicated.map((t, i) => (
            <blockquote key={`${t.name}-${i}`} className="tq bg-primary text-primary-foreground min-h-[220px] min-w-[280px] max-w-[360px] w-[min(360px,86vw)] shrink-0 rounded-lg p-6 flex flex-col justify-between">
              <p className="text-[1.35rem] leading-[1.25]" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                “{t.quote}”
              </p>
              <footer className="mt-auto pt-3 border-t border-primary-foreground/20 grid gap-0.5 font-mono text-xs uppercase">
                <strong>{t.name}</strong>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none hidden md:block" aria-hidden="true" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none hidden md:block" />
      <style>{`@keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(-33.333%); } } .motion-safe\\:animate-infinite-scroll { animation: infinite-scroll 30s linear infinite; } @media (prefers-reduced-motion: reduce) { .motion-safe\\:animate-infinite-scroll { animation: none; overflow-x: auto; } }`}</style>
    </div>
  );
}

/* --------------------------- Dictionary pills ---------------------------- */

const dictionary = [
  "AEO",
  "GEO",
  "Agentic checkout",
  "Knowledge graph",
  "Structured content",
  "MCP",
  "Share of voice",
  "Trust signals",
  "Feed hygiene",
  "Citation rate",
];

function DictionaryPills() {
  return (
    <ul className="dict-row">
      {dictionary.map((w) => (
        <li key={w} className="dict-pill">
          {w}
        </li>
      ))}
    </ul>
  );
}

/* ----------------------------- Snippet card ------------------------------ */

const snippet = `{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Signature Blend",
  "offers": {
    "@type": "Offer",
    "price": "24.00",
    "availability": "InStock"
  }
}`;

function SnippetCard() {
  return (
    <article className="snip-card">
      <header className="snip-head">
        <span className="snip-dot" aria-hidden="true" />
        product.jsonld
      </header>
      <pre className="snip-body">
        <code>{snippet}</code>
      </pre>
    </article>
  );
}

/* --------------------------- Category pills ------------------------------ */

const categories = [
  {
    id: "audit",
    label: "Audit",
    title: "See how agents read you today",
    body: "We benchmark your visibility across ChatGPT, Gemini, Perplexity and Copilot, then map every gap to a fix with an owner and a date.",
  },
  {
    id: "graph",
    label: "Knowledge graph",
    title: "One canonical truth for every agent",
    body: "Entities, relationships and structured data that assistants can quote without hallucinating your catalogue or your policies.",
  },
  {
    id: "content",
    label: "Content",
    title: "Answers written to be cited",
    body: "Question-shaped content with schema, sources and freshness signals so your brand is the paragraph the model repeats.",
  },
  {
    id: "checkout",
    label: "Checkout",
    title: "Transactable inside the conversation",
    body: "Feeds, protocols and payment rails wired so an agent can complete the purchase without sending the buyer back to a browser.",
  },
];

function CategoryPanel({
  active,
  setActive,
}: {
  active: string;
  setActive: (id: string) => void;
}) {
  const first = categories[0]!;
  const [fading, setFading] = useState(false);
  const [shown, setShown] = useState(active);

  useEffect(() => {
    if (active === shown) return;
    setFading(true);
    const t = setTimeout(() => {
      setShown(active);
      setFading(false);
    }, 180);
    return () => clearTimeout(t);
  }, [active, shown]);

  const panel = useMemo(() => categories.find((c) => c.id === shown) ?? first, [shown, first]);

  return (
    <div className="cat-block">
      <div className="cat-pills" role="tablist" aria-label="Capabilities">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            id={`cat-tab-${c.id}`}
            aria-selected={active === c.id}
            aria-controls="cat-panel"
            className={`cat-pill${active === c.id ? " is-active" : ""}`}
            onClick={() => setActive(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div
        id="cat-panel"
        role="tabpanel"
        aria-labelledby={`cat-tab-${panel.id}`}
        className={`cat-panel${fading ? " is-fading" : ""}`}
      >
        <h3>{panel.title}</h3>
        <p>{panel.body}</p>
      </div>
    </div>
  );
}

/* ------------------------------- Section --------------------------------- */

export function StudioSection() {
  const first = categories[0]!;
  const [active, setActive] = useState(first.id);
  const activeCat = categories.find((c) => c.id === active) ?? first;

  return (
    <section className="studio work-section" aria-labelledby="studio-heading">
      <div className="studio-inner">
        <p className="studio-eyebrow">The studio</p>
        <div className="studio-hero">
          <div className="studio-hero-copy">
            <h2 id="studio-heading" className="studio-title">
              Built to be quoted by machines
            </h2>
            <p className="studio-lead">
              A working view of the system behind every engagement — the language, the markup and the moments where an
              assistant decides whether to name you.
            </p>
          </div>
          <Orb />
        </div>

        <DictionaryPills />

        <div className="studio-grid">
          <CategoryPanel active={active} setActive={setActive} />
          <div className="studio-stack">
            <SnippetCard />
            <AssistCard category={activeCat.label} categoryBrief={`${activeCat.title}. ${activeCat.body}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
