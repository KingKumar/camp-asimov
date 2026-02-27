"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Video } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ink } from "@/components/theme";

const navLinks = [
  { href: "/testimonials", label: "Testimonials" },
  { href: "/program", label: "Program Details" },
  { href: "/why", label: "Why Us" },
  { href: "/safety", label: "Safety" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

type SiteShellProps = {
  children: React.ReactNode;
  enableReel?: boolean;
};

export default function SiteShell({ children, enableReel = false }: SiteShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showReel, setShowReel] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || showReel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, showReel]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Full-page video background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src="/videos/homepage.mp4" type="video/mp4" />
        </video>
        {/* Readability overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, rgba(7,9,12,0.55), rgba(5,7,10,0.86))
            `,
          }}
        />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[1] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />

      {enableReel && (
        <>
          {/* Floating highlight reel toggle */}
          <button
            type="button"
            onClick={() => setShowReel((v) => !v)}
            className="fixed bottom-24 md:bottom-10 right-6 z-[70] hidden md:inline-flex group items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide
                   border shadow-[0_12px_24px_rgba(143,215,255,0.35),0_0_0_1px_rgba(0,0,0,0.35)]
                   transition-transform hover:-translate-y-0.5 hover:rotate-[-1deg] hover:scale-[1.02] hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.45)] active:scale-[0.98]
                   lg:right-10"
            aria-label={showReel ? "Hide Highlight Reel" : "View Highlight Reel"}
            style={{ textShadow: "none", backgroundColor: ink.accent, color: "#071410", borderColor: "rgba(255,255,255,0.45)" }}
          >
            <Sparkles className="h-4 w-4" />
            {showReel ? "Hide Highlight Reel" : "View Highlight Reel"}
          </button>
          <button
            type="button"
            onClick={() => setShowReel((v) => !v)}
            className="fixed bottom-20 right-4 z-[70] md:hidden inline-flex items-center justify-center h-12 w-12 rounded-full border
                   shadow-[0_10px_20px_rgba(143,215,255,0.35),0_0_0_1px_rgba(0,0,0,0.35)]
                   transition-transform hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.45)] active:scale-[0.98]"
            aria-label={showReel ? "Hide Highlight Reel" : "View Highlight Reel"}
            style={{ textShadow: "none", backgroundColor: ink.accent, color: "#071410", borderColor: "rgba(255,255,255,0.45)" }}
          >
            <Video className="h-5 w-5" />
          </button>

          {/* Highlight reel overlay */}
          {showReel && (
            <div
              className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
              role="dialog"
              aria-modal="true"
              aria-label="Highlight Reel"
              onClick={() => setShowReel(false)}
            >
              <div
                className="relative w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="absolute -top-10 right-0 rounded-full border px-3 py-1 text-sm text-white/90 transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{ borderColor: ink.line, background: "rgba(10,11,16,0.8)" }}
                  onClick={() => setShowReel(false)}
                  aria-label="Close highlight reel"
                >
                  <span className="inline-flex items-center gap-2">
                    <X className="h-4 w-4" /> Close
                  </span>
                </button>
                <div className="aspect-video overflow-hidden rounded-2xl border" style={{ borderColor: ink.line }}>
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                  >
                    <source src="/videos/homepage.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* NAV */}
      <header
        className="fixed top-0 z-50 border-b w-full py-2 backdrop-blur-md bg-[rgba(10,11,16,0.85)]"
        style={{ borderColor: ink.line }}
      >
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img src="/favicon.ico" alt="Camp Asimov" className="h-6 w-6" />
            <span className="font-semibold tracking-wide text-sm md:text-base text-white">CAMP ASIMOV</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-white ${isActive(link.href) ? "font-semibold" : "text-neutral-300"}`}
                style={
                  isActive(link.href)
                    ? {
                        color: ink.accent,
                        textDecoration: "underline",
                        textDecorationColor: ink.accent,
                        textUnderlineOffset: 6,
                      }
                    : undefined
                }
              >
                {link.label}
              </Link>
            ))}

            <Button
              asChild
              className="ml-2 border"
              style={{ backgroundColor: "transparent", color: ink.accent, borderColor: ink.accent, textShadow: "none" }}
            >
              <Link href="/staff" aria-label="Open Staff Portal">Staff Portal</Link>
            </Button>
            <Button asChild className="ml-2" style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}>
              <Link href="/apply">Request an Invite</Link>
            </Button>
          </nav>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            style={{ borderColor: ink.line, background: "rgba(12,14,20,0.5)" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className="px-4 sm:px-6 pb-4 pt-2 space-y-2 border-t"
            style={{ borderColor: ink.line, background: "rgba(10,11,16,0.9)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-lg hover:bg-white/5 ${isActive(link.href) ? "text-white" : "text-neutral-300"}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Button
                asChild
                className="flex-1 border"
                style={{ backgroundColor: "transparent", color: ink.accent, borderColor: ink.accent, textShadow: "none" }}
              >
                <Link href="/staff" onClick={() => setMobileOpen(false)}>
                  Staff Portal
                </Link>
              </Button>
              <Button asChild className="flex-1" style={{ backgroundColor: ink.accent, color: "#071410", textShadow: "none" }}>
                <Link href="/apply" onClick={() => setMobileOpen(false)}>
                  Request an Invite
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-[100svh] min-h-[100dvh] w-full text-white relative z-10 overflow-x-hidden pt-12 md:pt-16">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>

        <footer className="border-t py-8 text-center text-xs text-neutral-500" style={{ borderColor: ink.line }}>
          <div className="mx-auto max-w-7xl px-6 flex flex-col gap-4 items-center justify-center text-center">
            <div>© {new Date().getFullYear()} Camp Asimov. All rights reserved.</div>
            <div className="flex gap-4">
              <a className="hover:text-neutral-300" href="/privacy.html">Privacy</a>
              <a className="hover:text-neutral-300" href="/refunds">Refunds</a>
              <a className="hover:text-neutral-300" href="/staff">Staff Login</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
