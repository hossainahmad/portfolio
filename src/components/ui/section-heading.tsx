import Link from "next/link";

type Props = {
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
};

export function SectionHeading({ eyebrow, title, href, linkLabel }: Props) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-olive">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-3xl font-medium tracking-tight md:text-4xl">
          {title}
        </h2>
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="font-mono text-sm text-copper-deep transition-colors hover:text-copper"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
