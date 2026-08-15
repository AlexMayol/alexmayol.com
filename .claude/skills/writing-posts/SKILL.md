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
- Standard markdown; links and code fences work.
- A full reference of every supported pattern lives at
  `src/content/thoughts/en/post-template.md` (a permanent draft — copy
  from it, never set its `draft: false`).

## Images

Put images in `src/content/thoughts/_images/` (shared by both languages)
and reference them relatively from the post:

```markdown
![Descriptive alt text](../_images/my-image.png)
```

Astro optimizes these at build time. Never use `public/` paths for post
images — they'd skip optimization. Always write meaningful alt text, in
the post's language.

## YouTube videos

Embed with the `<lite-youtube>` web component (raw HTML in markdown; its
script loads automatically on post pages, and only the thumbnail loads
until the reader clicks play):

```html
<lite-youtube videoid="dQw4w9WgXcQ" videotitle="Descriptive video title"></lite-youtube>
```

`videotitle` is required for accessibility; write it in the post's
language.

## Publish checklist

1. Create BOTH files with identical `translationKey`, `date`, `tags`,
   `draft` values.
2. Run `npm run build`. It fails with a "has no ... translation" error if
   the pair is broken — fix before continuing.
3. Verify both URLs exist in the output:
   `dist/thoughts/<english-slug>/index.html` and
   `dist/pensamientos/<spanish-slug>/index.html`.
4. Commit both files together.
