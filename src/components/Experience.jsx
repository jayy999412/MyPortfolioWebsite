import { GraduationCap, Briefcase, Award, Rocket, Code2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { experience } from '../data/portfolio';

const typeMeta = {
  education: { icon: GraduationCap, label: 'Education', color: 'text-accent-primary', ring: 'border-accent-primary/40' },
  internship: { icon: Briefcase, label: 'Internship', color: 'text-emerald-400', ring: 'border-emerald-400/40' },
  work: { icon: Rocket, label: 'Work', color: 'text-accent-secondary', ring: 'border-accent-secondary/40' },
  certification: { icon: Award, label: 'Certification', color: 'text-amber-400', ring: 'border-amber-400/40' },
};

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative overflow-hidden bg-bg-secondary/60 py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-accent-secondary/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="section-container relative">
        <SectionHeading id="experience" heading={experience.heading} subtitle={experience.subtitle} />

        {/* Vertical timeline */}
        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* The line */}
          <div
            className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-accent-primary/60 via-accent-secondary/40 to-transparent sm:left-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-10" role="list">
            {experience.items.map((item, i) => {
              const meta = typeMeta[item.type] || typeMeta.work;
              const Icon = meta.icon;
              const isLeft = i % 2 === 0;

              return (
                <li key={item.id} className="relative pl-16 sm:grid sm:grid-cols-2 sm:gap-10 sm:pl-0">
                  <Reveal delay={0.1 * i}>
                    {/* Timeline node */}
                    <div
                      className={`absolute left-0 top-1 z-10 flex h-12 w-12 items-center justify-center rounded-xl border bg-bg-card shadow-card sm:left-1/2 sm:-translate-x-1/2 ${meta.ring} ${meta.color}`}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Card — alternate sides on desktop */}
                    <div
                      className={`${
                        isLeft ? 'sm:col-start-1 sm:pr-4 sm:text-right' : 'sm:col-start-2 sm:pl-4'
                      }`}
                    >
                      <article className="glass-card card-hover h-full p-6">
                        <div
                          className={`flex flex-wrap items-center gap-3 ${
                            isLeft ? 'sm:justify-end' : ''
                          }`}
                        >
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${meta.ring} ${meta.color} bg-white/[0.03]`}
                          >
                            {meta.label}
                          </span>
                          <span className="font-mono text-xs text-content-secondary">
                            {item.period}
                          </span>
                        </div>

                        <h3 className="mt-3 font-semibold text-content-primary">{item.title}</h3>
                        <p className="mt-1 text-sm font-medium text-accent-primary">
                          {item.organization}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                          {item.description}
                        </p>
                      </article>
                    </div>

                    {/* Empty spacer cell for the opposite side */}
                    <div
                      className={`hidden sm:block ${
                        isLeft ? 'sm:col-start-2' : 'sm:col-start-1 sm:row-start-1'
                      }`}
                      aria-hidden="true"
                    />
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <Reveal delay={0.2}>
            <div className="mt-12 flex justify-center">
              <div className="glass-card inline-flex items-center gap-2 px-5 py-3 text-xs text-content-secondary">
                <Code2 className="h-4 w-4 text-accent-primary" aria-hidden="true" />
                Add your real entries in{' '}
                <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-accent-primary">
                  src/data/portfolio.js
                </code>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
