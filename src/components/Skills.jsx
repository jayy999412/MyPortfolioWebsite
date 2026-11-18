import {
  Layout,
  Terminal,
  Server,
  Database,
  Wrench,
  Check,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { skills } from '../data/portfolio';

const iconMap = {
  layout: Layout,
  terminal: Terminal,
  server: Server,
  database: Database,
  wrench: Wrench,
};

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden bg-bg-secondary/60 py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[700px] -translate-x-1/2 rounded-full bg-accent-primary/8 blur-[140px]"
        aria-hidden="true"
      />

      <div className="section-container relative">
        <SectionHeading id="skills" heading={skills.heading} subtitle={skills.subtitle} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.categories.map((category, i) => {
            const Icon = iconMap[category.icon] || Terminal;
            return (
              <Reveal
                key={category.id}
                delay={0.07 * i}
                className={i === skills.categories.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}
              >
                <div className="glass-card card-hover group h-full p-6">
                  {/* Category header */}
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 text-accent-primary transition-all duration-300 group-hover:from-accent-primary group-hover:to-accent-secondary group-hover:text-bg-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-content-primary">{category.title}</h3>
                  </div>

                  {/* Skill chips */}
                  <ul className="flex flex-wrap gap-2" role="list">
                    {category.items.map((skill) => (
                      <li
                        key={skill}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-content-secondary transition-all duration-200 hover:border-accent-primary/40 hover:bg-accent-primary/10 hover:text-content-primary"
                      >
                        <Check
                          className="h-3.5 w-3.5 text-accent-primary"
                          aria-hidden="true"
                        />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-center text-xs text-content-secondary">
            Skills are intentionally listed without proficiency percentages — they reflect the
            technologies I use and continue to grow in.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
