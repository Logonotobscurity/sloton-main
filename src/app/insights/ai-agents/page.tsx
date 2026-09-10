import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { generateMetadata } from "@/lib/seo";
import { agentArticles, agentSections } from "@/lib/data/agent-articles";

export const metadata = generateMetadata({
  title: "AI Agents — Architecture, frameworks & enterprise use cases",
  description:
    "LOG_ON cluster on agentic AI: definitions, architecture, frameworks, MCP/A2A, production, and African agency comparisons. 2026.",
  canonical: "/insights/ai-agents",
});

export default function AiAgentsClusterPage() {
  const pick = agentArticles.find((a) => a.slug === "best-ai-agencies-nigeria-africa-2026");

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto">
        <p className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          {" / "}
          <Link href="/insights" className="hover:text-primary">Insights</Link>
          {" / "}
          <span>AI Agents</span>
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-headline">AI Agents</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          Agentic AI architecture, frameworks, and enterprise use cases for Nigerian, African, and global operators.
        </p>

        {pick ? (
          <Link
            href={`/insights/${pick.slug}`}
            className="mt-8 block rounded-2xl border border-border bg-secondary/30 p-6 md:p-8 hover:border-primary/40"
          >
            <p className="text-[11px] uppercase tracking-widest text-primary font-semibold">Editor&apos;s pick</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-headline">{pick.title}</h2>
            <p className="mt-3 text-muted-foreground">{pick.description}</p>
            <span className="mt-4 inline-flex items-center font-semibold text-primary">
              Read the guide <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Link>
        ) : null}

        <dl className="mt-6 grid grid-cols-3 gap-3 max-w-lg">
          <div className="rounded-xl border border-border p-3">
            <dt className="text-[11px] uppercase text-muted-foreground">Articles</dt>
            <dd className="text-2xl font-headline text-primary">{agentArticles.length}</dd>
          </div>
          <div className="rounded-xl border border-border p-3">
            <dt className="text-[11px] uppercase text-muted-foreground">Topics</dt>
            <dd className="text-2xl font-headline text-primary">13</dd>
          </div>
          <div className="rounded-xl border border-border p-3">
            <dt className="text-[11px] uppercase text-muted-foreground">Updated</dt>
            <dd className="text-2xl font-headline text-primary">Aug 2026</dd>
          </div>
        </dl>

        <div className="mt-14 space-y-12">
          {agentSections.map((section) => {
            const items = agentArticles.filter((a) => a.section === section);
            if (!items.length) return null;
            return (
              <section key={section}>
                <h2 className="text-2xl font-headline">{section}</h2>
                <ul className="mt-4 grid gap-3">
                  {items.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/insights/${article.slug}`}
                        className="block rounded-xl border border-border p-4 hover:border-primary/40"
                      >
                        <span className="text-[10px] uppercase tracking-widest text-primary">{article.kind}</span>
                        <h3 className="mt-1 font-semibold">{article.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{article.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
