import posthog from 'posthog-js';

const token =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (typeof window !== 'undefined' && token) {
  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    defaults: '2026-05-30',
    capture_pageview: true,
    capture_pageleave: true,
    persistence: 'localStorage+cookie',
  });
}

export default posthog;
