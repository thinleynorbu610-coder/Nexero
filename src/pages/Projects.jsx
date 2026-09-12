import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import TextReveal from '../components/TextReveal';
import ImageReveal from '../components/ImageReveal';
import PageGlow from '../components/PageGlow';
import projectsIllustration from '../assets/hero/projects-illustration.webp';
import { projects, categories } from '../data/projects';
import './projects.css';

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div className="projects-page">
      <section className="projects-hero page-hero">
        <PageGlow />
        <div className="container projects-hero__grid">
          <div className="projects-hero__copy">
            <Reveal>
              <p className="eyebrow">Our Work</p>
            </Reveal>
            <TextReveal as="h1" className="h-display" delay={0.08} inView={false}>
              Projects
            </TextReveal>
            <Reveal delay={0.16}>
              <p className="body-lg projects-hero__sub">
                A look at what Nexora has been building — systems designed around
                the people who use them.
              </p>
            </Reveal>
          </div>

          <div className="projects-hero__visual" aria-hidden="true">
            <img src={projectsIllustration} alt="" className="projects-hero__illustration" />
          </div>
        </div>
      </section>

      <section className="section projects-list-section">
        <div className="container">
          <div className="filter-bar" role="tablist" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={active === cat}
                className={`filter-bar__btn ${active === cat ? 'filter-bar__btn--active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {active === cat && <span className="filter-bar__pill" />}
                <span className="filter-bar__label">{cat}</span>
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filtered.map((project, i) => (
              <Reveal as="article" key={project.id} delay={Math.min(i * 0.06, 0.3)} className="project-tile">
                <div className="project-tile__media">
                  <ImageReveal fill delay={0.1}>
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="project-tile__photo" />
                    ) : (
                      <span>{project.title.charAt(0)}</span>
                    )}
                  </ImageReveal>
                </div>
                <div className="project-tile__meta">
                  <span className="label">{project.category}</span>
                  <span className="project-tile__status">{project.status}</span>
                </div>
                <h3 className="h-md project-tile__title">{project.title}</h3>
                <p className="body-md project-tile__desc">{project.description}</p>

                <div className="project-tile__block">
                  <p className="project-tile__block-label">Problem</p>
                  <p className="body-md">{project.problem}</p>
                </div>
                <div className="project-tile__block">
                  <p className="project-tile__block-label">Solution</p>
                  <p className="body-md">{project.solution}</p>
                </div>

                <ul className="project-tile__tech">
                  {project.technologies.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                <p className="project-tile__role">
                  <strong>Nexora&rsquo;s role: </strong>
                  {project.role}
                </p>

                <a
                  href={project.link}
                  className="link-underline project-tile__link"
                  data-cursor="View"
                  target={project.link !== '#' ? '_blank' : undefined}
                  rel={project.link !== '#' ? 'noreferrer' : undefined}
                >
                  View Project <ArrowUpRight size={15} />
                </a>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="body-lg projects-empty">No projects in this category yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
