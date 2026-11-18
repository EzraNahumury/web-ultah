"use client";

import { useCallback, useEffect, useState } from "react";
import birthday, { type VideoClip } from "@/data/birthday";
import { Reveal } from "@/app/components/Reveal";
import AutoVideo from "@/app/components/AutoVideo";
import DarkAmbient from "@/app/components/DarkAmbient";
import { useReducedMotion } from "@/app/lib/hooks";
import { ChevronLeft, ChevronRight, Close } from "@/app/components/Icons";

function PlayGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

export default function VideoReel() {
  const { videos } = birthday;
  const items = videos.items;
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpen((cur) =>
        cur === null ? cur : (cur + dir + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.classList.add("is-locked");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("is-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const active = open === null ? null : items[open];

  // One card.
  const Card = (clip: VideoClip, index: number, key: string) => (
    <div key={key} className="mr-6 w-[76vw] max-w-[18rem] shrink-0 sm:w-[17rem]">
      <button
        data-cursor="hover"
        onClick={() => setOpen(index)}
        aria-label={`Play video: ${clip.caption}`}
        className="group block w-full text-left"
      >
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-gold/25 bg-black shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-all duration-700 ease-[var(--ease-silk)] group-hover:-translate-y-2 group-hover:border-gold/60">
          <AutoVideo
            src={clip.src}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-silk)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-transparent to-cocoa/10" />
          <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-cocoa/40 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-cocoa/20">
            <PlayGlyph className="ml-1 h-6 w-6 text-cream" />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
            <span className="font-display text-lg italic leading-tight text-cream">
              {clip.caption}
            </span>
            <span className="eyebrow shrink-0 text-[0.55rem] text-gold-soft/80">♪ Sound</span>
          </div>
        </div>
      </button>
    </div>
  );

  const duration = Math.max(32, items.length * 7);

  return (
    <section
      data-theme="dark"
      className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-cocoa),var(--color-cocoa-soft))] py-28 text-cream sm:py-36"
    >
      <DarkAmbient sparks={false} />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-6 opacity-20"
        style={{
          background:
            "repeating-linear-gradient(90deg, transparent 0 18px, color-mix(in oklab, var(--color-gold) 60%, transparent) 18px 30px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-6 opacity-20"
        style={{
          background:
            "repeating-linear-gradient(90deg, transparent 0 18px, color-mix(in oklab, var(--color-gold) 60%, transparent) 18px 30px)",
        }}
        aria-hidden
      />

      <div className="relative z-10">
        <header className="wrap mx-auto max-w-2xl text-center">
          <Reveal as="p" className="eyebrow text-gold-soft" from="none">
            Section 04 — In Motion
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="display-fluid mt-5 text-[clamp(2.2rem,6vw,4.25rem)] text-cream"
          >
            {videos.title}
          </Reveal>
          <Reveal as="p" delay={160} className="mt-5 text-lg leading-relaxed text-cream-dim">
            {videos.subtitle}
          </Reveal>
          <Reveal as="p" delay={220} className="eyebrow mt-6 text-cream-dim/50" from="none">
            Press play, and we're right back there.
          </Reveal>
        </header>

        {/* Auto-scrolling reel — full-bleed, faded edges */}
        <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
          {reduced ? (
            <div className="flex overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {items.map((clip, i) => (
                <Reveal key={i} from="scale" delay={(i % 3) * 100}>
                  {Card(clip, i, `r-${i}`)}
                </Reveal>
              ))}
            </div>
          ) : (
            <div
              className="flex w-max pl-6 hover:[animation-play-state:paused]"
              style={{ animation: `marquee ${duration}s linear infinite` }}
            >
              {[...items, ...items].map((clip, i) =>
                Card(clip, i % items.length, `m-${i}`),
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video viewer"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-cocoa/94 p-4 backdrop-blur-md"
          style={{ animation: "softPop 0.4s var(--ease-silk)" }}
          onClick={close}
          data-theme="dark"
        >
          <button
            onClick={close}
            aria-label="Close"
            data-cursor="hover"
            className="absolute right-5 top-5 rounded-full border border-cream/20 p-3 text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
          >
            <Close className="h-5 w-5" />
          </button>
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous"
                data-cursor="hover"
                className="absolute left-3 sm:left-8 rounded-full border border-cream/20 p-3 text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next"
                data-cursor="hover"
                className="absolute right-3 sm:right-8 rounded-full border border-cream/20 p-3 text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <figure
            className="flex max-h-[88vh] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={open}
              src={active.src}
              className="max-h-[80vh] w-auto max-w-full rounded-lg bg-black shadow-2xl"
              controls
              autoPlay
              loop
              playsInline
            />
            <figcaption className="mt-5 text-center">
              <p className="font-display text-xl italic text-cream">{active.caption}</p>
              <p className="eyebrow mt-2 text-gold-soft/80">
                {(open ?? 0) + 1} / {items.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
