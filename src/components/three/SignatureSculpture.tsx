"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * OBJECT 001 — "THE CONTINUUM"
 *
 * A single closed ribbon whose width is drawn like a broad-nib pen:
 * the band always lies along a fixed "nib" direction, projected
 * perpendicular to the path. Where the path turns toward the nib the
 * ribbon pinches to a hairline; where it turns away it swells — the
 * same thick/thin rhythm as calligraphy, but in three dimensions.
 *
 * The nib slowly rotates and the curve's phases drift, so the
 * sculpture is never quite the same shape twice. Geometry is ~3k
 * vertices, rebuilt in place each frame (cheap) — no textures, no
 * downloaded models.
 */

const ACROSS = 5; // vertices across the ribbon (gives a soft cupped profile)

type Scratch = { T: THREE.Vector3; V: THREE.Vector3; N: THREE.Vector3; nib: THREE.Vector3 };

/** Rewrites the ribbon vertices in place (runs in the frame loop, outside React render). */
function buildRibbon(geometry: THREE.BufferGeometry, segments: number, scratch: Scratch, time: number, fold: number) {
  const pos = geometry.attributes.position!.array as Float32Array;
  const { T, V, N, nib } = scratch;

  // Curve phases drift with time and open/close with the fold amount.
  const a = 0.6 + time * 0.045 + fold * 1.1;
  const b = 0.3 - time * 0.03 + fold * 0.7;
  const zAmp = 0.7 + fold * 0.45;
  const yAmp = 1.0 - fold * 0.12;

  // Nib direction rotates slowly — the "pen" turning in the hand.
  const th = 0.9 + time * 0.07 + fold * 1.6;
  nib.set(Math.cos(th), Math.sin(th) * 0.55, Math.sin(th * 0.7) * 0.8 + 0.35).normalize();

  const W = 0.44;
  for (let i = 0; i < segments; i++) {
    const u = (i / segments) * Math.PI * 2;
    const px = 1.75 * Math.sin(u + a);
    const py = yAmp * Math.sin(2 * u);
    const pz = zAmp * Math.sin(3 * u + b);

    T.set(1.75 * Math.cos(u + a), 2 * yAmp * Math.cos(2 * u), 3 * zAmp * Math.cos(3 * u + b)).normalize();
    // width vector: nib projected perpendicular to the tangent (unnormalised → natural pinches)
    V.copy(nib).addScaledVector(T, -nib.dot(T)).multiplyScalar(W);
    // surface normal, used to cup the band slightly so it catches light like folded metal
    N.crossVectors(T, V);
    const nLen = N.length() || 1;
    N.multiplyScalar(1 / nLen);
    const vLen = V.length();
    const cup = 0.05 * vLen;

    for (let j = 0; j < ACROSS; j++) {
      const s = (j / (ACROSS - 1)) * 2 - 1; // -1 … 1
      const k = (i * ACROSS + j) * 3;
      const c = cup * (1 - s * s);
      pos[k] = px + V.x * s + N.x * c;
      pos[k + 1] = py + V.y * s + N.y * c;
      pos[k + 2] = pz + V.z * s + N.z * c;
    }
  }
  geometry.attributes.position!.needsUpdate = true;
  geometry.computeVertexNormals();
}

type Props = {
  segments?: number;
  /** 0…1 fold amount (driven by the scene director). */
  foldRef: React.RefObject<number>;
  animate: boolean;
};

export function SignatureSculpture({ segments = 520, foldRef, animate }: Props) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = segments * ACROSS;
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    g.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    const idx: number[] = [];
    for (let i = 0; i < segments; i++) {
      const ni = (i + 1) % segments;
      for (let j = 0; j < ACROSS - 1; j++) {
        const a = i * ACROSS + j;
        const b = ni * ACROSS + j;
        const c = ni * ACROSS + j + 1;
        const d = i * ACROSS + j + 1;
        idx.push(a, b, d, b, c, d);
      }
    }
    g.setIndex(idx);
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 3.2);
    return g;
  }, [segments]);

  // three.js never frees GPU buffers on its own — release them when the sculpture unmounts
  useEffect(() => () => geometry.dispose(), [geometry]);

  const t = useRef(0);
  const scratch = useMemo(
    () => ({ T: new THREE.Vector3(), V: new THREE.Vector3(), N: new THREE.Vector3(), nib: new THREE.Vector3() }),
    [],
  );

  useLayoutEffect(() => {
    buildRibbon(geometry, segments, scratch, 0, foldRef.current ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geometry]);

  const lastFold = useRef(-1);
  useFrame((_, delta) => {
    const fold = foldRef.current ?? 0;
    if (animate) t.current += Math.min(delta, 0.05);
    if (animate || Math.abs(fold - lastFold.current) > 0.0005) {
      buildRibbon(geometry, segments, scratch, t.current, fold);
      lastFold.current = fold;
    }
  });

  return (
    <group>
      {/* Front face: champagne satin metal */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#efe9df"
          metalness={1}
          roughness={0.22}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          envMapIntensity={1.6}
          side={THREE.FrontSide}
        />
      </mesh>
      {/* Reverse face: warm vermilion metal — only flashes where the ribbon turns over */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#d9482a"
          metalness={0.95}
          roughness={0.38}
          envMapIntensity={0.7}
          iridescence={0.35}
          iridescenceIOR={1.4}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
