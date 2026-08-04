# alexmayol.com — Pages, i18n, SEO & Blog

Design spec, approved 2026-08-04.

## Goal

Build out the personal site (Astro 7 + Tailwind 4, static, GitHub Pages at
https://alexmayol.com) with five bilingual pages, blog infrastructure, full SEO
plumbing, PWA manifest, metadata images, and an AI post-writing skill.

## Decisions (user-approved)

- **Animations**: GSAP + ScrollTrigger + CSS 3D transforms. No Three.js, no
  Svelte/React. Plain JS only, loaded per-page.
- **Blog i18n**: every post MUST exist in both English and Spanish.
- **Primary language**: English (`x-default`). Root `/` is English home.
- **Visual style**: light, clean, editorial.
- **i18n routing**: twin pages — two thin `.astro` files per page wrapping one
  shared component. No `/en/` or `/es/` prefixes ever.

## 1. Architecture & i18n

Static output, no SSR. Route table (single source of truth in
`src/i18n/routes.ts`):

| Page        | English       | Spanish        |
| ----------- | ------------- | -------------- |
| Home        | `/`           | `/inicio`      |
| Projects    | `/projects`   | `/proyectos`   |
| Contact     | `/contact`    | `/contacto`    |
| Freelancing | `/freelancing`| `/freelance`   |
| Thoughts    | `/thoughts`   | `/pensamientos`|
| Post        | `/thoughts/[slug]` | `/pensamientos/[slug]` |

- Each static page = two thin wrappers (e.g. `src/pages/contact.astro`,
  `src/pages/contacto.astro`) rendering one shared component from
  `src/components/pages/` with a `lang` prop.
- UI strings in `src/i18n/en.ts` / `src/i18n/es.ts` dictionaries.
- Header has a language toggle linking to the current page's counterpart,
  resolved from the route table (for posts, from the paired translation).

## 2. Pages

- **Home** (`/`, `/inicio`): blank placeholder content for now, but uses the
  shared layout + header so nav and language toggle work. Future iteration.
- **Projects** (`/projects`, `/proyectos`): timeline of the six roles from the
  resume repo (Magnific, Job&Talent, devaway_, Conwork, Integratur, Datanet
  Consultores) — dates, role, company, summary, highlights, skill tags.
  Scroll-reveal per entry. Content copied into this repo (both languages);
  the resume repo is the source, fetched once, not a build dependency.
- **Contact** (`/contact`, `/contacto`): GitHub
  (https://github.com/AlexMayol), LinkedIn
  (https://www.linkedin.com/in/alejandro-mayol-carrion/), email
  (alexmayolc@gmail.com) as large interactive cards: CSS 3D tilt-on-hover,
  floating decorative shapes animated with GSAP, staggered entrance.
- **Freelancing** (`/freelancing`, `/freelance`): cards for
  https://github.com/AlexMayol/cliener and
  https://github.com/AlexMayol/bluemation (copy written from their READMEs,
  both languages) + prominent "Work with me" CTA linking to the contact page.
- **Thoughts** (`/thoughts`, `/pensamientos`): post index per language;
  post pages rendered from markdown.

## 3. Blog content

- Content collection `thoughts`: `src/content/thoughts/en/*.md` and
  `src/content/thoughts/es/*.md`.
- Frontmatter schema (zod): `title`, `description`, `date`, `slug`,
  `translationKey`, `tags` (optional), `draft` (optional, default false).
- `translationKey` pairs en/es versions; the post-page language toggle links
  to the exact translated post.
- Build-time integrity check in `getStaticPaths`: a `translationKey` missing
  its pair in the other language fails the build with a clear error.
- Ship one sample post in both languages.

## 4. SEO & meta

- `<SEO>` component in the base layout: per-page `title`/`description` in both
  languages, canonical URL, `hreflang` alternates (en, es, x-default) from the
  route table, OpenGraph + Twitter card tags, `og:locale`.
- JSON-LD: `Person` on home & contact, `BlogPosting` on posts.
- `@astrojs/sitemap` generates the sitemap; hreflang alternates are handled by
  the per-page `<link>` tags (the plugin's i18n mode assumes locale prefixes,
  which we don't use).
- Static `public/robots.txt` allowing all and pointing at the sitemap.

## 5. Branding, manifest & images

- Palette: paper `#FAF8F5` (background), ink `#1C1B1A` (text), terracotta
  `#C2410C` (accent). Light mode only — no dark mode for now.
- Typography: self-hosted Fraunces variable font (headings), system sans
  (body). One subsetted woff2, preloaded. No external font requests.
- `public/manifest.webmanifest`: name, short_name, `theme_color`/
  `background_color` from palette, icons.
- Image set generated once by a local script (SVG → PNG via sharp), committed
  to `public/`: OG card 1200×630 (name + role, branded, reused site-wide),
  `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` (180),
  PWA icons 192 & 512.

## 6. Animations & performance

- GSAP + ScrollTrigger imported only by pages that animate (contact, projects,
  freelancing), initialized on `astro:page-load`, killed/re-created across
  view transitions.
- Everything disabled under `prefers-reduced-motion: reduce`.
- Astro `<ClientRouter />` view transitions. The header re-renders on each
  navigation (no `transition:persist` — the language-toggle URL changes per
  page); the default cross-fade keeps it visually stable.
- Pages without animations ship no JS beyond Astro's small view-transition
  router.
- Target: Lighthouse 100 across Performance / A11y / Best Practices / SEO on
  every page.

## 7. Post-writing skill

`.claude/skills/writing-posts/SKILL.md` in this repo documenting: frontmatter
schema, file locations, translationKey pairing rule, slug conventions per
language (kebab-case, language-appropriate), and the publish checklist
(write en → write es → `astro build` passes the pair check).

## 8. Verification

- `astro check` and `astro build` pass.
- Translation-pair build check guards blog integrity.
- Lighthouse audit on the built site (all five pages + one post) before done.

## Out of scope

- Home page content/design (future iteration).
- Dark mode.
- Per-post OG image generation (single site-wide OG card for now).
- RSS feed (easy later add if wanted).
