"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GitHubIcon } from "@/components/ui/icons";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center bg-accent font-mono text-sm font-bold text-black">
            HA
          </span>
          <span className="font-display text-lg font-medium text-ink">
            hossain<span className="text-accent">.</span>ahmad
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm transition-colors ${
                  pathname === href
                    ? "text-ink underline decoration-accent decoration-2 underline-offset-8"
                    : "text-ink-dim hover:text-ink"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="mailto:hello@hossainahmad.dev" // TODO: real email
              className="bg-accent px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-accent-bright"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="https://github.com/hossainahmad"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-ink-dim transition-colors hover:text-accent"
            >
              <GitHubIcon />
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center border border-line text-ink md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 border-t border-line px-6 py-4 md:hidden">
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2 text-ink-dim hover:text-ink"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="mailto:hello@hossainahmad.dev"
              className="block py-2 text-ink-dim hover:text-ink"
            >
              Contact
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
