"use client";

import * as React from "react";
import { menuData, SitemapSection } from "@/lib/menu-data";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MegaMenu } from "./mega-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const hasItems = (section: SitemapSection) =>
  "items" in section && Array.isArray(section.items);

export function DesktopNav() {
  const pathname = usePathname();

  const isActive = (menu: SitemapSection) => {
    if ("items" in menu && menu.items) {
      return menu.items.some(
        (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
      );
    }
    return "href" in menu && menu.href === pathname;
  };

  return (
    <NavigationMenu className="max-w-none justify-center">
      <NavigationMenuList className="gap-1">
        {menuData.map((menu) => {
          const active = isActive(menu);
          return (
            <NavigationMenuItem key={menu.key}>
              {hasItems(menu) ? (
                <>
                  <NavigationMenuTrigger
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "nav-pill h-10 bg-transparent px-3 text-sm font-semibold tracking-wide",
                      active && "bg-vista-cream text-vista-navy"
                    )}
                  >
                    {menu.heading}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="rounded-2xl">
                    <MegaMenu menuKey={menu.key as "solutions" | "resources" | "company"} />
                  </NavigationMenuContent>
                </>
              ) : (
                "href" in menu && (
                  <NavigationMenuLink asChild>
                    <Link
                      href={menu.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "nav-pill h-10 bg-transparent px-3 text-sm font-semibold tracking-wide",
                        active && "bg-vista-cream text-vista-navy"
                      )}
                    >
                      {menu.heading}
                    </Link>
                  </NavigationMenuLink>
                )
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
