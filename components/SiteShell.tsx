"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ink } from "@/components/theme";

const navLinks = [
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
  const [bgVideoOpacity, setBgVideoOpacity] = useState(1);
  void enableReel;
  const glowHexes = useMemo(
    () =>
      Array.from({ length: 44 }, (_, i) => {
        const size = 12 + Math.random() * 34;
        return {
          id: i,
          left: 2 + Math.random() * 96,
          top: 4 + Math.random() * 92,
          size,
          delay: Math.random() * 3.2,
          duration: 3.2 + Math.random() * 2.2,
          peak: 0.2 + Math.random() * 0.22,
        };
      }),
    []
  );

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (pathname !== "/") {
      setBgVideoOpacity(0);
      return;
    }

    const fadeDistance = 280;
    const onScroll = () => {
      const nextOpacity = Math.max(0, 1 - window.scrollY / fadeDistance);
      setBgVideoOpacity(nextOpacity);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Full-page video background */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundColor: "#07090c" }}>
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: bgVideoOpacity <= 0.01 ? 0.98 : 0,
            backgroundColor: "#07090c",
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='104' height='90' viewBox='0 0 104 90'%3E%3Cpath d='M26 2h52l24 43-24 43H26L2 45 26 2z' fill='none' stroke='%238fd7ff' stroke-opacity='0.42' stroke-width='2.2' stroke-linejoin='round'/%3E%3C/svg%3E"),
              linear-gradient(180deg, rgba(10,14,22,0.72), rgba(7,9,14,0.86))
            `,
            backgroundSize: "52px 42px, 100% 100%",
            backgroundPosition: "0 0, 0 0",
          }}
        />
        {/* Cyan hex pulses for non-video background state */}
        <div className="absolute inset-0 overflow-hidden">
          {glowHexes.map((hex) => (
            <motion.div
              key={hex.id}
              className="absolute"
              style={{
                left: `${hex.left}%`,
                top: `${hex.top}%`,
                width: hex.size,
                height: Math.round(hex.size * 0.88),
                clipPath: "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0 50%)",
                background: "rgba(143,215,255,0.95)",
                boxShadow: "0 0 14px rgba(143,215,255,0.45)",
              }}
              animate={{
                opacity: [0, hex.peak * (1 - bgVideoOpacity), hex.peak * (1 - bgVideoOpacity), 0],
                scale: [0.92, 1.06, 0.94],
              }}
              transition={{
                duration: hex.duration,
                delay: hex.delay,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 0.7 + Math.random() * 1.2,
              }}
            />
          ))}
        </div>
        <video
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          style={{ opacity: bgVideoOpacity }}
        >
          <source src="/videos/homepage.mp4" type="video/mp4" />
        </video>
        {/* Readability overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, rgba(7,9,12,0.42), rgba(5,7,10,0.72))
            `,
          }}
        />
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-[1] [background-image:linear-gradient(rgba(143,215,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(143,215,255,0.1)_1px,transparent_1px)] [background-size:32px_32px]"
        style={{ opacity: 0.1 * bgVideoOpacity }}
      />

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
              <Link href="/apply">Apply for the Summer Cohort</Link>
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
                  Apply for the Summer Cohort
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
            <div>© 2026 Camp Asimov LLC</div>
            <div className="mt-1 text-[0.9rem] leading-[1.4] text-neutral-300/70">
              <div>Santa Monica, CA</div>
              <div>
                <a href="mailto:info@campasimov.com" className="hover:text-neutral-300">
                  info@campasimov.com
                </a>
              </div>
            </div>
            <p className="mt-1 max-w-4xl text-[0.85rem] leading-[1.4] text-neutral-300/70">
              Camp Asimov is an independent educational program operated by Camp Asimov LLC and is not affiliated with, sponsored by, or endorsed by any school or educational institution.
            </p>
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
