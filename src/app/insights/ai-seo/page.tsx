import Link from "next/link";
import { generateMetadata } from "@/lib/seo";
import { llmoArticles } from "@/lib/data/llmo-articles";

export const metadata = generateMetadata({
  title: "AI SEO — GEO, LLMO, and citation strategy",
  description:
    "LOG_ON AI SEO cluster: GEO vs SEO, ChatGPT citations, schema, llms.txt. Part of AI Search & LLMO.",
  canonical: "/insights/ai-seo",
});

export default function AiSeoPage() {
  const items = llmoArticles.filter((a) =>
    /seo|geo|llmo|schema|citation|crawler|llms|overview|chatgpt|perplexity|bing/i.test(
      `${a.title} ${a.slug} ${a.section}`
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-28 pb-20 px-4 max-w-[1100px] mx-auto">
        <p className="text-sm text-muted-foreground">
          <Link href="/insights" className="hover:text-primary">Insights</Link>
          {" / "}
          AI SEO
        </p>
        <h1 className="mt-4 text-4xl font-headline">AI SEO</h1>
        <p className="mt-4 text-muted-foreground max-w-3xl">
          Generative Engine Optimization and Large Language Model Optimization — the 2026 SEO practice. Full cluster:{" "}
          <Link href="/insights/ai-search" className="text-primary underline">AI Search &amp; LLMO</Link>.
        </p>
        <ul className="mt-10 grid gap-3">
          {items.map((article) => (
            <li key={article.slug}>
              <Link href={`/insights/${article.slug}`} className="block rounded-xl border border-border p-4 hover:border-primary/40">
                <span className="text-[10px] uppercase tracking-widest text-primary">{article.kind}</span>
                <h2 className="mt-1 font-semibold">{article.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{article.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
