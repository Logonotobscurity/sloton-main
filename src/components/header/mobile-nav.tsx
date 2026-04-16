
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import Link from "next/link";
import { Mail } from "lucide-react";
import { menuData, SitemapSection, SectionWithItems } from "@/lib/menu-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/header/theme-toggle";
import { motion } from "framer-motion";
import { useUiStore } from "@/hooks/use-ui-store";
import { IconFacebook, IconX, IconLinkedIn, IconInstagram, IconYouTube, IconGithub } from "@/lib/icons";
import { cn } from "@/lib/utils";

const hasItems = (section: SitemapSection): section is SectionWithItems => {
    return 'items' in section && Array.isArray(section.items);
};

const MobileNavigation = () => {
    const { setMenuOpen } = useUiStore();
    return (
        <ScrollArea className="flex-1">
            <div className="flex-grow p-4">
                <Accordion type="multiple" className="w-full">
                    {menuData.map((menu) => {
                        if (hasItems(menu)) {
                            return (
                                <AccordionItem value={menu.key} key={menu.key}>
                                    <AccordionTrigger className="text-lg font-semibold">{menu.heading}</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="flex flex-col space-y-2 py-2">
                                            {menu.items.map(item => (
                                                <li key={item.title}>
                                                    <Link href={item.href} className="block p-2 rounded-md hover:bg-accent" onClick={() => setMenuOpen(false)}>
                                                        <span className="font-semibold">{item.title}</span>
                                                        <p className="text-sm text-muted-foreground">{item.shortDescription}</p>
                                                    </Link>
                                                </li>
                                            ))}
                                            {menu.cta && (
                                                <li>
                                                    <Link href={menu.cta.href} className="block p-2 rounded-md font-semibold text-primary hover:bg-accent" onClick={() => setMenuOpen(false)}>
                                                        {menu.cta.label}
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        } else if ('href' in menu) {
                            return (
                                <Link key={menu.key} href={menu.href} className="flex border-b text-lg font-semibold p-4" onClick={() => setMenuOpen(false)}>
                                    {menu.heading}
                                </Link>
                            );
                        }

                        return null;
                    })}
                </Accordion>

                {/* Theme Toggle - Moved inside ScrollArea */}
                <div className="flex items-center justify-between w-full py-4 px-2 border-t border-b mt-4">
                    <span className="text-sm font-semibold text-muted-foreground">Theme</span>
                    <ThemeToggle />
                </div>

                {/* Social Media Icons - Moved inside ScrollArea */}
                <div className="flex flex-col gap-3 w-full py-4 px-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">Connect With Us</h3>
                    <div className="flex items-center flex-wrap gap-4">
                        <Link
                            href="mailto:logonthepage@gmail.com"
                            className="text-primary hover:text-primary/80 transition-colors duration-200"
                            aria-label="Contact us via email"
                            onClick={() => setMenuOpen(false)}
                        >
                            <Mail className="h-5 w-5" />
                        </Link>
                        <Link
                            href="https://x.com/Logo_obscurity"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors duration-200"
                            aria-label="Follow LOG_ON on X (formerly Twitter)"
                            onClick={() => setMenuOpen(false)}
                        >
                            <IconX className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/logo-oluwamayowa-cpo-/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors duration-200"
                            aria-label="Connect with LOG_ON on LinkedIn"
                            onClick={() => setMenuOpen(false)}
                        >
                            <IconLinkedIn className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        <Link
                            href="https://github.com/Logonotobscurity/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors duration-200"
                            aria-label="View LOG_ON source code on GitHub"
                            onClick={() => setMenuOpen(false)}
                        >
                            <IconGithub className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
};


export const MobileNav = () => {
    const { isMenuOpen, setMenuOpen } = useUiStore();

    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            // Hide Botpress widget when menu is open
            const botpressWidget = document.getElementById('botpress-webchat');
            if (botpressWidget) {
                botpressWidget.style.display = 'none';
            }
        } else {
            document.body.style.overflow = '';
            // Show Botpress widget when menu is closed
            const botpressWidget = document.getElementById('botpress-webchat');
            if (botpressWidget) {
                botpressWidget.style.display = '';
            }
        }
        return () => {
            document.body.style.overflow = '';
            // Ensure widget is visible on cleanup
            const botpressWidget = document.getElementById('botpress-webchat');
            if (botpressWidget) {
                botpressWidget.style.display = '';
            }
        };
    }, [isMenuOpen]);

    return (
        <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
                <button
                    className={cn("hamburger", isMenuOpen && "open")}
                    aria-label="Open navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm p-0 flex flex-col" aria-label="Mobile navigation menu">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="h-full flex flex-col"
                >
                    <SheetHeader className="p-4 border-b flex flex-row items-center justify-between">
                        <SheetTitle asChild>
                            <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => setMenuOpen(false)} aria-label="LOG_ON Homepage">
                                <Logo />
                            </Link>
                        </SheetTitle>
                    </SheetHeader>

                    <MobileNavigation />
                </motion.div>
            </SheetContent>
        </Sheet>
    );
};
