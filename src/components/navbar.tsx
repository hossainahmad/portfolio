"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GitHubIcon } from "@/components/ui/icons";
import Image from "next/image";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-forest/10 bg-paper/80 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo3-removebg-preview.png"
            alt="logo"
            width={250}
            height={80}
          ></Image>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm transition-colors ${
                  pathname === href
                    ? "text-forest underline decoration-copper decoration-2 underline-offset-8"
                    : "text-forest/70 hover:text-forest"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="mailto:hello@hossainahmad.dev" // TODO: real email
              className="rounded-full bg-forest px-4 py-2 text-sm text-paper transition-colors hover:bg-olive"
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
              className="text-forest/70 transition-colors hover:text-forest"
            >
              <GitHubIcon />
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-forest/15 text-forest md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 border-t border-forest/10 px-6 py-4 md:hidden">
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2 text-forest/80 hover:text-forest"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="mailto:hello@hossainahmad.dev"
              className="block py-2 text-forest/80 hover:text-forest"
            >
              Contact
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
