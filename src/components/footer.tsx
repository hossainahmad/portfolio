"use client";
import { Container } from "@/components/ui/container";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="bg-forest text-paper">
      <Container className="py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-caramel">
          Next step
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium tracking-tight md:text-6xl">
          Let&apos;s build something worth shipping.
        </h2>
        <p className="mt-4 max-w-md text-paper/70">
          Have a project, a role, or just an idea? My inbox is open.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a
            href="mailto:hello@hossainahmad.dev" // TODO: real email
            className="rounded-full bg-paper px-6 py-3 font-medium text-forest transition-colors hover:bg-caramel"
          >
            hello@hossainahmad.dev
          </a>
          <div className="flex gap-5">
            <a
              href="https://github.com/hossainahmad"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-paper/70 transition-colors hover:text-paper"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/hossainahmad-dev/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-paper/70 transition-colors hover:text-paper"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </Container>
      <div className="border-t border-paper/10">
        <Container className="flex flex-col gap-2 py-6 font-mono text-xs text-paper/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Hossain Ahmad</p>
          <p>
            Built with Next.js & Tailwind ·{" "}
            <a
              href="https://github.com/hossainahmad/portfolio"
              className="underline hover:text-paper"
            >
              view source
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
