import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/types/content";
import { getAdjacentProjects, projectNumber } from "@/data/projects";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { ContactBand } from "@/components/ui/ContactBand";
import { CaseHeroVisual } from "./CaseHeroVisual";
import { PlaceholderTag } from "./PlaceholderTag";
import { PlateArt } from "./ExhibitPlate";
import type { PlateVariant } from "@/types/content";

/** Clearly-marked slot telling Abbas what belongs here. Never pretends to be content. */
function PendingNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex gap-3 border border-dashed border-line-strong p-5 text-[0.95rem] leading-relaxed text-muted">
      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full border border-accent" />
      <span>{children}</span>
    </p>
  );
}

function Chapter({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="shell grid gap-8 border-t border-line py-16 md:grid-cols-12 md:py-24">
      <div className="md:col-span-4">
        <p className="label text-accent">{index}</p>
        <h2 className="display mt-4 text-[clamp(2rem,3.6vw,3.4rem)]">{title}</h2>
      </div>
      <div className="md:col-span-7 md:col-start-6">
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}

const ALT_VARIANTS: PlateVariant[] = ["web", "app", "brand", "graphic", "print", "system"];

export function CaseStudyLayout({ project }: { project: Project }) {
  const { prev, next } = getAdjacentProjects(project.slug);
  const meta = [
    { k: "Discipline", v: project.category },
    project.deliverables?.length ? { k: "Deliverables", v: project.deliverables.join(", ") } : null,
    project.client ? { k: "Client", v: project.client } : null,
    project.year ? { k: "Year", v: project.year } : null,
    project.role ? { k: "Role", v: project.role } : null,
  ].filter(Boolean) as { k: string; v: string }[];

  const altVariant = ALT_VARIANTS[(ALT_VARIANTS.indexOf(project.plate.variant) + 1) % ALT_VARIANTS.length]!;

  return (
    <article>
      {/* Title block */}
      <header className="shell pb-16 pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+6rem)]">
        <Link href="/work" className="label group inline-flex items-center gap-3 text-muted hover:text-ivory">
          <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" aria-hidden="true" />
          The archive
        </Link>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="label text-accent">
              Exhibit {projectNumber(project)} — {project.category}
            </p>
            <MaskLines
              as="h1"
              immediate
              delay={0.15}
              lines={[project.title]}
              className="display mt-6 text-[clamp(3.4rem,11vw,11rem)]"
            />
          </div>
          <div className="flex flex-col justify-end gap-5 lg:col-span-4">
            <p className="text-[1.15rem] leading-relaxed text-muted">{project.shortDescription}</p>
            {project.isPlaceholder && <PlaceholderTag />}
          </div>
        </div>

        <dl className="mt-16 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {meta.map((m) => (
            <div key={m.k}>
              <dt className="label text-[0.75rem] text-dim">{m.k}</dt>
              <dd className="mt-2 text-ivory">{m.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <CaseHeroVisual project={project} />

      <div className="mt-24 md:mt-36">
        <Chapter index="01" title="The brief">
          {project.challenge ? (
            <p className="text-[1.2rem] leading-relaxed text-ivory/90">{project.challenge}</p>
          ) : (
            <PendingNote>
              Brief pending. Describe the problem, the audience and what the work needed to achieve — in Abbas’s own words, using only confirmed details.
            </PendingNote>
          )}
        </Chapter>

        <Chapter index="02" title="Direction & rationale">
          {project.approach ? (
            <p className="text-[1.2rem] leading-relaxed text-ivory/90">{project.approach}</p>
          ) : (
            <PendingNote>
              Design direction pending. Explain the core idea, the visual language and why it fits the brief.
            </PendingNote>
          )}
        </Chapter>

        <Chapter index="03" title="Process">
          {project.gallery.length === 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {[project.plate.variant, altVariant].map((v, i) => (
                <figure key={i}>
                  <div className="relative aspect-[4/3] overflow-hidden border border-dashed border-line-strong opacity-70">
                    <PlateArt variant={v} aspect="landscape" />
                  </div>
                  <figcaption className="label mt-3 text-[0.75rem] text-dim">Process visual slot {i + 1}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <p className="leading-relaxed text-muted">Selected sketches, explorations and iterations appear in the gallery below.</p>
          )}
        </Chapter>

        {project.outcome && (
          <Chapter index="04" title="Outcome">
            <p className="text-[1.2rem] leading-relaxed text-ivory/90">{project.outcome}</p>
          </Chapter>
        )}
      </div>

      {/* Final design gallery */}
      <section aria-labelledby="gallery-title" className="mt-10 border-t border-line pt-16 md:pt-24">
        <div className="shell">
          <p className="label text-accent">{project.outcome ? "05" : "04"}</p>
          <h2 id="gallery-title" className="display mt-4 text-[clamp(2rem,3.6vw,3.4rem)]">
            Final design
          </h2>
        </div>
        {project.gallery.length > 0 ? (
          <div className="shell mt-12 grid gap-6 md:grid-cols-12">
            {project.gallery.map((img, i) => (
              <figure key={img.src} className={i % 3 === 0 ? "md:col-span-12" : "md:col-span-6"}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes={i % 3 === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                  className="h-auto w-full border border-line"
                />
                {img.caption && <figcaption className="mt-3 text-sm text-muted">{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        ) : (
          <div className="shell mt-12">
            <PendingNote>
              Gallery pending. Add images to <code className="text-ivory">public/projects/{project.slug}/</code> and list them in
              this project’s <code className="text-ivory">gallery</code> array — they’ll be laid out here with captions.
            </PendingNote>
          </div>
        )}
      </section>

      {/* Previous / next */}
      <nav aria-label="More exhibits" className="mt-32 grid border-y border-line md:grid-cols-2">
        {[
          { p: prev, dir: "Previous", Icon: ArrowLeft },
          { p: next, dir: "Next", Icon: ArrowRight },
        ].map(({ p, dir, Icon }, i) => (
          <Link
            key={dir}
            href={`/work/${p.slug}`}
            data-cursor={dir}
            className={`group relative overflow-hidden px-[var(--gutter)] py-14 md:py-20 ${i === 0 ? "md:border-r md:border-line" : "md:text-right"}`}
          >
            <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-panel transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
            <span className={`label relative flex items-center gap-3 text-muted ${i === 1 ? "md:justify-end" : ""}`}>
              {i === 0 && <Icon className="size-4" aria-hidden="true" />}
              {dir} exhibit
              {i === 1 && <Icon className="size-4" aria-hidden="true" />}
            </span>
            <span className="display relative mt-4 block text-[clamp(2.2rem,5vw,4.6rem)] transition-colors group-hover:text-accent">
              {p.title}
            </span>
            <span className="relative mt-2 block text-muted">{p.category}</span>
          </Link>
        ))}
      </nav>

      <ContactBand title="Like what’s in the archive?" />
    </article>
  );
}
