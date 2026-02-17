import { ink } from "@/components/theme";

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

export default function FAQSection() {
  return (
    <section className="py-16">
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
  );
}
