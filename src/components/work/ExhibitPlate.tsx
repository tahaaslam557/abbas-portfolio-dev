import Image from "next/image";
import type { PlateAspect, PlateVariant, Project } from "@/types/content";
import { cn } from "@/lib/cn";

/**
 * Abstract, original placeholder artwork for each discipline.
 * These are neutral "mockup frames" — not fake projects. They are
 * replaced automatically as soon as a project has a real `coverImage`.
 */

export const ASPECT: Record<PlateAspect, { w: number; h: number; css: string }> = {
  wide: { w: 1600, h: 900, css: "aspect-[16/9]" },
  landscape: { w: 1200, h: 900, css: "aspect-[4/3]" },
  portrait: { w: 960, h: 1200, css: "aspect-[4/5]" },
  square: { w: 1000, h: 1000, css: "aspect-square" },
};

const IV = "#f2efe9";
const AC = "#ff5a36";

function Lines({ x, y, w, rows, gap = 18, o = 0.22, sw = 6 }: { x: number; y: number; w: number; rows: number; gap?: number; o?: number; sw?: number }) {
  return (
    <g stroke={IV} strokeOpacity={o} strokeWidth={sw} strokeLinecap="round">
      {Array.from({ length: rows }, (_, i) => (
        <line key={i} x1={x} x2={x + w * (i === rows - 1 ? 0.6 : 1 - ((i * 7) % 3) * 0.08)} y1={y + i * gap} y2={y + i * gap} />
      ))}
    </g>
  );
}

function WebPlate({ w, h }: { w: number; h: number }) {
  const fx = w * 0.12, fy = h * 0.14, fw = w * 0.66, fh = h * 0.72;
  return (
    <>
      {/* desktop browser frame */}
      <g>
        <rect x={fx} y={fy} width={fw} height={fh} rx={14} fill="#111317" stroke={IV} strokeOpacity={0.22} strokeWidth={2} />
        <line x1={fx} x2={fx + fw} y1={fy + 44} y2={fy + 44} stroke={IV} strokeOpacity={0.14} strokeWidth={2} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={fx + 26 + i * 22} cy={fy + 22} r={6} fill={IV} fillOpacity={0.18} />
        ))}
        {/* 12-col grid ghost */}
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={fx + 40 + i * ((fw - 80) / 12)} y={fy + 60} width={(fw - 80) / 12 - 10} height={fh - 80} fill={IV} fillOpacity={0.018} />
        ))}
        {/* headline blocks */}
        <rect x={fx + 48} y={fy + 110} width={fw * 0.5} height={46} rx={4} fill={IV} fillOpacity={0.85} />
        <rect x={fx + 48} y={fy + 170} width={fw * 0.36} height={46} rx={4} fill={IV} fillOpacity={0.85} />
        <Lines x={fx + 48} y={fy + 260} w={fw * 0.32} rows={3} />
        <rect x={fx + 48} y={fy + 330} width={150} height={44} rx={22} fill={AC} />
        {/* hero image block */}
        <rect x={fx + fw * 0.6} y={fy + 96} width={fw * 0.34} height={fh * 0.56} rx={8} fill="#1b1e24" />
        <circle cx={fx + fw * 0.77} cy={fy + 96 + fh * 0.28} r={fh * 0.17} fill="none" stroke={IV} strokeOpacity={0.4} strokeWidth={2} />
        <circle cx={fx + fw * 0.77} cy={fy + 96 + fh * 0.28} r={fh * 0.08} fill={IV} fillOpacity={0.12} />
        {/* cards row */}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={fx + 48 + i * ((fw - 96) / 3)} y={fy + fh - 120} width={(fw - 96) / 3 - 18} height={84} rx={6} fill={IV} fillOpacity={0.05} stroke={IV} strokeOpacity={0.1} />
        ))}
      </g>
      {/* responsive phone frame overlapping */}
      <g transform={`translate(${w * 0.7} ${h * 0.3})`}>
        <rect width={w * 0.17} height={h * 0.6} rx={26} fill="#0d0f12" stroke={IV} strokeOpacity={0.35} strokeWidth={2} />
        <rect x={18} y={40} width={w * 0.17 - 36} height={24} rx={3} fill={IV} fillOpacity={0.85} />
        <rect x={18} y={74} width={w * 0.1} height={24} rx={3} fill={IV} fillOpacity={0.85} />
        <rect x={18} y={120} width={w * 0.17 - 36} height={h * 0.2} rx={8} fill="#1b1e24" />
        <Lines x={18} y={h * 0.2 + 150} w={w * 0.17 - 50} rows={4} sw={5} gap={16} />
        <rect x={18} y={h * 0.6 - 70} width={w * 0.17 - 36} height={36} rx={18} fill={AC} fillOpacity={0.9} />
      </g>
    </>
  );
}

function AppPlate({ w, h }: { w: number; h: number }) {
  const pw = w * 0.28, ph = pw * 2.05;
  const phones = [
    { x: w * 0.08, y: h * 0.2, o: 0.5 },
    { x: w * 0.36, y: h * 0.08, o: 1 },
    { x: w * 0.64, y: h * 0.26, o: 0.5 },
  ];
  return (
    <>
      {phones.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`} opacity={p.o === 1 ? 1 : 0.62}>
          <rect width={pw} height={ph} rx={34} fill="#0e1014" stroke={IV} strokeOpacity={p.o === 1 ? 0.5 : 0.22} strokeWidth={2} />
          <rect x={pw / 2 - 30} y={14} width={60} height={14} rx={7} fill={IV} fillOpacity={0.15} />
          <rect x={20} y={56} width={pw * 0.55} height={22} rx={3} fill={IV} fillOpacity={0.85} />
          {i === 1 ? (
            <>
              <circle cx={pw / 2} cy={ph * 0.32} r={pw * 0.26} fill="none" stroke={AC} strokeWidth={10} strokeDasharray={`${pw * 1.1} ${pw * 2}`} strokeLinecap="round" transform={`rotate(-90 ${pw / 2} ${ph * 0.32})`} />
              <circle cx={pw / 2} cy={ph * 0.32} r={pw * 0.26} fill="none" stroke={IV} strokeOpacity={0.12} strokeWidth={10} />
              {[0, 1, 2, 3].map((r) => (
                <g key={r} transform={`translate(20 ${ph * 0.55 + r * 58})`}>
                  <rect width={pw - 40} height={46} rx={10} fill={IV} fillOpacity={0.05} />
                  <circle cx={24} cy={23} r={11} fill={r === 0 ? AC : IV} fillOpacity={r === 0 ? 1 : 0.2} />
                  <rect x={46} y={17} width={(pw - 120) * (1 - r * 0.15)} height={12} rx={3} fill={IV} fillOpacity={0.4} />
                </g>
              ))}
            </>
          ) : (
            <>
              <rect x={20} y={100} width={pw - 40} height={ph * 0.3} rx={14} fill="#1b1e24" />
              <Lines x={20} y={ph * 0.3 + 140} w={pw - 60} rows={5} sw={6} gap={22} o={0.18} />
            </>
          )}
          <rect x={20} y={ph - 64} width={pw - 40} height={1.5} fill={IV} fillOpacity={0.15} />
          {[0, 1, 2, 3].map((d) => (
            <circle key={d} cx={20 + (pw - 40) * (d / 3)} cy={ph - 34} r={6} fill={IV} fillOpacity={d === 0 && i === 1 ? 0.9 : 0.2} />
          ))}
        </g>
      ))}
    </>
  );
}

function BrandPlate({ w, h }: { w: number; h: number }) {
  const cx = w * 0.5, cy = h * 0.44, r = Math.min(w, h) * 0.24;
  return (
    <>
      {/* construction grid */}
      <g stroke={IV} strokeOpacity={0.09} strokeWidth={1.5}>
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`v${i}`} x1={(w / 10) * i} x2={(w / 10) * i} y1={0} y2={h} />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`h${i}`} y1={(h / 10) * i} y2={(h / 10) * i} x1={0} x2={w} />
        ))}
      </g>
      <g fill="none" stroke={IV} strokeWidth={1.5}>
        <circle cx={cx} cy={cy} r={r * 1.618} strokeOpacity={0.14} />
        <circle cx={cx} cy={cy} r={r} strokeOpacity={0.3} />
        <circle cx={cx - r * 0.5} cy={cy} r={r * 0.5} strokeOpacity={0.3} strokeDasharray="6 8" />
        <line x1={cx - r * 1.8} y1={cy + r * 1.8} x2={cx + r * 1.8} y2={cy - r * 1.8} strokeOpacity={0.2} />
        <line x1={cx - r * 1.8} y1={cy - r * 1.8} x2={cx + r * 1.8} y2={cy + r * 1.8} strokeOpacity={0.2} />
      </g>
      {/* abstract construction study (not a logo) */}
      <path d={`M${cx - r} ${cy + r} L${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx} ${cy - r} L${cx} ${cy + r} Z`} fill={IV} fillOpacity={0.92} />
      <path d={`M${cx} ${cy + r} A${r} ${r} 0 0 0 ${cx + r} ${cy} L${cx} ${cy} Z`} fill={AC} />
      <circle cx={cx + r * 0.5} cy={cy - r * 0.5} r={r * 0.18} fill={IV} fillOpacity={0.92} />
      {/* measurement marks */}
      <g stroke={AC} strokeWidth={1.5}>
        <line x1={cx - r} x2={cx + r} y1={cy + r + 36} y2={cy + r + 36} />
        <line x1={cx - r} x2={cx - r} y1={cy + r + 28} y2={cy + r + 44} />
        <line x1={cx + r} x2={cx + r} y1={cy + r + 28} y2={cy + r + 44} />
      </g>
      {/* swatches */}
      {["#f2efe9", "#ff5a36", "#a6a7ab", "#20242c"].map((c, i) => (
        <rect key={c} x={w * 0.1 + i * (w * 0.2)} y={h * 0.86} width={w * 0.18} height={h * 0.06} fill={c} stroke={IV} strokeOpacity={0.12} />
      ))}
    </>
  );
}

function GraphicPlate({ w, h }: { w: number; h: number }) {
  return (
    <>
      <circle cx={w * 0.74} cy={h * 0.3} r={w * 0.42} fill={AC} />
      <circle cx={w * 0.74} cy={h * 0.3} r={w * 0.42} fill="none" stroke="#08090b" strokeOpacity={0.35} strokeWidth={2} strokeDasharray="2 10" />
      {/* type stripes */}
      {[0.66, 0.45, 0.58, 0.3].map((len, i) => (
        <rect key={i} x={w * 0.08} y={h * (0.56 + i * 0.075)} width={w * len} height={h * 0.05} fill={IV} fillOpacity={i === 0 ? 0.95 : 0.85} />
      ))}
      <Lines x={w * 0.08} y={h * 0.9} w={w * 0.38} rows={2} sw={5} gap={18} o={0.3} />
      {/* registration marks */}
      {[[0.06, 0.06], [0.94, 0.06], [0.06, 0.96], [0.94, 0.96]].map(([x, y], i) => (
        <g key={i} stroke={IV} strokeOpacity={0.4} strokeWidth={1.5} fill="none">
          <circle cx={w * x!} cy={h * y!} r={10} />
          <line x1={w * x! - 18} x2={w * x! + 18} y1={h * y!} y2={h * y!} />
          <line y1={h * y! - 18} y2={h * y! + 18} x1={w * x!} x2={w * x!} />
        </g>
      ))}
      <rect x={w * 0.08} y={h * 0.1} width={w * 0.14} height={w * 0.14} fill="none" stroke={IV} strokeOpacity={0.6} strokeWidth={2} />
      <line x1={w * 0.08} y1={h * 0.1} x2={w * 0.22} y2={h * 0.1 + w * 0.14} stroke={IV} strokeOpacity={0.6} strokeWidth={2} />
    </>
  );
}

function PrintPlate({ w, h }: { w: number; h: number }) {
  const sw = w * 0.38, sh = h * 0.56;
  const spread = (x: number, y: number, rot: number, accent: boolean) => (
    <g transform={`translate(${x} ${y}) rotate(${rot}) skewX(-8)`}>
      <rect width={sw * 2} height={sh} fill="#16191e" stroke={IV} strokeOpacity={0.2} strokeWidth={2} />
      <line x1={sw} x2={sw} y1={0} y2={sh} stroke={IV} strokeOpacity={0.25} strokeWidth={2} />
      <rect x={sw * 0.1} y={sh * 0.1} width={sw * 0.8} height={sh * 0.5} fill={accent ? AC : "#22262d"} />
      <Lines x={sw * 0.1} y={sh * 0.7} w={sw * 0.8} rows={4} sw={5} gap={16} />
      <rect x={sw * 1.1} y={sh * 0.1} width={sw * 0.6} height={30} fill={IV} fillOpacity={0.85} />
      <Lines x={sw * 1.1} y={sh * 0.1 + 70} w={sw * 0.36} rows={9} sw={4} gap={14} o={0.2} />
      <Lines x={sw * 1.52} y={sh * 0.1 + 70} w={sw * 0.36} rows={9} sw={4} gap={14} o={0.2} />
    </g>
  );
  return (
    <>
      {spread(w * 0.18, h * 0.08, -4, false)}
      {spread(w * 0.1, h * 0.36, 3, true)}
      {/* crop marks */}
      <g stroke={IV} strokeOpacity={0.35} strokeWidth={1.5}>
        <line x1={w * 0.04} x2={w * 0.08} y1={h * 0.94} y2={h * 0.94} />
        <line x1={w * 0.08} x2={w * 0.08} y1={h * 0.9} y2={h * 0.98} />
        <line x1={w * 0.92} x2={w * 0.96} y1={h * 0.06} y2={h * 0.06} />
        <line x1={w * 0.92} x2={w * 0.92} y1={h * 0.02} y2={h * 0.1} />
      </g>
    </>
  );
}

function SystemPlate({ w, h }: { w: number; h: number }) {
  const cols = 4, rows = 3, pad = w * 0.06, gw = (w - pad * 2) / cols, gh = (h - pad * 2) / rows;
  return (
    <>
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const x = pad + c * gw, y = pad + r * gh;
        const kind = (i * 5) % 6;
        return (
          <g key={i} transform={`translate(${x + 8} ${y + 8})`}>
            <rect width={gw - 16} height={gh - 16} rx={10} fill={IV} fillOpacity={0.03} stroke={IV} strokeOpacity={0.1} />
            {kind === 0 && <rect x={24} y={(gh - 16) / 2 - 22} width={gw - 64} height={44} rx={22} fill={i === 0 ? AC : IV} fillOpacity={i === 0 ? 1 : 0.85} />}
            {kind === 1 && (
              <>
                <rect x={24} y={(gh - 16) / 2 - 18} width={72} height={36} rx={18} fill={AC} />
                <circle cx={78} cy={(gh - 16) / 2} r={13} fill={IV} />
              </>
            )}
            {kind === 2 && <Lines x={24} y={36} w={gw - 70} rows={4} sw={5} gap={20} />}
            {kind === 3 && [0, 1, 2].map((s) => <rect key={s} x={24 + s * 52} y={(gh - 16) / 2 - 20} width={40} height={40} rx={6} fill={["#f2efe9", "#a6a7ab", "#20242c"][s]} />)}
            {kind === 4 && (
              <>
                <rect x={24} y={30} width={gw - 64} height={(gh - 16) * 0.45} rx={6} fill="#1e222a" />
                <rect x={24} y={(gh - 16) * 0.45 + 44} width={(gw - 64) * 0.6} height={12} rx={3} fill={IV} fillOpacity={0.5} />
              </>
            )}
            {kind === 5 && <text x={24} y={(gh - 16) / 2 + 18} fill={IV} fillOpacity={0.85} fontSize={52} fontFamily="ui-sans-serif, system-ui" fontWeight={600}>Aa</text>}
          </g>
        );
      })}
    </>
  );
}

const PLATES: Record<PlateVariant, (p: { w: number; h: number }) => React.ReactElement> = {
  web: WebPlate,
  app: AppPlate,
  brand: BrandPlate,
  graphic: GraphicPlate,
  print: PrintPlate,
  system: SystemPlate,
};

export function PlateArt({ variant, aspect, className }: { variant: PlateVariant; aspect: PlateAspect; className?: string }) {
  const { w, h } = ASPECT[aspect];
  const Plate = PLATES[variant];
  const gid = `plate-bg-${variant}-${aspect}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("block h-full w-full", className)} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a1d23" />
          <stop offset="1" stopColor="#0b0c0f" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#${gid})`} />
      <Plate w={w} h={h} />
    </svg>
  );
}

/** Real cover image when supplied, otherwise the abstract plate. */
export function ProjectVisual({
  project,
  className,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  priority = false,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const img = project.coverImage;
  if (img) {
    return (
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        sizes={sizes}
        priority={priority}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }
  return (
    <div className={cn("h-full w-full", className)} role="img" aria-label={`Placeholder artwork for ${project.title}, ${project.category}`}>
      <PlateArt variant={project.plate.variant} aspect={project.plate.aspect} />
    </div>
  );
}
