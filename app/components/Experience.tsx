"use client";

import { useEffect, useRef, useState } from "react";
import birthday from "@/data/birthday";
import { useScrollProgress } from "@/app/lib/hooks";
import Hero from "@/app/components/sections/Hero";
import Memories from "@/app/components/sections/Memories";
import VideoReel from "@/app/components/sections/VideoReel";
import Reasons from "@/app/components/sections/Reasons";
import Letter from "@/app/components/sections/Letter";
import Wish from "@/app/components/sections/Wish";
import Finale from "@/app/components/sections/Finale";
import { SoundOff, SoundOn } from "@/app/components/Icons";

export default function Experience() {
  const { music } = birthday;
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  useScrollProgress(progressRef);

  // Content shows immediately — enable the scroll-reveal engine on mount.
  useEffect(() => {
    document.body.classList.add("exp-ready");
    document.body.classList.remove("is-locked");
    return () => document.body.classList.remove("exp-ready");
  }, []);

  const toggleSound = () => {
    const el = audioRef.current;
    if (!el) return;
    if (soundOn) {
      el.pause();
      setSoundOn(false);
    } else {
      el.volume = 0.6;
      el.play().then(() => setSoundOn(true)).catch(() => setSoundOn(false));
    }
  };

  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden />

      {music.src && <audio ref={audioRef} src={music.src} loop preload="auto" />}

      <main>
        <Hero />
        <Memories />
        <VideoReel />
        <Reasons />
        <Letter />
        <Wish />
        <Finale />
      </main>

      {music.src && (
        <button
          onClick={toggleSound}
          data-cursor="hover"
          aria-label={soundOn ? "Mute music" : "Play music"}
          className="fixed bottom-6 right-6 z-[65] flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-cocoa/70 text-cream backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-gold"
        >
          {soundOn ? (
            <SoundOn className="h-5 w-5" />
          ) : (
            <SoundOff className="h-5 w-5 opacity-70" />
          )}
          {soundOn && (
            <span className="absolute inset-0 -z-10 rounded-full border border-gold/30 anim-floaty" />
          )}
        </button>
      )}
    </>
  );
}
