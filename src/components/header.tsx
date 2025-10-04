
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { Menu, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { menuData } from '@/lib/menu-data';
import { useUIStore } from '@/stores/ui-store';

const { products, industries, learning, partners, company, support } = menuData.menu;

const MegaMenuLink = ({ item, onLinkClick }: { item: any, onLinkClick?: () => void }) => (
    <Link href={item.href || '#'} onClick={onLinkClick} className="group/item block p-2 rounded-md transition-colors hover:bg-secondary">
      <div className="flex flex-col">
        <span className="font-semibold text-sm text-foreground">{item.title}</span>
        {item.description && <span className="text-xs text-muted-foreground">{item.description}</span>}
        {item.shortDescription && <span className="text-xs text-muted-foreground">{item.shortDescription}</span>}
      </div>
    </Link>
);

const MobileNavLink = ({ href, children, onLinkClick }: { href: string; children: React.ReactNode; onLinkClick: () => void }) => (
    <SheetClose asChild>
        <Link
            href={href}
            onClick={onLinkClick}
            className="block py-2 text-base font-medium transition-colors hover:text-primary"
            prefetch={false}
        >
            {children}
        </Link>
    </SheetClose>
);


const Logo = () => (
    <Link href="/" className="flex items-center" prefetch={false}>
        <div className="flex flex-col items-start">
          <span className="font-bold text-2xl tracking-tighter text-primary leading-tight">LOG_ON</span>
          <span className="text-xs text-muted-foreground -mt-1">Connecting Advantages...</span>
        </div>
    </Link>
);

const MegaMenuContent = ({ navItem, onLinkClick }: { navItem: any, onLinkClick?: () => void }) => {
    switch (navItem.label) {
        case 'What We Solve':
            const { heading: pHeading, intro: pIntro, cta: pCta, items: pItems } = products;
            return (
                <div className="grid grid-cols-12 gap-x-2">
                    <div className="col-span-3 p-4">
                        <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground px-2">{pHeading}</h3>
                        <p className="text-xs text-muted-foreground mt-1 px-2">{pIntro}</p>
                         <div className="px-2 mt-3">
                            <Button asChild size="sm">
                                <Link href={pCta.href}>See All Solutions</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-9 p-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
                            {pItems.map(item => <MegaMenuLink key={item.title} item={item} onLinkClick={onLinkClick} />)}
                        </div>
                    </div>
                </div>
            );
        case 'See Results':
            const { heading: iHeading, intro: iIntro, cta: iCta, items: iItems } = industries;
            return (
                <div className="grid grid-cols-12 gap-x-2">
                    <div className="col-span-3 p-4">
                        <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground px-2">{iHeading}</h3>
                        <p className="text-xs text-muted-foreground mt-1 px-2">{iIntro}</p>
                         <div className="px-2 mt-3">
                            <Button asChild size="sm">
                                <Link href={iCta.href}>{iCta.label}</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="col-span-9 p-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
                            {iItems.map(item => <MegaMenuLink key={item.title} item={{...item, href: item.href || '/use-cases'}} onLinkClick={onLinkClick} />)}
                        </div>
                    </div>
                </div>
            );
        case 'Build Skills':
             const { heading: lHeading, leftNav: lLeftNav, center: lCenter } = learning;
            return (
                 <div className="grid grid-cols-12">
                    <div className="col-span-4 p-3 border-r border-border/50">
                         <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground px-2 mb-2">{lHeading}</h3>
                         <ul className="space-y-1">
                            {lLeftNav.map(item => <li key={item}><Link href="/training" onClick={onLinkClick} className="block p-2 text-sm rounded-md hover:bg-secondary">{item}</Link></li>)}
                         </ul>
                    </div>
                    <div className="col-span-8 p-3">
                         <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                            {lCenter.links.map(link => (
                                 <Link href={link.href || '/training'} key={link.title} className="group" onClick={onLinkClick}>
                                     <h4 className="font-semibold text-sm group-hover:text-primary">{link.title}</h4>
                                     <p className="text-xs text-muted-foreground">{link.desc}</p>
                                 </Link>
                            ))}
                        </div>
                    </div>
                </div>
            );
        case 'Partners':
             const { heading: paHeading, intro: paIntro, cta: paCta, items: paItems } = partners;
            return (
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-2">
                     <div className="lg:col-span-4 p-4">
                         <h3 className="text-base font-bold text-primary mb-1">{paHeading}</h3>
                         <p className="text-xs text-muted-foreground mb-3">{paIntro}</p>
                         <Button asChild size="sm">
                            <Link href={paCta.href}>{paCta.label}</Link>
                         </Button>
                     </div>
                     <div className="lg:col-span-8 p-3 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                         {paItems.map(item => (
                            <Link href={item.href || '/contact-us'} key={item.title} className="group" onClick={onLinkClick}>
                                <h4 className="font-semibold text-sm group-hover:text-primary">{item.title}</h4>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </Link>
                         ))}
                     </div>
                </div>
            );
        case 'Company':
            const { items: coItems } = company;
            return (
                <div className="p-3 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
                    {coItems.map(item => (
                        <Link href={item.href || '/about-us'} key={item.title} className="group" onClick={onLinkClick}>
                            <h4 className="font-semibold text-sm group-hover:text-primary">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </Link>
                    ))}
                </div>
            );
        case 'Support':
             const { heading: sHeading, leftNav: sLeftNav, center: sCenter, promo: sPromo } = support;
            return (
                 <div className="grid grid-cols-12">
                    <div className="col-span-3 p-3 border-r border-border/50">
                         <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground px-2 mb-2">{sHeading}</h3>
                         <ul className="space-y-1">
                            {sLeftNav.map(item => <li key={item}><Link href="/support-center" onClick={onLinkClick} className="block p-2 text-sm rounded-md hover:bg-secondary">{item}</Link></li>)}
                         </ul>
                    </div>
                     <div className="col-span-5 p-4">
                        <h3 className="text-base font-bold text-primary mb-1">{sCenter.title}</h3>
                        <p className="text-xs text-muted-foreground mb-4">{sCenter.intro}</p>
                        {sCenter.links.map(link => (
                            <Link href={link.href || '/support-center'} key={link.title} className="group" onClick={onLinkClick}>
                                <h4 className="font-semibold text-sm group-hover:text-primary">{link.title}</h4>
                                <p className="text-xs text-muted-foreground">{link.desc}</p>
                            </Link>
                         ))}
                    </div>
                     <aside className="col-span-4 p-4 bg-secondary/30 rounded-r-lg">
                        <h4 className="font-semibold mb-2">{sPromo.title}</h4>
                        <p className="text-sm mb-4">{sPromo.desc}</p>
                        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                            <Link href={sPromo.cta.href || '/support-center'}>{sPromo.cta.label}</Link>
                        </Button>
                    </aside>
                </div>
            );
        default:
            return null;
    }
};

const navLinks = [
  { label: 'What We Solve', href: '/solutions' },
  { label: 'See Results', href: '/use-cases' },
  { label: 'Build Skills', href: '/training' },
  { label: 'Partners', href: '/partners' },
  { label: 'Company', href: '/about' },
  { label: 'Support', href: '/support' },
];

export function Header() {
  const { isHeaderScrolled, mobileMenuOpen, setHeaderScrolled, setMobileMenuOpen } = useUIStore();
  const pathname = usePathname();
  
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setHeaderScrolled]);

  const handleMobileLinkClick = () => setMobileMenuOpen(false);

  const getMenuItems = (label: string) => {
    switch (label) {
        case 'What We Solve': return products.items;
        case 'See Results': return industries.items;
        case 'Build Skills': return learning.center.links;
        case 'Partners': return partners.items;
        case 'Company': return company.items;
        case 'Support': return support.center.links;
        default: return [];
    }
  };

  const NavLink = ({ href, children, hasDropdown }: { href: string; children: React.ReactNode, hasDropdown?: boolean }) => (
    <Link href={href} className={cn(
        "flex items-center text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md",
        pathname === href || (href !== '/' && pathname.startsWith(href)) ? "bg-secondary text-primary" : ""
    )}>
        {children}
        {hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
    </Link>
  );

  return (
    <header 
        className={cn(
            "sticky top-0 z-50 w-full transition-all duration-300",
            isHeaderScrolled ? "py-2 bg-background/80 backdrop-blur-lg border-b shadow-lg" : "py-4"
        )}
    >
      <div className={cn(
          "container mx-auto flex items-center justify-between transition-all duration-300 px-4 md:px-6",
           isHeaderScrolled ? "max-w-7xl" : "max-w-6xl"
      )}>
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between w-full">
            <div className="flex-shrink-0">
                <Logo />
            </div>
            
            <nav className="flex-1 flex justify-center items-center">
                <div className="group relative flex h-full items-center">
                    <NavLink href="/solutions" hasDropdown>What We Solve</NavLink>
                    <div className={cn(
                        "absolute top-full pt-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto",
                        "w-screen max-w-4xl -translate-x-1/2 left-1/2"
                    )}>
                        <div className="bg-background rounded-lg shadow-2xl border overflow-hidden">
                            <MegaMenuContent navItem={{ label: 'What We Solve' }} onLinkClick={() => {}} />
                        </div>
                    </div>
                </div>
                <NavLink href="/use-cases">See Results</NavLink>
                <div className="group relative flex h-full items-center">
                     <NavLink href="/training" hasDropdown>Build Skills</NavLink>
                     <div className={cn(
                        "absolute top-full pt-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto",
                        "w-screen max-w-4xl -translate-x-1/2 left-1/2"
                    )}>
                        <div className="bg-background rounded-lg shadow-2xl border overflow-hidden">
                            <MegaMenuContent navItem={{ label: 'Build Skills' }} onLinkClick={() => {}} />
                        </div>
                    </div>
                </div>
                <NavLink href="/partners">Partners</NavLink>
                <div className="group relative flex h-full items-center">
                    <NavLink href="/about" hasDropdown>Company</NavLink>
                    <div className={cn(
                        "absolute top-full pt-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto",
                        "w-screen max-w-sm -translate-x-1/2 left-1/2"
                    )}>
                        <div className="bg-background rounded-lg shadow-2xl border overflow-hidden">
                            <MegaMenuContent navItem={{ label: 'Company' }} onLinkClick={() => {}} />
                        </div>
                    </div>
                </div>
            </nav>
            
            <div className="flex items-center gap-2 flex-shrink-0">
                <ThemeToggle />
                <Button asChild>
                    <Link href="/contact">Contact Us</Link>
                </Button>
            </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between w-full">
            <Logo />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Toggle navigation menu">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-sm bg-background p-0 flex flex-col">
                    <SheetHeader>
                         <SheetClose asChild>
                           <div className="p-4 border-b">
                            <Logo />
                           </div>
                        </SheetClose>
                         <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex-grow overflow-y-auto p-4">
                        <Accordion type="multiple" className="w-full">
                             {navLinks.map(navItem => (
                                <AccordionItem value={navItem.label} key={navItem.label}>
                                    <AccordionTrigger>
                                        <Link href={navItem.href} onClick={(e) => { e.stopPropagation(); handleMobileLinkClick(); }} className="text-lg font-bold">
                                            {navItem.label}
                                        </Link>
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-4 space-y-2">
                                        {getMenuItems(navItem.label).map(subItem => (
                                             <MobileNavLink key={subItem.title} href={subItem.href || '#'} onLinkClick={handleMobileLinkClick}>{subItem.title}</MobileNavLink>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                             ))}
                        </Accordion>
                    </div>
                     <div className="p-4 border-t space-y-4">
                        <SheetClose asChild>
                            <Button asChild className="w-full">
                                <Link href="/contact" onClick={handleMobileLinkClick}>
                                    <Phone className="mr-2 h-4 w-4"/> Contact Us
                                </Link>
                            </Button>
                        </SheetClose>
                        <div className="flex justify-center">
                            <ThemeToggle />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
