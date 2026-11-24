/**
 * Choreography for the signature sculpture.
 *
 * Sections opt in with `data-scene="<name>"`. The scene director
 * interpolates between the poses of neighbouring sections based on
 * which part of the document is at the viewport centre — so the
 * sculpture travels through the page as you read.
 *
 * Units:
 *  x / y  → fraction of the visible half-width / half-height (-1 … 1)
 *  z      → world units (negative = deeper, dimmer through fog)
 *  s      → scale relative to the viewport height
 *  ry     → extra yaw in radians
 *  fold   → 0…1, how tightly the ribbon folds (morphs the curve)
 */
export interface Pose {
  x: number;
  y: number;
  z: number;
  s: number;
  ry: number;
  fold: number;
}

export type PoseMap = Record<string, Pose>;

export const homePoses: { desktop: PoseMap; mobile: PoseMap } = {
  desktop: {
    hero: { x: 0.4, y: 0.06, z: 0, s: 0.8, ry: 0, fold: 0.15 },
    work: { x: 0.1, y: 0.1, z: -9, s: 0.5, ry: 1.4, fold: 0.6 },
    about: { x: -0.56, y: 0.02, z: -1.5, s: 0.6, ry: 2.6, fold: 0.9 },
    services: { x: 0.18, y: 0.0, z: -10, s: 0.5, ry: 3.6, fold: 0.4 },
    process: { x: 0.0, y: 0.35, z: -8, s: 0.55, ry: 4.6, fold: 0.75 },
    contact: { x: 0.12, y: 0.2, z: -5, s: 0.85, ry: 6.2, fold: 0.2 },
  },
  mobile: {
    hero: { x: 0.0, y: 0.36, z: -0.4, s: 0.62, ry: 0, fold: 0.15 },
    work: { x: 0.0, y: 0.0, z: -8, s: 0.9, ry: 1.4, fold: 0.6 },
    about: { x: 0.0, y: 0.45, z: -3, s: 0.6, ry: 2.6, fold: 0.9 },
    services: { x: 0.0, y: 0.0, z: -8, s: 0.8, ry: 3.6, fold: 0.4 },
    process: { x: 0.0, y: 0.0, z: -8, s: 0.8, ry: 4.6, fold: 0.75 },
    contact: { x: 0.0, y: 0.2, z: -2.5, s: 0.8, ry: 6.2, fold: 0.2 },
  },
};

export const aboutPoses: { desktop: PoseMap; mobile: PoseMap } = {
  desktop: {
    "about-hero": { x: 0.5, y: 0.0, z: -0.6, s: 0.8, ry: 2.6, fold: 0.9 },
    "about-body": { x: 0.62, y: 0.1, z: -4.5, s: 0.85, ry: 4.0, fold: 0.5 },
    "about-end": { x: 0.0, y: 0.0, z: -2.5, s: 1.1, ry: 6.0, fold: 0.2 },
  },
  mobile: {
    "about-hero": { x: 0.0, y: 0.4, z: -1.2, s: 0.55, ry: 2.6, fold: 0.9 },
    "about-body": { x: 0.0, y: 0.0, z: -8, s: 0.8, ry: 4.0, fold: 0.5 },
    "about-end": { x: 0.0, y: 0.1, z: -3, s: 0.7, ry: 6.0, fold: 0.2 },
  },
};

/** Shared, mutable pointer state (no React re-renders). */
export const pointer = { x: 0, y: 0 };
