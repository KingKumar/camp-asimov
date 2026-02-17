"use client";

import { motion } from "framer-motion";
import { Check, Shield, Trophy } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import SessionPicker from "@/components/SessionPicker";
import { ink } from "@/components/theme";

export default function HomePage() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-4 pb-20 md:pt-8 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h1
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black leading-tight"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.65)" }}
          >
            LA’s premier mentor-driven robotics & maker camp
          </motion.h1>
          <p
            className="mt-6 text-lg text-neutral-300 max-w-prose"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            Independent schools often can’t give robotics-obsessed students enough time, mentoring, or resources. Camp Asimov fixes that: a focused, mentor-heavy build lab where students learn to lead their own projects, master tools, and level up for LA’s most competitive robotics programs.
          </p>
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
              <SessionPicker compact />
            </div>
          </div>
          <p
            className="mt-4 inline-block max-w-2xl rounded-full border px-4 py-2 text-xs md:text-sm text-neutral-200 backdrop-blur-sm text-center"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)", borderColor: ink.line, background: "rgba(8,10,16,0.45)" }}
          >
            Led by Educator & Technologist{" "}
            <strong className="font-semibold text-white">Ronit Kumar</strong>, Head of Robotics Program at Crossroads School for the Arts and Sciences and founder of Brentwood School&apos;s Robotics Program and Center for Innovation and Leadership.
          </p>
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
                  <div className="mt-1 text-lg md:text-xl font-semibold text-white">Build fast. Lead teams. Ship real robots.</div>
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
                  Expert coaching, small teams, big results.
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs md:text-sm">
                  {[
                    {
                      title: "Fusion 360 CAD & rapid prototyping",
                      sub: "Sketches → parts → assemblies → testable mechanisms.",
                    },
                    {
                      title: "Java FTC SDK + control loops",
                      sub: "Encoders, PID basics, driver control structure.",
                    },
                    {
                      title: "REV + goBilda competitive builds",
                      sub: "Drive trains, intakes, lifts, and wiring standards.",
                    },
                    {
                      title: "3D printing, laser cutting, CNC",
                      sub: "Safe tooling, fixtures, and iteration workflow.",
                    },
                    {
                      title: "Sensor integration & autonomous pathing",
                      sub: "Distance/IMU sensors, autonomous routines.",
                    },
                    {
                      title: "Demo Day + portfolio reel",
                      sub: "Showcase, documentation, and presentation skills.",
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
    </section>
  );
}
