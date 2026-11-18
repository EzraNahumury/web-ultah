"use client";

import React, { useEffect, useRef, useState } from "react";

type Tag =
  | "div"
  | "section"
  | "span"
  | "li"
  | "ul"
  | "figure"
  | "figcaption"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "blockquote"
  | "article";

interface InViewOpts {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/** Attach an IntersectionObserver to an element and track whether it's in view. */
export function useInView<T extends HTMLElement>(opts: InViewOpts = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const once = opts.once ?? true;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      {
        threshold: opts.threshold ?? 0.18,
        rootMargin: opts.rootMargin ?? "0px 0px -8% 0px",
      },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

interface RevealProps {
  as?: Tag;
  className?: string;
  from?: "up" | "left" | "right" | "scale" | "none";
  /** Stagger delay in milliseconds. */
  delay?: number;
  threshold?: number;
  once?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/** A block that fades + slides into place the first time it enters the viewport. */
export function Reveal({
  as = "div",
  className = "",
  from = "up",
  delay = 0,
  threshold,
  once,
  style,
  children,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold, once });
  const props = {
    ref,
    className: `reveal ${inView ? "in-view" : ""} ${className}`.trim(),
    "data-from": from === "up" ? undefined : from,
    style: { ...style, "--d": delay } as React.CSSProperties,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.createElement(as, props as any, children);
}

interface TextRevealProps {
  text: string;
  as?: Tag;
  className?: string;
  /** Per-word stagger in ms. */
  step?: number;
  startDelay?: number;
  threshold?: number;
  style?: React.CSSProperties;
}

/** Headline reveal: each word rises from behind a mask, staggered. */
export function TextReveal({
  text,
  as = "span",
  className = "",
  step = 55,
  startDelay = 0,
  threshold,
  style,
}: TextRevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold, once: true });
  const words = text.split(" ");
  const props = {
    ref,
    className: `${inView ? "in-view" : ""} ${className}`.trim(),
    style,
  };
  const content = words.map((word, i) => (
    <React.Fragment key={i}>
      <span className="line-mask">
        <span style={{ "--d": startDelay + i * step } as React.CSSProperties}>
          {word}
        </span>
      </span>
      {i < words.length - 1 ? " " : null}
    </React.Fragment>
  ));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.createElement(as, props as any, content);
}
