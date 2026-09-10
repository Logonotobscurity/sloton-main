"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { AUTHORITY } from "@/lib/insight-authority";

export type ArticleSection = {
  id: string;
  title: string;
  inShort: string;
  paragraphs: string[];
  bullets?: string[];
};

export type StructuredInsight = {
  clusterLabel: string;
  clusterHref: string;
  kind: string;
  title: string;
  shortTitle?: string;
  pronunciation?: string;
  definition: string;
  alsoKnownAs?: string[];
  category?: string;
  coined?: string;
  coinedBy?: string;
  published: string;
  updated: string;
  readingTime: string;
  tldr: string;
  contexts?: { label: string; quote: string }[];
  relatedTerms?: { label: string; href: string }[];
  keyPoints: string[];
  sections: ArticleSection[];
  faqs: { q: string; a: string }[];
  sources?: { title: string; href?: string; note?: string }[];
  next?: { title: string; href: string };
};

function daysAgo(iso: string) {
  const then = new Date(iso).getTime();
  const days = Math.max(0, Math.round((Date.now() - then) / 86400000));
  return `${days}d ago`;
}

export function InsightArticleLayout({
  doc,
  children,
}: {
  doc: StructuredInsight;
  children?: ReactNode;
}) {
  const a = AUTHORITY;
  return (
    <article className="max-w-3xl">
      <nav className="text-sm text-muted-foreground mb-6 flex flex-wrap gap-x-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/insights" className="hover:text-primary">Insights</Link>
        <span>/</span>
        <Link href={doc.clusterHref} className="hover:text-primary">{doc.clusterLabel}</Link>
        <span>/</span>
        <span className="text-foreground">{doc.shortTitle || doc.title}</span>
      </nav>

      <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
        {doc.clusterLabel} · {doc.kind} · Last reviewed: {doc.updated} · {daysAgo(doc.updated)}
      </p>

      <h1 className="mt-3 text-4xl md:text-5xl font-headline">{doc.shortTitle || doc.title}</h1>
      {doc.pronunciation ? (
        <p className="mt-2 font-mono text-sm text-muted-foreground">{doc.pronunciation}</p>
      ) : null}

      <p className="mt-6 text-xl leading-relaxed">{doc.definition}</p>
      {doc.alsoKnownAs?.length ? (
        <p className="mt-3 text-sm text-muted-foreground">
          <strong className="text-foreground">Also known as: </strong>
          {doc.alsoKnownAs.join(" · ")}
        </p>
      ) : null}

      <dl className="mt-8 grid sm:grid-cols-2 gap-3 text-sm border border-border rounded-2xl p-4">
        <div>
          <dt className="text-muted-foreground">Category</dt>
          <dd className="font-semibold">{doc.category || "Artificial Intelligence"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Reading time</dt>
          <dd className="font-semibold">{doc.readingTime}</dd>
        </div>
        {doc.coined ? (
          <div className="sm:col-span-2">
            <dt className="text-muted-foreground">First coined</dt>
            <dd>{doc.coined}</dd>
          </div>
        ) : null}
        {doc.coinedBy ? (
          <div className="sm:col-span-2">
            <dt className="text-muted-foreground">Coined by</dt>
            <dd>{doc.coinedBy}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-muted-foreground">Last reviewed</dt>
          <dd className="font-semibold">{doc.updated}</dd>
        </div>
      </dl>

      <section className="mt-10 rounded-2xl border-l-4 border-primary bg-secondary/30 p-6">
        <p className="text-[11px] uppercase tracking-widest text-primary font-semibold">TL;DR · Quick answer · Cited by AI</p>
        <blockquote className="mt-3 text-lg leading-relaxed font-medium">“{doc.tldr}”</blockquote>
      </section>

      <div className="mt-6 flex flex-wrap gap-6 text-sm">
        <p>
          <span className="text-muted-foreground">Written by </span>
          <a href={a.author.linkedin} className="font-semibold text-primary hover:underline" target="_blank" rel="noreferrer">
            {a.author.name}
          </a>
        </p>
        <p>
          <span className="text-muted-foreground">Reviewed by </span>
          <span className="font-semibold">{a.reviewer.name}</span>
        </p>
        <p className="text-muted-foreground">
          Published {doc.published} · Updated {doc.updated}
        </p>
      </div>

      {doc.contexts?.length ? (
        <section className="mt-10">
          <h2 className="text-xl font-headline">In context</h2>
          <div className="mt-4 grid gap-4">
            {doc.contexts.map((c) => (
              <figure key={c.label} className="rounded-xl border border-border p-4">
                <figcaption className="text-sm font-semibold">{c.label}</figcaption>
                <blockquote className="mt-2 text-sm text-muted-foreground italic">“{c.quote}”</blockquote>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {doc.relatedTerms?.length ? (
        <p className="mt-8 text-sm">
          <strong>Related terms: </strong>
          {doc.relatedTerms.map((t, i) => (
            <span key={t.href}>
              {i > 0 ? " · " : ""}
              <Link href={t.href} className="text-primary hover:underline">
                {t.label}
              </Link>
            </span>
          ))}
        </p>
      ) : null}

      <section className="mt-10">
        <h2 className="text-xl font-headline">Key points</h2>
        <ol className="mt-4 space-y-3">
          {doc.keyPoints.map((p, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-mono text-primary text-sm">{String(i + 1).padStart(2, "0")}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </section>

      <nav className="mt-10 rounded-xl border border-border p-4 text-sm">
        <p className="font-semibold mb-2">Contents</p>
        <ol className="space-y-1">
          {doc.sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-primary hover:underline">
                {String(i + 1).padStart(2, "0")} {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {doc.sections.map((s, i) => (
        <section key={s.id} id={s.id} className="mt-14">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {String(i + 1).padStart(2, "0")} / {String(doc.sections.length).padStart(2, "0")} Section
          </p>
          <h2 className="mt-1 text-2xl font-headline">{s.title}</h2>
          <p className="mt-3 text-sm font-semibold text-primary">In short</p>
          <p className="mt-1 text-muted-foreground">{s.inShort}</p>
          {s.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="mt-4 leading-relaxed">
              {p}
            </p>
          ))}
          {s.bullets?.length ? (
            <ul className="mt-4 list-disc pl-5 space-y-2">
              {s.bullets.map((b) => (
                <li key={b.slice(0, 40)}>{b}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      {children ? (
        <section id="full-essay" className="mt-14 prose dark:prose-invert max-w-none">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Essay</p>
          <h2 className="mt-1 text-2xl font-headline">Full essay</h2>
          {children}
        </section>
      ) : null}

      <section className="mt-16 rounded-2xl border border-primary/30 bg-primary/5 p-6">
        <p className="text-sm font-semibold">{a.brand} practitioner team</p>
        <h2 className="mt-2 text-2xl font-headline">Ready to apply this in your organisation?</h2>
        <p className="mt-2 text-muted-foreground">
          {a.brand} ships production AI agents, automation, and AI-search work — with governance, observability, and human-in-the-loop — from Lagos for African and global operators.
        </p>
        <Link
          href={a.contactHref}
          className="mt-4 inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-primary-foreground font-semibold"
        >
          Talk to an agent engineer
        </Link>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-headline">About the authors &amp; reviewers</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Published {doc.published} · Updated {doc.updated}
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Written by</p>
            <a href={a.author.linkedin} className="mt-1 block text-lg font-semibold text-primary hover:underline" target="_blank" rel="noreferrer">
              {a.author.name}
            </a>
            <p className="text-sm text-primary">{a.author.role}</p>
            <p className="mt-3 text-sm text-muted-foreground">{a.author.blurb}</p>
            <ul className="mt-3 text-sm space-y-1">
              {a.author.points.map((p) => (
                <li key={p}>· {p}</li>
              ))}
            </ul>
            <a href={a.author.linkedin} className="mt-3 inline-block text-sm font-semibold text-primary" target="_blank" rel="noreferrer">
              View profile
            </a>
          </div>
          <div className="rounded-xl border border-border p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Reviewed by · {doc.updated}</p>
            <p className="mt-1 text-lg font-semibold">{a.reviewer.name}</p>
            <p className="text-sm text-primary">{a.reviewer.role}</p>
            <p className="mt-3 text-sm text-muted-foreground">{a.reviewer.blurb}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              Reviewed for technical accuracy and source integrity. Claims are LOG_ON delivery records or cited public sources.
            </p>
          </div>
        </div>
      </section>

      {doc.faqs.length ? (
        <section className="mt-16">
          <h2 className="text-2xl font-headline">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-border border border-border rounded-xl">
            {doc.faqs.map((f) => (
              <details key={f.q} className="p-4 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between gap-4">
                  {f.q}
                  <span className="text-muted-foreground">▾</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {doc.next ? (
        <p className="mt-10">
          <span className="text-sm text-muted-foreground">Next in {doc.clusterLabel} · </span>
          <Link href={doc.next.href} className="font-semibold text-primary hover:underline">
            {doc.next.title}
          </Link>
        </p>
      ) : null}

      {doc.sources?.length ? (
        <section className="mt-12">
          <h2 className="text-xl font-headline">Sources</h2>
          <ol className="mt-3 list-decimal pl-5 space-y-2 text-sm">
            {doc.sources.map((s) => (
              <li key={s.title}>
                {s.href ? (
                  <a href={s.href} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                    {s.title}
                  </a>
                ) : (
                  s.title
                )}
                {s.note ? <span className="text-muted-foreground"> {s.note}</span> : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <p className="mt-10 text-xs text-muted-foreground">Next scheduled review: 90 days from last review.</p>

      <section className="mt-8 rounded-2xl bg-foreground text-background p-6">
        <p className="text-sm opacity-80">{a.brand} practitioner team</p>
        <h2 className="mt-1 text-2xl font-headline">Talk to the team that ships the work</h2>
        <p className="mt-2 text-sm opacity-80">
          30-minute discovery. No slide deck — a scoping conversation. The practice usually replies within one Lagos business day.
        </p>
        <Link href={a.contactHref} className="mt-4 inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-primary-foreground font-semibold">
          Book a discovery call
        </Link>
      </section>
    </article>
  );
}
