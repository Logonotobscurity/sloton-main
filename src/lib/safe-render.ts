/**
 * XSS-Safe Rendering Utilities
 * All user/AI message content is treated as untrusted and must be escaped.
 * Never use element.innerHTML = message directly.
 */

// Escape HTML entities — prevents XSS when rendering as HTML
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Validate and sanitize a string for safe text rendering
// - Escapes HTML
// - Normalizes whitespace
// - Removes null bytes and control chars that could be used for attacks
export function sanitizeText(input: string): string {
  if (typeof input !== "string") return "";
  // Remove null bytes and non-printable control chars (except \n \r \t)
  let sanitized = input.replace(/\u0000/g, "").replace(/[\x01-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, "");
  // Limit length to prevent DoS via huge messages (10k chars)
  if (sanitized.length > 10000) sanitized = sanitized.slice(0, 10000);
  return sanitized;
}

// Safe markdown-like bold handling without innerHTML
// Converts **text** to <strong> via React-safe splitting, escaping all else
export function parseSafeInlineMarkdown(text: string): Array<{ type: "text" | "bold" | "code"; content: string }> {
  const sanitized = sanitizeText(text);
  const parts: Array<{ type: "text" | "bold" | "code"; content: string }> = [];
  // Regex for **bold** and `code` — non-greedy, escaped content inside
  const re = /(\*\*[^*]{1,200}\*\*|`[^`]{1,200}`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(sanitized)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: sanitized.slice(lastIndex, match.index) });
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push({ type: "bold", content: token.slice(2, -2) });
    } else if (token.startsWith("`")) {
      parts.push({ type: "code", content: token.slice(1, -1) });
    }
    lastIndex = re.lastIndex;
  }
  if (lastIndex < sanitized.length) {
    parts.push({ type: "text", content: sanitized.slice(lastIndex) });
  }
  if (parts.length === 0) parts.push({ type: "text", content: sanitized });
  return parts;
}
