"use client";

import dynamic from "next/dynamic";

const BackToTop = dynamic(() => import("@/components/back-to-top").then((mod) => ({ default: mod.BackToTop })), {
  ssr: false,
  loading: () => null,
});

export function LayoutWidgets() {
  return <BackToTop />;
}

