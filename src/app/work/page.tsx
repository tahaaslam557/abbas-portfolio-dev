import type { Metadata } from "next";
import { sortedProjects } from "@/data/projects";
import { WorkIndex } from "@/components/work/WorkIndex";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactBand } from "@/components/ui/ContactBand";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected work — website, app, identity, graphic and print design by Abbas Ali.",
};

export default function WorkPage() {
  const count = sortedProjects.length;
  const disciplines = Array.from(new Set(sortedProjects.map((p) => p.category)));

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-[calc(var(--header-h)+4rem)] md:pb-20 md:pt-[calc(var(--header-h)+6rem)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-[15vw] -top-[25vh] size-[65vw] max-w-[65rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_90_54/0.12),transparent)]"
        />
        <div className="shell relative">
          <SectionLabel index="W/00">Work index</SectionLabel>

          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <MaskLines
              as="h1"
              immediate
              delay={0.15}
              lines={[
                <>Selected</>,
                <>
                  <span key="w" className="serif-accent text-accent">work</span>
                  <sup className="display ml-3 align-super text-[0.22em] text-muted">({String(count).padStart(2, "0")})</sup>
                </>,
              ]}
              className="display text-[clamp(3.8rem,13vw,13rem)]"
            />
            <Reveal delay={0.35} className="max-w-sm lg:pb-6">
              <p className="text-[1.1rem] leading-relaxed text-muted">
                Websites, apps, identities, graphics and print. Every project opens into a full case study: the brief, the
                thinking and the final design.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.45}>
            <dl className="mt-16 grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
              <div className="border-b border-r border-line p-5">
                <dt className="label text-[0.75rem] text-dim">Projects</dt>
                <dd className="display mt-3 text-4xl">{String(count).padStart(2, "0")}</dd>
              </div>
              <div className="border-b border-r border-line p-5">
                <dt className="label text-[0.75rem] text-dim">Disciplines</dt>
                <dd className="display mt-3 text-4xl">{String(disciplines.length).padStart(2, "0")}</dd>
              </div>
              <div className="col-span-2 border-b border-r border-line p-5">
                <dt className="label text-[0.75rem] text-dim">Practice</dt>
                <dd className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-ivory">
                  {disciplines.map((d, i) => (
                    <span key={d}>
                      {d}
                      {i < disciplines.length - 1 && <span aria-hidden="true" className="ml-2 text-accent">/</span>}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <WorkIndex projects={sortedProjects} />
      <ContactBand />
    </>
  );
}
