"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type LayerProps = {
  progress: MotionValue<number>;
  from: number;
  to: number;
  children?: React.ReactNode;
};

/** One depth plane — translates on Y as the hero scrolls out of view. */
function Layer({ progress, from, to, children }: LayerProps) {
  const target = useTransform(progress, [0, 1], [from, to]);
  const y = useSpring(target, { stiffness: 60, damping: 20, mass: 0.6 });

  return (
    <motion.div
      style={{ y }}
      className="pointer-events-none absolute inset-0 will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export function ParallaxBackdrop({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const reduceMotion = useReducedMotion();

  // Scroll progress of the hero: 0 = top of page, 1 = hero fully scrolled out
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Mouse parallax — normalized -0.5…0.5, springed for weight
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rawX = useTransform(mx, [-0.5, 0.5], [14, -14]);
  const rawY = useTransform(my, [-0.5, 0.5], [10, -10]);
  const floatX = useSpring(rawX, { stiffness: 50, damping: 20 });
  const floatY = useSpring(rawY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const el = targetRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion, targetRef, mx, my]);

  // Depth multiplier — 0 freezes every plane for reduced-motion users
  const d = reduceMotion ? 0 : 1;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Plane 0 — the sheet: grid + glow, slow drift with scroll */}
      <Layer progress={scrollYProgress} from={0} to={40 * d}>
        <div className="blueprint-grid mask-fade-b absolute inset-0" />
        <div className="hero-glow absolute inset-0" />
      </Layer>

      {/* Floating annotations, each on its own plane */}
      <motion.div
        style={{ x: floatX, y: floatY }}
        className="absolute inset-0 will-change-transform"
      >
        {/* Compass circle — top right, foreground (moves AGAINST scroll) */}
        <Layer progress={scrollYProgress} from={0} to={-70 * d}>
          <div className="absolute right-[10%] top-[16%] h-44 w-44 rounded-full border border-dashed border-accent/20" />
          <div className="absolute right-[16.5%] top-[30%] font-mono text-xs text-accent/40">
            +
          </div>
        </Layer>

        {/* Target crosshair — bottom left, background */}
        <Layer progress={scrollYProgress} from={0} to={90 * d}>
          <div className="absolute bottom-[16%] left-[6%] flex h-24 w-24 items-center justify-center rounded-full border border-accent/15">
            <span className="font-mono text-sm text-accent/50">+</span>
          </div>
        </Layer>

        {/* Scatter marks — top left, mid depth */}
        <Layer progress={scrollYProgress} from={0} to={-35 * d}>
          <span className="absolute left-[14%] top-[22%] font-mono text-sm text-ink-faint/60">
            +
          </span>
          <span className="absolute left-[20%] top-[30%] font-mono text-[10px] text-ink-faint/40">
            +
          </span>
        </Layer>

        {/* Dimension line with end ticks — left edge */}
        <Layer progress={scrollYProgress} from={0} to={60 * d}>
          <div className="absolute bottom-[24%] left-[3%] h-40 w-px bg-line">
            <span className="absolute -left-1 top-0 h-px w-2 bg-line" />
            <span className="absolute -left-1 bottom-0 h-px w-2 bg-line" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.3em] text-ink-faint/70">
              Scale 1:1
            </span>
          </div>
        </Layer>

        {/* Coordinate chip — follows the compass circle */}
        <Layer progress={scrollYProgress} from={0} to={-25 * d}>
          <div className="absolute right-[24%] top-[36%] hidden border border-line bg-canvas/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint backdrop-blur-sm md:block">
            N 24.0031° / E 90.4203°
          </div>
        </Layer>
      </motion.div>
    </div>
  );
}
