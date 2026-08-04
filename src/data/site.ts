export const SITE = {
  name: 'Alejandro Mayol Carrión',
  displayName: 'Alejandro Mayol',
  role: 'Senior Product Engineer',
  email: 'alexmayolc@gmail.com',
  url: 'https://alexmayol.com',
} as const;

export const SOCIALS = {
  github: 'https://github.com/AlexMayol',
  githubHandle: '@AlexMayol',
  linkedin: 'https://www.linkedin.com/in/alejandro-mayol-carrion/',
} as const;

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  jobTitle: SITE.role,
  email: `mailto:${SITE.email}`,
  url: SITE.url,
  sameAs: [SOCIALS.github, SOCIALS.linkedin],
} as const;
