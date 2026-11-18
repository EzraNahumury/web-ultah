"use client";

import React from "react";
import { useMagnetic } from "@/app/lib/hooks";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "ghost" | "light";
  strength?: number;
}

const VARIANTS: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
  // On ivory
  solid:
    "bg-burgundy text-cream hover:bg-[color-mix(in_oklab,var(--color-burgundy)_88%,black)]",
  ghost:
    "bg-transparent text-burgundy border border-[color-mix(in_oklab,var(--color-burgundy)_28%,transparent)] hover:border-burgundy hover:bg-[color-mix(in_oklab,var(--color-burgundy)_6%,transparent)]",
  // On dark
  light:
    "bg-cream text-cocoa hover:bg-white border border-[color-mix(in_oklab,var(--color-gold)_40%,transparent)]",
};

/**
 * A pill button that leans gently toward the cursor (desktop), with an inner
 * wrapper so the magnetic transform and hover transition never fight.
 */
export default function MagneticButton({
  variant = "solid",
  strength = 0.4,
  className = "",
  children,
  ...rest
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>(strength);
  return (
    <button
      ref={ref}
      data-cursor="hover"
      className={`group relative inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-500 ease-[var(--ease-silk)] will-change-transform ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      <span className="inline-flex items-center gap-2.5 transition-transform duration-500 ease-[var(--ease-silk)] group-hover:scale-[1.03]">
        {children}
      </span>
    </button>
  );
}
