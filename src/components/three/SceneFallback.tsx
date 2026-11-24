/**
 * Static, art-directed poster of Object 001 — used instantly while the
 * WebGL scene loads, and permanently when WebGL is unavailable.
 * It is generated from the same curve as the 3D sculpture (orthographic
 * projection) so the poster and the live object read as one identity.
 */

const SEG = 260;

function ribbonPaths() {
  const a = 0.6;
  const b = 0.3;
  const nib = { x: Math.cos(0.9), y: Math.sin(0.9) * 0.55, z: Math.sin(0.63) * 0.8 + 0.35 };
  const nl = Math.hypot(nib.x, nib.y, nib.z);
  nib.x /= nl;
  nib.y /= nl;
  nib.z /= nl;
  const left: string[] = [];
  const right: string[] = [];
  const spine: string[] = [];
  const rx = 0.35; // view tilt
  const cos = Math.cos(rx);
  const sin = Math.sin(rx);
  const S = 120;
  const project = (x: number, y: number, z: number) => {
    const y2 = y * cos - z * sin;
    return [200 + x * S, 200 - y2 * S] as const;
  };
  for (let i = 0; i <= SEG; i++) {
    const u = (i / SEG) * Math.PI * 2;
    const px = 1.75 * Math.sin(u + a);
    const py = Math.sin(2 * u);
    const pz = 0.7 * Math.sin(3 * u + b);
    let tx = 1.75 * Math.cos(u + a);
    let ty = 2 * Math.cos(2 * u);
    let tz = 2.1 * Math.cos(3 * u + b);
    const tl = Math.hypot(tx, ty, tz);
    tx /= tl;
    ty /= tl;
    tz /= tl;
    const d = nib.x * tx + nib.y * ty + nib.z * tz;
    const W = 0.44;
    const vx = (nib.x - d * tx) * W;
    const vy = (nib.y - d * ty) * W;
    const vz = (nib.z - d * tz) * W;
    const [lx, ly] = project(px + vx, py + vy, pz + vz);
    const [rx2, ry2] = project(px - vx, py - vy, pz - vz);
    const [sx, sy] = project(px, py, pz);
    const cmd = i === 0 ? "M" : "L";
    left.push(`${cmd}${lx.toFixed(1)} ${ly.toFixed(1)}`);
    right.push(`${cmd}${rx2.toFixed(1)} ${ry2.toFixed(1)}`);
    spine.push(`${cmd}${sx.toFixed(1)} ${sy.toFixed(1)}`);
  }
  // build quads as a single filled path of thin slices for the band
  return { left: left.join(""), right: right.join(""), spine: spine.join("") };
}

const P = ribbonPaths();

export function SceneFallback({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 400 400" className="drift h-full w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="fb-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6f1e8" />
            <stop offset="0.45" stopColor="#8d8a85" />
            <stop offset="0.7" stopColor="#f2efe9" />
            <stop offset="1" stopColor="#3a3c40" />
          </linearGradient>
          <linearGradient id="fb-warm" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff8064" />
            <stop offset="1" stopColor="#ff5a36" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="fb-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ff5a36" stopOpacity="0.16" />
            <stop offset="1" stopColor="#ff5a36" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="190" fill="url(#fb-glow)" />
        <path d={P.right} fill="none" stroke="url(#fb-warm)" strokeWidth="1.2" opacity="0.9" />
        <path d={P.spine} fill="none" stroke="url(#fb-metal)" strokeWidth="9" strokeLinecap="round" opacity="0.55" />
        <path d={P.spine} fill="none" stroke="url(#fb-metal)" strokeWidth="3" strokeLinecap="round" />
        <path d={P.left} fill="none" stroke="#f2efe9" strokeWidth="0.9" opacity="0.75" />
      </svg>
    </div>
  );
}
