"use client";

import { useEffect, useState } from "react";
import birthday from "@/data/birthday";
import { Reveal } from "@/app/components/Reveal";
import MagneticButton from "@/app/components/MagneticButton";
import { Spark } from "@/app/components/Icons";

/** The opened letter — a tall parchment card whose lines rise in as you read. */
function LetterCard() {
  const { letter, senderName, recipientName } = birthday;
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);

  return (
    <div
      className="transition-all duration-[1100ms] ease-[var(--ease-silk)]"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(26px)",
      }}
    >
      <article className="relative mx-auto max-w-2xl rounded-sm bg-[linear-gradient(180deg,#fffdf9,var(--color-ivory-soft))] p-8 text-left shadow-[0_50px_90px_-55px_rgba(74,30,39,0.65)] sm:p-16">
        <div className="mb-10 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-gold/50" />
          <span className="eyebrow text-rose-deep/70">Untuk {recipientName}</span>
          <span className="h-px w-10 bg-gold/50" />
        </div>

        <Reveal
          as="p"
          className="font-display text-[clamp(2.4rem,7vw,3.5rem)] italic leading-none text-burgundy"
        >
          {letter.greeting}
        </Reveal>

        {letter.paragraphs.map((raw, i) => {
          const emphasis = raw.startsWith("*") && raw.endsWith("*");
          const text = emphasis ? raw.slice(1, -1) : raw;
          return emphasis ? (
            <Reveal
              as="p"
              key={i}
              className="my-12 text-center font-display text-2xl italic text-rose-deep sm:text-[1.7rem]"
            >
              {text}
            </Reveal>
          ) : (
            <Reveal
              as="p"
              key={i}
              className="mt-6 font-display text-xl leading-relaxed text-espresso/90 sm:text-[1.35rem] sm:leading-[1.9]"
            >
              {text}
            </Reveal>
          );
        })}

        <Reveal
          as="p"
          className="mt-14 font-display text-lg text-espresso/70"
        >
          {letter.signoff}
        </Reveal>
        <Reveal className="mt-1 font-hand text-5xl text-burgundy sm:text-6xl">
          {senderName}
        </Reveal>
      </article>
    </div>
  );
}

export default function Letter() {
  const { letter } = birthday;
  const [opened, setOpened] = useState(false);
  const [sealed, setSealed] = useState(true);

  const handleOpen = () => {
    setOpened(true);
    window.setTimeout(() => setSealed(false), 1100);
  };

  return (
    <section
      data-theme="light"
      className="relative overflow-hidden bg-ivory-soft py-28 sm:py-36"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-blush) 70%, transparent), transparent 70%)",
          opacity: 0.5,
        }}
        aria-hidden
      />

      <div className="wrap-tight relative z-10 text-center">
        <Reveal as="p" className="eyebrow text-rose-deep" from="none">
          Section 06 — A Letter For You
        </Reveal>
        <Reveal
          as="h2"
          delay={80}
          className="display-fluid mt-5 text-[clamp(2.2rem,6vw,4.25rem)] text-espresso"
        >
          {letter.title}
        </Reveal>

        <div className="relative mt-16">
          {opened && <LetterCard />}

          {sealed && (
            <div
              className="flex flex-col items-center transition-all duration-[900ms] ease-[var(--ease-silk)]"
              style={{
                opacity: opened ? 0 : 1,
                transform: opened ? "translateY(-30px) scale(0.96)" : "none",
                pointerEvents: opened ? "none" : "auto",
                position: opened ? "absolute" : "relative",
                top: opened ? 0 : undefined,
                left: opened ? 0 : undefined,
                right: opened ? 0 : undefined,
              }}
            >
              <Reveal from="scale">
                <div
                  className="relative mx-auto h-52 w-[22rem] max-w-full [perspective:1200px]"
                  aria-hidden
                >
                  <div className="absolute inset-0 rounded-lg border border-gold/30 bg-[linear-gradient(160deg,var(--color-ivory-deep),var(--color-blush))] shadow-[0_30px_60px_-35px_rgba(74,30,39,0.6)]" />
                  <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <div
                      className="absolute left-0 top-0 h-full w-full"
                      style={{
                        background:
                          "linear-gradient(135deg, transparent 49.6%, color-mix(in oklab, var(--color-rose) 30%, transparent) 50%, transparent 50.4%), linear-gradient(-135deg, transparent 49.6%, color-mix(in oklab, var(--color-rose) 30%, transparent) 50%, transparent 50.4%)",
                      }}
                    />
                  </div>
                  <div
                    className="absolute inset-x-0 top-0 h-28 origin-top transition-transform duration-[900ms] ease-[var(--ease-silk)]"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background:
                        "linear-gradient(160deg, var(--color-blush), var(--color-rose))",
                      transform: opened ? "rotateX(180deg)" : "rotateX(0deg)",
                      zIndex: opened ? 1 : 5,
                    }}
                  />
                  <div
                    className="absolute left-1/2 top-[42%] z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-gold-soft/60 text-cocoa transition-all duration-500"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 30%, var(--color-gold-soft), var(--color-gold))",
                      opacity: opened ? 0 : 1,
                      transform: `translateX(-50%) scale(${opened ? 0.4 : 1})`,
                      boxShadow: "0 6px 14px -6px rgba(0,0,0,0.5)",
                    }}
                  >
                    <Spark className="h-6 w-6" />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120} className="mt-10">
                <MagneticButton onClick={handleOpen} disabled={opened}>
                  Read My Letter
                  <Spark className="h-4 w-4" />
                </MagneticButton>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
