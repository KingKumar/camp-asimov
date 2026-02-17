"use client";

import { useEffect, useRef, useState } from "react";

type AutoPlayVideoProps = {
  src: string;
  poster?: string;
  caption?: string;
  className?: string;
  ratio?: "16/9" | "4/3" | "1/1" | "9/16";
};

export default function AutoPlayVideo(props: AutoPlayVideoProps) {
  const { src, poster, caption, className = "", ratio } = props;
  const ref = useRef<HTMLVideoElement | null>(null);
  const [needsTap, setNeedsTap] = useState(false);
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.playsInline = true;

    const tryPlay = async () => {
      try {
        await el.play();
        setNeedsTap(false);
      } catch {
        setNeedsTap(true);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) tryPlay();
        else el.pause();
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMeta = () => {
    const el = ref.current;
    if (!el) return;
    if (el.videoHeight && el.videoWidth) {
      setIsPortrait(el.videoHeight > el.videoWidth);
    }
  };

  const ratioClass = ratio
    ? {
        "16/9": "aspect-video",
        "4/3": "aspect-[4/3]",
        "1/1": "aspect-square",
        "9/16": "aspect-[9/16]",
      }[ratio]
    : "aspect-video";

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${ratioClass} ${className}`}>
      <video
        ref={ref}
        className={`h-full w-full transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"} ${isPortrait ? "object-cover" : "object-cover"}`}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        preload="metadata"
        onLoadedMetadata={onMeta}
        onLoadedData={() => setIsReady(true)}
      />
      {!isReady && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      )}
      {needsTap && (
        <button
          type="button"
          className="absolute inset-0 bg-black/40 text-white text-sm font-medium"
          onClick={() => ref.current?.play()}
        >
          Tap to play
        </button>
      )}
      {caption && (
        <div className="absolute bottom-2 left-2 right-2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur">
          {caption}
        </div>
      )}
    </div>
  );
}
