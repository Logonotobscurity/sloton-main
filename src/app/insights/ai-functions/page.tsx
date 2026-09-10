import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { generateMetadata } from "@/lib/seo";
import { functionsArticles, functionsSections } from "@/lib/data/functions-articles";

export const metadata = generateMetadata({
  title: "AI for Business Functions — sales, marketing, HR, finance, legal & ops",
  description:
    "LOG_ON cluster: AI by function for Nigerian, African, and global operators. Platforms compared, C-suite guides, 90-day review.",
  canonical: "/insights/ai-functions",
});

export default function AiFunctionsClusterPage() {
  const pick = functionsArticles.find((a) => a.slug === "top-ai-marketing-platforms-2026");

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1100px] mx-auto">
        <p className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          {" / "}
          <Link href="/insights" className="hover:text-primary">Insights</Link>
          {" / "}
          <span>AI for Business Functions</span>
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-headline">AI for Business Functions</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          AI for sales, marketing, HR, finance, legal, and operations — written for function leaders who have to ship, not slide.
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
            <dd className="text-2xl font-headline text-primary">{functionsArticles.length}</dd>
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
          {functionsSections.map((section) => {
            const items = functionsArticles.filter((a) => a.section === section);
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
