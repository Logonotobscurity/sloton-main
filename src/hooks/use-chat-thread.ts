"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "logon-chat-thread-id";
const SESSION_KEY = "logon-chat-thread-session";

// Simple UUID v4 validation
const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isValidUUID(uuid: string): boolean {
  return UUID_V4_REGEX.test(uuid);
}

function generateThreadId(): string {
  // Prefer crypto.randomUUID, fallback to random
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback: generate v4-like UUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getStoredThreadId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    // Prefer localStorage (survives navigation and reloads)
    const fromLocal = localStorage.getItem(STORAGE_KEY);
    if (fromLocal && isValidUUID(fromLocal)) return fromLocal;

    // Fallback to sessionStorage
    const fromSession = sessionStorage.getItem(SESSION_KEY);
    if (fromSession && isValidUUID(fromSession)) {
      // Promote to localStorage for longer persistence
      localStorage.setItem(STORAGE_KEY, fromSession);
      return fromSession;
    }

    // Check URL search param ?thread= (for shareable threads)
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("thread");
    if (fromUrl && isValidUUID(fromUrl)) {
      localStorage.setItem(STORAGE_KEY, fromUrl);
      sessionStorage.setItem(SESSION_KEY, fromUrl);
      return fromUrl;
    }
  } catch {
    // Storage may be blocked (private mode) — ignore
  }
  return null;
}

function persistThreadId(id: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, id);
    sessionStorage.setItem(SESSION_KEY, id);
    // Also reflect in URL without navigation (optional, for shareability)
    const url = new URL(window.location.href);
    if (url.searchParams.get("thread") !== id) {
      url.searchParams.set("thread", id);
      window.history.replaceState({}, "", url.toString());
    }
  } catch {
    // ignore storage errors
  }
}

/**
 * useChatThread — persistent Thread ID for conversational AI
 * - Generated once when a new conversation starts
 * - Persists across re-renders, navigation, and reloads via localStorage/sessionStorage + URL
 * - Validated before use (must be UUID v4)
 * - Does NOT create a new ID on every mount/message
 */
export function useChatThread(): {
  threadId: string;
  resetThread: () => string;
} {
  const [threadId, setThreadId] = useState<string>(() => {
    // SSR: return empty, will hydrate on client
    if (typeof window === "undefined") return "";
    const stored = getStoredThreadId();
    if (stored) return stored;
    const fresh = generateThreadId();
    // Persist lazily in effect to avoid SSR mismatch
    return fresh;
  });

  // Hydrate/persist on mount
  useEffect(() => {
    if (!threadId) {
      const stored = getStoredThreadId();
      if (stored) {
        setThreadId(stored);
      } else {
        const fresh = generateThreadId();
        setThreadId(fresh);
        persistThreadId(fresh);
      }
    } else if (isValidUUID(threadId)) {
      persistThreadId(threadId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist whenever threadId changes and is valid
  useEffect(() => {
    if (threadId && isValidUUID(threadId)) {
      persistThreadId(threadId);
    }
  }, [threadId]);

  const resetThread = useCallback(() => {
    const fresh = generateThreadId();
    setThreadId(fresh);
    persistThreadId(fresh);
    return fresh;
  }, []);

  // Ensure we always return a valid ID (generate if empty)
  const safeThreadId = threadId && isValidUUID(threadId) ? threadId : generateThreadId();

  return { threadId: safeThreadId, resetThread };
}

export const THREAD_STORAGE_KEY = STORAGE_KEY;
export const THREAD_SESSION_KEY = SESSION_KEY;
