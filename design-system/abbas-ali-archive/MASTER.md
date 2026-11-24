# Abbas Ali — The Dimensional Design Archive · Design System (MASTER)

Global source of truth for UI decisions, following the **UI UX Pro Max** skill's
Master + Overrides pattern (`.agents/skills/ui-ux-pro-max`). Page-specific rules go in
`pages/<page>.md` and override this file.

> **Provenance.** The skill's `--design-system` run for
> `"designer portfolio immersive dark editorial 3D"` (variance 8 · motion 7 · density 3)
> returned *Hero-Centric pattern · Brutalism style · light grey + safety-orange palette ·
> Archivo / Space Grotesk*. The palette, mode and fonts conflict with the project brief,
> which fixes a dark obsidian / ivory / vermilion direction, so they were **not adopted**.
> What was adopted: the asymmetric/editorial layout bias, the single-primary-CTA hero, the
> "avoid 2D-only layouts / AI purple gradients" list, and the skill's UX, Next.js and
> Three.js rules (audited below). The implementation tokens live in `src/app/globals.css`.

## Color tokens (dark only)

| Token | Value | Use | Contrast on `void` |
|---|---|---|---|
| `--color-void` | `#08090B` | Page background | — |
| `--color-night` | `#0E1014` | Alternate section | — |
| `--color-panel` | `#15181D` | Frames, cards | — |
| `--color-panel-raised` | `#1E222A` | Hover / active surface | — |
| `--color-ivory` | `#F2EFE9` | Primary text | 17.4 : 1 |
| `--color-muted` | `#A6A7AB` | Body / supporting text | 8.3 : 1 |
| `--color-dim` | `#868B93` | Metadata, labels, placeholders | 5.8 : 1 (≥ 4.65 on every surface) |
| `--color-accent` | `#FF5A36` | Signal: CTAs, active state, indices | 6.4 : 1 |
| `--color-accent-soft` | `#FF8064` | Error text, hover glow | 8.1 : 1 |
| `--color-line` / `-strong` | ivory @ 13% / 24% | Hairlines, borders | decorative |

Rules: no raw hex in components (use tokens); accent stays under ~5% of any viewport;
text on the accent fill is `void` (6.4 : 1).

## Typography

- Display — **Bricolage Grotesque** (variable `opsz`, `wdth`), weight 500, tracking −0.045em, leading 0.9.
- Text — **Instrument Sans**, 16 px base, leading ≥ 1.5 for paragraphs.
- Accent — **Instrument Serif italic**, a few words per heading only.
- Labels — uppercase, tracking 0.18em, **minimum 12 px** (`.label`).
- Fonts load through `next/font` (self-hosted, `display: swap`).
- Paragraph measure capped at ~60–75 characters (`max-w-md` … `max-w-2xl`).

## Spacing & layout

- Gutter `clamp(1.25rem, 3.2vw, 3rem)`; shell max width 112rem; 12-column grid, broken intentionally.
- Spacious density: section padding 7–11rem desktop, 7rem mobile.
- Breakpoints verified at 390, 768, 1024, 1440 px; no horizontal scroll.

## Motion

| Token | Value |
|---|---|
| Ease out (enter) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Ease in-out | `cubic-bezier(0.76, 0, 0.24, 1)` |
| Enter | 0.5–1.15 s (type reveals), 0.3–0.5 s (UI) |
| Exit | ≈ 60% of enter, accelerating ease |
| Micro-interactions | springs (stiffness 200–380, damping 18–32) |

- `MotionConfig reducedMotion="user"` plus a hydration-safe `usePrefersReducedMotion` hook.
- Reduced motion: static sculpture (frameloop on demand), no scroll choreography, vertical work sequence, no page wipe.
- No perpetual autonomous motion: the discipline band moves only with scroll; grain is static.
- Native scrolling is never hijacked; the gallery is a sticky section driven by normal scroll.

## 3D (Three.js / React Three Fiber)

- Canvas code-split with `next/dynamic` (`ssr: false`), `alpha: true` over the CSS background, `pointer-events: none`.
- Procedural geometry only; no textures or models. Geometries are disposed on unmount.
- Tiers: `none` (SVG poster, also `?webgl=0`), `lite` (mobile / low-power: 300 segments, DPR ≤ 1.35, no frames), `full`.
- DPR capped at 1.75; environment lighting baked once (`frames={1}`).

## Interaction & accessibility checklist (skill-derived)

- [x] Visible `:focus-visible` ring (2px accent, 4px offset) on all controls, inputs included
- [x] Skip link, landmarks, one `h1` per page, labelled sections
- [x] Text contrast ≥ 4.5 : 1 for every text token on every surface
- [x] Pointer targets ≥ 24×24 CSS px (WCAG 2.2 AA); 44px for primary mobile controls
- [x] `cursor: pointer` on clickable controls; `not-allowed` on disabled ones
- [x] Hover never required: focus reveals the same metadata
- [x] `scroll-padding-top` keeps focus clear of the fixed header
- [x] Forms: visible labels, validate on blur, inline errors with `aria-describedby`, focusable error summary after a failed submit, loading → success/error states
- [x] Mobile menu: dialog semantics, focus trap, Escape to close, focus returned
- [x] `prefers-reduced-motion` respected everywhere
- [x] SVG icons only (Lucide), decorative icons `aria-hidden`
- [x] `next/image` for real project imagery, `priority` only on the case-study hero

## Anti-patterns (do not introduce)

Purple/blue AI gradients · glassmorphism on everything · neon outlines · generic rounded-card grids ·
emoji icons · placeholder-only labels · text under 12px · auto-playing motion without a pause ·
invented clients, metrics, testimonials or contact details.
