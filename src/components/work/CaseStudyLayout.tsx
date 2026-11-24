import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { PlateVariant, Project } from "@/types/content";
import { getAdjacentProjects, projectNumber, sortedProjects } from "@/data/projects";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { ContactBand } from "@/components/ui/ContactBand";
import { CaseHeroVisual } from "./CaseHeroVisual";
import { CaseChapterNav, type ChapterItem } from "./CaseChapterNav";
import { CaseGallery } from "./CaseGallery";
import { PlaceholderTag } from "./PlaceholderTag";
import { PlateArt, ProjectVisual, visualFrame, visualRatio } from "./ExhibitPlate";
import { cn } from "@/lib/cn";

/** Clearly-marked slot telling Abbas what belongs here. Never pretends to be content. */
function PendingNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex gap-3 border border-dashed border-line-strong bg-panel/40 p-5 text-[0.95rem] leading-relaxed text-muted">
      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full border border-accent" />
      <span>{children}</span>
    </p>
  );
}

function Chapter({
  id,
  index,
  title,
  kicker,
  children,
}: {
  id: string;
  index: string;
  title: React.ReactNode;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-32 border-t border-line pb-20 pt-10 md:pb-28">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="label text-accent">
            {index} <span className="text-dim">/ {kicker}</span>
          </p>
          <h2 id={`${id}-title`} className="display mt-5 text-[clamp(2.2rem,4.4vw,4.2rem)]">
            {title}
          </h2>
        </div>
        <span aria-hidden="true" className="display outline-type hidden text-[clamp(4rem,8vw,7.5rem)] leading-none sm:block">
          {index}
        </span>
      </div>
      <Reveal className="mt-10">{children}</Reveal>
    </section>
  );
}

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="max-w-3xl text-[clamp(1.2rem,1.7vw,1.5rem)] leading-relaxed tracking-[-0.01em] text-ivory/90">{children}</p>
);

const ALT_VARIANTS: PlateVariant[] = ["web", "app", "brand", "graphic", "print", "system"];

export function CaseStudyLayout({ project }: { project: Project }) {
  const { prev, next } = getAdjacentProjects(project.slug);
  const number = projectNumber(project);
  const total = String(sortedProjects.length).padStart(2, "0");

  const meta = [
    { k: "Discipline", v: project.category },
    { k: "Client", v: project.client ?? "—" },
    { k: "Year", v: project.year ?? "—" },
    { k: "Role", v: project.role ?? "—" },
  ];

  const altVariant = ALT_VARIANTS[(ALT_VARIANTS.indexOf(project.plate.variant) + 1) % ALT_VARIANTS.length]!;

  const chapters: ChapterItem[] = [
    { id: "overview", index: "01", label: "Overview" },
    { id: "brief", index: "02", label: "The brief" },
    { id: "direction", index: "03", label: "Direction" },
    { id: "process", index: "04", label: "Process" },
    ...(project.outcome ? [{ id: "outcome", index: "05", label: "Outcome" }] : []),
  ];
  const galleryIndex = String(chapters.length + 1).padStart(2, "0");

  return (
    <article>
      {/* ---------------------------------------------------------- Hero */}
      <header className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+3rem)] md:pb-24 md:pt-[calc(var(--header-h)+5rem)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-[20vw] -top-[30vh] size-[70vw] max-w-[70rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_90_54/0.12),transparent)]"
        />
        <div className="shell relative">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/work" className="label group inline-flex items-center gap-3 text-muted hover:text-ivory">
              <span className="grid size-9 place-items-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-0.5" aria-hidden="true" />
              </span>
              All work
            </Link>
            <p className="label text-dim">
              Exhibit <span className="text-ivory">{number}</span> / {total}
            </p>
          </div>

          <div className="mt-14 md:mt-20">
            <p className="label flex items-center gap-4 text-accent">
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              {project.category}
            </p>
            <MaskLines
              as="h1"
              immediate
              delay={0.15}
              lines={[project.title]}
              className="display mt-6 text-[clamp(3.6rem,13vw,13rem)]"
            />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-6" delay={0.3}>
              <p className="max-w-xl text-[clamp(1.15rem,1.6vw,1.4rem)] leading-relaxed text-muted">{project.shortDescription}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-ivory py-2.5 pl-5 pr-2.5 font-medium text-void transition-colors duration-300 hover:bg-accent"
                  >
                    View live project
                    <span className="grid size-8 place-items-center rounded-full bg-void text-ivory">
                      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
                    </span>
                  </a>
                )}
                {project.isPlaceholder && <PlaceholderTag />}
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.4}>
              <dl className="grid grid-cols-2 border-l border-t border-line">
                {meta.map((m) => (
                  <div key={m.k} className="border-b border-r border-line p-5">
                    <dt className="label text-[0.75rem] text-dim">{m.k}</dt>
                    <dd className="mt-2 text-ivory">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </header>

      <CaseHeroVisual project={project} number={number} />

      {/* ---------------------------------------------------------- Chapters */}
      <div className="shell mt-28 grid gap-12 md:mt-40 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-32">
            <CaseChapterNav items={[...chapters, { id: "gallery", index: galleryIndex, label: "Final design" }]} />
          </div>
        </aside>

        <div className="lg:col-span-9">
          <Chapter id="overview" index="01" kicker="At a glance" title={<>The work, <span className="serif-accent text-muted">in short.</span></>}>
            <Lead>{project.shortDescription}</Lead>

            {project.highlights && project.highlights.length > 0 && (
              <dl className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-3">
                {project.highlights.map((h) => (
                  <div key={h.label} className="flex flex-col bg-void p-6">
                    <dt className="label order-2 mt-3 text-[0.75rem] text-dim">{h.label}</dt>
                    <dd className="display text-[clamp(2.6rem,4vw,3.6rem)] text-ivory">{h.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {project.deliverables && project.deliverables.length > 0 && (
                <div>
                  <p className="label text-dim">Deliverables</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.deliverables.map((d) => (
                      <li key={d} className="rounded-full border border-line-strong px-4 py-2 text-[0.95rem] text-ivory">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {project.tools && project.tools.length > 0 && (
                <div>
                  <p className="label text-dim">Tools</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tools.map((t) => (
                      <li key={t} className="rounded-full bg-panel-raised px-4 py-2 text-[0.95rem] text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Chapter>

          <Chapter id="brief" index="02" kicker="Challenge" title={<>The <span className="serif-accent text-accent">brief.</span></>}>
            {project.challenge ? (
              <Lead>{project.challenge}</Lead>
            ) : (
              <PendingNote>
                Brief pending. Describe the problem, the audience and what the work needed to achieve — in Abbas’s own words, using only confirmed details.
              </PendingNote>
            )}
          </Chapter>

          <Chapter id="direction" index="03" kicker="Approach" title={<>Direction <span className="serif-accent text-muted">&</span> rationale.</>}>
            {project.approach ? (
              <blockquote className="relative border-l-2 border-accent pl-6 md:pl-10">
                <Lead>{project.approach}</Lead>
              </blockquote>
            ) : (
              <PendingNote>Design direction pending. Explain the core idea, the visual language and why it fits the brief.</PendingNote>
            )}
          </Chapter>

          <Chapter id="process" index="04" kicker="Making" title={<>From sketch <span className="serif-accent text-muted">to</span> system.</>}>
            {project.process && project.process.length > 0 ? (
              <div className="space-y-10">
                {project.process.map((img, i) => (
                  <figure key={img.src}>
                    <div className="group overflow-hidden border border-line bg-panel">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        sizes="(min-width: 1024px) 70vw, 100vw"
                        className="h-auto w-full transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.02]"
                      />
                    </div>
                    <figcaption className="mt-4 flex gap-4 text-[0.95rem] text-muted">
                      <span className="label pt-0.5 text-[0.75rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
                      {img.caption ?? img.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : project.gallery.length === 0 ? (
              <div className="grid gap-4 sm:grid-cols-5">
                {[project.plate.variant, altVariant].map((v, i) => (
                  <figure key={i} className={i === 0 ? "sm:col-span-3" : "sm:col-span-2"}>
                    <div className="group relative aspect-[4/3] overflow-hidden border border-line bg-panel sm:aspect-auto sm:h-72">
                      <div className="absolute inset-0 opacity-80 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105">
                        <PlateArt variant={v} aspect="landscape" />
                      </div>
                    </div>
                    <figcaption className="label mt-3 text-[0.75rem] text-dim">Process visual slot {i + 1}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <Lead>Selected sketches, explorations and iterations are collected in the final design gallery below.</Lead>
            )}
          </Chapter>

          {project.outcome && (
            <Chapter id="outcome" index="05" kicker="Result" title={<>The <span className="serif-accent text-accent">outcome.</span></>}>
              <Lead>{project.outcome}</Lead>
            </Chapter>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------------- Gallery */}
      <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-24 border-t border-line bg-night/60 py-20 md:py-32">
        <div className="shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="label text-accent">
                {galleryIndex} <span className="text-dim">/ Showcase</span>
              </p>
              <MaskLines
                id="gallery-title"
                lines={[<>Final <span key="d" className="serif-accent text-muted">design.</span></>]}
                className="display mt-5 text-[clamp(2.6rem,6vw,6rem)]"
              />
            </div>
            <p className="max-w-xs leading-relaxed text-muted">
              {project.gallery.length > 0
                ? "Select any image to view it full screen."
                : `Add images to public/projects/${project.slug}/ and list them in this project’s gallery array.`}
            </p>
          </div>
          <div className="mt-14">
            <CaseGallery images={project.gallery} primary={project.plate.variant} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Next exhibit */}
      <nav aria-label="More exhibits">
        <div className="shell flex items-center justify-between gap-6 border-b border-line py-6">
          <Link href={`/work/${prev.slug}`} className="group inline-flex items-center gap-3 text-muted hover:text-ivory">
            <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" aria-hidden="true" />
            <span className="label">Previous</span>
            <span className="hidden sm:inline">{prev.title}</span>
          </Link>
          <Link href="/work" className="label text-muted hover:text-accent">
            Index of work
          </Link>
        </div>

        <Link href={`/work/${next.slug}`} data-cursor="Next" className="group block border-b border-line">
          <div className="shell grid items-center gap-10 py-20 md:grid-cols-12 md:py-28">
            <div className="md:col-span-6">
              <p className="label flex items-center gap-4 text-accent">
                <span aria-hidden="true" className="h-px w-10 bg-accent transition-all duration-700 ease-out-expo group-hover:w-20" />
                Next exhibit — {projectNumber(next)}
              </p>
              <p className="display mt-6 text-[clamp(3rem,8vw,8rem)] transition-colors duration-500 group-hover:text-accent">
                {next.title}
              </p>
              <p className="mt-3 text-lg text-muted">{next.category}</p>
              <span
                aria-hidden="true"
                className="mt-10 grid size-20 place-items-center rounded-full border border-line-strong transition-all duration-700 ease-out-expo group-hover:border-accent group-hover:bg-accent group-hover:text-void md:size-24"
              >
                <ArrowUpRight className="size-7 transition-transform duration-700 ease-out-expo group-hover:rotate-45" />
              </span>
            </div>
            <div aria-hidden="true" className="md:col-span-6">
              <div
                style={{ aspectRatio: visualRatio(next) }}
                className={cn(
                  "relative overflow-hidden transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5 motion-reduce:transform-none",
                  visualFrame(next),
                )}
              >
                <ProjectVisual project={next} sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
            </div>
          </div>
        </Link>
      </nav>

      <ContactBand title="Like what’s in the archive?" />
    </article>
  );
}
