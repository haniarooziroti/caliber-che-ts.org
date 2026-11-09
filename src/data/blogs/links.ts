import { PRODUCT_BASE } from '../../config/site';
import { ROUTES, blogPostPath } from '../../utils/path';

const p = PRODUCT_BASE;

export const BLOG_LINKS = {
  home: ROUTES.home,
  blogs: ROUTES.blogs,
  products: ROUTES.products,
  faq: ROUTES.faq,
  support: ROUTES.support,
  reviews: ROUTES.reviews,
  forum: ROUTES.forum,
  utilities: ROUTES.productsUtilities,
  aimbot: `${p}aimbot/`,
  playerEsp: `${p}player-esp/`,
  wallhack: `${p}wallhack/`,
  lootEsp: `${p}loot-esp/`,
  noRecoil: `${p}no-recoil/`,
  streamProof: `${p}stream-proof/`,
  cloudDma: `${p}cloud-dma/`,
  hwidSpoofer: `${p}hwid-spoofer/`,
  checkout: '/go/caliber/',
} as const;

export function blogHref(slug: string): string {
  return blogPostPath(slug);
}

export function blogAnchor(slug: string, label: string): string {
  return `<a href="${blogHref(slug)}">${label}</a>`;
}
