
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowIcon } from './ui/arrow-icon';
import { AdinkraBackground } from './ui/adinkra-background';

export function BottomCta() {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <AdinkraBackground />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background z-10" />
      <div className="container mx-auto px-4 md:px-6 text-center relative z-20">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-primary">
          Ready to Start a Project?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-base md:text-lg text-muted-foreground">
          Let's talk about how we can help you achieve your goals.
        </p>
        <Button asChild variant="default" size="lg" className="group">
          <Link href="/contact">
            Contact Now <ArrowIcon className="ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
