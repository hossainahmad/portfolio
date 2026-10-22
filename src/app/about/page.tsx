import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { SITE } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hossain Ahmad — full-stack developer and Assistant Programmer at Gazipur City Corporation, building civic software and agentic AI systems.",
};

const STACK = [
  { group: "Language", items: "TypeScript · JavaScript · Python" },
  {
    group: "Frontend",
    items: "Next.js · React · Tailwind CSS · Framer Motion",
  },
  { group: "Backend", items: "Node.js · Express · Prisma · REST APIs" },
  { group: "Data", items: "MongoDB · PostgreSQL" },
  { group: "AI & Automation", items: "LLM APIs · RAG · Agent orchestration" },
  { group: "Infra & Tools", items: "Vercel · Netlify · Git · GitHub Actions" },
];

const LEDGER = [
  {
    period: "2023 — Present", // TODO: correct the year
    role: "Assistant Programmer",
    org: "Gazipur City Corporation",
    note: "Civic software for a city of two million — citizen-facing services, internal tools, and the data systems behind them.",
  },
  {
    period: "2024 — Present", // TODO: correct the year
    role: "Independent Developer",
    org: "BazarDor · FitLog · DevStack",
    note: "Designed, built, and shipped three production apps end-to-end: architecture, interface, motion, and deployment.",
  },
];

const PERSONNEL: [string, string][] = [
  ["Name", SITE.name],
  ["Role", "Full-Stack Developer"],
  ["Focus", "Agentic AI Engineering"],
  ["Base", SITE.location],
  ["Coords", SITE.coords],
];

export default function AboutPage() {
  return (
    <main className="bg-canvas">
      <div className="mx-auto w-full max-w-4xl px-6 pb-24 pt-28 md:pt-36">
        <SectionHeading index="02" title="About" eyebrow="Personnel File" />

        {/* Title block sheet */}
        <div className="blueprint-grid relative mt-12 border border-line bg-surface p-8 md:p-12">
          <span
            aria-hidden
            className="absolute -left-px -top-px h-3.5 w-3.5 border-l border-t border-accent"
          />
          <span
            aria-hidden
            className="absolute -right-px -top-px h-3.5 w-3.5 border-r border-t border-accent"
          />
          <span
            aria-hidden
            className="absolute -bottom-px -left-px h-3.5 w-3.5 border-b border-l border-accent"
          />
          <span
            aria-hidden
            className="absolute -bottom-px -right-px h-3.5 w-3.5 border-b border-r border-accent"
          />

          <div className="md:flex md:items-start md:justify-between md:gap-12">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                Spec. 02 — Personnel File
              </p>
              <h1 className="mt-5 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
                Software with a public purpose, drawn with an architect&rsquo;s
                precision.
              </h1>
            </div>

            <dl className="mt-10 w-full max-w-xs shrink-0 divide-y divide-line border border-line bg-canvas md:mt-1">
              {PERSONNEL.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                    {k}
                  </dt>
                  <dd className="font-mono text-xs text-ink">{v}</dd>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 px-4 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  Status
                </dt>
                <dd className="flex items-center gap-2 font-mono text-xs text-accent">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse motion-reduce:animate-none bg-accent" />
                  Open to collaborations
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-12 max-w-3xl space-y-5 text-[15px] leading-relaxed text-ink-dim md:text-base">
          <p>
            I&rsquo;m Hossain Ahmad — a full-stack developer and Assistant
            Programmer at Gazipur City Corporation. Inside the corporation I
            work on the systems a city actually runs on: citizen-facing
            services, internal dashboards, and the data pipelines behind them.
            It&rsquo;s the kind of software where a small bug has real
            consequences for real people, so I treat reliability, clarity, and
            maintainability as features — not afterthoughts.
          </p>
          <p>
            Outside the office I design and ship my own products. BazarDor came
            from a simple civic frustration — no single place to compare daily
            market prices for essentials — and grew into a full-stack platform
            with authentication, category browsing, and day-over-day price
            tracking. FitLog and DevStack followed the same pattern: find a real
            problem, prototype fast, and polish until it feels engineered rather
            than assembled.
          </p>
          <p>
            My development workflow is deliberately AI-augmented. I treat models
            like GLM-5.3 Flash as junior collaborators — they draft, I
            architect, review, and own the merge. That discipline turned into a
            second specialty: building agentic systems, where multiple AI steps
            are chained into reliable, tool-using pipelines. The blueprint
            aesthetic of this site is the same idea applied visually — every
            element drawn with intent, numbered, and built to be read.
          </p>
        </div>

        {/* Stack schedule */}
        <section className="mt-16">
          <div className="flex items-center gap-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
              Stack Schedule
            </h2>
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              Rev A
            </span>
          </div>
          <div className="mt-6 grid grid-cols-[120px_1fr] gap-px border border-line bg-line md:grid-cols-[180px_1fr]">
            {STACK.map((row) => (
              <div key={row.group} className="contents">
                <div className="bg-surface p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint md:text-[11px]">
                  {row.group}
                </div>
                <div className="bg-surface p-4 text-sm text-ink">
                  {row.items}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project ledger */}
        <section className="mt-16">
          <div className="flex items-center gap-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
              Project Ledger
            </h2>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="mt-6 border border-line">
            {LEDGER.map((entry) => (
              <article
                key={entry.role}
                className="border-b border-line p-6 last:border-b-0 md:flex md:gap-10"
              >
                <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-accent md:w-44">
                  {entry.period}
                </p>
                <div className="mt-3 md:mt-0">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {entry.role}{" "}
                    <span className="font-normal text-ink-dim">
                      · {entry.org}
                    </span>
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-dim">
                    {entry.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative mt-16 border border-line bg-surface p-8 md:p-10">
          <span
            aria-hidden
            className="absolute -left-px -top-px h-3.5 w-3.5 border-l border-t border-accent"
          />
          <span
            aria-hidden
            className="absolute -bottom-px -right-px h-3.5 w-3.5 border-b border-r border-accent"
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
            Next sheet — yours?
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Let&rsquo;s draft something worth building.
          </h2>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/contact" // ← stays on your site
              className="inline-flex items-center gap-2 border border-lime bg-lime px-6 py-3 font-mono text-sm uppercase tracking-wider text-ink transition-colors hover:bg-transparent hover:text-lime"
            >
              Start a project
            </Link>
            <Link
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-dim transition-colors hover:border-ink-faint hover:text-ink"
            >
              GitHub ↗
            </Link>
            <Link
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-dim transition-colors hover:border-ink-faint hover:text-ink"
            >
              LinkedIn ↗
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
