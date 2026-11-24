"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SignatureSculpture } from "./SignatureSculpture";
import { pointer, type Pose, type PoseMap } from "@/lib/scene";
import { useTheme } from "@/hooks/useTheme";

/** Scene colours per theme: fog matches the page background, linework matches the type. */
const SCENE = {
  dark: { fog: "#08090b", ink: "#f2efe9", accent: "#ff5a36", frameFill: 0.025, frameLine: 0.18, dust: 0.4 },
  light: { fog: "#f4f1ea", ink: "#141519", accent: "#c4391a", frameFill: 0.03, frameLine: 0.22, dust: 0.35 },
} as const;

type Tier = "lite" | "full";

export type ExperienceCanvasProps = {
  poses: PoseMap;
  tier: Tier;
  animate: boolean;
  onReady?: () => void;
};

/* ------------------------------------------------------------------ */
/* Scene director — reads document scroll, eases the sculpture's pose */
/* ------------------------------------------------------------------ */

type Anchor = { name: string; center: number };

function useSectionAnchors() {
  const anchors = useRef<Anchor[]>([]);
  useEffect(() => {
    const measure = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
      anchors.current = els
        .map((el) => {
          const r = el.getBoundingClientRect();
          const top = r.top + window.scrollY;
          // anchor a little above the section centre so poses settle while the section is being read
          return { name: el.dataset.scene!, center: top + Math.min(r.height, window.innerHeight) * 0.5 };
        })
        .sort((a, b) => a.center - b.center);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    const id = window.setInterval(measure, 1500);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearInterval(id);
    };
  }, []);
  return anchors;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

function resolvePose(anchors: Anchor[], poses: PoseMap, fallback: Pose): Pose {
  const list = anchors.filter((a) => poses[a.name]);
  if (!list.length) return fallback;
  const yc = window.scrollY + window.innerHeight * 0.5;
  if (yc <= list[0]!.center) return poses[list[0]!.name]!;
  const last = list[list.length - 1]!;
  if (yc >= last.center) return poses[last.name]!;
  for (let i = 0; i < list.length - 1; i++) {
    const a = list[i]!;
    const b = list[i + 1]!;
    if (yc >= a.center && yc <= b.center) {
      const t = smooth((yc - a.center) / Math.max(1, b.center - a.center));
      const pa = poses[a.name]!;
      const pb = poses[b.name]!;
      return {
        x: lerp(pa.x, pb.x, t),
        y: lerp(pa.y, pb.y, t),
        z: lerp(pa.z, pb.z, t),
        s: lerp(pa.s, pb.s, t),
        ry: lerp(pa.ry, pb.ry, t),
        fold: lerp(pa.fold, pb.fold, t),
      };
    }
  }
  return fallback;
}

function Director({ poses, tier, animate }: Omit<ExperienceCanvasProps, "onReady">) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const fold = useRef(0);
  const anchors = useSectionAnchors();
  const { camera, size } = useThree();
  const first = Object.values(poses)[0]!;
  const current = useRef<Pose>({ ...first });
  const settled = useRef(false);

  useFrame((state, delta) => {
    if (!group.current || !inner.current) return;
    const target = resolvePose(anchors.current, poses, first);
    const c = current.current;
    // critically-damped-ish easing toward the target pose
    const k = settled.current && animate ? 1 - Math.exp(-delta * 3.2) : 1;
    settled.current = true;
    c.x = lerp(c.x, target.x, k);
    c.y = lerp(c.y, target.y, k);
    c.z = lerp(c.z, target.z, k);
    c.s = lerp(c.s, target.s, k);
    c.ry = lerp(c.ry, target.ry, k);
    c.fold = lerp(c.fold, target.fold, k);
    fold.current = c.fold;

    // convert viewport-fraction pose into world units at the target depth
    const cam = camera as THREE.PerspectiveCamera;
    const dist = cam.position.z - c.z;
    const halfH = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * dist;
    const halfW = halfH * (size.width / size.height);
    group.current.position.set(c.x * halfW, c.y * halfH, c.z);
    const scale = c.s * (halfH / 2.6);
    group.current.scale.setScalar(scale);

    const time = state.clock.elapsedTime;
    const idle = animate ? time * 0.06 : 0;
    const px = animate ? pointer.x : 0;
    const py = animate ? pointer.y : 0;
    inner.current.rotation.y = lerp(inner.current.rotation.y, c.ry + idle + px * 0.45, animate ? 0.06 : 1);
    inner.current.rotation.x = lerp(inner.current.rotation.x, 0.35 - py * 0.28, animate ? 0.06 : 1);
    inner.current.rotation.z = animate ? Math.sin(time * 0.18) * 0.06 : 0;
    inner.current.position.y = animate ? Math.sin(time * 0.5) * 0.06 : 0;
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        <SignatureSculpture segments={tier === "full" ? 560 : 300} foldRef={fold} animate={animate} />
      </group>
      {tier === "full" && <ArchiveFrames animate={animate} />}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Archive frames — hairline acrylic planes orbiting the object       */
/* ------------------------------------------------------------------ */

const FRAME_SPECS = [
  { w: 1.5, h: 2.0, p: [-2.4, 0.9, -1.4], r: [0.1, 0.55, -0.06], speed: 0.11 },
  { w: 2.3, h: 1.4, p: [2.2, -1.25, -2.2], r: [-0.08, -0.5, 0.04], speed: -0.08 },
  { w: 1.0, h: 1.0, p: [1.6, 1.7, 0.6], r: [0.2, -0.3, 0.12], speed: 0.14 },
] as const;

function ArchiveFrames({ animate }: { animate: boolean }) {
  const c = SCENE[useTheme().theme];
  const refs = useRef<(THREE.Group | null)[]>([]);
  const edges = useMemo(
    () =>
      FRAME_SPECS.map((f) => {
        const plane = new THREE.PlaneGeometry(f.w, f.h);
        const e = new THREE.EdgesGeometry(plane);
        plane.dispose(); // only needed to derive the outline
        return e;
      }),
    [],
  );
  useEffect(() => () => edges.forEach((g) => g.dispose()), [edges]);
  useFrame((state) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;
    refs.current.forEach((g, i) => {
      if (!g) return;
      const f = FRAME_SPECS[i]!;
      g.rotation.y = f.r[1] + Math.sin(t * f.speed + i) * 0.25;
      g.position.y = f.p[1] + Math.sin(t * 0.4 + i * 2) * 0.08;
    });
  });
  return (
    <>
      {FRAME_SPECS.map((f, i) => (
        <group
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={f.p as unknown as THREE.Vector3Tuple}
          rotation={f.r as unknown as THREE.Vector3Tuple}
        >
          <mesh>
            <planeGeometry args={[f.w, f.h]} />
            <meshBasicMaterial color={c.ink} transparent opacity={c.frameFill} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
          <lineSegments geometry={edges[i]}>
            <lineBasicMaterial color={i === 2 ? c.accent : c.ink} transparent opacity={i === 2 ? 0.55 : c.frameLine} />
          </lineSegments>
        </group>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Dust — depth cue                                                    */
/* ------------------------------------------------------------------ */

function Dust({ count, animate }: { count: number; animate: boolean }) {
  const c = SCENE[useTheme().theme];
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    // deterministic pseudo-random so SSR/CSR and reloads look identical
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rnd() - 0.5) * 18;
      arr[i * 3 + 1] = (rnd() - 0.5) * 11;
      arr[i * 3 + 2] = -rnd() * 12 + 2;
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count]);
  useEffect(() => () => geo.dispose(), [geo]);
  useFrame((state, delta) => {
    if (!ref.current || !animate) return;
    ref.current.rotation.y += delta * 0.006;
    ref.current.position.x = -pointer.x * 0.25;
    ref.current.position.y = -pointer.y * 0.15 + Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={c.ink} size={0.022} sizeAttenuation transparent opacity={c.dust} depthWrite={false} />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Pointer + device orientation                                        */
/* ------------------------------------------------------------------ */

function usePointerInput(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      pointer.x = THREE.MathUtils.clamp(e.gamma / 35, -1, 1);
      pointer.y = THREE.MathUtils.clamp((e.beta - 45) / 35, -1, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("deviceorientation", onTilt, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
      pointer.x = 0;
      pointer.y = 0;
    };
  }, [enabled]);
}

/* ------------------------------------------------------------------ */

export default function ExperienceCanvas({ poses, tier, animate, onReady }: ExperienceCanvasProps) {
  usePointerInput(animate);
  const c = SCENE[useTheme().theme];

  return (
    <Canvas
      dpr={tier === "full" ? [1, 1.75] : [1, 1.35]}
      camera={{ position: [0, 0, 7], fov: 35, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={animate ? "always" : "demand"}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        // give the first frames a moment to compile before revealing
        requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()));
      }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <fog key={c.fog} attach="fog" args={[c.fog, 7, 16]} />
      <Environment resolution={tier === "full" ? 256 : 128} frames={1}>
        {/* Key: soft ivory softbox overhead */}
        <Lightformer form="rect" intensity={3.4} color="#f4efe6" position={[0, 5, 2]} scale={[10, 3, 1]} rotation-x={Math.PI / 2} />
        {/* Warm vermilion strip — the signal colour, reflected not painted */}
        <Lightformer form="rect" intensity={2.2} color="#ff5a36" position={[-5, 0.5, 1]} scale={[0.5, 7, 1]} rotation-y={Math.PI / 2} />
        {/* Cool rim to separate the silhouette from the void */}
        <Lightformer form="rect" intensity={1.4} color="#c9d2df" position={[5, -1, -2]} scale={[1.2, 6, 1]} rotation-y={-Math.PI / 2} />
        {/* Floor bounce */}
        <Lightformer form="rect" intensity={0.5} color="#f2efe9" position={[0, -5, 0]} scale={[10, 10, 1]} rotation-x={-Math.PI / 2} />
        {/* Thin front kicker for crisp edge highlights */}
        <Lightformer form="ring" intensity={1.6} color="#ffffff" position={[2, 2, 6]} scale={1.5} />
        {/* Broad frontal fill so the satin face reads as ivory metal, not shadow */}
        <Lightformer form="rect" intensity={1.3} color="#ece6dc" position={[0, 0, 7]} scale={[8, 4, 1]} />
      </Environment>
      <Director poses={poses} tier={tier} animate={animate} />
      <Dust count={tier === "full" ? 420 : 140} animate={animate} />
    </Canvas>
  );
}
