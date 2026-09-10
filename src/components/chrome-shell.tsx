"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatbotWidgets } from "@/components/chatbot-widgets";
import { SiteBackground } from "@/components/site-background";

const SYSTEMS = new Set(["verda", "verdara", "vista", "tessera", "chamfer"]);

export function ChromeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const standalone = SYSTEMS.has(pathname.split("/")[1] || "");

  if (standalone) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <>
      <SiteBackground />
      <Header />
      <main id="main-content" className="brand-sheet ds-root mx-2 sm:mx-4 mb-6 min-w-0 overflow-x-hidden">
        {children}
      </main>
      <Footer />
      <ChatbotWidgets />
    </>
  );
}
