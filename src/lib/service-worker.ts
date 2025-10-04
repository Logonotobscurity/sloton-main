'use client';

declare global {
  interface Window {
    workbox: any; // Replace 'any' with proper Workbox type if you want strict typing
  }
}

interface WorkboxEvent extends Event {
  type: string;
}

export function registerServiceWorker() {
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    window.workbox !== undefined
  ) {
    const wb = window.workbox;
    
    // Add event listeners to handle PWA lifecycle
    wb.addEventListener('installed', (event: WorkboxEvent) => {
      console.log(`Service Worker installed: ${event.type}`);
    });

    wb.addEventListener('controlling', (event: WorkboxEvent) => {
      console.log(`Service Worker controlling: ${event.type}`);
    });

    wb.addEventListener('activated', (event: WorkboxEvent) => {
      console.log(`Service Worker activated: ${event.type}`);
    });

    // Register the service worker
    wb.register()
      .then((registration: ServiceWorkerRegistration) => {
        console.log('Service Worker registered successfully');
        
        // Check for updates every hour
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      })
      .catch((err: Error) => {
        console.error('Service Worker registration failed:', err);
      });

    // Add offline/online detection
    window.addEventListener('online', () => {
      console.log('Application is online');
    });

    window.addEventListener('offline', () => {
      console.log('Application is offline');
    });
  }
}