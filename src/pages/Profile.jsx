import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Mail,
  ArrowLeft,
  ArrowUpRight,
  Code,
  Server,
  Layers,
  Users,
  Database,
  Shield,
} from 'lucide-react';
import Reveal from '../components/Reveal';
import TextReveal from '../components/TextReveal';
import ImageReveal from '../components/ImageReveal';
import PageGlow from '../components/PageGlow';
import { getMemberById, defaultAvatar, teamInDisplayOrder } from '../data/team';
import { getProjectById } from '../data/projects';
import './profile.css';

// Icons cycled across the "What I Do" cards.
const WORK_ICONS = [Code, Server, Layers, Users, Database, Shield];

function SectionTitle({ children }) {
  return <h2 className="profile-section-title">{children}</h2>;
}

export default function Profile() {
  const { id } = useParams();
  const member = getMemberById(id);

  if (!member) {
    return <Navigate to="/team" replace />;
  }

  const number = String(teamInDisplayOrder.indexOf(member) + 1).padStart(2, '0');
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
      {/* ---------- Hero ---------- */}
      <section className="profile-hero page-hero">
        <PageGlow />
        <span className="profile-hero__orb" aria-hidden="true" />
        <div className="container">
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
                accentCount={1}
              >
                {firstNames ? `${firstNames} ${lastName}` : lastName}
              </TextReveal>
              <Reveal delay={0.12}>
                <p className="profile-hero__role">{member.role}</p>
                <span className="profile-hero__rule" aria-hidden="true" />
              </Reveal>
              <Reveal delay={0.18}>
                <p className="body-lg profile-hero__tagline">{member.tagline}</p>
              </Reveal>
              <Reveal delay={0.24} className="profile-hero__social">
                {socials.map(({ href, label, Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={`${member.name} on ${label}`}
                    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- About + Skills ---------- */}
      <section className="profile-section profile-section--first">
        <div className="container profile-about">
          <Reveal className="profile-panel">
            <SectionTitle>About Me</SectionTitle>
            <p className="profile-panel__text">{member.bio}</p>
          </Reveal>

          <Reveal delay={0.08} className="profile-panel">
            <SectionTitle>Skills &amp; Expertise</SectionTitle>
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
        </div>
      </section>

      {/* ---------- What I Do ---------- */}
      <section className="profile-section">
        <div className="container">
          <Reveal>
            <SectionTitle>What I Do</SectionTitle>
          </Reveal>
          <div className="profile-work">
            {member.responsibilities.map((r, i) => {
              const Icon = WORK_ICONS[i % WORK_ICONS.length];
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
        <section className="profile-section profile-section--last">
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
    </div>
  );
}
