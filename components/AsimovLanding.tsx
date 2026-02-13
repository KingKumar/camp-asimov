"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Check, Shield, Cpu, Sparkles, Wrench,
  Trophy, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SessionPicker from "@/components/SessionPicker";

// ------------------------------------
// Config / constants
// ------------------------------------
const CONTACT_EMAIL = "info@campasimov.com";

const ink = {
  bg: "#0A0B10",
  surface: "#101219",
  panel: "#0f1321",
  accent: "#8FD7FF",
  accent2: "#8FD7FF",
  line: "rgba(255,255,255,0.08)",
};


const faqs = [
  {
    q: "Where is it and what are the hours?",
    a: "Camp runs Mon–Fri, 9:00–3:30 at our Los Angeles location (final site announced after enrollment). Early drop 8:30 and late pickup until 4:00 are available.",
  },
  {
    q: "What experience is required?",
    a: "No prior robotics required. We group by age and experience and start with tool/coding foundations before advancing to competitive build work.",
  },
  {
    q: "What do students bring and wear?",
    a: "Closed-toe shoes, hair tied back, no dangling jewelry, a labeled water bottle, and lunch. We supply all tools, materials, and safety gear.",
  },
  {
    q: "How do you handle allergies and medications?",
    a: "Tell us on the registration form. Students may carry epi-pens/inhalers; staff are briefed and we maintain a posted response plan. We discourage food sharing.",
  },
  {
    q: "What is your teacher : student ratio?",
    a: "We target a 1:8 Teacher : Student ratio, with additional mentors during machine time.",
  },
];

// ======================================
// ✅ FIXED VIDEO COMPONENT
// ======================================
function AutoPlayVideo(props: {
  src: string;
  poster?: string;
  caption?: string;
  className?: string;
  /** optionally force a ratio: "16/9" | "4/3" | "1/1" | "9/16" */
  ratio?: "16/9" | "4/3" | "1/1" | "9/16";
}) {
  const { src, poster, caption, className = "", ratio } = props;
  const ref = useRef<HTMLVideoElement | null>(null);
  const [needsTap, setNeedsTap] = useState(false);
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);

  // Autoplay/observe
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.playsInline = true;

    const tryPlay = async () => {
      try { await el.play(); setNeedsTap(false); }
      catch { setNeedsTap(true); }
    };

    const io = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting) tryPlay(); else el.pause();
    }, { threshold: 0.25 });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMeta = () => {
    const el = ref.current;
    if (!el) return;
    // Determine natural orientation
    const { videoWidth: w, videoHeight: h } = el;
    if (w && h) setIsPortrait(h > w);
    // also attempt a play once metadata is ready
    el.play().catch(() => setNeedsTap(true));
  };

  const onTapPlay = async () => {
    const el = ref.current;
    if (!el) return;
    try { await el.play(); setNeedsTap(false); }
    catch { el.controls = true; }
  };

  // Decide wrapper ratio class
  const ratioClass = (() => {
    if (ratio === "9/16") return "aspect-[9/16]";
    if (ratio === "4/3")  return "aspect-[4/3]";
    if (ratio === "1/1")  return "aspect-square";
    if (ratio === "16/9") return "aspect-video";
    // auto mode:
    if (isPortrait === null) return "aspect-video"; // default before we know
    return isPortrait ? "aspect-[9/16]" : "aspect-video";
  })();
  const ratioValue = (() => {
    if (ratio === "9/16") return "9 / 16";
    if (ratio === "4/3") return "4 / 3";
    if (ratio === "1/1") return "1 / 1";
    if (ratio === "16/9") return "16 / 9";
    if (isPortrait === null) return "16 / 9";
    return isPortrait ? "9 / 16" : "16 / 9";
  })();

  return (
    <figure
      className={`relative rounded-2xl overflow-hidden border ${className}`}
      style={{ borderColor: ink.line, background: "black" }}
    >
      <div className={`relative w-full ${ratioClass}`} style={{ aspectRatio: ratioValue }}>
        <video
          ref={ref}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          poster={poster}
          onLoadedMetadata={onMeta}
          className="absolute inset-0 w-full h-full object-cover"
          disablePictureInPicture
          controls={false}
        >
          <source src={src} type="video/mp4" />
        </video>

        {needsTap && (
          <button
            type="button"
            onClick={onTapPlay}
            className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-sm transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            aria-label="Play video"
          >
            <div className="rounded-full border px-5 py-2 text-sm text-white/90">
              Tap to play
            </div>
          </button>
        )}
      </div>

      {caption ? (
        <figcaption className="absolute bottom-2 left-3 right-3 text-xs md:text-[13px] text-neutral-200 bg-black/35 backdrop-blur-sm px-2 py-1 rounded-md">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}




// ======================================
// PAGE
// ======================================
export default function AsimovCampLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showReel, setShowReel] = useState(false);

 const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
        ([entry]) => {
        // scrolled = header should shrink
        setScrolled(!entry.isIntersecting);
        },
        {
        rootMargin: "-1px 0px 0px 0px",
        threshold: 0,
        }
    );

    io.observe(el);
    return () => io.disconnect();
    }, []);


  /** prevent background scroll when mobile menu opens */
  useEffect(() => {
    document.body.style.overflow = mobileOpen || showReel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, showReel]);

  return (
    <div className="min-h-screen w-full text-white relative overflow-hidden">
      {/* Full-page video background */}
      <div className="fixed inset-0 -z-10">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src="/videos/homepage.mp4" type="video/mp4" />
        </video>
        {/* Readability overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, rgba(7,9,12,0.55), rgba(5,7,10,0.86))
            `,
          }}
        />
      </div>

      <div className="pointer-events-none fixed inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />
      <div ref={sentinelRef} aria-hidden className="h-0 w-px" />
      {/* Floating highlight reel toggle */}
      <button
        type="button"
        onClick={() => setShowReel((v) => !v)}
        className="fixed bottom-24 md:bottom-10 right-6 z-[70] group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide
                   border shadow-[0_12px_24px_rgba(48,220,170,0.30),0_0_0_1px_rgba(0,0,0,0.35)]
                   transition-transform hover:-translate-y-0.5 hover:rotate-[-1deg] hover:scale-[1.02] active:scale-[0.98]
                   lg:right-10"
        aria-label={showReel ? "Hide Highlight Reel" : "View Highlight Reel"}
        style={{ textShadow: "none", backgroundColor: ink.accent, color: "#071410", borderColor: "rgba(255,255,255,0.45)" }}
      >
        <Sparkles className="h-4 w-4" />
        {showReel ? "Hide Highlight Reel" : "View Highlight Reel"}
      </button>

      {/* Highlight reel overlay */}
      {showReel && (
        <div
          className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Highlight Reel"
          onClick={() => setShowReel(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-10 right-0 rounded-full border px-3 py-1 text-sm text-white/90 transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              style={{ borderColor: ink.line, background: "rgba(10,11,16,0.8)" }}
              onClick={() => setShowReel(false)}
              aria-label="Close highlight reel"
            >
              <span className="inline-flex items-center gap-2">
                <X className="h-4 w-4" /> Close
              </span>
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
      {/* =======================================
          ✅ NAV
      ======================================= */}
      {/* ================= NAV ================= */}
<header
  className={`
    sticky top-0 z-50 border-b w-full
    transition-all duration-300
    ${scrolled
      ? "py-2 backdrop-blur-md bg-[rgba(10,11,16,0.8)]"
      : "py-4 md:py-5 backdrop-blur-lg bg-[rgba(10,11,16,0.65)]"
    }
  `}
  style={{ borderColor: ink.line }}
>
  <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16 flex items-center justify-between">
    
    {/* LEFT: LOGO */}
    <div className="flex items-center gap-3 shrink-0">
      <img
        src="/favicon.ico"
        alt="Camp Asimov"
        className={`h-6 w-6 transition-all duration-300 ${
          scrolled ? "scale-90" : "scale-100"
        }`}
      />
      <span
        className={`font-semibold tracking-wide transition-all duration-300 ${
          scrolled ? "text-sm md:text-base" : "text-base md:text-lg"
        }`}
      >
        CAMP ASIMOV
      </span>
    </div>

    {/* RIGHT: DESKTOP NAV */}
    <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300 ml-auto">
      <a href="#program" className="hover:text-white">Program Details</a>
      <a href="#why" className="hover:text-white">Why Us</a>
      <a href="#safety" className="hover:text-white">Safety</a>
      <a href="#faq" className="hover:text-white">FAQ</a>
      <a href="#contact" className="hover:text-white">Contact</a>

      <Button
        asChild
        className="ml-2 border"
        style={{ backgroundColor: "transparent", color: ink.accent, borderColor: ink.accent, textShadow: "none" }}
      >
        <a href="/staff" aria-label="Open Staff Portal">Staff Portal</a>
      </Button>
      <Button asChild className="ml-2" style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}>
        <a href="#pricing">Register</a>
      </Button>
    </nav>

    {/* MOBILE: HAMBURGER */}
    <button
      type="button"
      className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
      style={{ borderColor: ink.line, background: "rgba(12,14,20,0.5)" }}
      aria-label={mobileOpen ? "Close menu" : "Open menu"}
      aria-controls="mobile-menu"
      aria-expanded={mobileOpen}
      onClick={() => setMobileOpen(v => !v)}
    >
      {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  </div>

  {/* MOBILE DROPDOWN */}
  <div
    id="mobile-menu"
    className={`
      md:hidden overflow-hidden transition-[max-height,opacity]
      duration-300
      ${mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"}
    `}
  >
    <div
      className="px-4 sm:px-6 pb-4 pt-2 space-y-2 border-t"
      style={{ borderColor: ink.line, background: "rgba(10,11,16,0.9)" }}
    >
      <a href="#program" className="block px-3 py-2 rounded-lg hover:bg-white/5" onClick={() => setMobileOpen(false)}>Program Details</a>
      <a href="#why"     className="block px-3 py-2 rounded-lg hover:bg-white/5" onClick={() => setMobileOpen(false)}>Why Us</a>
      <a href="#safety"  className="block px-3 py-2 rounded-lg hover:bg-white/5" onClick={() => setMobileOpen(false)}>Safety</a>
      <a href="#faq"     className="block px-3 py-2 rounded-lg hover:bg-white/5" onClick={() => setMobileOpen(false)}>FAQ</a>
      <a href="#contact" className="block px-3 py-2 rounded-lg hover:bg-white/5" onClick={() => setMobileOpen(false)}>Contact</a>

      <div className="flex gap-2 pt-2">
        <Button
          asChild
          className="flex-1 border"
          style={{ backgroundColor: "transparent", color: ink.accent, borderColor: ink.accent, textShadow: "none" }}
        >
          <a href="/staff" onClick={() => setMobileOpen(false)}>Staff Portal</a>
        </Button>
        <Button asChild className="flex-1" style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}>
          <a href="#pricing" onClick={() => setMobileOpen(false)}>Register</a>
        </Button>
      </div>
    </div>
  </div>
</header>



      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pt-8 pb-20 md:pt-16 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
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
                <a href="#program">Curriculum Overview</a>
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

          {/* hero stats + highlights */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-white/6 to-transparent" />
              <div
                className="relative rounded-2xl border p-6 md:p-8"
                style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(10,12,16,0.18)" }}
              >
                {/* Header */}
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

                {/* Stats strip */}
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

                {/* Capabilities */}
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

     {/* PROGRAM DETAILS */}
<section
  className="py-20 border-t scroll-mt-28 md:scroll-mt-32"
  style={{ borderColor: ink.line }}
>
  <div className="mx-auto max-w-7xl px-6 text-white">

    <motion.h2
      id="program"
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
      A single, immersive program that moves students from core engineering
      principles to tested, competition-ready mechanisms. Each week blends
      hands-on building, structured coaching, and iteration, no kits, no
      busywork, just real robotics.
    </motion.p>

    {/* Week-by-Week breakdown */}
    <div className="mt-10 grid md:grid-cols-2 gap-6">

      {/* WEEK 1 */}
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
            Students learn safe fabrication and bring mechanisms from concept → CAD →
            prototype → hardware.
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

      {/* WEEK 2 */}
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

      {/* WEEK 3 */}
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

    {/* Daily Rhythm */}
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

    {/* Divider */}
    <div className="mt-12 h-px w-full" style={{ background: ink.line }} />

    {/* SKILL PROGRESSION */}
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
        Students are placed where they’ll be challenged. Movement between levels
        is encouraged as abilities grow.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4">

        {/* LEVEL 3 */}
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
              Advanced build strategy, autonomous systems, data-driven iteration,
              subsystem leadership, & mentoring peers.
            </p>
          </div>
        </motion.div>

        {/* LEVEL 2 */}
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
              CAD → Build → Wiring → Code → Sensing → Testing.
              Students own subsystems and contribute to strategic development.
            </p>
          </div>
        </motion.div>

        {/* LEVEL 1 */}
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
              Tool safety, CAD basics, programming fundamentals, mechanical
              principles, fast prototyping, & growth mindset.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 text-center text-sm">
        <em className="inline-block rounded-full border px-4 py-2 text-neutral-200 backdrop-blur-sm"
            style={{ borderColor: ink.line, background: "rgba(8,10,16,0.55)" }}>
          Age groupings are for social fit,
          <strong> skills determine challenge level.</strong>
        </em>
      </div>
    </motion.div>
  </div>
</section>


     

      {/* TUITION & DATES */}
      <section id="pricing" className="py-20 border-t" style={{ borderColor: ink.line }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Tuition & Dates</h2>
            <div className="text-sm text-neutral-300">3‑week intensive • Mon–Fri 9:00–3:30</div>
          </div>

          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            {/* Primary card */}
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
            </div>

            {/* Supporting cards */}
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

    
{/* WHY US */}
<section className="py-20 border-t scroll-mt-20" style={{ borderColor: ink.line }}>
  <div className="mx-auto max-w-7xl px-6 text-center">
    {/* Heading + intro */}
    <h2 className="text-2xl md:text-3xl font-bold">Built around student growth</h2>
    <p id="why" className="mt-3 text-neutral-200 max-w-3xl mx-auto">
      Camp Asimov is a mentor-driven build lab where students own real subsystems,
      make decisions, and see the impact of their choices on a working robot.
      We focus on <strong>confidence</strong>, <strong>craft</strong>, and <strong>leadership</strong>:
      students ship working mechanisms, document their process, and present like pros.
    </p>

    {/* Feature cards */}
    <div className="mt-6 grid sm:grid-cols-2 gap-4">
      {[
        { title: "Authentic builds",
          text: "Drive bases, intakes, linkages, wiring, sensors. Students take subsystems from sketch → CAD → fab → test." },
        { title: "Mentored mastery",
          text: "Tight feedback loops with coach check-ins, pairing, and tool certifications to build safely and fast." },
        { title: "Competitive readiness",
          text: "Code control loops, integrate sensors, and stress-test under time pressure. Skills that transfer to FTC/US school teams." },
        { title: "Portfolio & storytelling",
          text: "Iteration journals, photos/video, and a Demo Day reel students can share with teams and programs." },
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

    {/* Coach blurb */}
    <div className="mt-8 rounded-2xl border p-6" style={{ borderColor: ink.line, background: ink.panel }}>
      <div className="text-base md:text-lg text-neutral-200 leading-relaxed text-center">
        Led by <strong>Ronit Kumar</strong>, a beloved robotics coach who has spent more than a decade teaching in Los Angeles’s
        independent school system and over fifteen years immersed in competitive robotics as a student, mentor, and program head.
        Ronit has guided hundreds of students through design challenges and competition seasons, always with the same belief:
        <em> kids are incredibly capable and come up with the most creative solutions when trusted and supported.</em>{" "}
        <span className="block mt-2">
          Camp Asimov exists to give them the skills and environment to build confidence in their ideas. It turns imagination into
          working machines and helps them see themselves as engineers.
        </span>
      </div>
    </div>

    {/* 4-up video reel UNDER the info */}
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <AutoPlayVideo src="/videos/blockdelivery.mp4"  poster="/videos/posters/drive.jpg" caption="Driver practice & tuning" ratio="9/16" />
      <AutoPlayVideo src="/videos/conedelivery.mp4"   poster="/videos/posters/intake.jpg" caption="Cycle testing" ratio="9/16" />
      <AutoPlayVideo src="/videos/autonomous.mp4"     poster="/videos/posters/auton.jpg"  caption="Autonomous pathing & sensors" ratio="9/16" />
      <AutoPlayVideo src="/videos/lift.mp4"           poster="/videos/posters/scrim.jpg"  caption="Mechanical lift stress-testing" ratio="9/16" />
    </div>
  </div>
</section>



      {/* SAFETY */}
      <section className="py-20 border-t" style={{ borderColor: ink.line }}>
        <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 id="safety" className="text-2xl md:text-3xl font-bold">Safety Protocols</h2>

            <div
              className="mt-4 rounded-2xl border p-5 md:p-6"
              style={{ borderColor: ink.line, background: "rgba(8,10,16,0.6)" }}
            >
              <p className="text-neutral-200 leading-relaxed text-center">
                We operate a youth-safety program that meets California requirements for youth-serving organizations.
                All staff and regular volunteers complete <strong>DOJ Live Scan background checks</strong> and
                <strong> mandated reporter training</strong>. Students progress through <strong>tool certifications</strong>,
                wear <strong>PPE</strong>, and work in <strong>staff-supervised zones</strong> with machine-specific SOPs
                (laser cutter, 3D printers, soldering, CNC). We train lithium-ion battery handling for robotics power systems and
                maintain on-site emergency supplies.
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

            {/* Compliance line + optional Safety Plan PDF link */}
            <div
              className="mt-4 text-xs md:text-sm text-neutral-200 rounded-2xl border px-4 py-3 backdrop-blur-sm max-w-3xl mx-auto leading-relaxed"
              style={{ borderColor: ink.line, background: "rgba(8,10,16,0.55)" }}
            >
              California compliance: staff/regular volunteers complete <strong>Live Scan</strong> background checks and
              <strong> mandated reporter training</strong>; written child-safety policies maintained per AB 506.
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

        {/* FAQ */}
        <section className="py-20 border-t" style={{ borderColor: ink.line }}>
        <div className="mx-auto max-w-5xl px-6">
            <h2 id="faq" className="text-2xl md:text-3xl font-bold">FAQ</h2>
            <div className="mt-8 grid gap-6">
            {faqs.map((f) => (
                <div
                key={f.q}
                className="rounded-2xl border p-6"
                style={{ borderColor: ink.line, background: ink.surface }}
                >
                <div className="font-semibold text-neutral-100">{f.q}</div>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{f.a}</p>
                </div>
            ))}
            </div>
        </div>
        </section>


      {/* CONTACT */}
      <section id="contact" className="py-20 border-t" style={{ borderColor: ink.line }}>
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-8">
          <div
            className="rounded-2xl border p-6 md:p-7"
            style={{ borderColor: ink.line, background: "rgba(8,10,16,0.6)" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Contact us to learn more about LA&apos;s #1 robotics summer camp.
            </h2>
            <h3 className="text-xl font-semibold text-white">Questions? Talk to a human.</h3>
            <p className="mt-2 text-neutral-200">
              We’re builders first. If you want specifics on tools, safety, or curriculum fit, ask away.
            </p>
            <div className="mt-4 text-sm text-neutral-200 space-y-1">
              <div><span className="font-semibold text-white">Academic Director:</span> Ronit Kumar</div>
              <div>Bringing experience as Robotics Program Head at Brentwood School and Crossroads School for the Arts and Sciences.</div>
              <div>Los Angeles, CA</div>
              <div>
                Email: <a href={`mailto:${CONTACT_EMAIL}`} className="underline" style={{ color: ink.accent }}>{CONTACT_EMAIL}</a>
              </div>
            </div>
          </div>

          {/* Formspree form (replace YOUR_FORM_ID) */}
          <form
            action="https://formspree.io/f/mqaygyjp"
            method="POST"
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700"
              rows={4}
            />
            <Button
              type="submit"
              className="px-6 py-3 rounded-xl font-semibold"
              style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}
            >
              Send
            </Button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8 text-center text-xs text-neutral-500" style={{ borderColor: ink.line }}>
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>© {new Date().getFullYear()} Camp Asimov. All rights reserved.</div>
          <div className="flex gap-4">
            <a className="hover:text-neutral-300" href="/privacy.html">Privacy</a>
            <a className="hover:text-neutral-300" href="/refunds.html">Refunds</a>
            <a className="hover:text-neutral-300" href="/staff">Staff Login</a>
          </div>
        </div>
        
      </footer>
    </div>
  );
}
