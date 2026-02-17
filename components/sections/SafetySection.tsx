import { Shield } from "lucide-react";

import { ink } from "@/components/theme";

export default function SafetySection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Safety Protocols</h2>

        <div
          className="mt-4 rounded-2xl border p-5 md:p-6"
          style={{ borderColor: ink.line, background: "rgba(8,10,16,0.6)" }}
        >
          <p className="text-neutral-200 leading-relaxed text-center">
            We operate a youth-safety program that meets California requirements for youth-serving organizations. All staff and regular volunteers complete <strong>DOJ Live Scan background checks</strong> and <strong> mandated reporter training</strong>. Students progress through <strong>tool certifications</strong>, wear <strong>PPE</strong>, and work in <strong>staff-supervised zones</strong> with machine-specific SOPs (laser cutter, 3D printers, soldering, CNC). We train lithium-ion battery handling for robotics power systems and maintain on-site emergency supplies.
          </p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {[
            "PPE & Certified Tool Zones: eye protection, hair secured, closed-toe shoes; badges required for laser, 3D printers, soldering.",
            "Laser & Fab SOPs (ANSI Z136-aligned): enclosed Class-1 operation, interlocks maintained, venting checked, signage posted.",
            "Fume Control & ESD: local exhaust for soldering, flux training, burn kit on bench; anti-static handling for electronics.",
            "Medical & Emergency Ready: allergy/med alerts, epi-pen/inhaler plan, CPR/First Aid trained staff, incident logs & notifications.",
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
