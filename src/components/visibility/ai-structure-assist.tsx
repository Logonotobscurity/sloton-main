"use client";

import React, { useState } from "react";
import { structureText } from "@/lib/visibility/ai-structure";
import type { StructureKind } from "@/lib/visibility/types";

export function AiStructureAssist({
  kind,
  value,
  onApply,
}: {
  kind: StructureKind;
  value: string;
  onApply: (rewritten: string) => void;
}) {
  const [phase, setPhase] = useState<"idle" | "working" | "ready">("idle");
  const [result, setResult] = useState<ReturnType<typeof structureText> | null>(null);

  const run = () => {
    if (value.trim().length < 8) return;
    setPhase("working");
    window.setTimeout(() => {
      const structured = structureText(kind, value);
      setResult(structured);
      setPhase("ready");
    }, 520);
  };

  if (phase === "working") {
    return (
      <p className="mt-2 text-xs font-medium text-[var(--color-action)]" aria-live="polite">
        Reading your words → extracting entities → structuring output
      </p>
    );
  }

  if (phase === "ready" && result) {
    return (
      <div
        className="mt-3 rounded-xl p-3 text-sm"
        style={{ background: "var(--color-forest-950)", color: "var(--color-cream-50)" }}
      >
        <ul className="space-y-1 font-mono text-[11px]">
          {result.lines.map((line) => (
            <li key={line.key}>
              <span className="text-[var(--color-pulse)]">{line.key}</span>: {line.value}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className="min-h-11 rounded-full bg-[var(--color-pulse)] px-3 text-xs font-bold text-[var(--color-forest-950)]"
            onClick={() => {
              onApply(result.rewritten);
              setPhase("idle");
            }}
          >
            Use this version
          </button>
          <button type="button" className="text-xs font-semibold" onClick={() => setPhase("idle")}>
            Keep mine
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-action)] disabled:opacity-45"
      onClick={run}
      disabled={value.trim().length < 8}
    >
      ✦ Structure this for me
    </button>
  );
}
