import Link from 'next/link';
import { EntityLead } from '@/components/entity-lead';
import { PageFaq } from '@/components/page-faq';
import { getServiceConcept } from '@/lib/data/site-index';

/** Definition + FAQ for service pages so Google and AI crawlers see one entity. */
export function ServiceConceptBlock({ path }: { path: string }) {
  const concept = getServiceConcept(path);
  if (!concept) return null;
  return (
    <div className="verdara-section space-y-8 rounded-[26px] px-5 py-8">
      <EntityLead text={concept.definition} />
      {concept.related?.length ? (
        <p className="text-sm text-muted-foreground">
          Related:{' '}
          {concept.related.map((href, i) => (
            <span key={href}>
              {i > 0 ? ' · ' : null}
              <Link href={href} className="text-primary underline hover:no-underline">
                {href}
              </Link>
            </span>
          ))}
        </p>
      ) : null}
      {concept.faq?.length ? <PageFaq items={concept.faq} /> : null}
    </div>
  );
}
