'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route error', error.digest ?? error.message);
  }, [error]);

  return (
    <div className="container mx-auto px-fluid-sm py-20 max-w-xl text-center">
      <h1 className="text-3xl md:text-4xl font-headline font-bold">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground">
        This page failed to load. You can try again or return home. No technical details are shown.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Button type="button" onClick={() => reset()}>
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go to homepage</Link>
        </Button>
      </div>
    </div>
  );
}
