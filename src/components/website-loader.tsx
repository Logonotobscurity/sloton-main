
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function WebsiteLoader() {
  const [loading, setLoading] = useState(false);
  const [hiding, setHiding] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Show loader on route change
    setHiding(false);
    setLoading(true);

    // Hide loader after a delay to simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Animation duration + buffer

    // Start hiding animation after fade out
    const hideTimer = setTimeout(() => {
      setHiding(true);
    }, 1300); // Must be longer than the fade-out duration

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);


  if (hiding && !loading) {
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
