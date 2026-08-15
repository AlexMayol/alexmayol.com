import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const log = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/log' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        translationKey: z.string(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        cover: image().optional(),
        coverAlt: z.string().default(''),
        coverVideo: z.string().optional(),
      })
      .refine((d) => !(d.cover && d.coverVideo), {
        message: 'cover and coverVideo are mutually exclusive — set only one',
      }),
});

export const collections = { log };
