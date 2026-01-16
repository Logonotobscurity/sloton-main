import { MetadataRoute } from 'next'
import { getTemplates } from '@/lib/data/workflow-templates'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://logonsolutions.netlify.app';

  // For now, we will list static pages. In a real application, you would
  // fetch dynamic routes (e.g., blog posts, products) from a database.
  const staticRoutes = [
    '/',
    '/about',
    '/about/careers',
    '/about/investors',
    '/about/locations',
    '/about/our-leadership',
    '/ab-testing',
    '/ai-solutions',
    '/automation',
    '/business-analytics',
    '/chatbots',
    '/contact',
    '/database-solutions',
    '/ideas-lab',
    '/insights',
    '/partners',
    '/solutions',
    '/support',
    '/training',
    '/use-cases',
    '/web-development'
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  const workflowUrls = getTemplates().map((template) => ({
      url: `${baseUrl}/automation/${template.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
  }));

  return [...staticUrls, ...workflowUrls];
}
