"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Check, Shield, Rocket, Cpu, Sparkles, Video, Wrench,
  CalendarDays, ChevronRight, Trophy, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SessionPicker from "@/components/SessionPicker";

// ------------------------------------
// Config / constants
// ------------------------------------
const STRIPE_LINK = "https://buy.stripe.com/9B6cN5a4schn5OS2RK0sU00";
const CONTACT_EMAIL = "info@campasimov.com";

const ink = {
  bg: "#0A0B10",
  surface: "#101219",
  panel: "#0f1321",
  accent: "#5DE4C7",
  accent2: "#7AA2F7",
  line: "rgba(255,255,255,0.08)",
};

const features = [
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "All-Maker • All-Robotics",
    text: "Mechanical design, CAD, control systems, sensors, and competition-ready builds.",
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: "Fabrication Lab",
    text: "3D printing, laser cutting, prototyping rigs, safe soldering, and tool certification.",
  },
  {
    icon: <Video className="w-5 h-5" />,
    title: "Cinematic Showcase",
    text: "Demo Day with story, aesthetics, and presentation.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Safety First",
    text: "Safety-first engineering practices: tool training, PPE, and supervised builds.",
  },
];

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
function AutoPlayVideo({
  src,
  poster,
  caption,
  aspect = "16/9", // pass "9/16" for vertical clips
}: {
  src: string;
  poster?: string;
  caption?: string;
  aspect?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure
      className={`relative overflow-hidden rounded-2xl border bg-black aspect-[${aspect}]`}
      style={{ borderColor: ink.line }}
    >
      <video
        ref={ref}
        src={src}
        playsInline
        muted
        loop
        preload="metadata"
        poster={poster}
        className="absolute inset-0 w-full h-full object-contain"
        disablePictureInPicture
        controls={false}
      />
      {caption && (
        <figcaption className="absolute bottom-2 left-3 right-3 text-xs text-neutral-300 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ======================================
// PAGE
// ======================================
export default function AsimovCampLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /** shrink header on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** prevent background scroll when mobile menu opens */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div
      className="min-h-screen w-full text-white"
      style={{
        background: `
          radial-gradient(1200px 600px at 10% -10%, rgba(122,162,247,.18), transparent 60%),
          radial-gradient(800px 400px at 90% 10%, rgba(93,228,199,.12), transparent 60%),
          linear-gradient(180deg, ${ink.bg}, #07080e)
        `,
      }}
    >
      <div className="pointer-events-none fixed inset-0 [background-image:radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

      {/* =======================================
          ✅ NAV
      ======================================= */}
      <header
        className={`sticky top-0 z-50 border-b w-full transition-all duration-300 ${
          scrolled
            ? "py-2 backdrop-blur-md bg-[rgba(10,11,16,0.8)]"
            : "py-4 md:py-5 backdrop-blur-lg bg-[rgba(10,11,16,0.65)]"
        }`}
        style={{ borderColor: ink.line }}
      >
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Rocket
              className={`h-6 w-6 transition-all duration-300 ${
                scrolled ? "scale-90" : "scale-100"
              }`}
              style={{ color: ink.accent }}
            />
            <span
              className={`font-semibold tracking-wide transition-all duration-300 ${
                scrolled ? "text-sm md:text-base" : "text-base md:text-lg"
              }`}
            >
              CAMP ASIMOV
            </span>
          </div>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300 ml-auto">
            <a href="#program" className="hover:text-white">Program Details</a>
            <a href="#why" className="hover:text-white">Why Us</a>
            <a href="#safety" className="hover:text-white">Safety</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <Button asChild className="ml-2" style={{ backgroundColor: "#7AA2F7", color: "#081b17" }}>
              <a href="/staff">Staff Portal</a>
            </Button>
            <Button asChild className="ml-2" style={{ backgroundColor: ink.accent, color: "#081b17" }}>
              <a href="#pricing">Register</a>
            </Button>
          </nav>

          {/* mobile menu toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border"
            style={{ borderColor: ink.line, background: "rgba(12,14,20,0.5)" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((s) => !s)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* mobile nav panel */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className="px-4 sm:px-6 pb-4 pt-2 space-y-2 border-t"
            style={{ borderColor: ink.line, background: "rgba(10,11,16,0.9)" }}
          >
            {[
              ["Program Details", "#program"],
              ["Why Us", "#why"],
              ["Safety", "#safety"],
              ["FAQ", "#faq"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="block px-3 py-2 rounded-lg hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            ))}

            <div className="flex gap-2 pt-2">
              <Button asChild className="flex-1" style={{ backgroundColor: "#7AA2F7", color: "#081b17" }}>
                <a href="/staff" onClick={() => setMobileOpen(false)}>
                  Staff Portal
                </a>
              </Button>
              <Button asChild className="flex-1" style={{ backgroundColor: ink.accent, color: "#081b17" }}>
                <a href="#pricing" onClick={() => setMobileOpen(false)}>
                  Register
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>


      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-36 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-black leading-tight"
            >
              LA’s premier mentor-driven robotics & maker camp
            </motion.h1>
            <p className="mt-6 text-lg text-neutral-300 max-w-prose">
              Independent schools often can’t give robotics-obsessed students enough time, mentoring, or resources. Camp Asimov fixes that: a focused, mentor-heavy build lab where students learn to lead their own projects, master tools, and level up for LA’s most competitive robotics programs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <Button asChild size="lg" className="px-6 py-6 text-base" style={{ backgroundColor: ink.accent, color: "#081b17" }}>
                <a href="#program">Curriculum Overview</a>
              </Button>
              <SessionPicker compact />
            </div>
            <p className="mt-4 text-xs text-neutral-400">
            Led by technologist & educator <strong>Ronit Kumar</strong> — bringing experience as Robotics Program Head at Brentwood School and Crossroads School for the Arts and Sciences.
            </p>
          </div>

          {/* hero stats + highlights */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-teal-400/20 to-indigo-400/10 blur-xl" />
              <div className="relative rounded-3xl border p-6 md:p-8" style={{ borderColor: ink.line, background: ink.surface }}>
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  {[ ["3", "Weeks"], ["10–17", "Ages"], ["1:8", "Teacher : Student Ratio"] ].map(([n, l]) => (
                    <div key={l} className="rounded-xl p-4 border" style={{ borderColor: ink.line, background: ink.panel }}>
                      <div className="font-bold text-xl">{n}</div>
                      <div className="text-neutral-400">{l}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border rounded-2xl p-5" style={{ borderColor: ink.line }}>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <Trophy className="w-4 h-4" aria-hidden /> Expert coaching, small teams, big results.
                  </div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {[
                      "Fusion 360 CAD (3D design fundamentals)",
                      "Java programming (REV Robotics Control Hub / FTC SDK)",
                      "Builds with REV Robotics + goBilda ecosystem",
                      "3D printers, laser cutters, and CNC",
                    ].map((t) => (
                      <div key={t} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5" style={{ color: ink.accent }} aria-hidden />
                        <span className="text-neutral-300">{t}</span>
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
      <section id="program" className="py-16 bg-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">3-Week Robotics Intensive</h2>
          <p className="text-lg text-gray-300 mb-10 text-center">
            A single, immersive summer experience that covers everything your child needs to excel in competitive robotics programs.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Week 1: Design & Build</h3>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>3D design fundamentals (<strong>Autodesk Fusion 360</strong>)</li>
                <li>Hands-on mechanical builds (REV + goBilda)</li>
                <li>Design-driven development & iteration</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Week 2: Code & Control</h3>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li><strong>Java</strong> programming with REV Robotics Control Hub</li>
                <li>Sensor integration & path planning</li>
                <li>Mechanical + software systems working together</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Week 3: Compete & Iterate</h3>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>Subsystem ownership & iteration journals</li>
                <li>Testing & reliability under competition pressure</li>
                <li>Final Friday Family Scrimmage Showcase</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3">Ages & Levels</h3>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>Ages 10–12: foundations in design & coding</li>
                <li>Ages 12–14: strategy, autonomy, advanced builds</li>
                <li>Ages 14–17: competitive prep & leadership roles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TUITION & DATES */}
      <section id="pricing" className="py-20 border-t" style={{ borderColor: ink.line }}>
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold">Tuition & Dates</h2>
          <div className="mt-6 grid md:grid-cols-4 gap-6">
            <div className="rounded-2xl border p-6" style={{ borderColor: ink.line, background: ink.surface }}>
              <div className="text-neutral-400 text-sm">Tuition</div>
              <div className="mt-2 text-3xl font-extrabold">
                $1,200 <span className="text-base font-medium text-neutral-400">/ week</span>
              </div>
              <div className="mt-1 text-neutral-400 text-sm">3-week intensive • $3,600 total</div>
              <div className="mt-6">
                     <SessionPicker compact />
                </div>

            </div>

            <div className="rounded-2xl border p-6" style={{ borderColor: ink.line, background: ink.surface }}>
              <div className="text-neutral-400 text-sm">Ages</div>
              <div className="mt-2 text-xl font-semibold">10–17</div>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                <li>Grouped by age/experience</li>
                <li>1:8 <strong>Teacher : Student</strong> ratio</li>
                <li>LA location • Mon–Fri 9:00–3:30</li>
              </ul>
            </div>

            <div className="rounded-2xl border p-6" style={{ borderColor: ink.line, background: ink.surface }}>
              <div className="text-neutral-400 text-sm">What’s included</div>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                <li>REV Robotics + goBilda parts & safe fab lab</li>
                <li>Autodesk Fusion 360 CAD, Java programming</li>
                <li>Daily field tests & Demo Day showcase</li>
              </ul>
            </div>

            <div className="rounded-2xl border p-6" style={{ borderColor: ink.line, background: ink.surface }}>
              <div className="text-neutral-400 text-sm">Logistics</div>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                <li>📅 Dates: June 8–26 • July 6–24</li>
                <li>🕘 Hours: 9:00 am – 3:30 pm</li>
                <li>📍 Location: Los Angeles (exact site TBD)</li>
                <li>👩‍🏫 1:8 Teacher : Student ratio</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
<section id="why" className="py-20 border-t" style={{ borderColor: ink.line }}>
  <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10">
    {/* Left: Student-centered story */}
    <div>
      <h2 className="text-2xl md:text-3xl font-bold">Built around student growth</h2>
      <p className="mt-3 text-neutral-300 max-w-prose">
        Camp Asimov is a mentor-driven build lab where students own real subsystems,
        make decisions, and see the impact of their choices on a working robot.
        We focus on <strong>confidence</strong>, <strong>craft</strong>, and <strong>leadership</strong>:
        students ship working mechanisms, document their process, and present like pros.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {[
          { title: "Authentic builds",
            text: "Drive bases, intakes, linkages, wiring, sensors—students take subsystems from sketch → CAD → fab → test." },
          { title: "Mentored mastery",
            text: "Tight feedback loops with coach check-ins, pairing, and tool certifications to build safely and fast." },
          { title: "Competitive readiness",
            text: "Code control loops, integrate sensors, and stress-test under time pressure—skills that transfer to FTC/US school teams." },
          { title: "Portfolio & storytelling",
            text: "Iteration journals, photos/video, and a Demo Day reel students can share with teams and programs." },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border p-5"
            style={{ borderColor: ink.line, background: ink.surface }}
          >
            <div className="font-semibold">{f.title}</div>
            <p className="mt-2 text-sm text-neutral-400">{f.text}</p>
          </div>
        ))}
      </div>

      {/* Coach blurb */}
    <div className="mt-8 rounded-2xl border p-6" style={{ borderColor: ink.line, background: ink.panel }}>
      <div className="text-sm text-neutral-300 leading-relaxed">
        Led by <strong>Ronit Kumar</strong> — a beloved robotics coach who has spent more than a decade teaching in Los Angeles’s
        independent school system and over fifteen years immersed in competitive robotics as a student, mentor, and program head.
        Ronit has guided hundreds of students through design challenges and competition seasons, always with the same belief: 
        <em>kids are incredibly capable and come up with the most creative solutions when trusted and supported.</em>
         Camp Asimov exists to give them the skills and environment to build confidence in their ideas — to turn imagination into
        working machines and to see themselves as engineers.
      </div>
</div>

    </div>

    {/* Right: Autoplaying video reel */}
    <div className="grid sm:grid-cols-2 gap-4">
      <AutoPlayVideo src="/videos/blockdelivery.mp4" poster="/videos/posters/drive.jpg" caption="Driver practice & tuning" />
      <AutoPlayVideo src="/videos/conedelivery.mp4" poster="/videos/posters/intake.jpg" caption="Cycle testing" />
      <AutoPlayVideo src="/videos/autonomous.mp4" poster="/videos/posters/auton.jpg" caption="Autonomous pathing & sensors" />
      <AutoPlayVideo src="/videos/lift.mp4" poster="/videos/posters/scrim.jpg" caption="Mechanical lift stress-testing" />
    </div>
  </div>
</section>


      {/* SAFETY */}
        <section id="safety" className="py-20 border-t" style={{ borderColor: ink.line }}>
        <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl md:text-3xl font-bold">Safety Protocols</h2>

            <p className="mt-2 text-neutral-400 max-w-prose">
            We operate a youth-safety program that meets California requirements for youth-serving organizations.
            All staff and regular volunteers complete <strong>DOJ Live Scan background checks</strong> and
            <strong> mandated reporter training</strong>. Students progress through <strong>tool certifications</strong>,
            wear <strong>PPE</strong>, and work in <strong>staff-supervised zones</strong> with machine-specific SOPs
            (laser cutter, 3D printers, soldering, CNC). We train lithium-ion battery handling for robotics power systems and
            maintain on-site emergency supplies.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
                "PPE & Certified Tool Zones — Eye protection, hair secured, closed-toe shoes; badges required for laser, 3D printers, soldering.",
                "Laser & Fab SOPs (ANSI Z136-aligned) — Enclosed Class-1 operation, interlocks maintained, venting checked, signage posted.",
                "Fume Control & ESD — Local exhaust for soldering, flux training, burn kit on bench; anti-static handling for electronics.",
                "Medical & Emergency Ready — Allergy/med alerts, epi-pen/inhaler plan, CPR/First Aid trained staff, incident logs & notifications.",
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
            <div className="mt-4 text-xs text-neutral-500">
            California compliance: staff/regular volunteers complete <strong>Live Scan</strong> background checks and
            <strong> mandated reporter training</strong>; written child-safety policies maintained per AB 506.
            {" "}
            <a href="/safety-plan.pdf" target="_blank" rel="noopener noreferrer" className="underline text-teal-300">
                View our Safety Plan (PDF)
            </a>
            </div>
        </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 border-t" style={{ borderColor: ink.line }}>
        <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
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
          <div>
            <h3 className="text-xl font-semibold">Questions? Talk to a human.</h3>
            <p className="mt-2 text-neutral-400">
              We’re builders first. If you want specifics on tools, safety, or curriculum fit, ask away.
            </p>
            <div className="mt-4 text-sm">
              <div className="text-neutral-300">Academic Director: Ronit Kumar</div>
              <div className="text-neutral-300">Bringing experience as Robotics Program Head at Brentwood School and Crossroads School for the Arts and Sciences.</div>
              <div className="text-neutral-300">Los Angeles, CA</div>
              <div className="text-neutral-300">
                Email: <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
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
              style={{ backgroundColor: "#00f0b5", color: "#081b17" }}
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
