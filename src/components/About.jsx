import { Code2, Puzzle, BookOpen, Compass, Lightbulb, GraduationCap, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { about } from '../data/portfolio';

const pillarIcons = [Compass, Lightbulb, BookOpen, GraduationCap];
const cardIcons = { code: Code2, puzzle: Puzzle, book: BookOpen };

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* Soft background glow */}
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-accent-secondary/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="section-container relative">
        <SectionHeading id="about" heading={about.heading} subtitle={about.subtitle} />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT — intro copy */}
          <Reveal className="flex flex-col gap-5">
            {about.paragraphs.map((text, i) => (
              <p
                key={i}
                className={`leading-relaxed text-content-secondary ${
                  i === 0
                    ? 'text-lg text-content-primary/90 sm:text-xl'
                    : 'text-base sm:text-lg'
                }`}
              >
                {text}
              </p>
            ))}

            {/* Highlight cards */}
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {about.highlightCards.map(({ title, description, icon }, i) => {
                const Icon = cardIcons[icon] || Sparkles;
                return (
                  <Reveal key={title} delay={0.1 * i}>
                    <div className="glass-card card-hover h-full p-5">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 text-accent-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-sm font-semibold text-content-primary">{title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-content-secondary">
                        {description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>

          {/* RIGHT — pillars */}
          <div className="grid gap-4 sm:grid-cols-2">
            {about.pillars.map(({ title, description }, i) => {
              const Icon = pillarIcons[i] || Sparkles;
              return (
                <Reveal key={title} delay={0.08 * i}>
                  <div className="glass-card card-hover group h-full p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent-primary transition-all duration-300 group-hover:border-accent-primary/40 group-hover:bg-accent-primary/10">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-content-primary">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                      {description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
