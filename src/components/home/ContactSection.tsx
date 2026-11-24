import { site } from "@/data/site";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ContactDetails } from "@/components/ui/ContactDetails";

export function ContactSection() {
  const { contact } = site;
  return (
    <section data-scene="contact" aria-labelledby="contact-title" className="relative z-10 flex min-h-[100svh] flex-col justify-center py-28">
      <div className="shell">
        <SectionLabel index="A/05">Contact</SectionLabel>
        <div className="mt-10 grid items-end gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <MaskLines
              id="contact-title"
              lines={[contact.title[0], <span key="w" className="serif-accent text-accent">{contact.title[1]}</span>]}
              className="display text-[clamp(3.2rem,9.6vw,10rem)]"
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-lg text-[1.15rem] leading-relaxed text-muted">{contact.subline}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="flex flex-col items-start gap-10 lg:col-span-4 lg:items-end">
            <MagneticButton href="/contact" variant="orb" strength={0.4} cursorLabel="Start">
              Start a<br />project
            </MagneticButton>
          </Reveal>
        </div>
        <Reveal delay={0.25} className="mt-20">
          <ContactDetails />
        </Reveal>
      </div>
    </section>
  );
}
