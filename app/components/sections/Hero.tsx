"use client";

import Image from "next/image";
import birthday from "@/data/birthday";
import { Reveal, TextReveal } from "@/app/components/Reveal";
import AutoVideo from "@/app/components/AutoVideo";
import Ballpit from "@/app/components/Ballpit";
import { useCountdown } from "@/app/lib/hooks";
import { ArrowDown } from "@/app/components/Icons";

function CountdownCell({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center px-3 sm:px-5">
      <span className="font-display text-4xl font-medium tabular-nums text-burgundy sm:text-5xl">
        {display}
      </span>
      <span className="eyebrow mt-2 text-[0.58rem] text-rose-deep/80">{label}</span>
    </div>
  );
}

export default function Hero() {
  const { hero, recipientName, birthday: date } = birthday;
  const { ready, upcoming, isToday, parts } = useCountdown(date.month, date.day);
  const hasImage = Boolean(hero.imageSrc);
  const hasVideo = !hasImage && Boolean(hero.videoSrc);
  const hasMedia = hasImage || hasVideo;

  return (
    <section
      data-theme="light"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ivory-soft py-28"
    >
      {/* Interactive ballpit background (React Bits, open-source WebGL) */}
      <div className="absolute inset-0" aria-hidden>
        <Ballpit
          className="h-full w-full"
          count={90}
          colors={["#c18a80", "#9e6159", "#c2a15c", "#e9ccc1", "#b5806f"]}
          material="satin"
          gravity={0}
          drift={0.5}
          followCursor
          grab
          clickEffect="burst"
          minSize={0.4}
          maxSize={1.2}
          lightColor="#fff6e6"
        />
      </div>

      <div
        className={`wrap relative z-10 grid items-center gap-12 ${
          hasMedia ? "lg:grid-cols-12" : ""
        }`}
      >
        {/* Text column */}
        <div className={hasMedia ? "lg:col-span-7" : ""}>
          <Reveal as="p" className="eyebrow text-rose-deep" from="none">
            <span className="gold-shimmer">{date.displayDate}</span>
            <span className="mx-3 text-gold/60">·</span>
            <span className="text-espresso/70">a day just for you</span>
          </Reveal>

          <h1 className="mt-6">
            <TextReveal
              as="span"
              text={hero.greetingPrefix}
              className="display-fluid block text-[clamp(2.4rem,8vw,5rem)] text-espresso"
              step={70}
            />
            <TextReveal
              as="span"
              text={recipientName}
              className="display-fluid mt-1 block text-[clamp(2.8rem,11vw,7rem)] italic text-burgundy"
              step={90}
              startDelay={240}
            />
          </h1>

          <Reveal
            as="p"
            delay={500}
            className="mt-7 max-w-md text-lg leading-relaxed text-espresso/75 sm:text-xl"
          >
            {hero.subheadline}
          </Reveal>

          <div className="mt-12 min-h-[7rem]">
            {ready && upcoming && (
              <Reveal className="inline-block" from="scale">
                <p className="eyebrow mb-4 text-espresso/55">
                  Counting down to {date.displayDate}
                </p>
                <div className="flex items-stretch divide-x divide-gold/25 rounded-2xl border border-gold/20 bg-white/40 py-4 backdrop-blur-sm">
                  <CountdownCell value={parts.days} label="Days" />
                  <CountdownCell value={parts.hours} label="Hours" />
                  <CountdownCell value={parts.minutes} label="Minutes" />
                  <CountdownCell value={parts.seconds} label="Seconds" />
                </div>
              </Reveal>
            )}
            {ready && isToday && (
              <Reveal className="inline-flex items-center gap-4" from="scale">
                <span className="h-px w-10 bg-gold/50" />
                <p className="font-display text-2xl italic text-rose-deep sm:text-3xl">
                  The day is finally here.
                </p>
                <span className="h-px w-10 bg-gold/50" />
              </Reveal>
            )}
          </div>
        </div>

        {/* Media column */}
        {hasMedia && (
          <Reveal from="right" delay={300} className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[18rem] sm:max-w-xs">
              {/* soft echo + ring for depth */}
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] border border-gold/20" />
              <div
                className="absolute -right-6 -top-6 -z-10 h-24 w-24 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--color-gold-soft) 70%, transparent), transparent 70%)",
                }}
              />
              <div className="anim-floaty relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-gold/30 bg-black shadow-[0_50px_90px_-45px_rgba(74,30,39,0.65)]">
                {hasImage ? (
                  <Image
                    src={hero.imageSrc as string}
                    alt={`A moment with ${recipientName}`}
                    fill
                    priority
                    sizes="(max-width:1024px) 60vw, 20rem"
                    className="object-cover"
                  />
                ) : (
                  <AutoVideo
                    src={hero.videoSrc as string}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/35 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-cream/30 bg-cocoa/35 px-3 py-1 font-hand text-lg leading-none text-cream backdrop-blur-sm">
                  us, lately
                </span>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      <Reveal
        delay={900}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-espresso/45"
        from="none"
      >
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <ArrowDown className="h-5 w-5 animate-bounce" style={{ animationDuration: "2.4s" }} />
      </Reveal>
    </section>
  );
}
