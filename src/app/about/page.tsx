import type { Metadata } from "next";
import { disciplines, site } from "@/data/site";
import { serviceGroups, tools } from "@/data/services";
import { SceneLayer } from "@/components/three/SceneLayer";
import { aboutPoses } from "@/lib/scene";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactBand } from "@/components/ui/ContactBand";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — ${site.role} at ${site.company}. Multidisciplinary designer across web, app, identity, graphic and print.`,
};

export default function AboutPage() {
  const { about } = site;
  return (
    <>
      <SceneLayer poses={aboutPoses} />
      <div className="relative z-10">
        {/* Opening */}
        <section data-scene="about-hero" className="flex min-h-[100svh] flex-col justify-end pb-16 pt-[calc(var(--header-h)+4rem)]">
          <div className="shell">
            <SectionLabel index="B/00">About</SectionLabel>
            <MaskLines
              as="h1"
              immediate
              delay={0.2}
              lines={[about.title[0], <span key="m" className="serif-accent text-accent">{about.title[1]}</span>]}
              className="display mt-8 max-w-[12ch] text-[clamp(3.2rem,10vw,10.5rem)]"
            />
            <div className="mt-14 grid gap-10 border-t border-line pt-8 md:grid-cols-12">
              <Reveal className="md:col-span-6" delay={0.5}>
                <p className="text-[clamp(1.3rem,2vw,1.75rem)] leading-snug tracking-[-0.01em]">{about.lead}</p>
              </Reveal>
              <Reveal className="md:col-span-4 md:col-start-9" delay={0.6}>
                <p className="label text-[0.75rem] text-dim">Currently</p>
                <p className="display mt-2 text-2xl">
                  {site.role}
                  <span className="serif-accent text-muted"> at </span>
                  {site.company}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Biography */}
        <section data-scene="about-body" aria-labelledby="bio-title" className="py-28 md:py-40">
          <div className="shell grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label text-accent">01</p>
              <h2 id="bio-title" className="display mt-4 text-[clamp(2rem,3.6vw,3.4rem)]">
                Biography
              </h2>
            </div>
            <div className="space-y-6 md:col-span-7 md:col-start-6">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-[1.15rem] leading-relaxed text-ivory/85">{p}</p>
                </Reveal>
              ))}
              <Reveal delay={0.2}>
                <p className="flex gap-3 border border-dashed border-line-strong p-5 text-[0.95rem] text-muted">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full border border-accent" />
                  Space for a longer biography, background and milestones — add them in <code className="text-ivory">src/data/site.ts</code> once confirmed.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section aria-labelledby="philosophy-title" className="border-y border-line bg-night/70 py-28 md:py-36">
          <div className="shell">
            <p className="label text-accent">02</p>
            <h2 id="philosophy-title" className="display mt-4 text-[clamp(2.4rem,5vw,5rem)]">
              Design philosophy
            </h2>
            <ol className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
              {about.philosophy.map((item, i) => (
                <li key={item.title} className="bg-night p-8 md:p-10">
                  <Reveal delay={i * 0.08}>
                    <p className="serif-accent text-5xl text-accent">{["i.", "ii.", "iii."][i]}</p>
                    <h3 className="display mt-8 text-[1.8rem]">{item.title}</h3>
                    <p className="mt-4 leading-relaxed text-muted">{item.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Capabilities */}
        <section data-scene="about-end" aria-labelledby="cap-title" className="py-28 md:py-40">
          <div className="shell grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label text-accent">03</p>
              <h2 id="cap-title" className="display mt-4 text-[clamp(2rem,3.6vw,3.4rem)]">
                Capabilities &amp; tools
              </h2>
              <ul className="mt-8 space-y-1 text-muted">
                {disciplines.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <dl className="divide-y divide-line border-y border-line">
                {serviceGroups.map((g) => (
                  <div key={g.id} className="grid gap-3 py-6 sm:grid-cols-3">
                    <dt className="display text-xl">{g.title}</dt>
                    <dd className="text-muted sm:col-span-2">{g.items.join(" · ")}</dd>
                  </div>
                ))}
                <div className="grid gap-3 py-6 sm:grid-cols-3">
                  <dt className="display text-xl">Toolkit</dt>
                  <dd className="text-muted sm:col-span-2">{tools.join(" · ")} — part of the everyday workflow.</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <ContactBand />
      </div>
    </>
  );
}
