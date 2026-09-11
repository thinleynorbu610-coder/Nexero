import * as Icons from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Reveal from '../components/Reveal';
import TextReveal from '../components/TextReveal';
import PageGlow from '../components/PageGlow';
import Button from '../components/Button';
import handImg from '../assets/hero/hand.webp';
import { services } from '../data/services';
import './services.css';

const scrollToServicesList = () => {
  document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Services() {
  const [openId, setOpenId] = useState(services[0].id);
  // No container-level scroll-fx here on purpose: this list can run taller
  // than one viewport, and fading opacity off overall scroll progress would
  // dim rows the user is still actively reading mid-scroll. Per-row Reveal
  // (below) already handles the entrance correctly for lists of any length.

  return (
    <div className="services-page">
      <section className="services-hero page-hero">
        <PageGlow />

        <div className="services-hero__visual" aria-hidden="true">
          <img src={handImg} alt="" className="services-hero__robot" />
        </div>

        <div className="container">
          <div className="services-hero__copy">
            <Reveal>
              <p className="eyebrow">Services</p>
            </Reveal>
            <TextReveal as="h1" className="h-display" delay={0.08} inView={false} accentCount={1}>
              Technology That Moves Ideas Forward.
            </TextReveal>
            <Reveal delay={0.2}>
              <p className="body-lg services-hero__sub">
                We build innovative digital solutions that turn ideas into real-world impact.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Button as="button" variant="primary" onClick={scrollToServicesList}>
                Our Services
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section services-list-section" id="services-list">
        <div className="container">
          <ul className="services-list">
            {services.map((service, i) => {
              const Icon = Icons[service.icon] || Icons.Sparkles;
              const isOpen = openId === service.id;
              return (
                <Reveal as="li" delay={Math.min(i * 0.04, 0.24)} key={service.id} className="services-list__item">
                  <button
                    className="services-list__row"
                    onClick={() => setOpenId(isOpen ? null : service.id)}
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${service.id}`}
                  >
                    <span className="services-list__number">{service.number}</span>
                    <span className="services-list__icon">
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <span className="h-md services-list__title">{service.title}</span>
                    <span className={`services-list__toggle ${isOpen ? 'services-list__toggle--open' : ''}`}>
                      <Plus size={18} />
                    </span>
                  </button>

                  {isOpen && (
                    <div id={`service-panel-${service.id}`} className="services-list__panel">
                      <div className="services-list__panel-inner">
                        <p className="body-lg">{service.description}</p>
                        <ul className="services-list__tech">
                          {service.technologies.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                        <Link to="/contact" className="link-underline services-list__more">
                          Learn More
                        </Link>
                      </div>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
