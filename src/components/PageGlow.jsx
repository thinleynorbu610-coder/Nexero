import './page-glow.css';

/**
 * Shared ambient backdrop for secondary-page heroes (About, Team, Projects,
 * Services, Contact, Profile) — the same subtle grid + violet glow language
 * as the home Hero, scaled down to a single centered accent. Purely
 * decorative: aria-hidden, absolutely positioned, no layout impact.
 *
 * The hero section it's placed in needs `position: relative; overflow:
 * hidden; isolation: isolate;` (see page-glow.css `.page-hero`) so the glow
 * stays confined behind the section's own content.
 */
export default function PageGlow() {
  return (
    <div className="page-hero__backdrop" aria-hidden="true">
      <div className="bg-grid" />
      <div className="page-hero__glow" />
      <div className="section-fade-bottom" />
    </div>
  );
}
