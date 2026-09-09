import * as Icons from 'lucide-react';
import Reveal from './Reveal';
import './service-card.css';

export default function ServiceCard({ service, index = 0 }) {
  const Icon = Icons[service.icon] || Icons.Sparkles;

  return (
    <Reveal delay={Math.min(index * 0.06, 0.3)} className="service-card">
      <div className="service-card__icon">
        <Icon size={22} strokeWidth={1.6} />
      </div>
      <h3 className="h-md service-card__title">{service.title}</h3>
      <p className="body-md service-card__desc">{service.description}</p>
    </Reveal>
  );
}
