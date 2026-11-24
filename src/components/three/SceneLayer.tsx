"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useSceneCapability } from "@/hooks/useSceneCapability";
import type { PoseMap } from "@/lib/scene";
import { cn } from "@/lib/cn";
import { SceneFallback } from "./SceneFallback";

// WebGL only exists in the browser — the canvas is code-split and never SSR'd.
const ExperienceCanvas = dynamic(() => import("./ExperienceCanvas"), { ssr: false });

type SceneLayerProps = {
  poses: { desktop: PoseMap; mobile: PoseMap };
};

/**
 * Fixed, non-interactive backdrop that hosts the signature sculpture.
 * - Poster renders immediately (no layout shift, no blank canvas).
 * - WebGL fades in once compiled; poster fades out.
 * - No WebGL → poster stays. Reduced motion → static object, no scroll choreography.
 */
export function SceneLayer({ poses }: SceneLayerProps) {
  const tier = useSceneCapability();
  const reduce = usePrefersReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  const [ready, setReady] = useState(false);

  const showCanvas = tier === "lite" || tier === "full";
  const map = mobile ? poses.mobile : poses.desktop;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none inset-0 z-0 overflow-hidden",
        // static modes stay with the hero instead of following the reader
        reduce || tier === "none" ? "absolute h-[100svh]" : "fixed",
      )}
    >
      <SceneFallback
        className={cn(
          "absolute transition-opacity duration-1000",
          mobile
            ? "left-1/2 top-[8%] h-[46svh] w-[110vw] -translate-x-1/2"
            : "right-[3vw] top-[14%] h-[56vh] w-[44vw]",
          ready ? "opacity-0" : "opacity-100",
          tier === "pending" && "opacity-60",
        )}
      />
      {showCanvas && (
        <div className={cn("absolute inset-0 transition-opacity duration-[1600ms]", ready ? "opacity-100" : "opacity-0")}>
          <ExperienceCanvas poses={map} tier={tier} animate={!reduce} onReady={() => setReady(true)} />
        </div>
      )}
      {/* vignette keeps type legible over any pose */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(var(--void-rgb)/0.7)_100%)]" />
    </div>
  );
}
