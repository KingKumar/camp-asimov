import { ink } from "@/components/theme";

const policyItems = [
  "Session confirmation: Camp Asimov sessions proceed once minimum enrollment is reached. Families will be notified when a session is confirmed.",
  "If a session does not proceed: If Camp Asimov does not move forward with a scheduled session (including due to insufficient enrollment), all deposits and payments will be fully refunded within 5 business days.",
  "30+ days before session start: Full refund minus a $150 administrative fee.",
  "14–29 days before session start: 50% refund of tuition paid.",
  "Within 14 days of the session start date: Tuition is non-refundable. At Camp Asimov’s discretion, a credit toward a future session may be issued if space is available.",
  "After the session begins: Withdrawals after camp begins are non-refundable.",
  "Program cancellation by Camp Asimov: If Camp Asimov cancels a confirmed session for any reason, families will receive a full refund of all payments made.",
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
          <p className="mt-5">All refund requests must be submitted in writing to info@campasimov.com.</p>
        </div>
      </div>
    </section>
  );
}
