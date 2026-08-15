import type { Lang } from '../i18n/routes';

export interface FreelanceProject {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  site: string;
}

export const freelanceProjects: Record<Lang, FreelanceProject[]> = {
  en: [
    {
      name: 'Cliener',
      tagline: 'Renewable energy company website',
      description:
        'Public website for Cliener, a Spanish renewable-energy company offering solar self-consumption, virtual battery, electric mobility and maintenance services. Built with Astro with a focus on speed, SEO and lead generation, including a solar budget calculator.',
      stack: ['Astro', 'SEO', 'Performance'],
      site: 'https://cliener.com',
    },
    {
      name: 'Bluemation',
      tagline: 'Industrial automation company website',
      description:
        'Corporate website for Bluemation, an industrial automation firm specialized in PLC, SCADA and BMS programming with Siemens, Beckhoff and Rockwell. A bilingual Astro site covering services, sectors, projects and a blog.',
      stack: ['Astro', 'i18n', 'SEO'],
      site: 'https://www.bluemation.com',
    },
  ],
  es: [
    {
      name: 'Cliener',
      tagline: 'Web de empresa de energías renovables',
      description:
        'Sitio web público de Cliener, una empresa española de energías renovables con servicios de autoconsumo solar, batería virtual, movilidad eléctrica y mantenimientos. Construido con Astro con foco en velocidad, SEO y captación de clientes, incluida una calculadora de presupuesto solar.',
      stack: ['Astro', 'SEO', 'Rendimiento'],
      site: 'https://cliener.com',
    },
    {
      name: 'Bluemation',
      tagline: 'Web de empresa de automatización industrial',
      description:
        'Sitio web corporativo de Bluemation, una empresa de automatización industrial especializada en programación PLC, SCADA y BMS con Siemens, Beckhoff y Rockwell. Un sitio bilingüe en Astro con servicios, sectores, proyectos y blog.',
      stack: ['Astro', 'i18n', 'SEO'],
      site: 'https://www.bluemation.com',
    },
  ],
};
