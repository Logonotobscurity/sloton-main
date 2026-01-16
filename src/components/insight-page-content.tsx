
"use client";

import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import article components using React.lazy
const AiInvestmentPlaybookArticle = lazy(() => import('@/components/articles/ai-investment-playbook-article'));
const LlmsTxtArticle = lazy(() => import('@/components/articles/llms-txt-article'));
const SeoVsGeoArticle = lazy(() => import('@/components/articles/seo-vs-geo-article'));
const TenFormatsArticle = lazy(() => import('@/components/articles/ten-formats-article'));
const DefaultArticle = lazy(() => import('@/components/articles/default-article'));

const articleComponents: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {
  'ai-investment-playbook': AiInvestmentPlaybookArticle,
  'why-llms-txt-matters-for-seo': LlmsTxtArticle,
  'seo-vs-geo-invisible-in-ai-search': SeoVsGeoArticle,
  '10-content-formats-that-get-picked-up-by-llms': TenFormatsArticle,
};

export function InsightPageContent({ slug }: { slug: string }) {
  const ArticleComponent = articleComponents[slug] || DefaultArticle;

  return (
    <div className="prose dark:prose-invert max-w-none">
      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleComponent />
      </Suspense>
    </div>
  );
}

const ArticleSkeleton = () => (
    <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-8 w-1/2 mt-8" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
    </div>
);
