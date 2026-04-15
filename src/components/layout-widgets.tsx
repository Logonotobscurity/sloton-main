"use client";

import dynamic from 'next/dynamic';

// Dynamic imports for client-only widgets to reduce initial bundle size
const BackToTop = dynamic(() => import('@/components/back-to-top').then(mod => ({ default: mod.BackToTop })), {
  ssr: false,
  loading: () => null,
});

const NewsletterPopup = dynamic(() => import('@/components/newsletter-popup').then(mod => ({ default: mod.NewsletterPopup })), {
  ssr: false,
  loading: () => null,
});

/**
 * Layout Widgets - Independent widgets that don't require context
 */
export function LayoutWidgets() {
  return (
    <>
      <BackToTop />
      <NewsletterPopup />
    </>
  );
}

