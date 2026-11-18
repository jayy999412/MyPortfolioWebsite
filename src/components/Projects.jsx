import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { projects } from '../data/portfolio';

function ProjectImage({ src, title, index }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-bg-primary">
      {/* Gradient fallback behind the image */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-accent-primary/15 via-accent-secondary/10 to-transparent"
        aria-hidden="true"
      />
      <img
        src={src}
        alt={`Preview placeholder for ${title}`}
        loading="lazy"
        decoding="async"
        className="relative h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        onError={(e) => {
          // Hide broken images gracefully — the gradient backdrop remains
          e.currentTarget.style.display = 'none';
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-bg-card/90 via-transparent to-transparent"
        aria-hidden="true"
      />
      {/* Index badge */}
      <span className="absolute left-4 top-4 rounded-lg border border-white/10 bg-bg-primary/80 px-2.5 py-1 font-mono text-xs text-accent-primary backdrop-blur-sm">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-accent-primary/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="section-container relative">
        <SectionHeading id="projects" heading={projects.heading} subtitle={projects.subtitle} />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((project, i) => (
            <Reveal key={project.id} delay={0.1 * i}>
              <article className="glass-card card-hover group flex h-full flex-col overflow-hidden">
                <ProjectImage src={project.image} title={project.title} index={i} />

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-content-primary transition-colors group-hover:text-accent-primary">
                    {project.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-content-secondary">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <ul className="mt-4 flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                    {project.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-content-secondary"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {/* Actions — hidden links are not rendered, so nothing fake appears */}
                  <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                    <a
                      href={project.live || '#projects'}
                      target={project.live ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-disabled={!project.live}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                        project.live
                          ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary hover:shadow-glow-cyan'
                          : 'cursor-not-allowed border border-white/10 text-content-secondary'
                      }`}
                    >
                      View Project
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>

                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-content-secondary transition-all duration-300 hover:border-accent-primary/50 hover:text-accent-primary"
                      >
                        <Github className="h-3.5 w-3.5" aria-hidden="true" />
                        GitHub
                      </a>
                    ) : (
                      <span
                        className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-content-secondary"
                        title="Add your repository link in src/data/portfolio.js"
                      >
                        <Github className="h-3.5 w-3.5" aria-hidden="true" />
                        GitHub
                      </span>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-content-secondary transition-all duration-300 hover:border-accent-primary/50 hover:text-accent-primary"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
