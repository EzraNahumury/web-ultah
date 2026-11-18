"use client";

import { useEffect, useRef, useState } from "react";
import birthday from "@/data/birthday";
import { Reveal } from "@/app/components/Reveal";
import DarkAmbient from "@/app/components/DarkAmbient";
import MagneticButton from "@/app/components/MagneticButton";
import { launchConfetti } from "@/app/lib/confetti";
import { Spark } from "@/app/components/Icons";

function Candle({ blown, delay }: { blown: boolean; delay: number }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* flame */}
      <div className="relative mb-0.5 h-7 w-4">
        {/* glow */}
        <div
          className="absolute left-1/2 bottom-0 h-10 w-10 rounded-full blur-md transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-gold-soft) 90%, #ff9b3d), transparent 70%)",
            transform: "translateX(-50%)",
            opacity: blown ? 0 : 0.85,
            animation: blown ? "none" : `glowPulse 2.2s ease-in-out ${delay}s infinite`,
          }}
        />
        {/* flame body */}
        <div
          className="absolute left-1/2 bottom-0"
          style={{
            width: 13,
            height: 24,
            background:
              "radial-gradient(circle at 50% 72%, #fff6e0, var(--color-gold-soft) 32%, #ef9a3c 68%, transparent 74%)",
            borderRadius: "50% 50% 50% 50% / 62% 62% 40% 40%",
            transformOrigin: "bottom center",
            opacity: blown ? 0 : 1,
            transform: blown
              ? "translateX(-50%) scaleY(0)"
              : "translateX(-50%) scaleY(1)",
            transition: "opacity .5s ease, transform .5s ease",
            animation: blown ? "none" : `flameDance 1.1s ease-in-out ${delay}s infinite`,
          }}
        />
        {/* smoke */}
        {blown && (
          <div
            className="absolute left-1/2 bottom-2 h-6 w-2 rounded-full bg-cream/40 blur-[3px]"
            style={{ animation: "smokeRise 1.8s ease-out forwards" }}
          />
        )}
      </div>
      {/* wick */}
      <div className="h-1 w-0.5 bg-cocoa" />
      {/* stick */}
      <div
        className="h-12 w-2 rounded-sm"
        style={{
          background:
            "repeating-linear-gradient(45deg, var(--color-ivory-soft) 0 4px, var(--color-rose) 4px 8px)",
        }}
      />
    </div>
  );
}

export default function Wish() {
  const { wish } = birthday;
  const [blown, setBlown] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cancelRef = useRef<(() => void) | null>(null);
  const candles = Array.from({ length: Math.max(1, wish.candleCount) });

  useEffect(() => () => cancelRef.current?.(), []);

  const makeWish = () => {
    setBlown(true);
    if (canvasRef.current) {
      cancelRef.current?.();
      cancelRef.current = launchConfetti(canvasRef.current, {
        originX: 0.5,
        originY: 0.46,
      });
    }
  };

  const relight = () => {
    cancelRef.current?.();
    setBlown(false);
  };

  return (
    <section
      data-theme="dark"
      className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-cocoa),var(--color-burgundy))] py-28 text-cream sm:py-36"
    >
      <DarkAmbient sparks={false} />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        aria-hidden
      />

      <div className="wrap-tight relative z-10 flex flex-col items-center text-center">
        <Reveal as="p" className="eyebrow text-gold-soft" from="none">
          Section 07 — Make A Wish
        </Reveal>
        <Reveal
          as="h2"
          delay={80}
          className="display-fluid mt-5 text-[clamp(2.2rem,6vw,4.25rem)] text-cream"
        >
          {wish.title}
        </Reveal>

        {/* Cake */}
        <Reveal from="scale" delay={160} className="mt-14">
          <div className="relative flex flex-col items-center">
            {/* candles */}
            <div className="relative z-10 flex items-end justify-center gap-3 sm:gap-4">
              {candles.map((_, i) => (
                <Candle key={i} blown={blown} delay={(i % 5) * 0.22} />
              ))}
            </div>

            {/* top tier */}
            <div className="relative -mt-1 h-20 w-44 rounded-t-md rounded-b-sm bg-[linear-gradient(180deg,#fdf4e7,var(--color-blush))] shadow-[inset_0_-10px_20px_-10px_rgba(74,30,39,0.3)]">
              <div className="absolute inset-x-0 top-0 h-3 rounded-t-md bg-cream/70" />
              {/* drip */}
              <div
                className="absolute inset-x-0 top-2 h-5"
                style={{
                  background:
                    "radial-gradient(10px 12px at 20% 0, var(--color-rose) 60%, transparent 62%), radial-gradient(10px 16px at 50% 0, var(--color-rose) 60%, transparent 62%), radial-gradient(10px 10px at 80% 0, var(--color-rose) 60%, transparent 62%)",
                }}
              />
            </div>
            {/* bottom tier */}
            <div className="relative h-24 w-64 rounded-b-md bg-[linear-gradient(180deg,var(--color-blush),var(--color-rose))] shadow-[inset_0_-14px_24px_-12px_rgba(74,30,39,0.4)]">
              <div className="absolute inset-x-0 top-0 h-4 bg-cream/60" />
              {/* sprinkles */}
              {[12, 28, 44, 60, 76, 90].map((x, i) => (
                <span
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full"
                  style={{
                    left: `${x}%`,
                    top: `${35 + (i % 3) * 16}%`,
                    background: i % 2 ? "var(--color-gold)" : "var(--color-ivory-soft)",
                  }}
                />
              ))}
            </div>
            {/* plate */}
            <div className="mt-1 h-3 w-80 max-w-full rounded-full bg-[radial-gradient(ellipse_at_center,var(--color-gold-soft),var(--color-gold))] opacity-80 blur-[0.3px]" />
          </div>
        </Reveal>

        {/* Action / message */}
        <div className="mt-14 min-h-[6rem]">
          {!blown ? (
            <Reveal from="none">
              <MagneticButton variant="light" onClick={makeWish}>
                {wish.cta}
                <Spark className="h-4 w-4" />
              </MagneticButton>
            </Reveal>
          ) : (
            <div style={{ animation: "softPop 0.8s var(--ease-silk)" }}>
              <p className="mx-auto max-w-xl font-display text-2xl italic leading-relaxed text-cream sm:text-3xl">
                {wish.message}
              </p>
              <button
                onClick={relight}
                data-cursor="hover"
                className="eyebrow mt-7 text-gold-soft/70 underline-offset-8 transition-colors hover:text-gold-soft hover:underline"
              >
                Light them again
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
