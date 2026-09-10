import { SITE } from '@/lib/site';

/** Server-rendered 40–50 word entity block. Visible to users and present in raw HTML. */
export function EntityLead({
  text = SITE.entityDefinition,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <p className={className ?? 'max-w-3xl text-base md:text-lg text-foreground leading-relaxed'}>
      {text}
    </p>
  );
}

export function PricingNote({ className }: { className?: string }) {
  return (
    <p className={className ?? 'text-sm md:text-base text-muted-foreground leading-relaxed'}>
      <strong className="text-foreground">Pricing. </strong>
      {SITE.pricingSummary}
    </p>
  );
}
