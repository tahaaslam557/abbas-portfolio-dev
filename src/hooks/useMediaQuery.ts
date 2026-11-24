"use client";

import { useSyncExternalStore } from "react";

/** SSR-safe media query hook. Returns `fallback` on the server. */
export function useMediaQuery(query: string, fallback = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}

export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)", true);
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)", false);
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)", false);
