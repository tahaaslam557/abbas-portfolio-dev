"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { MobileNavigation } from "./MobileNavigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setCompact(v > 80));

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "shell flex items-center justify-between transition-[padding] duration-700 ease-out-expo",
            compact ? "pt-3" : "pt-5 sm:pt-7",
          )}
        >
          {/* Wordmark */}
          <Link
            href="/"
            className="pointer-events-auto group relative flex items-baseline gap-2"
            aria-label={`${site.name} — home`}
          >
            <span className="display text-[1.35rem] leading-none tracking-[-0.05em]">
              Abbas<span className="text-accent">.</span>Ali
            </span>
            <span
              className={cn(
                "label hidden text-[0.75rem] text-dim transition-all duration-500 md:inline",
                compact ? "translate-x-2 opacity-0" : "opacity-100",
              )}
            >
              Design Archive
            </span>
          </Link>

          {/* Desktop navigation — floats into a smoked-glass capsule once scrolled */}
          <div className="pointer-events-auto hidden items-center gap-3 md:flex">
          <nav aria-label="Primary">
            <div
              className={cn(
                "flex items-center gap-1 rounded-full border p-1.5 transition-all duration-700 ease-out-expo",
                compact
                  ? "border-line bg-night/70 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.18)] dark:shadow-[0_10px_40px_-10px_rgb(0_0_0/0.6)] backdrop-blur-xl"
                  : "border-transparent bg-transparent",
              )}
            >
              <ul className="flex items-center">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-[0.9rem] transition-colors duration-300 hover:text-ivory",
                        isActive(item.href) ? "text-ivory" : "text-muted",
                      )}
                    >
                      {isActive(item.href) && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-panel-raised"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="group ml-1 flex items-center gap-2 rounded-full bg-ivory py-2 pl-4 pr-2 text-[0.9rem] font-medium text-void transition-colors duration-300 hover:bg-accent"
              >
                Let’s talk
                <span className="grid size-6 place-items-center rounded-full bg-void text-ivory transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                  <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                    <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </Link>
            </div>
          </nav>
          <ThemeToggle />
          </div>

          {/* Mobile: theme + menu */}
          <div className="pointer-events-auto flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 items-center gap-3 rounded-full border border-line bg-night/70 pl-4 pr-3 backdrop-blur-xl"
          >
            <span className="label text-[0.75rem]">Menu</span>
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <span className="h-px w-5 bg-ivory" />
              <span className="h-px w-3.5 self-end bg-accent" />
            </span>
          </button>
          </div>
        </div>
      </header>
      <MobileNavigation open={open} onClose={() => setOpen(false)} />
    </>
  );
}
