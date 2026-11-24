"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

const MotionLink = motion.create(Link);

type Variant = "solid" | "ghost" | "orb";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  strength?: number;
  icon?: boolean;
  cursorLabel?: string;
};

const styles: Record<Variant, string> = {
  solid:
    "h-14 px-7 bg-ivory text-void hover:bg-accent hover:text-void rounded-full",
  ghost:
    "h-14 px-7 border border-line-strong text-ivory hover:border-ivory rounded-full backdrop-blur-sm",
  orb: "aspect-square w-44 sm:w-52 rounded-full bg-accent text-void justify-center text-center",
};

/**
 * A link with a soft magnetic pull toward the pointer (fine pointers only).
 * Keyboard / touch behaviour is a normal link.
 */
export function MagneticButton({
  href,
  children,
  variant = "solid",
  className,
  strength = 0.32,
  icon = true,
  cursorLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const ix = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const iy = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
    ix.set(dx * strength * 0.35);
    iy.set(dy * strength * 0.35);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
    ix.set(0);
    iy.set(0);
  }

  return (
    <MotionLink
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      data-cursor={cursorLabel ?? "hover"}
      className={cn(
        "group relative inline-flex select-none items-center gap-3 overflow-hidden font-medium tracking-[-0.01em] transition-colors duration-500",
        styles[variant],
        className,
      )}
    >
      <motion.span style={{ x: ix, y: iy }} className="relative z-10 flex items-center gap-3">
        <span className={variant === "orb" ? "display text-2xl sm:text-3xl leading-none" : ""}>
          {children}
        </span>
        {icon && (
          <ArrowUpRight
            aria-hidden="true"
            className={cn(
              "transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-45",
              variant === "orb" ? "absolute -bottom-10 left-1/2 size-6 -translate-x-1/2" : "size-[1.1em]",
            )}
          />
        )}
      </motion.span>
    </MotionLink>
  );
}
