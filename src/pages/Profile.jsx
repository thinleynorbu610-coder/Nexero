import { useParams, Link, Navigate } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowLeft, ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import TextReveal from '../components/TextReveal';
import ImageReveal from '../components/ImageReveal';
import Button from '../components/Button';
import PageGlow from '../components/PageGlow';
import { getMemberById } from '../data/team';
import { getProjectById } from '../data/projects';
import './profile.css';

export default function Profile() {
  const { id } = useParams();
  const member = getMemberById(id);

  if (!member) {
    return <Navigate to="/team" replace />;
  }

  const relatedProjects = (member.projects || [])
    .map((pid) => getProjectById(pid))
    .filter(Boolean);

  return (
    <div className="profile-page">
      <section className="profile-hero page-hero">
        <PageGlow />
        <div className="container">
          <Reveal>
            <Link to="/team" className="profile-back link-underline">
              <ArrowLeft size={16} /> Back to Team
            </Link>
          </Reveal>

          <div className="profile-hero__grid">
            <Reveal className="profile-hero__portrait">
              <div className="profile-hero__portrait-inner">
                {member.image ? (
                  <ImageReveal fill>
                    <img src={member.image} alt="" className="profile-hero__photo" />
                  </ImageReveal>
                ) : (
                  <span>{member.initials}</span>
                )}
              </div>
            </Reveal>

            <div>
              {member.isLead && (
                <Reveal>
                  <span className="profile-hero__badge">Team Leader</span>
                </Reveal>
              )}
              <TextReveal as="h1" className="h-display profile-hero__name" delay={0.06} inView={false}>
                {member.name}
              </TextReveal>
              <Reveal delay={0.12}>
                <p className="label profile-hero__role">{member.role}</p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="body-lg profile-hero__bio">{member.bio}</p>
              </Reveal>

              <Reveal delay={0.24} className="profile-hero__actions">
                <Button to="/contact" variant="primary">
                  Contact {member.name.split(' ')[0]}
                </Button>
                <div className="profile-hero__social">
                  <a href={member.social.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <Github size={18} />
                  </a>
                  <a href={member.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                  <a href={member.social.email} aria-label="Email">
                    <Mail size={18} />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt profile-detail">
        <div className="container profile-detail__grid">
          <Reveal className="profile-detail__block">
            <p className="eyebrow">Skills</p>
            <ul className="tag-list">
              {member.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="profile-detail__block">
            <p className="eyebrow">Technologies</p>
            <ul className="tag-list">
              {member.technologies.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16} className="profile-detail__block profile-detail__block--full">
            <p className="eyebrow">Responsibilities</p>
            <ul className="profile-detail__list">
              {member.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal>
              <p className="eyebrow">Projects</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="h-lg profile-projects__title">
                What {member.name.split(' ')[0]} has worked on
              </h2>
            </Reveal>
            <div className="profile-projects__list">
              {relatedProjects.map((p, i) => (
                <Reveal delay={0.1 + i * 0.06} key={p.id} className="profile-projects__item">
                  <div>
                    <span className="label">{p.category}</span>
                    <h3 className="h-md">{p.title}</h3>
                  </div>
                  <a href={p.link} className="link-underline profile-projects__link">
                    View <ArrowUpRight size={15} />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
