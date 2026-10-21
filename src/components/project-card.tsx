import Link from "next/link";
import type { Project } from "@/lib/projects";

const COVERS = [
  "from-olive/20 via-caramel/30 to-copper/30",
  "from-caramel/40 via-copper/25 to-olive/15",
  "from-olive/30 via-forest/25 to-caramel/30",
];

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-forest/10 bg-paper-raised shadow-warm transition-all hover:-translate-y-1 hover:border-copper/60"
    >
      <div
        className={`relative h-36 bg-gradient-to-br ${COVERS[(index - 1) % COVERS.length]}`}
      >
        <span className="absolute bottom-2 right-4 font-display text-7xl font-medium text-forest/10">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-caramel/20 px-2.5 py-0.5 font-mono text-xs text-forest"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-4 font-display text-xl font-medium transition-colors group-hover:text-copper-deep">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-forest/70">
          {project.summary}
        </p>
        <p className="mt-4 font-mono text-xs text-olive">
          {project.year} · {project.role}
        </p>
      </div>
    </Link>
  );
}
