import type { Metadata } from "next";
import { sortedProjects } from "@/data/projects";
import { WorkIndex } from "@/components/work/WorkIndex";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactBand } from "@/components/ui/ContactBand";

export const metadata: Metadata = {
  title: "Work",
  description: "The archive — website, app, identity, graphic and print design by Abbas Ali.",
};

export default function WorkPage() {
  const count = sortedProjects.length;
  return (
    <>
      <section className="relative pb-20 pt-[calc(var(--header-h)+5rem)] md:pt-[calc(var(--header-h)+7rem)]">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <SectionLabel index="W/00">Work index</SectionLabel>
            <MaskLines
              as="h1"
              immediate
              delay={0.2}
              lines={["The archive", <span key="a" className="serif-accent text-muted">of things made.</span>]}
              className="display mt-8 text-[clamp(3rem,9vw,9.5rem)]"
            />
          </div>
          <Reveal className="flex flex-col justify-end gap-3 lg:col-span-3" delay={0.4}>
            <p className="display text-6xl leading-none text-accent">{String(count).padStart(2, "0")}</p>
            <p className="max-w-xs text-muted">
              Exhibits across website, app, identity, graphic and print design. Each opens into a full case study.
            </p>
          </Reveal>
        </div>
      </section>
      <WorkIndex projects={sortedProjects} />
      <ContactBand />
    </>
  );
}
