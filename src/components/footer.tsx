
import Link from 'next/link';
import { IconFacebook, IconGithub, IconInstagram, IconLinkedIn, IconX, IconYouTube } from '@/lib/icons';
import { menuData, SitemapSection } from '@/lib/menu-data';
import { AdinkraBackground } from '@/components/ui/adinkra-background';
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
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-16 md:py-24">

          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Logo />
            <address className="text-sm text-muted-foreground not-italic">
              Lagos, Nigeria<br />
              Serving clients worldwide
            </address>
            <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto lg:mx-0">
              Ready to transform your business with intelligent technology? Let&apos;s build something great together.
            </p>
            <nav aria-label="LOG_ON social media links">
              <div className="flex justify-center lg:justify-start space-x-2 pt-2">
                {socialLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary p-2 rounded-full hover:bg-secondary/50 transition-colors"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
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
                          className="text-muted-foreground hover:text-primary transition-colors"
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
                          className="text-muted-foreground hover:text-primary transition-colors"
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
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </div>
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
