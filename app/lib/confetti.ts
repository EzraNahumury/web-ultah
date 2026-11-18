/**
 * Tiny, dependency-free confetti. Gentle by design — warm petals of blush,
 * rose and champagne gold that drift down and fade. Not a firework show.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  life: number;
  maxLife: number;
  shape: "rect" | "circle";
}

const PALETTE = ["#c2a15c", "#dcc18c", "#e9ccc1", "#c18a80", "#9e6159", "#fff3d9"];

export interface ConfettiOptions {
  /** How many petals. Kept modest on purpose. */
  count?: number;
  /** Origin as fractions of canvas size (0–1). Defaults to bottom-centre. */
  originX?: number;
  originY?: number;
  spread?: number;
}

/**
 * Launch one gentle burst onto a canvas. Returns a cancel function.
 * Honours prefers-reduced-motion by drawing a single soft settle instead.
 */
export function launchConfetti(
  canvas: HTMLCanvasElement,
  opts: ConfettiOptions = {},
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
  };
  resize();

  const W = canvas.clientWidth;
  const H = canvas.clientHeight;
  const count = opts.count ?? (reduced ? 24 : 90);
  const ox = (opts.originX ?? 0.5) * W;
  const oy = (opts.originY ?? 0.62) * H;
  const spread = opts.spread ?? 1;

  const particles: Particle[] = Array.from({ length: count }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5 * spread;
    const speed = (reduced ? 2 : 5 + Math.random() * 7) * spread;
    const maxLife = 2600 + Math.random() * 2200;
    return {
      x: ox + (Math.random() - 0.5) * 60,
      y: oy + (Math.random() - 0.5) * 30,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - Math.random() * 3,
      size: 5 + Math.random() * 7,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.2,
      color: PALETTE[(Math.random() * PALETTE.length) | 0],
      life: 0,
      maxLife,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    };
  });

  let raf = 0;
  let last = performance.now();
  const gravity = 0.045;
  const drag = 0.992;

  const frame = (now: number) => {
    const dt = Math.min(48, now - last);
    last = now;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    let alive = 0;
    for (const p of particles) {
      p.life += dt;
      if (p.life >= p.maxLife) continue;
      alive++;
      p.vy += gravity * (dt / 16);
      p.vx *= drag;
      p.x += p.vx * (dt / 16);
      p.y += p.vy * (dt / 16);
      p.rot += p.vr * (dt / 16);

      const fade = 1 - p.life / p.maxLife;
      ctx.globalAlpha = Math.max(0, Math.min(1, fade * 1.4));
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    ctx.restore();

    if (alive > 0) {
      raf = requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  raf = requestAnimationFrame(frame);
  window.addEventListener("resize", resize);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
