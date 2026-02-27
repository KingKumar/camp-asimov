"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ink } from "@/components/theme";

const testimonials = [
  {
    name: "Paige B.",
    role: "Former robotics student of Ronit Kumar",
    quote:
      "Robotics played a foundational role in shaping how I think and solve problems. It taught me resilience, creativity, and how to break complex challenges into manageable pieces. The experience sparked a lasting passion for technology and still influences how I approach my work and the world around me.",
    details: [
      "Computer Science, Colgate University",
      "AI Engineer, Activision (Infinity Ward)",
    ],
  },
  {
    name: "Bella L.",
    role: "Former robotics student of Ronit Kumar",
    quote:
      "One of my favorite parts of robotics was the community and the way Kumar always made the space inviting and lighthearted. Even though building a robot could be frustrating at times, I loved the challenge of thinking creatively and learning to pivot quickly when something didn't work. It was always so gratifying to step back and see the final product with my team.",
    details: [
      "Neurobiology, University of California, Davis",
    ],
  },
  {
    name: "Beckett O.",
    role: "Former robotics student of Ronit Kumar",
    quote:
      "Robotics gave me hands on skills that I've applied across high school and college, and it fundamentally shaped how I approach learning and problem solving. Seeing something you designed, built, or programmed come to life is incredibly rewarding and creates lasting motivation to keep building and creating. The robotics community is full of passionate, talented people, and Mr. Kumar is an incredible teacher and mentor whose excitement for robotics is truly infectious. He is deeply dedicated to helping his students accomplish whatever they set their sights on.",
    details: [
      "Electrical Engineering, Harvard University",
    ],
  },
  {
    name: "Paulo S.",
    role: "Former robotics student of Ronit Kumar",
    quote:
      "When I first joined robotics, I was just looking for a fun afterschool activity while learning how to build robots. I didn’t realize it would become one of the core memories of my childhood. Mr. Kumar was not only a guiding force in robotics, but also a mentor and friend through the challenges of teenage life. The friendships I built and the lessons I learned are invaluable. Some of my closest friends from middle and high school came from robotics.",
    details: [
      "Financial Engineering, University of Miami",
    ],
  },
  {
    name: "James K.",
    role: "Former robotics student of Ronit Kumar",
    quote:
      "Robotics in high school was the first time I studied engineering in a true academic setting. Mr. Kumar pushed us to understand how and why systems work, which gave us the ability to troubleshoot effectively when things failed. That mindset stayed with me through my studies in Aerospace Engineering at Worcester Polytechnic Institute, and I still rely on those same skills today working on airborne radar systems at Raytheon. I am grateful for the strong foundation and steady, practical approach to engineering that Mr. Kumar instilled.",
    details: [
      "Aerospace Engineering, Worcester Polytechnic Institute",
      "Airborne Radar Systems, Raytheon",
    ],
  },
];

export default function TestimonialsSection() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState<1 | -1>(1);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [testimonialProgress, setTestimonialProgress] = useState(0);
  const testimonialProgressRef = useRef(0);
  const testimonialLastRef = useRef<number>(0);
  const testimonialBoxRef = useRef<HTMLDivElement | null>(null);
  const testimonialContentRef = useRef<HTMLDivElement | null>(null);
  const [testimonialScale, setTestimonialScale] = useState(1);

  const activeTestimonial = testimonials[testimonialIndex] || testimonials[0];

  const resetTestimonialProgress = useCallback(() => {
    testimonialProgressRef.current = 0;
    testimonialLastRef.current = Date.now();
    setTestimonialProgress(0);
  }, []);

  useEffect(() => {
    resetTestimonialProgress();
  }, [testimonialIndex, resetTestimonialProgress]);

  useEffect(() => {
    if (isTestimonialPaused || showAllTestimonials) return;
    const duration = 10000;
    testimonialLastRef.current = Date.now();
    const interval = window.setInterval(() => {
      const now = Date.now();
      const delta = now - testimonialLastRef.current;
      testimonialLastRef.current = now;
      let next = testimonialProgressRef.current + delta / duration;
      if (next >= 1) {
        next = 0;
        setTestimonialDirection(1);
        setTestimonialIndex((i) => (i + 1) % testimonials.length);
      }
      testimonialProgressRef.current = next;
      setTestimonialProgress(next);
    }, 50);

    return () => window.clearInterval(interval);
  }, [isTestimonialPaused, showAllTestimonials, testimonialIndex]);

  const testimonialVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const updateTestimonialScale = useCallback(() => {
    const box = testimonialBoxRef.current;
    const content = testimonialContentRef.current;
    if (!box || !content) return;
    const availableH = Math.max(0, box.clientHeight - 8);
    if (!availableH) return;

    const maxScale = 1.6;
    const minScale = 0.5;
    const safety = 0.97;
    let low = minScale;
    let high = maxScale;
    let best = minScale;

    for (let i = 0; i < 8; i += 1) {
      const mid = (low + high) / 2;
      content.style.width = `${100 / mid}%`;
      const baseH = content.scrollHeight;
      if (!baseH) break;
      const scaledH = baseH * mid;
      if (scaledH <= availableH * safety) {
        best = mid;
        low = mid;
      } else {
        high = mid;
      }
    }

    setTestimonialScale(Number(best.toFixed(3)));
  }, []);

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => {
      updateTestimonialScale();
      requestAnimationFrame(updateTestimonialScale);
    });
    return () => cancelAnimationFrame(raf);
  }, [testimonialIndex, showAllTestimonials, updateTestimonialScale]);

  useEffect(() => {
    const onResize = () => updateTestimonialScale();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateTestimonialScale]);

  useEffect(() => {
    const box = testimonialBoxRef.current;
    const content = testimonialContentRef.current;
    if (!box || !content || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => updateTestimonialScale());
    ro.observe(box);
    ro.observe(content);
    return () => ro.disconnect();
  }, [updateTestimonialScale]);

  const handleTestimonialNav = (dir: 1 | -1) => {
    resetTestimonialProgress();
    setTestimonialDirection(dir);
    setTestimonialIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section className="pt-6 md:pt-8 pb-16">
      <div className="px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-center flex-wrap gap-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center">Testimonials</h2>
          </div>
          <p className="mt-4 text-white">
            Families choose Camp Asimov for measurable growth, not just activity time. These testimonials reflect what students carry forward: disciplined problem-solving, engineering confidence, and outcomes that transfer into advanced coursework, competitions, and STEM careers.
          </p>
        </div>

        <div className="mt-8 w-full">
          <div className="mx-auto w-full max-w-7xl">
            <div
              className="relative rounded-2xl border p-4 md:p-10 h-[78vh] md:h-auto min-h-0 flex flex-col"
              style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(10,12,16,0.18)" }}
              onPointerEnter={() => setIsTestimonialPaused(true)}
              onPointerLeave={() => setIsTestimonialPaused(false)}
              onPointerDown={() => setIsTestimonialPaused(true)}
              onPointerUp={() => setIsTestimonialPaused(false)}
              onPointerCancel={() => setIsTestimonialPaused(false)}
            >
              <div className="relative flex-1 min-h-0 overflow-hidden">
                <AnimatePresence
                  initial={false}
                  custom={testimonialDirection}
                  mode="wait"
                  onExitComplete={() => requestAnimationFrame(updateTestimonialScale)}
                >
                  <motion.div
                    key={testimonialIndex}
                    custom={testimonialDirection}
                    variants={testimonialVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col h-full min-h-0"
                    onAnimationComplete={() => requestAnimationFrame(updateTestimonialScale)}
                  >
                    <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <Star className="h-5 w-5" style={{ color: ink.accent }} />
                      <span className="font-semibold text-white">{activeTestimonial.name}</span>
                    </div>
                    <div className="mt-1 text-[12px] md:text-sm text-neutral-300">{activeTestimonial.role}</div>

                    <div ref={testimonialBoxRef} className="mt-3 flex-1 min-h-0 overflow-hidden">
                      <div
                        ref={testimonialContentRef}
                        className="space-y-3"
                        style={{
                          transform: `scale(${testimonialScale})`,
                          transformOrigin: "top left",
                          width: `${100 / testimonialScale}%`,
                        }}
                      >
                        <div
                          className="border-l-2 pl-4 text-[13px] md:text-xl text-white/90 leading-snug md:leading-relaxed"
                          style={{ borderColor: "rgba(143,215,255,0.6)" }}
                        >
                          “{activeTestimonial.quote}”
                        </div>

                        <div className="text-[11px] md:text-sm text-neutral-300 space-y-1">
                          {activeTestimonial.details.map((d) => (
                            <div key={d}>{d}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full"
                  style={{
                    width: `${Math.min(testimonialProgress * 100, 100)}%`,
                    backgroundColor: ink.accent,
                    transition: "width 0.1s linear",
                  }}
                />
              </div>

              <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="h-14 w-14 rounded-full border flex items-center justify-center transition-transform hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.45)] active:scale-[0.98]"
                    style={{ borderColor: ink.accent, color: ink.accent }}
                    onClick={() => handleTestimonialNav(-1)}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    className="h-14 w-14 rounded-full border flex items-center justify-center transition-transform hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.45)] active:scale-[0.98]"
                    style={{ borderColor: ink.accent, color: ink.accent }}
                    onClick={() => handleTestimonialNav(1)}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
                <div className="text-xs text-neutral-400">
                  {testimonialIndex + 1} / {testimonials.length}
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button
                type="button"
                onClick={() => setShowAllTestimonials((v) => !v)}
                className="px-6 py-3 border"
                style={{ backgroundColor: "transparent", color: ink.accent, borderColor: ink.accent, textShadow: "none" }}
              >
                {showAllTestimonials ? "Close all testimonials" : "View all testimonials"}
              </Button>
            </div>

            {showAllTestimonials && (
              <div className="mt-6 grid gap-4">
                {testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="rounded-2xl border p-6"
                    style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(10,12,16,0.18)" }}
                  >
                    <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <Star className="h-5 w-5" style={{ color: ink.accent }} />
                      <span className="font-semibold text-white">{t.name}</span>
                    </div>
                    <div className="mt-2 text-neutral-300">{t.role}</div>
                    <div
                      className="mt-4 border-l-2 pl-4 text-base md:text-lg text-white/90 leading-relaxed"
                      style={{ borderColor: "rgba(143,215,255,0.6)" }}
                    >
                      “{t.quote}”
                    </div>
                    <div className="mt-4 text-sm text-neutral-300 space-y-1">
                      {t.details.map((d) => (
                        <div key={d}>{d}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
