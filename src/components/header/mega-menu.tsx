
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { menuData, type MenuKey, SitemapSection } from "@/lib/menu-data";
import { ArrowRight } from "lucide-react";
import {
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string, shortDescription?: string, description?: string }
>(({ className, title, shortDescription, description, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description || shortDescription}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const hasItems = (section: SitemapSection | undefined): section is SitemapSection & { items: any[] } => {
  return section !== undefined && 'items' in section && Array.isArray(section.items);
};

export function MegaMenu({ menuKey }: { menuKey: MenuKey }) {
    const menuDetails = menuData.find(item => item.key === menuKey);

    if (!menuDetails) {
        return null;
    }

    // The 'partners' section is a link-only and doesn't have a dropdown.
    // We can return null or some other fallback UI here.
    if (!hasItems(menuDetails)) {
        return null;
    }

    return (
        <div className="p-4 md:grid md:w-[600px] lg:w-[700px] md:grid-cols-2 gap-x-2">
            <div className="flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-lg text-primary">{menuDetails.heading}</h3>
                    <p className="text-muted-foreground mt-1">{(menuDetails as any).intro}</p>
                </div>
                {(menuDetails as any).cta && (
                    <div className="mt-6">
                        <Link href={(menuDetails as any).cta.href} className={cn(buttonVariants({variant: 'default'}), 'group')}>
                           {(menuDetails as any).cta.label}
                           <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                )}
            </div>
            <ul className="grid grid-cols-1 gap-2 pt-4 md:pt-0">
                {menuDetails.items.map((item) => (
                    <ListItem key={item.title} title={item.title} href={item.href} description={item.description} shortDescription={item.shortDescription} />
                ))}
            </ul>
        </div>
    );
}
