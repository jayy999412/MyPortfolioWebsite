import { motion, useReducedMotion } from 'framer-motion';

/**
 * Reveal — lightweight fade + slide-up wrapper used across sections.
 * Automatically respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  as = 'div',
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
