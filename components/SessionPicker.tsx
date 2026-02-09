"use client";

import { useEffect, useMemo, useState } from "react";

type Session = { id: string; label: string; link: string; soldOut?: boolean };

const SESSIONS: Session[] = [
  { id: "june", label: "June 8–26", link: "https://buy.stripe.com/9B6cN5a4schn5OS2RK0sU00" },
  { id: "july", label: "July 6–24", link: "https://buy.stripe.com/3cIfZhccA3KRcdg1NG0sU01" },
  // { id: "july", label: "July 6–24", link: "", soldOut: true },
];

/** Optional analytics typing (avoids `any`) */
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export default function SessionPicker({ compact = false }: { compact?: boolean }) {
  // Preselect first available session
  const firstAvailable = useMemo(() => SESSIONS.find((s) => !s.soldOut)?.id ?? "", []);
  const [sel, setSel] = useState<string>(firstAvailable);
  const [status, setStatus] = useState<"idle" | "going">("idle");

  // Allow ?session=june preselect
  useEffect(() => {
    const url = new URL(window.location.href);
    const q = url.searchParams.get("session");
    if (q && SESSIONS.some((s) => s.id === q && !s.soldOut)) {
      setSel(q);
    }
  }, []);

  const selected = useMemo(() => SESSIONS.find((s) => s.id === sel), [sel]);

  const go = () => {
    if (!selected || selected.soldOut || !selected.link) return;
    setStatus("going");

    // Optional analytics without `any`
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "cta_enroll_click",
        session_id: selected.id,
        session_label: selected.label,
      });
    }

    // Same-tab Stripe checkout is best for completion rate
    window.location.href = selected.link;
  };

  if (compact) {
    return (
      <div className="flex flex-col gap-2">
        <label className="sr-only" htmlFor="camp-session">
          Choose session
        </label>
        <select
          id="camp-session"
          value={sel}
          onChange={(e) => setSel(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-sm"
          aria-describedby="session-help"
        >
          {SESSIONS.map((s) => (
            <option key={s.id} value={s.id} disabled={!!s.soldOut}>
              {s.label}
              {s.soldOut ? " — Sold out" : ""}
            </option>
          ))}
        </select>
        <button
          onClick={go}
          disabled={!selected || !!selected?.soldOut || status === "going"}
          className="w-full px-4 py-2 rounded-lg text-sm font-semibold leading-tight disabled:opacity-50"
          style={{ backgroundColor: "#00f0b5", color: "#081b17" }}
          aria-live="polite"
        >
          {status === "going" ? "Opening…" : "Register for Summer 2026"}
        </button>
        <span id="session-help" className="sr-only">
          Select a session and press Register for Summer 2026 to proceed to payment.
        </span>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border p-4 md:p-6"
      style={{ background: "rgba(16,18,25,0.9)", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <h3 className="text-lg font-semibold mb-3">Choose your session</h3>

      <div className="grid sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Camp sessions">
        {SESSIONS.map((s) => {
          const active = sel === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => !s.soldOut && setSel(s.id)}
              disabled={!!s.soldOut}
              className={`rounded-xl px-4 py-3 text-left border transition
                ${active ? "border-teal-400" : "border-white/15"}
                ${s.soldOut ? "opacity-50 cursor-not-allowed" : "hover:border-white/40"}`}
            >
              <div className="font-medium">{s.label}</div>
              <div className="text-xs text-neutral-400">
                {s.soldOut ? "Sold out" : "Deposit $1,200"}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={go}
          disabled={!selected || !!selected?.soldOut || status === "going"}
          className="px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
          style={{ backgroundColor: "#00f0b5", color: "#081b17" }}
          aria-live="polite"
        >
          {status === "going"
            ? "Opening…"
            : selected?.soldOut
            ? "Session full"
            : selected
            ? "Continue to payment"
            : "Select a session"}
        </button>

        <a
          href="#pricing"
          className="px-6 py-3 rounded-xl border"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
        >
          Tuition details
        </a>
      </div>
    </div>
  );
}
