"use client";

import { motion } from "framer-motion";
import { Cpu, Trophy, Wrench } from "lucide-react";

import SessionPicker from "@/components/SessionPicker";
import { ink } from "@/components/theme";

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
            3-Week Robotics Intensive
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-neutral-300 text-center max-w-4xl mx-auto"
          >
            A single, immersive program that moves students from core engineering principles to tested, competition-ready mechanisms. Each week blends hands-on building, structured coaching, and iteration, no kits, no busywork, just real robotics.
          </motion.p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <motion.article
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6 border shadow-lg relative overflow-hidden"
              style={{ background: ink.surface, borderColor: ink.line }}
            >
              <div
                className="absolute -inset-1 rounded-2xl pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(143,215,255,0.16), transparent 60%)" }}
              />
              <div className="relative">
                <h3 className="text-xl font-semibold">
                  Week 1: Design, Fabrication & Rapid Prototyping
                </h3>
                <p className="mt-2 text-neutral-300">
                  Students learn safe fabrication and bring mechanisms from concept → CAD → prototype → hardware.
                </p>
                <div className="mt-4 grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-medium text-neutral-200">Focus Areas</div>
                    <ul className="mt-2 list-disc list-inside text-neutral-300 space-y-1">
                      <li>3D design with <strong>Autodesk Fusion 360</strong></li>
                      <li>Drivetrains, intakes, linkages (REV + goBilda)</li>
                      <li>Design-driven development & feedback loops</li>
                      <li>Safe lab operation & tool certification</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-200">Outcomes</div>
                    <ul className="mt-2 list-disc list-inside text-neutral-300 space-y-1">
                      <li>Early prototypes completed</li>
                      <li>Fusion files & sketches saved</li>
                      <li>Understanding mechanical trade-offs</li>
                      <li>Confident, safe shop habits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>

            <motion.article
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6 border shadow-lg relative overflow-hidden"
              style={{ background: ink.surface, borderColor: ink.line }}
            >
              <div
                className="absolute -inset-1 rounded-2xl pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(143,215,255,0.16), transparent 60%)" }}
              />
              <div className="relative">
                <h3 className="text-xl font-semibold">
                  Week 2: Code, Control Systems & Sensor Integration
                </h3>
                <p className="mt-2 text-neutral-300">
                  Students bring mechanisms to life with structured programming and integrated sensing.
                </p>
                <div className="mt-4 grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-medium text-neutral-200">Focus Areas</div>
                    <ul className="mt-2 list-disc list-inside text-neutral-300 space-y-1">
                      <li><strong>Java</strong> with REV Control Hub</li>
                      <li>Encoders, positional control, driver controls</li>
                      <li>Sensor integration (distance/vision)</li>
                      <li>Intro to autonomous routines & path planning</li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-neutral-200">Outcomes</div>
                    <ul className="mt-2 list-disc list-inside text-neutral-300 space-y-1">
                      <li>Operable robot subsystems</li>
                      <li>Functional OpModes</li>
                      <li>Sensing + feedback control working on-bot</li>
                      <li>First mini-autonomous routines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>

            <motion.article
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6 border shadow-lg md:col-span-2 relative overflow-hidden"
              style={{ background: ink.surface, borderColor: ink.line }}
            >
              <div
                className="absolute -inset-1 rounded-2xl pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(143,215,255,0.14), transparent 60%)" }}
              />
              <div className="relative">
                <h3 className="text-xl font-semibold">Week 3: Test, Iterate, Compete</h3>
                <p className="mt-2 text-neutral-300">
                  Students stress-test, analyze failures, and iterate under pressure, ending with our
                  <strong> Family Scrimmage Showcase</strong>.
                </p>
                <div className="mt-4 grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-medium text-neutral-200">Focus Areas</div>
                    <ul className="mt-2 list-disc list-inside text-neutral-300 space-y-1">
                      <li>Reliability testing & failure analysis</li>
                      <li>Iteration journals & subsystem ownership</li>
                      <li>Strategy refinement & driver practice</li>
                      <li>Presentation & storytelling</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-200">Outcomes</div>
                    <ul className="mt-2 list-disc list-inside text-neutral-300 space-y-1">
                      <li>Reliable competition systems</li>
                      <li>Clear documentation of changes</li>
                      <li>Real scrimmage match experience</li>
                      <li>Polished final presentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl p-5 border text-sm"
            style={{ background: ink.panel, borderColor: ink.line }}
          >
            <div className="font-semibold text-neutral-100">Daily Rhythm</div>
            <ul className="mt-2 list-disc list-inside text-neutral-300 space-y-1">
              <li>Morning briefing & safety checks</li>
              <li>Build blocks (mechanical / coding / testing)</li>
              <li>Coach check-ins & feedback loops</li>
              <li>End-of-day demos & iteration planning</li>
            </ul>
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
              Students are placed where they’ll be challenged. Movement between levels is encouraged as abilities grow.
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
                    Advanced build strategy, autonomous systems, data-driven iteration, subsystem leadership, & mentoring peers.
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
                    CAD → Build → Wiring → Code → Sensing → Testing. Students own subsystems and contribute to strategic development.
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
                    Tool safety, CAD basics, programming fundamentals, mechanical principles, fast prototyping, & growth mindset.
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
            <div className="text-sm text-neutral-300">3‑week intensive • Mon–Fri 9:00–3:30</div>
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
                  <div className="mt-2 text-neutral-300 text-sm">3-week intensive • $3,600 total</div>
                </div>
                <div className="w-full max-w-md">
                  <SessionPicker compact />
                </div>
              </div>
              <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm text-neutral-300">
                <div className="rounded-xl border px-4 py-3" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.12)" }}>
                  <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">Dates</div>
                  <div className="mt-1 font-semibold text-white">June 8–26 • July 6–24</div>
                </div>
                <div className="rounded-xl border px-4 py-3" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.12)" }}>
                  <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">Location</div>
                  <div className="mt-1 font-semibold text-white">Los Angeles (exact site TBD)</div>
                </div>
              </div>
              <div className="mt-4 text-xs md:text-sm text-neutral-300">
                Refund policy available here:{" "}
                <a className="underline" href="/refunds.html" style={{ color: ink.accent }}>
                  View refund policy
                </a>
              </div>
            </div>

            <div className="rounded-2xl border p-6" style={{ borderColor: ink.line, background: "rgba(12,14,18,0.18)" }}>
              <div className="text-neutral-300 text-sm uppercase tracking-[0.2em]">Ages</div>
              <div className="mt-2 text-2xl font-semibold">10–17</div>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                <li>Grouped by age/experience</li>
                <li>1:8 <strong>Teacher : Student</strong> ratio</li>
                <li>Mentor-heavy, small teams</li>
              </ul>
            </div>

            <div className="rounded-2xl border p-6 lg:col-span-3" style={{ borderColor: ink.line, background: "rgba(12,14,18,0.18)" }}>
              <div className="text-neutral-300 text-sm uppercase tracking-[0.2em]">What’s included</div>
              <div className="mt-2 text-sm text-neutral-300">
                A premium, all inclusive program built for real skill growth with no hidden fees.
              </div>
              <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-neutral-300">
                <li>Expert coaching in small teams (1:8 ratio)</li>
                <li>FTC‑grade parts: REV Robotics + goBilda builds</li>
                <li>Autodesk Fusion 360 CAD + Java programming</li>
                <li>Full lab access, safety training, PPE included</li>
                <li>Daily testing, iteration, and Demo Day showcase</li>
                <li>Portfolio photos/video + presentation coaching</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
