# ABBAS ALI — IMMERSIVE 3D DESIGN PORTFOLIO
## Claude Code Master Build Specification

> **Mission:** Build a distinctive, award-calibre personal portfolio for Abbas Ali. This must not look like a conventional portfolio template, agency landing page, SaaS website, or a collection of generic cards. The website itself should feel like an interactive piece of design.

---

## 0. READ THIS FIRST — NON-NEGOTIABLE CREATIVE DIRECTION

The previous design direction was not successful. **Start the visual design from zero. Do not reuse the previous page layout, section order, card design, palette, hero composition, or visual styling.**

The user is asking for a genuinely original **3D / spatial / immersive designer portfolio**. Treat the references as quality and interaction inspiration—not as templates to copy.

### Core creative concept: “THE DIMENSIONAL DESIGN ARCHIVE”

Create a dark, atmospheric digital exhibition space: part contemporary design gallery, part experimental digital art installation, part editorial portfolio.

The visitor should feel as if they are entering Abbas's creative universe. A central 3D art object / kinetic sculpture acts as the visual identity of the experience. Project work is revealed through floating exhibition frames, layered planes, spatial transitions, and carefully art-directed mockups.

This is not a literal room with walls and furniture. It is an abstract, elegant digital environment with depth, perspective, light, and motion.

**The 3D world must support the portfolio—not hide it.** Projects, services, biography, and contact information must remain easy to discover and use. Do not make visitors solve a game or struggle to navigate.

### Design principles

- Art direction first; code second.
- Distinctive and expressive, but still polished and professional.
- Deep dark canvas, sophisticated lighting, restrained accent color.
- Oversized typography with intentional editorial composition.
- Real design work is the hero. Do not invent fake client projects or fake outcomes.
- Spatial depth, parallax, perspective, and tactile interactions.
- Strong hierarchy and generous negative space.
- Every animation has a purpose and a clear end state.
- The site must remain fast, accessible, responsive, and usable without WebGL.

---

## 1. PERSON & CONTENT CONTEXT

**Name:** Abbas Ali  
**Current role:** Design Unit Head at Mindwave  
**Disciplines:**
- Website design
- Mobile app design
- Logo design and brand identity
- Graphic design
- Print design
- Adobe Illustrator
- Adobe Photoshop
- Related visual design and creative direction work

Position Abbas as a multidisciplinary designer and design lead. The writing should sound confident, thoughtful, and human—not exaggerated, full of buzzwords, or AI-generated.

Do not invent:
- Years of experience
- Awards
- Client names
- Project metrics or conversion results
- Testimonials
- Social handles, email addresses, phone numbers, or location
- Exact responsibilities at Mindwave beyond the supplied title

If a detail is missing, use an editable content placeholder or omit it. Keep all portfolio content in a central data/content file so Abbas can update it without editing components.

### Suggested positioning copy (editable)

**Hero headline direction:**
“Making ideas
impossible to ignore.”

Alternative line for experimentation:
“Designing what comes next.”

**Supporting statement:**
“I'm Abbas Ali—a multidisciplinary designer shaping digital experiences, visual identities, and meaningful brand worlds.”

**Role detail:**
“Design Unit Head · Mindwave”

Use these as starting copy, not fixed text. Refine them to fit the final art direction.

---

## 2. VISUAL IDENTITY — MAKE AN ORIGINAL DECISION

The user has deliberately left the palette and styling to the designer. Choose a cohesive, premium dark art direction. Do not carry over the previous green or orange palettes by default.

### Recommended art direction: Obsidian / Warm Ivory / Electric Vermilion

Use a mostly near-black environment with warm off-white typography and a small, highly controlled signal color. A restrained vermilion/coral accent is recommended because it creates memorable contrast against the dark environment and feels editorial rather than corporate.

Suggested tokens (you may tune them after checking contrast and the 3D lighting):

| Token | Suggested value | Usage |
|---|---|---|
| `--color-void` | `#08090B` | Main page background |
| `--color-night` | `#101216` | Alternate dark section |
| `--color-panel` | `#171A20` | Cards and panels |
| `--color-panel-raised` | `#20242C` | Hovered / raised surfaces |
| `--color-ivory` | `#F2EFE9` | Main typography |
| `--color-muted` | `#A4A6AA` | Supporting text |
| `--color-dim` | `#686D75` | Metadata and subtle labels |
| `--color-accent` | `#FF5A36` | Main interaction accent |
| `--color-accent-soft` | `#FF8064` | Hover / glow |
| `--color-line` | `rgba(242,239,233,0.13)` | Borders and separators |

Use accent color sparingly. The website should not become a red/orange neon site. Keep the majority of the canvas near-black; use ivory for legibility and the accent to guide attention.

### Visual materials

Use a curated combination of:
- Smoked glass
- Satin / brushed metal
- Dark translucent acrylic
- Matte black surfaces
- Subtle grain and fine noise
- Soft volumetric light
- Controlled reflections
- Occasional iridescent or warm edge highlights

Avoid:
- Generic purple-blue AI gradients
- Excessive glassmorphism on every component
- Random neon outlines
- Gaming HUD interfaces
- Overused glowing blobs
- Default gradient text everywhere
- Huge empty black gaps without visual purpose
- A generic grid of rounded cards

### Typography

Use a strong editorial pairing:
- Display: a distinctive modern grotesk / neo-grotesk with confident proportions.
- Supporting text: a highly readable neutral sans-serif.
- Optional editorial accent: a restrained serif italic for a few words only.

Suggested Google Fonts to evaluate: `Space Grotesk`, `Manrope`, `DM Sans`, `Sora`, `Instrument Serif`. Choose a deliberate pairing, not all of them. Load fonts with `next/font`.

Typography should have scale and rhythm:
- Hero headline: large, responsive, expressive, tightly composed.
- Section titles: oversized but controlled.
- Body: readable line length and generous leading.
- Metadata: small uppercase labels with tracking.
- Do not make all text tiny to imitate an award-site screenshot.

---

## 3. EXPERIENCE DESIGN — HOW THE SITE SHOULD FEEL

### The opening sequence

1. Show a brief, elegant loading state only if the 3D scene genuinely needs it. Never force a long intro.
2. Reveal the hero typography and central 3D sculpture with a carefully choreographed entrance.
3. The sculpture responds subtly to pointer movement and device orientation where supported.
4. The visitor can immediately scroll or use the navigation—no “click to enter” gate.
5. A small scroll cue communicates that the page continues.

### Signature 3D object

Create an original abstract sculpture that becomes Abbas's visual signature. Choose one coherent concept and execute it beautifully, for example:
- A dimensional, folded ribbon / continuous loop with a satin-metal finish.
- A sculptural monogram-like form based on abstract geometry (do not invent a final logo without supplied brand assets).
- Layered translucent planes that fold, rotate, and catch warm light.
- A floating composition of carefully balanced geometric forms.

Do not use a generic spinning torus as the final hero. Do not use a stock 3D model without art direction. If the exact object is difficult, create it from procedural geometry and materials in Three.js.

The sculpture should:
- Have intentional silhouette and composition.
- React gently to cursor movement.
- Have a slow idle animation.
- Respond to scroll progress with controlled rotation / position changes.
- Never obstruct the headline or CTA.
- Be replaced by a static art-directed fallback on low-power devices or when WebGL is unavailable.

### Spatial project gallery

Selected work should feel like an exhibition:
- Project artwork appears in large, floating frames / layered planes.
- Use perspective and depth to create spatial hierarchy.
- As the visitor scrolls, the active project comes forward while previous/next projects recede.
- Each project has a clear title, discipline, year (only if supplied), and a short description.
- Hover / focus can reveal a small interaction hint or project metadata.
- Clicking/tapping opens a dedicated case study or a clearly structured project detail view.
- The user must always understand which project is active and how to open it.

Do not make all project cards identical. Use varied compositions and aspect ratios based on the actual assets.

### Motion language

Motion should feel fluid, deliberate, and tactile:
- Spring-based micro-interactions
- Smooth but restrained scroll choreography
- Depth-aware parallax
- Staggered typography reveals
- Image masks / clip-path reveals
- Soft magnetic pull on selected desktop buttons
- Cursor-reactive light / object movement, only where it improves the experience
- Seamless transitions between project views

Respect `prefers-reduced-motion`. Disable or simplify scroll-linked motion for reduced-motion users. Do not hijack native scrolling.

---

## 4. SITE MAP & CONTENT ARCHITECTURE

Build a complete portfolio, not just a one-screen experiment.

### A. Home `/`

**1. Navigation**
- Abbas Ali wordmark (text-based until an official logo is supplied).
- Work
- About
- Services
- Contact
- A compact “Let’s talk” CTA
- Navigation becomes compact / changes treatment on scroll.
- Mobile navigation is a clean full-screen or slide-over panel with accessible controls.

**2. Hero — “Enter the archive”**
- Full viewport, dark atmospheric canvas.
- Oversized editorial headline.
- Short intro line and role detail.
- One primary CTA: “Explore selected work”.
- One secondary CTA: “Let’s talk”.
- The 3D signature sculpture is the hero's main visual anchor.
- Small scroll indicator.
- Composition must feel custom art-directed, not like a centered SaaS hero.

**3. Selected work — “A few things made with intent”**
- Immersive horizontal / spatial project sequence on desktop, but do not force horizontal scrolling on mobile.
- Feature 4–6 projects if actual work is provided.
- Each project gets a unique visual composition.
- Provide a normal accessible list/grid fallback and visible project links.
- Add a “View all work” link if there are more projects.

**4. About — “The mind behind the making”**
- Editorial split composition.
- Short biography and approach to design.
- Show current role: Design Unit Head at Mindwave.
- A portrait may be used only if Abbas supplies one. Otherwise use an abstract graphic composition, not a fake person image.
- Add a small list of disciplines / capabilities.

**5. Services / disciplines**
Present the design disciplines as an integrated capability system:
- Digital experiences: Website design, UI design, responsive web design.
- Product experiences: Mobile app design, UX flows, interface systems.
- Brand worlds: Logo design, brand identity, visual systems.
- Visual communication: Graphic design, print design, campaign assets.
- Tools: Adobe Illustrator, Adobe Photoshop.
Do not claim unsupported expert-level mastery for every tool; present tools as part of his workflow.

**6. Approach / process**
A concise four-stage process:
- Discover — understand the brief, audience, and problem.
- Define — establish direction, structure, and visual language.
- Design — explore, refine, and craft the solution.
- Deliver — prepare polished, practical final assets.
Keep copy editable and avoid claiming a process is used if Abbas later says otherwise.

**7. Contact finale**
- Strong typographic closing statement.
- Clear “Start a project” CTA.
- Contact links only when real details are provided.
- If email is missing, use a clearly marked placeholder in content data, not a fake live mailto link.

**8. Footer**
- Minimal, dark, elegant.
- Navigation and verified social links only.
- Back-to-top interaction.
- Current year generated dynamically.

### B. Work index `/work`

- A dedicated overview of all supplied projects.
- Filter by discipline only if there are enough projects to make filtering useful.
- Use editorial layouts, not a generic admin-style filter bar.
- Include empty states that explain where project content belongs.
- Each project links to its own case study.

### C. Project case study `/work/[slug]`

Create a reusable case-study template with:
- Project title and concise summary.
- Project discipline / deliverables.
- Client and year only if supplied.
- Large hero visual.
- The brief / challenge.
- Design direction and rationale.
- Selected process visuals.
- Final design gallery.
- Responsive image handling and captions.
- Previous / next project navigation.
- Contact CTA.

Do not fabricate client briefs, outcomes, metrics, or testimonials. Use editable placeholders until real case-study content is provided.

### D. About `/about`

- More detailed biography.
- Design philosophy.
- Current role at Mindwave.
- Capabilities and tools.
- Optional timeline only if dates and milestones are supplied.

### E. Contact `/contact`

- Elegant, minimal contact page.
- Functional form with validation and success / error states.
- Do not pretend a form sends messages unless a real backend or form service is configured. If no backend exists, create a clearly documented integration point and a mailto fallback only after a real email is supplied.

---

## 5. TECHNICAL STACK & ARCHITECTURE

The user specified **Next.js**. Use the following stack unless the existing project already has a compatible setup. Inspect the repository before installing or replacing anything.

### Core
- Next.js App Router
- TypeScript (strict)
- Tailwind CSS
- React
- `next/font`
- ESLint

### 3D
- Three.js
- React Three Fiber (`@react-three/fiber`)
- Drei (`@react-three/drei`)
- Use procedural geometry / custom materials for the signature sculpture.
- Use `Suspense` and lazy loading for 3D components.
- Keep the Canvas isolated in client components; do not turn the entire app into a client-rendered application.

### Motion
- Motion for React (`motion`) for interface transitions, layout, gestures, and scroll-linked UI.
- Use GSAP only if a specific timeline interaction cannot be implemented cleanly with Motion. Do not add multiple animation libraries without a clear reason.
- Avoid animating expensive 3D properties from React state on every frame; use frame-loop refs / Three.js primitives appropriately.

### Optional utilities
- `lucide-react` for a consistent icon system.
- `clsx` and `tailwind-merge` for class composition if useful.
- `zod` only if needed for form validation.

### Architecture expectations

Use a clean, maintainable structure similar to:

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    work/
      page.tsx
      [slug]/
        page.tsx
    about/
      page.tsx
    contact/
      page.tsx
  components/
    layout/
      SiteHeader.tsx
      SiteFooter.tsx
      MobileNavigation.tsx
    home/
      HeroSection.tsx
      SelectedWork.tsx
      AboutPreview.tsx
      ServicesSection.tsx
      ProcessSection.tsx
      ContactSection.tsx
    three/
      ExperienceCanvas.tsx
      SignatureSculpture.tsx
      SpatialProjectGallery.tsx
      SceneFallback.tsx
    work/
      ProjectCard.tsx
      ProjectGallery.tsx
      CaseStudyLayout.tsx
    ui/
      MagneticButton.tsx
      SectionLabel.tsx
      Reveal.tsx
      CustomCursor.tsx
  data/
    site.ts
    projects.ts
    services.ts
  hooks/
  lib/
  types/
  public/
    images/
    projects/
    models/
```

Adjust the structure to the current Next.js version and project conventions. Do not create unnecessary abstractions.

### Data model

Keep portfolio content separate from presentation.

Each project should support:
- `slug`
- `title`
- `category`
- `shortDescription`
- `role` (only if confirmed)
- `year` (optional)
- `coverImage`
- `thumbnailImage` (optional)
- `gallery` (array)
- `challenge` (optional)
- `approach` (optional)
- `outcome` (optional, only factual and supplied)
- `featured` (boolean)
- `sortOrder`

Create TypeScript types and sample placeholder entries that are obviously marked as replaceable—not fake real projects.

---

## 6. 3D IMPLEMENTATION DETAILS

### Performance strategy

The 3D scene must be beautiful but must not make the website slow or unusable.

- Keep geometry and material counts low.
- Prefer procedural geometry over large downloaded models when practical.
- Use compressed textures and optimized image formats.
- Avoid huge 4K textures unless truly necessary.
- Use instancing for repeated geometry.
- Avoid excessive real-time shadows, post-processing, bloom, and transparent layers.
- Use post-processing sparingly; test on mid-range hardware.
- Dynamically import the 3D scene with SSR disabled only for the component that requires browser/WebGL APIs.
- Do not block meaningful page content while the scene loads.
- Use a poster / CSS fallback immediately.
- Pause or reduce rendering when the scene is offscreen or the tab is hidden where practical.
- Consider device capability and reduce DPR / effects on mobile.
- Keep a functional non-WebGL version.
- Avoid layout shift during scene initialization.

### Interaction and accessibility

- The 3D Canvas must not capture all pointer events or block links.
- All important actions must be available through normal HTML buttons and links.
- Keyboard users must be able to navigate the whole site.
- Provide focus-visible states.
- Use semantic headings and landmarks.
- Provide text alternatives for meaningful project images.
- Do not put essential copy only inside WebGL.
- Respect `prefers-reduced-motion`.
- Avoid flashing, intense camera movement, or motion that can cause discomfort.

### Responsive behavior

**Desktop:** Full 3D art direction, layered project planes, pointer-reactive sculpture, rich transitions.

**Tablet:** Reduce depth layers and simplify scroll choreography. Maintain strong editorial composition.

**Mobile:** Do not squeeze the desktop 3D scene into a phone. Use a simplified sculpture, static poster, or lightweight 3D variant; present projects in a clean vertical sequence. All text and CTAs remain easy to reach. No horizontal scroll traps.

---

## 7. ART DIRECTION DETAILS — MAKE IT FEEL DESIGNED

### Layout rhythm
- Use a strong grid but break it intentionally.
- Mix full-bleed moments with narrow editorial text columns.
- Use asymmetry and overlap with purpose.
- Give featured projects room to breathe.
- Vary section pacing: quiet → expressive → quiet → immersive.
- Use hairline dividers and small metadata labels to create structure.

### Cursor
A custom cursor may be used on desktop only if it adds meaningful feedback:
- Small dot / ring system.
- Expands over interactive project elements.
- Never replaces the system cursor for keyboard / touch users.
- Disable on touch and coarse-pointer devices.
- Keep it subtle and performant.

### Project interactions
- On hover: slight image depth shift, subtle frame tilt, title reveal, or accent detail.
- On focus: provide the same information without requiring hover.
- On click: navigate to case study.
- Do not make project cards draggable unless there is a clear usability benefit.

### Transitions
- Page transitions should be short, smooth, and skippable.
- Avoid long cinematic waits.
- Do not trap browser back/forward navigation.
- Preserve scroll restoration sensibly.

---

## 8. ASSETS & CONTENT RULES

Before building the final visuals:
1. Inspect the project directory for user-supplied images, logos, fonts, and project assets.
2. Inventory assets and map them to the project data model.
3. Use real work supplied by Abbas wherever available.
4. If no work assets exist, build a beautiful visual system with clearly labeled placeholder project slots.
5. Make replacing placeholders straightforward.

Never:
- Use random stock photos as if they are Abbas's work.
- Invent brand identities or client projects and present them as real.
- Use reference-site screenshots as actual portfolio projects.
- Use unlicensed images or logos.
- Generate a fake portrait of Abbas.
- Invent external links or social accounts.

If a visual placeholder is required, use original abstract shapes, procedural 3D geometry, or neutral mockup frames—not misleading portfolio claims.

---

## 9. REFERENCE SOURCES & HOW TO USE THEM

Study these references for craft, interaction quality, and visual exploration. Do not reproduce a specific site or template.

- Awwwards — https://www.awwwards.com/
  - Study art direction, unusual composition, pacing, and the balance between experimentation and usability.
- Aceternity UI — https://ui.aceternity.com/
  - Study polished interaction patterns and selected visual effects. Do not stack effects indiscriminately.
- React Bits — https://reactbits.dev/
  - Study reusable creative React effects and motion patterns. Adapt only what fits the visual concept.
- Magic UI — https://magicui.design/
  - Study restrained animated UI details and implementation patterns.
- Dribbble UI Components — https://dribbble.com/tags/ui-components
  - Study composition, typography, visual hierarchy, and micro-detail. Treat shots as inspiration, not implementation specifications.
- Motion — https://motion.dev/
  - Use Motion for React for interaction, gestures, scroll animation, and transitions.
- UI UX Pro Max skill — https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
  - Use its design intelligence workflow to choose a coherent design system and check UX / responsive / accessibility decisions.

### Install / invoke the design skill

If it is not already installed in the Claude Code environment, inspect its current instructions and install it using its documented workflow. The repository currently documents this command:

```bash
npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max
```

Do not assume installation succeeded. Verify the skill is available, read its `SKILL.md`, and apply relevant Next.js / React / UX guidance. If the environment cannot install it, continue with the brief and state that clearly.

---

## 10. IMPLEMENTATION WORKFLOW — DO NOT SKIP

### Phase 1 — Inspect and plan
- Inspect the existing project, package manager, dependencies, and assets.
- Do not overwrite a working project blindly.
- Read this entire specification.
- Read the UI UX Pro Max skill if available.
- Decide the exact visual system: typography, spacing, color tokens, 3D object concept, and motion language.
- Create a concise implementation checklist.

### Phase 2 — Build the foundation
- Configure the Next.js App Router and TypeScript.
- Establish global design tokens and typography.
- Build the semantic page structure and navigation.
- Create the responsive layout before adding complex effects.

### Phase 3 — Build the signature 3D experience
- Create the custom procedural sculpture.
- Add controlled pointer and scroll interaction.
- Add a static / reduced-motion fallback.
- Test that the page remains usable when WebGL fails.

### Phase 4 — Build portfolio storytelling
- Implement the selected-work experience.
- Build reusable project cards and case-study pages.
- Add About, Services, Process, Contact, and Footer sections.
- Connect all content to central data files.

### Phase 5 — Motion and polish
- Add typography reveals, section transitions, image reveals, and micro-interactions.
- Add mobile-specific behavior rather than simply shrinking desktop effects.
- Check timing, easing, motion reduction, and interaction consistency.

### Phase 6 — Quality assurance
- Run lint and TypeScript checks.
- Run a production build.
- Fix all errors and warnings that affect quality.
- Test desktop, tablet, and mobile layouts.
- Test keyboard navigation and focus states.
- Test reduced-motion mode.
- Test with WebGL disabled / unavailable.
- Check image loading, layout shifts, and console errors.
- Verify every navigation item, CTA, project link, and form state.
- Remove unused dependencies and dead code.

---

## 11. DEFINITION OF DONE

The project is complete only when:

- [ ] The site has a distinctive, custom 3D visual identity.
- [ ] It does not resemble a generic agency, SaaS, or starter portfolio template.
- [ ] The first screen is visually memorable and immediately communicates Abbas's design practice.
- [ ] The 3D object is original, intentional, and performant.
- [ ] Projects are showcased as the central proof of skill.
- [ ] Work index and individual case studies function.
- [ ] About, Services, Contact, and navigation work.
- [ ] Content is editable from central data files.
- [ ] Desktop, tablet, and mobile experiences are intentionally designed.
- [ ] Reduced-motion and no-WebGL fallbacks are usable.
- [ ] Accessibility, contrast, focus, and keyboard interactions are considered.
- [ ] No fake clients, metrics, testimonials, credentials, or contact details are presented as real.
- [ ] TypeScript, lint, and production build pass.
- [ ] The implementation has been visually reviewed and refined—not merely generated and left at first draft.

---

## 12. FINAL INSTRUCTIONS TO CLAUDE CODE

You are acting as a senior creative director, award-level digital designer, 3D web artist, and senior Next.js engineer.

**Do not interpret this brief as permission to build a standard portfolio with a 3D model placed in the hero.** The spatial design language must influence the whole experience: hero, project presentation, transitions, and selected supporting sections.

At the same time, do not sacrifice usability for spectacle. This is a working professional portfolio intended to help potential clients and collaborators understand Abbas's work and contact him.

Make strong design decisions. Do not ask the user to choose every color, font, card style, or animation. Use your judgment, inspect the real assets, and build a coherent experience.

Before coding, briefly state the chosen art direction and the 3D concept. Then implement the website—not just a plan or static mockup.

**Most important:** The result must look custom-designed for Abbas Ali. If the first implementation looks like a familiar template, rethink the composition and improve it before calling the work complete.
