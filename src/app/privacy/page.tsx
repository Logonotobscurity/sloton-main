import { PageHero } from '@/components/page-sections/page-hero';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Privacy Policy',
  description: 'How LOG_ON collects, uses, and protects information from the website, contact forms, and Tally inquiries.',
  canonical: 'https://logonai.netlify.app/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      <PageHero
        kicker="Legal"
        title="Privacy Policy"
        description="This policy describes how LOG_ON Solutions (Lagos, Nigeria) handles personal data submitted through logonai.netlify.app, Tally forms, email, and WhatsApp."
      />
      <article className="container mx-auto max-w-3xl px-fluid-sm py-fluid-lg prose prose-neutral dark:prose-invert">
        <p>Last updated: 18 August 2026</p>
        <h2>What we collect</h2>
        <p>
          Name, work email, optional phone, inquiry subject, message, and the service you selected.
          Server logs may include IP address and user agent for security and rate limiting.
        </p>
        <h2>How we use it</h2>
        <p>
          To reply to inquiries, send transactional email (Resend), measure form events (PostHog),
          and operate the optional Tally webhook. We do not sell personal data.
        </p>
        <h2>Sharing</h2>
        <p>
          Processors may include Tally, Resend, Netlify, Google (Gemini, if you use the assistant),
          and PostHog. Each is used only to deliver the service you requested.
        </p>
        <h2>Retention</h2>
        <p>Lead records are kept as long as needed to fulfil the inquiry and our legal obligations.</p>
        <h2>Contact</h2>
        <p>
          Email <a href="mailto:logonthepage@gmail.com">logonthepage@gmail.com</a> or WhatsApp +234 814 306 6320.
        </p>
      </article>
    </div>
  );
}
