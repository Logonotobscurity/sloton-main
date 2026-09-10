"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import styles from "./newsletter-popup.module.css";

const FEATURED = {
  slug: "why-llms-txt-matters-for-seo",
  title: "Why llms.txt Matters for AI Agent Development",
};

type SubscribeStatus = "idle" | "success" | "error";

function safeLogError(scope: string, error: unknown): void {
  let message = "unknown error";
  try {
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    } else {
      message = Object.prototype.toString.call(error);
    }
  } catch {
    message = "unserializable error";
  }
  try {
    console.error(`[${scope}] ${message}`);
  } catch {
    /* logging must never crash the letter */
  }
}

export function NewsletterPopup({ delayMs = 900 }: { delayMs?: number }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (document.body.dataset.visibilityIntake === "open") return;
      setOpen(true);
    }, delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      emailInputRef.current?.focus();
    }, 80);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const email = emailInput?.value.trim() ?? "";

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      emailInputRef.current?.focus();
      return;
    }

    setBusy(true);
    setStatus("idle");
    setMessage("");
    try {
      const { newsletterSignupAction } = await import("@/app/actions");
      const result = await newsletterSignupAction({ email });
      if (result.error) {
        setStatus("error");
        setMessage(result.error);
      } else {
        setStatus("success");
        setMessage("The next briefing is yours.");
        form.reset();
        window.setTimeout(() => {
          setStatus("idle");
          close();
        }, 1800);
      }
    } catch (error) {
      safeLogError("NewsletterPopup", error);
      setStatus("error");
      setMessage("Could not send. Email logonthepage@gmail.com.");
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <section
        className={styles.container}
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-title"
        aria-describedby="newsletter-popup-copy"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeBtn}
          onClick={close}
          aria-label="Close newsletter popup"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className={styles.left}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <p className={styles.kicker}>Insights letter</p>
            <h2 id="newsletter-title" className={styles.title}>
              Field notes, once a <em>season</em>.
            </h2>
            <p id="newsletter-popup-copy" className={styles.subtitle}>
              Occasional briefings on agents, automation, and GEO — English notes from LOG_ON
              delivery work. No daily drip. Not an account.
            </p>

            <div className={styles.inputBlock}>
              <input
                ref={emailInputRef}
                className={styles.input}
                type="email"
                id="newsletter-email"
                name="email"
                autoComplete="email"
                placeholder=" "
                required
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? "email-error" : undefined}
                disabled={busy}
              />
              <label className={styles.label} htmlFor="newsletter-email">
                Email for the letter
              </label>
            </div>

            {status === "error" ? (
              <span id="email-error" className={styles.error} role="alert">
                {message || "Please enter a valid email."}
              </span>
            ) : null}

            {status === "success" ? (
              <div className={styles.success} role="status">
                {message}
              </div>
            ) : (
              <button type="submit" className={styles.button} disabled={busy}>
                {busy ? "Sending…" : "Send me the letter"}
              </button>
            )}

            <span className={styles.trust}>
              No spam. <Link href="/privacy">Unsubscribe anytime</Link>. Or write{" "}
              <a href="mailto:logonthepage@gmail.com?subject=Insights%20letter">
                logonthepage@gmail.com
              </a>
              .
            </span>
          </form>
        </div>

        <aside className={styles.right}>
          <Link href={`/insights/${FEATURED.slug}`} className={styles.feature} onClick={close}>
            <span className={styles.featureKicker}>From the desk</span>
            <span className={styles.featureTitle}>{FEATURED.title}</span>
            <span className={styles.featureGo}>Read this issue →</span>
          </Link>
        </aside>
      </section>
    </div>
  );
}
