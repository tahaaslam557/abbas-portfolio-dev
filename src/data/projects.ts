import type { Project } from "@/types/content";

/**
 * PROJECTS
 * ------------------------------------------------------------------
 * Every entry below is a PLACEHOLDER SLOT (`isPlaceholder: true`).
 * They exist so the exhibition layout can be designed and reviewed —
 * they are not real client work, and the UI labels them as such.
 *
 * To publish a real project:
 *   1. Put images in /public/projects/<slug>/
 *   2. Replace title / description, add `coverImage` + `gallery`
 *   3. Add `client`, `year`, `role`, `challenge`, `approach`, `outcome`
 *      ONLY if confirmed
 *   4. Set `isPlaceholder: false`
 *
 * `plate` controls the abstract artwork + frame proportion used while
 * no `coverImage` is supplied.
 */
export const projects: Project[] = [
  {
    slug: "heth-nmn-website",
    title: "HETH",
    category: "Website Design",
    shortDescription:
      "E-commerce website for HETH, a liposomal NMN supplement brand — a fresh, science-led storefront designed for desktop and mobile.",
    client: "HETH",
    deliverables: ["Website design", "Responsive layouts", "Product page", "Design system"],
    // TODO(Abbas): add year, role, challenge and outcome once confirmed.
    approach:
      "The site moves from wireframe to mid-fidelity to final design on a 12-column, 1440px grid. The visual language pairs a deep-forest-to-lime green palette with DM Sans, soft product photography and rounded components — so the science reads as trustworthy while the brand still feels fresh and energetic. Every section was designed alongside its mobile layout.",
    coverImage: {
      src: "/projects/heth-nmn-website/cover.webp",
      alt: "HETH NMN website homepage shown on a laptop and a phone",
      width: 2800,
      height: 1673,
    },
    process: [
      {
        src: "/projects/heth-nmn-website/process-01-wireframe-to-final.webp",
        alt: "The HETH homepage in three stages: wireframe, mid-fidelity and final design",
        caption: "Wireframe → mid-fidelity → final design, on a 12-column 1440px grid.",
        width: 2800,
        height: 1084,
      },
      {
        src: "/projects/heth-nmn-website/process-02-design-system.webp",
        alt: "HETH design system on three phones: component library, typography and colour palette, and footer",
        caption: "Component library, type and colour system applied across mobile screens.",
        width: 2400,
        height: 1407,
      },
    ],
    fullPage: {
      src: "/projects/heth-nmn-website/gallery-01-full-homepage.webp",
      alt: "Full-length HETH homepage design with mobile screens alongside",
      caption: "The full homepage — hero, science, trust, testimonials, FAQ and footer.",
      width: 1600,
      height: 6840,
    },
    gallery: [
      {
        src: "/projects/heth-nmn-website/cover.webp",
        alt: "HETH NMN website homepage shown on a laptop and a phone",
        caption: "Homepage hero on desktop and mobile.",
        width: 2800,
        height: 1673,
      },
      {
        src: "/projects/heth-nmn-website/gallery-02-mobile-screens.webp",
        alt: "Three HETH mobile screens: benefits, customer review and footer",
        caption: "Mobile: benefits, customer review and footer.",
        width: 1849,
        height: 1631,
      },
      {
        src: "/projects/heth-nmn-website/gallery-03-product-photo.webp",
        alt: "A hand holding a HETH NMN Liposomal 1000mg bottle against a blue sky",
        caption: "Product photography used across the site.",
        width: 1309,
        height: 1631,
      },
      {
        src: "/projects/heth-nmn-website/gallery-04-typography-colour.webp",
        alt: "HETH typography (DM Sans) and green colour palette from #07160C to #C1DD29",
        caption: "Typography: DM Sans. Colour: five greens from forest to lime.",
        width: 1476,
        height: 1843,
      },
      {
        src: "/projects/heth-nmn-website/gallery-05-product-page.webp",
        alt: "HETH product page with quantity bundles shown on a desktop monitor",
        caption: "Product page with bundle pricing.",
        width: 2089,
        height: 1843,
      },
    ],
    featured: true,
    sortOrder: 1,
    isPlaceholder: false,
    plate: { variant: "web", aspect: "wide" },
  },
  {
    slug: "exhibit-02-mobile-app",
    title: "Exhibit 02",
    category: "Mobile App Design",
    shortDescription:
      "Reserved for a mobile app project — key flows, screens and the interface system behind them.",
    deliverables: ["App UI", "UX flows", "Interaction details"],
    gallery: [],
    featured: true,
    sortOrder: 2,
    isPlaceholder: true,
    plate: { variant: "app", aspect: "portrait" },
  },
  {
    slug: "exhibit-03-brand-identity",
    title: "Exhibit 03",
    category: "Brand Identity",
    shortDescription:
      "Reserved for a logo and identity system — the mark, its construction and the language around it.",
    deliverables: ["Logo design", "Identity system", "Brand guidelines"],
    gallery: [],
    featured: true,
    sortOrder: 3,
    isPlaceholder: true,
    plate: { variant: "brand", aspect: "square" },
  },
  {
    slug: "exhibit-04-graphic-design",
    title: "Exhibit 04",
    category: "Graphic Design",
    shortDescription: "Reserved for graphic and campaign work — posters, social assets and key visuals.",
    deliverables: ["Key visuals", "Campaign assets", "Social graphics"],
    gallery: [],
    featured: true,
    sortOrder: 4,
    isPlaceholder: true,
    plate: { variant: "graphic", aspect: "portrait" },
  },
  {
    slug: "exhibit-05-print",
    title: "Exhibit 05",
    category: "Print Design",
    shortDescription:
      "Reserved for print design — editorial layouts, collateral and production-ready artwork.",
    deliverables: ["Editorial layout", "Collateral", "Print-ready files"],
    gallery: [],
    featured: true,
    sortOrder: 5,
    isPlaceholder: true,
    plate: { variant: "print", aspect: "landscape" },
  },
  {
    slug: "exhibit-06-interface-system",
    title: "Exhibit 06",
    category: "Interface System",
    shortDescription:
      "Reserved for a UI system — components, tokens and the rules that keep a product consistent.",
    deliverables: ["Component library", "Design tokens", "Documentation"],
    gallery: [],
    featured: false,
    sortOrder: 6,
    isPlaceholder: true,
    plate: { variant: "system", aspect: "landscape" },
  },
];

export const sortedProjects = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);
export const featuredProjects = sortedProjects.filter((p) => p.featured);

export function getProject(slug: string) {
  return sortedProjects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = sortedProjects.findIndex((p) => p.slug === slug);
  const n = sortedProjects.length;
  return {
    prev: sortedProjects[(i - 1 + n) % n]!,
    next: sortedProjects[(i + 1) % n]!,
  };
}

export function projectNumber(p: { sortOrder: number }) {
  return String(p.sortOrder).padStart(2, "0");
}
