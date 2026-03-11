"use client";

import AutoPlayVideo from "@/components/AutoPlayVideo";
import { ink } from "@/components/theme";

export default function WhyUsSection() {
  return (
    <section className="pt-6 md:pt-8 pb-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Why families choose Camp Asimov</h2>
        <p className="mt-3 text-neutral-200 max-w-4xl mx-auto">
          In many robotics settings, students work in groups where only a few end up doing most of the real building. Camp Asimov is intentionally structured so each student builds and programs their own robot, develops direct mechanical and electrical understanding, and returns to team environments ready to contribute at a higher level.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "Every student builds their own robot",
              text: "Students do not sit back and watch demos or rely on one shared build. Each student is directly responsible for designing parts, assembling systems, wiring electronics, and improving performance through testing.",
            },
            {
              title: "What the intensive actually means",
              text: "This is a focused three-week robotics engineering program where students spend each day building, testing, troubleshooting, and improving their robot with direct mentor feedback.",
            },
            {
              title: "How independence is taught",
              text: "The goal is to help students become the builder on their robotics team: the student who understands the robot's structure, wiring, CAD (3D design software), and code.",
            },
            {
              title: "Mentoring with engineering rigor",
              text: "An 8:1 teacher-to-student ratio supports structured check-ins, hands-on repetition, and careful follow-through on each student's design, build, and testing work.",
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
              Camp Asimov was built for students who want more hands-on experience designing, building, wiring, programming, and debugging a robot from start to finish.
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
