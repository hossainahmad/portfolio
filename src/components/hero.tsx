"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/ui/container";
import { Corners } from "@/components/ui/corners";

const ROLES = [
  "Full-Stack Web Developer",
  "Agentic AI Engineer",
  "Assistant Programmer at GCC",
];

const article = (word: string) => (/^[aeiou]/i.test(word) ? "an" : "a");

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(REDUCED_MOTION_QUERY);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

function useTypewriter(words: string[], enabled: boolean) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const word = words[index % words.length];
    let delay: number;
    let next: () => void;

    if (!deleting && text === word) {
      delay = 1800;
      next = () => setDeleting(true);
    } else if (deleting && text === "") {
      delay = 350;
      next = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      };
    } else {
      delay = deleting ? 30 : 70;
      next = () => setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }

    const t = window.setTimeout(next, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, index, words, enabled]);

  return text;
}

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const typed = useTypewriter(ROLES, !prefersReducedMotion);
  const role = prefersReducedMotion ? ROLES[0] : typed;

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="blueprint-grid mask-fade-b absolute inset-0"
      />
      <div aria-hidden="true" className="hero-glow absolute inset-0" />
      <p
        aria-hidden="true"
        className="absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] uppercase tracking-[0.4em] text-ink-faint lg:block"
      >
        Portfolio — Rev 2025
      </p>

      <Container className="relative py-20 md:py-28">
        <div className="relative px-6 py-12 md:px-12 md:py-16">
          <Corners />

          <div className="flex items-center justify-between gap-4 border-b border-dashed border-line pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint">
            <span>
              <span className="text-accent">Fig. 01</span> — Introduction
            </span>
            <span className="hidden sm:block">Gazipur, BD · Open to work</span>
          </div>

          <h1 className="mt-10 font-display font-medium tracking-tight">
            <span className="block text-4xl text-ink sm:text-5xl md:text-7xl">
              Hi, I&apos;m Hossain Ahmad.
            </span>
            <span className="mt-4 block min-h-[1.2em] whitespace-nowrap text-[clamp(1.25rem,4.5vw,2.25rem)] text-ink-dim">
              I&apos;m {article(role)}{" "}
              <span className="text-accent">{role}</span>
              <span className="text-accent motion-safe:animate-pulse">_</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-dim">
            I build full-stack web applications and agentic AI systems —
            currently shipping digital services for Gazipur City Corporation.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/work"
              className="bg-accent px-6 py-3 font-medium text-black transition-colors hover:bg-accent-bright"
            >
              View my work →
            </a>
            <a
              href="mailto:hello@hossainahmad.dev" // TODO: real email
              className="border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </div>

          <p className="mt-12 font-mono text-sm text-ink-dim">
            <span className="text-accent">$</span> currently: Assistant
            Programmer @ Gazipur City Corporation
          </p>
        </div>
      </Container>
    </section>
  );
}
