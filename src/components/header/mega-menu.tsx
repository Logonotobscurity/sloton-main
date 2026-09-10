"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { menuData, type MenuKey, SitemapSection } from "@/lib/menu-data";
import { ArrowUpRight } from "lucide-react";
import {
  BrainCircuit,
  Workflow,
  Code2,
  Bot,
  LineChart,
  Database,
  Library,
  Newspaper,
  Building2,
  LayoutTemplate,
  GraduationCap,
  Compass,
  FileBarChart,
  Users,
  Briefcase,
  Handshake,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

const ICONS: Record<string, LucideIcon> = {
  BrainCircuit,
  Workflow,
  Code2,
  Bot,
  LineChart,
  Database,
  Library,
  Newspaper,
  Building2,
  LayoutTemplate,
  GraduationCap,
  Compass,
  FileBarChart,
  Users,
  Briefcase,
  Handshake,
  Mail,
};

const hasItems = (
  section: SitemapSection | undefined
): section is SitemapSection & { items: NonNullable<Extract<SitemapSection, { items?: unknown }>["items"]> } => {
  return section !== undefined && "items" in section && Array.isArray(section.items);
};

export function MegaMenu({ menuKey }: { menuKey: MenuKey }) {
  const pathname = usePathname();
  const menuDetails = menuData.find((item) => item.key === menuKey);
  if (!hasItems(menuDetails)) return null;

  const visual = "visual" in menuDetails ? menuDetails.visual : undefined;
  const visualAlt = "visualAlt" in menuDetails ? menuDetails.visualAlt : menuDetails.heading;
  const intro = "intro" in menuDetails ? menuDetails.intro : undefined;
  const cta = "cta" in menuDetails ? menuDetails.cta : undefined;

  return (
    <div className="verdara-mega w-[min(920px,calc(100vw-2rem))] p-3 md:p-4">
      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        <aside className="verdara-card relative overflow-hidden min-h-[200px] p-0">
          {visual ? (
            visual.endsWith(".svg") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={visual} alt={visualAlt || ""} className="absolute inset-0 h-full w-full object-cover object-right opacity-50" />
            ) : (
              <Image
                src={visual}
                alt={visualAlt || ""}
                fill
                className="object-cover object-[center_28%] opacity-50"
                sizes="240px"
              />
            )
          ) : null}
          <div className="relative z-10 flex h-full min-h-[200px] flex-col justify-end p-4">
            <p className="verdara-kicker">{menuDetails.heading}</p>
            {intro ? <p className="verdara-lede mt-2">{intro}</p> : null}
            {cta ? (
              <Link
                href={cta.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
              >
                {cta.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </aside>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {menuDetails.items.map((item) => {
            const Icon = item.icon ? ICONS[item.icon] : undefined;
            return (
              <li key={item.title}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "verdara-card verdara-card-compact group flex gap-3 no-underline outline-none",
                      pathname === item.href && "border-[var(--mega-fg)]"
                    )}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-current">
                      {Icon ? <Icon className="h-5 w-5" aria-hidden /> : null}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{item.title}</span>
                      <span className="verdara-lede mt-0.5 block text-xs">
                        {item.shortDescription || item.description}
                      </span>
                    </span>
                  </Link>
                </NavigationMenuLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
