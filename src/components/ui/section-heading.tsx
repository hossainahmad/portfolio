import Link from "next/link";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  href,
  linkLabel,
}: Props) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 font-mono text-xs text-ink-faint">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-line" />
        <span className="uppercase tracking-[0.3em]">{eyebrow}</span>
        {href && linkLabel && (
          <Link
            href={href}
            className="ml-auto text-accent transition-colors hover:text-accent-bright"
          >
            {linkLabel} →
          </Link>
        )}
      </div>
      <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      <div className="mt-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="h-1.5 w-1.5 bg-accent" />
      </div>
    </div>
  );
}
