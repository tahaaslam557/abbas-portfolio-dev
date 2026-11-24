import { cn } from "@/lib/cn";

/** Exhibition-style section marker: index · hairline · title. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("label flex items-center gap-4 text-dim", className)}>
      <span className="text-accent">{index}</span>
      <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
      <span className="text-muted">{children}</span>
    </div>
  );
}
