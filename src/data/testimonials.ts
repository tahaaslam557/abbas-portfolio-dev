import type { Testimonial } from "@/types/content";

/**
 * TESTIMONIALS
 * ------------------------------------------------------------------
 * These are SAMPLE SLOTS (`isPlaceholder: true`) so the section can be
 * designed and reviewed. They are not real quotes, and the UI labels
 * them as samples.
 *
 * To publish a real testimonial:
 *   1. Replace quote / name / role / company with the client's real words
 *      (get their permission first)
 *   2. Optionally add a square portrait to /public/testimonials/ and set `avatar`
 *   3. Set `isPlaceholder: false`
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Sample testimonial — replace with a client’s words about working with Abbas: the clarity of the process, the quality of the design and how it landed with their audience.",
    name: "Client Name",
    role: "Founder",
    company: "Company",
    isPlaceholder: true,
  },
  {
    quote:
      "Sample testimonial — a short quote from a product or marketing lead describing the problem Abbas solved and what changed after the work shipped.",
    name: "Client Name",
    role: "Head of Product",
    company: "Company",
    isPlaceholder: true,
  },
  {
    quote:
      "Sample testimonial — a collaborator or creative director on communication, attention to detail and how the identity held together across every touchpoint.",
    name: "Client Name",
    role: "Creative Director",
    company: "Studio",
    isPlaceholder: true,
  },
  {
    quote:
      "Sample testimonial — one or two sentences on reliability, turnaround and why they would work with Abbas again.",
    name: "Client Name",
    role: "Marketing Manager",
    company: "Company",
    isPlaceholder: true,
  },
];
