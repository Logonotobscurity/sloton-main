import type { Metadata } from "next";
import { AuditApp } from "@/components/audit/audit-app";

export const metadata: Metadata = {
  title: "Business visibility audit",
  description:
    "Free LOG_ON community intake: turn messy business knowledge into a structured, AI-readable profile. Draft saves on this device. Not an account.",
  alternates: { canonical: "/audit" },
};

export default function AuditPage() {
  return <AuditApp />;
}
