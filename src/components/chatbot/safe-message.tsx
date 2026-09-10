"use client";

import * as React from "react";
import { parseSafeInlineMarkdown } from "@/lib/safe-render";

interface SafeMessageProps {
  content: string;
  className?: string;
}

/**
 * SafeMessage — XSS-safe rendering for chat/ AI content
 * - Escapes all HTML via parseSafeInlineMarkdown (which uses sanitizeText)
 * - Never uses dangerouslySetInnerHTML with unsanitized input
 * - Renders **bold** and `code` safely via React nodes
 * - All user/AI content is treated as untrusted
 */
export function SafeMessage({ content, className }: SafeMessageProps) {
  const parts = React.useMemo(() => parseSafeInlineMarkdown(content), [content]);

  return (
    <span className={className} style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {parts.map((part, i) => {
        if (part.type === "bold") {
          return (
            <strong key={i} className="font-semibold">
              {part.content}
            </strong>
          );
        }
        if (part.type === "code") {
          return (
            <code
              key={i}
              className="px-1 py-0.5 rounded bg-muted text-[0.88em] font-mono"
            >
              {part.content}
            </code>
          );
        }
        return <React.Fragment key={i}>{part.content}</React.Fragment>;
      })}
    </span>
  );
}

export default SafeMessage;
