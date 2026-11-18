"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  getCountdown,
  getNextBirthday,
  isBirthdayToday,
  type CountdownParts,
} from "./date";

/** True when the user prefers reduced motion. Updates live. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** True once we know we're on a device with a fine pointer (mouse). */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

export interface CountdownState {
  ready: boolean; // hydrated on client
  isToday: boolean;
  upcoming: boolean;
  parts: CountdownParts;
}

/** Live countdown to the next birthday. Ticks every second on the client only. */
export function useCountdown(month: number, day: number): CountdownState {
  const [state, setState] = useState<CountdownState>({
    ready: false,
    isToday: false,
    upcoming: false,
    parts: { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 },
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const today = isBirthdayToday(month, day, now);
      const target = getNextBirthday(month, day, now);
      const parts = getCountdown(target, now);
      setState({ ready: true, isToday: today, upcoming: !today, parts });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [month, day]);

  return state;
}

/**
 * Magnetic hover effect — the element eases toward the cursor while hovered.
 * Disabled automatically for coarse pointers / reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(
  strength = 0.35,
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !fine) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const render = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(render);
      } else {
        raf = 0;
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength, reduced, fine]);

  return ref;
}

/** Drives the thin scroll-progress bar (0–1) via a CSS variable, no re-renders. */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}
