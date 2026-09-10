"use client";

import { VisibilityProvider } from "./visibility-context";
import { VisibilityIntake } from "./visibility-intake";
import { VisibilityAssistant } from "./visibility-assistant";

export function VisibilityShell({ children }: { children: React.ReactNode }) {
  return (
    <VisibilityProvider>
      {children}
      <VisibilityIntake />
      <VisibilityAssistant />
    </VisibilityProvider>
  );
}
