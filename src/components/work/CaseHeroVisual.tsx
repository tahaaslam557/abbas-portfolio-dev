"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Project } from "@/types/content";
import { ProjectVisual } from "./ExhibitPlate";

/**
 * The hero plate is mounted like a framed exhibit: it tilts up out of the
 * floor and settles onto the wall, while the artwork drifts inside its mat.
 */
export function CaseHeroVisual({ project, number }: { project: Project; number: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(enter, [0, 1], reduce ? [0, 0] : [18, 0]);
  const scale = useTransform(enter, [0, 1], reduce ? [1, 1] : [0.88, 1]);
  const innerY = useTransform(pass, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <div ref={ref} className="shell [perspective:1800px]">
      <motion.figure style={{ rotateX, scale, transformOrigin: "50% 100%" }} className="relative">
        {/* glow */}
        <span aria-hidden="true" className="pointer-events-none absolute -inset-x-10 -bottom-16 top-1/3 -z-10 bg-[radial-gradient(60%_60%_at_50%_100%,rgb(255_90_54/0.16),transparent_70%)] blur-2xl" />
        {/* mat */}
        <div className="border border-line-strong bg-gradient-to-b from-panel-raised to-panel p-2 shadow-[0_80px_160px_-60px_rgb(0_0_0/0.95)] sm:p-3 md:p-4">
          <div className="relative aspect-[4/3] overflow-hidden bg-night sm:aspect-[16/9]">
            <motion.div style={{ y: innerY }} className="absolute -inset-y-[7%] inset-x-0">
              <ProjectVisual project={project} priority sizes="100vw" />
            </motion.div>
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_65%,rgb(8_9_11/0.45))]" />
          </div>
        </div>
        {/* plaque */}
        <figcaption className="label mt-4 flex items-center justify-between gap-4 text-[0.75rem] text-dim">
          <span>
            <span className="text-accent">Plate {number}</span> — {project.title}
          </span>
          <span className="hidden sm:inline">{project.category}</span>
        </figcaption>
      </motion.figure>
    </div>
  );
}
