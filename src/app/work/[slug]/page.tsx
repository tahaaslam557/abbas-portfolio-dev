import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, sortedProjects } from "@/data/projects";
import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";

export function generateStaticParams() {
  return sortedProjects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.category}`,
    description: project.shortDescription,
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudyLayout project={project} />;
}
