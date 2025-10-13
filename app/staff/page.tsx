"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StaffPortalPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleLogout() {
    try {
      setBusy(true);
      const res = await fetch("/api/staff/logout", { method: "POST" });
      // Even if JSON fails, just navigate away
      if (!res.ok) {
        console.warn("Logout response not OK");
      }
    } catch (e) {
      console.warn("Logout error", e);
    } finally {
      setBusy(false);
      router.push("/staff/login");
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Staff Portal</h1>
        <button
          onClick={handleLogout}
          disabled={busy}
          className="px-4 py-2 rounded-xl font-semibold"
          style={{ backgroundColor: "#7AA2F7", color: "#081b17", opacity: busy ? 0.7 : 1 }}
        >
          {busy ? "Signing out…" : "Sign out"}
        </button>
      </div>

      <p className="mt-2 text-neutral-400">
        Internal resources for instructors and mentors.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {/* Training Modules */}
        <section className="rounded-2xl border p-6" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#101219" }}>
          <h2 className="text-xl font-semibold">Training Modules</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300 list-disc list-inside">
            <li><Link href="/staff/modules/cad" className="underline">3D CAD (Fusion 360) — Video Series</Link></li>
            <li><Link href="/staff/modules/ethos" className="underline">Camp Ethos & Teaching Mindset</Link></li>
            <li><Link href="/staff/modules/compliance" className="underline">AB 506 & Youth Protection</Link></li>
            <li><Link href="/staff/modules/lab" className="underline">Lab Certification: Laser, 3D, Solder</Link></li>
            <li><Link href="/staff/modules/ftc" className="underline">REV Control Hub + Java (FTC)</Link></li>
          </ul>
        </section>

        {/* SOPs & Checklists */}
        <section className="rounded-2xl border p-6" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#101219" }}>
          <h2 className="text-xl font-semibold">SOPs & Checklists</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300 list-disc list-inside">
            <li><a href="/parent-packet.pdf" target="_blank" className="underline">Parent Packet (PDF)</a></li>
            <li><a href="/safety-plan.pdf" target="_blank" className="underline">Safety Plan (PDF)</a></li>
            <li><a href="/sops/laser-cutter.pdf" target="_blank" className="underline">Laser Cutter SOP</a></li>
            <li><a href="/sops/soldering.pdf" target="_blank" className="underline">Soldering SOP</a></li>
          </ul>
        </section>

        {/* Daily Ops */}
        <section className="rounded-2xl border p-6 md:col-span-2" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#101219" }}>
          <h2 className="text-xl font-semibold">Daily Operations</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300 list-disc list-inside">
            <li>Attendance & headcount at 9:00, 12:45, 3:30</li>
            <li>PPE & tool badge checks at lab entry</li>
            <li>Li-ion charging: supervised, labeled packs only</li>
            <li>Cleanup & lockout: 3D / laser / solder stations</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
