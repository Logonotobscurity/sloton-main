"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { insights } from "@/lib/data/insights";
import { CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { GlowingCard } from "@/components/ui/glowing-card";
import { NotesColumn } from "@/components/chronicle/NotesColumn";
import { NewsColumn } from "@/components/chronicle/NewsColumn";
import { VideosColumn } from "@/components/chronicle/VideosColumn";
import { ArticleCodeVisual } from "@/components/ui/article-code-visual";
import { fadeInUp, staggerContainerCustom } from "@/lib/animation-variants";
import {
  insightsHubHero,
  insightsHubLatest,
  insightsHubPillars,
} from "@/lib/data/insights-hub";

export default function InsightsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"hub" | "chronicle" | "grid">("hub");

  const filteredInsights = insights.filter((insight) => {
    const matchesSearch =
      searchTerm === "" ||
      insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopic === null || insight.tags.includes(selectedTopic);
    return matchesSearch && matchesTopic;
  });

  const latestLive = insights.slice(0, 12);
  const showLibrary = viewMode === "grid" || searchTerm || selectedTopic;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <header className="mb-12 border-b border-border pb-10">
          <p className="verdara-kicker">
            {insightsHubHero.kicker}
          </p>
          <h1 className="verdara-title mt-3 max-w-5xl">
            {insightsHubHero.headline}
          </h1>
          <p className="verdara-lede mt-4 text-lg">{insightsHubHero.subheadline}</p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <Link
              href={insightsHubHero.editorPick.href}
              className="group rounded-2xl border border-border bg-secondary/30 p-6 md:p-8 hover:border-primary/40 transition-colors"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Editor&apos;s pick</p>
              <h2 className="mt-3 text-2xl md:text-3xl font-headline">{insightsHubHero.editorPick.title}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{insightsHubHero.editorPick.pitch}</p>
              <span className="mt-4 inline-flex items-center font-semibold text-primary">
                Read the playbook <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <dl className="grid grid-cols-3 lg:grid-cols-1 gap-3">
              {[
                { value: String(insights.length), label: "Articles live" },
                { value: "15", label: "Topics" },
                { value: "90d", label: "Review cycle" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border p-4">
                  <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">{stat.label}</dt>
                  <dd className="mt-1 text-3xl font-headline text-primary">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 bg-secondary/30 border-border/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["hub", "chronicle", "grid"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 text-sm rounded-md capitalize transition-colors min-h-11 ${
                    viewMode === mode
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label="Filter by topic">
            <button
              type="button"
              onClick={() => setSelectedTopic(null)}
              aria-pressed={selectedTopic === null}
              className={`inline-flex items-center rounded-full border px-3 min-h-11 text-sm font-medium ${
                selectedTopic === null
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-background text-foreground hover:bg-secondary/50"
              }`}
            >
              All
            </button>
            {["AI", "Automation", "SEO", "Training", "Security"].map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                aria-pressed={selectedTopic === topic}
                className={`inline-flex items-center rounded-full border px-3 min-h-11 text-sm font-medium ${
                  selectedTopic === topic
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border bg-background text-foreground hover:bg-secondary/50"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </header>

        {viewMode === "hub" && !searchTerm && !selectedTopic && (
          <div className="space-y-20">
            <section>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Latest</p>
              <h2 className="mt-2 text-3xl font-headline">Fresh from the research desk</h2>
              <div className="mt-8 verdara-grid verdara-grid-2">
                {insightsHubLatest.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="verdara-card"
                  >
                    {item.kind ? (
                      <span className="text-[10px] uppercase tracking-widest text-primary">{item.kind}</span>
                    ) : null}
                    <h3 className="mt-2 font-semibold text-lg leading-snug">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Link href="/insights/ai-search" className="text-primary font-semibold hover:underline">AI Search &amp; LLMO →</Link>
                <Link href="/insights/ai-seo" className="text-primary font-semibold hover:underline">AI SEO →</Link>
                <Link href="/insights/ai-agents" className="text-primary font-semibold hover:underline">AI Agents →</Link>
                <Link href="/insights/ai-functions" className="text-primary font-semibold hover:underline">AI for Business Functions →</Link>
                <Link href="/insights/generative-ai" className="text-primary font-semibold hover:underline">Generative AI →</Link>
                <Link href="/insights/ai-strategy" className="text-primary font-semibold hover:underline">AI Strategy →</Link>
                <Link href="/insights/ai-implementation" className="text-primary font-semibold hover:underline">Implementation →</Link>
                <Link href="/insights/ai-automation" className="text-primary font-semibold hover:underline">Automation →</Link>
                <Link href="/insights/ai-governance" className="text-primary font-semibold hover:underline">Governance →</Link>
                <Link href="/insights/ai-consulting" className="text-primary font-semibold hover:underline">Consulting →</Link>
                <Link href="/insights/ai-nigeria" className="text-primary font-semibold hover:underline">Nigeria &amp; Africa →</Link>
              </div>
              <ol className="mt-8 divide-y divide-border rounded-2xl border border-border">
                {latestLive.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/insights/${item.slug}`} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 p-4 hover:bg-primary/5">
                      <span className="text-xs font-mono text-muted-foreground shrink-0 w-28">{item.date}</span>
                      <span className="font-semibold flex-1">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>

            {insightsHubPillars.map((pillar) => (
              <section key={pillar.index} id={pillar.name.toLowerCase().replace(/\s+/g, "-")}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                  {pillar.index} — {pillar.name}
                </p>
                <h2 className="mt-2 text-3xl font-headline">{pillar.name}</h2>
                <p className="mt-3 max-w-3xl text-muted-foreground">{pillar.intro}</p>
                <div className="mt-8 space-y-10">
                  {pillar.categories.map((cat) => (
                    <div key={cat.name}>
                      <h3 className="text-xl font-headline">{cat.name}</h3>
                      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{cat.description}</p>
                      <ul className="mt-4 grid gap-3 md:grid-cols-2">
                        {cat.articles.map((article) => (
                          <li key={article.title}>
                            <Link
                              href={article.href}
                              className="block h-full rounded-xl border border-border/80 p-4 hover:border-primary/40"
                            >
                              <span className="font-semibold">{article.title}</span>
                              <p className="mt-2 text-sm text-muted-foreground">{article.summary}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {viewMode === "chronicle" && !searchTerm && !selectedTopic && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            variants={staggerContainerCustom(0.1, 0)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <NotesColumn />
            </motion.div>
            <motion.div variants={fadeInUp} className="lg:col-span-6">
              <NewsColumn />
            </motion.div>
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <VideosColumn />
            </motion.div>
          </motion.div>
        )}

        {showLibrary && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInsights.map((insight) => (
                <GlowingCard key={insight.slug}>
                  <Link href={`/insights/${insight.slug}`} className="block h-full">
                    <div className="flex flex-col h-full">
                      <CardHeader className="p-0">
                        <div
                          data-ai-hint={insight.dataAiHint}
                          className="overflow-hidden rounded-t-xl relative h-48"
                        >
                          {insight.codeVisualType ? (
                            <ArticleCodeVisual
                              type={insight.codeVisualType}
                              className="h-full w-full rounded-none border-0"
                              animated={false}
                            />
                          ) : (
                            <Image
                              src={insight.image}
                              alt={insight.title}
                              width={insight.width}
                              height={insight.height}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 md:p-6 flex-grow">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {insight.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="text-lg md:text-xl">{insight.title}</CardTitle>
                        <CardDescription className="mt-2 text-sm line-clamp-3">
                          {insight.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 md:p-6 pt-0 mt-auto">
                        <div className="text-primary font-semibold flex items-center">
                          <span className="sr-only">Read more about {insight.title}</span>
                          <span aria-hidden="true">Read More</span>{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </CardFooter>
                    </div>
                  </Link>
                </GlowingCard>
              ))}
            </div>
            {filteredInsights.length === 0 && (
              <div className="text-center py-16">
                <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold">No Articles Found</h3>
                <p className="mt-2 text-muted-foreground">Try adjusting your search or category filters.</p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
