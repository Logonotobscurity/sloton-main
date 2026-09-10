import Link from 'next/link';
import { insights, type Insight } from '@/lib/data/insights';

export function RelatedInsights({ current }: { current: Insight }) {
  const related = insights
    .filter((item) => item.slug !== current.slug)
    .map((item) => ({
      item,
      score: item.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || b.item.date.localeCompare(a.item.date))
    .slice(0, 3)
    .map((row) => row.item);

  if (!related.length) return null;

  return (
    <section className="mt-16 border-t pt-8" aria-labelledby="related-insights-heading">
      <h2 id="related-insights-heading" className="text-2xl font-bold mb-6">
        Related insights
      </h2>
      <ul className="grid gap-4 sm:grid-cols-3">
        {related.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/insights/${item.slug}`}
              className="block h-full rounded-xl border border-border p-4 transition-colors hover:border-primary hover:bg-primary/5"
            >
              <p className="text-xs text-primary">{item.tags[0]}</p>
              <p className="mt-2 font-semibold leading-snug">{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
