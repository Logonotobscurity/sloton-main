"use client";

import React, { useState } from "react";
import type { BusinessKnowledgeObject } from "@/lib/visibility/types";
import { stepMeta } from "@/lib/visibility/intake-options";

export function KnowledgePanel({
  knowledgeObject,
  completeness,
}: {
  knowledgeObject: BusinessKnowledgeObject;
  completeness: number;
}) {
  const [tab, setTab] = useState<"entities" | "json">("entities");
  const b = knowledgeObject.business;
  const rows = [
    ["name", b.name],
    ["category", b.category],
    ["description", b.description],
    ["city", b.location.city],
    ["services", b.services.join(" | ")],
    ["customers", b.target_customers.join(" | ")],
    ["whatsapp", b.contact.whatsapp],
    ["email", b.contact.email],
  ];

  return (
    <aside
      className="flex h-full flex-col p-5"
      style={{ background: "var(--color-forest-950)", color: "var(--color-cream-50)" }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-pulse)]">
        Business knowledge object
      </p>
      <p className="mt-2 font-[family-name:var(--font-family-display)] text-4xl">{completeness}%</p>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--color-forest-900)]">
        <div className="h-full bg-[var(--color-pulse)]" style={{ width: `${completeness}%` }} />
      </div>
      <div className="mt-4 flex gap-2 text-xs font-semibold">
        {(["entities", "json"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className="rounded-full px-3 py-1"
            style={{
              background: tab === id ? "var(--color-pulse)" : "transparent",
              color: tab === id ? "var(--color-forest-950)" : "var(--color-cream-50)",
            }}
          >
            {id}
          </button>
        ))}
      </div>
      <div className="mt-4 flex-1 overflow-auto text-xs">
        {tab === "json" ? (
          <pre className="whitespace-pre-wrap font-mono text-[11px] opacity-90">
            {JSON.stringify(knowledgeObject, null, 2)}
          </pre>
        ) : (
          <dl className="space-y-2">
            {rows.map(([key, value]) => (
              <div key={key} className="flex justify-between gap-3 border-b border-[var(--color-forest-900)] pb-1">
                <dt className="font-mono uppercase tracking-wider text-[var(--color-pulse)]">{key}</dt>
                <dd className="text-right">{value || "— — —"}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <ol className="mt-4 grid grid-cols-7 gap-1 text-[10px] font-mono">
        {stepMeta.map((s) => (
          <li key={s.id} className="text-center opacity-70">
            {s.number}
          </li>
        ))}
      </ol>
    </aside>
  );
}
