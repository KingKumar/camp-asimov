"use client";

import AutoPlayVideo from "@/components/AutoPlayVideo";
import { ink } from "@/components/theme";

export default function WhyUsSection() {
  return (
    <section className="pt-6 md:pt-8 pb-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Built around student growth</h2>
        <p className="mt-3 text-neutral-200 max-w-4xl mx-auto">
          Camp Asimov is a mentor-driven build lab where <strong>every student builds their own robot</strong>, makes decisions, and sees the impact of their choices on a working machine. We run tight, personal coaching with a <strong>8:1 student to teacher ratio</strong>, so students get real guidance without losing independence. We focus on <strong>confidence</strong>, <strong>craft</strong>, and <strong>leadership</strong>. Students ship working mechanisms, document their process, and present like pros.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "Authentic builds",
              text: "Each student owns their robot and takes it from sketch → CAD → fabrication → test, with full access to tools and safe lab workflows.",
            },
            {
              title: "Mentored mastery",
              text: "8:1 coaching ratio with structured check-ins, pairing, and tool certifications to build safely and fast.",
            },
            {
              title: "Competitive readiness",
              text: "Code control loops, integrate sensors, and stress-test under time pressure. Skills that transfer to FTC and school teams.",
            },
            {
              title: "Elite coaching staff",
              text: "Staff include top-tier roboticists who have competed at regional championships, know how to connect with like-minded students, and build real mentorship relationships.",
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
            Led by <strong>Ronit Kumar</strong>, a beloved robotics coach who has spent more than a decade teaching in Los Angeles’s independent school system and over fifteen years immersed in competitive robotics as a student, mentor, and program head. Ronit has guided hundreds of students through design challenges and competition seasons, always with the same belief: <em> kids are incredibly capable and come up with the most creative solutions when trusted and supported.</em>
            <span className="block mt-2">
              Camp Asimov exists to give them the skills and environment to build confidence in their ideas. It turns imagination into working machines and helps them see themselves as engineers.
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
