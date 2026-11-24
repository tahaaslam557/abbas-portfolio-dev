"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Dot + ring cursor for fine pointers only. Expands over elements with
 * [data-cursor]; shows a label when data-cursor is a word other than "hover".
 * Touch / coarse pointer / reduced motion → native cursor untouched.
 */
export function CustomCursor() {
  const fine = useFinePointer();
  const reduce = usePrefersReducedMotion();
  const enabled = fine && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });
  const [state, setState] = useState<{ active: boolean; label: string | null; visible: boolean }>({
    active: false,
    label: null,
    visible: false,
  });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, [role='button'], input, textarea, select, label",
      );
      const label = target?.dataset.cursor;
      const isField = target?.matches("input, textarea, select");
      setState((s) => {
        const next = {
          active: !!target && !isField,
          label: label && label !== "hover" ? label : null,
          visible: true,
        };
        return s.active === next.active && s.label === next.label && s.visible ? s : next;
      });
    };
    const leave = () => setState((s) => ({ ...s, visible: false }));

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = state.label ? 88 : state.active ? 54 : 30;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        className="absolute left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x, y, opacity: state.visible && !state.label ? 1 : 0 }}
      />
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: state.visible ? 1 : 0,
          borderColor: state.label ? "rgba(255,90,54,0)" : state.active ? "rgba(255,90,54,0.9)" : "rgba(242,239,233,0.35)",
          backgroundColor: state.label ? "rgba(255,90,54,0.95)" : "rgba(255,90,54,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {state.label && <span className="label text-[0.75rem] text-void">{state.label}</span>}
      </motion.div>
    </div>
  );
}
