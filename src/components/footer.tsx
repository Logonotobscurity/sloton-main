
import Link from 'next/link';
import { IconFacebook, IconGithub, IconInstagram, IconLinkedIn, IconX, IconYouTube } from '@/lib/icons';
import { menuData, SitemapSection } from '@/lib/menu-data';
import { AdinkraBackground } from './ui/adinkra-background';
import { Logo } from '@/components/header/logo';

const socialLinks = [
  { href: 'https://x.com/Logo_obscurity', label: 'Follow LOG_ON on X (formerly Twitter)', icon: <IconX className="w-5 h-5" aria-hidden="true" /> },
  { href: 'https://www.linkedin.com/in/logo-oluwamayowa-cpo-/', label: 'Connect with LOG_ON on LinkedIn', icon: <IconLinkedIn className="w-5 h-5" aria-hidden="true" /> },
  { href: 'https://github.com/Logonotobscurity/', label: 'View LOG_ON source code on GitHub', icon: <IconGithub className="w-5 h-5" aria-hidden="true" /> },
];

const solutions = menuData.find(item => item.key === 'solutions');
const company = menuData.find(item => item.key === 'company');
const resources = menuData.find(item => item.key === 'resources');

const hasItems = (section: SitemapSection | undefined): section is SitemapSection & { items: any[] } => {
  return section !== undefined && 'items' in section && Array.isArray(section.items);
};

export function Footer() {
  return (
    <footer className="bg-background border-t relative overflow-hidden" aria-label="Site footer">
      <AdinkraBackground aria-hidden="true" />
      <div className="container mx-auto px-fluid-sm relative z-20">
        <div className="footer-grid gap-8 lg:gap-12 py-16 md:py-24">

          {/* Brand Column — editorial */}
          <div className="space-y-5 flex flex-col items-center text-center md:items-start md:text-left min-w-0">
            <div className="w-full max-w-[280px] md:max-w-none overflow-hidden">
              <Logo />
            </div>
            <address className="text-sm text-muted-foreground not-italic font-mono text-xs tracking-wide">
              Lagos, Nigeria<br />
              Serving clients worldwide
            </address>
            <p
              className="text-muted-foreground text-[clamp(0.95rem,1.2vw,1.05rem)] leading-relaxed max-w-md mx-auto md:mx-0 text-balance"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Ready to transform your business with intelligent technology? Let&apos;s build something great together.
            </p>
            <nav aria-label="LOG_ON social media links" className="w-full">
              <div className="flex justify-center md:justify-start gap-1 pt-2 flex-wrap">
                {socialLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary p-2.5 rounded-full hover:bg-secondary/50 transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Navigation Columns — each is a grid item, so total 4 columns at desktop */}

              {hasItems(solutions) && (
                <nav aria-label={`Footer navigation: ${solutions.heading}`}>
                  <h3 className="font-semibold mb-4 text-primary text-lg tracking-wider">
                    {solutions.heading}
                  </h3>
                  <ul className="space-y-3 list-none">
                    {solutions.items.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          aria-label={`Go to ${item.title}`}
                          className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              {hasItems(company) && (
                <nav aria-label={`Footer navigation: ${company.heading}`}>
                  <h3 className="font-semibold mb-4 text-primary text-lg tracking-wider">
                    {company.heading}
                  </h3>
                  <ul className="space-y-3 list-none">
                    {company.items.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          aria-label={`Go to ${item.title}`}
                          className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              {hasItems(resources) && (
                <nav aria-label={`Footer navigation: ${resources.heading}`}>
                  <h3 className="font-semibold mb-4 text-primary text-lg tracking-wider">
                    {resources.heading}
                  </h3>
                  <ul className="space-y-3 list-none">
                    {resources.items.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          aria-label={`Go to ${item.title}`}
                          className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
        </div>

        <div className="border-t py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LOG_ON. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
