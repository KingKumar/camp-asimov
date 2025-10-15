"use client";

import { useState } from "react";

type Session = { id: string; label: string; link: string; soldOut?: boolean };

/**
 * TODO: Replace the REPLACE_* links with your real Stripe Payment Links.
 */
const SESSIONS: Session[] = [
  { id: "june", label: "June 8–26", link: "https://buy.stripe.com/9B6cN5a4schn5OS2RK0sU00" },
  { id: "july", label: "July 6–24", link: "https://buy.stripe.com/3cIfZhccA3KRcdg1NG0sU01" },
  // Example for a full session:
  // { id: "july", label: "July 6–24", link: "", soldOut: true },
];

export default function SessionPicker({ compact = false }: { compact?: boolean }) {
  const [sel, setSel] = useState<string>("");

  const go = () => {
    const s = SESSIONS.find(x => x.id === sel);
    if (s?.link) window.open(s.link, "_blank", "noopener,noreferrer");
  };

  if (compact) {
    return (
      <div className="flex gap-2 items-center">
        <label className="sr-only" htmlFor="camp-session">Choose session</label>
        <select
          id="camp-session"
          value={sel}
          onChange={(e) => setSel(e.target.value)}
          className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-sm"
        >
          <option value="">Select session…</option>
          {SESSIONS.map(s => (
            <option key={s.id} value={s.id} disabled={!!s.soldOut}>
              {s.label}{s.soldOut ? " — Sold out" : ""}
            </option>
          ))}
        </select>
        <button
          onClick={go}
          disabled={!sel}
          className="px-4 py-2 rounded-xl font-semibold disabled:opacity-50"
          style={{ backgroundColor: "#00f0b5", color: "#081b17" }}
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border p-4 md:p-6" style={{ background: "rgba(16,18,25,0.9)", borderColor: "rgba(255,255,255,0.08)" }}>
      <h3 className="text-lg font-semibold mb-3">Choose your session</h3>

      <div className="grid sm:grid-cols-3 gap-3">
        {SESSIONS.map(s => (
          <button
            key={s.id}
            onClick={() => !s.soldOut && setSel(s.id)}
            disabled={!!s.soldOut}
            className={`rounded-xl px-4 py-3 text-left border transition
              ${sel === s.id ? "border-teal-400" : "border-white/15"}
              ${s.soldOut ? "opacity-50 cursor-not-allowed" : "hover:border-white/40"}`}
          >
            <div className="font-medium">{s.label}</div>
            <div className="text-xs text-neutral-400">
              {s.soldOut ? "Sold out" : "Deposit $1,200"}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={go}
          disabled={!sel}
          className="px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
          style={{ backgroundColor: "#00f0b5", color: "#081b17" }}
        >
          {sel ? "Continue to payment" : "Select a session"}
        </button>
      </div>
    </div>
  );
}
