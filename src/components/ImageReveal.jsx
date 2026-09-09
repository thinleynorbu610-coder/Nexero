import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';
import { EASE_STANDARD } from '../lib/motion';
import './image-reveal.css';

/**
 * Wraps an image (or an image-shaped placeholder box) with a simple fade +
 * scale-in as it scrolls into view — the standard "reveal on scroll"
 * pattern most sites use, kept deliberately simple rather than a
 * continuous scroll-linked pan/zoom.
 *
 * Pass `fill` when the wrapper needs to exactly fill a positioned parent
 * (e.g. a team card's portrait box) rather than sizing to its content.
 */
export default function ImageReveal({ children, className = '', delay = 0, once = true, fill = false }) {
  const reduced = useReducedMotion();
  const classes = `image-reveal ${fill ? 'image-reveal--fill' : ''} ${className}`.trim();

  if (reduced) {
    return <div className={classes}>{children}</div>;
  }

  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, scale: 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: EASE_STANDARD }}
    >
      {children}
    </motion.div>
  );
}
