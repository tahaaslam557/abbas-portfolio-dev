"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-ivory"
    >
      Back to top
      <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-all duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:border-accent group-hover:bg-accent group-hover:text-void">
        <ArrowUp className="size-4" aria-hidden="true" />
      </span>
    </button>
  );
}
