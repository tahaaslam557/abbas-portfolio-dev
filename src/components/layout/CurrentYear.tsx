"use client";

/** Rendered on the client too, so a statically-built page never shows a stale year. */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
