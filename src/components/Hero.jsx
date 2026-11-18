import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { hero, siteConfig, socialLinks } from '../data/portfolio';

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail };

/* Positions for floating tech badges (desktop decorative layer) */
const FLOATERS = [
  { label: 'React', top: '8%', left: '4%', delay: 0 },
  { label: 'Node.js', top: '22%', right: '2%', delay: 0.8 },
  { label: 'Python', top: '62%', left: '-2%', delay: 1.6 },
  { label: 'Tailwind', top: '78%', right: '6%', delay: 2.4 },
  { label: 'Git', top: '46%', right: '-4%', delay: 1.2 },
  { label: 'Java', top: '92%', left: '14%', delay: 2 },
];

function CodeWindow() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative w-full max-w-md lg:max-w-lg">
      {/* Glow behind the window */}
      <div
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent-primary/25 via-accent-secondary/20 to-transparent blur-2xl"
        aria-hidden="true"
      />

      <div className="glass-card relative overflow-hidden shadow-card">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" aria-hidden="true" />
          <span className="ml-3 truncate font-mono text-xs text-content-secondary">
            jay@portfolio: ~/engineer
          </span>
        </div>

        {/* Code body */}
        <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
          <CodeLine delay={0.1}>
            <span className="text-accent-secondary">const</span>{' '}
            <span className="text-accent-primary">engineer</span> = {'{'}
          </CodeLine>
          <CodeLine delay={0.25} indent>
            <span className="text-content-secondary">name:</span>{' '}
            <span className="text-emerald-400">"{siteConfig.name}"</span>,
          </CodeLine>
          <CodeLine delay={0.4} indent>
            <span className="text-content-secondary">role:</span>{' '}
            <span className="text-emerald-400">"{siteConfig.title}"</span>,
          </CodeLine>
          <CodeLine delay={0.55} indent>
            <span className="text-content-secondary">focus:</span> [
            <span className="text-amber-300">"clean code"</span>,{' '}
            <span className="text-amber-300">"scalability"</span>],
          </CodeLine>
          <CodeLine delay={0.7} indent>
            <span className="text-content-secondary">passion:</span>{' '}
            <span className="text-emerald-400">"building great products"</span>,
          </CodeLine>
          <CodeLine delay={0.85}>{'};'}</CodeLine>
          <CodeLine delay={1}>&nbsp;</CodeLine>
          <CodeLine delay={1.1}>
            <span className="text-accent-secondary">export default</span>{' '}
            <span className="text-accent-primary">engineer</span>;
            <motion.span
              className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent-primary"
              animate={reduceMotion ? {} : { opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }}
              aria-hidden="true"
            />
          </CodeLine>
        </div>
      </div>
    </div>
  );
}

function CodeLine({ children, delay = 0, indent = false }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: reduceMotion ? 0 : delay }}
      className={indent ? 'pl-5 sm:pl-7' : ''}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, reduceMotion ? 0 : 120]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.12, delayChildren: 0.15 } },
  };
  const item = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 sm:pt-32"
    >
      {/* ── Animated background layer ── */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-grid bg-[length:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-accent-primary/15 blur-[140px]" />
        <div className="absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-accent-secondary/15 blur-[130px]" />
        <div className="absolute -right-24 top-1/3 h-[380px] w-[380px] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/40 to-bg-primary" />
      </motion.div>

      {/* ── Content ── */}
      <div className="section-container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — intro */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Availability badge (rendered only when enabled in data) */}
            {siteConfig.availability.show && (
              <motion.div variants={item} className="mb-6">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  {siteConfig.availability.text}
                </span>
              </motion.div>
            )}

            <motion.p
              variants={item}
              className="mb-3 text-lg font-medium text-content-secondary sm:text-xl"
            >
              {hero.greeting}
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={item}
              className="text-4xl font-extrabold leading-[1.08] tracking-tight text-content-primary sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
            >
              <span className="block">{hero.name}</span>
              <span className="mt-2 block bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                {hero.role}
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-base leading-relaxed text-content-secondary sm:text-lg"
            >
              {hero.headline}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 max-w-xl text-sm leading-relaxed text-content-secondary sm:text-base"
            >
              {hero.description}
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <a href={hero.ctaPrimary.href} className="btn-primary">
                {hero.ctaPrimary.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={hero.ctaSecondary.href} className="btn-ghost">
                {hero.ctaSecondary.label}
              </a>
              <a
                href={hero.ctaTertiary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {hero.ctaTertiary.label}
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="mt-8 flex items-center gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-content-secondary">
                Connect
              </span>
              <span className="h-px w-8 bg-white/15" aria-hidden="true" />
              {socialLinks.map(({ id, label, url, icon }) => {
                const Icon = iconMap[icon] || ArrowUpRight;
                return (
                  <a
                    key={id}
                    href={url}
                    target={url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-content-secondary transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/50 hover:text-accent-primary hover:shadow-glow-cyan"
                  >
                    <Icon className="h-4.5 w-4.5 h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* RIGHT — visual */}
          <motion.div
            className="relative hidden justify-center lg:flex"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Floating tech badges */}
            <div className="absolute inset-0" aria-hidden="true">
              {FLOATERS.map(({ label, delay, ...pos }) => (
                <motion.span
                  key={label}
                  className="absolute rounded-lg border border-white/10 bg-bg-card/80 px-3 py-1.5 font-mono text-xs text-content-secondary shadow-card backdrop-blur-sm"
                  style={{ top: pos.top, left: pos.left, right: pos.right }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    y: reduceMotion ? 0 : [0, -12, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.6, delay },
                    y: {
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay,
                    },
                  }}
                >
                  {label}
                </motion.span>
              ))}
            </div>

            <CodeWindow />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-content-secondary transition-colors hover:text-accent-primary sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          animate={reduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
        <span className="h-8 w-px bg-gradient-to-b from-accent-primary/70 to-transparent" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
