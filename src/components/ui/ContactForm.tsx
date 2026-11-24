"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Check, CircleAlert, LoaderCircle } from "lucide-react";
import { PROJECT_TYPES, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";
import { cn } from "@/lib/cn";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const EMPTY: ContactInput = { name: "", email: "", projectType: "", message: "", company: "" };

export function ContactForm({ connected }: { connected: boolean }) {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  /** Bumped on each failed submit so the summary re-receives focus. */
  const [summaryKey, setSummaryKey] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  useEffect(() => {
    if (summaryKey) summaryRef.current?.focus();
  }, [summaryKey]);

  const fieldError = (k: keyof ContactInput, v: ContactInput) => {
    const r = validateContact(v);
    return r.ok ? undefined : r.errors[k];
  };

  // Validate on blur (not on every keystroke); once a field shows an error,
  // re-check it as the visitor types so the message clears as soon as it's fixed.
  const set = (k: keyof ContactInput, v: string) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (errors[k]) setErrors((e) => ({ ...e, [k]: fieldError(k, next) }));
  };
  const blur = (k: keyof ContactInput) => {
    if (!values[k]) return; // don't scold an empty field the visitor merely tabbed through
    setErrors((e) => ({ ...e, [k]: fieldError(k, values) }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = validateContact(values);
    if (!r.ok) {
      setErrors(r.errors);
      setSummaryKey((n) => n + 1);
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: ContactErrors };
      if (res.ok && json.ok) {
        setStatus({ kind: "sent" });
        setValues(EMPTY);
      } else {
        if (json.fields) setErrors(json.fields);
        setStatus({ kind: "error", message: json.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error — please check your connection and try again." });
    }
  }

  if (status.kind === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="border border-line-strong p-10"
      >
        <span className="grid size-14 place-items-center rounded-full bg-accent text-void">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <p className="display mt-8 text-4xl">Message received.</p>
        <p className="mt-4 max-w-md text-muted">Thank you — I’ll read it properly and reply as soon as I can.</p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="mt-8 border-b border-line-strong pb-1 hover:border-accent">
          Send another message
        </button>
      </motion.div>
    );
  }

  const field = (k: keyof ContactInput) => ({
    id: `${uid}-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
    onBlur: () => blur(k),
  });

  const LABELS: Record<keyof ContactInput, string> = {
    name: "Your name",
    email: "Email",
    projectType: "What are we making?",
    message: "The idea",
    company: "Company",
  };
  const errorList = (Object.keys(errors) as (keyof ContactInput)[]).filter((k) => errors[k]);

  const err = (k: keyof ContactInput) => (
    <AnimatePresence>
      {errors[k] && (
        <motion.p
          id={`${uid}-${k}-err`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-2 text-sm text-accent-soft"
        >
          {errors[k]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  const inputCls = (k: keyof ContactInput) =>
    cn(
      "peer w-full border-b bg-transparent pb-3 pt-2 text-[clamp(1.25rem,2vw,1.6rem)] text-ivory placeholder:text-dim transition-colors",
      errors[k] ? "border-accent" : "border-line-strong focus:border-ivory",
    );

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-12">
      {summaryKey > 0 && errorList.length > 0 && (
        <div
          ref={summaryRef}
          key={summaryKey}
          role="alert"
          tabIndex={-1}
          aria-labelledby={`${uid}-summary-title`}
          className="border border-accent/60 bg-accent/[0.06] p-5"
        >
          <p id={`${uid}-summary-title`} className="flex items-center gap-2 font-medium text-ivory">
            <CircleAlert className="size-4 text-accent" aria-hidden="true" />
            A few details need attention
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${uid}-${k}`} className="text-accent-soft underline-offset-4 hover:underline">
                  {LABELS[k]}: {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!connected && (
        <p className="flex gap-3 border border-dashed border-line-strong p-4 text-sm leading-relaxed text-muted">
          <CircleAlert className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          Heads up: this form is not yet connected to a mailbox. Submissions are validated but cannot be delivered until
          delivery is configured.
        </p>
      )}

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="label text-[0.75rem] text-dim">
            Your name
          </label>
          <input {...field("name")} autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" className={inputCls("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="label text-[0.75rem] text-dim">
            Email
          </label>
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" value={values.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" className={inputCls("email")} />
          {err("email")}
        </div>
      </div>

      <fieldset aria-describedby={errors.projectType ? `${uid}-projectType-err` : undefined}>
        <legend className="label text-[0.75rem] text-dim">What are we making?</legend>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {PROJECT_TYPES.map((t, i) => {
            const checked = values.projectType === t;
            return (
              <label
                key={t}
                className={cn(
                  "relative cursor-pointer rounded-full border px-5 py-2.5 text-[0.95rem] transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                  checked ? "border-accent bg-accent text-void" : "border-line-strong text-ivory/90 hover:border-ivory",
                )}
              >
                <input
                  type="radio"
                  name="projectType"
                  id={i === 0 ? `${uid}-projectType` : undefined}
                  value={t}
                  checked={checked}
                  onChange={() => set("projectType", t)}
                  className="sr-only"
                />
                {t}
              </label>
            );
          })}
        </div>
        {err("projectType")}
      </fieldset>

      <div>
        <label htmlFor={`${uid}-message`} className="label text-[0.75rem] text-dim">
          The idea
        </label>
        <textarea
          {...field("message")}
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="What it is, who it’s for, and when you’d like it to exist."
          className={cn(inputCls("message"), "resize-y leading-snug")}
        />
        {err("message")}
      </div>

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" name="company" value={values.company} onChange={(e) => set("company", e.target.value)} />
        </label>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          data-cursor="Send"
          className="group inline-flex h-16 items-center gap-4 rounded-full bg-ivory pl-8 pr-3 text-lg font-medium text-void transition-colors duration-300 hover:bg-accent disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Send the brief"}
          <span className="grid size-11 place-items-center rounded-full bg-void text-ivory transition-transform duration-500 ease-out-expo group-hover:rotate-45">
            {status.kind === "sending" ? (
              <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowUpRight className="size-5" aria-hidden="true" />
            )}
          </span>
        </button>
        <div aria-live="polite" className="min-h-6 max-w-sm text-sm">
          {status.kind === "error" && (
            <p className="flex gap-2 text-accent-soft">
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {status.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
