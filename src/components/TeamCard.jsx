import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import ImageReveal from './ImageReveal';
import useTilt from '../hooks/useTilt';
import './team-card.css';

export default function TeamCard({ member, index = 0 }) {
  const tilt = useTilt(6);

  return (
    <Reveal delay={Math.min(index * 0.08, 0.32)} className={`team-card ${member.isLead ? 'team-card--lead' : ''}`}>
      <Link
        to={`/team/${member.id}`}
        className="team-card__link"
        aria-label={`View ${member.name}'s profile`}
        data-cursor="View"
      >
        <div
          className="team-card__portrait"
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
        >
          {member.image ? (
            <ImageReveal fill>
              <img src={member.image} alt="" className="team-card__photo" />
            </ImageReveal>
          ) : (
            <span className="team-card__initials" aria-hidden="true">
              {member.initials}
            </span>
          )}
          <div className="team-card__overlay" />

          <div className="team-card__reveal">
            <p className="body-md team-card__tagline">{member.tagline}</p>
            <div className="team-card__social" onClick={(e) => e.stopPropagation()}>
              <a href={member.social.github} aria-label={`${member.name} on GitHub`} target="_blank" rel="noreferrer">
                <Github size={16} />
              </a>
              <a href={member.social.linkedin} aria-label={`${member.name} on LinkedIn`} target="_blank" rel="noreferrer">
                <Linkedin size={16} />
              </a>
              <a href={member.social.email} aria-label={`Email ${member.name}`}>
                <Mail size={16} />
              </a>
            </div>
          </div>

          {member.isLead && <span className="team-card__lead-badge">Team Leader</span>}
        </div>

        <div className="team-card__info">
          <div>
            <h3 className="h-md team-card__name">{member.name}</h3>
            <p className="label team-card__role">{member.role}</p>
          </div>
          <span className="team-card__view">
            View Profile <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
