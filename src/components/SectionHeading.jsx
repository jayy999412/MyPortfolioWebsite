import Reveal from './Reveal';

/**
 * SectionHeading — consistent heading block used by every section.
 */
export default function SectionHeading({ id, heading, subtitle, align = 'center' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <Reveal className={`flex flex-col ${alignment}`}>
      <span className="mb-4 flex items-center gap-3" aria-hidden="true">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent-primary/70" />
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-accent-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
          Portfolio
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent-secondary/70" />
      </span>
      <h2
        id={`${id}-heading`}
        className="section-heading max-w-3xl"
      >
        {heading}
      </h2>
      {subtitle && <p className="section-subtitle max-w-2xl">{subtitle}</p>}
      <div
        className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
        aria-hidden="true"
      />
    </Reveal>
  );
}
