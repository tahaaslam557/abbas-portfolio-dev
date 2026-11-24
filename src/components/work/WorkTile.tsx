"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { projectNumber } from "@/data/projects";
import { cn } from "@/lib/cn";
import { ProjectVisual, visualFrame, visualRatio } from "./ExhibitPlate";
import { PlaceholderTag } from "./PlaceholderTag";

/**
 * Showcase tile: the project image exactly as supplied (own proportions,
 * nothing laid over it), lifting on hover, with the details set beneath.
 */
export function WorkTile({ project, featured = false, className }: { project: Project; featured?: boolean; className?: string }) {
  return (
    <Link href={`/work/${project.slug}`} data-cursor="Open" className={cn("group block", className)}>
      <div
        style={{ aspectRatio: visualRatio(project) }}
        className={cn(
          "relative overflow-hidden transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5 motion-reduce:transform-none",
          visualFrame(project),
        )}
      >
        <ProjectVisual project={project} sizes={featured ? "100vw" : "(min-width: 768px) 60vw, 100vw"} />
      </div>

      <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-5">
        <div className="min-w-0">
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem]">
            <span className="text-accent">{projectNumber(project)}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            <span className="text-muted">{project.category}</span>
            {project.year && <span className="text-dim">· {project.year}</span>}
          </p>
          <h2
            className={cn(
              "display mt-3 transition-colors duration-500 group-hover:text-accent",
              featured ? "text-[clamp(2.6rem,6vw,5.6rem)]" : "text-[clamp(2rem,3.4vw,3.2rem)]",
            )}
          >
            {project.title}
          </h2>
          <p className={cn("mt-3 text-[0.95rem] leading-relaxed text-muted", featured ? "max-w-2xl" : "max-w-md")}>
            {project.shortDescription}
          </p>
          {project.isPlaceholder && <PlaceholderTag className="mt-4" />}
        </div>
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 ease-out-expo group-hover:border-accent group-hover:bg-accent group-hover:text-void md:size-14"
        >
          <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}
