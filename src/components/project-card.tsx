import Link from "next/link";
import type { Project } from "@/lib/projects";
import { Corners } from "@/components/ui/corners";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const fig = String(index).padStart(2, "0");

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex flex-col border border-line bg-surface transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow"
    >
      <Corners colorClass="border-ink/10 transition-colors group-hover:border-accent/70" />

      <div className="relative h-36 overflow-hidden border-b border-line bg-raised">
        <div
          aria-hidden="true"
          className="blueprint-grid absolute inset-0 opacity-70"
        />
        <span className="absolute left-3 top-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
          Fig. {fig}
        </span>
        <span className="absolute bottom-1 right-3 font-display text-7xl font-medium text-ink/5">
          {fig}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-line px-2 py-0.5 font-mono text-[11px] text-ink-dim"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-4 font-display text-xl font-medium text-ink transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-dim">
          {project.summary}
        </p>
        <p className="mt-4 font-mono text-xs text-ink-faint">
          {project.year} · {project.role}
        </p>
      </div>
    </Link>
  );
}
