"use client";

import { useVisibility } from "./visibility-context";

export function VisibilityStart({ label = "Build my business profile →" }: { label?: string }) {
  const ctx = useVisibility();
  return (
    <button
      type="button"
      onClick={() => {
        ctx?.setStage(ctx.answers.businessName ? "form" : "intro");
        ctx?.setIntakeOpen(true);
      }}
      className="inline-flex min-h-11 items-center rounded-full bg-[var(--color-action)] px-6 font-semibold text-[var(--color-paper-50)]"
    >
      {label}
    </button>
  );
}
