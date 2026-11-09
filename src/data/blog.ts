/** Blog section data — `src/data/blogs/` is the source of truth for /blogs/. */
export {
  blogArticles as blogPosts,
  getBlogArticle as getBlogPost,
  getAllBlogSlugs,
  getRelatedBlogArticles as getRelatedBlogPosts,
  getBlogPostTimestamp,
  getBlogReadMinutes,
  toBlogCardPost,
  blogSearchBlob,
} from './blogs/index';

import { blogArticles, getBlogArticle, toBlogCardPost, getRelatedBlogArticles } from './blogs/index';
import type { BlogArticle } from './blogs/types';
import type { BlogPost } from '../i18n/types';

export type BlogPostFull = BlogArticle;

export function getFeaturedBlogPost(): BlogPost | undefined {
  return blogArticles[0] ? toBlogCardPost(blogArticles[0]) : undefined;
}

export function getFeaturedBlogPosts(limit = 3): BlogPost[] {
  return blogArticles.slice(0, limit).map(toBlogCardPost);
}

export function getBlogPostsBySlugs(slugs: string[]): BlogPost[] {
  return slugs
    .map((slug) => getBlogArticle(slug))
    .filter((post): post is BlogArticle => Boolean(post))
    .map(toBlogCardPost);
}

export function getRelatedBlogPostsForProduct(relatedSlugs: string[], limit = 6): BlogPost[] {
  const curated = getBlogPostsBySlugs(relatedSlugs);
  if (curated.length >= limit) return curated.slice(0, limit);
  const used = new Set(curated.map((p) => p.slug));
  const fill = blogArticles
    .filter((p) => !used.has(p.slug))
    .map(toBlogCardPost);
  return [...curated, ...fill].slice(0, limit);
}

export function getRelatedBlogPostsFull(slug: string, limit = 3): BlogArticle[] {
  return getRelatedBlogArticles(slug, limit);
}
