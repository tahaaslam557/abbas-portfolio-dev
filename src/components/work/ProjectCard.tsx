"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { projectNumber } from "@/data/projects";
import { ProjectVisual, visualFrame, visualRatio } from "./ExhibitPlate";
import { PlaceholderTag } from "./PlaceholderTag";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Exhibition card: a tilting frame with a clip-path reveal.
 * Tilt only on fine pointers; focus shows the same metadata as hover.
 */
export function ProjectCard({
  project,
  className,
  sizes,
  headingLevel = "h3",
}: {
  project: Project;
  className?: string;
  sizes?: string;
  headingLevel?: "h2" | "h3";
}) {
  const reduce = usePrefersReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const H = headingLevel;

  return (
    <motion.article
      className={cn("group relative", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6 }}
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor="Open"
        className="block"
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
      >
        <div className="[perspective:1200px]">
          <motion.div
            style={reduce ? undefined : { rotateX: rx, rotateY: ry }}
            initial={{ clipPath: reduce ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.3, ease: EASE }}
            className={cn("relative overflow-hidden [transform-style:preserve-3d]", visualFrame(project))}
          >
            <div style={{ aspectRatio: visualRatio(project) }} className="h-auto w-full">
              <ProjectVisual project={project} sizes={sizes} />
            </div>
            <span
              aria-hidden="true"
              className="absolute bottom-4 right-4 grid size-12 translate-y-3 place-items-center rounded-full bg-accent text-void opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            >
              <ArrowUpRight className="size-5" />
            </span>
          </motion.div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-4">
          <div>
            <p className="label mb-3 text-[0.75rem] text-dim">{projectNumber(project)}</p>
            <H className="display text-[1.9rem] leading-none transition-colors duration-300 group-hover:text-accent">
              {project.title}
            </H>
            <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-muted">{project.shortDescription}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2 text-right">
            <p className="label text-[0.75rem] text-accent">{project.category}</p>
            {project.year && <p className="label text-[0.75rem] text-dim">{project.year}</p>}
          </div>
        </div>
        {project.isPlaceholder && <PlaceholderTag className="mt-4" />}
      </Link>
    </motion.article>
  );
}
