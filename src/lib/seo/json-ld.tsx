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
    url: 'https://logonsolutions.netlify.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://logonsolutions.netlify.app/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
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
    url: 'https://logonsolutions.netlify.app',
    logo: 'https://logonsolutions.netlify.app/og-image.png',
    description: 'LOG_ON provides expert AI agent development and workplace automation in Nigeria.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-814-306-6320',
      contactType: 'customer service',
      areaServed: 'NG',
      email: 'logonthepage@gmail.com',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://medium.com/@Logon_thepage',
      'https://x.com/Logo_obscurity',
      'https://www.instagram.com/logon_thepage/',
      'https://substack.com/@logonthepage',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressCountry: 'NG',
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
    image: 'https://logonsolutions.netlify.app/og-image.png',
    '@id': 'https://logonsolutions.netlify.app',
    url: 'https://logonsolutions.netlify.app',
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
      'LOG_ON provides expert AI agent development and workplace automation in Nigeria. We help businesses cut costs, automate processes, and scale faster with intelligent technology solutions.',
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
        url: 'https://logonsolutions.netlify.app/ai-solutions',
        description: 'Custom AI models and AI agent development to solve complex business challenges.',
        provider: {
          '@type': 'Organization',
          name: 'LOG_ON',
        },
      },
      {
        '@type': 'Service',
        position: 2,
        name: 'Workplace Process Automation',
        url: 'https://logonsolutions.netlify.app/automation',
        description:
          'Intelligent automation and RPA to streamline workflows and increase efficiency in your workplace.',
        provider: {
          '@type': 'Organization',
          name: 'LOG_ON',
        },
      },
      {
        '@type': 'Service',
        position: 3,
        name: 'Web & Custom Development',
        url: 'https://logonsolutions.netlify.app/web-development',
        description: 'Scalable websites, e-commerce platforms, and custom applications.',
        provider: {
          '@type': 'Organization',
          name: 'LOG_ON',
        },
      },
      {
        '@type': 'Service',
        position: 4,
        name: 'Business Analytics',
        url: 'https://logonsolutions.netlify.app/business-analytics',
        description: 'Custom dashboards and BI reporting to turn data into actionable insights.',
        provider: {
          '@type': 'Organization',
          name: 'LOG_ON',
        },
      },
      {
        '@type': 'Service',
        position: 5,
        name: 'Technology Training Programs',
        url: 'https://logonsolutions.netlify.app/training',
        description: 'Expert-led training in AI, automation, and digital strategy.',
        provider: {
          '@type': 'Organization',
          name: 'LOG_ON',
        },
      },
    ],
  };

  return <JsonLd data={schema} />;
}
