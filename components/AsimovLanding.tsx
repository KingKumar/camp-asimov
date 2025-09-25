"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check, Shield, Rocket, Cpu, Sparkles, Video, Wrench,
  CalendarDays, ChevronRight,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Asimov-inspired palette
const ink = {
  bg: "#0A0B10",
  surface: "#101219",
  panel: "#0f1321",
  accent: "#5DE4C7",   // mint
  accent2: "#7AA2F7",  // blue
  line: "rgba(255,255,255,0.08)",
};

const features = [
  { icon: <Cpu className="w-5 h-5" />, title: "All‑Maker • All‑Robotics",
    text: "Mechanical design, CAD, microcontrollers, sensors, and battle‑ready builds." },
  { icon: <Wrench className="w-5 h-5" />, title: "Fabrication Lab",
    text: "3D printing, laser cutting, prototyping rigs, safe soldering, and tool certification." },
  { icon: <Video className="w-5 h-5" />, title: "Cinematic Showcase",
    text: "Demo Day with story, aesthetics, and Asimov‑grade presentation." },
  { icon: <Shield className="w-5 h-5" />, title: "Safety First",
    text: "Three Laws‑inspired safety training, PPE, and supervised build zones." },
];

// const programs = [
//   {
//     title: "3‑Week Robotics Intensive (Ages 10–12)",
//     blurb: "Foundations in design‑driven development: 3D design & CAD, safe fabrication, and autonomous behaviors.",
//     bullets: [
//       "3D design & CAD (Onshape)",
//       "Design‑driven development & iteration",
//       "Microcontrollers (Arduino/MicroPython) & sensors",
//     ],
//   },
//   {
//     title: "3‑Week Robotics Intensive (Ages 12–14)",
//     blurb: "From chassis to code: build with premier parts (goBilda), integrate sensors, and ship reliable mechanisms.",
//     bullets: [
//       "goBilda ecosystem & mechanical best practices",
//       "Path planning & sensor fusion",
//       "Custom parts (CAD → 3D print/laser cut)",
//     ],
//   },
//   {
//     title: "3‑Week Advanced Track (Ages 14–17)",
//     blurb: "Competition‑level builds: subsystem ownership, reliability testing, and advanced coding.",
//     bullets: [
//       "Subsystem ownership & design reviews",
//       "Advanced coding patterns & Git workflow",
//       "Event‑style scrimmage & presentation",
//     ],
//   },
// ];

const faqs = [
  { q: "What does an Asimov‑themed camp mean?",
    a: "We fuse hard engineering with narrative design—students build capable robots and craft the story around them. It’s STEAM with purpose: logic, ethics, and imagination." },
  { q: "Is it safe for new makers?",
    a: "Yes. Every student completes tool training, PPE checks, and staff‑guided build steps before independent work." },
  { q: "Do you provide gear?",
    a: "We supply tools, kits, and lab materials. Students bring a labeled water bottle, lunch, and curiosity." },
  { q: "Refunds & transfers?",
    a: "Full refund (minus processing) up to 30 days pre‑start; 50% from 14–29 days; credits within 14 days." },
];

export default function AsimovCampLanding() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
      {/* subtle star grid */}
      <div className="pointer-events-none fixed inset-0 [background-image:radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b"
        style={{ borderColor: ink.line, background: "rgba(10,11,16,0.7)", backdropFilter: "blur(6px)" }}>
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Rocket className="h-6 w-6" style={{ color: ink.accent }} />
            <span className="font-semibold tracking-wide">CAMP ASIMOV</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <a href="#programs" className="hover:text-white">Program Details</a>
            <a href="#why" className="hover:text-white">Why Us</a>
            <a href="#safety" className="hover:text-white">Safety</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <Button asChild className="ml-2" style={{ backgroundColor: ink.accent, color: "#081b17" }}>
              <a href="https://buy.stripe.com/REPLACE_ME" target="_blank" rel="noreferrer">Register</a>
            </Button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="program" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-36 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-black leading-tight"
            >
              LA’s premier mentor‑driven robotics & maker camp
            </motion.h1>
            <p className="mt-6 text-lg text-neutral-300 max-w-prose">
              Independent schools often can’t give robotics‑obsessed students enough time, mentoring, or resources. Camp Asimov fixes that: a focused, mentor‑heavy build lab where students learn to lead their own projects, master tools, and level up for LA’s most competitive robotics programs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="px-6 py-6 text-base" style={{ backgroundColor: ink.accent, color: "#081b17" }}>
                View Sessions
              </Button>
              <Button size="lg" variant="outline" className="px-6 py-6 text-base border"
                style={{ borderColor: ink.accent2, color: ink.accent2 }}>
                Watch Overview
              </Button>
            </div>
            <p className="mt-4 text-xs text-neutral-400">
              Led by Technologist and Educator <strong>Ronit Kumar</strong> — Bringing experience as Robotics Program Head at Brentwood School and Crossroads School.
            </p>
          </div>

          {/* hero stats + safety */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-teal-400/20 to-indigo-400/10 blur-xl" />
              <div className="relative rounded-3xl border p-6 md:p-8" style={{ borderColor: ink.line, background: ink.surface }}>
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  {[ ["3", "Weeks"], ["10–17", "Ages"], ["1:8", "Teacher:Student Ratio"] ].map(([n, l]) => (
                    <div key={l} className="rounded-xl p-4 border" style={{ borderColor: ink.line, background: ink.panel }}>
                      <div className="font-bold text-xl">{n}</div>
                      <div className="text-neutral-400">{l}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border rounded-2xl p-5" style={{ borderColor: ink.line }}>
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <Trophy className="w-4 h-4" /> Expert coaching, small teams, big results.
                  </div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {[ "Advanced 3D Computer Aided Design", "Advanced Concepts in Programming", "Building with the best parts on the market", "3D printers, laser cutters, and CNC" ].map((t) => (
                      <div key={t} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5" style={{ color: ink.accent }} />
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
      <section className="py-16 bg-gray-950 text-white">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-3xl font-bold mb-4 text-center">3-Week Robotics Intensive</h2>
    <p className="text-lg text-gray-300 mb-10 text-center">
      A single, immersive summer experience that covers everything your child needs to excel in competitive robotics programs.
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-3">Week 1: Design & Build</h3>
        <ul className="space-y-2 text-gray-300 list-disc list-inside">
          <li>3D design fundamentals (Onshape CAD)</li>
          <li>Hands-on builds with <strong>goBilda</strong> parts</li>
          <li>Design-driven development process</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-3">Week 2: Code & Control</h3>
        <ul className="space-y-2 text-gray-300 list-disc list-inside">
          <li>Arduino & MicroPython basics</li>
          <li>Sensor integration & path planning</li>
          <li>Mechanical + software systems working together</li>
        </ul>
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-3">Week 3: Compete & Iterate</h3>
        <ul className="space-y-2 text-gray-300 list-disc list-inside">
          <li>Subsystem ownership & iteration journals</li>
          <li>Testing & reliability under competition pressure</li>
          <li>Scrimmage showcase for families</li>
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
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border p-6" style={{ borderColor: ink.line, background: ink.surface }}>
              <div className="text-neutral-400 text-sm">Tuition</div>
              <div className="mt-2 text-3xl font-extrabold">$1,200 <span className="text-base font-medium text-neutral-400">/ week</span></div>
              <div className="mt-1 text-neutral-400 text-sm">3‑week camp • $3,600 total</div>
              <Button className="mt-6 w-full" style={{ backgroundColor: ink.accent, color: '#081b17' }}>Register</Button>
            </div>
            <div className="rounded-2xl border p-6" style={{ borderColor: ink.line, background: ink.surface }}>
              <div className="text-neutral-400 text-sm">Ages</div>
              <div className="mt-2 text-xl font-semibold">10–17</div>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                <li>Tracks by age/experience</li>
                <li>1:8 staff ratio • tool certifications</li>
                <li>LA location • Mon–Fri</li>
              </ul>
            </div>
            <div className="rounded-2xl border p-6" style={{ borderColor: ink.line, background: ink.surface }}>
              <div className="text-neutral-400 text-sm">What’s included</div>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                <li>goBilda parts library & safe fab lab</li>
                <li>Onshape CAD, Arduino/MicroPython</li>
                <li>Daily field tests & Demo Day showcase</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="py-20 border-t" style={{ borderColor: ink.line }}>
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Engineering, ethics, and imagination</h2>
            <p className="mt-3 text-neutral-300 max-w-prose">
              Founded and led by LA robotics coach <strong>Ronit Kumar</strong> — builder of programs at <strong>Brentwood School</strong> (grew from <strong>10 → 50</strong> students) and foundaing member of the school’s <strong>BCIL</strong>; now coaching at <strong>Crossroads School</strong>. We pair elite competition experience with hands‑on mentoring and design‑driven engineering.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border p-5" style={{ borderColor: ink.line, background: ink.surface }}>
                  <div className="flex items-center gap-2 font-semibold">{f.icon} {f.title}</div>
                  <p className="mt-2 text-sm text-neutral-400">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border p-6" style={{ borderColor: ink.line, background: ink.panel }}>
            <div className="flex items-center gap-2 text-neutral-300 text-sm">
              <CalendarDays className="w-4 h-4" /> Sample Day
            </div>
            <ul className="mt-3 space-y-3 text-sm text-neutral-300">
              {[
                ["09:00", "Stand‑up & goals"],
                ["09:20", "Tool time: certification or CAD"],
                ["10:00", "Subsystem builds"],
                ["12:00", "Lunch & field tests"],
                ["13:00", "Code + sensors"],
                ["14:30", "Iteration + bug bashes"],
                ["15:30", "Scrimmage or film demo"],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4"><span className="text-neutral-500 w-16">{t}</span> <span>{d}</span></li>
              ))}
            </ul>
            <Button className="mt-6" variant="outline" style={{ borderColor: ink.accent2, color: ink.accent2 }}>
              Download Parent Packet <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section id="safety" className="py-20 border-t" style={{ borderColor: ink.line }}>
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold">Safety Protocols</h2>
          <p className="mt-2 text-neutral-400 max-w-prose">
            Modeled on “Three Laws” principles: protect, obey procedures, and preserve learning. Every student earns badges before specific tools.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["PPE checks at entry","Certified tool zones","Laser & solder SOPs","Allergy & emergency flags"].map((s) => (
              <div key={s} className="rounded-2xl border p-5 text-sm" style={{ borderColor: ink.line, background: ink.surface }}>
                <div className="flex items-start gap-2"><Shield className="w-4 h-4" style={{ color: ink.accent }} /> <span className="text-neutral-300">{s}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 border-t" style={{ borderColor: ink.line }}>
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
          <div className="mt-8 grid gap-6">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border p-5" style={{ borderColor: ink.line, background: ink.surface }}>
                <div className="font-semibold">{f.q}</div>
                <p className="mt-2 text-sm text-neutral-400">{f.a}</p>
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
              <div className="text-neutral-300">Bringing experience as Robotics Program Head at Brentwood School and Crossroads School.</div>
              <div className="text-neutral-300">Los Angeles, CA</div>
            </div>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Message sent — we’ll reply within 1–2 business days."); }}
            className="rounded-2xl border p-6"
            style={{ borderColor: ink.line, background: ink.surface }}
          >
            <div className="grid gap-3">
              <Input placeholder="Your email" type="email" required className="bg-black/30 border" style={{ borderColor: ink.line }} />
              <Textarea placeholder="Message" required className="bg_black/30 border min-h-[120px]" style={{ borderColor: ink.line }} />
              <Button type="submit" className="w-fit" style={{ backgroundColor: ink.accent, color: "#081b17" }}>
                Send
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8 text-center text-xs text-neutral-500" style={{ borderColor: ink.line }}>
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>© {new Date().getFullYear()} Camp Asimov. All rights reserved.</div>
          <div className="flex gap-4">
            <a className="hover:text-neutral-300" href="#">Privacy</a>
            <a className="hover:text-neutral-300" href="#">Refunds</a>
            <a className="hover:text-neutral-300" href="#">Staff Login</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
