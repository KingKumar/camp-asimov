import { Button } from "@/components/ui/button";
import { ink } from "@/components/theme";

const CONTACT_EMAIL = "info@campasimov.com";

export default function ContactSection() {
  return (
    <section className="pt-6 md:pt-8 pb-16">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-8">
        <div
          className="rounded-2xl border p-6 md:p-7"
          style={{ borderColor: ink.line, background: "rgba(8,10,16,0.6)" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
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
