import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import TextReveal from '../components/TextReveal';
import PageGlow from '../components/PageGlow';
import { teamInDisplayOrder, defaultAvatar } from '../data/team';
import './team.css';

function TeamRow({ member, index }) {
  const isAvatar = member.image === defaultAvatar;
  const frame = member.photoFrame;

  return (
    <Reveal delay={Math.min(index * 0.08, 0.32)} className="team-row">
      <Link
        to={`/team/${member.id}`}
        className={`team-row__card ${member.isLead ? 'team-row__card--lead' : ''}`}
        aria-label={`View ${member.name}'s profile`}
        data-cursor="View"
      >
        <span className="team-row__number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="team-row__media">
          {member.image ? (
            <img
              src={member.image}
              alt=""
              className={`team-row__photo ${isAvatar ? 'team-row__photo--avatar' : ''}`}
              style={!isAvatar && frame ? {
                '--photo-position': frame.position,
                '--photo-zoom': frame.zoom,
                '--photo-origin': frame.origin,
                '--photo-shift': frame.shift,
              } : undefined}
            />
          ) : (
            <span className="team-row__initials">{member.initials}</span>
          )}
        </div>

        <div className="team-row__body">
          <h2 className="team-row__name">{member.name}</h2>
          <p className="team-row__role">{member.role}</p>
          <span className="team-row__rule" aria-hidden="true" />
          <span className="team-row__view">
            View Profile <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Team() {
  return (
    <div className="team-page">
      <section className="team-roster page-hero">
        <PageGlow />
        <span className="team-roster__orb team-roster__orb--top" aria-hidden="true" />
        <span className="team-roster__orb team-roster__orb--bottom" aria-hidden="true" />

        <div className="container team-roster__grid">
          <div className="team-roster__intro">
            <Reveal>
              <p className="eyebrow">Our Team</p>
            </Reveal>
            <TextReveal as="h1" className="h-xl team-roster__title" delay={0.08} inView={false} accentCount={1}>
              Meet Our Team
            </TextReveal>
            <Reveal delay={0.16}>
              <p className="body-lg team-roster__sub">
                A passionate team of builders, problem-solvers and innovators
                working towards a better digital future.
              </p>
            </Reveal>
          </div>

          {teamInDisplayOrder.map((member, i) => (
            <TeamRow member={member} index={i} key={member.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
