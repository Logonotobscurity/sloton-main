/** @deprecated Import from `@/lib/visibility/*`. Clears the unused v1 draft key. */

export const VISIBILITY_STORAGE_KEY = "logon-visibility-draft-v1";

export function clearLegacyVisibilityDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(VISIBILITY_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
