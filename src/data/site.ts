import type { NavItem, SocialLink } from "@/types/content";

/**
 * SITE CONTENT — edit freely.
 *
 * Anything set to `null` is intentionally unpublished: the UI shows a
 * clearly-marked placeholder instead of inventing a detail.
 */
export const site = {
  name: "Abbas Ali",
  role: "Design Unit Head",
  company: "Mindwave",
  description:
    "Abbas Ali is a multidisciplinary designer and Design Unit Head at Mindwave, shaping digital experiences, visual identities and brand worlds.",
  /** TODO: replace with the live domain before launch. */
  url: "https://example.com",

  hero: {
    eyebrow: "The Dimensional Design Archive",
    headline: ["Making ideas", "impossible", "to ignore."],
    /** Index of the headline line rendered in the serif italic accent. */
    accentLine: 1,
    intro:
      "I’m Abbas Ali — a multidisciplinary designer shaping digital experiences, visual identities and brand worlds that people remember.",
    primaryCta: { label: "Explore selected work", href: "/#work" },
    secondaryCta: { label: "Let’s talk", href: "/contact" },
  },

  /** Museum-style wall label for the signature sculpture. */
  objectLabel: {
    number: "Object 001",
    title: "The Continuum",
    medium: "Procedural ribbon · satin metal · light",
    note: "One continuous line, folding through every discipline — screen, mark, page and print.",
  },

  about: {
    title: ["The mind behind", "the making"],
    lead: "I design across screens, marks and paper — and I lead a design unit that does the same.",
    paragraphs: [
      "As Design Unit Head at Mindwave, my work moves between website and app interfaces, brand identities, graphic design and print. Different outputs, one habit of mind: find the idea worth expressing, then give it a form people can’t look past.",
      "I care about the parts that are easy to skip — the spacing that lets a page breathe, the curve that makes a mark feel ownable, the hierarchy that lets someone find what they came for without thinking about it.",
    ],
    philosophy: [
      {
        title: "Idea before ornament",
        text: "Decoration is easy. A clear idea, expressed with conviction, is what makes design stick.",
      },
      {
        title: "Systems, not one-offs",
        text: "A logo is the start of a language. Designing the rules lets a brand keep speaking long after hand-off.",
      },
      {
        title: "Craft you can feel",
        text: "Most people never notice the details. They notice when they’re missing.",
      },
    ],
  },

  contact: {
    title: ["Have something", "worth making?"],
    subline: "Tell me about the idea. Let’s make it impossible to ignore.",
    /**
     * Public email address. Leave `null` until Abbas supplies one —
     * no mailto link is rendered while this is null.
     */
    email: null as string | null,
    /** Optional availability note — leave null to hide. */
    availability: null as string | null,
  },

  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  /** Only add verified profiles. Empty = nothing rendered. */
  socials: [] as SocialLink[],
};

export const disciplines = [
  "Website design",
  "Mobile app design",
  "Logo design",
  "Brand identity",
  "Graphic design",
  "Print design",
] as const;
