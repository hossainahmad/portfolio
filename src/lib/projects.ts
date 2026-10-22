import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  order: number;
  featured: boolean;
  tags: string[];
  role: string;
  stack: string[];
  links?: { live?: string; repo?: string };
  content: string; // raw MDX body
  cover?: string; // ← add: path to the cover sheet
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "work");

// Server-only: reads the filesystem at build time (SSG)
export function getAllProjects(): Project[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const projects = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      content,
      title: data.title ?? slug,
      summary: data.summary ?? "",
      year: data.year ?? new Date().getFullYear(),
      order: data.order ?? 99,
      featured: data.featured ?? false,
      tags: data.tags ?? [],
      role: data.role ?? "Developer",
      stack: data.stack ?? [],
      links: data.links,
      cover: typeof data.cover === "string" ? data.cover : undefined,
    } satisfies Project;
  });

  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const all = getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? all[i - 1] : undefined,
    next: i < all.length - 1 ? all[i + 1] : undefined,
  };
}
