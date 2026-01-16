
import * as React from 'react';

export const SkipToContentLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:rounded-md focus:shadow-lg"
  >
    Skip to main content
  </a>
);
