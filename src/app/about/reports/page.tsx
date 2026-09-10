import React from 'react';
import { generateMetadata, KEYWORD_SETS } from '@/lib/seo';
import { AnalystReportsBento } from '@/components/page-sections/analyst-reports-bento';

export const metadata = generateMetadata({
  title: 'Industry Analyst Reports | LOG_ON AI Solutions',
  description: 'Download comprehensive industry analyst reports on African AI market position, workflow automation, behavioral informatics, and multi-product ecosystem excellence.',
  keywords: [
    ...KEYWORD_SETS.ai,
    'industry analyst reports',
    'AI market research',
    'African AI market',
    'workflow automation insights',
    'AI safety research',
    'digital enterprise',
  ],
  canonical: 'https://logonai.netlify.app/about/reports',
});

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AnalystReportsBento />
    </div>
  );
}
