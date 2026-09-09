import Reveal from './Reveal';
import TextReveal from './TextReveal';
import './section-heading.css';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  size = 'lg',
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && (
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      )}
      <TextReveal
        as="h2"
        className={`section-heading__title ${size === 'xl' ? 'h-xl' : 'h-lg'}`}
        delay={0.08}
      >
        {title}
      </TextReveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="body-lg section-heading__desc">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
