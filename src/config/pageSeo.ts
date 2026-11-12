/**
 * Central titles/descriptions for high-traffic routes (50–60 char titles, 120–155 descriptions).
 */

export interface PageSeoEntry {
  title: string;
  description: string;
  keywords?: string;
}

export const DEFAULT_SEO_KEYWORDS =
  'Robrun cheats, Robrun aimbot, Robrun ESP, Robrun wallhack';

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Robrun Cheats for PC | ESP, Aimbot & Software Modules',
    description:
      'Explore Robrun cheats for PC, compare available ESP and aimbot features, review compatibility, and find product information before buying.',
    keywords:
      'Robrun cheats, Robrun aimbot, Robrun ESP, Robrun gaming tools, Robrun PC',
  },
  '/products/robrun/': {
    title: 'Robrun Cheats Catalog | Aimbot, ESP & Wallhack PC',
    description:
      'Browse Robrun cheat modules on PC—aimbot, player ESP, wallhack, loot ESP, no recoil, and stream-proof overlays. Compare features before checkout.',
    keywords:
      'Robrun cheat download, Robrun cheat features, best Robrun gaming tools',
  },
  '/products/robrun/aimbot/': {
    title: 'Robrun Aimbot Module | FOV, Smoothness & Bones PC',
    description:
      'Robrun aimbot settings for ranked and pubs: FOV, smoothness, and bone priority. Part of the Robrun cheat catalog on robruncheat.org.',
    keywords: 'Robrun aimbot, Robrun cheat features, Robrun gaming software',
  },
  '/products/robrun/player-esp/': {
    title: 'Robrun Player ESP | Boxes, Health & Distance PC',
    description:
      'Player ESP with boxes, health bars, and distance tags for Robrun on PC. See how ESP fits your loadout before you open checkout on the linked store.',
    keywords: 'Robrun ESP, Robrun cheat features, Robrun gameplay guide',
  },
  '/products/robrun/wallhack/': {
    title: 'Robrun Wallhack Module | Cover Reads & Intel for PC',
    description:
      'Robrun wallhack for building clears and peek timing on PC. Pairs with player ESP in the same Robrun modules stack from robruncheat.org.',
    keywords: 'Robrun wallhack, Robrun cheat features, Robrun hacks',
  },
  '/products/robrun/loot-esp/': {
    title: 'Robrun Loot ESP | Weapons, Attachments & Gear PC',
    description:
      'Loot ESP for faster POI paths on Robrun PC. Filter weapons and attachments in one overlay module from the robruncheat.org product catalog.',
    keywords: 'Robrun gaming tools, Robrun ESP, Robrun game optimization',
  },
  '/products/robrun/no-recoil/': {
    title: 'Robrun No Recoil Module | Weapon Spray Control PC',
    description:
      'Per-weapon no recoil presets for tighter sprays in Robrun on PC. Tune strength so FPS and overlays stay stable before you buy through checkout.',
    keywords: 'Robrun game settings, Robrun performance optimization, Robrun aimbot',
  },
  '/products/robrun/stream-proof/': {
    title: 'Robrun Stream Proof Overlays | OBS-Safe Capture PC',
    description:
      'Stream-proof overlays for Robrun creators: hide ESP from capture while monitoring locally. Test capture scenes before ranked on Windows PC.',
    keywords: 'Robrun gaming software, Robrun cheat setup guide, stream proof robrun',
  },
  '/products/robrun/cloud-dma/': {
    title: 'Robrun Cloud DMA | Single-PC Hyper-V for PC Checkouts',
    description:
      'Cloud DMA for Robrun on one Windows PC: Hyper-V layer, no second tower, and merchant checkout for plans. Confirm your Windows edition before you buy.',
    keywords: 'Cloud DMA, Robrun hardware, single PC Hyper-V',
  },
  '/products/robrun/hwid-spoofer/': {
    title: 'HWID Spoofer for Robrun | PC Identity Reset Workflow',
    description:
      'HWID spoofer workflow for new Robrun accounts on the same Windows PC. Read limits, reinstall notes, then open checkout when the tool fits your case.',
    keywords: 'HWID spoofer, Robrun ban, PC fingerprint reset',
  },
  '/products/robrun/utilities/': {
    title: 'Robrun Utility Tools | Cloud DMA & HWID Options PC',
    description:
      'Compare Cloud DMA and HWID spoofer utilities for Robrun buyers. Match the tool to your hardware or account situation before secure checkout.',
    keywords: 'Robrun utilities, Cloud DMA, HWID spoofer',
  },
  '/blogs/': {
    title: 'Robrun Cheats — Guides & Articles | robruncheat.org',
    description:
      'Robrun cheats guides: buyer checklists, ESP and aimbot explainers, pricing, safety, FPS tips, compatibility, and patch notes for PC players.',
    keywords: 'robrun cheats guides, robrun esp guide, robrun aimbot guide',
  },
  '/forum/': {
    title: 'Robrun Cheats Forum | Aimbot, ESP & Setup Advice',
    description:
      'Robrun forum threads on module setup, aimbot tuning, ESP layouts, loader questions, and patch-day notes from Windows PC players.',
    keywords: 'Robrun cheat setup guide, Robrun troubleshooting guide',
  },
  '/reviews/': {
    title: 'Robrun Cheats Reviews | Ratings & Buyer Feedback PC',
    description:
      'Robrun Cheats customer ratings and feedback on modules, checkout, setup, and support from buyers using the PC catalog pages.',
    keywords: 'Robrun Cheats reviews, Robrun cheats reviews, Robrun Cheats customer feedback',
  },
  '/faq/': {
    title: 'Robrun Cheats FAQ | PC Setup, Loader & Checkout Help',
    description:
      'FAQ on Robrun software compatibility, PC requirements, cheat download rules, patch-day checks, and install steps for Windows players.',
    keywords: 'Robrun PC requirements, Robrun software compatibility, Robrun cheat setup',
  },
  '/support/': {
    title: 'Robrun Cheats Support | Install & Loader Help Desk',
    description:
      'Support for Robrun loader errors, lag after overlays, and checkout on robruncheat.org. Bring order email and PC specs when contacting the merchant.',
    keywords: 'Robrun troubleshooting guide, Robrun performance optimization',
  },
  '/about/': {
    title: 'About robruncheat.org | Robrun PC Module Catalog Hub',
    description:
      'Independent catalog for Robrun modules and PC gaming tools. We explain features; checkout and downloads run on the linked merchant store.',
    keywords: 'Robrun cheats, Robrun gaming tools, robruncheat.org',
  },
  '/terms/': {
    title: 'Terms of Use | robruncheat.org Robrun Module Site',
    description:
      'Terms for visitors using robruncheat.org pages, blogs, and forums before external checkout for Robrun modules and related utilities.',
  },
  '/privacy/': {
    title: 'Privacy Policy | robruncheat.org Visitor Information',
    description:
      'How robruncheat.org handles privacy for visitors browsing Robrun module pages, blogs, reviews, and support resources on this site.',
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
