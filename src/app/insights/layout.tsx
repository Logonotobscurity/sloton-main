import { Metadata } from 'next';
import { generateMetadata, KEYWORD_SETS } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'LOG_ON Insights Hub — AI that moves organizations forward',
  description: 'Research-backed guides on AI strategy, implementation, LLMO/GEO, agents, statistics and governance for Nigerian, African, and global enterprise leaders. Updated on a 90-day cycle.',
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
  canonical: 'https://logonai.netlify.app/insights',
});

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
