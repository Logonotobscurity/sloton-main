import { logger } from '@/lib/logger';

export function registerServiceWorker(): void {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/api/service-worker')
        .then((registration) => {
          logger.info('ServiceWorker registration successful');
        })
        .catch((err) => {
          logger.error('ServiceWorker registration failed', { error: err });
        });
    });
  }
}