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
    title: 'Caliber Cheats for PC | ESP, Aimbot & Features',
    description:
      'Explore Caliber cheats for PC, compare ESP and aimbot features, review compatibility, and find product details before checkout.',
    keywords:
      'caliber cheats, caliber cheats pc, caliber aimbot, caliber esp, caliber wallhack, caliber hacks, buy caliber cheats, caliber cheat software',
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
      'Caliber aimbot settings for ranked and pubs: FOV, smoothness, and bone priority. Part of the Caliber cheat catalog on caliber-cheats.org.',
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
      'Caliber wallhack for building clears and peek timing on PC. Pairs with player ESP in the same Caliber modules stack from caliber-cheats.org.',
    keywords: 'Caliber wallhack, Caliber cheat features, Caliber hacks',
  },
  '/products/caliber/loot-esp/': {
    title: 'Caliber Loot ESP | Weapons, Attachments & Gear PC',
    description:
      'Loot ESP for faster POI paths on Caliber PC. Filter weapons and attachments in one overlay module from the caliber-cheats.org product catalog.',
    keywords: 'Caliber gaming tools, Caliber ESP, Caliber game optimization',
  },
  '/products/caliber/no-recoil/': {
    title: 'Caliber No Recoil Module | Weapon Spray Control PC',
    description:
      'Per-weapon no recoil presets for tighter sprays in Caliber on PC. Tune strength so FPS and overlays stay stable before you buy through checkout.',
    keywords: 'Caliber game settings, Caliber performance optimization, Caliber aimbot',
  },
  '/products/caliber/stream-proof/': {
    title: 'Caliber Stream Proof Overlays | OBS Capture Hide on PC',
    description:
      'Stream-proof overlays for Caliber creators: hide ESP from capture while monitoring locally. Test capture scenes before ranked on Windows PC.',
    keywords: 'Caliber gaming software, Caliber cheat setup guide, stream proof caliber',
  },
  '/products/caliber/cloud-dma/': {
    title: 'Caliber Cloud DMA | Single-PC Hyper-V for PC Checkouts',
    description:
      'Cloud DMA for Caliber on one Windows PC: Hyper-V layer, no second tower, and merchant checkout for plans. Confirm your Windows edition before you buy.',
    keywords: 'Cloud DMA, Caliber hardware, single PC Hyper-V',
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
    title: 'Caliber Cheats — Guides & Blogs | caliber-cheats.org',
    description:
      'Caliber cheats guides: buyer checklists, ESP and aimbot explainers, pricing, safety, FPS tips, compatibility, and patch notes for PC players.',
    keywords: 'caliber cheats guides, caliber esp guide, caliber aimbot guide',
  },
  '/forum/': {
    title: 'Caliber Cheats Forum | Aimbot, ESP & Setup Advice',
    description:
      'Caliber forum threads on module setup, aimbot tuning, ESP layouts, loader questions, and patch-day notes from Windows PC players.',
    keywords: 'Caliber cheat setup guide, Caliber troubleshooting guide',
  },
  '/reviews/': {
    title: 'Caliber Cheats Reviews | Ratings & Buyer Feedback PC',
    description:
      'Caliber Cheats customer ratings and feedback on modules, checkout, setup, and support from buyers using the PC catalog pages.',
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
      'Support for Caliber loader errors, lag after overlays, and checkout on caliber-cheats.org. Bring order email and PC specs when contacting the merchant.',
    keywords: 'Caliber troubleshooting guide, Caliber performance optimization',
  },
  '/about/': {
    title: 'About caliber-cheats.org | Caliber PC Module Catalog Hub',
    description:
      'Independent catalog for Caliber modules and PC gaming tools. We explain features; checkout and downloads run on the linked merchant store.',
    keywords: 'Caliber cheats, Caliber gaming tools, caliber-cheats.org',
  },
  '/terms/': {
    title: 'Terms of Use | caliber-cheats.org Caliber Module Site',
    description:
      'Terms for visitors using caliber-cheats.org pages, blogs, and forums before external checkout for Caliber modules and related utilities.',
  },
  '/privacy/': {
    title: 'Privacy Policy | caliber-cheats.org Visitor Information',
    description:
      'How caliber-cheats.org handles privacy for visitors browsing Caliber module pages, blogs, reviews, and support resources on this site.',
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
