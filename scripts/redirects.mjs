import { resolveSiteOrigin } from './site-origin.mjs';

resolveSiteOrigin();

/** Must match PRODUCT_BASE in src/config/site.ts */
const PRODUCT_BASE = '/products/robrun/';
const productsBase = PRODUCT_BASE.replace(/\/$/, '');
const utilitiesPath = `${productsBase}/utilities/`;
const aimbotPath = `${productsBase}/aimbot/`;

/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blogs/robrun-cheats-faq', '/blogs/robrun-faq/'],
  ['/blogs/robrun-cheats-faq/', '/blogs/robrun-faq/'],
  ['/blogs/robrun-cheats-installation', '/blogs/robrun-installation/'],
  ['/blogs/robrun-cheats-installation/', '/blogs/robrun-installation/'],
  ['/blogs/robrun-cheats-features', '/blogs/robrun-features/'],
  ['/blogs/robrun-cheats-features/', '/blogs/robrun-features/'],
  ['/blogs/robrun-esp-guide', '/blogs/robrun-esp/'],
  ['/blogs/robrun-esp-guide/', '/blogs/robrun-esp/'],
  ['/blogs/best-robrun-cheats', '/blogs/robrun-buying-guide/'],
  ['/blogs/best-robrun-cheats/', '/blogs/robrun-buying-guide/'],
  ['/blogs/robrun-cheats-pricing', '/blogs/robrun-pricing/'],
  ['/blogs/robrun-cheats-pricing/', '/blogs/robrun-pricing/'],
  ['/blogs/robrun-fps-boost', '/blogs/robrun-performance/'],
  ['/blogs/robrun-fps-boost/', '/blogs/robrun-performance/'],
  ['/blogs/robrun-cheats-safety', '/blogs/robrun-safety/'],
  ['/blogs/robrun-cheats-safety/', '/blogs/robrun-safety/'],
  ['/blogs/robrun-cheats-comparison', '/blogs/robrun-comparison/'],
  ['/blogs/robrun-cheats-comparison/', '/blogs/robrun-comparison/'],
  ['/blogs/robrun-gaming-software-compatibility', '/blogs/robrun-compatibility/'],
  ['/blogs/robrun-gaming-software-compatibility/', '/blogs/robrun-compatibility/'],
  ['/blog', '/blogs/'],
  ['/blog/', '/blogs/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/forum', '/forum/'],
  ['/reviews', '/reviews/'],
  ['/blogs', '/blogs/'],
  ['/utilities', utilitiesPath],
  ['/utilities/', utilitiesPath],
  ['/store', aimbotPath],
  ['/store/', aimbotPath],
  ['/cheats', PRODUCT_BASE],
  ['/cheats/', PRODUCT_BASE],
  ['/cheats/lite', aimbotPath],
  ['/cheats/lite/', aimbotPath],
  ['/cheats/pro', aimbotPath],
  ['/cheats/pro/', aimbotPath],
  ['/cheats/elite', aimbotPath],
  ['/cheats/elite/', aimbotPath],
  ['/cheats/compare', PRODUCT_BASE],
  ['/cheats/compare/', PRODUCT_BASE],
  [`${productsBase}/lite`, aimbotPath],
  [`${productsBase}/lite/`, aimbotPath],
  [`${productsBase}/pro`, aimbotPath],
  [`${productsBase}/pro/`, aimbotPath],
  [`${productsBase}/elite`, aimbotPath],
  [`${productsBase}/elite/`, aimbotPath],
  [`${productsBase}/unlock-all`, `${productsBase}/cloud-dma/`],
  [`${productsBase}/unlock-all/`, `${productsBase}/cloud-dma/`],
  ['/products/cs2-cheats', PRODUCT_BASE],
  ['/products/cs2-cheats/', PRODUCT_BASE],
  ['/products/cs2-cheats/cs2-store', aimbotPath],
  ['/products/cs2-cheats/cs2-store/', aimbotPath],
  ['/products/dota-2-cheats/utilities', utilitiesPath],
  ['/products/dota-2-cheats/utilities/', utilitiesPath],
  ['/products/dota-2-cheats', PRODUCT_BASE],
  ['/products/dota-2-cheats/', PRODUCT_BASE],
  ['/products/dota-2-cheats/account-recovery', utilitiesPath],
  ['/products/dota-2-cheats/account-recovery/', utilitiesPath],
  ['/products/rust-cheats', PRODUCT_BASE],
  ['/products/rust-cheats/', PRODUCT_BASE],
  ['/products/rust-cheats/rust-store', aimbotPath],
  ['/products/rust-cheats/rust-store/', aimbotPath],
  ['/products/rust-cheats/lite', aimbotPath],
  ['/products/rust-cheats/lite/', aimbotPath],
  ['/products/rust-cheats/pro', aimbotPath],
  ['/products/rust-cheats/pro/', aimbotPath],
  ['/products/rust-cheats/elite', aimbotPath],
  ['/products/rust-cheats/elite/', aimbotPath],
  ['/products/rust-cheats/unlock-all', `${productsBase}/cloud-dma/`],
  ['/products/rust-cheats/unlock-all/', `${productsBase}/cloud-dma/`],
  ['/products/rust-cheats/utilities', utilitiesPath],
  ['/products/rust-cheats/utilities/', utilitiesPath],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
