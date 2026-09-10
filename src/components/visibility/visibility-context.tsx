"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { useIntakeForm } from "@/lib/visibility/use-intake-form";

type FormApi = ReturnType<typeof useIntakeForm> & {
  intakeOpen: boolean;
  setIntakeOpen: (open: boolean) => void;
  stage: "intro" | "form" | "done";
  setStage: (stage: "intro" | "form" | "done") => void;
};

const VisibilityContext = createContext<FormApi | null>(null);

export function VisibilityProvider({ children }: { children: React.ReactNode }) {
  const form = useIntakeForm();
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [stage, setStage] = useState<"intro" | "form" | "done">("intro");

  const value = useMemo(
    () => ({ ...form, intakeOpen, setIntakeOpen, stage, setStage }),
    [form, intakeOpen, stage]
  );

  return <VisibilityContext.Provider value={value}>{children}</VisibilityContext.Provider>;
}

export function useVisibility() {
  return useContext(VisibilityContext);
}
