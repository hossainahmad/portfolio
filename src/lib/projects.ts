export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  tags: string[];
  role: string;
  stack: string[];
  links?: { live?: string; repo?: string };
  featured?: boolean;
};

// TODO: replace with your real projects
export const projects: Project[] = [
  {
    slug: "municipal-service-portal",
    title: "Municipal Service Portal",
    summary:
      "Placeholder case study — swap in a real project: problem, your role, what you built, and the outcome.",
    year: 2025,
    tags: ["Full-Stack", "GovTech"],
    role: "Lead Developer",
    stack: ["Next.js", "PostgreSQL"],
    featured: true,
  },
  {
    slug: "agentic-doc-assistant",
    title: "Agentic Document Assistant",
    summary:
      "Placeholder case study — a RAG agent that answers questions from municipal documents. Replace with your real AI project.",
    year: 2025,
    tags: ["Agentic AI", "RAG"],
    role: "Builder",
    stack: ["TypeScript", "LangChain"],
    featured: true,
  },
  {
    slug: "this-portfolio",
    title: "This Portfolio",
    summary:
      "The site you're looking at: Next.js App Router, Tailwind, MDX case studies, and a public API endpoint.",
    year: 2025,
    tags: ["Next.js", "Tailwind"],
    role: "Designer & Developer",
    stack: ["Next.js", "Tailwind", "MDX"],
    links: { repo: "https://github.com/hossainahmad/portfolio" },
    featured: true,
  },
];
