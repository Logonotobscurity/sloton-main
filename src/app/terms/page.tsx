import { PageHero } from '@/components/page-sections/page-hero';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Terms of Use',
  description: 'Terms for using the LOG_ON website and requesting consulting services.',
  canonical: 'https://logonai.netlify.app/terms',
});

export default function TermsPage() {
  return (
    <div className="bg-background">
      <PageHero
        kicker="Legal"
        title="Terms of Use"
        description="These terms govern access to the LOG_ON website and inquiries for consulting work. They are not a client statement of work."
      />
      <article className="container mx-auto max-w-3xl px-fluid-sm py-fluid-lg prose prose-neutral dark:prose-invert">
        <p>Last updated: 18 August 2026</p>
        <h2>The site</h2>
        <p>
          Content is provided for information. Engagements start only after a written scope and
          commercial agreement. Pricing on the site is indicative.
        </p>
        <h2>Acceptable use</h2>
        <p>
          Do not abuse forms, the AI assistant, or APIs. We may rate-limit or block traffic that
          harms the service.
        </p>
        <h2>Liability</h2>
        <p>
          The site is provided as-is. LOG_ON is not liable for decisions made solely from public
          marketing copy or the demo assistant.
        </p>
        <h2>Contact</h2>
        <p>
          <a href="mailto:logonthepage@gmail.com">logonthepage@gmail.com</a>
        </p>
      </article>
    </div>
  );
}
