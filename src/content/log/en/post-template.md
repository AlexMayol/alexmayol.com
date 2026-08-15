---
title: Post template — copy me, don't publish me
description: Reference post showing every supported content pattern (images, YouTube, code, quotes).
date: 2026-08-15
translationKey: post-template
tags: [template]
draft: true
cover: ../_images/sample.png # optional og:image for social shares (ideal 1200×630); omit to use the site default
---

<!--
  TEMPLATE — keep draft: true here forever.
  To write a real post: copy this file to en/<your-slug>.md and
  es/<your-spanish-slug>.md, give both the same translationKey,
  set draft: false (or remove it), and delete the examples you don't use.
  The filename is the URL slug.
-->

Opening paragraph. Plain markdown works everywhere: **bold**, _italic_,
`inline code`, and [links](https://docs.astro.build).

## Images

Put images in `src/content/log/_images/` and reference them with a
relative path. Astro optimizes them at build time (resized, hashed,
modern format) — never use `public/` paths for post images.

![A sample image with descriptive alt text](../_images/sample.png)

## YouTube videos

Embed videos with `<lite-youtube>` — it renders only the thumbnail
(~2 KB) and loads the real iframe when the reader clicks play. Raw HTML
works in markdown; the component script loads automatically on post pages.

<lite-youtube videoid="dQw4w9WgXcQ" videotitle="Descriptive title of the video"></lite-youtube>

## Code

```ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

## Quotes and lists

> A blockquote for pull-out thoughts.

- Unordered list item
- Another one

1. Ordered when sequence matters
2. Second step
