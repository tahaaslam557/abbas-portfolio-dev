import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";

/** Compact closing CTA used at the end of inner pages. */
export function ContactBand({ title = "Have something worth making?" }: { title?: string }) {
  return (
    <section aria-label="Start a project" className="relative mt-40 border-t border-line">
      <div className="shell flex flex-col items-start justify-between gap-10 py-24 md:flex-row md:items-center">
        <Reveal>
          <p className="label text-accent">Next</p>
          <p className="display mt-4 max-w-3xl text-[clamp(2.4rem,5.4vw,5.2rem)]">{title}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <MagneticButton href="/contact" variant="orb" cursorLabel="Start">
            Start a<br />project
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
