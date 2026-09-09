import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

const MotionLink = motion(Link);

const MAGNETIC_STRENGTH = 0.35;
const MAGNETIC_MAX = 14;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

/** Cursor-follow "magnetic" pull, released with a spring on mouse-leave. */
function useMagnetic(disabled) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  if (disabled) {
    return { ref, style: undefined, onMouseMove: undefined, onMouseLeave: undefined };
  }

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(clamp((e.clientX - (rect.left + rect.width / 2)) * MAGNETIC_STRENGTH, -MAGNETIC_MAX, MAGNETIC_MAX));
    // The -3 baseline replaces the old CSS `transform: translateY(-2px)`
    // hover-lift, which an inline Framer Motion transform would otherwise
    // silently override (inline style always wins over a CSS :hover rule).
    y.set(clamp((e.clientY - (rect.top + rect.height / 2)) * MAGNETIC_STRENGTH, -MAGNETIC_MAX, MAGNETIC_MAX) - 3);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
}

/**
 * variant: 'primary' | 'ghost'
 * as: 'link' (React Router) | 'a' (external) | 'button'
 *
 * Magnetic hover pull + fill-sweep are skipped entirely on touch (no
 * hover/mousemove to drive them) and under prefers-reduced-motion.
 */
export default function Button({
  children,
  variant = 'primary',
  as = 'link',
  to = '/',
  href,
  onClick,
  type = 'button',
  icon = true,
  className = '',
}) {
  const reduced = useReducedMotion();
  const magnetic = useMagnetic(reduced);
  const classes = `btn btn-${variant} ${className}`.trim();

  const content = (
    <>
      <span className="btn-sweep" aria-hidden="true" />
      <span className="btn-label">{children}</span>
      {icon && (
        <span className="btn-icon" aria-hidden="true">
          <ArrowRight size={18} />
        </span>
      )}
    </>
  );

  if (as === 'a') {
    return (
      <motion.a
        ref={magnetic.ref}
        style={magnetic.style}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
        whileTap={reduced ? undefined : { scale: 0.96 }}
        href={href}
        className={classes}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </motion.a>
    );
  }

  if (as === 'button') {
    return (
      <motion.button
        ref={magnetic.ref}
        style={magnetic.style}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
        whileTap={reduced ? undefined : { scale: 0.96 }}
        type={type}
        className={classes}
        onClick={onClick}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <MotionLink
      ref={magnetic.ref}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      to={to}
      className={classes}
      onClick={onClick}
    >
      {content}
    </MotionLink>
  );
}
