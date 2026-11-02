import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Mail,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code,
  Server,
  Layers,
  Users,
  Database,
  Shield,
  Palette,
  Sparkles,
  Workflow,
  Bug,
} from 'lucide-react';
import Reveal from '../components/Reveal';
import TextReveal from '../components/TextReveal';
import ImageReveal from '../components/ImageReveal';
import Button from '../components/Button';
import profileBg from '../assets/hero/profile-auditorium.jpg';
import { getMemberById, defaultAvatar, teamInDisplayOrder } from '../data/team';
import { getProjectById } from '../data/projects';
import './profile.css';

// What the Contact panel shows next to each link: the email address itself,
// or the profile path for GitHub / LinkedIn (or a plain label for a bare link).
const contactValue = (label, href) => {
  if (href.startsWith('mailto:')) return href.slice('mailto:'.length);
  const path = href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  return path.includes('/') ? path : `View ${label}`;
};

// "See My Work" scrolls down to the projects (or What I Do if there are none)
const seeWork = () => {
  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// "What I Do" icon picked from what the responsibility is about; the first
// matching rule wins, and Layers is the fallback.
const WORK_ICON_RULES = [
  [/secur|threat|harden|penetration/i, Shield],
  [/test|debug/i, Bug],
  [/database|data model|schema/i, Database],
  [/lead|coordinat|team|review/i, Users],
  [/design|interface|ui\b|ux/i, Palette],
  [/gamif|engagement|ai[- ]driven|intelligen/i, Sparkles],
  [/agile|plan|process|direction/i, Workflow],
  [/backend|api|server|service/i, Server],
  [/front-end|frontend|build|platform|develop/i, Code],
];

const iconFor = (text) => (WORK_ICON_RULES.find(([re]) => re.test(text)) || [null, Layers])[1];

function SectionTitle({ children }) {
  return <h2 className="profile-section-title">{children}</h2>;
}

export default function Profile() {
  const { id } = useParams();
  const member = getMemberById(id);

  useEffect(() => {
    if (member) document.title = `${member.name} — ${member.role} | Nexora`;
  }, [member]);

  if (!member) {
    return <Navigate to="/team" replace />;
  }

  const position = teamInDisplayOrder.indexOf(member);
  const number = String(position + 1).padStart(2, '0');
  const count = teamInDisplayOrder.length;
  const prevMember = teamInDisplayOrder[(position - 1 + count) % count];
  const nextMember = teamInDisplayOrder[(position + 1) % count];
  const isAvatar = member.image === defaultAvatar;
  const frame = member.photoFrame;
  const nameWords = member.name.split(' ');
  const lastName = nameWords.pop();
  const firstNames = nameWords.join(' ');

  const relatedProjects = (member.projects || [])
    .map((pid) => getProjectById(pid))
    .filter(Boolean);

  const socials = [
    { href: member.social.github, label: 'GitHub', Icon: Github, external: true },
    { href: member.social.linkedin, label: 'LinkedIn', Icon: Linkedin, external: true },
    { href: member.social.email, label: 'Email', Icon: Mail, external: false },
  ];

  return (
    <div className="profile-page">
      {/* ---------- Hero banner (auditorium photo behind a dark overlay) ---------- */}
      <section className="profile-hero page-hero">
        <div
          className="profile-hero__bg"
          style={{ backgroundImage: `url(${profileBg})` }}
          aria-hidden="true"
        />
        <div className="profile-hero__overlay" aria-hidden="true" />
        <div className="container profile-hero__inner">
          <Reveal>
            <Link to="/team" className="profile-back link-underline">
              <ArrowLeft size={16} /> Back to Team
            </Link>
          </Reveal>

          <div className="profile-hero__grid">
            <Reveal className="profile-hero__portrait">
              <div className="profile-hero__frame">
                {member.image ? (
                  <ImageReveal fill>
                    <img
                      src={member.image}
                      alt=""
                      className={`profile-hero__photo ${isAvatar ? 'profile-hero__photo--avatar' : ''}`}
                      style={!isAvatar && frame ? {
                        '--photo-position': frame.position,
                        '--photo-zoom': frame.zoom,
                        '--photo-origin': frame.origin,
                        '--photo-shift': frame.shift,
                      } : undefined}
                    />
                  </ImageReveal>
                ) : (
                  <span className="profile-hero__initials">{member.initials}</span>
                )}
              </div>
            </Reveal>

            <div className="profile-hero__copy">
              <Reveal>
                <p className="eyebrow profile-hero__eyebrow">
                  {number} / {member.isLead ? 'Team Leader' : 'Team Member'}
                </p>
              </Reveal>
              <TextReveal
                as="h1"
                className="profile-hero__name"
                delay={0.06}
                inView={false}
                accentCount={nameWords.length + 1}
              >
                {`Hi, I’m ${firstNames ? `${firstNames} ${lastName}` : lastName}`}
              </TextReveal>
              <Reveal delay={0.12}>
                <p className="profile-hero__role">{member.role}</p>
                <span className="profile-hero__rule" aria-hidden="true" />
              </Reveal>
              <Reveal delay={0.18}>
                <p className="body-lg profile-hero__tagline">{member.tagline}</p>
              </Reveal>
              <Reveal delay={0.24} className="profile-hero__actions">
                <Button as="button" variant="primary" onClick={seeWork}>
                  See My Work
                </Button>
                <Button to="/contact" variant="ghost">
                  Get in Touch
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="profile-body">
      {/* ---------- About · Skills · Contact ---------- */}
      <section className="profile-section profile-section--first">
        <div className="container profile-about">
          <Reveal className="profile-panel">
            <SectionTitle>About Me</SectionTitle>
            <p className="profile-panel__text">{member.bio}</p>
          </Reveal>

          <Reveal delay={0.08} className="profile-panel">
            <SectionTitle>Skills</SectionTitle>
            <ul className="profile-pills">
              {member.technologies.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <ul className="profile-pills profile-pills--soft">
              {member.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16} className="profile-panel">
            <SectionTitle>Contact</SectionTitle>
            <ul className="profile-contact">
              {socials.map(({ href, label, Icon, external }) => (
                <li key={label}>
                  <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    <span className="profile-contact__icon" aria-hidden="true">
                      <Icon size={16} />
                    </span>
                    <span className="profile-contact__text">
                      <span className="profile-contact__label">{label}</span>
                      <span className="profile-contact__value">{contactValue(label, href)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="profile-contact__cta link-underline">
              Send a message <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- What I Do ---------- */}
      <section className="profile-section" id={relatedProjects.length ? undefined : 'work'}>
        <div className="container">
          <Reveal>
            <SectionTitle>What I Do</SectionTitle>
          </Reveal>
          <div className="profile-work">
            {member.responsibilities.map((r, i) => {
              const Icon = iconFor(r);
              return (
                <Reveal delay={Math.min(i * 0.06, 0.24)} className="profile-work__card" key={r}>
                  <span className="profile-work__icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <p className="profile-work__text">{r}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Selected Projects ---------- */}
      {relatedProjects.length > 0 && (
        <section className="profile-section profile-section--last" id="work">
          <div className="container">
            <Reveal>
              <SectionTitle>Selected Projects</SectionTitle>
            </Reveal>
            <div className="profile-projects">
              {relatedProjects.map((p, i) => {
                const external = p.link && p.link !== '#';
                return (
                  <Reveal delay={Math.min(i * 0.06, 0.24)} key={p.id}>
                    <a
                      href={external ? p.link : '/projects'}
                      className="profile-project"
                      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      <div className="profile-project__media">
                        {p.image ? (
                          <img src={p.image} alt="" />
                        ) : (
                          <span>{p.title.charAt(0)}</span>
                        )}
                      </div>
                      <div className="profile-project__body">
                        <span className="profile-project__category">{p.category}</span>
                        <h3 className="profile-project__title">
                          {p.title} <ArrowUpRight size={16} />
                        </h3>
                        <p className="profile-project__desc">{p.description}</p>
                      </div>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Previous / next member ---------- */}
      <nav className="profile-nav container" aria-label="Other team members">
        <Link to={`/team/${prevMember.id}`} className="profile-nav__link">
          <span className="profile-nav__dir">
            <ArrowLeft size={15} /> Previous
          </span>
          <span className="profile-nav__name">{prevMember.name}</span>
          <span className="profile-nav__role">{prevMember.role}</span>
        </Link>
        <Link to={`/team/${nextMember.id}`} className="profile-nav__link profile-nav__link--next">
          <span className="profile-nav__dir">
            Next <ArrowRight size={15} />
          </span>
          <span className="profile-nav__name">{nextMember.name}</span>
          <span className="profile-nav__role">{nextMember.role}</span>
        </Link>
      </nav>
      </div>
    </div>
  );
}
