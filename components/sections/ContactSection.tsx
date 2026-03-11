"use client";

import { Button } from "@/components/ui/button";
import { ink } from "@/components/theme";
import { PROGRAM_ADDRESS_LINE_1, PROGRAM_ADDRESS_LINE_2 } from "@/lib/campConfig";

const CONTACT_EMAIL = "info@campasimov.com";

export default function ContactSection() {
  return (
    <section className="-mt-4 md:-mt-6 pb-16">
      <div className="mx-auto max-w-7xl px-6 pt-8 md:pt-10 grid gap-6 md:gap-8 md:grid-cols-[1.02fr_1fr] items-stretch">
        <div
          className="rounded-2xl border p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          style={{ borderColor: ink.line, background: "rgba(8,10,16,0.58)", backdropFilter: "blur(6px)" }}
        >
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">Contact</div>
          <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-white">Talk to the Program Director</h3>
          <p className="mt-4 text-neutral-200 leading-relaxed">
            If you have questions about tools, safety, experience level, or whether the program is a good fit, feel free to reach out.
          </p>
          <p className="mt-3 text-neutral-200 leading-relaxed">
            We&apos;re builders first and are happy to answer detailed questions about how the program works.
          </p>
          <div className="mt-6 border-t pt-5 text-sm md:text-base text-neutral-200 space-y-1.5" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
            <div className="font-semibold text-white">Ronit Kumar</div>
            <div className="text-neutral-300">Academic Director</div>
            <div className="pt-2">📍 {PROGRAM_ADDRESS_LINE_1}</div>
            <div>{PROGRAM_ADDRESS_LINE_2}</div>
            <div>
              ✉{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline decoration-transparent hover:decoration-current transition-colors" style={{ color: ink.accent }}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <form
          action="https://formspree.io/f/mqaygyjp"
          method="POST"
          className="rounded-2xl border p-6 md:p-8 space-y-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          style={{ borderColor: ink.line, background: "rgba(8,10,16,0.58)", backdropFilter: "blur(6px)" }}
        >
          <div>
            <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-neutral-300">Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="w-full rounded-xl border bg-[#0b1221] px-4 py-3.5 text-neutral-100 placeholder:text-neutral-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8fd7ff]/40 focus:border-[#8fd7ff]/70"
              style={{ borderColor: "rgba(255,255,255,0.14)" }}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-neutral-300">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="w-full rounded-xl border bg-[#0b1221] px-4 py-3.5 text-neutral-100 placeholder:text-neutral-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8fd7ff]/40 focus:border-[#8fd7ff]/70"
              style={{ borderColor: "rgba(255,255,255,0.14)" }}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-neutral-300">Message</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="How can we help?"
              required
              className="w-full rounded-xl border bg-[#0b1221] px-4 py-3.5 text-neutral-100 placeholder:text-neutral-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8fd7ff]/40 focus:border-[#8fd7ff]/70"
              style={{ borderColor: "rgba(255,255,255,0.14)" }}
              rows={5}
            />
          </div>
          <Button
            type="submit"
            className="h-12 px-7 rounded-xl font-semibold transition-transform duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}
          >
            Send
          </Button>
          <p className="text-sm text-neutral-400">We typically respond within 24 hours.</p>
        </form>

        <div className="md:col-span-2 mt-1 md:mt-2">
          <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: ink.line }}>
            <iframe
              title="Camp Asimov map in Santa Monica"
              className="h-[220px] md:h-[240px] w-full transition-opacity duration-500 opacity-0"
              src="https://www.google.com/maps?q=2341+Michigan+Ave,+Santa+Monica,+CA+90404&z=14&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={(e) => {
                const el = e.currentTarget;
                el.classList.remove("opacity-0");
                el.classList.add("opacity-100");
              }}
              style={{ opacity: 0.93 }}
            />
            <div className="absolute inset-0 pointer-events-none bg-black/20" />
            <a
              href="https://www.google.com/maps/search/?api=1&query=2341+Michigan+Ave,+Santa+Monica,+CA+90404"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
              aria-label="Open Google Maps for Camp Asimov location in Santa Monica"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
