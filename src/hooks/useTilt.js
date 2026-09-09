import { useRef } from 'react';
import useReducedMotion from './useReducedMotion';

/**
 * Lightweight pointer-driven 3D tilt (perspective rotateX/rotateY) — no
 * three.js needed for this. Mutates the element's style directly rather
 * than going through React state, since mousemove fires far too often to
 * re-render on. No-op under prefers-reduced-motion or on touch (no
 * mousemove there to drive it, so it degrades gracefully on its own).
 */
export default function useTilt(strength = 8) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const onMouseMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateX(${py * -strength}deg) rotateY(${px * strength}deg)`;
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  };

  return { ref, onMouseMove, onMouseLeave };
}
