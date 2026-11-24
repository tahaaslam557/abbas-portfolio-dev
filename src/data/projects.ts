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
    slug: "exhibit-01-website",
    title: "Exhibit 01",
    category: "Website Design",
    shortDescription:
      "Reserved for a website design case study — structure, interface and responsive behaviour.",
    deliverables: ["Website design", "Responsive layouts", "UI components"],
    gallery: [],
    featured: true,
    sortOrder: 1,
    isPlaceholder: true,
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
