"use client";

import React, { useEffect, useState } from "react";
import { useVisibility } from "./visibility-context";
import { KnowledgePanel } from "./knowledge-panel";
import { AiStructureAssist } from "./ai-structure-assist";
import {
  businessGoals,
  categories,
  contactMethods,
  differentiators,
  proofTypes,
  serviceAreas,
  stepMeta,
  yearsOperating,
} from "@/lib/visibility/intake-options";
import styles from "./visibility-intake.module.css";

function Chip({
  label,
  selected,
  onSelect,
  disabled,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      disabled={disabled}
      onClick={onSelect}
      className="min-h-11 rounded-xl border px-3 text-left text-sm font-medium disabled:opacity-45"
      style={{
        borderColor: selected ? "var(--color-action)" : "var(--color-rule-200)",
        background: selected ? "color-mix(in srgb, var(--color-action) 10%, var(--color-paper-50))" : "var(--color-paper-50)",
        color: "var(--color-forest-900)",
      }}
    >
      {label}
    </button>
  );
}

export function VisibilityIntake() {
  const ctx = useVisibility();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ctx?.intakeOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.visibilityIntake = "open";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.setIntakeOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      delete document.body.dataset.visibilityIntake;
      window.removeEventListener("keydown", onKey);
    };
  }, [ctx, ctx?.intakeOpen]);

  if (!ctx || !ctx.intakeOpen) return null;

  const {
    answers,
    update,
    toggle,
    step,
    furthestStep,
    goTo,
    next,
    back,
    completeness,
    knowledgeObject,
    seo,
    stage,
    setStage,
    setIntakeOpen,
    reset,
  } = ctx;

  const submit = async () => {
    if (!answers.businessName.trim()) {
      setError("Business name is the only required field — add it on step 01.");
      goTo(0);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const { visibilityProfileAction } = await import("@/app/actions");
      const result = await visibilityProfileAction({
        name: answers.ownerName || answers.businessName,
        email: answers.email || "logonthepage@gmail.com",
        business: answers.whatYouDo || answers.businessName,
        services: answers.offerings,
        location: [answers.city, answers.state, answers.country].filter(Boolean).join(", "),
        contact: [answers.whatsapp, answers.phone, answers.email].filter(Boolean).join(" · "),
        customers: answers.customers,
        proof: answers.credentials || answers.proofTypes.join(" | "),
      });
      if (result.error) setError(result.error);
      else setStage("done");
    } catch {
      setError("Could not send. Download JSON or email logonthepage@gmail.com.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    const blob = new Blob([JSON.stringify({ knowledgeObject, seo, answers }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logon-profile-${answers.businessName || "draft"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setIntakeOpen(false);
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="visibility-intake-title"
        className={styles.dialog}
      >
        <div className={styles.left}>
          {stage === "done" ? (
            <div>
              <p className="verdara-kicker">You&apos;re in</p>
              <h2 id="visibility-intake-title" className="verdara-title mt-2">
                Profile received. We will structure the <em>page</em>.
              </h2>
              <p className="mt-4 font-mono text-sm">{seo.title}</p>
              <p className="mt-2 text-sm text-[var(--color-ink-muted)]">{seo.metaDescription}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <button type="button" className="min-h-11 rounded-full bg-[var(--color-action)] px-5 font-semibold text-[var(--color-paper-50)]" onClick={download}>
                  Download JSON
                </button>
                <button type="button" className="min-h-11 rounded-full border px-5 font-semibold" onClick={() => { reset(); setStage("intro"); setIntakeOpen(false); }}>
                  Start fresh
                </button>
              </div>
            </div>
          ) : stage === "intro" ? (
            <div>
              <p className="verdara-kicker">Get your business online, clearly</p>
              <h2 id="visibility-intake-title" className="verdara-title mt-2">
                Messy knowledge → structured <em>intelligence</em>.
              </h2>
              <p className="verdara-lede mt-4">
                One plain-language question at a time. Watch the object on the right fill in as you type.
              </p>
              <blockquote className="mt-6 rounded-xl border border-[var(--color-rule-200)] p-4 text-sm">
                I sell cakes I do weddings and birthdays people just DM me on WhatsApp I&apos;m around Ikeja
              </blockquote>
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="min-h-11 rounded-full bg-[var(--color-action)] px-6 font-semibold text-[var(--color-paper-50)]"
                  onClick={() => setStage("form")}
                >
                  Start my profile
                </button>
                <button type="button" className="min-h-11 px-3 text-sm font-semibold" onClick={() => setIntakeOpen(false)}>
                  Later
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (step === 6) void submit();
                else next();
              }}
            >
              <ol className="mb-6 hidden flex-wrap gap-2 md:flex" aria-label="Progress">
                {stepMeta.map((s, i) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      disabled={i > furthestStep}
                      onClick={() => goTo(i)}
                      className="rounded-full px-2 py-1 font-mono text-[11px] disabled:opacity-40"
                      style={{
                        background: i === step ? "var(--color-action)" : "transparent",
                        color: i === step ? "var(--color-paper-50)" : "var(--color-forest-900)",
                      }}
                    >
                      {s.number} {s.name}
                    </button>
                  </li>
                ))}
              </ol>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-action)] md:hidden">
                {stepMeta[step].number} / 07 · {stepMeta[step].name}
              </p>

              {step === 0 && (
                <section aria-labelledby="visibility-intake-title">
                  <h2 id="visibility-intake-title" className="verdara-title mt-2 text-[1.6rem]">
                    What is the business called, and what do you <em>do</em>?
                  </h2>
                  <label className="mt-6 block text-base font-semibold" htmlFor="biz-name">Business name</label>
                  <input id="biz-name" className="mt-2 min-h-12 w-full rounded-xl border border-[var(--color-rule-200)] px-3" value={answers.businessName} onChange={(e) => update("businessName", e.target.value)} required />
                  <label className="mt-6 block text-base font-semibold" htmlFor="what">What you do</label>
                  <p className="text-sm text-[var(--color-ink-muted)]">Write it the way you would tell a neighbour.</p>
                  <textarea id="what" className="mt-2 min-h-[120px] w-full rounded-xl border border-[var(--color-rule-200)] p-3" value={answers.whatYouDo} onChange={(e) => update("whatYouDo", e.target.value)} />
                  <AiStructureAssist kind="whatYouDo" value={answers.whatYouDo} onApply={(v) => update("whatYouDo", v)} />
                  <label className="mt-6 block text-base font-semibold" htmlFor="cat">Category</label>
                  <select id="cat" className="mt-2 min-h-12 w-full rounded-xl border border-[var(--color-rule-200)] px-3" value={answers.category} onChange={(e) => update("category", e.target.value)}>
                    <option value="">Select</option>
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-3">
                    <input placeholder="City" className="min-h-12 min-w-0 w-full rounded-xl border border-[var(--color-rule-200)] px-3" value={answers.city} onChange={(e) => update("city", e.target.value)} />
                    <input placeholder="State" className="min-h-12 min-w-0 w-full rounded-xl border border-[var(--color-rule-200)] px-3" value={answers.state} onChange={(e) => update("state", e.target.value)} />
                    <input placeholder="Country" className="min-h-12 min-w-0 w-full rounded-xl border border-[var(--color-rule-200)] px-3" value={answers.country} onChange={(e) => update("country", e.target.value)} />
                  </div>
                  <fieldset className="mt-6">
                    <legend className="text-base font-semibold">Service area</legend>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {serviceAreas.map((area) => (
                        <Chip key={area.id} label={area.label} selected={answers.serviceArea === area.id} onSelect={() => update("serviceArea", area.id)} />
                      ))}
                    </div>
                  </fieldset>
                </section>
              )}

              {step === 1 && (
                <section>
                  <h2 className="verdara-title text-[1.6rem]">What can people buy or <em>book</em>?</h2>
                  <textarea className="mt-4 min-h-[140px] w-full rounded-xl border border-[var(--color-rule-200)] p-3" value={answers.offerings} onChange={(e) => update("offerings", e.target.value)} />
                  <AiStructureAssist kind="offerings" value={answers.offerings} onApply={(v) => update("offerings", v)} />
                  <p className="mt-6 text-base font-semibold">Pick up to 3 priority services</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {answers.offerings.split(/,|\n/).map((s) => s.trim()).filter(Boolean).slice(0, 8).map((s) => (
                      <Chip key={s} label={s} selected={answers.primaryServices.includes(s)} disabled={!answers.primaryServices.includes(s) && answers.primaryServices.length >= 3} onSelect={() => toggle("primaryServices", s, 3)} />
                    ))}
                  </div>
                </section>
              )}

              {step === 2 && (
                <section>
                  <h2 className="verdara-title text-[1.6rem]">Who buys, and what problem do they arrive <em>with</em>?</h2>
                  <textarea className="mt-4 min-h-[100px] w-full rounded-xl border border-[var(--color-rule-200)] p-3" placeholder="Who" value={answers.customers} onChange={(e) => update("customers", e.target.value)} />
                  <AiStructureAssist kind="customers" value={answers.customers} onApply={(v) => update("customers", v)} />
                  <textarea className="mt-4 min-h-[100px] w-full rounded-xl border border-[var(--color-rule-200)] p-3" placeholder="Problems" value={answers.customerProblems} onChange={(e) => update("customerProblems", e.target.value)} />
                  <AiStructureAssist kind="problems" value={answers.customerProblems} onApply={(v) => update("customerProblems", v)} />
                </section>
              )}

              {step === 3 && (
                <section>
                  <h2 className="verdara-title text-[1.6rem]">Why should someone trust <em>you</em>?</h2>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {differentiators.map((d) => (
                      <Chip key={d} label={d} selected={answers.differentiators.includes(d)} onSelect={() => toggle("differentiators", d)} />
                    ))}
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {yearsOperating.map((y) => (
                      <Chip key={y} label={y} selected={answers.yearsOperating === y} onSelect={() => update("yearsOperating", y)} />
                    ))}
                  </div>
                  <textarea className="mt-4 min-h-[80px] w-full rounded-xl border border-[var(--color-rule-200)] p-3" placeholder="Credentials" value={answers.credentials} onChange={(e) => update("credentials", e.target.value)} />
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {proofTypes.map((p) => (
                      <Chip key={p} label={p} selected={answers.proofTypes.includes(p)} onSelect={() => toggle("proofTypes", p)} />
                    ))}
                  </div>
                  <input className="mt-4 min-h-12 w-full rounded-xl border border-[var(--color-rule-200)] px-3" placeholder="Links (one per line or space)" value={answers.links} onChange={(e) => update("links", e.target.value)} />
                </section>
              )}

              {step === 4 && (
                <section>
                  <h2 className="verdara-title text-[1.6rem]">How should people reach <em>you</em>?</h2>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {contactMethods.map((m) => (
                      <Chip key={m} label={m} selected={answers.contactMethods.includes(m)} onSelect={() => toggle("contactMethods", m)} />
                    ))}
                  </div>
                  <div className="mt-4 grid gap-3">
                    <input className="min-h-12 rounded-xl border border-[var(--color-rule-200)] px-3" placeholder="WhatsApp" value={answers.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
                    <input className="min-h-12 rounded-xl border border-[var(--color-rule-200)] px-3" placeholder="Phone" value={answers.phone} onChange={(e) => update("phone", e.target.value)} />
                    <input type="email" className="min-h-12 rounded-xl border border-[var(--color-rule-200)] px-3" placeholder="Email" value={answers.email} onChange={(e) => update("email", e.target.value)} />
                    <input className="min-h-12 rounded-xl border border-[var(--color-rule-200)] px-3" placeholder="Address" value={answers.address} onChange={(e) => update("address", e.target.value)} />
                    <input className="min-h-12 rounded-xl border border-[var(--color-rule-200)] px-3" placeholder="Your name (handoff)" value={answers.ownerName} onChange={(e) => update("ownerName", e.target.value)} />
                  </div>
                </section>
              )}

              {step === 5 && (
                <section>
                  <h2 className="verdara-title text-[1.6rem]">Anything you already wrote — paste <em>it</em>.</h2>
                  <textarea className="mt-4 min-h-[120px] w-full rounded-xl border border-[var(--color-rule-200)] p-3" value={answers.existingMaterial} onChange={(e) => update("existingMaterial", e.target.value)} />
                  <AiStructureAssist kind="existingMaterial" value={answers.existingMaterial} onApply={(v) => update("existingMaterial", v)} />
                  <p className="mt-6 text-base font-semibold">Goals</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {businessGoals.map((g) => (
                      <Chip key={g} label={g} selected={answers.goals.includes(g)} onSelect={() => toggle("goals", g)} />
                    ))}
                  </div>
                  <textarea className="mt-4 min-h-[80px] w-full rounded-xl border border-[var(--color-rule-200)] p-3" placeholder="Anything else" value={answers.anythingElse} onChange={(e) => update("anythingElse", e.target.value)} />
                </section>
              )}

              {step === 6 && (
                <section>
                  <h2 className="verdara-title text-[1.6rem]">Profile strength {completeness}%</h2>
                  <p className="mt-3 font-mono text-sm">{seo.title}</p>
                  <p className="mt-2 text-sm text-[var(--color-ink-muted)]">{seo.metaDescription}</p>
                  <ul className="mt-4 text-sm">
                    {seo.sections.map((s) => (
                      <li key={s}>· {s}</li>
                    ))}
                  </ul>
                  {error ? <p className="mt-3 font-semibold text-[var(--color-error)]">{error}</p> : null}
                  <p className="mt-4 text-xs text-[var(--color-ink-muted)]">
                    We collect this to prepare a visibility page. Ask logonthepage@gmail.com for deletion.
                  </p>
                </section>
              )}

              <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button type="button" className="min-h-12 rounded-full border px-5 font-semibold" onClick={step === 0 ? () => setStage("intro") : back}>
                  Back
                </button>
                <button type="submit" disabled={busy} className="min-h-12 rounded-full bg-[var(--color-action)] px-6 font-semibold text-[var(--color-paper-50)]">
                  {step === 6 ? (busy ? "Submitting…" : "Submit my business profile") : "Continue"}
                </button>
                <button type="button" className="min-h-12 text-sm font-semibold text-[var(--color-ink-muted)]" onClick={() => setIntakeOpen(false)}>
                  Save & close
                </button>
              </div>
            </form>
          )}
        </div>
        <div className={styles.panel}>
          <KnowledgePanel knowledgeObject={knowledgeObject} completeness={completeness} />
        </div>
      </section>
    </div>
  );
}
