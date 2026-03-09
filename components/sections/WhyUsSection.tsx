"use client";

import AutoPlayVideo from "@/components/AutoPlayVideo";
import { ink } from "@/components/theme";

export default function WhyUsSection() {
  return (
    <section className="pt-6 md:pt-8 pb-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Why families choose Camp Asimov</h2>
        <p className="mt-3 text-neutral-200 max-w-4xl mx-auto">
          Many robotics environments rely on large group builds where only a few students handle the real engineering. Camp Asimov is intentionally designed so each student builds their own robot and develops direct mechanical fluency, technical independence, and the confidence to contribute meaningfully on future teams.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "Individual build responsibility",
              text: "Every student works on their own robot platform, with direct responsibility for mechanical decisions, assembly quality, and iteration outcomes.",
            },
            {
              title: "Mentoring with engineering rigor",
              text: "An 8:1 teacher-to-student ratio supports structured check-ins, hands-on repetition, and accountable execution across each student's build.",
            },
            {
              title: "Outcomes that transfer",
              text: "Students leave with mechanical confidence, stronger troubleshooting ability, and the practical fluency to build and improve robots on real teams.",
            },
            {
              title: "Elite coaching leadership",
              text: "Led by experienced program builders who have coached high-performing school teams and mentored students into top STEM pathways.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border p-5 text-left"
              style={{ borderColor: ink.line, background: ink.surface }}
            >
              <div className="font-semibold">{f.title}</div>
              <p className="mt-2 text-sm text-neutral-300">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border p-6" style={{ borderColor: ink.line, background: ink.panel }}>
          <div className="text-base md:text-lg text-neutral-200 leading-relaxed text-center">
            Led by <strong>Ronit Kumar</strong>, who founded Brentwood School&apos;s robotics program and now coaches competitive robotics teams at Crossroads School for Arts &amp; Sciences. Ronit has spent more than a decade teaching engineering fundamentals and over fifteen years in competitive robotics as a student, mentor, and program leader.
            <span className="block mt-2">
              Camp Asimov was built for students who want serious technical growth: real ownership of the engineering process, disciplined build execution, and the confidence to lead engineering work.
            </span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AutoPlayVideo src="/videos/blockdelivery.mp4" poster="/videos/posters/drive.jpg" caption="Driver practice & tuning" ratio="9/16" />
          <AutoPlayVideo src="/videos/conedelivery.mp4" poster="/videos/posters/intake.jpg" caption="Cycle testing" ratio="9/16" />
          <AutoPlayVideo src="/videos/autonomous.mp4" poster="/videos/posters/auton.jpg" caption="Autonomous pathing & sensors" ratio="9/16" />
          <AutoPlayVideo src="/videos/lift.mp4" poster="/videos/posters/scrim.jpg" caption="Mechanical lift stress-testing" ratio="9/16" />
        </div>
      </div>
    </section>
  );
}
