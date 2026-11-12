import type { BlogPost } from '../../i18n/types';
import type { BlogArticle, BlogCategory } from './types';
import { blogArticles } from './articles';

export type { BlogArticle, BlogBlock, BlogCategory, BlogFaqItem } from './types';
export { BLOG_LINKS, blogAnchor, blogHref } from './links';

export const blogCategories: Array<'All Articles' | BlogCategory> = [
  'All Articles',
  'Buying Guides',
  'Features',
  'Comparisons',
  'Tutorials',
  'Compatibility',
  'Updates',
  'Safety & FAQs',
];

export { blogArticles };

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return blogArticles.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogArticles.map((post) => post.slug);
}

export function getBlogPostTimestamp(date: string): number {
  const t = Date.parse(date);
  return Number.isNaN(t) ? 0 : t;
}

export function getBlogReadMinutes(readTime: string): number {
  const m = readTime.match(/(\d+)/);
  return m ? Number(m[1]) : 5;
}

export function toBlogCardPost(article: BlogArticle): BlogPost {
  return {
    slug: article.slug,
    tag: article.tag,
    title: article.title,
    desc: article.excerpt,
    seoDescription: article.description,
    seoTitle: article.seoTitle,
    date: article.date,
    readTime: article.readTime,
    image: article.image,
    imageAlt: article.imageAlt,
  };
}

export function getRelatedBlogArticles(slug: string, limit = 3): BlogArticle[] {
  const current = getBlogArticle(slug);
  const picked: BlogArticle[] = [];
  const used = new Set<string>([slug]);

  for (const rel of current?.relatedSlugs ?? []) {
    const post = getBlogArticle(rel);
    if (post && !used.has(post.slug)) {
      picked.push(post);
      used.add(post.slug);
    }
    if (picked.length >= limit) return picked;
  }

  for (const post of blogArticles) {
    if (used.has(post.slug)) continue;
    picked.push(post);
    used.add(post.slug);
    if (picked.length >= limit) break;
  }
  return picked;
}

export function blogSearchBlob(article: BlogArticle): string {
  const bodyText = article.body
    .map((b) => {
      if ('html' in b && b.html) return b.html.replace(/<[^>]+>/g, ' ');
      if ('text' in b && b.text) return b.text;
      if ('items' in b && b.items) return b.items.join(' ');
      if (b.type === 'table') return [...b.headers, ...b.rows.flat()].join(' ');
      return '';
    })
    .join(' ');
  return `${article.title} ${article.excerpt} ${article.keywords} ${article.tag} ${article.intent} ${bodyText}`.toLocaleLowerCase();
}
