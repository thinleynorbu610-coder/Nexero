import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';
import { EASE_STANDARD } from '../lib/motion';
import './page-transition.css';

const contentVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.32, ease: EASE_STANDARD } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: EASE_STANDARD } },
};

const curtainVariants = {
  initial: { scaleY: 1 },
  animate: { scaleY: 0, transition: { duration: 0.55, delay: 0.05, ease: EASE_STANDARD } },
  exit: { scaleY: 1, transition: { duration: 0.35, ease: EASE_STANDARD } },
};

/**
 * Wraps each route's page content. A full-viewport "curtain" wipes in to
 * cover the old page, then wipes away to reveal the new one underneath —
 * see App.jsx's <AnimatePresence mode="wait"> for the exit-then-enter
 * sequencing this relies on. Falls back to an instant swap, no motion at
 * all, under prefers-reduced-motion.
 */
export default function PageTransition({ children }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <main>{children}</main>;
  }

  return (
    <motion.main initial="initial" animate="animate" exit="exit">
      <motion.div className="page-curtain" variants={curtainVariants} aria-hidden="true" />
      <motion.div variants={contentVariants}>{children}</motion.div>
    </motion.main>
  );
}
