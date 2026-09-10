/**
 * Content Security Policy (CSP) Configuration
 * Provides secure CSP headers with nonce support for inline scripts
 */

export function generateNonce(): string {
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Build CSP policy string with nonce support
 */
export function buildCSPPolicy(nonce?: string): string {
  const scriptSrc = nonce
    ? `'self' 'nonce-${nonce}' https://www.googletagmanager.com https://cdn.matomo.cloud https://*.posthog.com`
    : `'self' https://www.googletagmanager.com https://cdn.matomo.cloud https://*.posthog.com`;

  const styleSrc = nonce
    ? `'self' 'nonce-${nonce}' https://fonts.googleapis.com`
    : `'self' 'unsafe-inline' https://fonts.googleapis.com`;

  const directives = [
    `default-src 'self'`,
    `script-src ${scriptSrc} 'unsafe-inline' https://tally.so`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' data: https: blob:`,
    `font-src 'self' data: https://fonts.gstatic.com`,
    `connect-src 'self' https://logonai.netlify.app https://*.vercel.app https://www.googletagmanager.com https://*.matomo.cloud https://*.posthog.com https://tally.so`,
    `media-src 'self'`,
    `object-src 'none'`,
    `frame-src 'self' https://www.googletagmanager.com https://tally.so`,
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
    `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://cdn.matomo.cloud https://*.posthog.com`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' data: https: blob:`,
    `font-src 'self' data: https://fonts.gstatic.com`,
    `connect-src 'self' https: ws: wss:`,
    `media-src 'self'`,
    `object-src 'none'`,
    `frame-src 'self' https: https://tally.so`,
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
