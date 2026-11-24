"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { projectNumber } from "@/data/projects";
import { cn } from "@/lib/cn";
import { ProjectVisual } from "./ExhibitPlate";

/**
 * Showcase tile: full-bleed artwork, info set on the image, a soft
 * spotlight that follows the pointer, and a description that rises on hover/focus.
 */
export function WorkTile({ project, featured = false, className }: { project: Project; featured?: boolean; className?: string }) {
  const Heading = "h2";
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="Open"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "group relative isolate flex h-full w-full flex-col justify-between overflow-hidden border border-line bg-panel p-5 transition-colors duration-500 hover:border-line-strong md:p-7",
        className,
      )}
    >
      {/* Artwork */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 scale-[1.06] transition-transform duration-[1.6s] ease-out-expo group-hover:scale-100">
        <ProjectVisual project={project} sizes={featured ? "100vw" : "(min-width: 768px) 60vw, 100vw"} />
      </div>
      {/* Legibility + spotlight */}
      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(8_9_11/0.35)_0%,transparent_30%,transparent_45%,rgb(8_9_11/0.92)_100%)]" />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(255 90 54 / 0.16), transparent 60%)" }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="label rounded-full border border-line-strong bg-void/60 px-3 py-1.5 text-[0.75rem] text-ivory backdrop-blur-md">
            {projectNumber(project)}
          </span>
          <span className="label rounded-full bg-void/60 px-3 py-1.5 text-[0.75rem] text-muted backdrop-blur-md">
            {project.category}
          </span>
        </div>
        {project.isPlaceholder ? (
          <span className="label inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong bg-void/60 px-3 py-1.5 text-[0.75rem] text-muted backdrop-blur-md">
            <span aria-hidden="true" className="size-1.5 rounded-full border border-accent" />
            Placeholder
          </span>
        ) : (
          project.year && <span className="label rounded-full bg-void/60 px-3 py-1.5 text-[0.75rem] text-muted backdrop-blur-md">{project.year}</span>
        )}
      </div>

      {/* Bottom */}
      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0">
          <Heading
            className={cn(
              "display transition-transform duration-700 ease-out-expo md:group-hover:-translate-y-1",
              featured ? "text-[clamp(2.8rem,7vw,7rem)]" : "text-[clamp(2.2rem,4vw,3.6rem)]",
            )}
          >
            {project.title}
          </Heading>
          <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-700 ease-out-expo md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 md:group-focus-visible:grid-rows-[1fr] md:group-focus-visible:opacity-100">
            <p className={cn("overflow-hidden text-[0.95rem] leading-relaxed text-muted", featured ? "max-w-xl" : "max-w-md")}>
              <span className="block pt-3">{project.shortDescription}</span>
            </p>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong bg-void/50 text-ivory backdrop-blur-md transition-all duration-500 ease-out-expo group-hover:border-accent group-hover:bg-accent group-hover:text-void md:size-14"
        >
          <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}
