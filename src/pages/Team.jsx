import Reveal from '../components/Reveal';
import TextReveal from '../components/TextReveal';
import TeamCard from '../components/TeamCard';
import PageGlow from '../components/PageGlow';
import { team } from '../data/team';
import './team.css';

export default function Team() {
  return (
    <div className="team-page">
      <section className="team-hero page-hero">
        <PageGlow />
        <div className="container">
          <Reveal>
            <p className="eyebrow">Our Team</p>
          </Reveal>
          <TextReveal as="h1" className="h-display" delay={0.08} inView={false}>
            Meet the Team
          </TextReveal>
          <Reveal delay={0.16}>
            <p className="body-lg team-hero__sub">The people turning ideas into technology.</p>
          </Reveal>
        </div>
      </section>

      <section className="section team-page__grid-section">
        <div className="container">
          <div className="team-page__grid">
            {team.map((member, i) => (
              <TeamCard member={member} index={i} key={member.id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
