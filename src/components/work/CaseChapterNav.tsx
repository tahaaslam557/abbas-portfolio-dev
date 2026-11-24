"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface ChapterItem {
  id: string;
  index: string;
  label: string;
}

/** Sticky chapter index with scroll-spy. Plain anchor links — works without JS. */
export function CaseChapterNav({ items }: { items: ChapterItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study chapters">
      <p className="label text-dim">Contents</p>
      <ol className="mt-6 space-y-1">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "group flex items-center gap-4 py-2 transition-colors duration-300",
                  on ? "text-ivory" : "text-dim hover:text-muted",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px transition-all duration-500 ease-out-expo",
                    on ? "w-10 bg-accent" : "w-4 bg-line-strong group-hover:w-6",
                  )}
                />
                <span className={cn("label text-[0.75rem]", on && "text-accent")}>{item.index}</span>
                <span className="text-[0.95rem]">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
