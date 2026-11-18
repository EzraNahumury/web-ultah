import React from "react";

// Fixed positions (no Math.random) so server and client markup always match.
const SPARKS = [
  { x: 8, y: 18, d: 0, s: 2 },
  { x: 22, y: 64, d: 1.4, s: 1.5 },
  { x: 34, y: 28, d: 2.6, s: 2.5 },
  { x: 48, y: 76, d: 0.8, s: 1.5 },
  { x: 61, y: 22, d: 3.1, s: 2 },
  { x: 73, y: 58, d: 1.9, s: 2.5 },
  { x: 84, y: 34, d: 2.2, s: 1.5 },
  { x: 91, y: 70, d: 0.4, s: 2 },
  { x: 16, y: 42, d: 3.4, s: 1.5 },
  { x: 56, y: 48, d: 2.0, s: 1.5 },
  { x: 67, y: 84, d: 1.1, s: 2 },
  { x: 40, y: 12, d: 2.8, s: 1.5 },
];

/**
 * Soft cinematic backdrop for dark sections: two slowly drifting warm glows,
 * a scatter of twinkling gold specks, and a vignette. Purely decorative.
 */
export default function DarkAmbient({
  sparks = true,
}: {
  sparks?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="anim-drift absolute -left-[10%] top-[-15%] h-[60vh] w-[60vh] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-burgundy) 90%, transparent), transparent 70%)",
          opacity: 0.55,
        }}
      />
      <div
        className="anim-drift absolute right-[-12%] bottom-[-18%] h-[55vh] w-[55vh] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-rose-deep) 80%, transparent), transparent 70%)",
          opacity: 0.4,
          animationDelay: "-12s",
        }}
      />
      {sparks &&
        SPARKS.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gold-soft"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              animation: `twinkle ${5 + (i % 4)}s ease-in-out ${p.d}s infinite`,
              boxShadow: "0 0 6px var(--color-gold-soft)",
            }}
          />
        ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 120% at 50% 40%, transparent 55%, color-mix(in oklab, var(--color-cocoa) 85%, black) 100%)",
        }}
      />
    </div>
  );
}
