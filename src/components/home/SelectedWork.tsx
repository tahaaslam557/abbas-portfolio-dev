import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects, sortedProjects } from "@/data/projects";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SpatialProjectGallery } from "@/components/work/SpatialProjectGallery";
import { ProjectCard } from "@/components/work/ProjectCard";
import { cn } from "@/lib/cn";

/** Staggered editorial offsets for the vertical (mobile / reduced-motion) sequence. */
const SEQUENCE_LAYOUT = [
  "sm:w-[88%]",
  "sm:ml-auto sm:w-[70%]",
  "sm:w-[64%] sm:ml-[8%]",
  "sm:ml-auto sm:w-[78%]",
  "sm:w-[86%]",
];

export function SelectedWork() {
  const projects = featuredProjects;
  const hasMore = sortedProjects.length > featuredProjects.length;

  return (
    <section id="work" data-scene="work" aria-labelledby="work-title" className="relative z-10">
      <div className="shell grid gap-10 pb-16 pt-28 md:pt-40 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionLabel index="A/01">Selected work</SectionLabel>
          <MaskLines
            id="work-title"
            lines={["A few things", <>made with <span className="serif-accent text-accent">intent.</span></>]}
            className="display mt-8 text-[clamp(2.8rem,7vw,7.2rem)]"
          />
        </div>
        <Reveal className="flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-9" delay={0.15}>
          <p className="max-w-sm leading-relaxed text-muted">
            An exhibition of website, app, identity, graphic and print work. Each exhibit opens into its own case study.
          </p>
          {hasMore && (
            <Link href="/work" className="group inline-flex w-fit items-center gap-3 border-b border-line-strong pb-1 hover:border-accent">
              View all work
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
            </Link>
          )}
        </Reveal>
      </div>

      {/* Desktop + motion: spatial corridor */}
      <div className="hidden lg:motion-safe:block">
        <SpatialProjectGallery projects={projects} />
      </div>

      {/* Mobile, tablet, or reduced motion: calm vertical sequence */}
      <div className="shell pb-24 lg:motion-safe:hidden">
        <ol className="flex flex-col gap-20 md:gap-28">
          {projects.map((p, i) => (
            <li key={p.slug} className={cn("w-full", SEQUENCE_LAYOUT[i % SEQUENCE_LAYOUT.length])}>
              <ProjectCard project={p} sizes="(min-width: 640px) 80vw, 100vw" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
