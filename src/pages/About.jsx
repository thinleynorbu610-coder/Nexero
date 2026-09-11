import Reveal from '../components/Reveal';
import TextReveal from '../components/TextReveal';
import Button from '../components/Button';
import WaveLines from '../components/WaveLines';
import AnimatedBlob from '../components/AnimatedBlob';
import PageGlow from '../components/PageGlow';
import aboutNxImg from '../assets/hero/about-nx.webp';
import './about.css';

const values = [
  { title: 'Innovation', desc: 'Choosing the most direct, effective solution over the familiar one.' },
  { title: 'Integrity', desc: 'Being honest about tradeoffs, timelines, and what a project actually needs.' },
  { title: 'Security', desc: 'Treating security as a foundation, not an afterthought.' },
  { title: 'Continuous Learning', desc: 'Staying current as tools, threats, and best practices evolve.' },
  { title: 'Teamwork', desc: 'Four specialists moving as one team toward a shared standard.' },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero page-hero">
        <PageGlow />
        <div className="container about-hero__grid">
          <div className="about-hero__copy">
            <Reveal>
              <p className="eyebrow">About Nexora</p>
            </Reveal>
            <TextReveal as="h1" className="h-display about-hero__title" delay={0.08} inView={false}>
              More Than Code. We Build Possibilities.
            </TextReveal>
            <Reveal delay={0.2}>
              <p className="body-lg about-hero__sub">
                Four specialists — one team — building secure, scalable software with the
                craft of people who care how it&rsquo;s built, not just that it ships.
              </p>
            </Reveal>
          </div>

          <div className="about-hero__visual" aria-hidden="true">
            <img src={aboutNxImg} alt="" className="about-hero__nx-orb" />
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="section about-row">
        <div className="container about-row__inner">
          <Reveal className="about-row__label">
            <p className="eyebrow">Our Story</p>
          </Reveal>
          <div className="about-row__content">
            <Reveal>
              <h2 className="h-lg">Started by four people who wanted to build things properly.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-lg">
                Nexora came together around a simple observation: most small
                technology teams either move fast and cut corners on security, or
                move carefully and lose momentum. We set out to do both — build
                quickly, without treating security and architecture as optional
                extras. What started as a small group of developers has grown
                into a team that covers backend engineering, leadership, and
                cybersecurity under one roof.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="section section--alt about-row about-row--reverse">
        <div className="container about-row__inner">
          <Reveal className="about-row__label">
            <p className="eyebrow">Who We Are</p>
          </Reveal>
          <div className="about-row__content">
            <Reveal>
              <h2 className="h-lg">A small team, deliberately.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-lg">
                We're four specialists — two backend developers, a team leader,
                and a cybersecurity specialist — working closely enough that
                nothing falls through the gap between disciplines. That size lets
                us stay hands-on with every project we take on, rather than
                spreading thin across too many clients at once.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="section about-row">
        <div className="container about-row__inner">
          <Reveal className="about-row__label">
            <p className="eyebrow">Our Mission</p>
          </Reveal>
          <div className="about-row__content">
            <Reveal>
              <h2 className="h-lg">
                To create secure, scalable, and meaningful digital solutions that
                solve real-world problems.
              </h2>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="section section--alt about-row about-row--reverse">
        <div className="container about-row__inner">
          <Reveal className="about-row__label">
            <p className="eyebrow">Our Vision</p>
          </Reveal>
          <div className="about-row__content">
            <Reveal>
              <h2 className="h-lg">
                To become a trusted technology team known for innovation,
                security, and impactful digital solutions.
              </h2>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Our Values</p>
          </Reveal>
          <div className="values-list">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06} className="values-list__item">
                <span className="values-list__num">0{i + 1}</span>
                <h3 className="h-md">{v.title}</h3>
                <p className="body-md">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-cta">
        <div className="container about-cta__inner">
          <div className="about-cta__glow" aria-hidden="true" />
          <AnimatedBlob className="about-cta__blob" />
          <WaveLines />
          <Reveal>
            <h2 className="h-xl">Want to know more about how we work?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button to="/contact" variant="primary">
              Get in Touch
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
