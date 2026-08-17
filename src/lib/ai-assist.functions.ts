/**
 * AI Assist server functions — used by AssistCard in StudioSection
 * This is a lightweight mock that mirrors the expected `assistCopy` signature
 * from the sample code. In production, replace with a real AI call.
 */

export type AssistCopyInput = {
  category: string;
  categoryBrief: string;
  mode: "generate" | "refine";
  tone: "plain" | "bold" | "technical";
  draft?: string;
};

export async function assistCopy({ data }: { data: AssistCopyInput }): Promise<{ text: string }> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 600));

  const toneStyle: Record<AssistCopyInput["tone"], string> = {
    plain: `Clear, helpful copy for ${data.category}: ${data.categoryBrief}`,
    bold: `**${data.category}** — ${data.categoryBrief} — Built to be quoted.`,
    technical: `Technical: [${data.category}] { brief: "${data.categoryBrief}", tone: "${data.tone}" }`,
  };

  const base = toneStyle[data.tone];

  const text =
    data.mode === "refine" && data.draft
      ? `${data.draft}\n\n— Refined (${data.tone}): ${base.slice(0, 140)}…`
      : `${base}\n\n— Generated for ${data.category} (${data.tone}) at ${new Date().toLocaleTimeString()}`;

  return { text };
}
