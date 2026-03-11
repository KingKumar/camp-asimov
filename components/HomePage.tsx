"use client";

import { motion } from "framer-motion";
import { Check, Shield, Trophy } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import SessionPicker from "@/components/SessionPicker";
import { ink } from "@/components/theme";
import { NOT_A_FIT_LINES, WHO_ITS_FOR_LINES } from "@/lib/campConfig";

export default function HomePage() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-20 md:pt-8 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
        <motion.h1
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 text-4xl md:text-6xl font-black leading-[1.02]"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.65)" }}
        >
          3-Week Robotics Engineering Program
        </motion.h1>

        <div>
          <p
            className="mt-0 md:mt-2 text-lg text-neutral-300 max-w-prose"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            Students design, build, and program their own robot while learning CAD (3D design software), electronics, and how the moving parts, wiring, and code all work together.
          </p>
          <p className="mt-2 text-sm md:text-base text-neutral-300">
            Two summer sessions • 16 students per cohort • Santa Monica
          </p>
          <p className="mt-3 text-sm md:text-base text-neutral-200 max-w-prose">
            Students of all experience levels are welcome. On day one, students are assessed on prior experience with building, 3D design, and programming, and instruction is adjusted so each student works at an appropriate level.
          </p>
          <p className="mt-2 text-sm md:text-base text-neutral-200 max-w-prose">
            Camp Asimov is led by Ronit Kumar, an engineer and long-time robotics mentor.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-3 max-w-2xl">
            <div className="rounded-xl border px-4 py-3 text-sm" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.28)" }}>
              <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">Who This Program Is For</div>
              <ul className="mt-2 space-y-1 text-neutral-200">
                {WHO_ITS_FOR_LINES.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border px-4 py-3 text-sm" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.28)" }}>
              <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">Not a Fit For</div>
              <ul className="mt-2 space-y-1 text-neutral-200">
                {NOT_A_FIT_LINES.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Button
              asChild
              size="lg"
              className="px-6 py-6 text-base border w-full max-w-md"
              style={{ backgroundColor: "transparent", color: ink.accent, borderColor: ink.accent, textShadow: "none" }}
            >
              <Link href="/program">Curriculum Overview</Link>
            </Button>
            <div className="w-full max-w-md mx-auto">
              <SessionPicker compact ctaLabel="Request an Invite" showCohortNote />
            </div>
            <p className="w-full max-w-md text-sm text-neutral-200 text-center leading-relaxed">
              Apply for a small, mentor-led program where every student builds and programs their own robot.
            </p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-white/6 to-transparent" />
            <div
              className="relative rounded-2xl border p-6 md:p-8"
              style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(10,12,16,0.18)" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-300">Camp Snapshot</div>
                  <div className="mt-1 text-lg md:text-xl font-semibold text-white">Small cohorts. Individual robot builds. Clear technical outcomes.</div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs text-neutral-400">
                  <Shield className="w-4 h-4" style={{ color: ink.accent }} aria-hidden />
                  Safety-first lab
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                {[
                  ["3", "Weeks"],
                  ["10–17", "Ages"],
                  ["1:8", "Teacher : Student"],
                ].map(([n, l]) => (
                  <div
                    key={l}
                    className="rounded-lg border px-3 py-3"
                    style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(12,14,18,0.18)" }}
                  >
                    <div className="font-extrabold text-lg md:text-xl">{n}</div>
                    <div className="text-neutral-400">{l}</div>
                  </div>
                ))}
              </div>

              <div
                className="mt-5 rounded-xl border p-4"
                style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(10,12,16,0.16)" }}
              >
                <div className="flex items-center gap-2 text-sm text-neutral-300">
                  <Trophy className="w-4 h-4" aria-hidden />
                  Small cohorts to keep coaching quality high.
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs md:text-sm">
                  {[
                    {
                      title: "CAD portfolio that proves design fluency",
                      sub: "Fusion 360 files, part designs, and documented design improvements.",
                    },
                    {
                      title: "FTC-ready software fundamentals",
                      sub: "Java (an industry-standard robotics language), plus motor control and sensor logic used in team competition robots.",
                    },
                    {
                      title: "Competition-grade hardware execution",
                      sub: "REV and goBilda hardware with clean, reliable wiring.",
                    },
                    {
                      title: "Confidence making custom robot parts under supervision",
                      sub: "3D printing, laser, CNC, fixtures, and safe workflow.",
                    },
                    {
                      title: "Autonomous routines with sensors",
                      sub: "Using distance and orientation sensors so robots can respond to the environment.",
                    },
                    {
                      title: "Demo Day reel and technical presentation",
                      sub: "Clear documentation, iteration story, confident delivery.",
                    },
                  ].map((t) => (
                    <div
                      key={t.title}
                      className="flex items-start gap-2 rounded-md border px-3 py-2"
                      style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(10,12,16,0.12)" }}
                    >
                      <Check className="w-4 h-4 mt-0.5" style={{ color: ink.accent }} aria-hidden />
                      <div className="text-neutral-200">
                        <div className="font-medium">{t.title}</div>
                        <div className="text-xs text-neutral-400">{t.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 min-[901px]:grid-cols-[1.45fr_0.55fr] gap-6 min-[901px]:gap-10 items-stretch">
          <div className="rounded-2xl border p-6 md:p-8 h-full flex flex-col justify-center" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.24)" }}>
            <h2 className="text-3xl md:text-4xl font-bold">Meet the Instructor</h2>
            <div className="mt-4 space-y-4 text-neutral-200 leading-relaxed text-[1.02rem] md:text-[1.18rem]">
              <p>
                Ronit Kumar is an educator, technologist, and veteran robotics mentor who founded Brentwood School&apos;s robotics program and now coaches competitive robotics teams at Crossroads School for Arts &amp; Sciences.
              </p>
              <p>
                Ronit Kumar holds an engineering degree and has spent more than a decade mentoring robotics students and helping them design and build competitive robots.
              </p>
              <p>
                Over the past decade, he has helped students grow in mechanical design, CAD, programming, and competitive robotics through hands-on mentorship and practical robot design and troubleshooting challenges. His students have gone on to study engineering, computer science, and science at universities including Harvard, Colgate, and UC Davis.
              </p>
              <p>
                Camp Asimov was created to give motivated students a more serious robotics experience - one centered on CAD, mechanical design, wiring, programming, troubleshooting, and meaningful mentorship.
              </p>
              <p>
                Ronit&apos;s core teaching philosophy is simple: students learn engineering fastest when they are directly responsible for their own builds. Camp Asimov is intentionally structured so students develop the mechanical judgment and technical confidence to become the teammate who can actually build, troubleshoot, and improve the robot.
              </p>
              <p>Ronit personally leads instruction and works directly with students throughout the program.</p>
              <p className="text-sm md:text-base text-neutral-300">Longtime FIRST robotics competitor, mentor, and coach.</p>
            </div>
          </div>
          <div className="rounded-2xl border p-2 md:p-3 flex items-center justify-center min-[901px]:h-full" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.24)" }}>
            <img
              src="/ronit.JPG"
              alt="Ronit Kumar, Camp Asimov instructor"
              className="w-full h-auto max-h-[420px] min-[901px]:w-auto min-[901px]:h-full min-[901px]:max-h-[500px] min-[901px]:max-w-full object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
