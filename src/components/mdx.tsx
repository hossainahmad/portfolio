import type { ReactNode } from "react";

type MDXProps = { children?: ReactNode };
type AnchorProps = { children?: ReactNode; href?: string };

export const mdxComponents = {
  h2: ({ children }: MDXProps) => (
    <h2 className="mt-12 flex items-center gap-3 font-display text-2xl font-medium tracking-tight text-ink">
      <span className="h-2 w-2 shrink-0 bg-accent" />
      {children}
    </h2>
  ),
  h3: ({ children }: MDXProps) => (
    <h3 className="mt-8 font-display text-xl font-medium text-ink">
      {children}
    </h3>
  ),
  p: ({ children }: MDXProps) => (
    <p className="my-4 leading-relaxed text-ink-dim">{children}</p>
  ),
  ul: ({ children }: MDXProps) => (
    <ul className="my-4 space-y-2">{children}</ul>
  ),
  li: ({ children }: MDXProps) => (
    <li className="relative pl-6 text-ink-dim before:absolute before:left-0 before:font-mono before:text-accent before:content-['+']">
      {children}
    </li>
  ),
  strong: ({ children }: MDXProps) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  a: ({ children, href }: AnchorProps) => (
    <a
      href={href}
      className="text-accent underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: MDXProps) => (
    <blockquote className="my-6 border-l-2 border-accent pl-4 italic text-ink-dim">
      {children}
    </blockquote>
  ),
  code: ({ children }: MDXProps) => (
    <code className="border border-line bg-raised px-1.5 py-0.5 font-mono text-sm text-accent">
      {children}
    </code>
  ),
  pre: ({ children }: MDXProps) => (
    <pre className="my-6 overflow-x-auto border border-line bg-raised p-4 font-mono text-sm leading-relaxed text-ink-dim">
      {children}
    </pre>
  ),
};
