import Button from '../components/Button';
import Reveal from '../components/Reveal';

export default function NotFound() {
  return (
    <section className="section" style={{ paddingTop: '220px', textAlign: 'center' }}>
      <div className="container">
        <Reveal>
          <p className="eyebrow">404</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="h-xl" style={{ margin: '20px 0' }}>
            This page doesn&rsquo;t exist.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="body-lg" style={{ marginBottom: '32px' }}>
            The page you&rsquo;re looking for may have moved or been renamed.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <Button to="/" variant="primary">
            Back to Home
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
