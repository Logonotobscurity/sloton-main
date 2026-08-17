
"use client";

import Link from "next/link";
import { SkipToContentLink } from "./header/skip-to-content";
import { Logo } from "./header/logo";
import { cn } from "@/lib/utils";
import React from "react";
import { DesktopNav } from "./header/desktop-nav";
import { MobileNav } from "./header/mobile-nav";
import { Button } from "./ui/button";
import { ThemeToggle } from "./header/theme-toggle";
import { useUiStore } from "@/hooks/use-ui-store";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { isMenuOpen } = useUiStore();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SkipToContentLink />
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-background/90 backdrop-blur-xl shadow-sm border-border"
            : "bg-background/60 backdrop-blur-md border-transparent"
        )}
        role="banner"
      >
        <div
          className={cn(
            "container mx-auto flex items-center justify-between transition-all duration-300 ease-in-out px-fluid-sm",
            isScrolled ? "h-[64px]" : "h-[72px] md:h-[88px]"
          )}
        >
          <div className="flex flex-1 items-center gap-3 md:gap-6 min-w-0">
            <Link
              href="/"
              className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="LOG_ON — home"
            >
              <Logo />
            </Link>
            <div className="hidden lg:flex">
              <DesktopNav />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="header-cta hidden lg:inline-flex rounded-full px-6 font-semibold"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="header-cta lg:hidden rounded-full px-5"
            >
              <Link href="/contact">Contact</Link>
            </Button>
            <div className="ml-1 pl-3 border-l border-border">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center justify-end md:hidden gap-2">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
