"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import birthday, { type GalleryPhoto } from "@/data/birthday";
import { Reveal } from "@/app/components/Reveal";
import { ChevronLeft, ChevronRight, Close, Plus } from "@/app/components/Icons";

const ROTATIONS = [-2.2, 1.6, -1.1, 2.1, -1.7, 1.2, -2, 1.4];
const STAGGER = ["lg:translate-y-0", "lg:translate-y-12", "lg:-translate-y-6"];

function Placeholder({ photo }: { photo: GalleryPhoto }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-ivory-deep to-blush/60 text-rose-deep/70">
      <Plus className="h-7 w-7 opacity-50" />
      <span className="mt-3 px-6 text-center font-display text-sm italic opacity-70">
        {photo.tag ?? "Your photo here"}
      </span>
    </div>
  );
}

function Frame({
  photo,
  sizes,
  priority = false,
}: {
  photo: GalleryPhoto;
  sizes: string;
  priority?: boolean;
}) {
  if (!photo.src) return <Placeholder photo={photo} />;
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover"
    />
  );
}

export default function Memories() {
  const { memories } = birthday;
  const photos = memories.photos;
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpen((cur) =>
        cur === null ? cur : (cur + dir + photos.length) % photos.length,
      ),
    [photos.length],
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

  const active = open === null ? null : photos[open];

  return (
    <section
      data-theme="light"
      className="relative overflow-hidden bg-ivory py-28 sm:py-36"
    >
      <div className="wrap">
        <header className="max-w-2xl">
          <Reveal as="p" className="eyebrow text-rose-deep" from="none">
            Section 03 — The Collection
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="display-fluid mt-5 text-[clamp(2.2rem,6vw,4.25rem)] text-espresso"
          >
            {memories.title}
          </Reveal>
          <Reveal
            as="p"
            delay={160}
            className="mt-5 text-lg leading-relaxed text-espresso/70"
          >
            {memories.subtitle}
          </Reveal>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <Reveal
              key={i}
              from="scale"
              delay={(i % 3) * 120}
              className={STAGGER[i % 3]}
            >
              <button
                data-cursor="hover"
                onClick={() => setOpen(i)}
                className="group block w-full text-left"
                style={{ perspective: "1000px" }}
                aria-label={`Open memory: ${photo.caption}`}
              >
                <figure
                  className="rounded-[2px] bg-white p-3 pb-14 shadow-[0_18px_40px_-24px_rgba(74,30,39,0.5)] transition-all duration-700 ease-[var(--ease-silk)] group-hover:-translate-y-2 group-hover:rotate-0 group-hover:shadow-[0_32px_60px_-28px_rgba(74,30,39,0.55)]"
                  style={{ rotate: `${ROTATIONS[i % ROTATIONS.length]}deg` }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-deep">
                    <div className="h-full w-full transition-transform duration-[1200ms] ease-[var(--ease-silk)] group-hover:scale-105">
                      <Frame photo={photo} priority={i < 3} sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw" />
                    </div>
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4">
                    <span className="font-hand text-lg leading-none text-espresso/85">
                      {photo.caption}
                    </span>
                    {photo.tag && (
                      <span className="eyebrow text-[0.55rem] text-rose-deep/60">
                        {photo.tag}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Memory viewer"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-cocoa/92 p-4 backdrop-blur-md"
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

          <figure
            className="flex max-h-[86vh] w-full max-w-3xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm bg-ivory-deep shadow-2xl sm:max-w-lg">
              <Frame photo={active} sizes="(max-width:640px) 92vw, 512px" />
            </div>
            <figcaption className="mt-6 text-center">
              <p className="font-display text-xl italic text-cream sm:text-2xl">
                {active.caption}
              </p>
              <p className="eyebrow mt-3 text-gold-soft/80">
                {(open ?? 0) + 1} / {photos.length}
                {active.tag ? ` · ${active.tag}` : ""}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
