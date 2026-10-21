"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/ui/container";

const ROLES = [
  "Full-Stack Web Developer",
  "Agentic AI Engineer",
  "Assistant Programmer at GCC",
];

// "Assistant" → "an", "Full-Stack" → "a"
const article = (word: string) => (/^[aeiou]/i.test(word) ? "an" : "a");

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Reads the OS "reduce motion" setting as an external store —
 * the React-blessed pattern for matchMedia. Also re-renders
 * live if the user toggles the setting mid-visit.
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(REDUCED_MOTION_QUERY);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches, // client snapshot
    () => false, // server snapshot
  );
}

function useTypewriter(words: string[], enabled: boolean) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return; // reduced motion: never start the loop

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

  // Derived during render — no setState-in-effect needed
  const role = prefersReducedMotion ? ROLES[0] : typed;

  return (
    <section className="dot-grid border-b border-forest/10">
      <Container className="py-24 md:py-36">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-olive">
          Gazipur, Bangladesh · Open to interesting work
        </p>

        <h1 className="mt-6 font-display font-medium tracking-tight">
          <span className="block text-5xl md:text-7xl">
            Hi, I&apos;m Hossain Ahmad.
          </span>
          <span className="mt-4 block min-h-[1.2em] whitespace-nowrap text-[clamp(1.25rem,4.5vw,2.25rem)] text-olive">
            I&apos;m {article(role)}{" "}
            <span className="text-copper-deep">{role}</span>
            <span className="text-copper motion-safe:animate-pulse">_</span>
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest/80">
          I build full-stack web applications and agentic AI systems — currently
          shipping digital services for Gazipur City Corporation.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/work"
            className="rounded-full bg-forest px-6 py-3 font-medium text-paper transition-colors hover:bg-olive"
          >
            View my work →
          </a>
          <a
            href="mailto:hello@hossainahmad.dev" // TODO: real email
            className="rounded-full border border-forest/20 px-6 py-3 font-medium transition-colors hover:border-copper hover:text-copper-deep"
          >
            Get in touch
          </a>
        </div>

        <p className="mt-12 font-mono text-sm text-olive">
          <span className="text-copper">$</span> currently: Assistant Programmer
          @ Gazipur City Corporation
        </p>
      </Container>
    </section>
  );
}
