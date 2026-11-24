import { serviceGroups, tools } from "@/data/services";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Capabilities as one connected system: a single vertical line (the
 * Continuum, flattened) threads through four disciplines.
 */
export function ServicesSection() {
  return (
    <section id="services" data-scene="services" aria-labelledby="services-title" className="relative z-10 py-28 md:py-40">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel index="A/03">Services</SectionLabel>
            <MaskLines
              id="services-title"
              lines={["Four disciplines.", <span key="o" className="serif-accent text-muted">One continuous line.</span>]}
              className="display mt-8 text-[clamp(2.6rem,6vw,6rem)]"
            />
          </div>
          <Reveal className="flex items-end lg:col-span-4" delay={0.1}>
            <p className="max-w-sm leading-relaxed text-muted">
              Each discipline sharpens the others. Identity thinking makes interfaces more ownable; interface thinking makes brands more usable.
            </p>
          </Reveal>
        </div>

        <ol className="relative mt-20 md:mt-28">
          {/* the thread */}
          <span aria-hidden="true" className="absolute bottom-0 left-[0.45rem] top-0 w-px bg-gradient-to-b from-accent via-line-strong to-transparent md:left-[0.55rem]" />
          {serviceGroups.map((g, i) => (
            <li key={g.id} className="group relative">
              <Reveal delay={i * 0.05}>
                <div className="relative grid gap-6 border-t border-line py-10 pl-10 transition-colors duration-500 hover:bg-ivory/[0.02] md:grid-cols-12 md:gap-8 md:py-14 md:pl-14">
                  {/* node */}
                  <span aria-hidden="true" className="absolute left-0 top-12 grid size-[0.95rem] place-items-center rounded-full border border-line-strong bg-void transition-colors duration-500 group-hover:border-accent md:top-16 md:size-[1.15rem]">
                    <span className="size-1.5 rounded-full bg-dim transition-all duration-500 group-hover:scale-150 group-hover:bg-accent" />
                  </span>
                  <p className="label text-accent md:col-span-1 md:pt-3">{g.index}</p>
                  <h3 className="display text-[clamp(2.2rem,4.6vw,4.6rem)] transition-transform duration-700 ease-out-expo md:col-span-6 md:group-hover:translate-x-3">
                    {g.title}
                  </h3>
                  <div className="md:col-span-5 md:pt-2">
                    <p className="max-w-md leading-relaxed text-muted">{g.summary}</p>
                    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                      {g.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-[0.95rem] text-ivory/90">
                          <span aria-hidden="true" className="h-px w-3 bg-accent/80" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Tools — part of the workflow, not a mastery claim */}
        <Reveal className="mt-4 flex flex-col gap-4 border-y border-line py-6 pl-10 md:flex-row md:items-center md:justify-between md:pl-14">
          <p className="label text-dim">In the everyday toolkit</p>
          <ul className="flex flex-wrap gap-3">
            {tools.map((t) => (
              <li key={t} className="rounded-full border border-line-strong px-4 py-2 text-sm text-ivory/90">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
