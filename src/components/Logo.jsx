import { Link } from 'react-router-dom';
import logoMark from '../assets/nx-mark.png';
import './logo.css';

/**
 * Central place the Nexora logo is rendered. The mark (nx-mark.png) is a
 * white "NX" wordmark on a real transparent background.
 * Replace /src/assets/nx-mark.png to update every usage across the navbar,
 * footer, and hero network visual at once.
 */
export default function Logo({ height = 34, linkTo = '/', className = '', showWordmark = true }) {
  return (
    <Link to={linkTo} className={`logo-link ${className}`} aria-label="Nexora — home">
      <img src={logoMark} alt="" className="logo-link__mark" style={{ height }} />
      {showWordmark && <span className="logo-link__word">Nexora</span>}
    </Link>
  );
}
