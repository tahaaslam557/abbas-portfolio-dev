"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowUpRight, LayoutGrid, List } from "lucide-react";
import type { Project } from "@/types/content";
import { projectNumber } from "@/data/projects";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { WorkTile } from "./WorkTile";
import { ProjectVisual, visualFrame, visualRatio, visualShadow } from "./ExhibitPlate";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Rhythm: a featured full-width project, then alternating 7/5 · 5/7 columns. Heights follow each image. */
function spanFor(i: number, total: number) {
  if (i === 0) return "md:col-span-12";
  const isLastOdd = i === total - 1 && (total - 1) % 2 === 1;
  if (isLastOdd) return "md:col-span-8 md:col-start-3";
  const k = (i - 1) % 4;
  return k === 0 || k === 3 ? "md:col-span-7" : "md:col-span-5";
}

type View = "grid" | "list";

export function WorkIndex({ projects }: { projects: Project[] }) {
  const reduce = usePrefersReducedMotion();
  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), [projects]);
  const [filter, setFilter] = useState<string | null>(null);
  const [view, setView] = useState<View>("grid");
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
    <section aria-label="Projects">
      {/* Toolbar */}
      <div className="shell">
        <div className="flex flex-col gap-6 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between">
          {categories.length > 1 ? (
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0" role="group" aria-label="Filter by discipline">
              {[null, ...categories].map((c) => {
                const on = filter === c;
                const n = c ? projects.filter((p) => p.category === c).length : projects.length;
                return (
                  <button
                    key={c ?? "all"}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(c)}
                    className={cn(
                      "relative isolate shrink-0 rounded-full px-4 py-2.5 text-[0.95rem] transition-colors duration-300",
                      on ? "text-void" : "text-muted hover:text-ivory",
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="work-filter-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-ivory"
                      />
                    )}
                    {!on && <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-full border border-line" />}
                    {c ?? "All work"}
                    <span className={cn("ml-2 text-[0.75rem] tabular-nums", on ? "text-void/60" : "text-accent")}>{String(n).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-4">
            <p className="label text-[0.75rem] text-dim" aria-live="polite">
              Showing <span className="text-ivory">{String(visible.length).padStart(2, "0")}</span>
            </p>
            <div className="flex rounded-full border border-line p-1" role="group" aria-label="Layout">
              {(
                [
                  { v: "grid", label: "Grid view", Icon: LayoutGrid },
                  { v: "list", label: "List view", Icon: List },
                ] as const
              ).map(({ v, label, Icon }) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  aria-label={label}
                  onClick={() => setView(v)}
                  className={cn(
                    "grid size-10 place-items-center rounded-full transition-colors duration-300",
                    view === v ? "bg-panel-raised text-ivory" : "text-dim hover:text-ivory",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {view === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="shell mt-10"
          >
            <motion.ul layout={!reduce} className="grid items-start gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-24">
              <AnimatePresence mode="popLayout">
                {visible.map((p, i) => (
                  <motion.li
                    key={p.slug}
                    layout={!reduce}
                    initial={{ opacity: 0, y: reduce ? 0 : 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                    transition={{ duration: reduce ? 0.2 : 0.8, ease: EASE, delay: reduce ? 0 : Math.min(i, 4) * 0.06 }}
                    className={spanFor(i, visible.length)}
                  >
                    <WorkTile project={p} featured={i === 0} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mt-6">
            <IndexList projects={visible} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
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
          <span className="col-span-6">Project</span>
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
                className="group relative isolate grid grid-cols-12 items-center gap-x-6 gap-y-1 py-6 md:py-8"
              >
                <span aria-hidden="true" className="absolute inset-x-[calc(var(--gutter)*-1)] inset-y-0 -z-10 origin-bottom scale-y-0 bg-panel transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
                {/* Mobile thumbnail */}
                <span aria-hidden="true" style={{ aspectRatio: visualRatio(p) }} className={cn("col-span-3 row-span-2 self-center overflow-hidden md:hidden", visualFrame(p))}>
                  <ProjectVisual project={p} sizes="25vw" />
                </span>
                <span className="label col-span-9 text-accent md:col-span-1">{projectNumber(p)}</span>
                <span className="display col-span-9 text-[clamp(2rem,4.4vw,4.4rem)] leading-none transition-transform duration-700 ease-out-expo group-hover:translate-x-4 md:col-span-6">
                  {p.title}
                </span>
                <span className="col-span-9 col-start-4 text-muted md:col-span-3 md:col-start-auto">{p.category}</span>
                <span className="label col-span-12 hidden items-center justify-end gap-3 text-[0.75rem] text-dim md:col-span-2 md:flex">
                  {p.isPlaceholder ? "Placeholder" : p.year ?? "Case study"}
                  <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-void">
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {fine && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 w-[24rem]"
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
                style={{ aspectRatio: visualRatio(hovered) }}
                className={cn("absolute bottom-0 w-full overflow-hidden", visualFrame(hovered), visualShadow(hovered))}
              >
                <ProjectVisual project={hovered} sizes="24rem" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
