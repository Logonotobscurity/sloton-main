"use client";

import { useContext } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatbotContext } from "@/context/chatbot-provider";

export function BookDemoWidget() {
  const context = useContext(ChatbotContext);
  if (context?.isChatbotOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 z-[100]">
      <Link
        href="/contact"
        aria-label="Book a Demo"
        className={cn(
          "inline-flex items-center justify-center rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-transform",
          "h-14 w-14 md:h-auto md:w-auto md:px-6 md:py-3 md:min-h-11"
        )}
      >
        <Calendar className="h-6 w-6" aria-hidden />
        <span className="hidden md:inline ml-2 font-semibold">Book a Demo</span>
      </Link>
    </div>
  );
}
