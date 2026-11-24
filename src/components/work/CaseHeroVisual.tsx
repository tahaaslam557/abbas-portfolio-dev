"use client";

import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Project } from "@/types/content";
import { cn } from "@/lib/cn";
import { ProjectVisual, visualFrame, visualRatio } from "./ExhibitPlate";

/**
 * Case-study hero.
 * - With a `fullPage` capture: a tall frame that scrolls through the whole page on hover.
 * - Otherwise: the cover exactly as supplied — its own proportions, never cropped.
 * It rises and settles onto the "wall" as you scroll in.
 */
export function CaseHeroVisual({ project, number }: { project: Project; number: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.92, 1]);
  const page = project.fullPage;

  return (
    <div ref={ref} className="shell [perspective:1800px]">
      <motion.figure style={{ rotateX, scale, transformOrigin: "50% 100%" }} className="relative">
        <span aria-hidden="true" className="pointer-events-none absolute -inset-x-10 -bottom-16 top-1/3 -z-10 bg-[radial-gradient(60%_60%_at_50%_100%,rgb(255_90_54/0.14),transparent_70%)] blur-2xl" />

        {page ? (
          <div
            tabIndex={0}
            aria-label={`${page.alt}. Hover or focus to scroll through the full page.`}
            className="dark group relative h-[78vh] overflow-hidden border border-line bg-night text-ivory md:h-[88vh]"
          >
            <Image
              src={page.src}
              alt={page.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top transition-[object-position] duration-[14s] ease-in-out group-hover:object-bottom group-focus-visible:object-bottom motion-reduce:transition-none"
            />
            <span className="label pointer-events-none absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-void/75 px-4 py-2 text-[0.75rem] text-ivory backdrop-blur-md transition-opacity duration-500 group-hover:opacity-0 group-focus-visible:opacity-0">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              Hover to scroll the full page
            </span>
          </div>
        ) : (
          <div style={{ aspectRatio: visualRatio(project) }} className={cn("relative overflow-hidden", visualFrame(project))}>
            <ProjectVisual project={project} priority sizes="100vw" />
          </div>
        )}

        <figcaption className="label mt-4 flex items-center justify-between gap-4 text-[0.75rem] text-dim">
          <span>
            <span className="text-accent">Plate {number}</span> — {project.title}
          </span>
          <span className="hidden sm:inline">{page?.caption ?? project.category}</span>
        </figcaption>
      </motion.figure>
    </div>
  );
}
