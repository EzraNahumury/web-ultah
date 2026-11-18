"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/app/lib/hooks";

interface AutoVideoProps {
  src: string;
  className?: string;
  poster?: string;
}

/**
 * A muted, looping clip that plays only while it's on screen (and only if the
 * visitor hasn't asked for reduced motion). Keeps several videos cheap.
 */
export default function AutoVideo({ src, className = "", poster }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (reduced) {
      v.pause();
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      v.play().catch(() => {});
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    />
  );
}
