import { cn } from "@/lib/cn";

/** Honest marker shown on every placeholder slot until real work is added. */
export function PlaceholderTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-2 border border-dashed border-line-strong px-2.5 py-1.5 text-[0.75rem] text-muted",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full border border-accent" />
      Placeholder — awaiting project
    </span>
  );
}
