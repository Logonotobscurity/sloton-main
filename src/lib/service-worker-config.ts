/**
 * Service Worker Configuration
 * Centralized configuration for service worker caching strategies
 */

export interface ServiceWorkerConfig {
  staticCacheName: string;
  runtimeCacheName: string;
  precacheUrls: string[];
  apiPatterns: RegExp[];
  cacheStrategies: {
    static: 'cache-first' | 'network-first' | 'stale-while-revalidate';
    api: 'network-first' | 'cache-first' | 'stale-while-revalidate';
    images: 'cache-first' | 'network-first' | 'stale-while-revalidate';
  };
  maxAge: {
    static: number; // milliseconds
    api: number; // milliseconds
    images: number; // milliseconds
  };
}

// Static configuration to avoid circular dependencies during build
const staticConfig: ServiceWorkerConfig = {
  staticCacheName: 'logon-cache-v1',
  runtimeCacheName: 'runtime-cache',
  precacheUrls: [
    '/',
    '/offline',
    '/manifest.json',
    '/favicon.ico',
    '/herosection.webp',
    '/chat-icon.webp',
    '/transperent-background.webp'
  ],
  apiPatterns: [
    /\/api\//,
    /\/auth\//,
  ],
  cacheStrategies: {
    static: 'cache-first',
    api: 'network-first',
    images: 'cache-first',
  },
  maxAge: {
    static: 24 * 60 * 60 * 1000, // 24 hours
    api: 5 * 60 * 1000, // 5 minutes
    images: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
};

export function getServiceWorkerConfig(): ServiceWorkerConfig {
  return staticConfig;
}

/**
 * Generate service worker script with configuration
 */
export function generateServiceWorkerScript(): string {
  const config = getServiceWorkerConfig();
  
  return `
// Service Worker with Configuration
const CACHE_NAME = '${config.staticCacheName}';
const RUNTIME_CACHE = '${config.runtimeCacheName}';

const PRECACHE_URLS = ${JSON.stringify(config.precacheUrls)};

// Install event - precache static resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheToDelete) => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Network-first strategy for API requests
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return caches.open(RUNTIME_CACHE).then((cache) => {
        return fetch(event.request).then((response) => {
          // Put a copy of the response in the runtime cache.
          return cache.put(event.request, response.clone()).then(() => {
            return response;
          });
        });
      });
    })
  );
});
`;
}