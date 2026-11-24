"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PlateVariant, ProjectImage } from "@/types/content";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { PlateArt } from "./ExhibitPlate";

/** Bento rhythm: full-bleed, then asymmetric pairs. */
const SPANS = [
  "md:col-span-12 aspect-[16/9]",
  "md:col-span-7 aspect-[4/3] md:aspect-auto md:min-h-[28rem]",
  "md:col-span-5 aspect-[4/5]",
  "md:col-span-5 aspect-[4/5]",
  "md:col-span-7 aspect-[4/3] md:aspect-auto md:min-h-[28rem]",
];
const spanFor = (i: number) => SPANS[i % SPANS.length]!;

const PLACEHOLDER_VARIANTS: PlateVariant[] = ["web", "app", "brand", "graphic", "print"];

export function CaseGallery({ images, primary }: { images: ProjectImage[]; primary: PlateVariant }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const n = images.length;

  const close = useCallback(() => {
    setOpen(null);
    triggerRef.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  // Placeholder bento — shows the layout the real images will take.
  if (n === 0) {
    const start = PLACEHOLDER_VARIANTS.indexOf(primary);
    return (
      <div className="grid gap-4 md:grid-cols-12 md:gap-6">
        {PLACEHOLDER_VARIANTS.map((_, i) => {
          const v = PLACEHOLDER_VARIANTS[(Math.max(start, 0) + i) % PLACEHOLDER_VARIANTS.length]!;
          return (
            <Reveal key={i} delay={(i % 2) * 0.08} className={cn("relative", spanFor(i))}>
              <figure className="group relative h-full w-full overflow-hidden border border-line bg-panel">
                <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]">
                  <PlateArt variant={v} aspect={i === 0 ? "wide" : "landscape"} />
                </div>
                <figcaption className="label absolute bottom-4 left-4 border border-dashed border-line-strong bg-void/70 px-2.5 py-1.5 text-[0.75rem] text-muted backdrop-blur-sm">
                  Image slot {String(i + 1).padStart(2, "0")}
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </div>
    );
  }

  const current = open === null ? null : images[open]!;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-12 md:gap-6">
        {images.map((img, i) => (
          <Reveal key={img.src} delay={(i % 2) * 0.08} className={cn("relative", spanFor(i))}>
            <figure className="h-full">
              <button
                type="button"
                data-cursor="View"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setOpen(i);
                }}
                aria-label={`Enlarge image ${i + 1}: ${img.alt}`}
                className="group relative block h-full min-h-full w-full overflow-hidden border border-line bg-panel"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={i % SPANS.length === 0 ? "100vw" : "(min-width: 768px) 58vw, 100vw"}
                  className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(8_9_11/0.75))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span aria-hidden="true" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-ivory text-void opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="size-4" />
                </span>
                {img.caption && (
                  <span className="absolute bottom-4 left-4 right-4 translate-y-2 text-left text-sm text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {img.caption}
                  </span>
                )}
              </button>
            </figure>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${open + 1} of ${n}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[90] flex flex-col bg-void/95 backdrop-blur-md"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div className="shell flex items-center justify-between py-5">
              <p className="label text-muted">
                <span className="text-accent">{String(open + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid size-12 place-items-center rounded-full border border-line-strong transition-colors hover:border-accent hover:text-accent"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.src}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none absolute inset-x-[var(--gutter)] inset-y-0 md:inset-x-24"
                >
                  <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              {n > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="absolute left-4 top-1/2 hidden size-14 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-void/60 transition-colors hover:border-accent hover:text-accent md:grid">
                    <ArrowLeft className="size-5" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Next image" className="absolute right-4 top-1/2 hidden size-14 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-void/60 transition-colors hover:border-accent hover:text-accent md:grid">
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="shell flex items-center justify-between gap-6 py-6">
              <p className="text-sm text-muted">{current.caption ?? current.alt}</p>
              {n > 1 && (
                <div className="flex gap-2 md:hidden">
                  <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="grid size-11 place-items-center rounded-full border border-line-strong">
                    <ArrowLeft className="size-4" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Next image" className="grid size-11 place-items-center rounded-full border border-line-strong">
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
