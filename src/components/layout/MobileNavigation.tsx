"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  // close when the route changes
  useEffect(() => {
    if (lastPath.current !== pathname && open) onClose();
    lastPath.current = pathname;
  }, [pathname, open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const f = Array.from(panel.current.querySelectorAll<HTMLElement>("a, button"));
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[70] flex flex-col bg-void md:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="shell flex items-center justify-between pt-5">
            <span className="display text-[1.35rem] tracking-[-0.05em]">
              Abbas<span className="text-accent">.</span>Ali
            </span>
            <button
              type="button"
              onClick={onClose}
              className="label flex h-11 items-center gap-3 rounded-full border border-line px-4 text-[0.75rem]"
            >
              Close
              <span aria-hidden="true" className="relative block size-3">
                <span className="absolute left-0 top-1/2 h-px w-3 rotate-45 bg-ivory" />
                <span className="absolute left-0 top-1/2 h-px w-3 -rotate-45 bg-accent" />
              </span>
            </button>
          </div>

          <nav aria-label="Mobile" className="shell mt-auto pb-10">
            <ul className="border-t border-line">
              {[{ label: "Home", href: "/" }, ...site.nav].map((item, i) => (
                <motion.li
                  key={item.href}
                  className="border-b border-line"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className="display text-[2.8rem] leading-none">{item.label}</span>
                    <span className="label text-dim">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.p
              className="mt-8 text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {site.role} · {site.company}
            </motion.p>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
