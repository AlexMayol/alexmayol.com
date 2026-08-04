export type Lang = 'en' | 'es';

export const routes = {
  home: { en: '/', es: '/inicio/' },
  projects: { en: '/projects/', es: '/proyectos/' },
  contact: { en: '/contact/', es: '/contacto/' },
  freelancing: { en: '/freelancing/', es: '/freelance/' },
  thoughts: { en: '/thoughts/', es: '/pensamientos/' },
} as const;

export type PageKey = keyof typeof routes;

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'es' : 'en');
