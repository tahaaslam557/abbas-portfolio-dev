"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Project } from "@/types/content";
import { ProjectVisual } from "./ExhibitPlate";

/** The hero plate starts tilted back in space and settles onto the "wall" as you scroll. */
export function CaseHeroVisual({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.86, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, 0]);

  return (
    <div ref={ref} className="shell [perspective:1800px]">
      <motion.div
        style={{ rotateX, scale, y, transformOrigin: "50% 100%" }}
        className="relative aspect-[16/9] overflow-hidden border border-line-strong bg-panel shadow-[0_80px_160px_-60px_rgb(0_0_0/0.95)]"
      >
        <ProjectVisual project={project} priority sizes="100vw" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgb(8_9_11/0.5))]" />
      </motion.div>
    </div>
  );
}
