# Nexora — Website

A premium, dark-themed React website for Nexora, built with Vite, React Router, and Framer Motion.

## 1. Installation

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## 2. Project structure

```
src/
  components/   Reusable UI pieces (Navbar, Footer, Hero, cards, etc.)
  pages/        One file per route (Home, About, Team, Profile, Projects, Services, Contact)
  data/         team.js, projects.js, services.js — edit these to change site content
  assets/       Logo files and favicon
  styles/       variables.css (design tokens), global.css, animations.css
  App.jsx       Routes
  main.jsx      Entry point
```

## 3. Adding the real Nexora logo

The site currently ships with a **placeholder** logo (an "NX" mark + "Nexora" wordmark)
at `src/assets/logo.svg` (for dark backgrounds) and `src/assets/logo-dark.svg` (for light
backgrounds), since no logo file was attached to the brief.

To swap in the official logo:
1. Export your logo as an SVG (preferred) or PNG.
2. Replace `src/assets/logo.svg` with your file, keeping the same filename — or update
   the import path in `src/components/Logo.jsx` if you use a different filename.
3. If you need a separate light/dark variant, do the same with `logo-dark.svg`.

The `Logo` component is used everywhere (navbar, footer), so this one change updates the
whole site. It preserves the image's natural aspect ratio — just set `height` on `<Logo />`
where it's used if you need a different size.

## 4. Replacing team member photos

Open `src/data/team.js`. Each member currently has `image: null` and uses a two-letter
`initials` placeholder inside a styled portrait card.

To add a real photo:
1. Add the image file to `src/assets/` (e.g. `src/assets/team/thinley.jpg`).
2. Import it at the top of `team.js`: `import thinleyPhoto from '../assets/team/thinley.jpg';`
3. Set `image: thinleyPhoto` on that member's object.
4. In `TeamCard.jsx` and `Profile.jsx`, replace the `<span>{member.initials}</span>`
   placeholder with `<img src={member.image} alt={member.name} />` (an `image &&` conditional
   is a good way to keep the initials as a fallback).

All other fields on a team member — `bio`, `skills`, `technologies`, `responsibilities`,
`social`, `projects` — can be edited directly in `team.js` and will update the Team page,
individual profile pages, and the footer automatically.

## 5. Adding or editing projects

Open `src/data/projects.js` and add a new object to the `projects` array:

```js
{
  id: 'my-new-project',      // used in the URL-safe key and React keys
  title: 'My New Project',
  category: 'Web',           // must be one of: Web, Backend, Security, Systems
  status: 'Live',            // or "In Development", "Completed", etc.
  description: '...',
  problem: '...',
  solution: '...',
  technologies: ['React', 'Node.js'],
  role: "Nexora's role in the project",
  link: 'https://...',
  featured: true,
}
```

This single change updates the Home page featured section and the Projects page
(including the category filter) automatically. To link a project to a team member,
add its `id` to that member's `projects` array in `team.js`.

## 6. Customizing colors

All colors are defined as CSS custom properties in `src/styles/variables.css`:

```css
--bg-primary: #2f2d31;
--bg-deep: #1d1c20;
--bg-dark-surface: #242328;
--bg-card: #333137;
--text-primary: #ffffff;
--text-secondary: #b8b6bd;
--text-muted: #85828b;
--accent-violet: #9b95f0;
```

Change a value here and it updates everywhere it's used across the site — no need to
hunt through individual component files.

## 7. Notes

- The contact form is frontend-only: it validates input and shows a success state, but
  does not send real emails yet. Wire it up to a backend or a service like Formspree /
  Resend when you're ready.
- A custom cursor is enabled on desktop (pointer devices) and automatically disabled on
  touch devices.
- All animations respect `prefers-reduced-motion`.
