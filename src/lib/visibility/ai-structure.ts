import type { StructureKind, StructureResult } from "./types";

export function toItems(text: string): string[] {
  return text
    .split(/\n|,|;|\/|•|\band\b|\balso\b|\bplus\b/gi)
    .map((part) => part.trim())
    .filter((part) => part.length > 1)
    .slice(0, 12);
}

export function sentenceCase(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function structureText(kind: StructureKind, text: string): StructureResult {
  const items = toItems(text).map(sentenceCase);
  const rewritten = items.length ? items.map((item) => `• ${item}`).join("\n") : sentenceCase(text);

  if (kind === "offerings") {
    return {
      lines: [
        { key: "services_found", value: String(items.length) },
        { key: "services", value: items.join(" | ") || "—" },
        { key: "suggested_primary", value: items.slice(0, 3).join(" | ") || "—" },
      ],
      rewritten,
    };
  }
  if (kind === "customers") {
    return {
      lines: [
        { key: "segments", value: items.join(" | ") || "—" },
        { key: "count", value: String(items.length) },
      ],
      rewritten: sentenceCase(text),
    };
  }
  if (kind === "problems") {
    return {
      lines: items.map((item, i) => ({ key: `problem_${i + 1}`, value: item })),
      rewritten,
    };
  }
  if (kind === "credentials") {
    return {
      lines: [
        { key: "credentials", value: items.join(" | ") || "—" },
        { key: "trust_weight", value: items.length >= 2 ? "Strong" : items.length ? "Moderate" : "None" },
      ],
      rewritten,
    };
  }
  return {
    lines: [
      { key: "activity", value: sentenceCase(text).slice(0, 140) || "—" },
      { key: "facts", value: String(items.length) },
    ],
    rewritten: sentenceCase(text),
  };
}
