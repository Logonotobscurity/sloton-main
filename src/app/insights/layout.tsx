import { Metadata } from 'next';
import { generateMetadata, KEYWORD_SETS } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'Insights',
  description: 'Explore expert insights on AI, automation, digital transformation, and technology trends. Learn from LOG_ON Solutions\'s comprehensive guides and articles on workplace automation, AI agents, and business innovation.',
  keywords: [
    ...KEYWORD_SETS.ai,
    ...KEYWORD_SETS.automation,
    'AI insights',
    'automation guides',
    'technology articles',
    'digital transformation blog',
    'AI best practices',
    'automation tutorials',
    'business technology insights',
  ],
  canonical: 'https://logonsolutions.netlify.app/insights',
});

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
