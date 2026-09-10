import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  const publicAllow = {
    allow: '/',
    disallow: ['/api/', '/.netlify/', '/admin/', '/_next/', '/private/', '/component-showcase', '/ab-testing'],
  };

  const aiAgents = [
    'Googlebot',
    'Bingbot',
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    'ClaudeBot',
    'Claude-User',
    'Claude-SearchBot',
    'Google-Extended',
    'PerplexityBot',
    'Perplexity-User',
    'Applebot',
    'Applebot-Extended',
    'anthropic-ai',
    'Bytespider',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        ...publicAllow,
      },
      ...aiAgents.map((userAgent) => ({
        userAgent,
        allow: '/' as const,
        disallow: ['/api/', '/admin/', '/private/'],
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
