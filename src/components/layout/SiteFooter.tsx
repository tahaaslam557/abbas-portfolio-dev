import Link from "next/link";
import { site } from "@/data/site";
import { BackToTop } from "./BackToTop";
import { CurrentYear } from "./CurrentYear";

export function SiteFooter() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-line bg-void">
      <div className="shell grid gap-12 pb-8 pt-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label text-dim">Abbas Ali — Design Archive</p>
          <p className="mt-4 max-w-sm text-muted">
            {site.role} at {site.company}. Website, app, identity, graphic and print design.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-4">
          <p className="label text-dim">Index</p>
          <ul className="mt-4 grid grid-cols-2 gap-y-2">
            {[{ label: "Home", href: "/" }, ...site.nav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ivory/85 transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-6 md:col-span-3 md:items-end">
          {site.socials.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="text-muted hover:text-ivory">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <BackToTop />
        </div>
      </div>

      {/* Oversized outlined wordmark as the closing gesture */}
      <div aria-hidden="true" className="shell select-none overflow-hidden">
        <p className="display outline-type whitespace-nowrap pb-[0.06em] pt-6 text-[24.5vw] leading-[0.82]">
          Abbas Ali
        </p>
      </div>

      <div className="shell flex flex-col justify-between gap-2 border-t border-line py-5 text-xs text-dim sm:flex-row">
        <p>© <CurrentYear /> {site.name}. All rights reserved.</p>
        <p>Designed as a living archive.</p>
      </div>
    </footer>
  );
}
