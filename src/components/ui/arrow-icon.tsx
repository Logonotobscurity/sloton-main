"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function ArrowIcon({ className }: { className?: string }) {
    return (
        <ArrowRight className={cn("h-4 w-4", className)} />
    )
}
