"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current = mounted ? theme ?? "system" : "system";
  const resolved = mounted ? resolvedTheme : undefined;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative shrink-0 text-[#F3EDE2] hover:bg-white/10 hover:text-[#F3EDE2]"
          aria-label={`Theme: ${current}. Change colour theme`}
        >
          <Sun
            className={cn(
              "h-5 w-5 transition-all",
              mounted && resolved === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
            )}
          />
          <Moon
            className={cn(
              "absolute h-5 w-5 transition-all",
              mounted && resolved === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-[200] min-w-[9rem] bg-[var(--mega-bg)] text-[var(--mega-fg)] border-[var(--color-border)]"
      >
        {OPTIONS.map(({ id, label, icon: Icon }) => (
          <DropdownMenuItem
            key={id}
            onSelect={() => setTheme(id)}
            className={cn("gap-2 cursor-pointer", current === id && "bg-accent text-accent-foreground")}
          >
            <Icon className="h-4 w-4" />
            {label}
            {current === id ? <span className="ml-auto text-xs text-primary">On</span> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
