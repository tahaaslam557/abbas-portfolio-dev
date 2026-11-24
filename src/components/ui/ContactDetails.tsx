import { site } from "@/data/site";

/**
 * Contact details row. Only real, supplied details become links;
 * missing ones render as an obvious "to be added" slot.
 */
export function ContactDetails() {
  const { contact, socials } = site;
  return (
    <dl className="grid gap-8 border-t border-line pt-6 sm:grid-cols-3">
      <div>
        <dt className="label text-[0.75rem] text-dim">Email</dt>
        <dd className="mt-2">
          {contact.email ? (
            <a href={`mailto:${contact.email}`} className="text-lg text-ivory hover:text-accent">
              {contact.email}
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-muted">
              <span aria-hidden="true" className="size-1.5 rounded-full border border-accent" />
              To be added — use the project form
            </span>
          )}
        </dd>
      </div>
      <div>
        <dt className="label text-[0.75rem] text-dim">Currently</dt>
        <dd className="mt-2 text-ivory">
          {site.role}, {site.company}
        </dd>
      </div>
      <div>
        <dt className="label text-[0.75rem] text-dim">Elsewhere</dt>
        <dd className="mt-2">
          {socials.length ? (
            <ul className="flex flex-wrap gap-4">
              {socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="text-ivory hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-muted">Profiles coming soon</span>
          )}
        </dd>
      </div>
    </dl>
  );
}
