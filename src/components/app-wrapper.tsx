'use client';

import { ReactNode, useEffect } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { registerServiceWorker } from '@/lib/service-worker';
import { handleError } from '@/lib/error';
import { LocalStorageCache } from '@/lib/cache';

interface AppWrapperProps {
  children: ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  useEffect(() => {
    // Initialize service worker
    try {
      registerServiceWorker();
    } catch (error) {
      handleError(error, { silent: true });
    }

    // Initialize cache
    const cache = new LocalStorageCache();
    
    // Clean up expired cache items
    cache.clear();
  }, []);

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        handleError(error);
        // You could send this to an error reporting service
        console.error('Error caught by error boundary:', error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}