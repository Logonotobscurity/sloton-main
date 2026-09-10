"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { menuData, SitemapSection, SectionWithItems } from "@/lib/menu-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/header/theme-toggle";
import { useUiStore } from "@/hooks/use-ui-store";
import { IconX, IconLinkedIn, IconGithub } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BrainCircuit, Workflow, Code2, Bot, LineChart, Database, Library, Newspaper,
  Building2, LayoutTemplate, GraduationCap, Compass, FileBarChart, Users,
  Briefcase, Handshake,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  BrainCircuit, Workflow, Code2, Bot, LineChart, Database, Library, Newspaper,
  Building2, LayoutTemplate, GraduationCap, Compass, FileBarChart, Users,
  Briefcase, Handshake, Mail,
};

const hasItems = (section: SitemapSection): section is SectionWithItems =>
  "items" in section && Array.isArray(section.items);

export const MobileNav = () => {
  const { isMenuOpen, setMenuOpen } = useUiStore();
  const pathname = usePathname();

  return (
    <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className={cn(
            "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 shadow-sm",
            "transition-colors hover:border-primary hover:bg-primary/5",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            isMenuOpen && "border-primary bg-primary/10"
          )}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">{isMenuOpen ? "Close" : "Menu"}</span>
          <span className="relative block h-3.5 w-4" aria-hidden>
            <span
              className={cn(
                "absolute left-0 top-0.5 h-0.5 w-4 rounded-full bg-foreground transition-transform duration-300",
                isMenuOpen && "top-1.5 rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[7px] h-0.5 w-3 rounded-full bg-foreground transition-all duration-300",
                isMenuOpen && "opacity-0 translate-x-1"
              )}
            />
            <span
              className={cn(
                "absolute left-0 bottom-0.5 h-0.5 w-4 rounded-full bg-foreground transition-transform duration-300",
                isMenuOpen && "bottom-1.5 -rotate-45"
              )}
            />
          </span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-[420px] p-0 flex flex-col border-l border-border bg-background"
        aria-label="Mobile navigation menu"
      >
        <div className="relative h-36 shrink-0 overflow-hidden">
          <Image
            src="/images/marks/hero-default.svg"
            alt=""
            fill
            className="object-cover"
            sizes="420px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
          <SheetHeader className="absolute inset-x-0 bottom-0 p-4 text-left">
            <SheetTitle asChild>
              <span className="inline-block" onClick={() => setMenuOpen(false)}>
                <Logo compact />
              </span>
            </SheetTitle>
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Menu</p>
          </SheetHeader>
        </div>

        <ScrollArea className="flex-1">
          <nav className="p-4 pb-8">
            <Accordion type="multiple" defaultValue={["solutions"]} className="w-full">
              {menuData.map((menu) => {
                if (hasItems(menu)) {
                  return (
                    <AccordionItem value={menu.key} key={menu.key} className="border-border/60">
                      <AccordionTrigger className="py-4 text-left text-xl font-headline font-semibold hover:no-underline hover:text-primary">
                        {menu.heading}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1 pb-2">
                          {menu.items.map((item) => {
                            const Icon = item.icon ? ICONS[item.icon] : undefined;
                            return (
                              <li key={item.title}>
                                <Link
                                  href={item.href}
                                  aria-current={pathname === item.href ? "page" : undefined}
                                  onClick={() => setMenuOpen(false)}
                                  className={cn(
                                    "flex gap-3 rounded-xl p-3 transition-colors hover:bg-primary/5 min-h-11",
                                    pathname === item.href && "bg-primary/5"
                                  )}
                                >
                                  {Icon ? (
                                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                                      <Icon className="h-4 w-4" />
                                    </span>
                                  ) : null}
                                  <span>
                                    <span className="block font-semibold">{item.title}</span>
                                    <span className="block text-sm text-muted-foreground">
                                      {item.shortDescription}
                                    </span>
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                }
                if ("href" in menu) {
                  return (
                    <Link
                      key={menu.key}
                      href={menu.href}
                      aria-current={pathname === menu.href ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-14 items-center border-b border-border/60 py-4 text-xl font-headline font-semibold hover:text-primary"
                    >
                      {menu.heading}
                    </Link>
                  );
                }
                return null;
              })}
            </Accordion>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-6 flex min-h-12 items-center justify-center rounded-full border-2 border-primary font-semibold hover:bg-primary/5"
            >
              Book a conversation
            </Link>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-border px-3 py-2">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>

            <div className="mt-6 flex gap-3">
              <Link href="mailto:logonthepage@gmail.com" aria-label="Email" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary">
                <Mail className="h-4 w-4" />
              </Link>
              <Link href="https://x.com/Logo_obscurity" target="_blank" rel="noopener noreferrer" aria-label="X" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary">
                <IconX className="h-4 w-4" />
              </Link>
              <Link href="https://www.linkedin.com/in/logo-oluwamayowa-cpo-/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary">
                <IconLinkedIn className="h-4 w-4" />
              </Link>
              <Link href="https://github.com/Logonotobscurity/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary">
                <IconGithub className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
