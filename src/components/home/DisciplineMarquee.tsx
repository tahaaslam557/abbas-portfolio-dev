"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { disciplines } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Typographic band between hero and work. It moves only while the
 * visitor scrolls (never on its own), so there is no perpetual motion to
 * pause (WCAG 2.2.2) and it is fully static for reduced-motion users.
 */
export function DisciplineMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-28%"]);
  const items = [...disciplines, ...disciplines];

  return (
    <div ref={ref} className="relative z-10 overflow-hidden border-y border-line bg-void/40 py-6 backdrop-blur-[2px]" aria-hidden="true">
      <motion.div style={{ x }} className="flex w-max items-center">
        {items.map((d, i) => (
          <span key={i} className="flex items-center">
            <span className={i % 2 ? "display px-8 text-[clamp(2rem,4.6vw,4.4rem)] text-ivory/90" : "serif-accent px-8 text-[clamp(2.2rem,5vw,4.8rem)] text-ivory/60"}>
              {d}
            </span>
            <svg viewBox="0 0 20 20" className="size-4 shrink-0 text-accent" aria-hidden="true">
              <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
