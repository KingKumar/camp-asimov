import { ink } from "@/components/theme";
import { COHORT_CAP, PROGRAM_ADDRESS_FULL, SESSION_REFUND_FAQ_ANSWER } from "@/lib/campConfig";

const faqs = [
  {
    q: "Who This Program Is For",
    a: "Camp Asimov is designed for students who are excited by building, making, troubleshooting, and understanding how robots actually work. It is a strong fit for beginners ready for a serious introduction and for experienced students who want stronger skills in CAD (3D design software), wiring, and programming.",
  },
  {
    q: "How selective is Camp Asimov?",
    a: `Cohorts are intentionally capped at ${COHORT_CAP} students so each student gets more direct mentoring and closer technical feedback.`,
  },
  {
    q: "Where will the camp take place?",
    a: `Camp Asimov takes place at ${PROGRAM_ADDRESS_FULL}.`,
  },
  {
    q: "What are the camp hours?",
    a: "Camp runs Mon–Fri, 9:00–4:00. Early drop-off is available at 8:30, and pickup is available until 4:30.",
  },
  {
    q: "Are beginners welcome?",
    a: "Yes. Students of all experience levels are welcome. On the first day, students are assessed based on prior experience with building, CAD (3D design software), and programming, then instruction is adjusted so each student works at an appropriate level of challenge.",
  },
  {
    q: "Will students work in teams or build their own robots?",
    a: "At Camp Asimov, each student builds their own robot. Students still collaborate and support one another, but each student is responsible for their own design, wiring, code, testing, and troubleshooting. This builds deeper understanding and stronger confidence when they return to team-based robotics.",
  },
  {
    q: "What will students be able to do by the end?",
    a: "By the end of the program, students can design parts in CAD (3D design software), assemble a drivetrain (the system that helps the robot move), wire core electronics, write and test robot code in Java (an industry-standard language used by many robotics teams), troubleshoot failures, and improve designs through testing.",
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
    a: "We target a 1:8 teacher-to-student ratio, with additional mentor support during custom-part building and testing periods.",
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
