import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';
import './custom-cursor.css';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, .cursor-expand';

/**
 * Custom mouse-follow cursor with three states:
 *  - default: small dot, inverts via mix-blend-mode so it reads on any bg
 *  - interactive: hollow ring, for plain links/buttons/inputs
 *  - label: filled pill showing a short word (e.g. "View"), for anything
 *    with a data-cursor="..." attribute — see TeamCard/ProjectCard
 * Cleanly disabled on touch devices (no pointer to follow), and the
 * trailing spring-lag is skipped under prefers-reduced-motion (the cursor
 * still moves, just with a direct 1:1 follow instead of a lerped trail).
 */
export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState('default');
  const [label, setLabel] = useState('');
  const reduced = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouch(touchQuery.matches);
    const update = (e) => setIsTouch(e.matches);
    touchQuery.addEventListener('change', update);
    return () => touchQuery.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    document.body.classList.add('has-custom-cursor');
    return () => document.body.classList.remove('has-custom-cursor');
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;

    const move = (e) => {
      setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target;
      const labelTarget = target.closest && target.closest('[data-cursor]');
      if (labelTarget) {
        setState('label');
        setLabel(labelTarget.dataset.cursor);
      } else if (target.closest && target.closest(INTERACTIVE_SELECTOR)) {
        setState('interactive');
        setLabel('');
      } else {
        setState('default');
        setLabel('');
      }
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [isTouch, x, y]);

  if (isTouch) return null;

  return (
    <motion.div
      className={`custom-cursor custom-cursor--${state} ${visible ? 'custom-cursor--visible' : ''}`}
      style={{ x: reduced ? x : springX, y: reduced ? y : springY }}
      aria-hidden="true"
    >
      {label && <span className="custom-cursor__label">{label}</span>}
    </motion.div>
  );
}
