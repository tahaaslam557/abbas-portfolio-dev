"use client";

import { useEffect, useState } from "react";

export type SceneTier = "pending" | "none" | "lite" | "full";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ??
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * Decides how much 3D a device should get.
 *  - "none": no WebGL (or ?webgl=0 for testing) → static art-directed poster
 *  - "lite": small screens / low-power hints → simplified sculpture, low DPR
 *  - "full": desktop experience
 */
export function useSceneCapability(): SceneTier {
  const [tier, setTier] = useState<SceneTier>("pending");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let next: SceneTier;
    if (params.get("webgl") === "0" || !detectWebGL()) {
      next = "none";
    } else {
      const nav = navigator as Navigator & { deviceMemory?: number };
      const small = window.matchMedia("(max-width: 767px)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const lowPower = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
      next = small || (coarse && lowPower) ? "lite" : "full";
    }
    // Capability is only knowable in the browser; one post-mount update is intended.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTier(next);
  }, []);

  return tier;
}
