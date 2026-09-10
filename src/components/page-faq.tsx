import { JsonLd } from '@/lib/seo';
import { generateFAQSchema } from '@/lib/seo/metadata';

export type PageFaqItem = { question: string; answer: string };

/** Server-rendered FAQ using details/summary so answers exist in raw HTML. */
export function PageFaq({ items, title = 'Frequently asked questions' }: { items: PageFaqItem[]; title?: string }) {
  if (!items.length) return null;
  return (
    <section className="verdara-section py-fluid-md px-5" aria-labelledby="page-faq-heading">
      <JsonLd data={generateFAQSchema(items)} />
      <h2 id="page-faq-heading" className="verdara-title mb-6">
        {title}
      </h2>
      <div className="space-y-3 max-w-3xl">
        {items.map((item) => (
          <details key={item.question} className="verdara-card verdara-card-compact group">
            <summary className="cursor-pointer font-medium list-none flex justify-between gap-4 min-h-11 items-center">
              {item.question}
              <span className="text-primary group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="verdara-lede mt-3">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
