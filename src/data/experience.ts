import type { Lang } from '../i18n/routes';

export interface Job {
  dates: string;
  role: string;
  organization: string;
  note?: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

export const experience: Record<Lang, Job[]> = {
  en: [
    {
      dates: "Oct 2024 – Present",
      role: "Senior Frontend Engineer",
      organization: "Magnific",
      summary:
        "Build AI-powered video generation experiences that make complex generative models useful and approachable for creative teams.",
      highlights: [
        "Integrate new AI models and translate their capabilities into clear product workflows.",
        "Contribute to a robust frontend architecture focused on performance, reliability, and scale.",
        "Support teams across Magnific's AI Suite with shared frontend patterns and product guidance.",
      ],
      skills: ["React", "TypeScript", "AI products"],
    },
    {
      dates: "Feb 2022 – Sep 2024",
      role: "Frontend Engineer",
      organization: "Job&Talent",
      summary:
        "Built internal tools and web applications that supported the company's operations and growth.",
      highlights: [
        "Developed and maintained an in-house React design system used across product teams.",
        "Contributed tooling and standards to a micro-frontend architecture.",
        "Worked across the frontend ecosystem to improve consistency and developer experience.",
      ],
      skills: ["React", "Design systems", "Micro-frontends"],
    },
    {
      dates: "Feb 2021 – Feb 2022",
      role: "Frontend Engineer",
      organization: "devaway_",
      summary:
        "Delivered MVPs for early-stage companies in fast-paced, international engagements.",
      highlights: [
        "Worked across varied codebases, product domains, and stages of development.",
        "Adapted quickly to new technologies and collaborated closely with distributed teams.",
      ],
      skills: ["Vue.js", "React", "MVPs"],
    },
    {
      dates: "Oct 2018 – Feb 2021",
      role: "Full-stack Engineer",
      organization: "Conwork",
      summary:
        "Developed e-commerce experiences with an emphasis on bespoke interfaces, performance, and discoverability.",
      highlights: [
        "Built frontend applications with Vue.js and Tailwind CSS, balancing visual quality, speed, and SEO.",
        "Created APIs with Lumen and Deno and tested integrations with Postman and Insomnia.",
        "Led the modernization of the company's tooling and mentored teammates on Webpack, PostCSS, Parcel, and GitHub Actions.",
      ],
      skills: ["Vue.js", "Tailwind CSS", "Lumen", "Deno", "SEO"],
    },
    {
      dates: "Oct 2018 – Feb 2021",
      role: "Web Accessibility Consultant",
      organization: "Integratur",
      note: "Concurrent engagement",
      summary:
        "Helped teams identify accessibility barriers and understand how inclusive interfaces can preserve visual and product quality.",
      highlights: [
        "Audited websites against WCAG 2.0 and documented high-impact accessibility issues.",
        "Built Vue.js prototypes to demonstrate practical, compliant alternatives.",
        "Tested accessible component patterns across single-page and multi-page applications, with SEO in mind.",
      ],
      skills: ["Accessibility", "WCAG 2.0", "Vue.js"],
    },
    {
      dates: "Jun 2017 – Feb 2018",
      role: "Junior Web Developer",
      organization: "Datanet Consultores",
      summary:
        "Developed frontend applications with AngularJS, Angular, and Vue.js in a .NET and Microsoft Dynamics environment.",
      highlights: [
        "Created a visual editor for responsive email templates.",
        "Contributed to internal tools and the intranet for cedro.org.",
      ],
      skills: ["AngularJS", "Angular", "Vue.js", ".NET"],
    },
  ],
  es: [
    {
      dates: "Oct 2024 – Actualidad",
      role: "Senior Frontend Engineer",
      organization: "Magnific",
      summary:
        "Construyo experiencias de generación de vídeo con IA que hacen que los modelos generativos complejos resulten útiles y accesibles para equipos creativos.",
      highlights: [
        "Integro nuevos modelos de IA y traduzco sus capacidades en flujos de producto claros.",
        "Contribuyo a una arquitectura frontend robusta centrada en rendimiento, fiabilidad y escala.",
        "Doy soporte a los equipos del AI Suite de Magnific con patrones frontend compartidos y criterio de producto.",
      ],
      skills: ["React", "TypeScript", "Productos IA"],
    },
    {
      dates: "Feb 2022 – Sep 2024",
      role: "Frontend Engineer",
      organization: "Job&Talent",
      summary:
        "Desarrollé herramientas internas y aplicaciones web que apoyaron las operaciones y el crecimiento de la compañía.",
      highlights: [
        "Desarrollé y mantuve un design system interno en React usado por varios equipos de producto.",
        "Aporté tooling y estándares a una arquitectura de micro-frontends.",
        "Trabajé en todo el ecosistema frontend para mejorar la consistencia y la experiencia de desarrollo.",
      ],
      skills: ["React", "Design systems", "Micro-frontends"],
    },
    {
      dates: "Feb 2021 – Feb 2022",
      role: "Frontend Engineer",
      organization: "devaway_",
      summary:
        "Entregué MVPs para empresas en fase inicial en proyectos internacionales de ritmo rápido.",
      highlights: [
        "Trabajé con bases de código, dominios de producto y fases de desarrollo muy variados.",
        "Me adapté rápido a nuevas tecnologías colaborando estrechamente con equipos distribuidos.",
      ],
      skills: ["Vue.js", "React", "MVPs"],
    },
    {
      dates: "Oct 2018 – Feb 2021",
      role: "Full-stack Engineer",
      organization: "Conwork",
      summary:
        "Desarrollé experiencias de e-commerce con énfasis en interfaces a medida, rendimiento y posicionamiento en buscadores.",
      highlights: [
        "Construí aplicaciones frontend con Vue.js y Tailwind CSS, equilibrando calidad visual, velocidad y SEO.",
        "Creé APIs con Lumen y Deno y probé integraciones con Postman e Insomnia.",
        "Lideré la modernización del tooling de la empresa y mentoricé al equipo en Webpack, PostCSS, Parcel y GitHub Actions.",
      ],
      skills: ["Vue.js", "Tailwind CSS", "Lumen", "Deno", "SEO"],
    },
    {
      dates: "Oct 2018 – Feb 2021",
      role: "Consultor de Accesibilidad Web",
      organization: "Integratur",
      note: "Colaboración simultánea",
      summary:
        "Ayudé a distintos equipos a identificar barreras de accesibilidad y a entender cómo las interfaces inclusivas pueden preservar la calidad visual y de producto.",
      highlights: [
        "Audité sitios web según WCAG 2.0 y documenté los problemas de accesibilidad de mayor impacto.",
        "Construí prototipos en Vue.js para demostrar alternativas prácticas y conformes.",
        "Probé patrones de componentes accesibles en aplicaciones SPA y multipágina, sin perder de vista el SEO.",
      ],
      skills: ["Accesibilidad", "WCAG 2.0", "Vue.js"],
    },
    {
      dates: "Jun 2017 – Feb 2018",
      role: "Desarrollador Web Junior",
      organization: "Datanet Consultores",
      summary:
        "Desarrollé aplicaciones frontend con AngularJS, Angular y Vue.js en un entorno .NET y Microsoft Dynamics.",
      highlights: [
        "Creé un editor visual de plantillas de email responsive.",
        "Contribuí a herramientas internas y a la intranet de cedro.org.",
      ],
      skills: ["AngularJS", "Angular", "Vue.js", ".NET"],
    },
  ],
};
