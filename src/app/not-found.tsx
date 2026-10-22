import Link from "next/link";

export default function NotFound() {
  return (
    <main className="blueprint-grid relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden border-y border-line bg-canvas px-6 py-24 text-center">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 right-0 select-none font-display text-[14rem] font-bold leading-none tracking-tighter text-ink opacity-[0.04] md:text-[20rem]"
      >
        404
      </span>

      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        Error 404 — Sheet not found
      </p>
      <h1 className="mt-5 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
        This drawing was revised out of the set.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-dim md:text-base">
        The page you&rsquo;re after doesn&rsquo;t exist, was moved, or was never
        drafted. Open the site plan and navigate from there.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="border border-accent bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-canvas transition-colors hover:bg-accent-bright"
        >
          ← Back to site plan
        </Link>
        <Link
          href="/work"
          className="border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-dim transition-colors hover:border-ink-faint hover:text-ink"
        >
          View work
        </Link>
      </div>
    </main>
  );
}
