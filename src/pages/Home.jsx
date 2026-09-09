import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import Hero from '../components/Hero';
import WaveLines from '../components/WaveLines';
import AnimatedBlob from '../components/AnimatedBlob';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import TeamCard from '../components/TeamCard';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import { services } from '../data/services';
import { projects } from '../data/projects';
import { team } from '../data/team';
import './home.css';

const principles = [
  {
    title: 'Innovation',
    desc: 'We look for the most direct path to a solution, not just the familiar one.',
  },
  {
    title: 'Security',
    desc: 'Security is built in from the first line of code, not added at the end.',
  },
  {
    title: 'Scalability',
    desc: 'Systems designed to hold up as usage and complexity grow.',
  },
  {
    title: 'Collaboration',
    desc: 'Four specialists working as one team, not four separate freelancers.',
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* WHO WE ARE */}
      <section className="section">
        <div className="container">
          <div className="intro-grid">
            <Reveal>
              <p className="eyebrow">Who We Are</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h-xl intro-grid__headline">
                Four minds. One vision. Infinite possibilities.
              </h2>
            </Reveal>
            <Reveal delay={0.16} className="intro-grid__desc">
              <p className="body-lg">
                Nexora is a collaborative technology team combining software
                engineering, backend development, leadership, and cybersecurity
                expertise. We work as a single unit — from first architecture
                sketch to production deployment — so every project benefits from
                all four disciplines at once.
              </p>
              <Link to="/about" className="link-underline intro-grid__link">
                Learn more about us
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="What We Do"
            title="Capabilities that cover the full stack."
            description="From the database to the interface, and from architecture to threat modeling — Nexora covers what a modern digital product needs."
          />
          <div className="services-grid">
            {services.slice(0, 6).map((service, i) => (
              <ServiceCard service={service} index={i} key={service.id} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="Featured Projects"
              title="Work built to solve real problems."
              description="A look at what Nexora has been building — systems designed around the people who use them."
            />
            <Button to="/projects" variant="ghost" className="section-heading-row__cta">
              View All Projects
            </Button>
          </div>
          <div className="projects-list">
            {projects.map((project, i) => (
              <ProjectCard project={project} index={i} key={project.id} />
            ))}
          </div>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Our Team"
            title="The People Behind Nexora"
            description="Four specialists, one team — covering backend engineering, leadership, and security."
          />
          <div className="team-grid">
            {team.map((member, i) => (
              <TeamCard member={member} index={i} key={member.id} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY NEXORA */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Why Nexora" title="Built on principles, not just process." />
          <div className="principles-grid">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="principle">
                <span className="principle__index">0{i + 1}</span>
                <h3 className="h-md principle__title">{p.title}</h3>
                <p className="body-md">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container cta-section__inner">
          <div className="cta-section__glow" aria-hidden="true" />
          <AnimatedBlob className="cta-section__blob" />
          <WaveLines />
          <Reveal>
            <h2 className="h-xl cta-section__headline">
              Have an idea? <span className="cta-section__accent">Let&rsquo;s build it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-lg cta-section__sub">
              From concept to implementation, Nexora transforms ideas into
              meaningful digital experiences.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Button to="/contact" variant="primary">
              Start a Conversation
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
