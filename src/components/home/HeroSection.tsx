"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { disciplines, site } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MaskLines } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // type drifts up and softens as the visitor leaves the hero — depth, not spectacle
  const yHead = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0]);

  const { hero, objectLabel } = site;
  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section
      ref={ref}
      data-scene="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col"
    >
      <motion.div style={{ opacity: fade }} className="shell relative flex flex-1 flex-col pb-6 pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+3.5rem)]">
        {/* Top metadata row */}
        <div className="flex items-start justify-between gap-6">
          <motion.div {...fadeIn(0.2)} className="label flex items-center gap-4 text-muted">
            <span className="text-accent">A/00</span>
            <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
            <span>{hero.eyebrow}</span>
          </motion.div>
          <motion.p {...fadeIn(0.3)} className="label hidden text-right text-muted sm:block">
            {site.role}
            <span className="mx-2 text-accent">·</span>
            {site.company}
          </motion.p>
        </div>

        {/* Museum wall label for the sculpture */}
        <motion.figure
          {...fadeIn(1.1)}
          className="absolute right-[var(--gutter)] top-[calc(var(--header-h)+6rem)] hidden w-56 border-l border-accent/70 pl-4 lg:block"
        >
          <p className="label text-[0.75rem] text-accent">{objectLabel.number}</p>
          <p className="serif-accent mt-1 text-2xl leading-none text-ivory">{objectLabel.title}</p>
          <p className="label mt-2 text-[0.75rem] leading-relaxed text-dim">{objectLabel.medium}</p>
          <figcaption className="mt-3 text-[0.82rem] leading-snug text-muted">{objectLabel.note}</figcaption>
        </motion.figure>

        {/* Spacer reserves the sculpture's stage on small screens */}
        <div className="min-h-[38svh] flex-1 md:min-h-[24vh]" />

        {/* Headline + intro */}
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <motion.div style={{ y: yHead }} className="lg:col-span-8">
            <MaskLines
              as="h1"
              id="hero-title"
              immediate
              delay={0.35}
              stagger={0.11}
              lines={hero.headline}
              className="display text-[clamp(3.3rem,10.4vw,11.5rem)] text-ivory"
              lineClassName={(i) =>
                cn(
                  i === hero.accentLine && "serif-accent pl-[0.06em] text-[1.08em] leading-[0.86] tracking-[-0.03em]",
                  i === 2 && "lg:pl-[1.6em]",
                )
              }
            />
          </motion.div>

          <div className="flex flex-col gap-8 lg:col-span-4 lg:pb-4">
            <motion.p {...fadeIn(0.9)} className="max-w-md text-[1.06rem] leading-relaxed text-muted">
              {hero.intro}
            </motion.p>
            <motion.div {...fadeIn(1.05)} className="flex flex-wrap items-center gap-3">
              <MagneticButton href={hero.primaryCta.href} cursorLabel="Enter">
                {hero.primaryCta.label}
              </MagneticButton>
              <MagneticButton href={hero.secondaryCta.href} variant="ghost" icon={false}>
                {hero.secondaryCta.label}
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Bottom rail: disciplines + scroll cue */}
        <motion.div
          {...fadeIn(1.3)}
          className="mt-10 flex items-center justify-between gap-6 border-t border-line pt-4"
        >
          <ul className="label hidden flex-wrap gap-x-6 gap-y-2 text-[0.75rem] text-dim md:flex">
            {disciplines.map((d, i) => (
              <li key={d}>
                <span className="mr-1.5 text-accent/80">{String(i + 1).padStart(2, "0")}</span>
                {d}
              </li>
            ))}
          </ul>
          <a href="#work" className="label group flex items-center gap-3 text-[0.75rem] text-muted hover:text-ivory">
            Scroll to enter
            <span aria-hidden="true" className="relative block h-8 w-px overflow-hidden bg-line-strong">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-accent motion-safe:animate-[scrollcue_2.2s_cubic-bezier(0.76,0,0.24,1)_infinite]" />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
