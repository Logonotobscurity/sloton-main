/**
 * Content Security Policy (CSP) Configuration
 * Provides secure CSP headers with nonce support for inline scripts
 */

import { randomBytes } from 'crypto';

/**
 * Generate a cryptographically secure nonce for CSP
 */
export function generateNonce(): string {
  return randomBytes(16).toString('base64');
}

/**
 * Build CSP policy string with nonce support
 */
export function buildCSPPolicy(nonce?: string): string {
  const scriptSrc = nonce
    ? `'self' 'nonce-${nonce}' https://www.googletagmanager.com https://cdn.matomo.cloud`
    : `'self' https://www.googletagmanager.com https://cdn.matomo.cloud`;

  const styleSrc = nonce
    ? `'self' 'nonce-${nonce}' https://fonts.googleapis.com`
    : `'self' 'unsafe-inline' https://fonts.googleapis.com`;

  const directives = [
    `default-src 'self'`,
    `script-src ${scriptSrc}`,
    `style-src ${styleSrc}`,
    `img-src 'self' data: https: blob:`,
    `font-src 'self' data: https://fonts.gstatic.com`,
    `connect-src 'self' https://api.logonsolutions.netlify.app https://*.vercel.app https://www.googletagmanager.com https://*.matomo.cloud`,
    `media-src 'self'`,
    `object-src 'none'`,
    `frame-src 'self' https://www.googletagmanager.com`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `worker-src 'self' blob:`,
    `manifest-src 'self'`,
    `upgrade-insecure-requests`,
  ];

  return directives.join('; ');
}

/**
 * Build CSP policy for development (more permissive)
 */
export function buildDevCSPPolicy(): string {
  const directives = [
    `default-src 'self'`,
    `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://cdn.matomo.cloud`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' data: https: blob:`,
    `font-src 'self' data: https://fonts.gstatic.com`,
    `connect-src 'self' https: ws: wss:`,
    `media-src 'self'`,
    `object-src 'none'`,
    `frame-src 'self' https:`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `worker-src 'self' blob:`,
    `manifest-src 'self'`,
  ];

  return directives.join('; ');
}

/**
 * Get appropriate CSP policy based on environment
 */
export function getCSPPolicy(nonce?: string): string {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    return buildDevCSPPolicy();
  }
  
  return buildCSPPolicy(nonce);
}
