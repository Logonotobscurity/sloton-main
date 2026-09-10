"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useVisibility } from "./visibility-context";
import styles from "./visibility-assistant.module.css";

const ROTATIONS = [
  "You've already started. Finish your profile.",
  "A few details are missing. Want to finish?",
  "Your business information is almost ready.",
  "Let's get your business online.",
];

export function VisibilityAssistant() {
  const ctx = useVisibility();
  const pathname = usePathname() || "/";
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 14000);
    return () => window.clearInterval(id);
  }, []);

  if (!ctx || ctx.intakeOpen) return null;
  if (pathname !== "/") return null;

  const { completeness, setIntakeOpen, setStage, answers } = ctx;
  const line = completeness === 0 ? "Start your business profile" : ROTATIONS[tick % ROTATIONS.length];

  const open = () => {
    setStage(answers.businessName ? "form" : "intro");
    setIntakeOpen(true);
  };

  return (
    <>
      <button type="button" className={styles.dock} onClick={open} aria-label="Open business visibility profile">
        <p className={styles.kicker}>✦ LOG_ON</p>
        <p className={styles.title}>{line}</p>
        <p className={styles.meta}>{completeness}% structured</p>
        <span className={styles.go}>Continue →</span>
      </button>
      <button type="button" className={styles.pill} onClick={open} aria-label="Open business visibility profile">
        ✦ Profile · {completeness}%
      </button>
    </>
  );
}
