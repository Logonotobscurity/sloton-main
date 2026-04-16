import { MetadataRoute } from 'next';
import { getTemplates } from '@/lib/data/workflow-templates';
import { insights } from '@/lib/data/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://logonsolutions.netlify.app';
  const currentDate = new Date();

  // High priority pages
  const highPriorityRoutes = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/ai-solutions', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/automation', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
  ];

  // Medium priority pages
  const mediumPriorityRoutes = [
    { path: '/business-analytics', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/chatbots', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/database-solutions', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/web-development', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/training', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/solutions', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/insights', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/use-cases', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/resources', priority: 0.8, changeFrequency: 'weekly' as const },
  ];

  // Lower priority pages
  const lowPriorityRoutes = [
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/about/careers', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/about/investors', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/about/locations', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/about/our-leadership', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/partners', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/support', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/ideas-lab', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/ab-testing', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  const allStaticRoutes = [...highPriorityRoutes, ...mediumPriorityRoutes, ...lowPriorityRoutes];

  const staticUrls = allStaticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Dynamic workflow/automation pages
  const workflowUrls = getTemplates().map((template) => ({
    url: `${baseUrl}/automation/${template.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic insight/blog post URLs
  const insightUrls = insights.map((insight) => ({
    url: `${baseUrl}/insights/${insight.slug}`,
    lastModified: new Date(insight.date),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [...staticUrls, ...workflowUrls, ...insightUrls];
}
