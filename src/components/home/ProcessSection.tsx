"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { processStages } from "@/data/services";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section data-scene="process" aria-labelledby="process-title" className="relative z-10 border-y border-line bg-night/70 py-28 backdrop-blur-[1px] md:py-36">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="A/04">Approach</SectionLabel>
            <MaskLines
              id="process-title"
              lines={[<>From brief <span key="t" className="serif-accent text-muted">to</span> build.</>]}
              className="display mt-8 text-[clamp(2.6rem,5.6vw,5.6rem)]"
            />
          </div>
          <Reveal>
            <p className="max-w-xs leading-relaxed text-muted">Four stages, kept deliberately simple — so the energy goes into the work.</p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-20">
          {/* progress spine */}
          <div aria-hidden="true" className="absolute left-0 right-0 top-0 hidden h-px bg-line md:block">
            <motion.div style={{ scaleX: reduce ? 1 : progress }} className="h-full origin-left bg-accent" />
          </div>
          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {processStages.map((s, i) => (
              <li key={s.index} className="relative md:pt-10">
                <span aria-hidden="true" className="absolute -top-[5px] left-0 hidden size-[11px] rounded-full border border-accent bg-night md:block" />
                <Reveal delay={i * 0.08}>
                  <p className="display outline-type text-[clamp(4.5rem,8vw,7.5rem)] leading-none">{s.index}</p>
                  <h3 className="display -mt-6 text-[2rem] md:-mt-8">{s.title}</h3>
                  <p className="mt-4 max-w-[17rem] leading-relaxed text-muted">{s.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
