import Link from "next/link";
import { SceneFallback } from "@/components/three/SceneFallback";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
      <SceneFallback className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 opacity-25" />
      <div className="shell relative">
        <p className="label text-accent">Error 404</p>
        <h1 className="display mt-6 text-[clamp(3rem,10vw,10rem)]">
          Not in <span className="serif-accent text-muted">the archive.</span>
        </h1>
        <p className="mt-6 max-w-md text-muted">This page has either moved or never existed.</p>
        <div className="mt-10 flex flex-wrap gap-6">
          <Link href="/" className="border-b border-line-strong pb-1 hover:border-accent">Return home</Link>
          <Link href="/work" className="border-b border-line-strong pb-1 hover:border-accent">Browse the work</Link>
        </div>
      </div>
    </section>
  );
}
