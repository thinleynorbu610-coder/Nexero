import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import TextReveal from '../components/TextReveal';
import PageGlow from '../components/PageGlow';
import Button from '../components/Button';
import useReducedMotion from '../hooks/useReducedMotion';
import { teamInDisplayOrder, defaultAvatar } from '../data/team';
import './team.css';

const team = teamInDisplayOrder;
const count = team.length;

const wrapIndex = (i) => ((i % count) + count) % count;

// Signed distance of card `index` from the (fractional) carousel position,
// wrapped so the carousel loops: values run from -count/2 to count/2.
const distanceFrom = (index, position) => {
  let d = wrapIndex(index - position);
  if (d > count / 2) d -= count;
  return d;
};

const TILT_DEG = 14; // how far side cards turn toward the centre
const SNAP_DELAY = 140; // ms of touchpad silence before gliding to a card
const FOLLOW = 0.3; // how tightly cards follow a swipe or drag (per frame)
const SETTLE = 0.11; // how gently they glide into place afterwards

const MemberCard = forwardRef(function MemberCard({ member, index, isActive, onSelect }, ref) {
  const isAvatar = member.image === defaultAvatar;

  const body = (
    <>
      <div className={`team-card3__media ${isAvatar ? 'team-card3__media--avatar' : ''}`}>
        {member.image ? (
          <img src={member.image} alt="" className="team-card3__photo" draggable="false" />
        ) : (
          <span className="team-card3__initials">{member.initials}</span>
        )}
      </div>
      <div className="team-card3__shade" aria-hidden="true" />

      <span className="team-card3__number" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="team-card3__content">
        <p className="team-card3__role">{member.role}</p>
        <h2 className="team-card3__name">{member.name}</h2>
        <p className="team-card3__tagline">{member.tagline}</p>
        {isActive && (
          <span className="team-card3__cta">
            View Profile <ArrowRight size={16} />
          </span>
        )}
      </div>
    </>
  );

  const className = `team-card3 ${isActive ? 'is-active' : ''}`;

  return isActive ? (
    <Link
      ref={ref}
      to={`/team/${member.id}`}
      className={className}
      aria-label={`View ${member.name}'s profile`}
      data-cursor="View"
      draggable="false"
    >
      {body}
    </Link>
  ) : (
    <button
      ref={ref}
      type="button"
      className={className}
      onClick={() => onSelect(index)}
      aria-label={`Show ${member.name}`}
    >
      {body}
    </button>
  );
});

export default function Team() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  // `position` is what's drawn; `target` is where it's heading. Both are
  // fractional card indexes that grow without bound, so the loop never jumps.
  const position = useRef(0);
  const target = useRef(0);
  const frame = useRef(0);
  const following = useRef(false); // finger/touchpad currently driving it
  const metrics = useRef({ width: 340, gap: 24, side: 0.82 });
  const drag = useRef(null);
  const swiped = useRef(false);
  const wheelTimer = useRef(0);

  useEffect(() => {
    document.title = 'Our Team — Nexora';
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const card = cardRefs.current.find(Boolean);
    if (!track || !card) return;
    const width = card.offsetWidth; // layout size, unaffected by transforms
    const side = parseFloat(getComputedStyle(track).getPropertyValue('--s')) || 0.82;
    metrics.current = { width, side, gap: Math.max(12, width * 0.07) };
  }, []);

  // Place every card for the current fractional position: the centre card is
  // full size and in colour; neighbours shrink, turn in, go grey and fade out
  // past the first neighbour — all continuously, so a swipe feels physical.
  const render = useCallback(() => {
    const { width, gap, side } = metrics.current;
    const shrink = 1 - side;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const d = distanceFrom(i, position.current);
      const a = Math.abs(d);
      const near = Math.min(a, 1);
      const x = d * (width * side + gap) + Math.sign(d) * near * ((width * shrink) / 2);
      const scale = 1 - shrink * near;
      const tilt = -Math.max(-1.5, Math.min(1.5, d)) * TILT_DEG;
      const opacity = Math.max(0, Math.min(1, (1.75 - a) / 0.75));

      el.style.transform = `translate3d(${x}px, 0, 0) perspective(1600px) rotateY(${tilt}deg) scale(${scale})`;
      el.style.opacity = opacity;
      el.style.zIndex = String(100 - Math.round(a * 10));
      el.style.visibility = opacity <= 0.001 ? 'hidden' : 'visible';
      el.style.pointerEvents = a > 1.3 ? 'none' : '';
      el.style.setProperty('--mono', near.toFixed(3));
      el.tabIndex = a > 1.3 ? -1 : 0;
      el.setAttribute('aria-hidden', a > 1.3 ? 'true' : 'false');
    });
  }, []);

  const tick = useCallback(() => {
    const diff = target.current - position.current;
    const ease = reduced ? 1 : following.current ? FOLLOW : SETTLE;
    position.current += diff * ease;

    const settled = Math.abs(diff) < 0.0005 && !following.current && !drag.current;
    if (settled) position.current = target.current;

    render();
    setActive(wrapIndex(Math.round(position.current)));
    frame.current = settled ? 0 : requestAnimationFrame(tick);
  }, [reduced, render]);

  const kick = useCallback(() => {
    if (!frame.current) frame.current = requestAnimationFrame(tick);
  }, [tick]);

  const go = (step) => {
    target.current = Math.round(target.current) + step;
    kick();
  };

  // Shortest way round the loop to member `i`
  const goTo = (i) => {
    const here = Math.round(target.current);
    let d = wrapIndex(i - here);
    if (d > count / 2) d -= count;
    target.current = here + d;
    kick();
  };

  // The centre card swaps between a <button> and a <Link>, so React creates a
  // fresh element without the inline transform — place it again right away.
  useLayoutEffect(() => {
    render();
  }, [active, render]);

  useLayoutEffect(() => {
    measure();
    render();
    const onResize = () => {
      measure();
      render();
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [measure, render]);

  // Two-finger touchpad swipe (horizontal wheel). Needs a non-passive
  // listener so a sideways swipe doesn't also trigger browser back/forward.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // vertical: let the page scroll
      e.preventDefault();
      const { width, side, gap } = metrics.current;
      const slot = width * side + gap;
      // Never run more than one card ahead of what's on screen
      const next = target.current + e.deltaX / slot;
      const base = Math.round(position.current);
      target.current = Math.max(base - 1.2, Math.min(base + 1.2, next));
      following.current = true;
      kick();
      clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        following.current = false;
        target.current = Math.round(target.current);
        kick();
      }, SNAP_DELAY);
    };
    track.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      track.removeEventListener('wheel', onWheel);
      clearTimeout(wheelTimer.current);
    };
  }, [kick]);

  // Drag with a mouse, or swipe on a touch screen. The cards follow the
  // pointer; a quick flick carries on to the next card.
  useEffect(() => {
    const onMove = (e) => {
      const g = drag.current;
      if (!g) return;
      const dx = e.clientX - g.x;
      if (Math.abs(dx) > 6) g.moved = true;
      const now = performance.now();
      const dt = Math.max(1, now - g.lastT);
      g.velocity = 0.8 * g.velocity + 0.2 * ((e.clientX - g.lastX) / dt);
      g.lastX = e.clientX;
      g.lastT = now;
      const { width, side, gap } = metrics.current;
      target.current = g.start - dx / (width * side + gap);
      kick();
    };
    const onUp = () => {
      const g = drag.current;
      if (!g) return;
      drag.current = null;
      following.current = false;
      trackRef.current?.classList.remove('is-dragging');
      swiped.current = g.moved;
      const { width, side, gap } = metrics.current;
      const fling = (-g.velocity * 180) / (width * side + gap);
      const landing = Math.round(target.current + fling);
      target.current = Math.max(Math.round(g.start) - 2, Math.min(Math.round(g.start) + 2, landing));
      kick();
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [kick]);

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    swiped.current = false;
    following.current = true;
    drag.current = {
      x: e.clientX,
      start: target.current,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
      moved: false,
    };
    trackRef.current?.classList.add('is-dragging');
  };

  // A drag must not also count as a click on the card under the pointer
  const onClickCapture = (e) => {
    if (swiped.current) {
      e.preventDefault();
      e.stopPropagation();
      swiped.current = false;
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };

  return (
    <div className="team-page">
      <section className="team-stage page-hero">
        <PageGlow />

        <div className="container team-stage__intro">
          <Reveal>
            <p className="eyebrow">Our Team</p>
          </Reveal>
          <TextReveal as="h1" className="h-xl team-stage__title" delay={0.08} inView={false} accentCount={1}>
            Meet Our Team
          </TextReveal>
          <Reveal delay={0.16}>
            <p className="body-lg team-stage__sub">
              A passionate team of builders, problem-solvers and innovators
              working towards a better digital future.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div
            ref={trackRef}
            className="team-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Team members"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onClickCapture={onClickCapture}
            onDragStart={(e) => e.preventDefault()}
          >
            {team.map((member, i) => (
              <MemberCard
                key={member.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                member={member}
                index={i}
                isActive={i === active}
                onSelect={goTo}
              />
            ))}
          </div>

          <div className="team-carousel__controls">
            <button type="button" className="team-carousel__arrow" onClick={() => go(-1)} aria-label="Previous member">
              <ArrowLeft size={18} />
            </button>
            <div className="team-carousel__dots">
              {team.map((member, i) => (
                <button
                  type="button"
                  key={member.id}
                  className={`team-carousel__dot ${i === active ? 'is-active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Show ${member.name}`}
                  aria-current={i === active}
                />
              ))}
            </div>
            <button type="button" className="team-carousel__arrow" onClick={() => go(1)} aria-label="Next member">
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="team-carousel__status" aria-live="polite">
            {team[active].name} — {team[active].role}
          </p>
        </Reveal>
      </section>

      <section className="team-cta">
        <div className="container">
          <Reveal className="team-cta__panel">
            <div>
              <p className="eyebrow">Work With Us</p>
              <h2 className="team-cta__title">Have a project in mind?</h2>
              <p className="body-lg team-cta__text">
                Tell us what you&rsquo;re building — we&rsquo;ll bring the right people to it.
              </p>
            </div>
            <Button to="/contact" variant="primary">
              Start a Conversation
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
