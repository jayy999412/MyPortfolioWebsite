import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, Download, ArrowUpRight } from 'lucide-react';
import LogoMark from './LogoMark';
import { navLinks, siteConfig } from '../data/portfolio';

/**
 * Navbar — sticky, blurred, with active-section indicator,
 * animated underline, resume button and animated mobile menu.
 */
export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const navRef = useRef(null);

  // Track scroll state + active section via IntersectionObserver
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setIsMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavClick = useCallback(
    (e, id) => {
      e.preventDefault();
      setIsMobileOpen(false);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    },
    [reduceMotion]
  );

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-bg-primary/80 shadow-card backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="section-container flex h-16 items-center justify-between sm:h-20"
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="group flex items-center"
          aria-label={`${siteConfig.name} — home`}
        >
          <LogoMark className="h-9 w-9 transition-transform duration-300 group-hover:rotate-[8deg] group-hover:scale-105 sm:h-10 sm:w-10" />
          <span className="sr-only">{siteConfig.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {navLinks.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <li key={id} className="relative">
                <a
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-accent-primary'
                      : 'text-content-secondary hover:text-content-primary'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                      transition={
                        reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-content-primary backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/60 hover:bg-accent-primary/10 hover:text-accent-primary sm:inline-flex"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-content-primary transition-colors hover:border-accent-primary/50 hover:text-accent-primary lg:hidden"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
            className="border-t border-white/10 bg-bg-primary/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="section-container flex flex-col gap-1 py-4" role="list">
              {navLinks.map(({ id, label }, i) => {
                const isActive = activeSection === id;
                return (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.25,
                      delay: reduceMotion ? 0 : i * 0.05,
                    }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={(e) => handleNavClick(e, id)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-accent-primary/10 text-accent-primary'
                          : 'text-content-secondary hover:bg-white/[0.04] hover:text-content-primary'
                      }`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {label}
                      {isActive && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-accent-primary"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.25,
                  delay: reduceMotion ? 0 : navLinks.length * 0.05,
                }}
                className="mt-2"
              >
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-3 text-sm font-semibold text-bg-primary"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
