import { Shield, Layers, Zap } from 'lucide-react';
import Button from './Button';
import NetworkVisual from './NetworkVisual';
import WaveLines from './WaveLines';
import TextReveal from './TextReveal';
import AnimatedBlob from './AnimatedBlob';
import './hero.css';

// Echoes the "secure, scalable, and intelligent" language already in the
// hero copy below as a quick-scan trio of trust indicators.
const trustPoints = [
  { icon: Shield, label: 'Secure', caption: 'Built for trust' },
  { icon: Layers, label: 'Scalable', caption: 'Ready for growth' },
  { icon: Zap, label: 'Intelligent', caption: 'Powered by innovation' },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__backdrop" aria-hidden="true">
        <div className="bg-grid" />
        <div className="hero__glow" />
        <AnimatedBlob className="hero__blob" />
        <WaveLines className="hero__waves" />
        <div className="section-fade-bottom" />
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">Nexora Technology Team</p>

          <TextReveal as="h1" className="h-display hero__headline" accentCount={3} inView={false}>
            Building Digital Solutions for What Comes Next.
          </TextReveal>

          <p className="body-lg hero__sub">
            Nexora is a technology team focused on building secure, scalable, and
            intelligent digital experiences.
          </p>

          <div className="hero__actions">
            <Button to="/projects" variant="primary">
              Explore Our Work
            </Button>
            <Button to="/team" variant="ghost">
              Meet the Team
            </Button>
          </div>

          <ul className="hero__trust">
            {trustPoints.map(({ icon: Icon, label, caption }) => (
              <li key={label} className="hero__trust-item">
                <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <span className="hero__trust-label">{label}</span>
                  <span className="hero__trust-caption">{caption}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual">
          <NetworkVisual />
        </div>
      </div>
    </section>
  );
}
