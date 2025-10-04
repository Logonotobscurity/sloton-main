
import { MetadataRoute } from 'next';
import { insights } from '@/lib/insights';
import { getTemplates } from '@/lib/workflow-templates';
import { menuData } from '@/lib/menu-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://logonsolutions.netlify.app';

  // Static pages from menuData and other known pages
  const seenUrls = new Set<string>(['/']);

  const addUrl = (url: string) => {
    if (url && url.startsWith('/') && !seenUrls.has(url)) {
      seenUrls.add(url);
    }
  };

  // From header navigation
  addUrl('/solutions');
  addUrl('/use-cases');
  addUrl('/training');
  addUrl('/partners');
  addUrl('/about');
  addUrl('/support');
  
  // From dropdowns
  menuData.menu.products.items.forEach(item => addUrl(item.href));
  menuData.menu.company.items.forEach(item => addUrl(item.href));

  // Other known pages
  addUrl('/ab-testing');
  addUrl('/ideas-lab');
  addUrl('/contact');
  addUrl('/automation');

  const staticUrls = Array.from(seenUrls).map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: page === '/' ? 1.0 : 0.8,
  }));

  // Dynamic pages for insights/articles
  const insightUrls = insights.map((insight) => ({
    url: `${baseUrl}/insights/${insight.slug}`,
    lastModified: new Date(insight.date),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.7,
  }));

  // Dynamic pages for automation templates
  const templates = getTemplates();
  const templateUrls = templates.map((template) => ({
      url: `${baseUrl}/automation/${template.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.6
  }));

  return [...staticUrls, ...insightUrls, ...templateUrls];
}
