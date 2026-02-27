import { ink } from "@/components/theme";

const policyItems = [
  "If Camp Asimov does not move forward with a session, all paid deposits will be fully refunded within 5 business days.",
  "Full refund up to 30 days before camp start.",
  "50% refund between 14-29 days before start.",
  "Within 14 days: credit toward a later session if space allows.",
  "Withdrawals after camp begins are non-refundable.",
  "If Camp Asimov must cancel a session, families receive a full refund.",
];

export default function RefundPolicySection() {
  return (
    <section className="pt-6 md:pt-8 pb-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Refund Policy</h2>
        <p className="mt-4 text-sm text-neutral-300 text-center">Last updated: February 2026</p>
        <p className="mt-3 text-base text-neutral-200 text-center">
          Enrollment in Camp Asimov is by invitation following review of the Founding Cohort Interest Form.
        </p>
        <div
          className="mt-8 rounded-2xl border p-6 text-sm text-neutral-300 leading-relaxed"
          style={{ borderColor: ink.line, background: ink.surface }}
        >
          <ul className="space-y-3 list-disc list-inside">
            {policyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-5">
            All refund requests must be emailed to{" "}
            <a href="mailto:info@campasimov.com" className="underline" style={{ color: ink.accent }}>
              info@campasimov.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
