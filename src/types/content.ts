/**
 * Content types for the portfolio.
 * Everything Abbas may want to edit lives in /src/data — components only render it.
 */

export type ProjectCategory =
  | "Website Design"
  | "Mobile App Design"
  | "Brand Identity"
  | "Graphic Design"
  | "Print Design"
  | "Interface System";

/** Visual composition used for the abstract placeholder plate until real imagery exists. */
export type PlateVariant = "web" | "app" | "brand" | "graphic" | "print" | "system";

export type PlateAspect = "landscape" | "portrait" | "square" | "wide";

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  /** Only fill in when confirmed by Abbas. */
  role?: string;
  /** Only fill in when supplied. */
  client?: string;
  /** Only fill in when supplied. */
  year?: string;
  deliverables?: string[];
  /** Real cover image. When absent, an abstract placeholder plate is rendered. */
  coverImage?: ProjectImage;
  thumbnailImage?: ProjectImage;
  gallery: ProjectImage[];
  challenge?: string;
  approach?: string;
  /** Only factual, supplied outcomes. Never invented metrics. */
  outcome?: string;
  /** Tools used, e.g. ["Figma", "Illustrator"]. */
  tools?: string[];
  /** Link to the live site / app store / Behance post. */
  liveUrl?: string;
  /** Confirmed facts only, e.g. { value: "12", label: "Screens designed" }. */
  highlights?: { value: string; label: string }[];
  featured: boolean;
  sortOrder: number;
  /** True while this entry is a placeholder slot awaiting real work. */
  isPlaceholder: boolean;
  plate: { variant: PlateVariant; aspect: PlateAspect };
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
  /** Optional portrait in /public/testimonials/. Initials are shown when absent. */
  avatar?: string;
  /** True while this entry is sample text awaiting a real client quote. */
  isPlaceholder: boolean;
}

export interface ServiceGroup {
  id: string;
  index: string;
  title: string;
  summary: string;
  items: string[];
}

export interface ProcessStage {
  index: string;
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}
