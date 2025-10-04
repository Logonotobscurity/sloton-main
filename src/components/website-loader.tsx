
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function WebsiteLoader() {
  const [loading, setLoading] = useState(true);
  const [hiding, setHiding] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // This effect handles the initial page load
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    // This effect handles route changes
    setLoading(true);
    const handleRouteChangeComplete = () => {
      setLoading(false);
    };
    
    // Using a timeout to simulate loading on route change, can be adjusted or removed
    const timer = setTimeout(handleRouteChangeComplete, 500);

    return () => clearTimeout(timer);

  }, [pathname]);

  useEffect(() => {
    if (!loading) {
      // Start hiding animation
      const hideTimer = setTimeout(() => {
        setHiding(true);
      }, 500); // This duration should match the transition duration
      return () => clearTimeout(hideTimer);
    } else {
      setHiding(false);
    }
  }, [loading]);

  if (hiding) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-500",
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!loading}
    >
      <div className="loader"></div>
    </div>
  );
}
