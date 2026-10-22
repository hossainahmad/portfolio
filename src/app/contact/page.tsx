import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact-form";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Hossain Ahmad — web apps, AI features, and agentic systems. Replies within one business day.",
};

const NEXT_STEPS = [
  {
    title: "I reply, personally",
    body: "First thoughts on your problem and whether I'm the right fit, within a day.",
  },
  {
    title: "A short discovery call",
    body: "We dig into the goal, the constraints and what success actually looks like.",
  },
  {
    title: "A fixed quote",
    body: "One clear price and timeline before any work starts. No meter, no surprises.",
  },
];

const railLabel =
  "font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint";

export default function ContactPage() {
  return (
    <main className="bg-canvas">
      <div className="mx-auto w-full max-w-5xl px-6 pb-24 pt-28 md:pt-36">
        <SectionHeading index="03" title="Contact" eyebrow="Start a Project" />

        <div className="mt-8 inline-flex items-center gap-2.5 border border-line bg-surface px-4 py-2">
          <span className="h-1.5 w-1.5 animate-pulse motion-reduce:animate-none bg-accent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Available · 2026
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
            · Limited slots
          </span>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_320px] lg:gap-16">
          <ContactForm />

          {/* Info rail */}
          <aside className="space-y-9">
            <section className="border-t border-line pt-6">
              <h2 className={railLabel}>Email</h2>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 block font-display text-lg font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
              >
                {SITE.email}
              </a>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
                The fastest way to reach me. I read every one myself.
              </p>
            </section>

            <section className="border-t border-line pt-6">
              <h2 className={railLabel}>Availability</h2>
              <p className="mt-2 flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
                <span className="h-1.5 w-1.5 shrink-0 animate-pulse motion-reduce:animate-none bg-accent" />
                Taking projects for 2026
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
                Booking a limited number of builds at a time so each gets full
                attention.
              </p>
            </section>

            <section className="border-t border-line pt-6">
              <h2 className={railLabel}>Response time</h2>
              <p className="mt-2 font-display text-lg font-semibold text-ink">
                Within one business day
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
                Usually much sooner — you&rsquo;re talking to the person doing
                the work.
              </p>
            </section>

            <section className="border-t border-line pt-6">
              <h2 className={railLabel}>Working hours</h2>
              <p className="mt-2 font-display text-lg font-semibold text-ink">
                Dhaka time · GMT+6
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
                Remote, async-friendly, comfortable across time zones.
              </p>
            </section>

            <section className="border-t border-line pt-6">
              <h2 className={railLabel}>What happens next</h2>
              <ol className="divide-y divide-line">
                {NEXT_STEPS.map((step, i) => (
                  <li
                    key={step.title}
                    className="grid grid-cols-[2.5rem_1fr] gap-3 py-5"
                  >
                    <span className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
