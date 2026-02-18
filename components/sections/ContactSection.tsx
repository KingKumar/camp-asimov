"use client";

import { Button } from "@/components/ui/button";
import { ink } from "@/components/theme";

const CONTACT_EMAIL = "info@campasimov.com";

export default function ContactSection() {
  return (
    <section className="pt-0 pb-16">
      <div className="w-full">
        <div className="relative w-full overflow-hidden border-y -mt-12 md:-mt-16" style={{ borderColor: ink.line }}>
          <iframe
            title="Camp Asimov in Santa Monica"
            className="h-[272px] md:h-[368px] w-full transition-opacity duration-500 opacity-0"
            src="https://www.google.com/maps?q=Santa%20Monica%2C%20CA&z=13&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={(e) => {
              const el = e.currentTarget;
              el.classList.remove("opacity-0");
              el.classList.add("opacity-100");
            }}
            style={{ opacity: 0.65 }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-black/55 pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
            <div className="text-center text-white text-3xl md:text-4xl font-bold drop-shadow-[0_6px_18px_rgba(0,0,0,0.7)]">
              Contact us to learn more about LA&apos;s #1 robotics summer camp.
            </div>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Santa%20Monica%2C%20CA"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0"
            aria-label="Open Google Maps for Santa Monica"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-8 mt-10">
        <div
          className="rounded-2xl border p-6 md:p-7"
          style={{ borderColor: ink.line, background: "rgba(8,10,16,0.6)" }}
        >
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
  );
}
