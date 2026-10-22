import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies — full-stack apps, agentic AI experiments, and the thinking behind them.",
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <Container className="py-20 md:py-28">
      <SectionHeading index="01" eyebrow="Selected work" title="Case studies" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Container>
  );
}
