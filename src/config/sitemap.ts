import type { SitemapItem } from '@astrojs/sitemap';

const buildDate = new Date().toISOString();
const STATIC_HUB_LASTMOD = '2026-03-01';

function pathnameFromUrl(url: string): string {
  const path = new URL(url).pathname;
  return path.endsWith('/') ? path : `${path}/`;
}

export function sitemapSerialize(item: SitemapItem): SitemapItem | undefined {
  const path = pathnameFromUrl(item.url);

  if (
    path.includes('/404') ||
    path.startsWith('/go/') ||
    path.includes('/rss.xml') ||
    path.startsWith('/cheats/') ||
    path === '/contact/' ||
    path.startsWith('/products/dota-2-cheats/') ||
    path.startsWith('/products/cs2-cheats/') ||
    path === '/products/caliber/lite/' ||
    path === '/products/caliber/pro/' ||
    path === '/products/caliber/elite/' ||
    path === '/products/caliber/unlock-all/' ||
    path === '/forum/' ||
    path.startsWith('/forum/')
  ) {
    return undefined;
  }

  if (path === '/') {
    item.lastmod = STATIC_HUB_LASTMOD;
    item.priority = 1;
    item.changefreq = 'weekly';
    return item;
  }

  if (path.startsWith('/products/')) {
    item.lastmod = STATIC_HUB_LASTMOD;
    item.priority = 0.8;
    item.changefreq = 'weekly';
    return item;
  }

  if (path === '/reviews/') {
    item.lastmod = STATIC_HUB_LASTMOD;
    item.priority = 0.65;
    item.changefreq = 'weekly';
    return item;
  }

  if (
    path === '/about/' ||
    path === '/support/' ||
    path === '/privacy/' ||
    path === '/terms/' ||
    path === '/faq/'
  ) {
    item.lastmod = STATIC_HUB_LASTMOD;
    item.priority = 0.5;
    item.changefreq = 'yearly';
    return item;
  }

  item.lastmod = buildDate;
  item.priority = 0.6;
  item.changefreq = 'monthly';
  return item;
}
