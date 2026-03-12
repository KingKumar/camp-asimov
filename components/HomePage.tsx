"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ink } from "@/components/theme";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function HomePage() {
  const [freezeHeroGif, setFreezeHeroGif] = useState(false);
  const heroDesktopGif = "/videos/Camp%20Asimov.gif";
  const heroDesktopSvg = "/videos/Camp%20Asimov.svg";
  const heroMobileGif = "/videos/Camp%20Asimov%20-%20mobile.gif";
  const heroMobileSvg = "/videos/Camp%20Asimov%20-%20mobile.svg";
  const [showHighlightReel, setShowHighlightReel] = useState(false);

  useEffect(() => {
    const freezeTimer = window.setTimeout(() => {
      setFreezeHeroGif(true);
    }, 4500);

    return () => {
      window.clearTimeout(freezeTimer);
    };
  }, []);

  const facts = [
    ["3 Weeks", "Program length"],
    ["Jun 8–26 • Jul 6–24", "Dates"],
    ["10-15", "Age range"],
    ["16 Students", "Per cohort"],
    ["1:8", "Teacher-to-student"],
    ["Santa Monica", "Location"],
  ];

  const fit = [
    "enjoys building and problem solving",
    "wants stronger CAD, wiring, and programming skills",
    "wants to contribute more to robotics teams",
    "is ready for a serious introduction to robotics engineering",
  ];

  const notFit = [
    "wants a casual summer camp",
    "prefers game-based coding",
    "is not interested in building and troubleshooting robots",
    "is looking for Lego-style robotics activities",
  ];

  const outcomes = [
    {
      title: "CAD portfolio",
      sub: "Fusion 360 design files and documented revisions that show real design decisions.",
    },
    {
      title: "Java programming fundamentals",
      sub: "Robot control logic, sensor integration, and repeatable testing patterns used in team robotics.",
    },
    {
      title: "Competition-grade hardware experience",
      sub: "Structured mechanical assembly, robust wiring practices, and reliable subsystem integration.",
    },
    {
      title: "Custom robot parts and fabrication",
      sub: "Supervised process from CAD concept to 3D-printed and installed robot components.",
    },
    {
      title: "Testing and iteration discipline",
      sub: "Students learn to diagnose failures, improve performance, and retest with purpose.",
    },
    {
      title: "Final demonstration and presentation",
      sub: "Students present their build choices, testing results, and technical progress clearly.",
    },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-5 pb-10 md:pt-7 md:pb-12 text-center">
        <h1 className="sr-only">3-Week Robotics Engineering Program</h1>
        <motion.div
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="mx-auto w-[96%] md:w-[90%] max-w-[1500px] overflow-hidden"
        >
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={freezeHeroGif ? heroMobileSvg : heroMobileGif}
            />
            <img
              src={freezeHeroGif ? heroDesktopSvg : heroDesktopGif}
              alt="Camp Asimov animated logo and program title"
              className="w-full h-auto"
              style={{ filter: "saturate(1.05) contrast(1.04)" }}
            />
          </picture>
        </motion.div>

        <p
          className="mt-4 text-lg text-neutral-300 max-w-3xl mx-auto"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
        >
          Students design, build, and program their own robot using industry-standard engineering tools in a small-cohort summer program.
        </p>

        <p className="mt-3 text-sm md:text-base text-neutral-300">
          Two summer sessions • 16 students per cohort • Santa Monica
        </p>

        <div className="mt-7 flex flex-col items-center gap-3">
          <Button asChild className="px-6 py-3 text-base w-full max-w-md" style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}>
            <Link href="/apply">Request an Invite</Link>
          </Button>
          <Button
            asChild
            className="px-6 py-3 text-base border w-full max-w-md"
            style={{ backgroundColor: "transparent", color: ink.accent, borderColor: ink.accent, textShadow: "none" }}
          >
            <Link href="/program">View Curriculum Overview</Link>
          </Button>
        </div>

        <div className="mt-8 rounded-2xl border p-3 md:p-4" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.24)" }}>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {facts.map(([value, label]) => (
              <div
                key={value}
                className="rounded-lg border px-3 py-3 text-center"
                style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(12,14,18,0.18)" }}
              >
                <div className="text-sm md:text-base font-semibold text-white">{value}</div>
                <div className="mt-1 text-[11px] md:text-xs text-neutral-400 uppercase tracking-[0.08em]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="mx-auto max-w-7xl px-6 pb-8"
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="rounded-2xl border p-6 md:p-8" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.24)" }}>
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 md:gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">What Students Actually Build</h2>
              <p className="mt-3 text-neutral-200 leading-relaxed max-w-3xl">
                Students design, build, and program their own robot while learning CAD (3D design software), electronics, wiring, and how the robot&apos;s moving parts and code work together - including designing and 3D printing custom robot parts.
              </p>
              <p className="mt-3 text-sm md:text-base text-neutral-300 max-w-3xl">
                Students of all experience levels are welcome. On day one, students are assessed and instruction is adjusted so beginners are supported and experienced students are challenged.
              </p>
            </div>
            <div className="rounded-xl border p-5 md:p-6 flex items-center justify-center min-h-[220px]" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.2)" }}>
              <Button
                size="lg"
                type="button"
                onClick={() => setShowHighlightReel(true)}
                className="w-full md:w-auto px-6 py-5 text-base border"
                style={{ backgroundColor: "transparent", color: ink.accent, borderColor: ink.accent, textShadow: "none" }}
              >
                View Highlight Reel
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {showHighlightReel && (
        <div
          className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Highlight Reel"
          onClick={() => setShowHighlightReel(false)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="absolute -top-10 right-0 rounded-full border px-3 py-1 text-sm text-white/90 transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              style={{ borderColor: ink.line, background: "rgba(10,11,16,0.8)" }}
              onClick={() => setShowHighlightReel(false)}
              aria-label="Close highlight reel"
            >
              Close
            </button>
            <div className="aspect-video overflow-hidden rounded-2xl border" style={{ borderColor: ink.line }}>
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              >
                <source src="/videos/homepage.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}

      <motion.div
        className="mx-auto max-w-7xl px-6 pb-8"
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="rounded-2xl border p-6 md:p-8" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.24)" }}>
          <h2 className="text-2xl md:text-3xl font-bold">Is This Program Right for Your Student?</h2>
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border px-4 py-4 text-sm md:text-base" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.2)" }}>
              <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">A Great Fit If Your Student...</div>
              <ul className="mt-3 space-y-2 text-neutral-200">
                {fit.map((line) => (
                  <li key={line}>- {line}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border px-4 py-4 text-sm md:text-base" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.2)" }}>
              <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">Probably Not the Right Fit If Your Student...</div>
              <ul className="mt-3 space-y-2 text-neutral-200">
                {notFit.map((line) => (
                  <li key={line}>- {line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mx-auto max-w-7xl px-6 pb-8"
        initial={{ x: 30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="rounded-2xl border p-6 md:p-8" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.24)" }}>
          <h2 className="text-2xl md:text-3xl font-bold">What Students Leave With</h2>
          <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {outcomes.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-2 rounded-xl border px-4 py-3"
                style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(10,12,16,0.2)" }}
              >
                <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ink.accent }} aria-hidden />
                <div className="text-neutral-200">
                  <div className="font-medium">{item.title}</div>
                  <div className="mt-1 text-sm text-neutral-400">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mx-auto max-w-7xl px-6 pb-8"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid grid-cols-1 min-[901px]:grid-cols-[1.35fr_0.65fr] gap-6 min-[901px]:gap-8 items-stretch">
          <div className="rounded-2xl border p-6 md:p-7 h-full flex flex-col justify-center" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.24)" }}>
            <h2 className="text-3xl md:text-4xl font-bold">Meet the Instructor</h2>
            <div className="mt-4 space-y-3 text-neutral-200 leading-relaxed text-[1rem] md:text-[1.08rem] max-w-4xl">
              <p>
                Ronit Kumar is an educator, technologist, and veteran robotics mentor who founded Brentwood School&apos;s robotics program and now coaches competitive robotics teams at Crossroads School for Arts &amp; Sciences.
              </p>
              <p>
                Ronit holds an engineering degree and has spent more than a decade mentoring students in mechanical design, CAD, wiring, programming, and competitive robotics.
              </p>
              <p>
                Camp Asimov is intentionally designed so each student takes real responsibility for designing, building, programming, and troubleshooting their own robot.
              </p>
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
      </motion.div>

      <div id="testimonials" className="mx-auto max-w-7xl px-0 pb-8">
        <TestimonialsSection />
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-2xl border p-6 md:p-7 text-center" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.24)" }}>
          <h2 className="text-2xl md:text-3xl font-bold">Join Us</h2>
          <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
            Apply for a small robotics engineering program where every student designs, builds, and programs their own robot.
          </p>
          <Button asChild className="mt-5 w-full max-w-xl h-14 text-xl" style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}>
            <Link href="/apply">Request an Invite</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
