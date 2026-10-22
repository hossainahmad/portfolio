import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/projects";

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
  const featured = getAllProjects().filter((p) => p.featured);

  return (
    <>
      <Hero />

      <section id="work" className="border-b border-line">
        <Container className="py-20 md:py-28">
          <SectionHeading
            index="01"
            eyebrow="Selected work"
            title="Things I've built"
            href="/work"
            linkLabel="All projects"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section id="capabilities">
        <Container className="py-20 md:py-28">
          <SectionHeading index="02" eyebrow="Capabilities" title="What I do" />
          {/* gap-px + bg-line = crisp hairline dividers, like a drawing table */}
          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            {SERVICES.map(({ title, body, stack }, i) => (
              <div key={title} className="relative bg-canvas p-8 md:p-10">
                <p className="font-mono text-xs text-accent">SPEC.{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink">
                  {title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-dim">{body}</p>
                <p className="mt-6 border-t border-dashed border-line pt-4 font-mono text-xs text-ink-faint">
                  {stack}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
