import { getCollection, type CollectionEntry } from 'astro:content';
import { routes, type Lang } from '../i18n/routes';

export type Post = CollectionEntry<'log'>;

export function postLang(post: Post): Lang {
  return post.id.startsWith('es/') ? 'es' : 'en';
}

export function postSlug(post: Post): string {
  return post.id.replace(/^(en|es)\//, '');
}

export function postUrl(post: Post): string {
  return `${routes.log[postLang(post)]}${postSlug(post)}/`;
}

export function formatDate(post: Post, lang: Lang): string {
  return post.data.date.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function findTranslation(post: Post, all: Post[]): Post | undefined {
  const lang = postLang(post);
  return all.find(
    (p) => p.data.translationKey === post.data.translationKey && postLang(p) !== lang
  );
}

/** Every published post must have a published counterpart in the other language. */
export function translationOf(post: Post, all: Post[]): Post {
  const lang = postLang(post);
  const pair = findTranslation(post, all);
  if (!pair) {
    throw new Error(
      `Post "${post.id}" has no ${lang === 'en' ? 'Spanish' : 'English'} translation. ` +
        `Add a post with translationKey "${post.data.translationKey}" under src/content/log/${lang === 'en' ? 'es' : 'en'}/.`
    );
  }
  return pair;
}

/** Dev shows drafts (and skips the pair check) so posts can be previewed
 *  before their translation exists; production builds stay strict. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const all = await getCollection('log', (p) => import.meta.env.PROD ? !p.data.draft : true);
  if (import.meta.env.PROD) for (const post of all) translationOf(post, all);
  return all
    .filter((p) => postLang(p) === lang)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
