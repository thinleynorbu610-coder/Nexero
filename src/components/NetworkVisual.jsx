import { useEffect, useRef } from 'react';
import logoMark from '../assets/nx-mark.png';
import './network-visual.css';

// A layered network diagram: static architecture lines, a few animated
// "data" pulses traveling along them, a softly pulsing core and nodes, plus
// gentle parallax on mouse movement.
const nodes = [
  { id: 'n1', x: 60, y: 90 },
  { id: 'n2', x: 230, y: 40 },
  { id: 'n3', x: 380, y: 130 },
  { id: 'n4', x: 180, y: 220 },
  { id: 'n5', x: 340, y: 260 },
  { id: 'n6', x: 480, y: 60 },
  { id: 'n7', x: 500, y: 210 },
  { id: 'n8', x: 90, y: 280 },
];

const edges = [
  ['n1', 'n2'],
  ['n2', 'n3'],
  ['n2', 'n4'],
  ['n3', 'n6'],
  ['n3', 'n5'],
  ['n4', 'n5'],
  ['n4', 'n8'],
  ['n5', 'n7'],
  ['n3', 'n7'],
];

const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

export default function NetworkVisual() {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const el = wrapRef.current;
    const stage = stageRef.current;
    if (!el || !stage) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      stage.style.transform = `rotateX(${py * -10}deg) rotateY(${px * 10}deg)`;
    };
    const handleLeave = () => {
      stage.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div className="network-visual" ref={wrapRef} aria-hidden="true">
      <div className="network-visual__stage" ref={stageRef}>
        <svg viewBox="0 0 560 340" className="network-visual__svg">
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{ stopColor: 'var(--text-primary)' }} stopOpacity="0.9" />
              <stop offset="100%" style={{ stopColor: 'var(--text-primary)' }} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="coreGlow" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.9" />
              <stop offset="45%" style={{ stopColor: 'var(--accent-violet)' }} stopOpacity="0.55" />
              <stop offset="100%" style={{ stopColor: 'var(--accent-indigo)' }} stopOpacity="0" />
            </radialGradient>
          </defs>

          {edges.map(([a, b]) => {
            const from = nodeMap[a];
            const to = nodeMap[b];
            return (
              <line
                key={`${a}-${b}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                style={{ stroke: 'var(--network-line)' }}
                strokeWidth="1"
              />
            );
          })}

          {edges.map(([a, b], i) => {
            const from = nodeMap[a];
            const to = nodeMap[b];
            return (
              <line
                key={`pulse-${a}-${b}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="url(#nodeGlow)"
                strokeWidth="2"
                strokeDasharray="6 160"
                strokeLinecap="round"
                className="network-visual__pulse"
                style={{ animationDelay: `${i * 0.9}s` }}
              />
            );
          })}

          <g className="network-visual__core">
            <circle cx="410" cy="185" r="80" fill="url(#coreGlow)" className="network-visual__core-glow" />
            <circle
              cx="410"
              cy="185"
              r="46"
              fill="rgba(12, 11, 18, 0.5)"
              style={{ stroke: 'var(--accent-soft-violet)' }}
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
            <image
              href={logoMark}
              x="374"
              y="167"
              width="72"
              height="45"
              preserveAspectRatio="xMidYMid meet"
            />
          </g>

          {nodes.map((n, i) => (
            <g key={n.id} className="network-visual__node" style={{ animationDelay: `${i * 0.35}s` }}>
              <circle cx={n.x} cy={n.y} r="14" fill="url(#nodeGlow)" opacity="0.5" />
              <circle
                cx={n.x}
                cy={n.y}
                r="4"
                style={{ fill: 'var(--text-primary)', filter: 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.45))' }}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
