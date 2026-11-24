"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

/** Soft rise-and-fade on first view. Reduced motion → plain fade. */
export function Reveal({ delay = 0, y = 28, className, children, ...rest }: RevealProps) {
  const reduce = usePrefersReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduce ? 0.3 : 1.1, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type MaskLinesProps = {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string | ((i: number) => string);
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
  id?: string;
};

/** Line-by-line masked typographic reveal. Text stays real, selectable HTML. */
export function MaskLines({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  immediate = false,
  id,
}: MaskLinesProps) {
  const reduce = usePrefersReducedMotion();
  const Tag = motion[as];
  const variants = {
    hidden: {},
    shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const line = {
    hidden: { y: reduce ? "0%" : "108%", opacity: reduce ? 0 : 1 },
    shown: { y: "0%", opacity: 1, transition: { duration: reduce ? 0.4 : 1.15, ease: EASE } },
  };
  const trigger = immediate
    ? { animate: "shown" as const }
    : { whileInView: "shown" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag id={id} className={className} initial="hidden" variants={variants} {...trigger}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            variants={line}
            className={cn(
              "block will-change-transform",
              typeof lineClassName === "function" ? lineClassName(i) : lineClassName,
            )}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
