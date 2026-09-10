"use client";

import React, { useState } from "react";
import { useIntakeForm } from "@/lib/visibility/use-intake-form";
import { structureText } from "@/lib/visibility/ai-structure";
import type { StructureKind } from "@/lib/visibility/types";
import {
  businessGoals,
  categories,
  contactMethods,
  differentiators,
  messyExample,
  proofTypes,
  serviceAreas,
  stepMeta,
  yearsOperating,
} from "@/lib/visibility/intake-options";
import styles from "./audit.module.css";

const DEMO_OBJECT = {
  business: "Celebration cakes",
  services: ["Weddings", "Birthdays"],
  location: "Ikeja",
  channel: "WhatsApp",
  experience: "5 years",
};

function Assist({
  kind,
  value,
  onApply,
}: {
  kind: StructureKind;
  value: string;
  onApply: (next: string) => void;
}) {
  const [phase, setPhase] = useState<"idle" | "working" | "ready">("idle");
  const [result, setResult] = useState<ReturnType<typeof structureText> | null>(null);

  const run = () => {
    if (value.trim().length < 8) return;
    setPhase("working");
    window.setTimeout(() => {
      const structured = structureText(kind, value);
      setResult(structured);
      setPhase("ready");
    }, 520);
  };

  if (phase === "working") {
    return (
      <p className={styles.live} aria-live="polite">
        Reading your words → extracting entities → structuring output
      </p>
    );
  }

  if (phase === "ready" && result) {
    return (
      <div className={styles.assistOut}>
        <ul>
          {result.lines.map((line) => (
            <li key={line.key}>
              {line.key}: {line.value}
            </li>
          ))}
        </ul>
        <div className={styles.nav} style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className={styles.cta}
            onClick={() => {
              onApply(result.rewritten);
              setPhase("idle");
            }}
          >
            Use this version
          </button>
          <button type="button" className={styles.ghost} onClick={() => setPhase("idle")}>
            Keep mine
          </button>
        </div>
      </div>
    );
  }

  return (
    <button type="button" className={styles.assistBtn} onClick={run} disabled={value.trim().length < 8}>
      ✦ Structure this for me
    </button>
  );
}

function Chip({
  label,
  checked,
  onToggle,
  disabled,
  radio,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
  radio?: boolean;
}) {
  return (
    <button
      type="button"
      role={radio ? "radio" : "checkbox"}
      aria-checked={checked}
      disabled={disabled}
      className={styles.chip}
      onClick={onToggle}
    >
      {label}
    </button>
  );
}

export function AuditApp() {
  const form = useIntakeForm();
  const [stage, setStage] = useState<"intro" | "form" | "done">("intro");
  const [tab, setTab] = useState<"entities" | "json">("entities");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const b = form.knowledgeObject.business;
  const rows: Array<[string, string]> = [
    ["name", b.name],
    ["category", b.category],
    ["description", b.description],
    ["city", b.location.city],
    ["services", b.services.join(" | ")],
    ["customers", b.target_customers.join(" | ")],
    ["whatsapp", b.contact.whatsapp],
    ["email", b.contact.email],
  ];

  const submit = async () => {
    if (!form.answers.businessName.trim()) {
      setError("Business name is required — step 01.");
      form.goTo(0);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const { visibilityProfileAction } = await import("@/app/actions");
      const result = await visibilityProfileAction({
        name: form.answers.ownerName || form.answers.businessName,
        email: form.answers.email || "logonthepage@gmail.com",
        business: form.answers.whatYouDo || form.answers.businessName,
        services: form.answers.offerings,
        location: [form.answers.city, form.answers.state, form.answers.country].filter(Boolean).join(", "),
        contact: [form.answers.whatsapp, form.answers.phone, form.answers.email].filter(Boolean).join(" · "),
        customers: form.answers.customers,
        proof: form.answers.credentials || form.answers.proofTypes.join(" | "),
      });
      if (result.error) setError(result.error);
      else setStage("done");
    } catch {
      setError("Could not send. Download the JSON or email logonthepage@gmail.com.");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    const blob = new Blob(
      [JSON.stringify({ knowledge_object: form.knowledgeObject, seo: form.seo, raw_answers: form.answers }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logon-profile-${form.answers.businessName || "draft"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const panel = (
    <aside className={styles.machine} aria-label="Structured business knowledge">
      <p className={styles.machineKicker}>Business knowledge object</p>
      <p className={styles.pct}>{form.completeness}%</p>
      <div className={styles.bar} aria-hidden="true">
        <span style={{ width: `${form.completeness}%` }} />
      </div>
      <div className={styles.tabs} role="tablist" aria-label="Object view">
        <button type="button" role="tab" aria-selected={tab === "entities"} onClick={() => setTab("entities")}>
          Entities
        </button>
        <button type="button" role="tab" aria-selected={tab === "json"} onClick={() => setTab("json")}>
          JSON
        </button>
      </div>
      {tab === "json" ? (
        <pre className={styles.json}>{JSON.stringify(form.knowledgeObject, null, 2)}</pre>
      ) : (
        <dl>
          {rows.map(([key, value]) => (
            <div className={styles.row} key={key}>
              <dt>{key}</dt>
              <dd>{value || "— — —"}</dd>
            </div>
          ))}
        </dl>
      )}
    </aside>
  );

  if (stage === "intro") {
    return (
      <div className={styles.root}>
        <div className={`${styles.shell} ${styles.shellForm}`}>
          <section className={styles.human}>
            <p className={styles.kicker}>Free community give-back</p>
            <h1 className={styles.title}>
              Get your business online, <em>clearly</em>.
            </h1>
            <p className={styles.lede}>
              Messy business knowledge → structured business intelligence → an AI-ready web presence.
              One question at a time. Draft stays on this device until you send it.
            </p>
            <p className={styles.messy}>{messyExample}</p>
            <button type="button" className={styles.cta} onClick={() => setStage("form")}>
              Start my profile
            </button>
          </section>
          <aside className={styles.machine} aria-label="Example structured object">
            <p className={styles.machineKicker}>After — structured</p>
            <pre className={styles.json}>{JSON.stringify(DEMO_OBJECT, null, 2)}</pre>
          </aside>
        </div>
      </div>
    );
  }

  if (stage === "done") {
    const jsonLd = JSON.stringify(form.seo.jsonLd, null, 2);
    return (
      <div className={styles.root}>
        <div className={styles.shell}>
          <section className={styles.human}>
            <p className={styles.kicker}>You&apos;re in</p>
            <h1 className={styles.title}>
              Profile received. We will structure the <em>page</em>.
            </h1>
            <p className={styles.lede}>
              Answers go to LOG_ON by email/webhook (`visibilityProfileAction`). A copy stays in this
              browser. Not an account.
            </p>
            <p className={styles.label}>Title</p>
            <p>{form.seo.title}</p>
            <p className={styles.label}>Meta description</p>
            <p className={styles.hint}>{form.seo.metaDescription}</p>
            <p className={styles.label}>H1</p>
            <p>{form.seo.h1}</p>
            <p className={styles.label}>Sections</p>
            <ul>
              {form.seo.sections.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.label}>LocalBusiness JSON-LD</p>
            <pre className={styles.messy}>{jsonLd}</pre>
            <div className={styles.nav}>
              <button type="button" className={styles.cta} onClick={download}>
                Download profile JSON
              </button>
              <button
                type="button"
                className={styles.ghost}
                onClick={() => {
                  form.reset();
                  setStage("intro");
                }}
              >
                Start fresh
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const step = form.step;
  const a = form.answers;

  return (
    <div className={styles.root}>
      <div className={`${styles.shell} ${styles.shellForm}`}>
        <form
          className={styles.human}
          onSubmit={(event) => {
            event.preventDefault();
            if (step === 6) void submit();
            else form.next();
          }}
        >
          <nav className={styles.rail} aria-label="Intake steps">
            {stepMeta.map((meta, index) => (
              <button
                key={meta.id}
                type="button"
                aria-current={index === step ? "step" : undefined}
                disabled={index > form.furthestStep}
                onClick={() => form.goTo(index)}
              >
                {meta.number} {meta.name}
              </button>
            ))}
          </nav>

          {step === 0 && (
            <section>
              <h1 className={styles.title}>What is the business, and what do you <em>do</em>?</h1>
              <label className={styles.label} htmlFor="audit-name">Business name</label>
              <input id="audit-name" className={styles.field} required value={a.businessName} onChange={(e) => form.update("businessName", e.target.value)} />
              <label className={styles.label} htmlFor="audit-do">What you do</label>
              <p className={styles.hint}>Write it the way you would tell a neighbour.</p>
              <textarea id="audit-do" className={`${styles.field} ${styles.area}`} value={a.whatYouDo} onChange={(e) => form.update("whatYouDo", e.target.value)} />
              <Assist kind="whatYouDo" value={a.whatYouDo} onApply={(v) => form.update("whatYouDo", v)} />
              <label className={styles.label} htmlFor="audit-cat">Category</label>
              <select id="audit-cat" className={styles.field} value={a.category} onChange={(e) => form.update("category", e.target.value)}>
                <option value="">Select</option>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <div className={styles.grid3}>
                <input className={styles.field} placeholder="City" value={a.city} onChange={(e) => form.update("city", e.target.value)} />
                <input className={styles.field} placeholder="State" value={a.state} onChange={(e) => form.update("state", e.target.value)} />
                <input className={styles.field} placeholder="Country" value={a.country} onChange={(e) => form.update("country", e.target.value)} />
              </div>
              <fieldset>
                <legend className={styles.label}>Service area</legend>
                <div className={styles.chips} role="radiogroup">
                  {serviceAreas.map((area) => (
                    <Chip key={area.id} radio label={area.label} checked={a.serviceArea === area.id} onToggle={() => form.update("serviceArea", area.id)} />
                  ))}
                </div>
              </fieldset>
            </section>
          )}

          {step === 1 && (
            <section>
              <h1 className={styles.title}>What can people buy or <em>book</em>?</h1>
              <label className={styles.label} htmlFor="audit-off">Offerings</label>
              <textarea id="audit-off" className={`${styles.field} ${styles.area}`} value={a.offerings} onChange={(e) => form.update("offerings", e.target.value)} />
              <Assist kind="offerings" value={a.offerings} onApply={(v) => form.update("offerings", v)} />
              <p className={styles.label}>Pick up to 3 priority services</p>
              <div className={styles.chips}>
                {a.offerings.split(/,|\n/).map((item) => item.trim()).filter(Boolean).slice(0, 8).map((item) => (
                  <Chip key={item} label={item} checked={a.primaryServices.includes(item)} disabled={!a.primaryServices.includes(item) && a.primaryServices.length >= 3} onToggle={() => form.toggle("primaryServices", item, 3)} />
                ))}
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <h1 className={styles.title}>Who buys, and what problem do they arrive <em>with</em>?</h1>
              <label className={styles.label} htmlFor="audit-who">Customers</label>
              <textarea id="audit-who" className={`${styles.field} ${styles.area}`} value={a.customers} onChange={(e) => form.update("customers", e.target.value)} />
              <Assist kind="customers" value={a.customers} onApply={(v) => form.update("customers", v)} />
              <label className={styles.label} htmlFor="audit-prob">Problems</label>
              <textarea id="audit-prob" className={`${styles.field} ${styles.area}`} value={a.customerProblems} onChange={(e) => form.update("customerProblems", e.target.value)} />
              <Assist kind="problems" value={a.customerProblems} onApply={(v) => form.update("customerProblems", v)} />
            </section>
          )}

          {step === 3 && (
            <section>
              <h1 className={styles.title}>Why should someone trust <em>you</em>?</h1>
              <div className={styles.chips}>
                {differentiators.map((item) => (
                  <Chip key={item} label={item} checked={a.differentiators.includes(item)} onToggle={() => form.toggle("differentiators", item)} />
                ))}
              </div>
              <div className={styles.chips} role="radiogroup">
                {yearsOperating.map((item) => (
                  <Chip key={item} radio label={item} checked={a.yearsOperating === item} onToggle={() => form.update("yearsOperating", item)} />
                ))}
              </div>
              <label className={styles.label} htmlFor="audit-cred">Credentials</label>
              <textarea id="audit-cred" className={`${styles.field} ${styles.area}`} value={a.credentials} onChange={(e) => form.update("credentials", e.target.value)} />
              <Assist kind="credentials" value={a.credentials} onApply={(v) => form.update("credentials", v)} />
              <div className={styles.chips}>
                {proofTypes.map((item) => (
                  <Chip key={item} label={item} checked={a.proofTypes.includes(item)} onToggle={() => form.toggle("proofTypes", item)} />
                ))}
              </div>
              <label className={styles.label} htmlFor="audit-links">Links</label>
              <input id="audit-links" className={styles.field} value={a.links} onChange={(e) => form.update("links", e.target.value)} />
            </section>
          )}

          {step === 4 && (
            <section>
              <h1 className={styles.title}>How should people reach <em>you</em>?</h1>
              <div className={styles.chips}>
                {contactMethods.map((item) => (
                  <Chip key={item} label={item} checked={a.contactMethods.includes(item)} onToggle={() => form.toggle("contactMethods", item)} />
                ))}
              </div>
              <label className={styles.label} htmlFor="audit-wa">WhatsApp</label>
              <input id="audit-wa" className={styles.field} value={a.whatsapp} onChange={(e) => form.update("whatsapp", e.target.value)} />
              <label className={styles.label} htmlFor="audit-ph">Phone</label>
              <input id="audit-ph" className={styles.field} value={a.phone} onChange={(e) => form.update("phone", e.target.value)} />
              <label className={styles.label} htmlFor="audit-em">Email</label>
              <input id="audit-em" type="email" className={styles.field} value={a.email} onChange={(e) => form.update("email", e.target.value)} />
              <label className={styles.label} htmlFor="audit-ad">Address</label>
              <input id="audit-ad" className={styles.field} value={a.address} onChange={(e) => form.update("address", e.target.value)} />
              <label className={styles.label} htmlFor="audit-owner">Your name</label>
              <input id="audit-owner" className={styles.field} value={a.ownerName} onChange={(e) => form.update("ownerName", e.target.value)} />
            </section>
          )}

          {step === 5 && (
            <section>
              <h1 className={styles.title}>Anything you already wrote — paste <em>it</em>.</h1>
              <label className={styles.label} htmlFor="audit-mat">Existing material</label>
              <textarea id="audit-mat" className={`${styles.field} ${styles.area}`} value={a.existingMaterial} onChange={(e) => form.update("existingMaterial", e.target.value)} />
              <Assist kind="existingMaterial" value={a.existingMaterial} onApply={(v) => form.update("existingMaterial", v)} />
              <p className={styles.label}>Goals</p>
              <div className={styles.chips}>
                {businessGoals.map((item) => (
                  <Chip key={item} label={item} checked={a.goals.includes(item)} onToggle={() => form.toggle("goals", item)} />
                ))}
              </div>
              <label className={styles.label} htmlFor="audit-else">Anything else</label>
              <textarea id="audit-else" className={`${styles.field} ${styles.area}`} value={a.anythingElse} onChange={(e) => form.update("anythingElse", e.target.value)} />
              <Assist kind="anythingElse" value={a.anythingElse} onApply={(v) => form.update("anythingElse", v)} />
            </section>
          )}

          {step === 6 && (
            <section>
              <h1 className={styles.title}>Profile strength {form.completeness}%</h1>
              <p className={styles.lede}>{form.seo.title}</p>
              <p className={styles.hint}>{form.seo.metaDescription}</p>
              <ul>
                {form.seo.sections.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {error ? <p className={styles.note} role="alert">{error}</p> : null}
              <p className={styles.note}>
                Submit sends the structured profile to LOG_ON (email/webhook). Draft remains local until then.
              </p>
            </section>
          )}

          <div className={styles.nav}>
            <button type="button" className={styles.ghost} onClick={step === 0 ? () => setStage("intro") : form.back}>
              Back
            </button>
            <button type="submit" className={styles.cta} disabled={busy}>
              {step === 6 ? (busy ? "Submitting…" : "Submit my business profile") : "Continue"}
            </button>
          </div>
        </form>
        {panel}
      </div>
    </div>
  );
}
