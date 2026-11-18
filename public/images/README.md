# Your photos go here 📷

Drop your image files into this folder, then point to them in
`data/birthday.ts` under `memories.photos`.

Example:

```ts
{ src: "/images/moment-01.jpg", caption: "Golden hour, and you.", tag: "No. 01", alt: "Us at sunset" }
```

- A path of `"/images/your-file.jpg"` maps to `public/images/your-file.jpg`.
- Leave `src: null` to show an elegant placeholder until you add a photo.
- Portrait images (roughly 4:5) fit the frames best. JPG, PNG, or WebP.
- Keep files reasonably sized (ideally under ~1–2 MB each) so the page loads fast.
