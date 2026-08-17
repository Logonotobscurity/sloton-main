"use client";

import { AnimatedCodeBackground } from "@/components/ui/animated-code-background";

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { IconGithub, IconLinkedIn, IconX } from '@/lib/icons';
import { menuData, SitemapSection } from '@/lib/menu-data';
import { AdinkraBackground } from './ui/adinkra-background';
import { Logo } from '@/components/header/logo';

const socialLinks = [
  { href: 'https://x.com/Logo_obscurity', label: 'Follow LOG_ON on X', icon: <IconX className="w-5 h-5" aria-hidden="true" /> },
  { href: 'https://www.linkedin.com/in/logo-oluwamayowa-cpo-/', label: 'LinkedIn', icon: <IconLinkedIn className="w-5 h-5" aria-hidden="true" /> },
  { href: 'https://github.com/Logonotobscurity/', label: 'GitHub', icon: <IconGithub className="w-5 h-5" aria-hidden="true" /> },
];

const solutions = menuData.find(item => item.key === 'solutions');
const company = menuData.find(item => item.key === 'company');
const resources = menuData.find(item => item.key === 'resources');

const hasItems = (section: SitemapSection | undefined): section is SitemapSection & { items: any[] } => {
  return section !== undefined && 'items' in section && Array.isArray(section.items);
};

function FooterSection({
  title,
  items,
  sectionKey,
  expanded,
  onToggle,
}: {
  title: string;
  items: any[];
  sectionKey: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      data-footer-section
      data-expanded={expanded ? 'true' : 'false'}
      className="border-b lg:border-0 border-border/50 py-4 lg:py-0"
    >
      {/* Header — always visible, button for mobile/tablet/mid, static at desktop */}
      <button
        data-footer-header
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`footer-panel-${sectionKey}`}
        className="w-full flex items-center justify-between text-left lg:cursor-default lg:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md -mx-1 px-1 py-2 min-h-[48px] hover:bg-primary/5 lg:hover:bg-transparent transition-colors"
      >
        <h3 className="font-semibold text-primary text-[15px] tracking-widest font-mono uppercase">
          {title}
        </h3>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground lg:hidden transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={`footer-panel-${sectionKey}`}
        data-footer-content
        className="lg:!max-h-none lg:!opacity-100 lg:!mt-4"
      >
        <ul className="space-y-3 list-none pt-3 lg:pt-0">
          {items.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                aria-label={`Go to ${item.title}`}
                className="text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm text-sm inline-flex min-h-[32px] items-center px-1 -mx-1 font-medium"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Footer() {
  const [open, setOpen] = useState<Record<string, boolean>>({
    solutions: true,
    company: true,
    resources: true,
  });

  const toggle = (key: string) => setOpen((p) => ({ ...p, [key]: !p[key] }));

  return (
    <footer className="bg-background border-t relative overflow-hidden" aria-label="Site footer">
      <AnimatedCodeBackground variant="default" density="low" />
      <AdinkraBackground aria-hidden="true" />

      {/* Waveform top border */}
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-fluid-sm relative z-20">
        {/* Main grid — 1 → 2 → 3 → 4 */}
        <div className="footer-grid gap-8 lg:gap-10 py-12 md:py-16">
          {/* Brand — editorial */}
          <div className="space-y-4 flex flex-col items-center text-center md:items-start md:text-left min-w-0 md:col-span-2 lg:col-span-1">
            <div className="w-full max-w-[260px] md:max-w-none overflow-hidden">
              <Logo />
            </div>

            {/* Waveform logo accent — SVG wave under wordmark */}
            <div aria-hidden="true" className="w-full max-w-[280px] md:max-w-[320px] h-6 overflow-hidden opacity-60">
              <svg viewBox="0 0 320 24" className="w-full h-full" preserveAspectRatio="none">
                <path
                  d="M0 12 Q 20 2, 40 12 T 80 12 T 120 12 T 160 12 T 200 12 T 240 12 T 280 12 T 320 12"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.2"
                  opacity="0.5"
                />
                <rect x="0" y="11" width="320" height="0.5" fill="hsl(var(--border))" opacity="0.6" />
              </svg>
            </div>

            <address className="text-xs font-mono tracking-wide text-muted-foreground not-italic leading-relaxed">
              Lagos, Nigeria
              <br />
              Serving clients worldwide • 9.0820° N, 8.6753° E
            </address>
            <p
              className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto md:mx-0 text-balance"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Intelligent automation for growing businesses. Editorial, technical, human.
            </p>
            <nav aria-label="LOG_ON social media" className="w-full">
              <div className="flex justify-center md:justify-start gap-1 pt-1 flex-wrap">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary border border-transparent hover:border-border hover:bg-secondary/40 p-2.5 rounded-full transition-all min-h-[44px] min-w-[44px] inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Collapsible nav columns — 4th column is brand, so 3 navs = 4 total at lg */}
          {hasItems(solutions) && (
            <FooterSection
              title={solutions.heading}
              items={solutions.items}
              sectionKey="solutions"
              expanded={open.solutions}
              onToggle={() => toggle('solutions')}
            />
          )}
          {hasItems(company) && (
            <FooterSection
              title={company.heading}
              items={company.items}
              sectionKey="company"
              expanded={open.company}
              onToggle={() => toggle('company')}
            />
          )}
          {hasItems(resources) && (
            <FooterSection
              title={resources.heading}
              items={resources.items}
              sectionKey="resources"
              expanded={open.resources}
              onToggle={() => toggle('resources')}
            />
          )}
        </div>

        {/* Legal row */}
        <div className="border-t border-border/60 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs font-mono tracking-wide text-muted-foreground">
            © {new Date().getFullYear()} LOG_ON. All Rights Reserved. • Privacy • Terms • <Link href="/sitemap.xml" className="hover:text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Sitemap</Link>
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              All systems operational
            </span>
            <span aria-hidden="true" className="opacity-30">•</span>
            <span>Lagos • Remote worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
