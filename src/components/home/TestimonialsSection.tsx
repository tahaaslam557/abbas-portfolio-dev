"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/types/content";

const EASE = [0.16, 1, 0.3, 1] as const;

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ t, size = "md" }: { t: Testimonial; size?: "sm" | "md" }) {
  const cls = size === "md" ? "size-14 text-base" : "size-10 text-[0.8rem]";
  if (t.avatar) {
    return (
      <Image
        src={t.avatar}
        alt=""
        width={56}
        height={56}
        className={cn("shrink-0 rounded-full border border-line-strong object-cover", cls)}
      />
    );
  }
  return (
    <span aria-hidden="true" className={cn("grid shrink-0 place-items-center rounded-full border border-line-strong bg-panel-raised font-medium text-ivory", cls)}>
      {initials(t.name)}
    </span>
  );
}

/** Manual (never auto-advancing) quote carousel with a selectable roster. */
export function TestimonialsSection() {
  const [i, setI] = useState(0);
  const reduce = usePrefersReducedMotion();
  const n = testimonials.length;
  if (n === 0) return null;
  const t = testimonials[i]!;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const anyPlaceholder = testimonials.some((x) => x.isPlaceholder);

  return (
    <section aria-labelledby="testimonials-title" className="relative z-10 overflow-hidden py-28 md:py-40">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-[15vw] top-1/4 size-[60vw] max-w-[60rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_90_54/0.08),transparent)]"
      />
      <div className="shell relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="A/05">Kind words</SectionLabel>
            <MaskLines
              id="testimonials-title"
              lines={["Said by the people", <>I’ve <span key="w" className="serif-accent text-accent">worked with.</span></>]}
              className="display mt-8 text-[clamp(2.6rem,5.6vw,5.6rem)]"
            />
          </div>
          <Reveal>
            <p className="max-w-xs leading-relaxed text-muted">
              Clients, collaborators and teams — on the process as much as the result.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-12 lg:gap-16">
          {/* Featured quote */}
          <Reveal className="lg:col-span-8">
            <div className="relative">
              <span aria-hidden="true" className="serif-accent absolute -left-2 -top-16 select-none text-[11rem] leading-none text-accent/25 md:-left-6 md:-top-20 md:text-[14rem]">
                “
              </span>

              <div aria-live="polite" className="relative min-h-[19rem] sm:min-h-[16rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={i}
                    initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -16 }}
                    transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE }}
                  >
                    <blockquote className="text-[clamp(1.45rem,2.6vw,2.35rem)] font-medium leading-[1.25] tracking-[-0.02em] text-ivory">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-10 flex items-center gap-4">
                      <Avatar t={t} />
                      <div>
                        <p className="font-medium text-ivory">{t.name}</p>
                        <p className="text-sm text-muted">
                          {t.role}
                          {t.company && <span className="text-dim"> · {t.company}</span>}
                        </p>
                      </div>
                      {t.isPlaceholder && (
                        <span className="label ml-auto hidden items-center gap-2 border border-dashed border-line-strong px-2.5 py-1.5 text-[0.75rem] text-muted sm:inline-flex">
                          <span aria-hidden="true" className="size-1.5 rounded-full border border-accent" />
                          Sample
                        </span>
                      )}
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="mt-12 flex items-center gap-6">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous testimonial"
                    className="grid size-12 place-items-center rounded-full border border-line-strong transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next testimonial"
                    className="grid size-12 place-items-center rounded-full bg-ivory text-void transition-colors duration-300 hover:bg-accent"
                  >
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex flex-1 items-center gap-2" aria-hidden="true">
                  {testimonials.map((_, k) => (
                    <span key={k} className="relative h-px flex-1 overflow-hidden bg-line-strong">
                      <motion.span
                        className="absolute inset-0 origin-left bg-accent"
                        initial={false}
                        animate={{ scaleX: k <= i ? 1 : 0 }}
                        transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                      />
                    </span>
                  ))}
                </div>
                <p className="label text-dim">
                  <span className="text-ivory">{String(i + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Roster */}
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="label text-dim">All voices</p>
            <ul className="mt-5 border-t border-line">
              {testimonials.map((x, k) => {
                const on = k === i;
                return (
                  <li key={k} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setI(k)}
                      aria-pressed={on}
                      className={cn(
                        "group flex w-full items-center gap-4 py-4 text-left transition-colors duration-300",
                        on ? "text-ivory" : "text-muted hover:text-ivory",
                      )}
                    >
                      <span className={cn("label w-6 text-[0.75rem]", on ? "text-accent" : "text-dim")}>
                        {String(k + 1).padStart(2, "0")}
                      </span>
                      <Avatar t={x} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{x.name}</span>
                        <span className="block truncate text-sm text-dim">
                          {x.role}
                          {x.company && ` · ${x.company}`}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-px transition-all duration-500 ease-out-expo",
                          on ? "w-8 bg-accent" : "w-0 bg-line-strong group-hover:w-4",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
            {anyPlaceholder && (
              <p className="mt-6 text-sm leading-relaxed text-dim">
                Sample slots — real client quotes will replace these once approved.
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
