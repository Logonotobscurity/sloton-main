
"use client";

import * as React from "react";
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

export const BackToTop = () => {
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(sentinelRef, { rootMargin: '0px 0px -100% 0px' });
  const isVisible = !!entry && !entry.isIntersecting;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div ref={sentinelRef} style={{ position: 'absolute', top: '100vh' }} />
      <Button
        className={cn(
          'fixed bottom-4 right-4 z-50 rounded-full shadow-lg transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        size="icon"
        variant="secondary"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </>
  );
};
