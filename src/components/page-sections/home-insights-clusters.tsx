import Link from "next/link";
import { INSIGHT_HUBS } from "@/lib/data/site-index";

const tones = ["sage", "amber", "sky", "coral", "sage", "amber", "sky", "coral"] as const;

export function HomeInsightsClusters() {
  const clusters = INSIGHT_HUBS.filter((h) => h.path !== "/insights");
  return (
    <section className="verdara-section py-16 lg:py-20" aria-labelledby="home-insights-heading">
      <div className="container mx-auto px-5 lg:px-10">
        <p className="verdara-kicker">Insights Hub</p>
        <h2 id="home-insights-heading" className="verdara-title mt-3 text-[36px] lg:text-[46px]">
          Insights that move <em>organizations</em> forward
        </h2>
        <p className="verdara-lede mt-4 max-w-3xl">
          Operator-authored by Oluwamayowa Logo. Research-backed strategy, agents, LLMO, GenAI, and function plays for Nigerian and global operators.
        </p>
        <ul className="verdara-grid verdara-grid-3 mt-10">
          {clusters.map((c, i) => (
            <li key={c.path}>
              <Link href={c.path} className="verdara-card">
                <span className={`verdara-tag verdara-tag-${tones[i % tones.length]}`}>Cluster</span>
                <h3 className="mt-4">{c.title}</h3>
                <p className="verdara-lede mt-auto pt-3">{c.definition}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/insights" className="font-semibold text-verdara-ink underline-offset-4 hover:underline">
            Browse all Insights →
          </Link>
        </p>
      </div>
    </section>
  );
}
