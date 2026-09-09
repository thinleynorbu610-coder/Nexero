// Add a new project by adding another object to this array — Projects.jsx and the
// Home page featured section both read from here automatically.
// `category` must be one of: 'Web', 'Backend', 'Security', 'Systems'
import quickbiteImage from '../assets/projects/quickbite.jpeg';
import smartstudyImage from '../assets/projects/smartstudy.webp';
import heritageLoomImage from '../assets/projects/heritage-loom.jpg';

export const projects = [
  {
    id: 'bhutancare',
    title: 'BhutanCare',
    category: 'Systems',
    status: 'In Development',
    description:
      'A hospital digital platform that makes appointments, patient profiles, and hospital services easier to reach and navigate for patients across Bhutan.',
    problem:
      'Hospital services in Bhutan relied on manual processes for booking, patient records, and queue management, making care harder to access and coordinate.',
    solution:
      'An end-to-end platform covering online appointment booking, patient profiles, doctor and administrator management, lab results, and digital queue management.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'UI/UX Design'],
    role: 'Team lead, interface design, and full-stack development.',
    link: '#',
    featured: true,
  },
  {
    id: 'heritage-loom',
    title: 'Heritage Loom',
    category: 'Web',
    status: 'In Development',
    image: heritageLoomImage,
    description:
      'A digital cultural marketplace connecting Bhutanese artisans directly with customers beyond their physical location.',
    problem:
      'Traditional handicrafts, artwork, Gho, and Kira had little digital visibility, limiting artisan income and reach beyond local markets.',
    solution:
      'An online marketplace giving artisans direct digital storefronts, supporting cultural preservation alongside sustainable artisan income.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'UI/UX Design'],
    role: 'Full-stack development and database design.',
    link: '#',
    featured: true,
  },
  {
    id: 'quickbite',
    title: 'QuickBite',
    category: 'Web',
    status: 'In Development',
    image: quickbiteImage,
    description:
      'A QR-based food ordering system that lets customers scan a code, browse a digital menu, and order without queuing.',
    problem:
      'Small canteens and restaurants relied on manual order-taking, causing long waits and frequent order errors.',
    solution:
      'A QR-driven digital menu and ordering flow that removes manual order-taking and cuts waiting times.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    role: 'Development and system design.',
    link: 'https://quickbite-canten.onrender.com',
    featured: true,
  },
  {
    id: 'smartstudy',
    title: 'SmartStudy',
    category: 'Backend',
    status: 'In Development',
    image: smartstudyImage,
    description:
      'A gamified study planning and task management platform (Studify) helping college students organize their academic workload.',
    problem:
      'Students lacked a structured way to plan study time and stay consistent, often relying on scattered notes and reminders.',
    solution:
      'A platform combining task and study-plan management with gamification features that encourage consistency and follow-through.',
    technologies: ['Node.js', 'PostgreSQL', 'SQL', 'JavaScript'],
    role: 'Backend development and database architecture.',
    link: '#',
    featured: true,
  },
  {
    id: 'lhakgay',
    title: 'Project LHAKGAY',
    category: 'Web',
    status: 'In Development',
    description:
      "An AI personalisation and recommendation engine addressing Bhutan's early-grade reading crisis, built with Mebar Labs.",
    problem:
      'Only 45% of early-grade students in Bhutan meet reading proficiency benchmarks, with a 39-point urban-rural performance gap driven by unreliable rural internet.',
    solution:
      'An AI-driven recommendation engine paired with an offline-first architecture using localised caching, plus a behaviour-driven coin economy and offline-ready audio narration to boost engagement.',
    technologies: ['Python', 'AI/ML Prototyping', 'Offline-First Architecture', 'Blender'],
    role: 'Design and development, including the AI engine and offline system architecture.',
    link: '#',
    featured: true,
  },
  {
    id: 'rigpel',
    title: 'Project RIGPEL',
    category: 'Security',
    status: 'In Development',
    description:
      "A decentralised mobile platform and secure Skill Passport addressing Bhutan's youth unemployment crisis, part of the Kuenchap Ecosystem.",
    problem:
      '79–91% of Bhutanese firms report no links to training providers — a structural mismatch that pushed youth talent drain to 5,000 monthly departures through Paro Airport at its peak.',
    solution:
      'A PostgreSQL-backed matching engine connecting skills to opportunity, a localised Skill-to-Earn micro-internship structure, and a Legal Filter with automated contract generation aligned to the Labour and Employment Act 2007, including guardian consent for minors.',
    technologies: ['PostgreSQL', 'React', 'Node.js', 'Legal Tech'],
    role: 'Design and development, including the matching engine and legal filter feature.',
    link: '#',
    featured: true,
  },
];

export const categories = ['All', 'Web', 'Backend', 'Security', 'Systems'];

export const getProjectById = (id) => projects.find((project) => project.id === id);
