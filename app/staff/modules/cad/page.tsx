"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CAD_LESSONS } from "./lessons";

const PANEL_BG = "#101219";
const BORDER = "rgba(255,255,255,0.08)";
const ACCENT = "#7AA2F7";

export default function CadModuleIndex() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cad_completed") || "{}";
      setCompleted(JSON.parse(raw));
    } catch {}
  }, []);

  const total = CAD_LESSONS.length;
  const done = useMemo(
    () => Object.values(completed).filter(Boolean).length,
    [completed]
  );

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">3D CAD — Staff Training</h1>
        <Link
          href="/staff"
          className="px-4 py-2 rounded-xl font-semibold"
          style={{ backgroundColor: ACCENT, color: "#081b17" }}
        >
          Staff Portal
        </Link>
      </div>

      <p className="mt-2 text-neutral-400">
        Watch each lesson and mark it complete. Your progress is saved on this device.
      </p>

      <div className="mt-4 text-sm text-neutral-300">
        Progress: <strong>{done}</strong> / {total} lessons
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {CAD_LESSONS.map((l) => {
          const isDone = completed[l.slug];
          return (
            <Link
              key={l.slug}
              href={`/staff/modules/cad/${l.slug}`}
              className="rounded-2xl border p-6 hover:opacity-95 transition"
              style={{ borderColor: BORDER, background: PANEL_BG }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{l.title}</h2>
                  <p className="mt-1 text-neutral-400 text-sm">
                    {l.description || "Lesson"}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${isDone ? "bg-green-500/20 text-green-300" : "bg-neutral-700/40 text-neutral-300"}`}
                >
                  {isDone ? "Completed" : "Not started"}
                </span>
              </div>
              {l.duration && (
                <div className="mt-3 text-xs text-neutral-500">Duration: {l.duration}</div>
              )}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
