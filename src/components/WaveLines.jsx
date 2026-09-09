/**
 * Slow, cinematic flowing "data-line" background decoration.
 * Purely ambient — aria-hidden, no layout impact, animation respects
 * prefers-reduced-motion via the .wave-lines rules in global.css.
 */
export default function WaveLines({ className = '' }) {
  return (
    <svg
      className={`wave-lines ${className}`}
      viewBox="0 0 1200 500"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M-50,120 C250,40 450,220 750,140 C950,80 1050,180 1250,110"
        style={{ stroke: 'var(--glow-violet)' }}
      />
      <path
        d="M-50,260 C250,340 500,200 800,280 C1000,330 1100,240 1250,300"
        style={{ stroke: 'var(--glow-indigo)' }}
      />
      <path
        d="M-50,400 C300,340 550,440 850,360 C1000,320 1100,380 1250,340"
        style={{ stroke: 'var(--glow-violet)' }}
      />
    </svg>
  );
}
