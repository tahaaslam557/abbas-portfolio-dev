# Abbas Ali — The Dimensional Design Archive

An immersive 3D portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4,
React Three Fiber and Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

## Art direction

- **Palette:** obsidian `#08090B`, warm ivory `#F2EFE9`, one controlled vermilion signal `#FF5A36`.
  Tokens live in `src/app/globals.css` (`@theme`).
- **Type:** Bricolage Grotesque (display) · Instrument Sans (text) · Instrument Serif italic (accent words only).
- **Signature object — "The Continuum" (Object 001):** a procedural satin-metal ribbon drawn like a
  broad-nib pen stroke in 3D. It swells and pinches as it folds, and its reverse face is warm vermilion
  metal that only flashes where the ribbon turns over. It travels through the home page and changes
  pose for each section (`src/lib/scene.ts`).

## Editing content

All copy and portfolio data live in `src/data/`:

| File | What it controls |
|---|---|
| `site.ts` | Name, role, hero copy, about copy, contact details, navigation, socials |
| `projects.ts` | Every project / case study |
| `services.ts` | Disciplines, tools, process stages |

### Adding real work

The six projects in `projects.ts` are **placeholder slots** (`isPlaceholder: true`) and are
labelled as such in the UI. To publish real work:

1. Add images to `public/projects/<slug>/`.
2. In the project entry, set `coverImage` (and optionally `gallery`) with `src`, `alt`, `width`, `height`.
3. Replace `title` and `shortDescription`. Add `client`, `year`, `role`, `challenge`, `approach` or
   `outcome` **only when confirmed**. Empty fields are hidden or shown as clearly-marked "pending" notes.
4. Set `isPlaceholder: false`.

`plate.aspect` (`wide` / `landscape` / `portrait` / `square`) sets the frame proportion in the
exhibition gallery, so pick the one closest to the cover image.

### Contact details

`site.contact.email` is `null` by default, so no `mailto:` link is rendered. Set it to a real address to
publish one. Add only verified profiles to `site.socials`.

## Contact form

`POST /api/contact` validates submissions (`src/lib/contact.ts`). **No delivery service is configured**, so
the route currently returns a clear "not connected" error and the form shows a notice.

To go live, set `CONTACT_WEBHOOK_URL` in the deployment environment (for example a Formspree, Make,
Zapier or Slack webhook, or your own endpoint). The validated JSON payload is POSTed there.

## 3D, performance & accessibility

- The canvas is code-split (`next/dynamic`, `ssr: false`), fixed behind the content, and never captures
  pointer events. All content is real HTML.
- An SVG poster of the same sculpture renders immediately and stays if WebGL is unavailable.
  Test with `?webgl=0`.
- Mobile and low-power devices get a lighter sculpture (fewer segments, lower DPR, no orbiting frames).
- `prefers-reduced-motion`: static sculpture, no scroll choreography, and the spatial gallery is
  replaced by a vertical sequence.
- The custom cursor only runs on fine pointers and never hides the cursor for touch users.

## Design system & UI UX Pro Max

The project's design rules live in `design-system/abbas-ali-archive/MASTER.md`, following the
UI UX Pro Max skill's Master + Overrides pattern (skill installed at `.agents/skills/ui-ux-pro-max`).
Add page-specific overrides under `design-system/abbas-ali-archive/pages/`. Query the skill with, e.g.:

```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "focus not obscured" --domain ux
python .agents/skills/ui-ux-pro-max/scripts/search.py "dispose geometry" --stack threejs
```
