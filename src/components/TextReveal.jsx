import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';
import { EASE_STANDARD } from '../lib/motion';
import './text-reveal.css';

/**
 * Splits plain-text heading content into words, each masked and revealed
 * with a staggered translateY + opacity animation as it scrolls into view.
 * Used for every major H1/H2 on the site (see Hero.jsx and
 * SectionHeading.jsx) so heading reveal motion stays consistent everywhere.
 *
 * - `as`: the heading tag to render ('h1' | 'h2' | ...), default 'h2'.
 * - `accentCount`: number of trailing words rendered with the
 *   `text-reveal__word--accent` class (used for the violet gradient accent).
 * - `inView`: pass false for above-the-fold headings (the Hero) that should
 *   animate immediately on mount rather than waiting for scroll.
 */
export default function TextReveal({
  children,
  as = 'h2',
  className = '',
  delay = 0,
  stagger = 0.045,
  accentCount = 0,
  inView = true,
  once = true,
}) {
  const reduced = useReducedMotion();
  const text = typeof children === 'string' ? children : '';

  if (reduced || !text) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const words = text.split(' ');
  const MotionTag = motion[as] || motion.h2;
  const animateProps = inView
    ? { whileInView: 'show', viewport: { once, amount: 0.6 } }
    : { animate: 'show' };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...animateProps}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span className="text-reveal__mask" key={i}>
          <motion.span
            className={`text-reveal__word ${i >= words.length - accentCount ? 'text-reveal__word--accent' : ''}`}
            variants={{
              hidden: { y: '100%', opacity: 0 },
              show: { y: '0%', opacity: 1, transition: { duration: 0.7, ease: EASE_STANDARD } },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
