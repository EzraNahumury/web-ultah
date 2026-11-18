"use client";

import { useState } from "react";
import birthday, { type Reason } from "@/data/birthday";
import { Reveal } from "@/app/components/Reveal";
import DarkAmbient from "@/app/components/DarkAmbient";
import { Spark } from "@/app/components/Icons";

function ReasonCard({ reason, index }: { reason: Reason; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      data-cursor="hover"
      aria-pressed={flipped}
      onClick={() => setFlipped((f) => !f)}
      className="group block h-64 w-full text-left [perspective:1400px]"
    >
      <div
        className="relative h-full w-full transition-transform duration-[900ms] ease-[var(--ease-silk)] [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-gold/25 bg-[linear-gradient(160deg,var(--color-ivory-soft),var(--color-ivory-deep))] p-7 [backface-visibility:hidden]"
          style={{ boxShadow: "0 24px 50px -30px rgba(0,0,0,0.7)" }}
        >
          <span className="font-display text-2xl text-gold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-[2rem] leading-tight text-burgundy">
            {reason.title}
          </h3>
          <span className="eyebrow flex items-center gap-2 text-rose-deep/70">
            <Spark className="h-3.5 w-3.5" /> Tap to read
          </span>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex flex-col justify-center rounded-2xl border border-gold/30 bg-[linear-gradient(160deg,var(--color-burgundy),var(--color-cocoa-soft))] p-7 text-cream [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)", boxShadow: "0 24px 50px -30px rgba(0,0,0,0.8)" }}
        >
          <span className="mb-4 h-px w-10 bg-gold/60" />
          <p className="font-display text-xl italic leading-relaxed text-cream/95">
            {reason.note}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function Reasons() {
  const { reasons } = birthday;
  return (
    <section
      data-theme="dark"
      className="relative overflow-hidden bg-cocoa py-28 text-cream sm:py-36"
    >
      <DarkAmbient sparks={false} />
      <div className="wrap relative z-10">
        <header className="max-w-2xl">
          <Reveal as="p" className="eyebrow text-gold-soft" from="none">
            Section 05 — Things I Love About You
          </Reveal>
          <Reveal
            as="h2"
            delay={80}
            className="display-fluid mt-5 text-[clamp(2.2rem,6vw,4.25rem)] text-cream"
          >
            {reasons.title}
          </Reveal>
          <Reveal as="p" delay={160} className="mt-5 text-lg leading-relaxed text-cream-dim">
            {reasons.subtitle}
          </Reveal>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.items.map((reason, i) => (
            <Reveal key={i} from="scale" delay={(i % 3) * 110}>
              <ReasonCard reason={reason} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
