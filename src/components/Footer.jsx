import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import './footer.css';

const columns = [
  {
    title: 'Navigate',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Team', to: '/team' },
      { label: 'Projects', to: '/projects' },
      { label: 'Services', to: '/services' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web Development', to: '/services' },
      { label: 'Backend Development', to: '/services' },
      { label: 'Cybersecurity', to: '/services' },
      { label: 'System Architecture', to: '/services' },
    ],
  },
  {
    title: 'Team',
    links: [
      { label: 'Thinley Norbu', to: '/team/thinley-norbu' },
      { label: 'Jamyang Lodey', to: '/team/jamyang-lodey' },
      { label: 'Tshewang Dorji', to: '/team/tshewang-dorji' },
      { label: 'Yeshi Ngedup', to: '/team/yeshi-ngedup' },
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Logo height={42} />
          <p className="body-md footer__desc">
            Nexora is a technology team building secure, scalable, and intelligent
            digital experiences — from backend systems to cybersecurity.
          </p>
          <div className="footer__social">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="Nexora on GitHub">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="Nexora on LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:hello@nexora.example" aria-label="Email Nexora">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="footer__columns">
          {columns.map((col) => (
            <div key={col.title} className="footer__col">
              <p className="label footer__col-title">{col.title}</p>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer__link link-underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="body-md footer__copyright">&copy; 2026 Nexora. All rights reserved.</p>
        <button className="footer__top-btn" onClick={scrollToTop} aria-label="Back to top">
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
