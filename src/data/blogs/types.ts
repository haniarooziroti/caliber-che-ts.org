export type BlogCategory =
  | 'Guides'
  | 'Reviews'
  | 'Comparisons'
  | 'Gaming Performance'
  | 'Updates'
  | 'Buying Guides'
  | 'Tutorials'
  | 'Features';

export type BlogBlock =
  | { type: 'p'; html: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; title?: string; html: string }
  | { type: 'cta'; buttons: { label: string; href: string; variant?: 'primary' | 'outline' }[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

export interface BlogFaqItem {
  q: string;
  a: string;
}

export interface BlogArticle {
  slug: string;
  tag: BlogCategory;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  keywords: string;
  intent: string;
  date: string;
  updated: string;
  readTime: string;
  image: string;
  imageAlt: string;
  h1: string;
  body: BlogBlock[];
  faq: BlogFaqItem[];
  relatedSlugs: string[];
}
