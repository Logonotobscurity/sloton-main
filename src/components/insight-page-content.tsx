
"use client";

import React, { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import article components using React.lazy
const AiInvestmentPlaybookArticle = lazy(() => import('@/components/articles/ai-investment-playbook-article'));
const LlmsTxtArticle = lazy(() => import('@/components/articles/llms-txt-article'));
const SeoVsGeoArticle = lazy(() => import('@/components/articles/seo-vs-geo-article'));
const TenFormatsArticle = lazy(() => import('@/components/articles/ten-formats-article'));
const CodebaseByAgentArticle = lazy(() => import('@/components/articles/codebase-by-agent-article'));
const AgenticCodeReviewArticle = lazy(() => import('@/components/articles/agentic-code-review-article'));
const GeminiFlashArticle = lazy(() => import('@/components/articles/gemini-flash-article'));
const VisualAiDocumentArticle = lazy(() => import('@/components/articles/visual-ai-document-article'));
const OrganizingAiWorkflowsArticle = lazy(() => import('@/components/articles/organizing-ai-workflows-article'));
const ScalingAiAgentSkillsArticle = lazy(() => import('@/components/articles/scaling-ai-agent-skills-article'));
const CustomerSupportAiArticle = lazy(() => import('@/components/articles/customer-support-ai-article'));
const PromptEngineeringDevelopersArticle = lazy(() => import('@/components/articles/prompt-engineering-developers-article'));
const RecommendationSystemsArticle = lazy(() => import('@/components/articles/recommendation-systems-article'));
const PracticalGuideWorkplaceAiArticle = lazy(() => import('@/components/articles/practical-guide-workplace-ai-article'));
const PromptEngineeringBusinessArticle = lazy(() => import('@/components/articles/prompt-engineering-business-article'));
const FutureOfWorkAiArticle = lazy(() => import('@/components/articles/future-of-work-ai-article'));
const BusinessProcessAutomationArticle = lazy(() => import('@/components/articles/business-process-automation-article'));
const HowToBuildAiAgentArticle = lazy(() => import('@/components/articles/how-to-build-ai-agent-article'));
const DefaultArticle = lazy(() => import('@/components/articles/default-article'));

const articleComponents: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {
  'ai-investment-playbook': AiInvestmentPlaybookArticle,
  'why-llms-txt-matters-for-seo': LlmsTxtArticle,
  'seo-vs-geo-invisible-in-ai-search': SeoVsGeoArticle,
  '10-content-formats-that-get-picked-up-by-llms': TenFormatsArticle,
  'codebase-by-agent-for-agent': CodebaseByAgentArticle,
  'agentic-code-review': AgenticCodeReviewArticle,
  'gemini-flash-faster-ai-workflows': GeminiFlashArticle,
  'visual-ai-document-analysis': VisualAiDocumentArticle,
  'organizing-ai-workflows-thread-management': OrganizingAiWorkflowsArticle,
  'scaling-ai-agent-skills': ScalingAiAgentSkillsArticle,
  'transforming-customer-support-with-ai': CustomerSupportAiArticle,
  'prompt-engineering-for-developers': PromptEngineeringDevelopersArticle,
  'building-recommendation-systems': RecommendationSystemsArticle,
  'ai-insights-a-practical-guide': PracticalGuideWorkplaceAiArticle,
  'prompt-engineering-for-business': PromptEngineeringBusinessArticle,
  'future-of-work-ai': FutureOfWorkAiArticle,
  'guide-to-business-process-automation': BusinessProcessAutomationArticle,
  'how-to-build-ai-agent-guide': HowToBuildAiAgentArticle,
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
