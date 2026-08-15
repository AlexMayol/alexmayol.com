# Bilingual Site Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the five bilingual pages (home, projects, contact, freelancing, thoughts/blog) with prefix-free ES/EN routing, full SEO plumbing, PWA manifest, metadata images, GSAP animations, and an AI post-writing skill.

**Architecture:** Static Astro 7 site. Every page is two thin `.astro` wrappers (English + Spanish slug) around one shared component taking a `lang` prop. A route table in `src/i18n/routes.ts` is the single source of truth for URLs, hreflang, and the language toggle. Blog posts live in a content collection split by `en/`/`es/` folders, paired by `translationKey`.

**Tech Stack:** Astro 7, Tailwind 4 (`@tailwindcss/vite`), GSAP + ScrollTrigger, `@astrojs/sitemap`, `@fontsource-variable/fraunces`, sharp (asset generation only).

**Spec:** `docs/superpowers/specs/2026-08-04-site-pages-design.md`

## Global Constraints

- Site URL: `https://alexmayol.com` (already in `astro.config.mjs` as `site`). Deployed to GitHub Pages (workflow exists; don't touch it).
- Node >= 22.12.0. Astro `^7.1.6`, Tailwind `^4.3.3` already installed.
- URLs never use `/en/` or `/es/` prefixes. English routes: `/`, `/projects/`, `/contact/`, `/freelancing/`, `/thoughts/`. Spanish: `/inicio/`, `/proyectos/`, `/contacto/`, `/freelance/`, `/pensamientos/`.
- English is primary: `x-default` hreflang always points at the English URL.
- Palette (exact values): paper `#FAF8F5`, ink `#1C1B1A`, accent `#C2410C`. Light mode only.
- No React, Svelte, or Three.js. Client JS is plain TS/JS + GSAP only, and GSAP loads only on pages that animate.
- All motion is skipped when `prefers-reduced-motion: reduce`.
- Allowed new dependencies — runtime: `gsap`, `@fontsource-variable/fraunces`, `@astrojs/sitemap`; dev: `sharp`, `png-to-ico`, `@astrojs/check`, `typescript`, `@tailwindcss/typography`. Nothing else.
- All user-facing copy exists in both languages. Identity constants: name "Alejandro Mayol Carrión" (display name "Alejandro Mayol"), role "Senior Product Engineer", email `alexmayolc@gmail.com`, GitHub `https://github.com/AlexMayol`, LinkedIn `https://www.linkedin.com/in/alejandro-mayol-carrion/`.
- Commit after every task. No task is done until `npm run build` succeeds.

---

### Task 1: Dependencies, config, and dev-server sanity

**Files:**
- Modify: `astro.config.mjs`
- Modify: `package.json` (via npm install)

**Interfaces:**
- Produces: `sitemap()` integration active; all packages later tasks import.

- [ ] **Step 1: Install dependencies**

```bash
npm install gsap @fontsource-variable/fraunces @astrojs/sitemap
npm install -D sharp png-to-ico @astrojs/check typescript @tailwindcss/typography
```

- [ ] **Step 2: Register the sitemap integration**

Replace `astro.config.mjs` content with:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alexmayol.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
```

- [ ] **Step 3: Verify build + sitemap output**

Run: `npm run build && ls dist/sitemap-index.xml`
Expected: build succeeds; `dist/sitemap-index.xml` exists.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json astro.config.mjs
git commit -m "feat: add sitemap, gsap, fonts, and asset tooling deps"
```

---

### Task 2: i18n core — route table, UI strings, site constants

**Files:**
- Create: `src/i18n/routes.ts`
- Create: `src/i18n/ui.ts`
- Create: `src/data/site.ts`

**Interfaces:**
- Produces: `routes` (Record<PageKey, {en, es}>), `type Lang = 'en' | 'es'`, `type PageKey`, `otherLang(lang)`; `ui[lang]` dictionary with `nav`, `meta`, and per-page strings; `SITE`, `SOCIALS`, `personJsonLd` from `src/data/site.ts`.

- [ ] **Step 1: Create `src/i18n/routes.ts`**

```ts
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
```

- [ ] **Step 2: Create `src/data/site.ts`**

```ts
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
```

- [ ] **Step 3: Create `src/i18n/ui.ts`**

```ts
export const ui = {
  en: {
    nav: {
      projects: 'Projects',
      contact: 'Contact',
      freelancing: 'Freelancing',
      thoughts: 'Thoughts',
    },
    meta: {
      home: {
        title: 'Alejandro Mayol — Senior Product Engineer',
        description:
          'Senior Product Engineer focused on accessible product experiences, design systems, and scalable frontend architectures.',
      },
      projects: {
        title: 'Projects — Alejandro Mayol',
        description:
          'Nine years of frontend work across Magnific, Job&Talent, devaway_, Conwork, Integratur and Datanet Consultores.',
      },
      contact: {
        title: 'Contact — Alejandro Mayol',
        description: 'Get in touch through GitHub, LinkedIn or email.',
      },
      freelancing: {
        title: 'Freelancing — Alejandro Mayol',
        description:
          'Freelance web projects: Cliener (renewable energy) and Bluemation (industrial automation).',
      },
      thoughts: {
        title: 'Thoughts — Alejandro Mayol',
        description: 'Writing on frontend engineering, experiences and learnings.',
      },
    },
    home: { tagline: 'Senior Product Engineer' },
    projects: {
      heading: 'Work',
      intro:
        'Nine years building for the web across product companies, agencies and consultancies.',
    },
    contact: {
      heading: "Let's talk.",
      intro: 'Find me on any of these',
      github: 'Code, experiments and open source.',
      linkedin: 'Career, experience and professional chat.',
      email: 'The direct line.',
    },
    freelancing: {
      heading: 'Freelancing',
      intro:
        'Websites I design, build and ship end-to-end for real businesses.',
      visit: 'Visit site',
      code: 'Source code',
      ctaQuestion: 'Have a project in mind?',
      cta: 'Work with me',
    },
    thoughts: {
      heading: 'Thoughts',
      intro: 'Writing on frontend engineering, experiences and learnings.',
      empty: 'Nothing here yet.',
    },
  },
  es: {
    nav: {
      projects: 'Proyectos',
      contact: 'Contacto',
      freelancing: 'Freelance',
      thoughts: 'Pensamientos',
    },
    meta: {
      home: {
        title: 'Alejandro Mayol — Senior Product Engineer',
        description:
          'Senior Product Engineer centrado en experiencias de producto accesibles, design systems y arquitecturas frontend escalables.',
      },
      projects: {
        title: 'Proyectos — Alejandro Mayol',
        description:
          'Nueve años de trabajo frontend en Magnific, Job&Talent, devaway_, Conwork, Integratur y Datanet Consultores.',
      },
      contact: {
        title: 'Contacto — Alejandro Mayol',
        description: 'Contacta conmigo por GitHub, LinkedIn o email.',
      },
      freelancing: {
        title: 'Freelance — Alejandro Mayol',
        description:
          'Proyectos freelance: Cliener (energías renovables) y Bluemation (automatización industrial).',
      },
      thoughts: {
        title: 'Pensamientos — Alejandro Mayol',
        description:
          'Escritos sobre ingeniería frontend, experiencias y aprendizajes.',
      },
    },
    home: { tagline: 'Senior Product Engineer' },
    projects: {
      heading: 'Trabajo',
      intro:
        'Nueve años construyendo para la web en empresas de producto, agencias y consultoras.',
    },
    contact: {
      heading: 'Hablemos.',
      intro: 'Encuéntrame en cualquiera de estos sitios.',
      github: 'Código, experimentos y open source.',
      linkedin: 'Trayectoria, experiencia y charla profesional.',
      email: 'La línea directa.',
    },
    freelancing: {
      heading: 'Freelance',
      intro: 'Webs que diseño, construyo y publico de principio a fin para negocios reales.',
      visit: 'Visitar web',
      code: 'Código fuente',
      ctaQuestion: '¿Tienes un proyecto en mente?',
      cta: 'Trabajemos juntos',
    },
    thoughts: {
      heading: 'Pensamientos',
      intro: 'Escritos sobre ingeniería frontend, experiencias y aprendizajes.',
      empty: 'Aún no hay nada por aquí.',
    },
  },
} as const;
```

- [ ] **Step 4: Verify it typechecks**

Run: `npx astro check`
Expected: 0 errors (warnings about unused files are fine).

- [ ] **Step 5: Commit**

```bash
git add src/i18n src/data/site.ts
git commit -m "feat: add i18n route table, UI dictionaries, site constants"
```

---

### Task 3: Branding assets — icons, OG image, manifest, robots.txt

**Files:**
- Create: `scripts/generate-assets.mjs`
- Create: `public/manifest.webmanifest`
- Create: `public/robots.txt`
- Create (generated): `public/og.png`, `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png`

**Interfaces:**
- Produces: static files under `public/` that Task 4's layout references by absolute path (`/og.png`, `/favicon.svg`, `/favicon.ico`, `/apple-touch-icon.png`, `/manifest.webmanifest`).

- [ ] **Step 1: Create `scripts/generate-assets.mjs`**

```js
// One-shot generator for favicon/OG/PWA images. Outputs are committed;
// re-run only when the branding changes: node scripts/generate-assets.mjs
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFile } from 'node:fs/promises';

const paper = '#FAF8F5';
const ink = '#1C1B1A';
const accent = '#C2410C';

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="${accent}"/>
  <text x="50" y="67" font-family="Georgia, serif" font-size="44" font-weight="bold" fill="${paper}" text-anchor="middle">AM</text>
</svg>`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${paper}"/>
  <rect width="20" height="630" fill="${accent}"/>
  <text x="96" y="310" font-family="Georgia, serif" font-size="84" font-weight="bold" fill="${ink}">Alejandro Mayol</text>
  <text x="96" y="390" font-family="Helvetica, Arial, sans-serif" font-size="40" fill="${accent}">Senior Product Engineer</text>
  <text x="96" y="546" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${ink}" opacity="0.55">alexmayol.com</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile('public/og.png');
await writeFile('public/favicon.svg', iconSvg);

for (const [file, size] of [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
]) {
  await sharp(Buffer.from(iconSvg), { density: 300 }).resize(size, size).png().toFile(`public/${file}`);
}

const png32 = await sharp(Buffer.from(iconSvg), { density: 300 }).resize(32, 32).png().toBuffer();
await writeFile('public/favicon.ico', await pngToIco([png32]));

console.log('assets written to public/');
```

- [ ] **Step 2: Run it and eyeball the output**

Run: `node scripts/generate-assets.mjs && ls -la public/*.png public/favicon.* `
Expected: og.png, icon-192.png, icon-512.png, apple-touch-icon.png, favicon.svg, favicon.ico all exist and are non-empty. Open `public/og.png` (Read tool renders it) and confirm the name and role are legible on the card.

- [ ] **Step 3: Create `public/manifest.webmanifest`**

```json
{
  "name": "Alejandro Mayol",
  "short_name": "alexmayol",
  "description": "Personal website of Alejandro Mayol, Senior Product Engineer.",
  "start_url": "/",
  "display": "minimal-ui",
  "background_color": "#FAF8F5",
  "theme_color": "#FAF8F5",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

- [ ] **Step 4: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://alexmayol.com/sitemap-index.xml
```

- [ ] **Step 5: Verify build copies everything**

Run: `npm run build && ls dist/og.png dist/manifest.webmanifest dist/robots.txt dist/icon-512.png`
Expected: all four paths listed.

- [ ] **Step 6: Commit**

```bash
git add scripts/generate-assets.mjs public
git commit -m "feat: add branding assets, PWA manifest, robots.txt"
```

---

### Task 4: Base layout, SEO head, header, theme — and bilingual home

**Files:**
- Create: `src/layouts/Base.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/pages/HomePage.astro`
- Modify: `src/styles/global.css`
- Modify: `src/pages/index.astro` (replace placeholder)
- Create: `src/pages/inicio.astro`

**Interfaces:**
- Consumes: `routes`, `otherLang`, `Lang` from `src/i18n/routes`; `ui` from `src/i18n/ui`; `SITE`, `personJsonLd` from `src/data/site`.
- Produces: `Base.astro` with props `{ lang: Lang; title: string; description: string; alternate: { en: string; es: string }; ogType?: string; jsonLd?: Record<string, unknown> }`. Every later page renders inside it. `alternate` holds root-relative paths for BOTH languages of the current page; Base derives canonical, hreflang, og:url and the header's language toggle from it.

- [ ] **Step 1: Replace `src/styles/global.css`**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-paper: #FAF8F5;
  --color-ink: #1C1B1A;
  --color-accent: #C2410C;
  --font-display: "Fraunces Variable", ui-serif, Georgia, serif;
}
```

- [ ] **Step 2: Create `src/components/Header.astro`**

Note: the header is deliberately NOT `transition:persist` — the language toggle href changes per page, and a persisted header would keep the previous page's toggle URL.

```astro
---
import { routes, otherLang, type Lang } from '../i18n/routes';
import { ui } from '../i18n/ui';
import { SITE } from '../data/site';

interface Props {
  lang: Lang;
  alternate: { en: string; es: string };
}

const { lang, alternate } = Astro.props;
const t = ui[lang].nav;
const other = otherLang(lang);
---

<header class="sticky top-0 z-10 border-b border-ink/10 bg-paper/90 backdrop-blur">
  <nav class="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-4" aria-label="Main">
    <a href={routes.home[lang]} class="font-display text-lg font-semibold">{SITE.displayName}</a>
    <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      <a href={routes.projects[lang]} class="hover:text-accent">{t.projects}</a>
      <a href={routes.freelancing[lang]} class="hover:text-accent">{t.freelancing}</a>
      <a href={routes.thoughts[lang]} class="hover:text-accent">{t.thoughts}</a>
      <a href={routes.contact[lang]} class="hover:text-accent">{t.contact}</a>
      <a
        href={alternate[other]}
        class="rounded border border-ink/20 px-2 py-1 text-xs font-semibold uppercase tracking-wide hover:border-accent hover:text-accent"
        aria-label={other === 'es' ? 'Ver esta página en español' : 'View this page in English'}
      >{other}</a>
    </div>
  </nav>
</header>
```

- [ ] **Step 3: Create `src/layouts/Base.astro`**

```astro
---
import '@fontsource-variable/fraunces';
import '../styles/global.css';
import { ClientRouter } from 'astro:transitions';
import Header from '../components/Header.astro';
import { SITE } from '../data/site';
import type { Lang } from '../i18n/routes';

interface Props {
  lang: Lang;
  title: string;
  description: string;
  alternate: { en: string; es: string };
  ogType?: string;
  jsonLd?: Record<string, unknown>;
}

const { lang, title, description, alternate, ogType = 'website', jsonLd } = Astro.props;
const abs = (path: string) => new URL(path, Astro.site).href;
---

<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={abs(alternate[lang])} />
    <link rel="alternate" hreflang="en" href={abs(alternate.en)} />
    <link rel="alternate" hreflang="es" href={abs(alternate.es)} />
    <link rel="alternate" hreflang="x-default" href={abs(alternate.en)} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={ogType} />
    <meta property="og:url" content={abs(alternate[lang])} />
    <meta property="og:image" content={abs('/og.png')} />
    <meta property="og:site_name" content={SITE.displayName} />
    <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'es_ES'} />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <meta name="theme-color" content="#FAF8F5" />
    {jsonLd && <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />}
    <ClientRouter />
  </head>
  <body class="min-h-dvh bg-paper font-sans text-ink antialiased">
    <Header lang={lang} alternate={alternate} />
    <main><slot /></main>
    <footer class="mx-auto max-w-3xl px-6 py-12 text-sm text-ink/50">
      © {new Date().getFullYear()} {SITE.name}
    </footer>
  </body>
</html>
```

- [ ] **Step 4: Create `src/components/pages/HomePage.astro`**

Home stays intentionally minimal (future iteration) — name + role only.

```astro
---
import Base from '../../layouts/Base.astro';
import { routes, type Lang } from '../../i18n/routes';
import { ui } from '../../i18n/ui';
import { SITE, personJsonLd } from '../../data/site';

interface Props {
  lang: Lang;
}

const { lang } = Astro.props;
const t = ui[lang];
---

<Base
  lang={lang}
  title={t.meta.home.title}
  description={t.meta.home.description}
  alternate={routes.home}
  jsonLd={personJsonLd}
>
  <section class="mx-auto grid min-h-[70dvh] max-w-3xl place-content-center px-6 text-center">
    <h1 class="font-display text-5xl font-semibold tracking-tight sm:text-6xl">{SITE.displayName}</h1>
    <p class="mt-4 text-lg text-accent">{t.home.tagline}</p>
  </section>
</Base>
```

- [ ] **Step 5: Replace `src/pages/index.astro` and create `src/pages/inicio.astro`**

`src/pages/index.astro`:

```astro
---
import HomePage from '../components/pages/HomePage.astro';
---

<HomePage lang="en" />
```

`src/pages/inicio.astro`:

```astro
---
import HomePage from '../components/pages/HomePage.astro';
---

<HomePage lang="es" />
```

- [ ] **Step 6: Verify SEO output in dist**

Run:

```bash
npm run build \
  && grep -o 'hreflang="es" href="https://alexmayol.com/inicio/"' dist/index.html \
  && grep -o 'rel="canonical" href="https://alexmayol.com/"' dist/index.html \
  && grep -o '<html lang="es"' dist/inicio/index.html \
  && grep -o 'rel="manifest"' dist/index.html \
  && grep -o 'application/ld+json' dist/index.html
```

Expected: all five greps print a match.

- [ ] **Step 7: Commit**

```bash
git add src/styles/global.css src/layouts src/components src/pages/index.astro src/pages/inicio.astro
git commit -m "feat: add base layout with SEO head, header with language toggle, bilingual home"
```

---

### Task 5: Motion module (GSAP)

**Files:**
- Create: `src/scripts/motion.ts`

**Interfaces:**
- Produces: `initScrollReveal()` (animates `[data-reveal]` elements on scroll), `initTilt()` (pointer 3D tilt on `[data-tilt]`), `initFloat()` (idle floating loop on `[data-float]`), `initStagger()` (entrance stagger on `[data-stagger] > *`). All are no-ops under reduced motion. Pages import these inside a `<script>` and call them from an `astro:page-load` listener guarded by a selector check.

- [ ] **Step 1: Create `src/scripts/motion.ts`**

```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Stale triggers reference the outgoing page's DOM; kill them before swap.
document.addEventListener('astro:before-swap', () => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
});

const reduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initScrollReveal() {
  if (reduced()) return;
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

export function initStagger() {
  if (reduced()) return;
  document.querySelectorAll('[data-stagger]').forEach((group) => {
    gsap.from(group.children, {
      y: 32,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.12,
    });
  });
}

export function initFloat() {
  if (reduced()) return;
  document.querySelectorAll('[data-float]').forEach((el, i) => {
    gsap.to(el, {
      y: i % 2 === 0 ? -14 : 14,
      rotation: i % 2 === 0 ? 4 : -4,
      duration: 2.6 + i * 0.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  });
}

export function initTilt() {
  if (reduced()) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) translateZ(4px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}
```

- [ ] **Step 2: Verify it typechecks**

Run: `npx astro check`
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/scripts/motion.ts
git commit -m "feat: add GSAP motion module (reveal, stagger, float, tilt)"
```

---

### Task 6: Projects page

**Files:**
- Create: `src/data/experience.ts`
- Create: `src/components/pages/ProjectsPage.astro`
- Create: `src/pages/projects.astro`
- Create: `src/pages/proyectos.astro`

**Interfaces:**
- Consumes: `Base.astro`, `routes`, `ui`, `initScrollReveal` from `src/scripts/motion`.
- Produces: `experience: Record<Lang, Job[]>` where `Job = { dates, role, organization, note?, summary, highlights: string[], skills: string[] }`.

- [ ] **Step 1: Create `src/data/experience.ts`**

```ts
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
      dates: 'Oct 2024 – Present',
      role: 'Senior Frontend Engineer',
      organization: 'Magnific',
      summary:
        'Build AI-powered video generation experiences that make complex generative models useful and approachable for creative teams.',
      highlights: [
        'Integrate new AI models and translate their capabilities into clear product workflows.',
        'Contribute to a robust frontend architecture focused on performance, reliability, and scale.',
        'Support teams across Magnific’s AI Suite with shared frontend patterns and product guidance.',
      ],
      skills: ['React', 'TypeScript', 'AI products'],
    },
    {
      dates: 'Feb 2022 – Sep 2024',
      role: 'Frontend Engineer',
      organization: 'Job&Talent',
      summary:
        'Built internal tools and web applications that supported the company’s operations and growth.',
      highlights: [
        'Developed and maintained an in-house React design system used across product teams.',
        'Contributed tooling and standards to a micro-frontend architecture.',
        'Worked across the frontend ecosystem to improve consistency and developer experience.',
      ],
      skills: ['React', 'Design systems', 'Micro-frontends'],
    },
    {
      dates: 'Feb 2021 – Feb 2022',
      role: 'Frontend Engineer',
      organization: 'devaway_',
      summary:
        'Delivered MVPs for early-stage companies in fast-paced, international engagements.',
      highlights: [
        'Worked across varied codebases, product domains, and stages of development.',
        'Adapted quickly to new technologies and collaborated closely with distributed teams.',
      ],
      skills: ['Vue.js', 'React', 'MVPs'],
    },
    {
      dates: 'Oct 2018 – Feb 2021',
      role: 'Full-stack Engineer',
      organization: 'Conwork',
      summary:
        'Developed e-commerce experiences with an emphasis on bespoke interfaces, performance, and discoverability.',
      highlights: [
        'Built frontend applications with Vue.js and Tailwind CSS, balancing visual quality, speed, and SEO.',
        'Created APIs with Lumen and Deno and tested integrations with Postman and Insomnia.',
        'Led the modernization of the company’s tooling and mentored teammates on Webpack, PostCSS, Parcel, and GitHub Actions.',
      ],
      skills: ['Vue.js', 'Tailwind CSS', 'Lumen', 'Deno', 'SEO'],
    },
    {
      dates: 'Oct 2018 – Feb 2021',
      role: 'Web Accessibility Consultant',
      organization: 'Integratur',
      note: 'Concurrent engagement',
      summary:
        'Helped teams identify accessibility barriers and understand how inclusive interfaces can preserve visual and product quality.',
      highlights: [
        'Audited websites against WCAG 2.0 and documented high-impact accessibility issues.',
        'Built Vue.js prototypes to demonstrate practical, compliant alternatives.',
        'Tested accessible component patterns across single-page and multi-page applications, with SEO in mind.',
      ],
      skills: ['Accessibility', 'WCAG 2.0', 'Vue.js'],
    },
    {
      dates: 'Jun 2017 – Feb 2018',
      role: 'Junior Web Developer',
      organization: 'Datanet Consultores',
      summary:
        'Developed frontend applications with AngularJS, Angular, and Vue.js in a .NET and Microsoft Dynamics environment.',
      highlights: [
        'Created a visual editor for responsive email templates.',
        'Contributed to internal tools and the intranet for cedro.org.',
      ],
      skills: ['AngularJS', 'Angular', 'Vue.js', '.NET'],
    },
  ],
  es: [
    {
      dates: 'Oct 2024 – Actualidad',
      role: 'Senior Frontend Engineer',
      organization: 'Magnific',
      summary:
        'Construyo experiencias de generación de vídeo con IA que hacen que los modelos generativos complejos resulten útiles y accesibles para equipos creativos.',
      highlights: [
        'Integro nuevos modelos de IA y traduzco sus capacidades en flujos de producto claros.',
        'Contribuyo a una arquitectura frontend robusta centrada en rendimiento, fiabilidad y escala.',
        'Doy soporte a los equipos del AI Suite de Magnific con patrones frontend compartidos y criterio de producto.',
      ],
      skills: ['React', 'TypeScript', 'Productos IA'],
    },
    {
      dates: 'Feb 2022 – Sep 2024',
      role: 'Frontend Engineer',
      organization: 'Job&Talent',
      summary:
        'Desarrollé herramientas internas y aplicaciones web que apoyaron las operaciones y el crecimiento de la compañía.',
      highlights: [
        'Desarrollé y mantuve un design system interno en React usado por varios equipos de producto.',
        'Aporté tooling y estándares a una arquitectura de micro-frontends.',
        'Trabajé en todo el ecosistema frontend para mejorar la consistencia y la experiencia de desarrollo.',
      ],
      skills: ['React', 'Design systems', 'Micro-frontends'],
    },
    {
      dates: 'Feb 2021 – Feb 2022',
      role: 'Frontend Engineer',
      organization: 'devaway_',
      summary:
        'Entregué MVPs para empresas en fase inicial en proyectos internacionales de ritmo rápido.',
      highlights: [
        'Trabajé con bases de código, dominios de producto y fases de desarrollo muy variados.',
        'Me adapté rápido a nuevas tecnologías colaborando estrechamente con equipos distribuidos.',
      ],
      skills: ['Vue.js', 'React', 'MVPs'],
    },
    {
      dates: 'Oct 2018 – Feb 2021',
      role: 'Full-stack Engineer',
      organization: 'Conwork',
      summary:
        'Desarrollé experiencias de e-commerce con énfasis en interfaces a medida, rendimiento y posicionamiento en buscadores.',
      highlights: [
        'Construí aplicaciones frontend con Vue.js y Tailwind CSS, equilibrando calidad visual, velocidad y SEO.',
        'Creé APIs con Lumen y Deno y probé integraciones con Postman e Insomnia.',
        'Lideré la modernización del tooling de la empresa y mentoricé al equipo en Webpack, PostCSS, Parcel y GitHub Actions.',
      ],
      skills: ['Vue.js', 'Tailwind CSS', 'Lumen', 'Deno', 'SEO'],
    },
    {
      dates: 'Oct 2018 – Feb 2021',
      role: 'Consultor de Accesibilidad Web',
      organization: 'Integratur',
      note: 'Colaboración simultánea',
      summary:
        'Ayudé a distintos equipos a identificar barreras de accesibilidad y a entender cómo las interfaces inclusivas pueden preservar la calidad visual y de producto.',
      highlights: [
        'Audité sitios web según WCAG 2.0 y documenté los problemas de accesibilidad de mayor impacto.',
        'Construí prototipos en Vue.js para demostrar alternativas prácticas y conformes.',
        'Probé patrones de componentes accesibles en aplicaciones SPA y multipágina, sin perder de vista el SEO.',
      ],
      skills: ['Accesibilidad', 'WCAG 2.0', 'Vue.js'],
    },
    {
      dates: 'Jun 2017 – Feb 2018',
      role: 'Desarrollador Web Junior',
      organization: 'Datanet Consultores',
      summary:
        'Desarrollé aplicaciones frontend con AngularJS, Angular y Vue.js en un entorno .NET y Microsoft Dynamics.',
      highlights: [
        'Creé un editor visual de plantillas de email responsive.',
        'Contribuí a herramientas internas y a la intranet de cedro.org.',
      ],
      skills: ['AngularJS', 'Angular', 'Vue.js', '.NET'],
    },
  ],
};
```

- [ ] **Step 2: Create `src/components/pages/ProjectsPage.astro`**

```astro
---
import Base from '../../layouts/Base.astro';
import { routes, type Lang } from '../../i18n/routes';
import { ui } from '../../i18n/ui';
import { experience } from '../../data/experience';

interface Props {
  lang: Lang;
}

const { lang } = Astro.props;
const t = ui[lang];
const jobs = experience[lang];
---

<Base
  lang={lang}
  title={t.meta.projects.title}
  description={t.meta.projects.description}
  alternate={routes.projects}
>
  <section class="mx-auto max-w-3xl px-6 py-16">
    <h1 class="font-display text-5xl font-semibold tracking-tight">{t.projects.heading}</h1>
    <p class="mt-4 max-w-xl text-lg text-ink/70">{t.projects.intro}</p>
    <ol class="mt-16 space-y-16 border-l border-ink/10 pl-8">
      {jobs.map((job) => (
        <li data-reveal class="relative">
          <span class="absolute top-2 -left-[2.45rem] size-3 rounded-full bg-accent" aria-hidden="true"></span>
          <p class="text-sm tracking-wide text-ink/50 uppercase">
            {job.dates}{job.note && ` · ${job.note}`}
          </p>
          <h2 class="mt-1 font-display text-2xl font-semibold">
            {job.role} · {job.organization}
          </h2>
          <p class="mt-2 text-ink/80">{job.summary}</p>
          <ul class="mt-3 list-disc space-y-1 pl-5 text-ink/70">
            {job.highlights.map((h) => (
              <li>{h}</li>
            ))}
          </ul>
          <ul class="mt-4 flex flex-wrap gap-2">
            {job.skills.map((s) => (
              <li class="rounded-full border border-ink/15 px-3 py-0.5 text-xs text-ink/60">{s}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  </section>
</Base>

<script>
  import { initScrollReveal } from '../../scripts/motion';

  document.addEventListener('astro:page-load', () => {
    if (document.querySelector('[data-reveal]')) initScrollReveal();
  });
</script>
```

- [ ] **Step 3: Create the twin route wrappers**

`src/pages/projects.astro`:

```astro
---
import ProjectsPage from '../components/pages/ProjectsPage.astro';
---

<ProjectsPage lang="en" />
```

`src/pages/proyectos.astro`:

```astro
---
import ProjectsPage from '../components/pages/ProjectsPage.astro';
---

<ProjectsPage lang="es" />
```

- [ ] **Step 4: Verify build output**

Run:

```bash
npm run build \
  && grep -o 'Magnific' dist/projects/index.html | head -1 \
  && grep -o 'Colaboración simultánea' dist/proyectos/index.html \
  && grep -o 'hreflang="en" href="https://alexmayol.com/projects/"' dist/proyectos/index.html
```

Expected: `Magnific`, `Colaboración simultánea`, and the hreflang line all print.

- [ ] **Step 5: Commit**

```bash
git add src/data/experience.ts src/components/pages/ProjectsPage.astro src/pages/projects.astro src/pages/proyectos.astro
git commit -m "feat: add bilingual projects page with scroll reveal"
```

---

### Task 7: Contact page

**Files:**
- Create: `src/components/pages/ContactPage.astro`
- Create: `src/pages/contact.astro`
- Create: `src/pages/contacto.astro`

**Interfaces:**
- Consumes: `Base.astro`, `routes`, `ui`, `SITE`, `SOCIALS`, `personJsonLd`, and `initTilt`/`initFloat`/`initStagger` from `src/scripts/motion`.

- [ ] **Step 1: Create `src/components/pages/ContactPage.astro`**

```astro
---
import Base from '../../layouts/Base.astro';
import { routes, type Lang } from '../../i18n/routes';
import { ui } from '../../i18n/ui';
import { SITE, SOCIALS, personJsonLd } from '../../data/site';

interface Props {
  lang: Lang;
}

const { lang } = Astro.props;
const t = ui[lang];

const cards = [
  {
    label: 'GitHub',
    handle: SOCIALS.githubHandle,
    href: SOCIALS.github,
    blurb: t.contact.github,
  },
  {
    label: 'LinkedIn',
    handle: SITE.name,
    href: SOCIALS.linkedin,
    blurb: t.contact.linkedin,
  },
  {
    label: 'Email',
    handle: SITE.email,
    href: `mailto:${SITE.email}`,
    blurb: t.contact.email,
  },
];
---

<Base
  lang={lang}
  title={t.meta.contact.title}
  description={t.meta.contact.description}
  alternate={routes.contact}
  jsonLd={personJsonLd}
>
  <section class="relative mx-auto max-w-3xl overflow-x-clip px-6 py-16">
    <div
      data-float
      class="absolute top-10 -right-8 size-28 rounded-3xl bg-accent/10"
      aria-hidden="true"
    >
    </div>
    <div
      data-float
      class="absolute top-64 -left-12 size-20 rounded-full border-2 border-accent/20"
      aria-hidden="true"
    >
    </div>
    <div
      data-float
      class="absolute bottom-8 right-16 size-12 rotate-12 rounded-xl bg-ink/5"
      aria-hidden="true"
    >
    </div>

    <h1 class="font-display text-5xl font-semibold tracking-tight">{t.contact.heading}</h1>
    <p class="mt-4 max-w-xl text-lg text-ink/70">{t.contact.intro}</p>

    <div data-stagger class="mt-14 grid gap-6 sm:grid-cols-3" style="perspective: 1200px">
      {cards.map((card) => (
        <a
          data-tilt
          href={card.href}
          rel={card.href.startsWith('http') ? 'me noopener' : undefined}
          class="group block rounded-2xl border border-ink/10 bg-white/60 p-6 shadow-sm transition-shadow duration-200 will-change-transform hover:shadow-lg"
        >
          <p class="text-sm tracking-wide text-ink/50 uppercase">{card.label}</p>
          <p class="mt-2 font-display text-xl font-semibold break-words group-hover:text-accent">
            {card.handle}
          </p>
          <p class="mt-3 text-sm text-ink/60">{card.blurb}</p>
        </a>
      ))}
    </div>
  </section>
</Base>

<script>
  import { initTilt, initFloat, initStagger } from '../../scripts/motion';

  document.addEventListener('astro:page-load', () => {
    if (!document.querySelector('[data-tilt]')) return;
    initStagger();
    initFloat();
    initTilt();
  });
</script>
```

- [ ] **Step 2: Create the twin route wrappers**

`src/pages/contact.astro`:

```astro
---
import ContactPage from '../components/pages/ContactPage.astro';
---

<ContactPage lang="en" />
```

`src/pages/contacto.astro`:

```astro
---
import ContactPage from '../components/pages/ContactPage.astro';
---

<ContactPage lang="es" />
```

- [ ] **Step 3: Verify build output**

Run:

```bash
npm run build \
  && grep -o 'github.com/AlexMayol' dist/contact/index.html | head -1 \
  && grep -o 'mailto:alexmayolc@gmail.com' dist/contacto/index.html | head -1 \
  && grep -o 'Hablemos.' dist/contacto/index.html | head -1
```

Expected: all three greps print a match.

- [ ] **Step 4: Commit**

```bash
git add src/components/pages/ContactPage.astro src/pages/contact.astro src/pages/contacto.astro
git commit -m "feat: add bilingual contact page with 3D tilt cards and floating shapes"
```

---

### Task 8: Freelancing page

**Files:**
- Create: `src/data/freelance.ts`
- Create: `src/components/pages/FreelancingPage.astro`
- Create: `src/pages/freelancing.astro`
- Create: `src/pages/freelance.astro`

**Interfaces:**
- Consumes: `Base.astro`, `routes`, `ui`, `initScrollReveal` from motion.
- Produces: `freelanceProjects: Record<Lang, FreelanceProject[]>` where `FreelanceProject = { name, tagline, description, stack: string[], site: string, repo: string }`.

- [ ] **Step 1: Create `src/data/freelance.ts`**

```ts
import type { Lang } from '../i18n/routes';

export interface FreelanceProject {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  site: string;
  repo: string;
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
      repo: 'https://github.com/AlexMayol/cliener',
    },
    {
      name: 'Bluemation',
      tagline: 'Industrial automation company website',
      description:
        'Corporate website for Bluemation, an industrial automation firm specialized in PLC, SCADA and BMS programming with Siemens, Beckhoff and Rockwell. A bilingual Astro site covering services, sectors, projects and a blog.',
      stack: ['Astro', 'i18n', 'SEO'],
      site: 'https://www.bluemation.com',
      repo: 'https://github.com/AlexMayol/bluemation',
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
      repo: 'https://github.com/AlexMayol/cliener',
    },
    {
      name: 'Bluemation',
      tagline: 'Web de empresa de automatización industrial',
      description:
        'Sitio web corporativo de Bluemation, una empresa de automatización industrial especializada en programación PLC, SCADA y BMS con Siemens, Beckhoff y Rockwell. Un sitio bilingüe en Astro con servicios, sectores, proyectos y blog.',
      stack: ['Astro', 'i18n', 'SEO'],
      site: 'https://www.bluemation.com',
      repo: 'https://github.com/AlexMayol/bluemation',
    },
  ],
};
```

- [ ] **Step 2: Create `src/components/pages/FreelancingPage.astro`**

```astro
---
import Base from '../../layouts/Base.astro';
import { routes, type Lang } from '../../i18n/routes';
import { ui } from '../../i18n/ui';
import { freelanceProjects } from '../../data/freelance';

interface Props {
  lang: Lang;
}

const { lang } = Astro.props;
const t = ui[lang];
const projects = freelanceProjects[lang];
---

<Base
  lang={lang}
  title={t.meta.freelancing.title}
  description={t.meta.freelancing.description}
  alternate={routes.freelancing}
>
  <section class="mx-auto max-w-3xl px-6 py-16">
    <h1 class="font-display text-5xl font-semibold tracking-tight">{t.freelancing.heading}</h1>
    <p class="mt-4 max-w-xl text-lg text-ink/70">{t.freelancing.intro}</p>

    <div class="mt-14 space-y-8">
      {projects.map((project) => (
        <article data-reveal class="rounded-2xl border border-ink/10 bg-white/60 p-8 shadow-sm">
          <p class="text-sm tracking-wide text-ink/50 uppercase">{project.tagline}</p>
          <h2 class="mt-1 font-display text-3xl font-semibold">{project.name}</h2>
          <p class="mt-3 text-ink/80">{project.description}</p>
          <ul class="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li class="rounded-full border border-ink/15 px-3 py-0.5 text-xs text-ink/60">{s}</li>
            ))}
          </ul>
          <p class="mt-6 flex gap-6 text-sm font-semibold">
            <a href={project.site} rel="noopener" class="text-accent hover:underline">
              {t.freelancing.visit} ↗
            </a>
            <a href={project.repo} rel="noopener" class="hover:text-accent hover:underline">
              {t.freelancing.code} ↗
            </a>
          </p>
        </article>
      ))}
    </div>

    <aside data-reveal class="mt-16 rounded-2xl bg-ink px-8 py-10 text-center text-paper">
      <p class="text-lg text-paper/80">{t.freelancing.ctaQuestion}</p>
      <a
        href={routes.contact[lang]}
        class="mt-4 inline-block rounded-full bg-accent px-8 py-3 font-display text-xl font-semibold text-paper transition-transform duration-200 hover:scale-105"
      >
        {t.freelancing.cta} →
      </a>
    </aside>
  </section>
</Base>

<script>
  import { initScrollReveal } from '../../scripts/motion';

  document.addEventListener('astro:page-load', () => {
    if (document.querySelector('[data-reveal]')) initScrollReveal();
  });
</script>
```

- [ ] **Step 3: Create the twin route wrappers**

`src/pages/freelancing.astro`:

```astro
---
import FreelancingPage from '../components/pages/FreelancingPage.astro';
---

<FreelancingPage lang="en" />
```

`src/pages/freelance.astro`:

```astro
---
import FreelancingPage from '../components/pages/FreelancingPage.astro';
---

<FreelancingPage lang="es" />
```

- [ ] **Step 4: Verify build output**

Run:

```bash
npm run build \
  && grep -o 'cliener.com' dist/freelancing/index.html | head -1 \
  && grep -o 'Trabajemos juntos' dist/freelance/index.html | head -1 \
  && grep -o 'href="/contacto/"' dist/freelance/index.html | head -1
```

Expected: all three greps print a match (the CTA on the Spanish page must link to `/contacto/`).

- [ ] **Step 5: Commit**

```bash
git add src/data/freelance.ts src/components/pages/FreelancingPage.astro src/pages/freelancing.astro src/pages/freelance.astro
git commit -m "feat: add bilingual freelancing page with contact CTA"
```

---

### Task 9: Blog — collection, pair check, index and post pages, sample post

**Files:**
- Create: `src/content.config.ts`
- Create: `src/lib/posts.ts`
- Create: `src/content/thoughts/en/rebuilding-my-site.md`
- Create: `src/content/thoughts/es/reconstruyendo-mi-web.md`
- Create: `src/components/pages/ThoughtsIndexPage.astro`
- Create: `src/components/pages/PostPage.astro`
- Create: `src/pages/thoughts.astro`, `src/pages/pensamientos.astro`
- Create: `src/pages/thoughts/[slug].astro`, `src/pages/pensamientos/[slug].astro`

**Interfaces:**
- Consumes: `Base.astro`, `routes`, `ui`.
- Produces: collection `thoughts` (frontmatter: `title`, `description`, `date`, `translationKey`, `tags?`, `draft?` — NO `slug` key: with the glob loader a `slug` frontmatter key overrides the entry `id` and would collide across languages; the URL slug is the filename). `src/lib/posts.ts` exports `getPosts(lang)`, `postSlug(post)`, `postUrl(post)`, `postLang(post)`, `translationOf(post, all)`, `formatDate(post, lang)`, `type Post`.

- [ ] **Step 1: Create `src/content.config.ts`**

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thoughts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    translationKey: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { thoughts };
```

- [ ] **Step 2: Create `src/lib/posts.ts`**

```ts
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/routes';

export type Post = CollectionEntry<'thoughts'>;

export function postLang(post: Post): Lang {
  return post.id.startsWith('es/') ? 'es' : 'en';
}

export function postSlug(post: Post): string {
  return post.id.replace(/^(en|es)\//, '');
}

export function postUrl(post: Post): string {
  const base = postLang(post) === 'en' ? '/thoughts/' : '/pensamientos/';
  return `${base}${postSlug(post)}/`;
}

export function formatDate(post: Post, lang: Lang): string {
  return post.data.date.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Every published post must have a published counterpart in the other language. */
export function translationOf(post: Post, all: Post[]): Post {
  const lang = postLang(post);
  const pair = all.find(
    (p) => p.data.translationKey === post.data.translationKey && postLang(p) !== lang
  );
  if (!pair) {
    throw new Error(
      `Post "${post.id}" has no ${lang === 'en' ? 'Spanish' : 'English'} translation. ` +
        `Add a post with translationKey "${post.data.translationKey}" under src/content/thoughts/${lang === 'en' ? 'es' : 'en'}/.`
    );
  }
  return pair;
}

export async function getPosts(lang: Lang): Promise<Post[]> {
  const all = await getCollection('thoughts', (p) => !p.data.draft);
  for (const post of all) translationOf(post, all); // fail the build on missing pairs
  return all
    .filter((p) => postLang(p) === lang)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
```

- [ ] **Step 3: Create the sample post in both languages**

`src/content/thoughts/en/rebuilding-my-site.md`:

```markdown
---
title: Rebuilding my site with Astro
description: Why I chose Astro, static output and plain JavaScript for the new alexmayol.com.
date: 2026-08-04
translationKey: rebuilding-my-site
tags: [astro, web-performance]
---

After years of leaving my personal site as a perpetual "coming soon", I rebuilt
it with [Astro](https://astro.build). The goals were simple: every page loads
fast, works in English and Spanish without URL prefixes, and ships close to
zero JavaScript.

Astro made most of this boring — in the best sense. Pages are static HTML,
content lives in markdown, and the few animations that exist load only on the
pages that use them.

This blog is where I'll write about frontend engineering, the things I build,
and the things I break along the way.
```

`src/content/thoughts/es/reconstruyendo-mi-web.md`:

```markdown
---
title: Reconstruyendo mi web con Astro
description: Por qué elegí Astro, salida estática y JavaScript plano para la nueva alexmayol.com.
date: 2026-08-04
translationKey: rebuilding-my-site
tags: [astro, web-performance]
---

Después de años con mi web personal en un eterno "próximamente", la he
reconstruido con [Astro](https://astro.build). Los objetivos eran simples: que
cada página cargue rápido, funcione en inglés y español sin prefijos en las
URLs, y envíe casi cero JavaScript.

Astro hizo que casi todo esto fuera aburrido — en el mejor de los sentidos.
Las páginas son HTML estático, el contenido vive en markdown y las pocas
animaciones que existen se cargan solo en las páginas que las usan.

Este blog es donde escribiré sobre ingeniería frontend, las cosas que
construyo y las que rompo por el camino.
```

- [ ] **Step 4: Create `src/components/pages/ThoughtsIndexPage.astro`**

```astro
---
import Base from '../../layouts/Base.astro';
import { routes, type Lang } from '../../i18n/routes';
import { ui } from '../../i18n/ui';
import { getPosts, postUrl, formatDate } from '../../lib/posts';

interface Props {
  lang: Lang;
}

const { lang } = Astro.props;
const t = ui[lang];
const posts = await getPosts(lang);
---

<Base
  lang={lang}
  title={t.meta.thoughts.title}
  description={t.meta.thoughts.description}
  alternate={routes.thoughts}
>
  <section class="mx-auto max-w-3xl px-6 py-16">
    <h1 class="font-display text-5xl font-semibold tracking-tight">{t.thoughts.heading}</h1>
    <p class="mt-4 max-w-xl text-lg text-ink/70">{t.thoughts.intro}</p>

    {posts.length === 0 && <p class="mt-14 text-ink/60">{t.thoughts.empty}</p>}

    <ul class="mt-14 space-y-10">
      {posts.map((post) => (
        <li>
          <article>
            <p class="text-sm tracking-wide text-ink/50 uppercase">{formatDate(post, lang)}</p>
            <h2 class="mt-1 font-display text-2xl font-semibold">
              <a href={postUrl(post)} class="hover:text-accent">{post.data.title}</a>
            </h2>
            <p class="mt-2 text-ink/70">{post.data.description}</p>
          </article>
        </li>
      ))}
    </ul>
  </section>
</Base>
```

- [ ] **Step 5: Create `src/components/pages/PostPage.astro`**

```astro
---
import { getCollection, render } from 'astro:content';
import Base from '../../layouts/Base.astro';
import type { Lang } from '../../i18n/routes';
import { SITE } from '../../data/site';
import { formatDate, postUrl, translationOf, type Post } from '../../lib/posts';

interface Props {
  post: Post;
  lang: Lang;
}

const { post, lang } = Astro.props;
const all = await getCollection('thoughts', (p) => !p.data.draft);
const pair = translationOf(post, all);
const alternate =
  lang === 'en'
    ? { en: postUrl(post), es: postUrl(pair) }
    : { en: postUrl(pair), es: postUrl(post) };
const { Content } = await render(post);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.data.title,
  description: post.data.description,
  datePublished: post.data.date.toISOString(),
  inLanguage: lang,
  author: { '@type': 'Person', name: SITE.name, url: SITE.url },
};
---

<Base
  lang={lang}
  title={`${post.data.title} — ${SITE.displayName}`}
  description={post.data.description}
  alternate={alternate}
  ogType="article"
  jsonLd={jsonLd}
>
  <article class="mx-auto max-w-3xl px-6 py-16">
    <p class="text-sm tracking-wide text-ink/50 uppercase">{formatDate(post, lang)}</p>
    <h1 class="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
      {post.data.title}
    </h1>
    <div class="prose prose-lg mt-10 max-w-none prose-headings:font-display prose-a:text-accent">
      <Content />
    </div>
  </article>
</Base>
```

- [ ] **Step 6: Create the four route files**

`src/pages/thoughts.astro`:

```astro
---
import ThoughtsIndexPage from '../components/pages/ThoughtsIndexPage.astro';
---

<ThoughtsIndexPage lang="en" />
```

`src/pages/pensamientos.astro`:

```astro
---
import ThoughtsIndexPage from '../components/pages/ThoughtsIndexPage.astro';
---

<ThoughtsIndexPage lang="es" />
```

`src/pages/thoughts/[slug].astro`:

```astro
---
import PostPage from '../../components/pages/PostPage.astro';
import { getPosts, postSlug } from '../../lib/posts';

export async function getStaticPaths() {
  const posts = await getPosts('en');
  return posts.map((post) => ({ params: { slug: postSlug(post) }, props: { post } }));
}

const { post } = Astro.props;
---

<PostPage post={post} lang="en" />
```

`src/pages/pensamientos/[slug].astro`:

```astro
---
import PostPage from '../../components/pages/PostPage.astro';
import { getPosts, postSlug } from '../../lib/posts';

export async function getStaticPaths() {
  const posts = await getPosts('es');
  return posts.map((post) => ({ params: { slug: postSlug(post) }, props: { post } }));
}

const { post } = Astro.props;
---

<PostPage post={post} lang="es" />
```

- [ ] **Step 7: Verify the pair check FAILS on an unpaired post**

Run:

```bash
mv src/content/thoughts/es/reconstruyendo-mi-web.md /tmp/pair-check-backup.md
npm run build; echo "exit: $?"
mv /tmp/pair-check-backup.md src/content/thoughts/es/reconstruyendo-mi-web.md
```

Expected: the build FAILS (non-zero exit) with the error `Post "en/rebuilding-my-site" has no Spanish translation`. Restore happens on the last line regardless.

- [ ] **Step 8: Verify the happy path**

Run:

```bash
npm run build \
  && grep -o 'hreflang="es" href="https://alexmayol.com/pensamientos/reconstruyendo-mi-web/"' dist/thoughts/rebuilding-my-site/index.html \
  && grep -o 'BlogPosting' dist/thoughts/rebuilding-my-site/index.html \
  && grep -o 'href="/pensamientos/reconstruyendo-mi-web/"' dist/pensamientos/index.html
```

Expected: all three greps print a match — the post's language toggle points at the exact translated post URL.

- [ ] **Step 9: Commit**

```bash
git add src/content.config.ts src/lib/posts.ts src/content src/components/pages/ThoughtsIndexPage.astro src/components/pages/PostPage.astro src/pages/thoughts.astro src/pages/pensamientos.astro src/pages/thoughts src/pages/pensamientos
git commit -m "feat: add bilingual blog with translation-pair build check"
```

---

### Task 10: Post-writing skill

**Files:**
- Create: `.claude/skills/writing-posts/SKILL.md`

**Interfaces:**
- Consumes: the conventions established in Task 9. If you change them there, update them here.

- [ ] **Step 1: Create `.claude/skills/writing-posts/SKILL.md`**

````markdown
---
name: writing-posts
description: Use when writing or editing a blog post for the /thoughts section of alexmayol.com — covers file locations, frontmatter, the translation-pair rule, and the publish checklist.
---

# Writing Blog Posts

Posts live in a content collection and MUST exist in both languages. The
build fails if a published post is missing its counterpart.

## File locations

- English: `src/content/thoughts/en/<english-slug>.md`
- Spanish: `src/content/thoughts/es/<spanish-slug>.md`

The filename IS the URL slug: `en/my-post.md` → `/thoughts/my-post/`,
`es/mi-post.md` → `/pensamientos/mi-post/`. Use kebab-case, translate the
slug into each language naturally (do not reuse the English slug for
Spanish unless the natural slug is identical).

## Frontmatter (both files)

```yaml
---
title: Post title in that language
description: 1-2 sentence summary in that language (used for SEO + index).
date: 2026-08-04            # same date in both files
translationKey: my-post     # IDENTICAL in both files — this pairs them
tags: [tag-a, tag-b]        # optional, same tags in both files
draft: true                 # optional; draft posts are excluded from the build
---
```

Do NOT add a `slug` frontmatter key — it would override the collection
entry id and break language detection.

## Writing rules

- Write the English version first, then the Spanish version (or vice versa
  if the user drafted in Spanish). Translate meaning, not words — each
  version should read as if originally written in that language.
- Keep title and description language-appropriate; they don't need to be
  literal translations.
- Standard markdown; links and code fences work. Images go in
  `src/assets/` and are referenced relatively (Astro optimizes them).

## Publish checklist

1. Create BOTH files with identical `translationKey`, `date`, `tags`,
   `draft` values.
2. Run `npm run build`. It fails with a "has no ... translation" error if
   the pair is broken — fix before continuing.
3. Verify both URLs exist in the output:
   `dist/thoughts/<english-slug>/index.html` and
   `dist/pensamientos/<spanish-slug>/index.html`.
4. Commit both files together.
````

- [ ] **Step 2: Verify the skill file has valid frontmatter**

Run: `head -5 .claude/skills/writing-posts/SKILL.md`
Expected: opens with `---`, has `name: writing-posts` and a `description:` line.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/writing-posts/SKILL.md
git commit -m "feat: add writing-posts skill for AI-assisted blogging"
```

---

### Task 11: Final verification — typecheck, full build, Lighthouse

**Files:**
- None created; fixes only if audits fail.

- [ ] **Step 1: Typecheck and build**

Run: `npx astro check && npm run build`
Expected: 0 errors, build succeeds.

- [ ] **Step 2: Verify the sitemap includes every route**

Run: `cat dist/sitemap-0.xml | grep -o '<loc>[^<]*</loc>'`
Expected: 12 URLs — `/`, `/inicio/`, `/projects/`, `/proyectos/`, `/contact/`, `/contacto/`, `/freelancing/`, `/freelance/`, `/thoughts/`, `/pensamientos/`, `/thoughts/rebuilding-my-site/`, `/pensamientos/reconstruyendo-mi-web/`.

- [ ] **Step 3: Run Lighthouse against the preview server**

Run:

```bash
npm run preview &  # serves dist on http://localhost:4321
sleep 2
for path in / /projects/ /contact/ /freelancing/ /thoughts/ /thoughts/rebuilding-my-site/; do
  npx lighthouse "http://localhost:4321$path" \
    --only-categories=performance,accessibility,best-practices,seo \
    --chrome-flags="--headless" --quiet \
    --output=json --output-path=stdout 2>/dev/null \
    | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{const r=JSON.parse(d);console.log(r.finalDisplayedUrl, Object.values(r.categories).map(c=>c.id+':'+Math.round(c.score*100)).join(' '))})"
done
kill %1
```

Expected: performance ≥ 95 and accessibility/best-practices/seo = 100 on every page. If any score is below target, read the Lighthouse failures, fix, rebuild, and re-run before proceeding. (Alternative if `npx lighthouse` is unavailable: use the `mcp__chrome-devtools__lighthouse_audit` MCP tool against the same URLs.)

- [ ] **Step 4: Manual smoke test of the language toggle**

With the preview server running, fetch and check toggle targets:

```bash
npm run preview &
sleep 2
curl -s http://localhost:4321/contact/ | grep -o 'href="/contacto/"' | head -1
curl -s http://localhost:4321/thoughts/rebuilding-my-site/ | grep -o 'href="/pensamientos/reconstruyendo-mi-web/"' | head -1
kill %1
```

Expected: both greps print a match.

- [ ] **Step 5: Commit any fixes**

```bash
git status --short  # commit only if audit fixes changed files
```
