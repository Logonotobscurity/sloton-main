import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Offline | LOG_ON',
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="container mx-auto max-w-xl px-fluid-sm py-24 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Offline</p>
      <h1 className="mt-3 font-headline text-3xl font-bold">You appear to be offline</h1>
      <p className="mt-4 text-muted-foreground">
        Reconnect to load the latest LOG_ON pages. The homepage may still be available from cache.
      </p>
      <Button asChild className="mt-8 rounded-full">
        <Link href="/">Try homepage</Link>
      </Button>
    </div>
  );
}
