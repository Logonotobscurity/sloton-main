'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { AdinkraBackground } from '../ui/adinkra-background';
import { ArrowRight } from 'lucide-react';

export function BottomCta() {
  return (
    <section className="py-fluid-md bg-background relative overflow-hidden">
      <AdinkraBackground />
      <div className="container mx-auto px-fluid-sm text-center relative z-20">
        <h2 className="text-fluid-lg font-bold font-headline mb-4 text-primary">
          Ready to Start a Project?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-fluid-base text-muted-foreground">
          Let's talk about how we can help you achieve your goals.
        </p>
        <Button asChild variant="default" size="lg" className="group">
          <Link href="/contact">
            Contact Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
