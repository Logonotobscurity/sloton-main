
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
import { motion } from "framer-motion";

const hasItems = (section: SitemapSection) => 'items' in section && Array.isArray(section.items);

export function DesktopNav() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Find the parent menu key for the current path
    for (const menu of menuData) {
      if ('items' in menu && menu.items) {
        if (menu.items.some(item => pathname === item.href || pathname.startsWith(`${item.href}/`))) {
          setActiveMenu(menu.key);
          return;
        }
      } else if ('href' in menu && menu.href === pathname) {
        setActiveMenu(menu.key);
        return;
      }
    }
    // If no match, check if it's the homepage
    if (pathname === '/') {
        setActiveMenu(null); // Or a specific key for 'Home' if you have one
    } else {
        setActiveMenu(null);
    }
  }, [pathname]);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuData.map((menu) => {
          return (
            <NavigationMenuItem key={menu.key} className="relative">
              {hasItems(menu) ? (
                <>
                  <NavigationMenuTrigger className="font-semibold text-base bg-transparent">
                    {menu.heading}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MegaMenu menuKey={menu.key as 'solutions' | 'resources' | 'company'} />
                    </motion.div>
                  </NavigationMenuContent>
                </>
              ) : (
                'href' in menu && (
                   <NavigationMenuLink asChild>
                      <Link href={menu.href} className={cn(navigationMenuTriggerStyle(), "font-semibold text-base bg-transparent")}>
                        {menu.heading}
                      </Link>
                    </NavigationMenuLink>
                )
              )}
              {activeMenu === menu.key && (
                <motion.div
                  layoutId="active-nav-underline"
                  className="absolute bottom-[-8px] left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
