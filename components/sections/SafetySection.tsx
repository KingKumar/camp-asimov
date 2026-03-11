import { Shield } from "lucide-react";

import { ink } from "@/components/theme";

export default function SafetySection() {
  return (
    <section className="pt-6 md:pt-8 pb-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Safety-First Engineering Lab</h2>

        <div
          className="mt-4 rounded-2xl border p-5 md:p-6"
          style={{ borderColor: ink.line, background: "rgba(8,10,16,0.6)" }}
        >
          <p className="text-neutral-200 leading-relaxed text-center">
            Camp Asimov runs as a safety-first engineering lab with clear routines and close supervision. Staff and regular volunteers complete <strong>DOJ Live Scan background checks</strong> and <strong>mandated reporter training</strong>. Students are trained before using tools, wear required <strong>PPE (protective equipment)</strong>, and work in staff-supervised build zones. We also train safe battery handling and keep emergency supplies on site.
          </p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {[
            "Protective gear and certified tool zones: eye protection, secured hair, closed-toe shoes, and required sign-off before using laser cutters, 3D printers, or soldering stations.",
            "Machine safety procedures: enclosed laser operation, safety interlocks, ventilation checks, and posted rules at every machine.",
            "Clean electronics workflow: fume extraction for soldering, burn kit access, and anti-static handling to protect components.",
            "Medical and emergency readiness: allergy/medication alerts, epi-pen/inhaler plan, CPR/First Aid-trained staff, and documented incident response.",
          ].map((s) => (
            <div key={s} className="rounded-2xl border p-5 text-sm" style={{ borderColor: ink.line, background: ink.surface }}>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4" style={{ color: ink.accent }} />
                <span className="text-neutral-300">{s}</span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-4 text-xs md:text-sm text-neutral-200 rounded-2xl border px-4 py-3 backdrop-blur-sm max-w-3xl mx-auto leading-relaxed"
          style={{ borderColor: ink.line, background: "rgba(8,10,16,0.55)" }}
        >
          California compliance: staff/regular volunteers complete <strong>Live Scan</strong> background checks and <strong> mandated reporter training</strong>; written child-safety policies maintained per AB 506.
          <a
            href="/safety-plan.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block sm:inline underline mt-2 sm:mt-0 sm:ml-2"
            style={{ color: ink.accent }}
          >
            View our Safety Plan (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
