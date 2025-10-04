import { cache } from 'react';

type FetchOptions = RequestInit & {
  revalidate?: number | false;
  tags?: string[];
};

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
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
});

export const staticFetch = (url: string, options?: Omit<FetchOptions, 'revalidate'>) => 
  fetchWithCache(url, { ...options, revalidate: false });

export const dynamicFetch = (url: string, options?: Omit<FetchOptions, 'revalidate'>) => 
  fetchWithCache(url, { ...options, revalidate: 0 });

export const revalidatingFetch = (url: string, revalidateSeconds = 3600, options?: Omit<FetchOptions, 'revalidate'>) => 
  fetchWithCache(url, { ...options, revalidate: revalidateSeconds });