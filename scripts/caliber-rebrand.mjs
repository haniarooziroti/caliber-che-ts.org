/**
 * Caliber Cheat rebrand for calibercheat.net — run once: node scripts/caliber-rebrand.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DOMAIN = 'calibercheat.net';
const ORIGIN = `https://${DOMAIN}`;
const PRODUCT_BASE = '/products/caliber/';
const STORE_URL =
  'https://zadeyo.com/go/HANIA?to=%2Fproducts%2Fcaliber-novaxware';

function read(p) {
  return fs.readFileSync(p, 'utf8');
}

function write(p, content) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
}

function walk(dir, pred, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory() && !['node_modules', 'dist', '.git', '.astro'].includes(name)) {
      walk(full, pred, out);
    } else if (st.isFile() && pred(name, full)) out.push(full);
  }
  return out;
}

function replaceAll(text, pairs) {
  let next = text;
  for (const [from, to] of pairs) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

// Rename product routes folder
const apexProducts = path.join(ROOT, 'src/pages/products/apex-legends');
const caliberProducts = path.join(ROOT, 'src/pages/products/caliber');
if (fs.existsSync(apexProducts) && !fs.existsSync(caliberProducts)) {
  fs.renameSync(apexProducts, caliberProducts);
}

// Rename gameplay images apex-* -> caliber-*
const gameplayDir = path.join(ROOT, 'public/images/gameplay');
if (fs.existsSync(gameplayDir)) {
  for (const name of fs.readdirSync(gameplayDir)) {
    if (name.startsWith('apex-')) {
      const next = name.replace(/^apex-/, 'caliber-');
      fs.renameSync(path.join(gameplayDir, name), path.join(gameplayDir, next));
    }
  }
}

// Remove template leftovers
const stale = [
  path.join(ROOT, 'apex-hack-org'),
  path.join(ROOT, 'scripts/apex-bootstrap.mjs'),
];
for (const p of stale) {
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
  }
}

write(
  path.join(ROOT, 'src/config/checkout-redirects.mjs'),
  `/** Store destinations — buy buttons use internal /go/ paths only (same-tab 302). */
const STORE_URL = '${STORE_URL}';

export const CHECKOUT_URLS = {
  caliber: STORE_URL,
  'cloud-dma': STORE_URL,
  'hwid-spoofer': STORE_URL,
};

export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/caliber', CHECKOUT_URLS.caliber],
  ['/go/caliber/', CHECKOUT_URLS.caliber],
  ['/go/store', CHECKOUT_URLS.caliber],
  ['/go/store/', CHECKOUT_URLS.caliber],
  ['/go/cloud-dma', CHECKOUT_URLS['cloud-dma']],
  ['/go/cloud-dma/', CHECKOUT_URLS['cloud-dma']],
  ['/go/hwid-spoofer', CHECKOUT_URLS['hwid-spoofer']],
  ['/go/hwid-spoofer/', CHECKOUT_URLS['hwid-spoofer']],
  ['/go/apex', CHECKOUT_URLS.caliber],
  ['/go/apex/', CHECKOUT_URLS.caliber],
]);

export const LEGACY_PRODUCT_REDIRECTS = new Map([
  ['/products/rust-cheats/', '${PRODUCT_BASE}'],
  ['/products/apex-legends/', '${PRODUCT_BASE}'],
  ['/products/apex-hack/', '${PRODUCT_BASE}'],
  ['/products/cs2-cheats/', '${PRODUCT_BASE}'],
  ['/go/rust', CHECKOUT_URLS.caliber],
  ['/go/rust/', CHECKOUT_URLS.caliber],
  ['/go/cs2', CHECKOUT_URLS.caliber],
  ['/go/cs2/', CHECKOUT_URLS.caliber],
  ['/go/apex', CHECKOUT_URLS.caliber],
  ['/go/apex/', CHECKOUT_URLS.caliber],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;
  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(\`\${pathname}/\`) ?? null;
  }
  return null;
}

export function resolveLegacyProductRedirect(pathname) {
  const direct = LEGACY_PRODUCT_REDIRECTS.get(pathname);
  if (direct) return direct;
  if (pathname !== '/' && !pathname.endsWith('/')) {
    return LEGACY_PRODUCT_REDIRECTS.get(\`\${pathname}/\`) ?? null;
  }
  return null;
}
`,
);

write(
  path.join(ROOT, 'src/config/site.ts'),
  `const envOrigin = (import.meta.env.PUBLIC_SITE_ORIGIN as string | undefined)?.trim();
if (envOrigin && envOrigin.includes('workers.dev')) {
  throw new Error(
    'PUBLIC_SITE_ORIGIN must not contain workers.dev. Use ${ORIGIN} for production origin.',
  );
}

export const SITE_DOMAIN = '${DOMAIN}';
export const SITE_URL = '${ORIGIN}';
export const PRODUCT_BASE = '${PRODUCT_BASE}';
export const TITLE_PREFIX = 'Caliber';

export const DISCORD_URL = 'https://discord.com/invite/Vu85F8auQS';
`,
);

write(
  path.join(ROOT, 'wrangler.jsonc'),
  `{
  "name": "calibercheat-net",
  "compatibility_date": "2026-11-01",
  "assets": {
    "directory": "./dist",
    "html_handling": "auto-trailing-slash",
    "not_found_handling": "404-page"
  }
}
`,
);

const TEXT_REPLACEMENTS = [
  ['apex-cheats.org', DOMAIN],
  ['apex-cheats-org', 'calibercheat-net'],
  ['/products/apex-legends/', PRODUCT_BASE],
  ['products/apex-legends', 'products/caliber'],
  ['APEX_MEDIA', 'CALIBER_MEDIA'],
  ['/images/gameplay/apex-', '/images/gameplay/caliber-'],
  ['how-to-use-apex-cheats-loader', 'caliber-loader-setup'],
  ['apex-legends-cheat-features-overview', 'caliber-cheat-features-overview'],
  ['buying-apex-aimbot-checklist', 'buying-caliber-aimbot-checklist'],
  ['apex-gaming-software-buyers-guide', 'caliber-cheats-buying-guide'],
  ['best-apex-gaming-tools-pc', 'best-caliber-cheats-pc'],
  ['apex-software-pricing-guide', 'caliber-cheats-pricing'],
  ['free-vs-paid-apex-tools', 'caliber-free-vs-paid'],
  ['apex-pc-optimization-guide', 'caliber-pc-optimization'],
  ['apex-fps-guide', 'caliber-fps-guide'],
  ['apex-software-safety-guide', 'caliber-cheats-safety'],
  ['apex-season-updates-pc', 'caliber-updates-compatibility'],
  ['apex-gaming-tools-compared', 'caliber-cheats-comparison'],
  ['best-aim-trainers-apex', 'caliber-aim-training-tips'],
  ['apex-beginners-guide', 'caliber-beginners-guide'],
  ['apex-pc-requirements-guide', 'caliber-pc-requirements'],
  ['Apex Aimbot', 'Caliber Aimbot'],
  ['Apex Legends', 'Caliber'],
  ['apex legends', 'caliber'],
  ['Apex', 'Caliber'],
  ['/go/apex/', '/go/caliber/'],
  ['/go/apex', '/go/caliber'],
  ["checkoutPath('apex')", "checkoutPath('caliber')"],
  ['checkoutPath("apex")', 'checkoutPath("caliber")'],
  ["apex: 'apex'", "caliber: 'caliber'"],
  ['EAC', 'BattlEye'],
  ['Respawn', '1C Game Studios'],
  ['Kings Canyon', 'urban map'],
  ['Arenas', 'PvP modes'],
  ['Mixtape', 'special ops'],
  ['undetected', 'stable'],
  ['Undetected', 'Stable'],
  ['low-profile', 'stable'],
  ['Low-profile', 'Stable'],
  ['zadeyo.com', 'merchant.example'],
  ['Zadeyo', ''],
];

const SKIP = new Set([
  'scripts/caliber-rebrand.mjs',
  'scripts/verify-banned-terms.mjs',
  'src/config/checkout-redirects.mjs',
]);

const files = walk(
  ROOT,
  (name, full) => {
    const rel = path.relative(ROOT, full).replace(/\\/g, '/');
    if (SKIP.has(rel)) return false;
    if (rel.includes('node_modules') || rel.startsWith('dist/')) return false;
    return /\.(ts|tsx|astro|mjs|json|css|md|txt|svg|webmanifest|html)$/i.test(name);
  },
);

for (const file of files) {
  let text = read(file);
  const next = replaceAll(text, TEXT_REPLACEMENTS);
  if (next !== text) write(file, next);
}

// verify-banned-terms — ban legacy games + apex + zadeyo + undetected
const verifyPath = path.join(ROOT, 'scripts/verify-banned-terms.mjs');
let verify = read(verifyPath);
if (!verify.includes("'Apex Legends'")) {
  verify = verify.replace(
    "const FAIL_TERMS = [",
    `const FAIL_TERMS = [
  'Apex Legends',
  'apex-cheats',
  'Apex',
  'zadeyo',
  'undetected',
  'Novaxware',
`,
  );
  write(verifyPath, verify);
}

// affiliate — no merchant name in visible copy
write(
  path.join(ROOT, 'src/config/affiliate.ts'),
  `/** Checkout hops use same-tab /go/ redirects — no special rel on links. */
export const AFFILIATE_REL = undefined;

export const AFFILIATE_DISCLOSURE_SHORT =
  'Affiliate disclosure: checkout links may earn us a commission.';

export const AFFILIATE_DISCLOSURE_LONG =
  'Affiliate disclosure: purchase links on this site route through an affiliate checkout path. Prices, keys, refunds, and post-purchase support are handled by the linked store, not by ${DOMAIN}.';

export function isAffiliateHref(href: string | undefined): boolean {
  if (!href) return false;
  return href.includes('/go/');
}

export function affiliateRel(_href: string | undefined): string | undefined {
  return undefined;
}
`,
);

// siteConfig
write(
  path.join(ROOT, 'src/config/siteConfig.ts'),
  `import { PRODUCT_BASE, SITE_URL } from './site';
import { PRIMARY_CHECKOUT_PATH } from './checkout';

export const SITE_NAME = 'Caliber Cheat';
export { SITE_URL };
export const PRODUCT_URL = PRODUCT_BASE;
export const CHECKOUT_URL = PRIMARY_CHECKOUT_PATH;
export const FORUM_URL = '/forum/';
export const FAQ_URL = '/faq/';
export const SUPPORT_URL = '/support/';
export const REVIEWS_URL = '/reviews/';

export const PRICE_WEEKLY = 15;
export const PRICE_MONTHLY = 30;
export const PRICE_LIFETIME = 120;

export const OG_DEFAULT_IMAGE = '/images/gameplay/c01.webp';

export function breakEvenMonths(): number {
  return Math.ceil(PRICE_LIFETIME / PRICE_MONTHLY);
}
`,
);

// checkout.ts
write(
  path.join(ROOT, 'src/config/checkout.ts'),
  `import { CHECKOUT_URLS } from './checkout-redirects.mjs';

export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  caliber: 'caliber',
  'cloud-dma': 'cloud-dma',
  'hwid-spoofer': 'hwid-spoofer',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

export function checkoutPath(product: CheckoutProduct = 'caliber'): string {
  return \`/go/\${CHECKOUT_SLUGS[product]}/\`;
}

export const PRIMARY_CHECKOUT_PATH = checkoutPath('caliber');

const SLUG_CHECKOUT_PRODUCT: Record<string, CheckoutProduct> = {
  'cloud-dma': 'cloud-dma',
  'hwid-spoofer': 'hwid-spoofer',
};

export function checkoutForSlug(slug: string): string {
  const product = SLUG_CHECKOUT_PRODUCT[slug];
  return product ? checkoutPath(product) : checkoutPath('caliber');
}

export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    return href.startsWith('/') ? href : \`/\${href}\`;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(\`\${url}?\`) || href.startsWith(\`\${url}/\`)) {
      return checkoutPath(product);
    }
  }

  return href;
}
`,
);

// Restore real store URL in checkout-redirects only (affiliate replaced merchant.example in bulk)
let cr = read(path.join(ROOT, 'src/config/checkout-redirects.mjs'));
cr = cr.replace(/merchant\.example/g, 'zadeyo.com');
write(path.join(ROOT, 'src/config/checkout-redirects.mjs'), cr);

for (const file of walk(ROOT, (n) => n === 'checkout-redirects.mjs')) {
  const rel = path.relative(ROOT, file);
  if (rel.includes('src/config')) {
    let t = read(file);
    t = t.replace(/merchant\.example/g, 'zadeyo.com');
    write(file, t);
  }
}

console.log('caliber-rebrand: done — run npm install && npm run build');
