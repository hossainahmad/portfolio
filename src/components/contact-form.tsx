"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

const NEEDS = [
  "Web app",
  "AI feature",
  "Agentic workflow",
  "Integration",
  "Audit & support",
  "Not sure yet",
];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Just exploring"];

type Status = "idle" | "sending" | "success" | "error";

declare global {
  interface Window {
    umami?: { track?: (event: string, data?: Record<string, unknown>) => void };
  }
}

const chip = (active: boolean) =>
  `border px-3.5 py-2 font-mono text-xs tracking-wide transition-colors ${
    active
      ? "border-accent bg-accent/10 text-accent"
      : "border-line text-ink-dim hover:border-ink-faint hover:text-ink"
  }`;

const label =
  "font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint";
const input =
  "mt-2 w-full border border-line bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-faint/60 focus:border-accent/70 focus:outline-none";

export function ContactForm() {
  const [need, setNeed] = useState("");
  const [timeline, setTimeline] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [ref, setRef] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
          company_website: data.get("company_website"), // honeypot
          need,
          timeline,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setRef(
        `REF-2026-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      );
      window.umami?.track?.("contact_submit", {
        need: need || "unspecified",
        timeline: timeline || "unspecified",
      });
      form.reset();
      setNeed("");
      setTimeline("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="relative border border-line bg-surface p-8 md:p-10">
        <span
          aria-hidden
          className="absolute -left-px -top-px h-3.5 w-3.5 border-l border-t border-accent"
        />
        <span
          aria-hidden
          className="absolute -bottom-px -right-px h-3.5 w-3.5 border-b border-r border-accent"
        />
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
          Transmission logged
        </p>
        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Message received.
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-dim">
          Your inquiry is in my inbox — I reply within one business day, usually
          sooner. Keep <span className="font-mono text-ink">{ref}</span> handy
          if you&rsquo;d like to reference it later.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 border border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-dim transition-colors hover:border-ink-faint hover:text-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={label}>
            Your name <span className="text-accent">*</span>
          </span>
          <input
            name="name"
            required
            placeholder="Jane Hartley"
            className={input}
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className={label}>
            Email <span className="text-accent">*</span>
          </span>
          <input
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className={input}
            autoComplete="email"
          />
        </label>
      </div>

      {/* Honeypot — hidden from humans, irresistible to bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="block">
        <span className={label}>
          Company{" "}
          <span className="normal-case tracking-normal">(optional)</span>
        </span>
        <input
          name="company"
          placeholder="Hartley & Co"
          className={input}
          autoComplete="organization"
        />
      </label>

      <fieldset>
        <legend className={label}>What do you need?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {NEEDS.map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={need === n}
              onClick={() => setNeed(need === n ? "" : n)}
              className={chip(need === n)}
            >
              {n}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={label}>Timeline</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TIMELINES.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={timeline === t}
              onClick={() => setTimeline(timeline === t ? "" : t)}
              className={chip(timeline === t)}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className={label}>
          Tell me about it <span className="text-accent">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="What are you building, what's getting in the way, and what does done look like?"
          className={`${input} resize-y`}
        />
      </label>

      {status === "error" && (
        <p className="border border-accent/50 bg-canvas px-4 py-3 font-mono text-xs leading-relaxed tracking-wide text-ink-dim">
          Transmission failed — try again, or write me directly at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-accent underline underline-offset-4"
          >
            {SITE.email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center gap-6 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="border border-accent bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-canvas transition-colors hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Transmitting…" : "Send message ↗"}
        </button>
        <p className="max-w-[230px] font-mono text-[11px] leading-relaxed text-ink-faint">
          Goes straight to my inbox, no autoresponder. Prefer to write yourself?{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-accent underline underline-offset-4"
          >
            {SITE.email}
          </a>
        </p>
      </div>
    </form>
  );
}
