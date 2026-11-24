import type { Metadata } from "next";
import { site } from "@/data/site";
import { ContactForm } from "@/components/ui/ContactForm";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SceneFallback } from "@/components/three/SceneFallback";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}.`,
};

export default function ContactPage() {
  const connected = Boolean(process.env.CONTACT_WEBHOOK_URL);
  return (
    <section className="relative overflow-hidden pb-32 pt-[calc(var(--header-h)+5rem)] md:pt-[calc(var(--header-h)+7rem)]">
      {/* the signature object, quietly present as a watermark */}
      <SceneFallback className="pointer-events-none absolute -left-[22vw] bottom-[-8vh] h-[72vh] w-[64vw] opacity-[0.18]" />
      <div className="shell relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="C/00">Contact</SectionLabel>
          <MaskLines
            as="h1"
            immediate
            delay={0.2}
            lines={["Let’s make", <span key="i" className="serif-accent text-accent">it impossible</span>, "to ignore."]}
            className="display mt-8 text-[clamp(3rem,7vw,7rem)]"
          />
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-md text-[1.1rem] leading-relaxed text-muted">
              Websites, apps, identities, graphics or print — share the idea and a little context. A good brief is a few honest sentences.
            </p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.3}>
          <ContactForm connected={connected} />
        </Reveal>
      </div>
      <div className="shell relative mt-28">
        <ContactDetails />
      </div>
    </section>
  );
}
