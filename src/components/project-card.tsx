import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

const fig = (n: number) => String(n).padStart(2, "0");

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex flex-col border border-line bg-surface transition-all duration-300 hover:border-accent/40 hover:shadow-glow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
    >
      {/* Blueprint corner ticks — appear on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l border-t border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r border-t border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b border-l border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Cover sheet */}
      <div className="blueprint-grid relative aspect-[16/10] overflow-hidden border-b border-line bg-canvas">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title} — cover`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-3xl font-semibold uppercase tracking-tight text-ink-faint">
                {project.title}
              </span>
            </div>
            <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              Fig. {fig(project.order)}
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-5 right-3 font-display text-8xl font-bold leading-none tracking-tighter text-ink opacity-5"
            >
              {fig(project.order)}
            </span>
          </>
        )}
      </div>

      {/* Spec block */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent-bright">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            {project.summary}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          <span>
            {project.year} · {project.role}
          </span>
          {/* <span className="flex items-center gap-1.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5">
            View case
            <svg
              viewBox="0 0 12 12"
              fill="none"
              className="h-3 w-3"
              aria-hidden
            >
              <path
                d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </span> */}
        </div>
      </div>
    </Link>
  );
}
