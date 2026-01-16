"use client";

import Link from 'next/link';
import { Button } from '../ui/button';
import { AdinkraBackground } from '../ui/adinkra-background';

export function Statement() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <AdinkraBackground />
      <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl relative z-20">
        <h2 className="font-headline text-[clamp(1.8rem,5vw,3.5rem)] font-bold !leading-snug mb-12 uppercase max-w-3xl mx-auto">
          We&apos;re intentionally <span className="text-primary">small</span> and proudly <span className="text-primary">versatile</span>. While others get stuck in silos, we move <span className="text-accent">fast</span> and <span className="text-accent">adapt</span>—delivering what most big teams can&apos;t: <span className="text-primary">results</span>.
        </h2>
        <Button asChild size="lg">
          <Link href="/contact">
            Start a Conversation
          </Link>
        </Button>
      </div>
    </section>
  );
}
