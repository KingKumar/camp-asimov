"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { CAD_LESSONS } from "../lessons";

const PANEL_BG = "#101219";
const BORDER = "rgba(255,255,255,0.08)";
const ACCENT = "#8FD7FF";

export default function CadLessonPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  // Find the lesson for this slug (might be undefined briefly)
  const lesson = useMemo(
    () => CAD_LESSONS.find((l) => l.slug === slug),
    [slug]
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cad_completed") || "{}";
      setCompleted(JSON.parse(raw));
    } catch {}
  }, []);

  // If slug is bad, bounce back to module index
  if (!lesson) {
    if (typeof window !== "undefined") router.replace("/staff/modules/cad");
    return null;
  }

  // From here on, lesson is definitely defined
  const lessonSlug = lesson.slug;

  function toggleComplete() {
    const next = { ...completed, [lessonSlug]: !completed[lessonSlug] };
    setCompleted(next);
    try {
      localStorage.setItem("cad_completed", JSON.stringify(next));
    } catch {}
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
        <Link
          href="/staff/modules/cad"
          className="px-4 py-2 rounded-xl font-semibold"
          style={{ backgroundColor: ACCENT, color: "#071410" }}
        >
          All CAD Lessons
        </Link>
      </div>

      {lesson.description && (
        <p className="mt-2 text-neutral-400">{lesson.description}</p>
      )}

      {/* Video */}
      <div
        className="mt-6 rounded-2xl border overflow-hidden"
        style={{ borderColor: BORDER, background: PANEL_BG }}
      >
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src={lesson.videoUrl}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>

      {/* Resources + actions */}
      <div className="mt-6 grid gap-4">
        {lesson.resources?.length ? (
          <div
            className="rounded-2xl border p-5"
            style={{ borderColor: BORDER, background: PANEL_BG }}
          >
            <h2 className="font-semibold">Resources</h2>
            <ul className="mt-2 space-y-1 text-sm text-neutral-300 list-disc list-inside">
              {lesson.resources.map((r) => (
                <li key={r.href}>
                  <a className="underline" href={r.href} target="_blank" rel="noreferrer">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex gap-3">
          <button
            onClick={toggleComplete}
            className="px-5 py-3 rounded-xl font-semibold"
            style={{
              backgroundColor: completed[lessonSlug] ? "#16a34a" : ACCENT,
              color: "#071410",
            }}
          >
            {completed[lessonSlug] ? "Mark as Incomplete" : "Mark Complete"}
          </button>
          <NavButtons currentSlug={lessonSlug} />
        </div>
      </div>
    </main>
  );
}

function NavButtons({ currentSlug }: { currentSlug: string }) {
  const idx = CAD_LESSONS.findIndex((l) => l.slug === currentSlug);
  const prev = idx > 0 ? CAD_LESSONS[idx - 1] : null;
  const next = idx < CAD_LESSONS.length - 1 ? CAD_LESSONS[idx + 1] : null;

  return (
    <div className="flex gap-3">
      {prev && (
        <Link className="px-4 py-3 rounded-xl font-semibold underline" href={`/staff/modules/cad/${prev.slug}`}>
          ← {prev.title}
        </Link>
      )}
      {next && (
        <Link className="px-4 py-3 rounded-xl font-semibold underline" href={`/staff/modules/cad/${next.slug}`}>
          {next.title} →
        </Link>
      )}
    </div>
  );
}
