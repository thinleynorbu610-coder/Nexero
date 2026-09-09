import { motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';
import './animated-blob.css';

// Builds a smooth closed path through N points around a circle, each point's
// radius wobbled by a sine wave — a lightweight way to get an organic blob
// shape without a design tool. Every variant samples the same N angles in
// the same order, so the resulting `d` strings share the same command
// structure and can be smoothly morphed between (see BLOB_PATHS below).
function buildBlobPath(pointCount, baseRadius, wobble, freq, phase) {
  const points = Array.from({ length: pointCount }, (_, i) => {
    const angle = (i / pointCount) * Math.PI * 2;
    const r = baseRadius + wobble * Math.sin(angle * freq + phase);
    return [100 + r * Math.cos(angle), 100 + r * Math.sin(angle)];
  });
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M ${mid(points[points.length - 1], points[0]).join(',')} `;
  points.forEach((p, i) => {
    const next = points[(i + 1) % points.length];
    const m = mid(p, next);
    d += `Q ${p[0]},${p[1]} ${m[0]},${m[1]} `;
  });
  return `${d}Z`;
}

const POINTS = 8;
const BLOB_PATHS = [
  buildBlobPath(POINTS, 62, 14, 3, 0),
  buildBlobPath(POINTS, 62, 20, 2, 1.4),
  buildBlobPath(POINTS, 62, 10, 4, 3.1),
  buildBlobPath(POINTS, 62, 18, 3, 5.2),
];

/**
 * A slow, morphing gradient blob used behind hero/CTA sections — GPU-cheap
 * (a single animated SVG path fill, no filters beyond one blur) and frozen
 * on a single frame under prefers-reduced-motion.
 */
export default function AnimatedBlob({ className = '' }) {
  const reduced = useReducedMotion();

  return (
    <svg className={`animated-blob ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-violet)" />
          <stop offset="100%" stopColor="var(--accent-indigo)" />
        </linearGradient>
      </defs>
      <motion.path
        fill="url(#blobGradient)"
        d={BLOB_PATHS[0]}
        animate={reduced ? undefined : { d: BLOB_PATHS }}
        transition={{ duration: 16, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
    </svg>
  );
}
