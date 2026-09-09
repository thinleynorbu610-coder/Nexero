import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';
import { EASE_STANDARD } from '../lib/motion';

/**
 * General-purpose fade + slide-up scroll reveal, used for cards, paragraphs,
 * list items — anything that isn't a heading (see TextReveal for those).
 * Renders children plainly, with no animation, when the user prefers
 * reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
  as = 'div',
  once = true,
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: EASE_STANDARD }}
    >
      {children}
    </MotionTag>
  );
}
