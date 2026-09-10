/**
 * JSON-LD Structured Data Components
 * Reusable components for adding structured data to pages
 */

import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * Generic JSON-LD component
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * WebSite schema for homepage
 */
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LOG_ON',
    url: 'https://logonai.netlify.app',
  };
  return <JsonLd data={schema} />;
}

/**
 * Organization schema
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LOG_ON',
    alternateName: 'LOG_ON AI Solutions',
    url: 'https://logonai.netlify.app',
    logo: 'https://logonai.netlify.app/og-image.png',
    description: 'LOG_ON is an AI automation and technology consulting firm helping SMEs and enterprises in Nigeria and across Africa cut costs, automate workflows, and scale with intelligent technology.',
    slogan: 'Connecting Advantages. Delivering Results.',
    serviceType: [
      'AI Agent Development',
      'Robotic Process Automation (RPA)',
      'Workplace Automation',
      'AI Chatbot Development',
      'Business Intelligence & Analytics',
      'Custom Web Development',
      'Database Architecture',
      'AI & Automation Training',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-814-306-6320',
      contactType: 'customer service',
      areaServed: ['NG', 'GH', 'KE', 'ZA'],
      email: 'logonthepage@gmail.com',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://medium.com/@Logon_thepage',
      'https://x.com/Logo_obscurity',
      'https://www.instagram.com/logon_thepage/',
      'https://substack.com/@logonthepage',
      'https://github.com/Logonotobscurity/',
      'https://www.linkedin.com/in/logo-oluwamayowa-cpo-/',
      'https://www.linkedin.com/company/logon-connecting-advantages',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressRegion: 'Lagos State',
      addressCountry: 'NG',
    },
    foundingLocation: {
      '@type': 'Place',
      name: 'Lagos, Nigeria',
    },
    areaServed: {
      '@type': 'GeoShape',
      name: 'Nigeria and West Africa',
    },
  };
  return <JsonLd data={schema} />;
}

/**
 * LocalBusiness schema
 */
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'LOG_ON',
    image: 'https://logonai.netlify.app/og-image.png',
    '@id': 'https://logonai.netlify.app',
    url: 'https://logonai.netlify.app',
    telephone: '+234 814 306 6320',
    email: 'logonthepage@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.5093,
      longitude: 3.3717,
    },
    description:
      'LOG_ON provides expert AI agent development and workplace automation in Nigeria. We help businesses cut costs, automate processes, and scale faster.',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '9.0820',
        longitude: '8.6753',
      },
      geoRadius: '1000000',
    },
  };
  return <JsonLd data={schema} />;
}

/**
 * Service catalog schema
 */
export function ServiceCatalogSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'Service',
        position: 1,
        name: 'AI Solutions & Agent Development',
        url: 'https://logonai.netlify.app/ai-solutions',
        description: 'Custom AI models and AI agent development to solve complex business challenges.',
        provider: { '@type': 'Organization', name: 'LOG_ON' },
      },
      {
        '@type': 'Service',
        position: 2,
        name: 'Workplace Process Automation',
        url: 'https://logonai.netlify.app/automation',
        description: 'Intelligent automation and RPA to streamline workflows and increase efficiency.',
        provider: { '@type': 'Organization', name: 'LOG_ON' },
      },
      {
        '@type': 'Service',
        position: 3,
        name: 'Web & Custom Development',
        url: 'https://logonai.netlify.app/web-development',
        description: 'Scalable websites, e-commerce platforms, and custom applications.',
        provider: { '@type': 'Organization', name: 'LOG_ON' },
      },
      {
        '@type': 'Service',
        position: 4,
        name: 'Business Analytics',
        url: 'https://logonai.netlify.app/business-analytics',
        description: 'Custom dashboards and BI reporting to turn data into actionable insights.',
        provider: { '@type': 'Organization', name: 'LOG_ON' },
      },
      {
        '@type': 'Service',
        position: 5,
        name: 'Technology Training Programs',
        url: 'https://logonai.netlify.app/training',
        description: 'Expert-led training in AI, automation, and digital strategy.',
        provider: { '@type': 'Organization', name: 'LOG_ON' },
      },
    ],
  };
  return <JsonLd data={schema} />;
}

// ─────────────────────────────────────────────────────────────────
// Extended schemas: Article, Course, Breadcrumb, Person, Lists
// ─────────────────────────────────────────────────────────────────

/** Article schema — add to each /insights/[slug] page */
interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
  keywords?: string[];
}

export function ArticleSchema({
  title, description, url, datePublished, dateModified,
  authorName = 'Oluwamayowa Logo',
  image = 'https://logonai.netlify.app/og-image.png',
  keywords = [],
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    image,
    keywords: keywords.join(', '),
    author: {
      '@type': 'Person',
      name: authorName,
      url: 'https://logonai.netlify.app/about/our-leadership',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LOG_ON',
      logo: { '@type': 'ImageObject', url: 'https://logonai.netlify.app/og-image.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  return <JsonLd data={schema} />;
}

/** Course schema — use on /training or individual program pages */
interface CourseSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  level?: string;
  keywords?: string[];
}

export function CourseSchema({
  name, description, url,
  provider = 'LOG_ON',
  level = 'Beginner to Advanced',
  keywords = [],
}: CourseSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name, description, url,
    keywords: keywords.join(', '),
    educationalLevel: level,
    inLanguage: 'en',
    provider: {
      '@type': 'Organization',
      name: provider,
      sameAs: 'https://logonai.netlify.app',
    },
    offers: {
      '@type': 'Offer',
      category: 'Professional Training',
      availability: 'https://schema.org/InStock',
      url,
    },
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', inLanguage: 'en' },
  };
  return <JsonLd data={schema} />;
}

/** BreadcrumbList schema — add to every inner page */
interface BreadcrumbItem { name: string; url: string; }

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd data={schema} />;
}

/** Person schema — use on leadership page per team member */
interface PersonSchemaProps {
  name: string;
  role: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  image?: string;
}

export function PersonSchema({ name, role, email, linkedin, twitter, github, image }: PersonSchemaProps) {
  const sameAs = [linkedin, twitter, github].filter(Boolean) as string[];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    worksFor: {
      '@type': 'Organization',
      name: 'LOG_ON',
      url: 'https://logonai.netlify.app',
    },
    url: 'https://logonai.netlify.app/about/our-leadership',
    ...(email && { email }),
    ...(image && { image }),
    ...(sameAs.length > 0 && { sameAs }),
  };
  return <JsonLd data={schema} />;
}

/** Industry use-case ItemList schema — use on /use-cases */
interface IndustryItem { name: string; description: string; id: string; }

export function IndustryItemListSchema({ industries }: { industries: IndustryItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI & Automation Solutions by Industry',
    description: 'Industry-specific AI agent development and workplace automation solutions by LOG_ON.',
    itemListElement: industries.map((industry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: industry.name,
      description: industry.description,
      url: `https://logonai.netlify.app/use-cases#${industry.id}`,
    })),
  };
  return <JsonLd data={schema} />;
}

/** CourseList schema — use on /training to list all programs as structured data */
interface CourseListItem { title: string; description: string; tags: string[]; }

export function CourseListSchema({ courses }: { courses: CourseListItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI & Automation Training Programs | LOG_ON',
    description: 'Expert-led professional training in AI, process automation, and prompt engineering in Nigeria.',
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.title,
        description: course.description,
        keywords: course.tags.join(', '),
        url: 'https://logonai.netlify.app/training',
        provider: {
          '@type': 'Organization',
          name: 'LOG_ON',
          sameAs: 'https://logonai.netlify.app',
        },
      },
    })),
  };
  return <JsonLd data={schema} />;
}
