"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ink } from "@/components/theme";
import { APPLY_COHORT_OPTIONS, FORMSPREE_FOUNDING_COHORT_ACTION } from "@/lib/campConfig";

const gradeOptions = ["5", "6", "7", "8", "9", "10", "11", "12"];

const experienceOptions = [
  "New to robotics",
  "Some experience (class/club)",
  "Competitive (FTC/VEX/FRC teams)",
  "Advanced competitive / team lead",
];

const quickFacts = [
  { label: "Ages 10–15", emphasis: true },
  { label: "Santa Monica", emphasis: true },
  { label: "June 8–26", emphasis: true },
  { label: "July 6–24", emphasis: true },
  { label: "Small cohorts" },
  { label: "Real robot builds" },
  { label: "Competitive Readiness" },
  { label: "Expert Mentoring" },
];

const familyReasons = [
  "Each student builds their own robot",
  "Learn CAD, wiring, and Java programming",
  "Beginner-friendly with a high ceiling for experienced students",
];

export default function ApplyPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preferredCohort, setPreferredCohort] = useState("Either");
  const [hearAbout, setHearAbout] = useState("");

  useEffect(() => {
    const cohort = new URLSearchParams(window.location.search).get("cohort");
    const selected = APPLY_COHORT_OPTIONS.find((option) => option.value === cohort)?.label ?? "Either";
    setPreferredCohort(selected);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(FORMSPREE_FOUNDING_COHORT_ACTION, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        window.location.href = "/apply/thanks";
        return;
      }

      setError("Something went wrong. Please try again.");
      setLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden pt-5 pb-16 md:pt-8">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 text-white">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:items-start">
          <div className="min-w-0 lg:sticky lg:top-24">
            <p className="mb-3 inline-flex rounded-full border border-[#8FD7FF]/40 bg-[#8FD7FF]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#8FD7FF] shadow-[0_0_22px_rgba(143,215,255,0.12)]">
              Summer 2026 Robotics Engineering
            </p>
            <h1 className="max-w-4xl text-[2.35rem] font-black leading-[1.04] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Camp Asimov Robotics Engineering Summer Program
            </h1>
            <p className="mt-4 max-w-3xl text-xl font-medium leading-snug text-neutral-100 md:text-2xl">
              Students <span className="font-black text-white">design, build, and program</span> their own robot{" "}
              <span className="font-black text-[#8FD7FF]">from scratch</span> in a small, hands-on engineering environment.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className={`min-w-0 rounded-xl border px-3 py-2.5 text-center text-sm font-bold leading-tight shadow-[0_0_22px_rgba(143,215,255,0.08)] ${
                    fact.emphasis ? "border-[#8FD7FF]/60 bg-[#8FD7FF]/14 text-white" : "border-white/10 bg-white/[0.045] text-neutral-100"
                  }`}
                >
                  {fact.label}
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:hidden">
              <Button asChild className="px-6 py-3 text-base" style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}>
                <a href="#application-form">Submit Application</a>
              </Button>
              <Button asChild className="border px-6 py-3 text-base" style={{ backgroundColor: "transparent", color: ink.accent, borderColor: ink.accent, textShadow: "none" }}>
                <Link href="/program">View Program Details</Link>
              </Button>
            </div>

            <div className="mt-7 rounded-2xl border border-white/10 bg-[#0f141f]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
              <h2 className="text-lg font-black leading-tight text-white md:text-xl">Why families apply</h2>
              <ul className="mt-4 space-y-3 text-base text-neutral-100">
                {familyReasons.map((reason) => (
                  <li key={reason} className="flex gap-3 leading-snug">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#8FD7FF]/50 bg-[#8FD7FF]/12 text-[#8FD7FF]">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form
            id="application-form"
            onSubmit={handleSubmit}
            className="min-w-0 rounded-2xl border p-5 shadow-[0_28px_90px_rgba(0,0,0,0.36)] sm:p-6 md:p-8"
            style={{
              borderColor: "rgba(143,215,255,0.25)",
              background: "linear-gradient(180deg, rgba(15,20,31,0.96), rgba(10,13,21,0.98))",
            }}
          >
            <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            <div className="mb-6 border-b pb-5" style={{ borderColor: ink.line }}>
              <h2 className="text-2xl font-black leading-tight text-white md:text-3xl">Apply for the Summer 2026 Cohort</h2>
              <p className="mt-3 text-base leading-snug text-neutral-200 md:text-lg">
                Submit this short form and I&apos;ll follow up with details and next steps within 24 hours.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="parent_name" className="block text-sm font-semibold text-neutral-100">Parent/Guardian Full Name</label>
              <input id="parent_name" name="parent_guardian_full_name" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-neutral-100">Email</label>
              <input id="email" name="email" type="email" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-neutral-100">Phone</label>
              <input id="phone" name="phone" type="tel" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
            </div>
            <div>
              <label htmlFor="student_name" className="block text-sm font-semibold text-neutral-100">Student Name</label>
              <input id="student_name" name="student_name" type="text" required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
            </div>
            <div>
              <label htmlFor="student_age" className="block text-sm font-semibold text-neutral-100">Student Age</label>
              <input id="student_age" name="student_age" type="number" min={8} max={18} required className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
            </div>
            <div>
              <label htmlFor="student_gender" className="block text-sm font-semibold text-neutral-100">Student Gender</label>
              <select id="student_gender" name="student_gender" defaultValue="" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }}>
                <option value="" disabled>Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
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
              <label htmlFor="hear_about" className="block text-sm font-semibold text-neutral-100">How did you hear about Camp Asimov?</label>
              <select
                id="hear_about"
                name="hear_about"
                required
                value={hearAbout}
                onChange={(e) => setHearAbout(e.target.value)}
                className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white"
                style={{ borderColor: ink.line }}
              >
                <option value="" disabled>Select one</option>
                <option value="Google search">Google search</option>
                <option value="Google advertisement">Google advertisement</option>
                <option value="Friend or family recommendation">Friend or family recommendation</option>
                <option value="Robotics team or coach">Robotics team or coach</option>
                <option value="Instagram">Instagram</option>
                <option value="Another website or blog">Another website or blog</option>
                <option value="School or teacher">School or teacher</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {(hearAbout === "Friend or family recommendation" || hearAbout === "Robotics team or coach") ? (
              <div className="md:col-span-2">
                <label htmlFor="referrer_name" className="block text-sm font-semibold text-neutral-100">If someone referred you, who?</label>
                <input id="referrer_name" name="referrer_name" type="text" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
              </div>
            ) : null}
            {(hearAbout === "Another website or blog" || hearAbout === "Other") ? (
              <div className="md:col-span-2">
                <label htmlFor="hear_about_details" className="block text-sm font-semibold text-neutral-100">Please share details</label>
                <textarea id="hear_about_details" name="hear_about_details" rows={3} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
              </div>
            ) : null}
            <div>
              <label htmlFor="school" className="block text-sm font-semibold text-neutral-100">School (Optional)</label>
              <input id="school" name="school" type="text" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="build_goal" className="block text-sm font-semibold text-neutral-100">What does your student want to build or improve this summer?</label>
              <textarea id="build_goal" name="summer_build_goal" required rows={4} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="prior_team" className="block text-sm font-semibold text-neutral-100">Prior robotics team / competitions (Optional)</label>
              <input id="prior_team" name="prior_team_or_competitions" type="text" className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-semibold text-neutral-100">Anything else we should know? (Optional)</label>
              <textarea id="notes" name="additional_notes" rows={3} className="mt-2 w-full rounded-lg border px-3 py-2.5 text-base bg-[#111521] text-white" style={{ borderColor: ink.line }} />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button type="submit" disabled={loading} className="px-6 py-3 text-base" style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
            <Button asChild className="px-6 py-3 text-base border" style={{ backgroundColor: "transparent", color: ink.accent, borderColor: ink.accent, textShadow: "none" }}>
              <Link href="/program">View Program Details</Link>
            </Button>
          </div>
          {error ? <p className="text-sm text-neutral-200">{error}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
