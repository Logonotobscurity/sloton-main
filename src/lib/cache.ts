import { cache } from 'react';
import { logger } from '@/lib/logger';

type CacheOptions = {
  revalidate?: number | false;
  tags?: string[];
};

type FetchOptions = RequestInit & CacheOptions;

export const fetchWithCache = cache(async function<T>(
  url: string, 
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate, tags, ...init } = options;
  
  try {
    const response = await fetch(url, {
      ...init,
      next: {
        revalidate,
        tags,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    logger.error(`Error fetching ${url}`, { error });
    throw error;
  }
});

// Helper for static data that doesn't need revalidation
export const staticFetch = <T>(url: string, options?: Omit<FetchOptions, 'revalidate'>) => 
  fetchWithCache<T>(url, { ...options, revalidate: false });

// Helper for dynamic data that should never be cached
export const dynamicFetch = <T>(url: string, options?: Omit<FetchOptions, 'revalidate'>) => 
  fetchWithCache<T>(url, { ...options, revalidate: 0 });

// Helper for data that should be revalidated periodically
export const revalidatingFetch = <T>(
  url: string, 
  revalidateSeconds = 3600, 
  options?: Omit<FetchOptions, 'revalidate'>
) => fetchWithCache<T>(url, { ...options, revalidate: revalidateSeconds });

// Local storage cache implementation with expiry
export class LocalStorageCache {
  private prefix: string;

  constructor(prefix = 'app_cache_') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  set<T = unknown>(key: string, value: T, expiryInSeconds: number = 3600): void {
    const item = {
      value,
      expiry: Date.now() + (expiryInSeconds * 1000),
    };
    localStorage.setItem(this.getKey(key), JSON.stringify(item));
  }

  get<T>(key: string): T | null {
    const item = localStorage.getItem(this.getKey(key));
    if (!item) return null;

    const { value, expiry } = JSON.parse(item);
    if (Date.now() > expiry) {
      this.remove(key);
      return null;
    }

    return value as T;
  }

  remove(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  clear(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    }
  }
}