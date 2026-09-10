"use client";

import React, { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { insights } from "@/lib/data/insights";
import { llmoArticles } from "@/lib/data/llmo-articles";
import { agentArticles } from "@/lib/data/agent-articles";
import { functionsArticles } from "@/lib/data/functions-articles";
import { genaiArticles } from "@/lib/data/genai-articles";
import { strategyArticles } from "@/lib/data/strategy-articles";
import { moreArticles } from "@/lib/data/more-insight-clusters";
import { CatalogInsightArticle } from "@/components/articles/catalog-insight-article";

const llmoSlugs = new Set(llmoArticles.map((a) => a.slug));
const agentSlugs = new Set(agentArticles.map((a) => a.slug));
const functionSlugs = new Set(functionsArticles.map((a) => a.slug));
const genaiSlugs = new Set(genaiArticles.map((a) => a.slug));
const strategySlugs = new Set(strategyArticles.map((a) => a.slug));
const moreSlugs = new Set(moreArticles.map((a) => a.slug));

const AiInvestmentPlaybookArticle = lazy(() => import("@/components/articles/ai-investment-playbook-article"));
const LlmsTxtArticle = lazy(() => import("@/components/articles/llms-txt-article"));
const SeoVsGeoArticle = lazy(() => import("@/components/articles/seo-vs-geo-article"));
const TenFormatsArticle = lazy(() => import("@/components/articles/ten-formats-article"));
const CodebaseByAgentArticle = lazy(() => import("@/components/articles/codebase-by-agent-article"));
const AgenticCodeReviewArticle = lazy(() => import("@/components/articles/agentic-code-review-article"));
const GeminiFlashArticle = lazy(() => import("@/components/articles/gemini-flash-article"));
const VisualAiDocumentArticle = lazy(() => import("@/components/articles/visual-ai-document-article"));
const OrganizingAiWorkflowsArticle = lazy(() => import("@/components/articles/organizing-ai-workflows-article"));
const ScalingAiAgentSkillsArticle = lazy(() => import("@/components/articles/scaling-ai-agent-skills-article"));
const CustomerSupportAiArticle = lazy(() => import("@/components/articles/customer-support-ai-article"));
const PromptEngineeringDevelopersArticle = lazy(() => import("@/components/articles/prompt-engineering-developers-article"));
const RecommendationSystemsArticle = lazy(() => import("@/components/articles/recommendation-systems-article"));
const PracticalGuideWorkplaceAiArticle = lazy(() => import("@/components/articles/practical-guide-workplace-ai-article"));
const PromptEngineeringBusinessArticle = lazy(() => import("@/components/articles/prompt-engineering-business-article"));
const FutureOfWorkAiArticle = lazy(() => import("@/components/articles/future-of-work-ai-article"));
const BusinessProcessAutomationArticle = lazy(() => import("@/components/articles/business-process-automation-article"));
const HowToBuildAiAgentArticle = lazy(() => import("@/components/articles/how-to-build-ai-agent-article"));
const LlmoClusterArticle = lazy(() => import("@/components/articles/llmo-cluster-article"));
const AgentClusterArticle = lazy(() => import("@/components/articles/agent-cluster-article"));
const FunctionsClusterArticle = lazy(() => import("@/components/articles/functions-cluster-article"));
const GenaiClusterArticle = lazy(() => import("@/components/articles/genai-cluster-article"));
const StrategyClusterArticle = lazy(() => import("@/components/articles/strategy-cluster-article"));
const MoreClusterArticle = lazy(() => import("@/components/articles/more-cluster-article"));

const articleComponents: { [key: string]: React.LazyExoticComponent<React.ComponentType> } = {
  "ai-investment-playbook": AiInvestmentPlaybookArticle,
  "why-llms-txt-matters-for-seo": LlmsTxtArticle,
  "seo-vs-geo-invisible-in-ai-search": SeoVsGeoArticle,
  "10-content-formats-that-get-picked-up-by-llms": TenFormatsArticle,
  "codebase-by-agent-for-agent": CodebaseByAgentArticle,
  "agentic-code-review": AgenticCodeReviewArticle,
  "gemini-flash-faster-ai-workflows": GeminiFlashArticle,
  "visual-ai-document-analysis": VisualAiDocumentArticle,
  "organizing-ai-workflows-thread-management": OrganizingAiWorkflowsArticle,
  "scaling-ai-agent-skills": ScalingAiAgentSkillsArticle,
  "transforming-customer-support-with-ai": CustomerSupportAiArticle,
  "prompt-engineering-for-developers": PromptEngineeringDevelopersArticle,
  "building-recommendation-systems": RecommendationSystemsArticle,
  "ai-insights-a-practical-guide": PracticalGuideWorkplaceAiArticle,
  "prompt-engineering-for-business": PromptEngineeringBusinessArticle,
  "future-of-work-ai": FutureOfWorkAiArticle,
  "guide-to-business-process-automation": BusinessProcessAutomationArticle,
  "how-to-build-ai-agent-guide": HowToBuildAiAgentArticle,
};

export function InsightPageContent({ slug }: { slug: string }) {
  const Mapped = articleComponents[slug];
  const insight = insights.find((i) => i.slug === slug);

  return (
    <Suspense fallback={<ArticleSkeleton />}>
      {llmoSlugs.has(slug) ? (
        <LlmoClusterArticle slug={slug} />
      ) : agentSlugs.has(slug) ? (
        <AgentClusterArticle slug={slug} />
      ) : functionSlugs.has(slug) ? (
        <FunctionsClusterArticle slug={slug} />
      ) : genaiSlugs.has(slug) ? (
        <GenaiClusterArticle slug={slug} />
      ) : strategySlugs.has(slug) ? (
        <StrategyClusterArticle slug={slug} />
      ) : moreSlugs.has(slug) ? (
        <MoreClusterArticle slug={slug} />
      ) : insight ? (
        <CatalogInsightArticle insight={insight}>
          {Mapped ? <Mapped /> : null}
        </CatalogInsightArticle>
      ) : (
        <p>Article not found.</p>
      )}
    </Suspense>
  );
}

const ArticleSkeleton = () => (
  <div className="space-y-6 max-w-3xl">
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-6 w-full" />
    <Skeleton className="h-6 w-5/6" />
    <Skeleton className="h-40 w-full" />
  </div>
);
