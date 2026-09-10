"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  buildKnowledgeObject,
  buildSeoArtifacts,
  computeCompleteness,
  emptyAnswers,
  toggleInList,
} from "./knowledge-object";
import type { IntakeAnswers } from "./types";

const DRAFT_KEY = "logon.intake.draft.v1";

function readDraft(): { answers: IntakeAnswers; step: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { answers?: IntakeAnswers; step?: number; savedAt?: string };
    if (parsed.savedAt && Date.now() - new Date(parsed.savedAt).getTime() > 7 * 24 * 60 * 60 * 1000) {
      return null;
    }
    return { answers: { ...emptyAnswers(), ...parsed.answers }, step: parsed.step ?? 0 };
  } catch {
    return null;
  }
}

function writeDraft(answers: IntakeAnswers, step: number) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ answers, step, savedAt: new Date().toISOString() }));
  } catch {
    /* ignore */
  }
}

export function useIntakeForm() {
  const [answers, setAnswers] = useState(emptyAnswers());
  const [step, setStep] = useState(0);
  const [furthestStep, setFurthest] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem("logon-visibility-draft-v1");
    } catch {
      /* private mode */
    }
    const restored = readDraft();
    if (restored) {
      setAnswers(restored.answers);
      setStep(restored.step);
      setFurthest(restored.step);
    }
  }, []);

  const persist = useCallback((nextAnswers: IntakeAnswers, nextStep: number) => {
    writeDraft(nextAnswers, nextStep);
  }, []);

  const update = useCallback(<K extends keyof IntakeAnswers>(key: K, value: IntakeAnswers[K]) => {
    setAnswers((prev) => {
      const next = { ...prev, [key]: value };
      persist(next, step);
      return next;
    });
  }, [persist, step]);

  const toggle = useCallback((key: "primaryServices" | "differentiators" | "proofTypes" | "contactMethods" | "goals", value: string, max?: number) => {
    setAnswers((prev) => {
      const next = { ...prev, [key]: toggleInList(prev[key], value, max) };
      persist(next, step);
      return next;
    });
  }, [persist, step]);

  const goTo = useCallback((index: number) => {
    setStep(index);
    setFurthest((f) => Math.max(f, index));
    setAnswers((prev) => {
      persist(prev, index);
      return prev;
    });
  }, [persist]);

  const next = useCallback(() => goTo(Math.min(step + 1, 6)), [goTo, step]);
  const back = useCallback(() => goTo(Math.max(step - 1, 0)), [goTo, step]);

  const reset = useCallback(() => {
    const blank = emptyAnswers();
    setAnswers(blank);
    setStep(0);
    setFurthest(0);
    persist(blank, 0);
  }, [persist]);

  const knowledgeObject = useMemo(() => buildKnowledgeObject(answers), [answers]);
  const completeness = useMemo(() => computeCompleteness(answers), [answers]);
  const seo = useMemo(() => buildSeoArtifacts(knowledgeObject), [knowledgeObject]);

  return {
    answers,
    update,
    toggle,
    step,
    furthestStep,
    goTo,
    next,
    back,
    reset,
    knowledgeObject,
    completeness,
    seo,
    hasDraft: Boolean(answers.businessName || answers.whatYouDo),
  };
}
