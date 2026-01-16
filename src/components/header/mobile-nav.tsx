
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import Link from "next/link";
import { Menu } from "lucide-react";
import { menuData, SitemapSection, SectionWithItems } from "@/lib/menu-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";
import { useUiStore } from "@/hooks/use-ui-store";

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
                <div className="flex flex-col space-y-2 mt-4 border-t pt-4">
                    <Link href="/contact" className="text-lg font-semibold p-2 rounded-md hover:bg-accent" onClick={() => setMenuOpen(false)}>
                        Contact Us
                    </Link>
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
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
      <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu" aria-expanded={isMenuOpen}>
            <Menu className="h-6 w-6" />
          </Button>
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

            <SheetFooter className="p-4 border-t mt-auto bg-secondary/50 flex flex-row items-center justify-end">
                <ThemeToggle />
            </SheetFooter>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};
