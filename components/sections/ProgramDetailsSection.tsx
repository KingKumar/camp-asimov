"use client";

import { motion } from "framer-motion";
import { Cpu, Trophy, Wrench } from "lucide-react";

import MediaGallery, { type MediaItem } from "@/components/MediaGallery";
import SessionPicker from "@/components/SessionPicker";
import { ink } from "@/components/theme";
import {
  COHORT_CAP,
  COHORT_DATES,
  NOT_A_FIT_LINES,
  PROGRAM_ADDRESS_LINE_1,
  PROGRAM_ADDRESS_LINE_2,
  WHO_ITS_FOR_LINES,
} from "@/lib/campConfig";

type WeekSection = {
  id: string;
  title: string;
  description: string;
  focusAreas: string[];
  outcomes: string[];
  media: MediaItem[];
};

type RhythmItem = {
  time: string;
  title: string;
  detail: string;
};

const weeks: WeekSection[] = [
  {
    id: "week1",
    title: "Week 1: Design, Making Custom Parts, and Rapid Prototyping",
    description:
      "Students build the foundation on their own robot by moving from concept to a first working prototype they can test and improve.",
    focusAreas: [
      "CAD (3D design software) with Autodesk Fusion 360",
      "Drivetrain work (the system that helps the robot move), intakes, and linkages using REV + goBilda parts",
      "Testing, feedback, and redesign cycles",
      "Safe lab operation & tool certification",
    ],
    outcomes: [
      "Early prototypes completed",
      "Fusion files & sketches saved",
      "Understanding mechanical trade-offs",
      "Confident, safe shop habits",
    ],
    media: [
      {
        type: "video",
        src: "/claw.mp4",
        alt: "Week 1 claw prototype in action",
        caption: "Week 1 claw mechanism prototype",
      },
    ],
  },
  {
    id: "week2",
    title: "Week 2: Code, Control Systems & Sensor Integration",
    description:
      "Students connect their hardware to reliable software behavior by learning how code and electronics control movement and response.",
    focusAreas: [
      "Java, an industry-standard programming language used in competitive robotics, with REV Control Hub",
      "Encoders and driver controls so the robot can move precisely",
      "Sensors (distance/vision) so the robot can detect and react",
      "Intro to autonomous routines (robot actions that run without driver input)",
    ],
    outcomes: [
      "Reliable robot systems that work together",
      "Functional driver-control and autonomous code modes",
      "Sensor-based control working reliably on the robot",
      "First mini-autonomous routines",
    ],
    media: [
      {
        type: "video",
        src: "/videos/coding-feature.mp4",
        alt: "Week 2 coding and robot control development",
      },
    ],
  },
  {
    id: "week3",
    title: "Week 3: Test, Iterate, Compete",
    description:
      "Students stress-test their builds, identify failures, and improve step by step, ending with a Family Scrimmage Showcase.",
    focusAreas: [
      "Reliability testing & failure analysis",
      "Iteration journals and responsibility for key robot systems",
      "Strategy refinement & driver practice",
      "Presentation & storytelling",
    ],
    outcomes: [
      "Reliable competition systems",
      "Clear documentation of changes",
      "Real scrimmage match experience",
      "Polished final presentation",
    ],
    media: [
      {
        type: "video",
        src: "/videos/practice-clip.mp4",
        alt: "Week 3 driving practice and match preparation",
      },
    ],
  },
];

const rhythm: RhythmItem[] = [
  {
    time: "9:00",
    title: "Morning briefing & safety checks",
    detail: "Day objectives, tooling checks, and lab readiness before build starts.",
  },
  {
    time: "9:20",
    title: "Build block (mechanical / coding / testing)",
    detail: "Focused work on key robot systems with coach-guided checkpoints.",
  },
  {
    time: "11:00",
    title: "Coach check-ins & feedback loops",
    detail: "Review debugging decisions, track progress, and improve build quality.",
  },
  {
    time: "12:00",
    title: "Lunch & recharge",
    detail: "Reset for the afternoon block and review next priorities.",
  },
  {
    time: "12:30",
    title: "Afternoon build block (key robot systems + testing improvements)",
    detail: "Integrate hardware and software, test quickly, and improve through repeated testing.",
  },
  {
    time: "3:30",
    title: "End-of-day demos & iteration planning",
    detail: "Show outcomes, capture learnings, and define next-step build goals.",
  },
];

export default function ProgramDetailsSection() {
  return (
    <>
      <section className="pt-6 md:pt-8 pb-16">
        <div className="mx-auto max-w-7xl px-6 text-white">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center"
          >
            3-Week Robotics Engineering Program
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-neutral-300 text-center max-w-4xl mx-auto"
          >
            This is a focused three-week robotics engineering program where students spend each day designing, building, wiring, programming, testing, and improving their own robot. Students learn by taking direct responsibility for their work, finding problems, and improving the robot step by step.
          </motion.p>
          <p className="mt-3 text-center text-sm md:text-base text-neutral-200 max-w-4xl mx-auto">
            Students of all experience levels are welcome. On the first day, students are assessed in building, CAD (3D design software), and programming so instruction can be adjusted to the right challenge level.
          </p>

          <div className="mt-10 grid gap-6">
            {weeks.map((week, index) => (
              <motion.article
                key={week.id}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl border p-6 md:p-8 shadow-lg relative overflow-hidden"
                style={{ background: ink.surface, borderColor: ink.line }}
              >
                <div
                  className="absolute -inset-1 rounded-2xl pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(143,215,255,0.16), transparent 60%)" }}
                />

                <div className={`relative grid items-start gap-6 lg:gap-8 ${week.media.length ? "xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.9fr)] xl:items-center" : ""}`}>
                  <div className="order-2 xl:order-1">
                    <h3 className="text-xl md:text-2xl font-semibold leading-tight">{week.title}</h3>
                    <p className="mt-3 text-neutral-300 text-base leading-relaxed max-w-3xl">{week.description}</p>
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <div
                        className="rounded-xl border p-4"
                        style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(10,12,16,0.18)" }}
                      >
                        <div className="text-sm font-medium text-neutral-200">Focus Areas</div>
                        <ul className="mt-2 list-disc list-inside text-neutral-300 text-sm leading-relaxed space-y-1.5">
                          {week.focusAreas.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div
                        className="rounded-xl border p-4"
                        style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(10,12,16,0.18)" }}
                      >
                        <div className="text-sm font-medium text-neutral-200">Outcomes</div>
                        <ul className="mt-2 list-disc list-inside text-neutral-300 text-sm leading-relaxed space-y-1.5">
                          {week.outcomes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {week.media.length ? (
                    <aside className="order-1 xl:order-2 w-full xl:max-w-[460px] xl:justify-self-end xl:self-center">
                      <MediaGallery media={week.media} />
                    </aside>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl border p-6"
            style={{ background: ink.panel, borderColor: ink.line }}
          >
            <h3 className="text-lg md:text-xl font-semibold text-neutral-100">By the End of the Program, Students Will Be Able To:</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-sm md:text-base text-neutral-200 leading-relaxed">
              <li>Design simple robot parts and assemblies in CAD (3D design software)</li>
              <li>Assemble a drivetrain and other key moving systems of a robot</li>
              <li>Wire motors, servos, and core electronics</li>
              <li>Write and test basic robot code in Java (an industry-standard language used by many robotics teams)</li>
              <li>Troubleshoot mechanical and electrical issues</li>
              <li>Improve robot designs through testing and redesign</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl border p-5 md:p-6"
            style={{ background: ink.panel, borderColor: ink.line }}
          >
            <h3 className="text-lg md:text-xl font-semibold text-neutral-100">Daily Rhythm</h3>

            <div className="mt-4 space-y-3.5">
              {rhythm.map((item, idx) => (
                <div key={`${item.time}-${item.title}`} className="relative pl-11">
                  <div
                    aria-hidden="true"
                    className="absolute left-4 top-0 h-full w-px bg-white/15"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute left-[11px] top-[18px] h-2.5 w-2.5 rounded-full border border-white/40 bg-[#8fd7ff]"
                  />
                  {idx === rhythm.length - 1 ? (
                    <div aria-hidden="true" className="absolute left-4 bottom-0 h-2 w-px bg-transparent" />
                  ) : null}

                  <div className="rounded-xl border px-3 py-3.5 md:px-4 md:py-3" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(10,12,16,0.2)" }}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
                      <span className="inline-flex h-7 w-fit items-center rounded-full border px-2.5 text-xs font-semibold tracking-wide text-[#d8f0ff]" style={{ borderColor: "rgba(143,215,255,0.45)", background: "rgba(143,215,255,0.12)" }}>
                        {item.time}
                      </span>
                      <div>
                        <p className="text-sm md:text-[15px] font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-sm text-neutral-300 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              <p className="text-sm md:text-[15px] leading-relaxed text-neutral-200">
                Camp Asimov days are intentionally structured for sustained focus and steady progress, with natural breaks built into the rhythm and short, fun team games that keep energy high. Students still collaborate and support one another, but engineering responsibility stays personal so each student builds mechanical confidence and real troubleshooting ability.
              </p>
            </div>
          </motion.div>

          <div className="mt-12 h-px w-full" style={{ background: ink.line }} />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center">
              Skill Progression (not age-based)
            </h3>

            <p className="mt-3 text-neutral-300 text-center max-w-3xl mx-auto">
              Students are placed by capability and readiness for technical work. Advancement is earned through consistent, high-quality build and testing work, not age.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
                className="w-full md:w-2/3 lg:w-1/2 rounded-2xl p-6 border text-center relative overflow-hidden"
                style={{ borderColor: ink.line, background: ink.panel }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(143,215,255,0.14), transparent 70%)" }}
                />
                <div className="relative">
                  <div
                    className="flex items-center justify-center gap-2 text-sm uppercase tracking-wide font-semibold"
                    style={{ color: ink.accent }}
                  >
                    <Trophy className="h-4 w-4" /> Level 3: Competitive Leadership
                  </div>
                  <p className="mt-2 text-neutral-200 text-sm">
                    Advanced build strategy, autonomous routines, test-based improvement, leadership on key robot systems, and mentoring peers.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                viewport={{ once: true }}
                className="w-full md:w-3/4 lg:w-2/3 rounded-2xl p-6 border text-center relative overflow-hidden"
                style={{ borderColor: ink.line, background: ink.surface }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center justify-center gap-2 text-indigo-300 text-sm uppercase tracking-wide font-semibold">
                    <Wrench className="h-4 w-4" /> Level 2: Intermediate Integration
                  </div>
                  <p className="mt-2 text-neutral-200 text-sm">
                    CAD (3D design) to build to wiring to code to sensors to testing. Students take responsibility for major robot systems and contribute to match strategy.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                viewport={{ once: true }}
                className="w-full md:w-5/6 rounded-2xl p-6 border text-center relative overflow-hidden"
                style={{ borderColor: ink.line, background: "#111521" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/10 to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center justify-center gap-2 text-neutral-300 text-sm uppercase tracking-wide font-semibold">
                    <Cpu className="h-4 w-4" /> Level 1: Foundations
                  </div>
                  <p className="mt-2 text-neutral-200 text-sm">
                    Tool safety, CAD basics, programming fundamentals, mechanical principles, fast prototyping, and a strong improvement mindset.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 text-center text-sm">
              <em
                className="inline-block rounded-full border px-4 py-2 text-neutral-200 backdrop-blur-sm"
                style={{ borderColor: ink.line, background: "rgba(8,10,16,0.55)" }}
              >
                Age groupings are for social fit,<strong> skills determine challenge level.</strong>
              </em>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="pt-6 md:pt-8 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-center flex-wrap gap-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center w-full">Tuition & Dates</h2>
            <div className="text-sm text-neutral-300">3-week program • Mon-Fri 9:00-4:00</div>
          </div>

          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            <div
              className="rounded-2xl border p-6 lg:col-span-2"
              style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(12,14,18,0.22)" }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <div className="text-neutral-300 text-sm uppercase tracking-[0.2em]">Tuition</div>
                  <div className="mt-2 text-4xl md:text-5xl font-extrabold">
                    $1,200 <span className="text-base font-medium text-neutral-300">/ week</span>
                  </div>
                  <div className="mt-2 text-neutral-300 text-sm">3-week program • $3,600 total</div>
                </div>
                <div className="w-full max-w-md">
                  <SessionPicker compact ctaLabel="Apply for the Summer Cohort" showCohortNote />
                </div>
              </div>
              <div className="mt-4 rounded-xl border px-4 py-3 text-sm text-neutral-200" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.12)" }}>
                Limited seats by design. Cohorts are capped at {COHORT_CAP} to preserve high mentor access and build quality.
              </div>
              <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm text-neutral-300">
                <div className="rounded-xl border px-4 py-3" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.12)" }}>
                  <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">Dates</div>
                  <div className="mt-1 font-semibold text-white">{COHORT_DATES}</div>
                </div>
                <div className="rounded-xl border px-4 py-3" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.12)" }}>
                  <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">Location</div>
                  <div className="mt-1 font-semibold text-white">{PROGRAM_ADDRESS_LINE_1}</div>
                  <div className="text-xs leading-relaxed text-neutral-300">{PROGRAM_ADDRESS_LINE_2}</div>
                </div>
              </div>
              <div className="mt-4 rounded-xl border px-4 py-3 text-sm text-neutral-300" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.12)" }}>
                <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">Summer 2026 Sessions</div>
                <ul className="mt-2 space-y-1">
                  <li><span className="font-semibold text-white">June 8 - June 26:</span> Cohort A</li>
                  <li><span className="font-semibold text-white">July 6 - July 24:</span> Cohort B</li>
                  <li className="font-semibold text-white">Each session is limited to {COHORT_CAP} students.</li>
                </ul>
              </div>
              <div className="mt-4 text-xs md:text-sm text-neutral-300">
                Refund policy available here:{" "}
                <a className="underline" href="/refunds" style={{ color: ink.accent }}>
                  View refund policy
                </a>
              </div>
            </div>

            <div className="rounded-2xl border p-6" style={{ borderColor: ink.line, background: "rgba(12,14,18,0.18)" }}>
              <div className="text-neutral-300 text-sm uppercase tracking-[0.2em]">Ages</div>
              <div className="mt-2 text-2xl font-semibold">10–15</div>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                <li>Grouped by age/experience</li>
                <li>1:8 <strong>Teacher : Student</strong> ratio</li>
                <li>High-intensity, mentor-heavy build days</li>
              </ul>
            </div>

            <div className="rounded-2xl border p-6 lg:col-span-3" style={{ borderColor: ink.line, background: "rgba(12,14,18,0.18)" }}>
              <div className="text-neutral-300 text-sm uppercase tracking-[0.2em]">Who This Program Is For</div>
              <div className="mt-4">
                <div className="text-base font-semibold text-white">This program is a strong fit for:</div>
                <ul className="mt-2 space-y-2 text-base leading-relaxed text-neutral-200">
                  {WHO_ITS_FOR_LINES.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <div className="text-base font-semibold text-white">Not a Fit For</div>
                <ul className="mt-2 space-y-2 text-base leading-relaxed text-neutral-200">
                  {NOT_A_FIT_LINES.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border p-6 lg:col-span-3" style={{ borderColor: ink.line, background: "rgba(12,14,18,0.18)" }}>
              <div className="text-neutral-300 text-sm uppercase tracking-[0.2em]">What’s included</div>
              <div className="mt-2 text-sm text-neutral-300">
                A focused program where each student builds and programs their own robot with professional tooling, structured coaching, and clear technical milestones.
              </div>
              <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-neutral-300">
                <li>Individual robot builds with direct mentor coaching (1:8 ratio)</li>
                <li>Competition-grade parts used in FTC robotics: REV Robotics + goBilda builds</li>
                <li>Autodesk Fusion 360 CAD (3D design software) + Java (an industry-standard robotics language)</li>
                <li>Full lab access, safety training, and required PPE (protective equipment) included</li>
                <li>Daily testing, improvement cycles, and Demo Day showcase</li>
                <li>Portfolio photos/video + presentation coaching</li>
              </ul>
              <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
                Students typically work on their own laptops so they can keep their CAD environment and development tools configured for continued use after the program.
              </p>
            </div>

            <div className="rounded-2xl border p-6 lg:col-span-3" style={{ borderColor: ink.line, background: "rgba(12,14,18,0.18)" }}>
              <div className="text-neutral-300 text-sm uppercase tracking-[0.2em]">Laptop / Personal Device</div>
              <div className="mt-3 space-y-3 text-sm text-neutral-300 leading-relaxed">
                <p>
                  Students are encouraged to bring their own laptop if possible. Working on a personal machine allows students to keep their CAD environment, files, and development tools set up exactly as they used them during the program.
                </p>
                <p>
                  This approach helps students continue developing their projects and skills after the program ends, rather than leaving their work behind on a shared computer.
                </p>
                <p>
                  If a student does not have access to a suitable laptop, please let us know in the enrollment form and we will work with you to ensure they can fully participate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
