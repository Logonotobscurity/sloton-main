'use client';

import { logger } from '@/lib/logger';

declare global {
  interface Window {
    workbox: {
      addEventListener: (event: string, callback: (event: WorkboxEvent) => void) => void;
      register: () => Promise<ServiceWorkerRegistration>;
    };
  }
}

interface WorkboxEvent extends Event {
  type: string;
}

export function registerServiceWorker(): void {
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    window.workbox !== undefined
  ) {
    const wb = window.workbox;
    
    // Add event listeners to handle PWA lifecycle
    wb.addEventListener('installed', (event: WorkboxEvent) => {
      logger.info('Service Worker installed', { eventType: event.type });
    });

    wb.addEventListener('controlling', (event: WorkboxEvent) => {
      logger.info('Service Worker controlling', { eventType: event.type });
    });

    wb.addEventListener('activated', (event: WorkboxEvent) => {
      logger.info('Service Worker activated', { eventType: event.type });
    });

    // Register the service worker
    wb.register()
      .then((registration: ServiceWorkerRegistration) => {
        logger.info('Service Worker registered successfully');
        
        // Check for updates every hour
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      })
      .catch((err: Error) => {
        logger.error('Service Worker registration failed', { error: err });
      });

    // Add offline/online detection
    window.addEventListener('online', () => {
      logger.info('Application is online');
    });

    window.addEventListener('offline', () => {
      logger.warn('Application is offline');
    });
  }
}