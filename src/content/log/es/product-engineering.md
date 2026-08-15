---
title: De Software Engineer a Product Engineer
description: El cambio de paradigma que ya está aquí y mi proceso de adaptación
date: 2026-08-15
translationKey: product-engineering
tags: [product, engineering, software]
draft: false
---

# De Software Engineer a Product Engineer

## El cambio de paradigma que ya está aquí

Hace menos de un año, prácticamente de la ch

Cambios fundament

## Images

Put images in `src/content/thoughts/_images/` and reference them with a
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
