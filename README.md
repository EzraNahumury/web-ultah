# A Little Universe 🌙

A personal, cinematic **birthday experience** — not a greeting-card page. A warm,
editorial, scroll-driven story built to feel handcrafted: an opening surprise,
a hero with a live countdown, a memory gallery, flip-cards of little reasons, a
sealed letter that opens, a cake you blow out, and an emotional finale.

> **Theme:** *"A Little Universe Made Just for You."*

---

## ✨ Everything you edit lives in one file

Open **[`data/birthday.ts`](data/birthday.ts)** and change the text. That's it.
Lines marked `✏️` are the ones you'll most likely want to change:

| What | Where in `data/birthday.ts` |
| --- | --- |
| Her name / your name | `recipientName`, `senderName` |
| The birthday (drives the countdown) | `birthday.month`, `birthday.day`, `birthday.displayDate` |
| Hero greeting + subheadline | `hero` |
| Memory photos + captions | `memories.photos` |
| Reasons (flip-cards) | `reasons.items` |
| The letter | `letter.greeting`, `letter.paragraphs`, `letter.signoff` |
| Wish message + candle count | `wish` |
| Final message | `finale` |
| Background music | `music.src` |

Nothing in the file is a real name, date, memory or story — they're placeholders.
**Rewrite them in your own words.**

---

## 🚀 Run it

```bash
npm install      # first time only (deps are already installed here)
npm run dev      # start the dev server → http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Requires Node.js 18.18+ (Node 20+ recommended).

---

## 📷 Add your photos

1. Drop image files into `public/images/` (portrait ~4:5 looks best).
2. Point to them in `data/birthday.ts`:

   ```ts
   memories: {
     photos: [
       { src: "/images/sunset.jpg", caption: "Golden hour, and you.", tag: "No. 01", alt: "Us at sunset" },
       // ...
     ],
   }
   ```

- `src: "/images/sunset.jpg"` → the file `public/images/sunset.jpg`.
- Leave `src: null` to show an elegant placeholder until you add a photo.
- Images open in a lightbox (arrow keys / swipe-friendly buttons to navigate).

## 🎵 Add background music

1. Put an audio file in `public/music/`, e.g. `public/music/ambient.mp3`.
2. Set it in `data/birthday.ts`:

   ```ts
   music: { src: "/music/ambient.mp3", title: "Our song" }
   ```

Music **never autoplays** — it starts only when the visitor presses *Open Your
Surprise* (a browser rule), and there's a mute toggle in the bottom-right.
Leave `src: null` to hide the sound control.

---

## 🎨 Customize colors & fonts

All design tokens live at the top of **[`app/globals.css`](app/globals.css)** in the
`@theme` block (Tailwind CSS v4 — no `tailwind.config.js` needed):

```css
@theme {
  --color-ivory-soft: #fbf6ee;   /* page background        */
  --color-blush:      #e9ccc1;   /* soft accent            */
  --color-rose:       #c18a80;   /* muted rose             */
  --color-burgundy:   #4b1e27;   /* deep contrast          */
  --color-cocoa:      #241613;   /* dark sections          */
  --color-gold:       #c2a15c;   /* champagne-gold details */
  /* fonts */
  --font-display: var(--font-cormorant), serif;   /* headlines   */
  --font-sans:    var(--font-manrope), sans-serif; /* body        */
  --font-hand:    var(--font-caveat), cursive;     /* signatures  */
}
```

Change a hex value and the whole site updates. To swap a font, edit the imports
in **[`app/layout.tsx`](app/layout.tsx)** (uses `next/font/google`, self-hosted, no layout shift).

---

## 🧱 Tech & structure

- **Next.js 16** (App Router, Cache Components) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme`)
- **Zero animation dependencies** — motion is hand-built with CSS, the Web
  Animations API, `IntersectionObserver` and a tiny `<canvas>` confetti, so the
  bundle stays small and `prefers-reduced-motion` is fully respected.

```
app/
├─ layout.tsx            Fonts, metadata, <html> shell
├─ page.tsx              Static server page → renders <Experience/>
├─ globals.css           Design system: tokens, keyframes, reveal engine
├─ lib/
│  ├─ date.ts            Countdown math (pure)
│  ├─ hooks.ts           reduced-motion, countdown, magnetic, scroll progress
│  └─ confetti.ts        Dependency-free canvas confetti
└─ components/
   ├─ Experience.tsx     Orchestrator: opening → unlock → reveals, audio, cursor
   ├─ Reveal.tsx         Scroll-reveal + word-by-word text reveal
   ├─ CustomCursor.tsx   Soft trailing cursor (desktop only)
   ├─ MagneticButton.tsx Buttons that lean toward the cursor
   ├─ DarkAmbient.tsx    Drifting glow backdrop for dark sections
   ├─ Icons.tsx          Inline line icons
   └─ sections/
      ├─ Opening.tsx     01 · the surprise
      ├─ Hero.tsx        02 · Happy Birthday + countdown
      ├─ Memories.tsx    03 · gallery + lightbox
      ├─ Reasons.tsx     04 · flip-cards
      ├─ Letter.tsx      05 · the letter
      ├─ Wish.tsx        06 · cake + candles + confetti
      └─ Finale.tsx      07 · the ending

data/birthday.ts         ← 💌 all your content
public/images/           ← your photos
public/music/            ← your music
```

**Why no Framer Motion?** The brief asked for a handcrafted feel and no
unnecessary dependencies. Custom CSS/JS gives finer control over the pacing and
keeps the page fast on mobile. If you'd rather use a library later, add it with
`npm install motion` and swap the `Reveal` component.

---

## ☁️ Deploy

Easiest is **[Vercel](https://vercel.com/new)**: push this folder to a Git repo,
import it, and deploy — no configuration needed. Any Node host works too:

```bash
npm run build && npm run start
```

Built with love. Make it yours. 💛
