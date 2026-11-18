import { Puzzle, Code2, RefreshCw, HeartHandshake } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { whyMe } from '../data/portfolio';

const iconMap = {
  puzzle: Puzzle,
  code: Code2,
  refresh: RefreshCw,
  heart: HeartHandshake,
};

export default function WhyMe() {
  return (
    <section
      id="why-me"
      aria-labelledby="why-me-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-secondary/8 blur-[150px]"
        aria-hidden="true"
      />

      <div className="section-container relative">
        <SectionHeading id="why-me" heading={whyMe.heading} subtitle={whyMe.subtitle} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyMe.cards.map(({ id, title, description, icon }, i) => {
            const Icon = iconMap[icon] || Puzzle;
            return (
              <Reveal key={id} delay={0.08 * i}>
                <div className="group glass-card card-hover relative h-full overflow-hidden p-6">
                  {/* Corner glow on hover */}
                  <div
                    className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-accent-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-primary transition-all duration-300 group-hover:border-accent-primary/50 group-hover:bg-accent-primary/10 group-hover:shadow-glow-cyan">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="relative font-semibold text-content-primary">{title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-content-secondary">
                    {description}
                  </p>

                  {/* Animated underline */}
                  <span
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-500 group-hover:w-full"
                    aria-hidden="true"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
