import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/container";
import { mdxComponents } from "@/components/mdx";
import {
  getAllProjects,
  getAdjacentProjects,
  getProjectBySlug,
} from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params; // Next 15: params is a Promise — don't forget the await
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const fig = String(project.order).padStart(2, "0");

  return (
    <Container className="py-16 md:py-24">
      {/* Sheet header */}
      <Link
        href="/work"
        className="font-mono text-xs uppercase tracking-[0.25em] text-ink-faint transition-colors hover:text-accent"
      >
        ← All projects
      </Link>

      <div className="mt-6 border-b border-dashed border-line pb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
          <span className="text-accent">Fig. {fig}</span> — Case study
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-dim">
          {project.summary}
        </p>

        {/* Meta table — hairline grid */}
        <div className="mt-8 grid gap-px border border-line bg-line font-mono text-xs sm:grid-cols-3">
          <div className="bg-canvas p-4">
            <p className="uppercase tracking-[0.2em] text-ink-faint">Role</p>
            <p className="mt-1.5 text-ink">{project.role}</p>
          </div>
          <div className="bg-canvas p-4">
            <p className="uppercase tracking-[0.2em] text-ink-faint">Year</p>
            <p className="mt-1.5 text-ink">{project.year}</p>
          </div>
          <div className="bg-canvas p-4">
            <p className="uppercase tracking-[0.2em] text-ink-faint">Stack</p>
            <p className="mt-1.5 text-ink">{project.stack.join(" · ")}</p>
          </div>
        </div>

        {(project.links?.live || project.links?.repo) && (
          <div className="mt-6 flex flex-wrap gap-4">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="bg-accent px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-accent-bright"
              >
                Live demo →
              </a>
            )}
            {project.links?.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                className="border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Source
              </a>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <article className="max-w-3xl py-4">
        <MDXRemote source={project.content} components={mdxComponents} />
      </article>

      {/* Prev / next — hairline table */}
      <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group bg-canvas p-6 transition-colors hover:bg-surface"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
              ← Previous
            </p>
            <p className="mt-2 font-display text-xl text-ink group-hover:text-accent">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div className="hidden md:block" />
        )}
        {next && (
          <Link
            href={`/work/${next.slug}`}
            className="group bg-canvas p-6 text-right transition-colors hover:bg-surface"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
              Next →
            </p>
            <p className="mt-2 font-display text-xl text-ink group-hover:text-accent">
              {next.title}
            </p>
          </Link>
        )}
      </div>
    </Container>
  );
}
