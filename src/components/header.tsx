"use client";

import Link from "next/link";
import { SkipToContentLink } from "./header/skip-to-content";
import { Logo } from "./header/logo";
import { cn } from "@/lib/utils";
import React from "react";
import { DesktopNav } from "./header/desktop-nav";
import { MobileNav } from "./header/mobile-nav";
import { ThemeToggle } from "./header/theme-toggle";
import { usePathname } from "next/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <SkipToContentLink />
      <header
        className="sticky top-0 z-[80] w-full px-2 sm:px-4 pt-2 pb-2"
        role="banner"
      >
        <div
          className={cn(
            "vista-bar container mx-auto flex h-16 items-center justify-between gap-3 px-3 sm:px-5",
            isScrolled && "vista-bar-scrolled"
          )}
        >
          <div className="flex min-w-0 shrink-0 items-center">
            <Logo compact />
          </div>

          <nav className="hidden md:flex flex-1 justify-center px-2" aria-label="Primary">
            <DesktopNav />
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              className="header-cta hidden md:inline-flex items-center justify-center rounded-full px-5 font-semibold min-h-11"
            >
              Book a Demo
            </Link>
            <div className="flex items-center pl-2 border-l border-border/60">
              <ThemeToggle />
            </div>
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
        <noscript>
          <ul className="container mx-auto flex flex-wrap gap-4 px-fluid-sm py-2 text-sm">
            <li><a href="/solutions">Solutions</a></li>
            <li><a href="/resources">Resources</a></li>
            <li><a href="/about">Company</a></li>
            <li><a href="/partners">Partners</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </noscript>
      </header>
    </>
  );
}
