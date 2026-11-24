"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { projectNumber } from "@/data/projects";
import { useFinePointer } from "@/hooks/useMediaQuery";
import { ProjectCard } from "./ProjectCard";
import { ASPECT, ProjectVisual } from "./ExhibitPlate";
import { cn } from "@/lib/cn";

const GRID_LAYOUT = [
  "md:col-span-7",
  "md:col-span-5 md:mt-40",
  "md:col-span-5 md:col-start-2",
  "md:col-span-6 md:mt-24",
  "md:col-span-6 md:col-start-4",
  "md:col-span-5 md:col-start-8 md:-mt-24",
];

/** Filters only appear once there's enough work for them to be useful. */
const MIN_FOR_FILTERS = 8;

export function WorkIndex({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), [projects]);
  const showFilters =
    projects.length >= MIN_FOR_FILTERS &&
    categories.some((c) => projects.filter((p) => p.category === c).length > 1);
  const [filter, setFilter] = useState<string | null>(null);
  const visible = filter ? projects.filter((p) => p.category === filter) : projects;

  if (projects.length === 0) {
    return (
      <div className="shell py-32">
        <div className="border border-dashed border-line-strong p-10">
          <p className="display text-3xl">The archive is being curated.</p>
          <p className="mt-4 max-w-lg text-muted">
            Add projects to <code className="text-ivory">src/data/projects.ts</code> and their images to{" "}
            <code className="text-ivory">public/projects/&lt;slug&gt;/</code> — they will appear here automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showFilters && (
        <div className="shell mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-3" role="group" aria-label="Filter by discipline">
          {[null, ...categories].map((c) => (
            <button
              key={c ?? "all"}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "display text-2xl transition-colors",
                filter === c ? "text-ivory" : "text-dim hover:text-muted",
              )}
            >
              {c ?? "Everything"}
              <sup className="label ml-1 text-[0.75rem] text-accent">
                {c ? projects.filter((p) => p.category === c).length : projects.length}
              </sup>
            </button>
          ))}
        </div>
      )}

      <IndexList projects={visible} />

      <div className="shell mt-32">
        <p className="label mb-12 text-dim">Exhibition view</p>
        <ul className="grid gap-x-10 gap-y-24 md:grid-cols-12">
          {visible.map((p, i) => (
            <li key={p.slug} className={GRID_LAYOUT[i % GRID_LAYOUT.length]}>
              <ProjectCard project={p} sizes="(min-width: 768px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/** Typographic index with a floating preview that follows the cursor. */
function IndexList({ projects }: { projects: Project[] }) {
  const fine = useFinePointer();
  const [hovered, setHovered] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28 });
  const sy = useSpring(y, { stiffness: 260, damping: 28 });

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <div className="shell">
        <div className="label hidden grid-cols-12 gap-6 border-b border-line pb-3 text-[0.75rem] text-dim md:grid">
          <span className="col-span-1">No.</span>
          <span className="col-span-6">Exhibit</span>
          <span className="col-span-3">Discipline</span>
          <span className="col-span-2 text-right">Status</span>
        </div>
        <ul>
          {projects.map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link
                href={`/work/${p.slug}`}
                data-cursor="Open"
                onPointerEnter={() => setHovered(p)}
                onFocus={() => setHovered(null)}
                className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-1 py-6 md:py-7"
              >
                <span className="label col-span-2 text-accent md:col-span-1">{projectNumber(p)}</span>
                <span className="display col-span-10 text-[clamp(2rem,4.4vw,4rem)] leading-none transition-transform duration-700 ease-out-expo group-hover:translate-x-4 md:col-span-6">
                  {p.title}
                </span>
                <span className="col-span-10 col-start-3 text-muted md:col-span-3 md:col-start-auto">{p.category}</span>
                <span className="label col-span-12 hidden items-center justify-end gap-2 text-[0.75rem] text-dim md:col-span-2 md:flex">
                  {p.isPlaceholder ? "Placeholder" : p.year ?? "Case study"}
                  <ArrowUpRight className="size-4 text-ivory opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {fine && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 w-[22rem]"
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-115%" }}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                key={hovered.slug}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className={cn("absolute bottom-0 w-full overflow-hidden border border-line-strong bg-panel shadow-2xl", ASPECT[hovered.plate.aspect].css)}
              >
                <ProjectVisual project={hovered} sizes="22rem" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
