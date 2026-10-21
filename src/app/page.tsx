import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

const SERVICES = [
  {
    title: "Full-Stack Web Development",
    body: "From database schema to deployed UI — I design, build, and maintain production web applications end to end.",
    stack: "Next.js · TypeScript · PostgreSQL · Tailwind",
  },
  {
    title: "Agentic AI Engineering",
    body: "LLM-powered agents that actually do work — tool use, RAG pipelines, and orchestration wired into real products.",
    stack: "LangChain · RAG · Tool Calling · Evals",
  },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Hero />

      <section id="work">
        <Container className="py-20 md:py-28">
          <SectionHeading
            eyebrow="Selected work"
            title="Things I've built"
            href="/work"
            linkLabel="All projects"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i + 1} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-forest/10">
        <Container className="grid gap-12 py-20 md:grid-cols-2 md:py-28">
          {SERVICES.map(({ title, body, stack }) => (
            <div key={title}>
              <h3 className="font-display text-2xl font-medium tracking-tight">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-forest/75">{body}</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-wider text-olive">
                {stack}
              </p>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
