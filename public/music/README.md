# Background music goes here 🎵

1. Drop an audio file here, e.g. `public/music/ambient.mp3`.
2. In `data/birthday.ts`, set:

```ts
music: { src: "/music/ambient.mp3", title: "Our song" }
```

Notes:
- `.mp3` is the safest format across browsers (`.m4a`/`.ogg` also work in most).
- Music never autoplays. It can only start after the visitor presses
  **Open Your Surprise** (a browser requirement), and there's a mute toggle
  in the bottom-right corner.
- Leave `src: null` to hide the sound control entirely.
- Use music you have the right to use.
