import Experience from "@/app/components/Experience";

// A single-page, client-driven experience. The page itself stays fully static
// (prerendered); all interactivity, timing and randomness live in client
// components, so Cache Components has nothing dynamic to resolve here.
export default function Home() {
  return <Experience />;
}
