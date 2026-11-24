import type { ProcessStage, ServiceGroup } from "@/types/content";

export const serviceGroups: ServiceGroup[] = [
  {
    id: "digital",
    index: "D/01",
    title: "Digital experiences",
    summary:
      "Websites that are clear to use and hard to forget — composed for every screen size, not squeezed onto it.",
    items: ["Website design", "UI design", "Responsive web design"],
  },
  {
    id: "product",
    index: "D/02",
    title: "Product experiences",
    summary: "Mobile apps and interfaces where the flow feels obvious and the visual layer feels considered.",
    items: ["Mobile app design", "UX flows", "Interface systems"],
  },
  {
    id: "brand",
    index: "D/03",
    title: "Brand worlds",
    summary:
      "Marks and identities built as systems — so a brand stays recognisable from an app icon to a billboard.",
    items: ["Logo design", "Brand identity", "Visual systems"],
  },
  {
    id: "visual",
    index: "D/04",
    title: "Visual communication",
    summary: "Graphics and print that carry the message at a glance and reward a closer look.",
    items: ["Graphic design", "Print design", "Campaign assets"],
  },
];

/** Presented as part of the workflow — not as claims of mastery. */
export const tools = ["Adobe Illustrator", "Adobe Photoshop"];

/** Editable — adjust to match how Abbas actually works. */
export const processStages: ProcessStage[] = [
  {
    index: "01",
    title: "Discover",
    description: "Understand the brief, the audience and the real problem underneath the request.",
  },
  {
    index: "02",
    title: "Define",
    description: "Set the direction: structure, hierarchy and the visual language the work will speak.",
  },
  {
    index: "03",
    title: "Design",
    description: "Explore widely, then refine hard — until every element earns its place.",
  },
  {
    index: "04",
    title: "Deliver",
    description: "Prepare polished, practical final assets that are ready for the real world.",
  },
];
