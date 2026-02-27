import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ink } from "@/components/theme";

export default function ApplyThanksPage() {
  return (
    <section className="pt-6 md:pt-8 pb-16">
      <div className="mx-auto max-w-3xl px-6 text-white">
        <div className="rounded-2xl border p-8 md:p-10 text-center" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.34)" }}>
          <h1 className="text-3xl md:text-4xl font-bold">Application Received</h1>
          <p className="mt-4 text-base md:text-lg text-neutral-300 leading-relaxed">
            Thanks for your interest in Camp Asimov. We review founding cohort inquiries in the order received and will follow up within 24-48 hours.
          </p>
          <div className="mt-7">
            <Button asChild className="px-6 py-3 text-base" style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}>
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
