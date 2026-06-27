/**
 * SEO Metadata Utilities
 * Centralized metadata generation for consistent SEO across the application
 */

import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
}

const SITE_CONFIG = {
  name: 'LOG_ON Solutions',
  url: 'https://logonsolutions.netlify.app',
  defaultOgImage: '/og-image.png',
  twitterHandle: '@Logo_obscurity',
  locale: 'en_US',
  type: 'website',
} as const;

/**
 * Generate comprehensive metadata for a page
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = SITE_CONFIG.defaultOgImage,
    noindex = false,
    nofollow = false,
    article,
  } = config;

  const fullTitle = title;
  const canonicalUrl = canonical || SITE_CONFIG.url;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_CONFIG.url}${ogImage}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    authors: [{ name: 'LOG_ON Solutions' }],
    creator: 'LOG_ON Solutions',
    publisher: 'LOG_ON Solutions',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: SITE_CONFIG.locale,
      type: article ? 'article' : 'website',
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        authors: article.authors,
        tags: article.tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: SITE_CONFIG.twitterHandle,
      site: SITE_CONFIG.twitterHandle,
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

/**
 * Common keyword sets for different page types
 */
export const KEYWORD_SETS = {
  ai: [
    'AI solutions Nigeria',
    'artificial intelligence',
    'AI agent development',
    'machine learning',
    'AI automation',
    'intelligent systems',
    'AI consulting',
  ],
  automation: [
    'workplace automation',
    'business process automation',
    'RPA Nigeria',
    'workflow automation',
    'process optimization',
    'automation solutions',
    'digital transformation',
  ],
  development: [
    'web development Nigeria',
    'custom software development',
    'application development',
    'software solutions',
    'digital solutions',
    'technology consulting',
  ],
  training: [
    'AI training Nigeria',
    'technology training',
    'digital skills training',
    'corporate training',
    'professional development',
    'tech education',
  ],
  analytics: [
    'business analytics',
    'data analytics Nigeria',
    'business intelligence',
    'data visualization',
    'analytics solutions',
    'data-driven insights',
  ],
} as const;

/**
 * Generate FAQ schema for structured data
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'LOG_ON Solutions',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  provider?: string;
  areaServed?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'Organization',
      name: service.provider || 'LOG_ON Solutions',
      url: SITE_CONFIG.url,
    },
    areaServed: {
      '@type': 'Country',
      name: service.areaServed || 'Nigeria',
    },
  };
}
