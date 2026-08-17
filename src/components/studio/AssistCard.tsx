"use client";

import { useState } from "react";

type Tone = "plain" | "bold" | "technical";

const tones: { id: Tone; label: string }[] = [
  { id: "plain", label: "Plain" },
  { id: "bold", label: "Bold" },
  { id: "technical", label: "Technical" },
];

// Mock assistCopy — in production replace with real AI endpoint
async function mockAssistCopy(data: {
  category: string;
  categoryBrief: string;
  mode: "generate" | "refine";
  tone: Tone;
  draft?: string;
}): Promise<{ text: string }> {
  await new Promise((r) => setTimeout(r, 700));
  const toneStyle: Record<Tone, string> = {
    plain: `Clear, helpful copy for ${data.category}: ${data.categoryBrief}`,
    bold: `**${data.category}** — ${data.categoryBrief} — Built to be quoted.`,
    technical: `Technical: [${data.category}] { brief: "${data.categoryBrief}", tone: "${data.tone}" }`,
  };
  const base = toneStyle[data.tone];
  const text =
    data.mode === "refine" && data.draft
      ? `${data.draft}\n\n— Refined (${data.tone}): ${base.slice(0, 120)}…`
      : `${base}\n\n— Generated for ${data.category} (${data.tone}) at ${new Date().toLocaleTimeString()}`;
  return { text };
}

export function AssistCard({
  category,
  categoryBrief,
}: {
  category: string;
  categoryBrief: string;
}) {
  const [tone, setTone] = useState<Tone>("plain");
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handle(mode: "generate" | "refine") {
    setPending(true);
    setError(null);
    setCopied(false);
    try {
      const res = await mockAssistCopy({
        category,
        categoryBrief,
        mode,
        tone,
        ...(mode === "refine" ? { draft: result } : {}),
      });
      setResult(res.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Couldn't copy to the clipboard.");
    }
  }

  return (
    <article className="assist-card">
      <header className="assist-head">
        <span className="snip-dot" aria-hidden="true" />
        ai-assist · {category.toLowerCase()}
      </header>

      <div className="assist-body">
        <div className="assist-tones" role="group" aria-label="Tone">
          {tones.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`assist-tone${tone === t.id ? " is-active" : ""}`}
              aria-pressed={tone === t.id}
              onClick={() => setTone(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="assist-actions">
          <button
            type="button"
            className="assist-btn is-primary"
            onClick={() => handle("generate")}
            disabled={pending}
          >
            {pending ? "Writing…" : result ? "Regenerate" : "Generate snippet"}
          </button>
          <button
            type="button"
            className="assist-btn"
            onClick={() => handle("refine")}
            disabled={pending || !result}
          >
            Refine
          </button>
        </div>

        <div className="assist-out" aria-live="polite" aria-busy={pending}>
          {error ? (
            <p className="assist-error">{error}</p>
          ) : result ? (
            <p className="assist-text">{result}</p>
          ) : (
            <p className="assist-empty">Pick a capability above, choose a tone, and generate a copy snippet for it.</p>
          )}
        </div>

        {result && !error ? (
          <button type="button" className="assist-copy" onClick={copy}>
            {copied ? "Copied" : "Copy snippet"}
          </button>
        ) : null}
      </div>
    </article>
  );
}
