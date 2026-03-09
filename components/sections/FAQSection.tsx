import { ink } from "@/components/theme";
import { COHORT_CAP, SESSION_REFUND_FAQ_ANSWER } from "@/lib/campConfig";

const faqs = [
  {
    q: "Who is this for?",
    a: "Camp Asimov is built for students who want serious engineering growth in a high-intensity environment, including students already building or competing in robotics and beginners ready for full-day technical work.",
  },
  {
    q: "How selective is Camp Asimov?",
    a: `Cohorts are intentionally capped at ${COHORT_CAP} students to preserve high mentor access, technical rigor, and build quality.`,
  },
  {
    q: "Where will the camp take place?",
    a: "Camp Asimov is expected to take place in the Bergamot Station area of Santa Monica. Final location details will be confirmed with enrolled families before the program begins.",
  },
  {
    q: "What are the camp hours?",
    a: "Camp runs Mon–Fri, 9:00–3:30. Early drop 8:30 and late pickup until 4:00 are available.",
  },
  {
    q: "Is it right for beginners?",
    a: "Yes, for beginners who are ready for full-day technical effort, daily feedback, and disciplined build work. We group by age and experience and coach students up quickly.",
  },
  {
    q: "Will students work in teams or build their own robots?",
    a: "At Camp Asimov, each student builds their own robot. Students still learn in a collaborative environment and support one another, but engineering responsibility stays personal. This helps students build real confidence, deeper understanding, and the ability to contribute meaningfully when they return to team-based robotics environments.",
  },
  {
    q: "How do cohort caps work?",
    a: `Each founding cohort is capped at ${COHORT_CAP} students. We keep cohorts small by design to protect mentoring quality and technical output.`,
  },
  {
    q: "What do students bring and wear?",
    a: "Bring lunch daily, plus closed-toe shoes, hair tied back, no dangling jewelry, and a labeled water bottle. We supply all tools, materials, and safety gear.",
  },
  {
    q: "Do students need to bring a laptop?",
    a: "Students are encouraged to bring their own laptop if possible. Working on a personal machine allows them to keep their design environment, files, and robotics software set up exactly as they used them during the program. This makes it much easier for students to continue building and experimenting after the program ends. If a student does not have access to a laptop, please let us know and we will ensure they have access to what they need during the program.",
  },
  {
    q: "What is your teacher-to-student ratio?",
    a: "We target a 1:8 teacher-to-student ratio, with additional mentors during machine and testing blocks.",
  },
  {
    q: "How do you handle allergies and medications?",
    a: "Tell us on the Founding Cohort Interest Form. Students may carry epi-pens/inhalers; staff are briefed and we maintain a posted response plan. We discourage food sharing.",
  },
  {
    q: "What if Camp Asimov does not move forward with a session?",
    a: SESSION_REFUND_FAQ_ANSWER,
  },
];

export default function FAQSection() {
  return (
    <section className="pt-6 md:pt-8 pb-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">FAQ</h2>
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
