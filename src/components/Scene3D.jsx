import { Suspense, lazy } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';
import './scene3d.css';

const Scene3DCanvas = lazy(() => import('./Scene3DCanvas'));

/**
 * One tasteful three.js element — a slowly floating, softly distorted
 * icosahedron — used sparingly (see Services.jsx) rather than everywhere.
 * Lazy-loaded so the three.js/r3f/drei bundle only downloads for visitors
 * who reach a page using it. Skipped entirely under prefers-reduced-motion
 * (it's purely decorative, and Float's rotation/bob has no reduced-motion
 * switch of its own).
 */
export default function Scene3D({ className = '' }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className={`scene3d ${className}`} aria-hidden="true">
      <Suspense fallback={null}>
        <Scene3DCanvas />
      </Suspense>
    </div>
  );
}
