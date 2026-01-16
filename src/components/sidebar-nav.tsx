
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const [activeHash, setActiveHash] = React.useState('');

  React.useEffect(() => {
    const getHash = () => window.location.hash;
    setActiveHash(getHash());

    const handleHashChange = () => {
      setActiveHash(getHash());
    };
    
    window.addEventListener('hashchange', handleHashChange, { passive: true });
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleClick = (hash: string) => {
    // This is a fallback for smooth scrolling, but useEffect will handle the state
    const targetElement = document.getElementById(hash.substring(1));
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        "flex flex-col space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const itemHash = item.href.split('#')[1] ? `#${item.href.split('#')[1]}` : '';
        const isActive = activeHash === itemHash;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => handleClick(itemHash)}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              isActive
                ? "bg-muted hover:bg-muted text-primary"
                : "hover:bg-muted/50 hover:underline",
              "justify-start"
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
