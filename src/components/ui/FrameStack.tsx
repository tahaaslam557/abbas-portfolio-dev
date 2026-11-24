"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Layered hairline planes that fan apart as you scroll past —
 * the archive frames of the 3D scene, rendered in CSS so they also
 * work (and carry the composition) without WebGL.
 */
export function FrameStack({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const spread = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.2, 1, 1.4]);

  const layers = [0, 1, 2, 3];
  return (
    <div ref={ref} aria-hidden="true" className={cn("relative [perspective:1200px]", className)}>
      {layers.map((i) => (
        <Layer key={i} i={i} spread={spread} />
      ))}
      <span className="label absolute -bottom-7 left-0 text-[0.75rem] text-dim">Fig. A — Planes of practice</span>
    </div>
  );
}

function Layer({ i, spread }: { i: number; spread: MotionValue<number> }) {
  const x = useTransform(spread, (s) => i * 26 * s);
  const y = useTransform(spread, (s) => i * -22 * s);
  const z = useTransform(spread, (s) => i * -90 * s);
  return (
    <motion.div
      style={{ x, y, z, rotateY: -18, rotateX: 6 }}
      className={cn(
        "absolute inset-0 border",
        i === 0 ? "border-line-strong bg-ivory/[0.025]" : "border-line",
        i === 2 && "border-accent/50",
      )}
    >
      {i === 0 && (
        <>
          <span className="absolute left-4 top-4 label text-[0.75rem] text-dim">Screen</span>
          <span className="absolute right-4 top-4 label text-[0.75rem] text-dim">Mark</span>
          <span className="absolute bottom-4 left-4 label text-[0.75rem] text-dim">Page</span>
          <span className="absolute bottom-4 right-4 label text-[0.75rem] text-dim">Print</span>
          <span className="absolute left-1/2 top-0 h-full w-px bg-line" />
          <span className="absolute left-0 top-1/2 h-px w-full bg-line" />
        </>
      )}
    </motion.div>
  );
}
