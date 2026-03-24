"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { ink } from "@/components/theme";

const GOOGLE_ADS_SEND_TO = "AW-18036637271/mHj0CPzp-Y4cENf8xJhD";

export default function ApplyThanksPage() {
  const hasFiredRef = useRef(false);

  useEffect(() => {
    const adsWindow = window as typeof window & {
      gtag?: (...args: unknown[]) => void;
    };

    const fireConversion = () => {
      if (hasFiredRef.current) {
        return true;
      }

      if (typeof adsWindow.gtag !== "function") {
        return false;
      }

      adsWindow.gtag("event", "conversion", {
        send_to: GOOGLE_ADS_SEND_TO,
      });
      hasFiredRef.current = true;
      return true;
    };

    if (fireConversion()) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (fireConversion()) {
        window.clearInterval(intervalId);
      }
    }, 250);

    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="pt-6 md:pt-8 pb-16">
      <div className="mx-auto max-w-3xl px-6 text-white">
        <div className="rounded-2xl border p-8 md:p-10 text-center" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.34)" }}>
          <h1 className="text-3xl md:text-4xl font-bold">Application Received</h1>
          <p className="mt-4 text-base md:text-lg text-neutral-300 leading-relaxed">
            Thanks for your interest in Camp Asimov. Founding cohort submissions are reviewed on a rolling basis. We&apos;ll follow up within 24-48 hours.
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
