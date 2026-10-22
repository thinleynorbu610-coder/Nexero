// Replace a member's `image` with an imported photo to swap their picture —
// everything else (bio, skills, technologies, responsibilities, social) can be
// edited freely. Every page on the site reads from this single file.
import profileIcon from '../assets/team/profile-icon.png';

// Generic avatar shown until a member has a real photo. Cards and the profile
// page render it centred as a round icon instead of a full-bleed photo.
export const defaultAvatar = profileIcon;

export const team = [
  {
    id: 'thinley-norbu',
    name: 'Thinley Norbu',
    role: 'Full-Stack Developer',
    isLead: false,
    image: defaultAvatar,
    initials: 'TN',
    tagline: 'Builds full web platforms for Bhutan, from wireframe to database.',
    bio: 'Thinley is an Information Technology student focused on full-stack development and human-centered digital products for Bhutan. He designs and builds complete web platforms end to end — from wireframes and UI through to database and backend — and currently leads BhutanCare, a hospital digital platform for appointments and patient services.',
    skills: [
      'UI/UX Design',
      'Full-Stack Development',
      'Team Leadership',
      'Wireframing & Prototyping',
      'Responsive Web Design',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Go', 'PostgreSQL', 'Git & GitHub', 'Docker'],
    responsibilities: [
      'Leading the BhutanCare student team and coordinating delivery',
      'Designing interfaces and owning the front-end build',
      'Building full platforms end to end, from wireframe to database',
      'Planning tasks and features across active projects',
    ],
    projects: ['bhutancare', 'heritage-loom', 'quickbite'],
    social: {
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/in/thinley-norbu',
      email: 'mailto:nthinley817@gmail.com',
    },
  },
  {
    id: 'jamyang-lodey',
    name: 'Jamyang Lodey',
    role: 'Backend Developer',
    isLead: false,
    image: defaultAvatar,
    initials: 'JL',
    tagline: 'Turns complex requirements into dependable backend systems.',
    bio: "Jamyang is a Computer Science student focused on backend development and database design, with an additional background in Commerce that shapes how he approaches practical, business-aware solutions. He's currently building Studify (Project SMARTSTUDY), a gamified study planning platform, and has designed database systems ranging from hospital management to network simulations.",
    skills: [
      'Backend Development',
      'Database Design',
      'System Architecture',
      'Agile Development',
      'Problem Solving',
    ],
    technologies: ['Go', 'JavaScript', 'Python', 'Node.js', 'PostgreSQL', 'MySQL', 'MongoDB', 'Docker'],
    responsibilities: [
      'Developing backend functionality and database architecture',
      'Designing relational and non-relational data models',
      'Implementing gamification and engagement features',
      'Applying Agile practices across the development process',
    ],
    projects: ['smartstudy'],
    social: {
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/',
      email: 'mailto:jamyangdragneel@gmail.com',
    },
  },
  {
    id: 'tshering-tandin-tobden',
    name: 'Tshering Tandin Tobden',
    role: 'Backend Developer',
    isLead: false,
    image: defaultAvatar,
    initials: 'TT',
    tagline: 'Builds the APIs and data layers Nexora’s products run on.',
    bio: 'Tshering Tandin Tobden is a backend developer at Nexora, focused on building reliable APIs, server-side logic, and well-structured databases that keep applications fast and dependable as they grow.',
    skills: [
      'Backend Development',
      'API Design',
      'Database Design',
      'Server-Side Logic',
      'Problem Solving',
    ],
    technologies: ['Go', 'Node.js', 'Python', 'PostgreSQL', 'MySQL', 'Docker', 'Git & GitHub'],
    responsibilities: [
      'Building and maintaining backend services and APIs',
      'Designing and optimising database schemas',
      'Integrating the backend with front-end features',
      'Testing and debugging server-side functionality',
    ],
    projects: [],
    social: {
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/',
      email: 'mailto:tshering@nexora.example',
    },
  },
  {
    id: 'tshewang-dorji',
    name: 'Tshewang Dorji',
    role: 'Team Leader',
    isLead: true,
    image: defaultAvatar,
    initials: 'TD',
    tagline: 'Keeps the team aligned while building intelligent, real-world systems.',
    bio: 'Tshewang is a Computer Science student focused on full-stack and AI-driven development, with a particular interest in robotics and emerging technology. He brings a background in 3D animation and design to technical projects, and recently placed 3rd nationally at the AI4Tarayana Hackathon. He currently leads design and development on Project LHAKGAY and Project RIGPEL.',
    skills: [
      'Full-Stack Development',
      'AI & ML Prototyping',
      'System Architecture',
      'Team Leadership',
      '3D Design & Animation',
    ],
    technologies: ['React', 'Next.js', 'JavaScript', 'Python', 'C++', 'PostgreSQL', 'Flask/Node.js', 'Blender'],
    responsibilities: [
      'Setting technical direction across Nexora’s projects',
      'Designing AI-driven features and system architecture',
      'Coordinating the team from idea to working prototype',
      'Reviewing quality and consistency before delivery',
    ],
    projects: ['lhakgay', 'rigpel'],
    social: {
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/in/tshewang-dorji-2b62a0396',
      email: 'mailto:tdorji997@gmail.com',
    },
  },
  {
    id: 'yeshi-ngedup',
    name: 'Yeshi Ngedup',
    role: 'Cybersecurity Specialist',
    isLead: false,
    image: defaultAvatar,
    initials: 'YN',
    tagline: 'Makes sure what Nexora builds is safe to rely on.',
    bio: 'Yeshi is responsible for keeping Nexora’s applications and infrastructure secure — from assessing risk early in a project to hardening systems before launch. She brings a security-first mindset to every stage of development.',
    skills: [
      'Security Assessment',
      'Network Security',
      'Threat Awareness',
      'Secure Development',
      'Security Best Practices',
    ],
    technologies: ['OWASP', 'Network Security', 'Penetration Testing', 'Linux', 'Python', 'Encryption'],
    responsibilities: [
      'Conducting security assessments on new features',
      'Monitoring for and responding to threats',
      'Guiding secure coding practices across the team',
      'Hardening infrastructure before deployment',
    ],
    projects: [],
    social: {
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/',
      email: 'mailto:yeshi@nexora.example',
    },
  },
];

export const getMemberById = (id) => team.find((member) => member.id === id);
