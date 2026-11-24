import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { disciplines, site } from "@/data/site";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FrameStack } from "@/components/ui/FrameStack";

export function AboutPreview() {
  const { about } = site;
  return (
    <section data-scene="about" aria-labelledby="about-title" className="relative z-10 py-28 md:py-44">
      <div className="shell grid gap-16 lg:grid-cols-12">
        {/* Left: the sculpture drifts into this column; layered frames give it a plinth */}
        <div className="relative lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="A/02">About</SectionLabel>
            <FrameStack className="mt-12 hidden aspect-[4/5] w-full max-w-md lg:block" />
            <div className="mt-10 border-l border-accent/70 pl-4 lg:mt-20">
              <p className="label text-[0.75rem] text-dim">Currently</p>
              <p className="display mt-2 text-2xl leading-tight">
                {site.role}
                <span className="serif-accent text-muted"> at </span>
                {site.company}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <MaskLines
            id="about-title"
            lines={[about.title[0], <span key="m" className="serif-accent text-accent">{about.title[1]}</span>]}
            className="display text-[clamp(2.8rem,6.6vw,6.6rem)]"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-[clamp(1.3rem,2vw,1.75rem)] leading-snug tracking-[-0.01em] text-ivory">
              {about.lead}
            </p>
          </Reveal>
          <div className="mt-8 grid max-w-2xl gap-6 md:grid-cols-2">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.08}>
                <p className="leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-14">
            <p className="label text-dim">Practice</p>
            <ul className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-[clamp(1.1rem,1.6vw,1.4rem)]">
              {disciplines.map((d, i) => (
                <li key={d} className="flex items-baseline gap-3">
                  <span className="text-ivory">{d}</span>
                  {i < disciplines.length - 1 && <span aria-hidden="true" className="text-accent">/</span>}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25} className="mt-14">
            <Link href="/about" className="group inline-flex items-center gap-3 border-b border-line-strong pb-1 hover:border-accent">
              More about Abbas
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
