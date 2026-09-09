import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import ImageReveal from './ImageReveal';
import useTilt from '../hooks/useTilt';
import './project-card.css';

export default function ProjectCard({ project, index = 0, layout = 'row' }) {
  const tilt = useTilt(8);

  return (
    <Reveal delay={Math.min(index * 0.08, 0.3)} className={`project-card project-card--${layout}`}>
      <div
        className="project-card__media"
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
      >
        <ImageReveal fill delay={0.1}>
          <div className="project-card__media-inner">
            <span className="project-card__glyph">{project.title.charAt(0)}</span>
          </div>
        </ImageReveal>
      </div>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="label">{project.category}</span>
          <span className="project-card__status">{project.status}</span>
        </div>

        <h3 className="h-lg project-card__title">{project.title}</h3>
        <p className="body-md project-card__desc">{project.description}</p>

        <ul className="project-card__tech">
          {project.technologies.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <a href={project.link} className="project-card__link link-underline" data-cursor="View">
          View Project
          <ArrowUpRight size={16} />
        </a>
      </div>
    </Reveal>
  );
}
