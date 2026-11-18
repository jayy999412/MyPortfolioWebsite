import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import LogoMark from './LogoMark';
import { siteConfig, navLinks, socialLinks, footer } from '../data/portfolio';

const iconMap = { github: Github, linkedin: Linkedin, mail: Mail };

export default function Footer() {
  const [year, setYear] = useState('');
  const [showTop, setShowTop] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-bg-primary">
      <div className="section-container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="group inline-flex items-center gap-3"
              aria-label={`${siteConfig.name} — back to top`}
            >
              <LogoMark className="h-10 w-10 transition-transform duration-300 group-hover:rotate-[8deg] group-hover:scale-105" />
              <span className="sr-only">{siteConfig.name}</span>
            </a>
            <p className="mt-3 text-sm font-medium text-content-secondary">
              {siteConfig.name} · {siteConfig.title}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-content-secondary">
              {footer.description}
            </p>

            {/* Socials */}
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ id, label, url, icon }) => {
                const Icon = iconMap[icon] || Mail;
                return (
                  <a
                    key={id}
                    href={url}
                    target={url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-content-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary/50 hover:text-accent-primary"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-content-primary">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5" role="list">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="group inline-flex items-center gap-2 text-sm text-content-secondary transition-colors hover:text-accent-primary"
                  >
                    <span
                      className="h-1 w-1 rounded-full bg-content-secondary/50 transition-all duration-300 group-hover:w-3 group-hover:bg-accent-primary"
                      aria-hidden="true"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact quick block */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-content-primary">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm" role="list">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-content-secondary transition-colors hover:text-accent-primary"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.find((s) => s.id === 'github')?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-content-secondary transition-colors hover:text-accent-primary"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.find((s) => s.id === 'linkedin')?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-content-secondary transition-colors hover:text-accent-primary"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-content-secondary">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-content-secondary">
            {footer.tagline}
          </p>
        </div>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-bg-card/90 text-content-primary shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/60 hover:text-accent-primary hover:shadow-glow-cyan"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center gap-1.5 pb-6 text-xs text-content-secondary">
        <span>Built with</span>
        <Heart className="h-3 w-3 text-rose-400" aria-hidden="true" />
        <span>React, Tailwind CSS &amp; Framer Motion</span>
      </div>
    </footer>
  );
}
