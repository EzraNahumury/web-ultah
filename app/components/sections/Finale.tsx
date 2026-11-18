"use client";

import { useEffect, useState } from "react";
import birthday from "@/data/birthday";
import { Reveal, TextReveal } from "@/app/components/Reveal";
import DarkAmbient from "@/app/components/DarkAmbient";

export default function Finale() {
  const { finale, senderName, recipientName } = birthday;
  // Resolve the year on the client only — never read the clock during render.
  const [year, setYear] = useState<string>("");
  useEffect(() => setYear(String(new Date().getFullYear())), []);
  return (
    <section
      data-theme="dark"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-cocoa py-32 text-cream"
    >
      <DarkAmbient />
      <div className="wrap-tight relative z-10 text-center">
        <Reveal
          as="p"
          className="font-display text-2xl italic text-cream-dim sm:text-3xl"
        >
          {finale.buildup}
        </Reveal>

        <Reveal
          delay={200}
          className="mx-auto my-12 h-px w-20"
          from="scale"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
          }}
        >
          <span className="sr-only">·</span>
        </Reveal>

        <h2 className="display-fluid mx-auto max-w-3xl text-[clamp(2rem,6vw,4rem)] leading-tight text-cream">
          <TextReveal text={finale.reveal} step={45} />
        </h2>

        <Reveal
          as="p"
          delay={300}
          className="mt-20 font-display text-[clamp(2.5rem,9vw,6rem)] leading-[1.05]"
        >
          <span className="gold-shimmer">{finale.closing}</span>
        </Reveal>

        <Reveal delay={200} className="mt-16 flex flex-col items-center gap-2">
          <span className="eyebrow text-cream-dim/60">With all my heart,</span>
          <span className="font-hand text-5xl text-rose">{senderName}</span>
        </Reveal>

        <Reveal
          as="p"
          delay={300}
          className="mt-24 text-xs tracking-[0.3em] text-cream-dim/40"
          from="none"
        >
          MADE JUST FOR {recipientName.toUpperCase()}
          {year ? ` · ${year}` : ""}
        </Reveal>
      </div>
    </section>
  );
}
