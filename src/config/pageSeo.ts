/**
 * Central titles/descriptions for high-traffic routes (50–60 char titles, 120–155 descriptions).
 */

export interface PageSeoEntry {
  title: string;
  description: string;
  keywords?: string;
}

export const DEFAULT_SEO_KEYWORDS =
  'Caliber cheats, Caliber aimbot, Caliber ESP, Caliber wallhack';

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Caliber Cheats for PC | ESP, Aimbot & Wallhack Modules',
    description:
      'Compare Caliber cheats for Windows PC—ESP, aimbot, wallhack, loot ESP, and utilities. Read buyer guides and reviews, then open secure checkout in one click.',
    keywords:
      'Caliber cheats, Caliber aimbot, Caliber ESP, Caliber gaming tools, Caliber PC',
  },
  '/products/caliber/': {
    title: 'Caliber Cheats Catalog | Aimbot, ESP & Wallhack PC',
    description:
      'Browse Caliber cheat modules on PC—aimbot, player ESP, wallhack, loot ESP, no recoil, and stream-proof overlays. Compare features before checkout.',
    keywords:
      'Caliber cheat download, Caliber cheat features, best Caliber gaming tools',
  },
  '/products/caliber/aimbot/': {
    title: 'Caliber Aimbot Module | FOV, Smoothness & Bones PC',
    description:
      'Caliber aimbot settings for ranked and pubs: FOV, smoothness, and bone priority. Part of the Caliber cheat catalog on calibercheat.net.',
    keywords: 'Caliber aimbot, Caliber cheat features, Caliber gaming software',
  },
  '/products/caliber/player-esp/': {
    title: 'Caliber Player ESP | Boxes, Health & Distance PC',
    description:
      'Player ESP with boxes, health bars, and distance tags for Caliber on PC. See how ESP fits your loadout before you open checkout on the linked store.',
    keywords: 'Caliber ESP, Caliber cheat features, Caliber gameplay guide',
  },
  '/products/caliber/wallhack/': {
    title: 'Caliber Wallhack Module | Cover Reads & Intel for PC',
    description:
      'Caliber wallhack for building clears and peek timing on PC. Pairs with player ESP in the same Caliber modules stack from calibercheat.net.',
    keywords: 'Caliber wallhack, Caliber cheat features, Caliber hacks',
  },
  '/products/caliber/loot-esp/': {
    title: 'Caliber Loot ESP | Weapons, Attachments & Gear PC',
    description:
      'Loot ESP for faster POI paths on Caliber PC. Filter weapons and attachments in one overlay module from the calibercheat.net product catalog.',
    keywords: 'Caliber gaming tools, Caliber ESP, Caliber game optimization',
  },
  '/products/caliber/no-recoil/': {
    title: 'Caliber No Recoil Module | Weapon Spray Control PC',
    description:
      'Per-weapon no recoil presets for tighter sprays in Caliber on PC. Tune strength so FPS and overlays stay stable before you buy through checkout.',
    keywords: 'Caliber game settings, Caliber performance optimization, Caliber aimbot',
  },
  '/products/caliber/stream-proof/': {
    title: 'Caliber Stream Proof Overlays | OBS-Safe Capture PC',
    description:
      'Stream-proof overlays for Caliber creators: hide ESP from capture while monitoring locally. Test capture scenes before ranked on Windows PC.',
    keywords: 'Caliber gaming software, Caliber cheat setup guide, stream proof caliber',
  },
  '/products/caliber/cloud-dma/': {
    title: 'Cloud DMA for Caliber | External Memory Read Setup',
    description:
      'Cloud DMA specs and checkout for two-PC external memory setups with Caliber modules. Confirm firmware, cabling, and seller support before you buy.',
    keywords: 'Cloud DMA, Caliber hardware, external read caliber',
  },
  '/products/caliber/hwid-spoofer/': {
    title: 'HWID Spoofer for Caliber | PC Identity Reset Workflow',
    description:
      'HWID spoofer workflow for new Caliber accounts on the same Windows PC. Read limits, reinstall notes, then open checkout when the tool fits your case.',
    keywords: 'HWID spoofer, Caliber ban, PC fingerprint reset',
  },
  '/products/caliber/utilities/': {
    title: 'Caliber Utility Tools | Cloud DMA & HWID Options PC',
    description:
      'Compare Cloud DMA and HWID spoofer utilities for Caliber buyers. Match the tool to your hardware or account situation before secure checkout.',
    keywords: 'Caliber utilities, Cloud DMA, HWID spoofer',
  },
  '/blogs/': {
    title: 'Caliber Blogs & PC Buying Guides | calibercheat.net',
    description:
      'Caliber blogs: buyer guides, FPS tuning, software safety, season updates, aim trainers, and tool comparisons for Windows PC players.',
    keywords: 'Caliber blogs, Caliber guides, Caliber PC optimization',
  },
  '/forum/': {
    title: 'Caliber Forums | Aimbot, ESP & Setup',
    description:
      'Community forums for Caliber module setup, aimbot tuning, and loader questions. Peer threads—not a substitute for official product support or reviews.',
    keywords: 'Caliber cheat setup guide, Caliber troubleshooting guide',
  },
  '/reviews/': {
    title: 'Caliber Cheats Reviews | Ratings & Buyer Feedback PC',
    description:
      'Caliber Cheats customer ratings and moderated feedback on modules, checkout, setup, and support. Published reviews only—no fabricated testimonials.',
    keywords: 'Caliber Cheats reviews, Caliber cheats reviews, Caliber Cheats customer feedback',
  },
  '/faq/': {
    title: 'Caliber Cheats FAQ | PC Setup, Loader & Checkout Help',
    description:
      'FAQ on Caliber software compatibility, PC requirements, cheat download rules, patch-day checks, and install steps for Windows players.',
    keywords: 'Caliber PC requirements, Caliber software compatibility, Caliber cheat setup',
  },
  '/support/': {
    title: 'Caliber Cheats Support | Install & Loader Help Desk',
    description:
      'Support for Caliber loader errors, lag after overlays, and checkout on calibercheat.net. Bring order email and PC specs when contacting the merchant.',
    keywords: 'Caliber troubleshooting guide, Caliber performance optimization',
  },
  '/about/': {
    title: 'About calibercheat.net | Caliber Module Catalog',
    description:
      'Independent catalog for Caliber modules and PC gaming tools. We explain features; checkout and downloads run on the linked merchant store.',
    keywords: 'Caliber cheats, Caliber gaming tools, calibercheat.net',
  },
  '/terms/': {
    title: 'Terms of Use | calibercheat.net Caliber Module Site',
    description:
      'Terms for visitors using calibercheat.net pages, blogs, and forums before external checkout for Caliber modules and related utilities.',
  },
  '/privacy/': {
    title: 'Privacy Policy | calibercheat.net Visitor Information',
    description:
      'How calibercheat.net handles privacy for visitors browsing Caliber module pages, blogs, reviews, and support resources on this site.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function resolvePageSeo(pathname: string): PageSeoEntry {
  const key = normalizeSeoPath(pathname);
  return PAGE_SEO[key] ?? PAGE_SEO['/'];
}

export const getPageSeoEntry = resolvePageSeo;
