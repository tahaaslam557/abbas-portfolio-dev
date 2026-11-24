"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { PlateAspect, Project } from "@/types/content";
import { cn } from "@/lib/cn";
import { projectNumber } from "@/data/projects";
import { ProjectVisual, visualFrame, visualRatio, visualShadow } from "./ExhibitPlate";
import { PlaceholderTag } from "./PlaceholderTag";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Frame height drives size; width follows the artwork's own proportion (real images are never cropped). */
const FRAME_H: Record<PlateAspect, string> = {
  wide: "h-[min(46vh,30vw)]",
  landscape: "h-[min(50vh,32vw)]",
  portrait: "h-[min(62vh,40vw)]",
  square: "h-[min(54vh,36vw)]",
};

/**
 * Desktop exhibition corridor. The section is pinned while the visitor
 * scrolls natively; scroll progress walks a virtual camera past
 * floating frames. The active frame comes forward, its neighbours
 * recede into depth. Every frame is a real link; focus brings it forward.
 */
export function SpatialProjectGallery({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const n = projects.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const eased = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.5 });
  // hold briefly at both ends so the first and last exhibits get a moment
  const index = useTransform(eased, [0.04, 0.96], [0, n - 1], { clamp: true });
  const [active, setActive] = useState(0);
  useMotionValueEvent(index, "change", (v) => setActive(Math.round(v)));

  const scrollToIndex = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    const p = 0.04 + (i / Math.max(1, n - 1)) * 0.92;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top + range * p, behavior: reduce ? "auto" : "smooth" });
  };

  const current = projects[active]!;

  return (
    <div ref={ref} className="relative" style={{ height: `${n * 75 + 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* HUD — always tells the visitor what is active and how to open it */}
        <div className="shell relative z-20 grid h-full grid-cols-12 items-center">
          <div className="col-span-4 flex h-full flex-col justify-center gap-8 pt-[var(--header-h)] xl:col-span-3">
            <div className="label flex items-center gap-3 text-dim">
              <span className="display text-[3.6rem] leading-none tracking-[-0.06em] text-ivory">
                {projectNumber(current)}
              </span>
              <span className="pt-5">/ {String(n).padStart(2, "0")}</span>
            </div>

            <div className="relative min-h-[17rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)", transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] } }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className="label text-accent">{current.category}</p>
                  <h3 className="display mt-3 text-[clamp(2.4rem,3.6vw,3.6rem)]">{current.title}</h3>
                  <p className="mt-4 max-w-xs leading-relaxed text-muted">{current.shortDescription}</p>
                  {current.isPlaceholder && <PlaceholderTag className="mt-4" />}
                  <Link
                    href={`/work/${current.slug}`}
                    className="group mt-6 inline-flex items-center gap-3 border-b border-line-strong pb-1 text-ivory transition-colors hover:border-accent"
                  >
                    Open case study
                    <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" aria-hidden="true" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* progress rail */}
            <div className="flex items-center gap-2" role="group" aria-label="Jump to exhibit">
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Show ${p.title}, ${p.category}`}
                  aria-current={i === active ? "true" : undefined}
                  className="group flex h-8 min-w-8 items-center"
                >
                  <span
                    className={
                      "block h-px transition-all duration-500 ease-out-expo " +
                      (i === active ? "w-10 bg-accent" : "w-5 bg-line-strong group-hover:w-7 group-hover:bg-ivory")
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stage */}
        <div className="absolute inset-0 z-10 [perspective:1600px] [perspective-origin:62%_50%]">
          <div className="absolute inset-0 [transform-style:preserve-3d]">
            {projects.map((p, i) => (
              <Frame key={p.slug} project={p} i={i} index={index} onFocus={() => scrollToIndex(i)} />
            ))}
          </div>
        </div>

        {/* floor line for spatial grounding */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[14vh] z-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      </div>
    </div>
  );
}

function Frame({
  project,
  i,
  index,
  onFocus,
}: {
  project: Project;
  i: number;
  index: MotionValue<number>;
  onFocus: () => void;
}) {
  const d = useTransform(index, (v) => i - v); // >0 upcoming, <0 passed
  const x = useTransform(d, (v) => `calc(-50% + ${v * 30 + (v < 0 ? v * 16 : 0)}vw)`);
  const y = useTransform(d, (v) => `calc(-50% + ${Math.abs(v) * -3 + (i % 2 ? 2 : -2) * Math.min(1, Math.abs(v))}vh)`);
  const z = useTransform(d, (v) => -Math.abs(v) * 520);
  const rotateY = useTransform(d, (v) => Math.max(-40, Math.min(40, v * -24)));
  const rotateZ = useTransform(d, (v) => (i % 2 ? 1 : -1) * Math.min(1, Math.abs(v)) * 1.5);
  // passed exhibits clear out quickly so they never sit behind the HUD copy
  const opacity = useTransform(d, (v) => Math.max(0, 1 - Math.max(0, Math.abs(v) - 0.2) * (v < 0 ? 1.6 : 0.55)));
  const brightness = useTransform(d, (v) => `brightness(${Math.max(0.35, 1 - Math.abs(v) * 0.45)})`);
  const numeralX = useTransform(d, (v) => `${v * 12}%`);
  const pointer = useTransform(d, (v) => (Math.abs(v) < 0.5 ? "auto" : "none"));

  return (
    <motion.div
      className="absolute left-[64%] top-1/2 [transform-style:preserve-3d] will-change-transform"
      style={{ x, y, z, rotateY, rotateZ, opacity }}
    >
      {/* numeral floats behind the frame — a second depth layer */}
      <motion.span
        aria-hidden="true"
        style={{ x: numeralX, z: -180 }}
        className="display outline-type pointer-events-none absolute -left-[0.35em] -top-[0.55em] select-none text-[18vw] leading-none"
      >
        {projectNumber(project)}
      </motion.span>

      <motion.div style={{ pointerEvents: pointer }}>
        <Link
          href={`/work/${project.slug}`}
          onFocus={onFocus}
          data-cursor="Open"
          aria-label={`${project.title} — ${project.category}. Open case study`}
          className="dark group relative block text-ivory"
        >
          <span
            style={{ aspectRatio: visualRatio(project) }}
            className={cn(
              "relative block overflow-hidden",
              visualShadow(project),
              FRAME_H[project.plate.aspect],
              visualFrame(project),
            )}
          >
          <motion.div style={{ filter: brightness }} className="h-full w-full">
            <ProjectVisual project={project} sizes="50vw" />
          </motion.div>
          {/* sheen (placeholder plates only — it would outline a transparent image) */}
          {!project.coverImage && (
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgb(242_239_233/0.07)_48%,transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          )}
          </span>
          {/* caption — sits under the artwork, never on it */}
          <span className="mt-4 flex items-center justify-between gap-6">
            <span className="label text-[0.75rem] text-muted">
              {projectNumber(project)} — {project.category}
            </span>
            <span className="label flex translate-y-2 items-center gap-2 text-[0.75rem] text-accent opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              View <ArrowUpRight className="size-3" aria-hidden="true" />
            </span>
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
