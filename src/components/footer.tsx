import { Container } from "@/components/ui/container";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-20 md:py-24">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-faint">
          <span className="h-1.5 w-1.5 bg-accent" />
          Contact
        </div>
        <h2 className="mt-5 max-w-2xl font-display text-4xl font-medium tracking-tight text-ink md:text-6xl">
          Let&apos;s build something worth shipping.
        </h2>
        <p className="mt-4 max-w-md text-ink-dim">
          Have a project, a role, or just an idea? My inbox is open.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a
            href="mailto:hello@hossainahmad.dev" // TODO: real email
            className="bg-accent px-6 py-3 font-medium text-black transition-colors hover:bg-accent-bright"
          >
            hello@hossainahmad.xyz
          </a>
          <div className="flex gap-5">
            <a
              href="https://github.com/hossainahmad"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-ink-dim transition-colors hover:text-accent"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/hossainahmad-dev/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-ink-dim transition-colors hover:text-accent"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-dashed border-line">
        <Container className="flex flex-col gap-2 py-6 font-mono text-[11px] uppercase tracking-wider text-ink-faint md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Hossain Ahmad</p>
          <p>24.0031° N / 90.4203° E — Gazipur, BD</p>
          <p>
            Built with Next.js ·{" "}
            <a
              href="https://github.com/hossainahmad/portfolio"
              className="text-accent hover:text-accent-bright"
            >
              source
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
