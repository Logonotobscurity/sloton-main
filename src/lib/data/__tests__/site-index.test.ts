import { describe, expect, it } from 'vitest';
import { insights } from '@/lib/data/insights';
import { insightsHubLatest, insightsHubPillars } from '@/lib/data/insights-hub';
import { getIndexedConcepts, getSitemapEntries, renderLlmsFull } from '@/lib/data/site-index';

describe('site index', () => {
  it('sitemap includes every catalogue slug', () => {
    const urls = getSitemapEntries().map((e) => e.url);
    for (const article of insights) {
      expect(urls.some((u) => u.endsWith(`/insights/${article.slug}`))).toBe(true);
    }
  });

  it('hub cards only point at live catalogue slugs or hubs', () => {
    const slugs = new Set(insights.map((i) => `/insights/${i.slug}`));
    const hubs = new Set(getIndexedConcepts().map((c) => c.path));
    const hrefs = [
      ...insightsHubLatest.map((a) => a.href),
      ...insightsHubPillars.flatMap((p) => p.categories.flatMap((c) => c.articles.map((a) => a.href))),
    ];
    for (const href of hrefs) {
      const ok = slugs.has(href) || hubs.has(href);
      expect(ok, href).toBe(true);
    }
  });

  it('llms-full lists hubs and a sample article', () => {
    const text = renderLlmsFull();
    expect(text).toContain('/insights/ai-agents');
    expect(text).toContain('what-is-an-ai-agent');
    expect(text).toContain('Oluwamayowa Logo');
  });
});
