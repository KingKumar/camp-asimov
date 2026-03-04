"use client";

import { useState } from "react";

import { ink } from "@/components/theme";

export type MediaItem = {
  type: "video" | "image";
  src: string;
  alt: string;
  poster?: string;
  caption?: string;
};

type MediaGalleryProps = {
  media: MediaItem[];
};

function Placeholder({ caption }: { caption?: string }) {
  return (
    <div
      className="aspect-video rounded-xl border flex items-center justify-center px-4 text-center text-sm text-neutral-300"
      style={{ borderColor: ink.line, background: "rgba(10,12,16,0.45)" }}
    >
      <div>
        <div className="font-medium text-neutral-200">Media preview unavailable</div>
        {caption ? <div className="mt-1">{caption}</div> : null}
      </div>
    </div>
  );
}

export default function MediaGallery({ media }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedIndexes, setFailedIndexes] = useState<Record<number, boolean>>({});

  const activeItem = media[activeIndex];
  const isFailed = failedIndexes[activeIndex];

  const markFailed = (index: number) => {
    setFailedIndexes((prev) => (prev[index] ? prev : { ...prev, [index]: true }));
  };

  if (!media.length) {
    return <Placeholder caption="Media coming soon." />;
  }

  return (
    <div>
      <div className="rounded-xl border p-2" style={{ borderColor: ink.line, background: "rgba(10,12,16,0.25)" }}>
        {isFailed ? (
          <Placeholder caption={activeItem?.caption} />
        ) : activeItem?.type === "video" ? (
          <video
            key={activeItem.src}
            className="aspect-video w-full rounded-lg object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={activeItem.poster}
            onError={() => markFailed(activeIndex)}
          >
            <source src={activeItem.src} type="video/mp4" />
          </video>
        ) : (
          <img
            src={activeItem.src}
            alt={activeItem.alt}
            loading="lazy"
            decoding="async"
            className="aspect-video w-full rounded-lg object-cover"
            onError={() => markFailed(activeIndex)}
          />
        )}
      </div>

      {media.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {media.map((item, index) => {
            const isActive = index === activeIndex;
            const label = item.caption || `Media ${index + 1}`;
            return (
              <button
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="shrink-0 rounded-lg border px-3 py-2 text-xs text-left transition-colors"
                style={{
                  borderColor: isActive ? ink.accent : ink.line,
                  color: isActive ? "#ffffff" : "#cfd3dc",
                  background: isActive ? "rgba(143,215,255,0.1)" : "rgba(10,12,16,0.25)",
                }}
                aria-pressed={isActive}
                aria-label={`Show media ${index + 1}: ${label}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
