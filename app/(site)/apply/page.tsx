import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ink } from "@/components/theme";
import { APPLY_COHORT_OPTIONS, COHORT_CAP, FORMSPREE_FOUNDING_COHORT_ACTION, FORMSPREE_THANK_YOU_PATH } from "@/lib/campConfig";

type ApplyPageProps = {
  searchParams?: {
    cohort?: string;
  };
};

const gradeOptions = ["5", "6", "7", "8", "9", "10", "11", "12"];

const experienceOptions = [
  "New to robotics",
  "Some experience (class/club)",
  "Competitive (FTC/VEX/FRC)",
  "Advanced competitive / team lead",
];

export default function ApplyPage({ searchParams }: ApplyPageProps) {
  const preferredCohort = APPLY_COHORT_OPTIONS.find((option) => option.value === searchParams?.cohort)?.label ?? "Either";

  return (
    <section className="pt-6 md:pt-8 pb-16">
      <div className="mx-auto max-w-4xl px-6 text-white">
        <h1 className="text-3xl md:text-4xl font-bold">Founding Cohort Interest Form</h1>
        <p className="mt-3 text-lg text-neutral-200">Small cohorts. High mentor access. Real engineering.</p>
        <p className="mt-4 text-base md:text-lg text-neutral-300 leading-relaxed">
          Camp Asimov runs two 3-week founding cohorts this summer, each capped at {COHORT_CAP} students. Complete the form below and we will follow up within 24-48 hours.
        </p>
        <p className="mt-3 text-base md:text-lg text-neutral-200 leading-relaxed">
          Founding Cohort enrollment is limited. Submissions are reviewed on a rolling basis. Selected families will receive an invitation to enroll.
        </p>

        <form
          action={FORMSPREE_FOUNDING_COHORT_ACTION}
          method="POST"
          className="mt-8 rounded-2xl border p-6 md:p-8 space-y-5"
          style={{ borderColor: ink.line, background: "rgba(10,12,16,0.34)" }}
        >
          <input type="hidden" name="_next" value={FORMSPREE_THANK_YOU_PATH} />
          <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="parent_name" className="block text-sm font-semibold text-neutral-100">Parent/Guardian Full Name</label>
              <input id="parent_name" name="parent_guardian_full_name" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-transparent text-white" style={{ borderColor: ink.line }} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-neutral-100">Email</label>
              <input id="email" name="email" type="email" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-transparent text-white" style={{ borderColor: ink.line }} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-neutral-100">Phone</label>
              <input id="phone" name="phone" type="tel" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-transparent text-white" style={{ borderColor: ink.line }} />
            </div>
            <div>
              <label htmlFor="student_name" className="block text-sm font-semibold text-neutral-100">Student Name</label>
              <input id="student_name" name="student_name" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-transparent text-white" style={{ borderColor: ink.line }} />
            </div>
            <div>
              <label htmlFor="student_age" className="block text-sm font-semibold text-neutral-100">Student Age</label>
              <input id="student_age" name="student_age" type="number" min={8} max={18} required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-transparent text-white" style={{ borderColor: ink.line }} />
            </div>
            <div>
              <label htmlFor="grade" className="block text-sm font-semibold text-neutral-100">Grade</label>
              <select id="grade" name="grade" required defaultValue="" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }}>
                <option value="" disabled>Select grade</option>
                {gradeOptions.map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="preferred_cohort" className="block text-sm font-semibold text-neutral-100">Preferred Cohort</label>
              <select
                id="preferred_cohort"
                name="preferred_cohort"
                required
                defaultValue={preferredCohort}
                className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                style={{ borderColor: ink.line }}
              >
                {APPLY_COHORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.label}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-semibold text-neutral-100">Robotics Experience Level</label>
              <select id="experience" name="robotics_experience_level" required defaultValue="" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }}>
                <option value="" disabled>Select experience</option>
                {experienceOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="school" className="block text-sm font-semibold text-neutral-100">School (Optional)</label>
              <input id="school" name="school" type="text" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-transparent text-white" style={{ borderColor: ink.line }} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="build_goal" className="block text-sm font-semibold text-neutral-100">What does your student want to build or improve this summer?</label>
              <textarea id="build_goal" name="summer_build_goal" required rows={4} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-transparent text-white" style={{ borderColor: ink.line }} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="prior_team" className="block text-sm font-semibold text-neutral-100">Prior robotics team / competitions (Optional)</label>
              <input id="prior_team" name="prior_team_or_competitions" type="text" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-transparent text-white" style={{ borderColor: ink.line }} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-semibold text-neutral-100">Anything else we should know? (Optional)</label>
              <textarea id="notes" name="additional_notes" rows={3} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-transparent text-white" style={{ borderColor: ink.line }} />
            </div>
          </div>

          <div className="pt-1 flex flex-col sm:flex-row gap-3">
            <Button type="submit" className="px-6 py-3 text-base" style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}>
              Request an Invite
            </Button>
            <Button asChild className="px-6 py-3 text-base border" style={{ backgroundColor: "transparent", color: ink.accent, borderColor: ink.accent, textShadow: "none" }}>
              <Link href="/program">View Program Details</Link>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
