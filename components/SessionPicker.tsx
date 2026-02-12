"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

type Session = { id: string; label: string; link: string; soldOut?: boolean };

const CTA_BG = "#8EF4D2";
const CTA_TEXT = "#071410";

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
        <div className="relative w-full">
          <select
            id="camp-session"
            value={sel}
            onChange={(e) => setSel(e.target.value)}
            className="w-full appearance-none px-4 py-2.5 pr-11 rounded-xl bg-neutral-900/80 border border-neutral-700/70 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] focus:outline-none focus:ring-2 focus:ring-teal-300/40"
            style={{ WebkitAppearance: "none", MozAppearance: "none", appearance: "none", backgroundImage: "none" }}
            aria-describedby="session-help"
          >
            {SESSIONS.map((s) => (
              <option key={s.id} value={s.id} disabled={!!s.soldOut}>
                {s.label}
                {s.soldOut ? "  -  Sold out" : ""}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-white/10 to-white/0 shadow-[0_0_0_1px_rgba(0,0,0,0.2)]">
              <ChevronDown className="h-4 w-4 text-[#8EF4D2]" />
            </div>
          </div>
        </div>
        <button
          onClick={go}
          disabled={!selected || !!selected?.soldOut || status === "going"}
          className="w-full px-4 py-2 rounded-xl text-sm font-semibold leading-tight transition-transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50"
          style={{ backgroundColor: CTA_BG, color: CTA_TEXT, textShadow: "none" }}
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
          className="px-6 py-3 rounded-xl font-semibold transition-transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50"
          style={{ backgroundColor: CTA_BG, color: CTA_TEXT, textShadow: "none" }}
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
