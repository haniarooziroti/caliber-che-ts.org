/**
 * Robrun Cheats rebrand for robruncheat.org — run: node scripts/robrun-rebrand.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DOMAIN = 'robruncheat.org';
const ORIGIN = `https://${DOMAIN}`;
const PRODUCT_BASE = '/products/robrun/';
const STORE_URL = 'https://zadeyo.com/go/HANIA?to=%2Fproducts%2Frobrun';

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

const caliberProducts = path.join(ROOT, 'src/pages/products/caliber');
const robrunProducts = path.join(ROOT, 'src/pages/products/robrun');
if (fs.existsSync(caliberProducts) && !fs.existsSync(robrunProducts)) {
  fs.renameSync(caliberProducts, robrunProducts);
}

const gameplayDir = path.join(ROOT, 'public/images/gameplay');
if (fs.existsSync(gameplayDir)) {
  for (const name of fs.readdirSync(gameplayDir)) {
    if (name.startsWith('caliber-')) {
      const next = name.replace(/^caliber-/, 'robrun-');
      fs.renameSync(path.join(gameplayDir, name), path.join(gameplayDir, next));
    }
  }
}

write(
  path.join(ROOT, 'src/config/checkout-redirects.mjs'),
  `/** Affiliate checkout URLs — keep HANIA and the encoded \`to\` path exactly. */
const ROBRUN_PRODUCT_URL = '${STORE_URL}';

export const CHECKOUT_LINKS = {
  robrun: ROBRUN_PRODUCT_URL,
};

export const CHECKOUT_URLS = {
  robrun: CHECKOUT_LINKS.robrun,
};

export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/robrun', CHECKOUT_URLS.robrun],
  ['/go/robrun/', CHECKOUT_URLS.robrun],
  ['/go/store', CHECKOUT_URLS.robrun],
  ['/go/store/', CHECKOUT_URLS.robrun],
  ['/go/caliber', CHECKOUT_URLS.robrun],
  ['/go/caliber/', CHECKOUT_URLS.robrun],
  ['/go/apex', CHECKOUT_URLS.robrun],
  ['/go/apex/', CHECKOUT_URLS.robrun],
]);

export const LEGACY_PRODUCT_REDIRECTS = new Map([
  ['/products/rust-cheats/', '${PRODUCT_BASE}'],
  ['/products/apex-legends/', '${PRODUCT_BASE}'],
  ['/products/apex-hack/', '${PRODUCT_BASE}'],
  ['/products/cs2-cheats/', '${PRODUCT_BASE}'],
  ['/products/caliber/', '${PRODUCT_BASE}'],
  ['/products/caliber', '${PRODUCT_BASE.slice(0, -1)}'],
  ['/go/rust', CHECKOUT_URLS.robrun],
  ['/go/rust/', CHECKOUT_URLS.robrun],
  ['/go/cs2', CHECKOUT_URLS.robrun],
  ['/go/cs2/', CHECKOUT_URLS.robrun],
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
export const TITLE_PREFIX = 'Robrun';

export const DISCORD_URL = 'https://discord.com/invite/Vu85F8auQS';
`,
);

write(
  path.join(ROOT, 'scripts/site-origin.mjs'),
  `/** Production origin for sitemap, RSS, canonicals, and post-build checks. */
export const SITE_DOMAIN = '${DOMAIN}';
export const SITE_ORIGIN = \`https://\${SITE_DOMAIN}\`;

/** Brand / host spellings that must never appear in dist/ or as SITE_DOMAIN. */
export const WRONG_DOMAIN_VARIANTS = [
  'calibercheat.net',
  'calibercheat.com',
  'www.calibercheat.net',
  'cheatsrust.com',
  'cheatsrust.net',
  'cheats-rust.org',
  'apex-cheats.org',
  'cs2-cheats.org',
  'valorant-cheats.org',
  'eft-cheats.org',
  'www.${DOMAIN}',
];

/** Workers preview — only allowed in dist/_headers (see wrangler.jsonc "name"). */
export const PREVIEW_WORKER_HOST = 'robruncheat-org.hania-rooziroti.workers.dev';

export function resolveSiteOrigin(env = process.env) {
  const raw = env.PUBLIC_SITE_ORIGIN?.trim();
  if (raw && raw.includes('workers.dev')) {
    throw new Error(
      'PUBLIC_SITE_ORIGIN must not contain workers.dev. Use ${ORIGIN} for production origin.',
    );
  }
  if (raw && (raw.includes('localhost') || raw.includes('127.0.0.1') || raw.includes('pages.dev'))) {
    throw new Error('PUBLIC_SITE_ORIGIN must be the production host ${ORIGIN}.');
  }
  if (env.NODE_ENV === 'production' && env.CI === 'true' && !raw) {
    console.warn('validate-seo: CI build without PUBLIC_SITE_ORIGIN — using default ${DOMAIN}');
  }
  return SITE_ORIGIN;
}

export function assertSiteOrigin(env = process.env) {
  resolveSiteOrigin(env);
}
`,
);

write(
  path.join(ROOT, 'wrangler.jsonc'),
  `{
  "name": "robruncheat-org",
  "compatibility_date": "2026-11-01",
  "assets": {
    "directory": "./dist",
    "html_handling": "auto-trailing-slash",
    "not_found_handling": "404-page"
  }
}
`,
);

write(
  path.join(ROOT, 'src/config/checkout.ts'),
  `import { CHECKOUT_URLS } from './checkout-redirects.mjs';

export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  robrun: 'robrun',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Direct affiliate URL for this product. Legacy \`/go/\` paths still 302 here. */
export function checkoutPath(product: CheckoutProduct = 'robrun'): string {
  return CHECKOUT[product];
}

export const PRIMARY_CHECKOUT_PATH = checkoutPath('robrun');

export function checkoutForSlug(_slug: string): string {
  return checkoutPath('robrun');
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

write(
  path.join(ROOT, 'src/config/siteConfig.ts'),
  `import { PRODUCT_BASE, SITE_URL } from './site';
import { PRIMARY_CHECKOUT_PATH } from './checkout';

export const SITE_NAME = 'Robrun Cheats';
export { SITE_URL };
export const PRODUCT_URL = PRODUCT_BASE;
export const CHECKOUT_URL = PRIMARY_CHECKOUT_PATH;
export const FORUM_URL = '/forum/';
export const FAQ_URL = '/faq/';
export const SUPPORT_URL = '/support/';
export const REVIEWS_URL = '/reviews/';

export const OG_DEFAULT_IMAGE = '/images/gameplay/c01.webp';
`,
);

write(
  path.join(ROOT, 'src/config/affiliate.ts'),
  `/** Checkout hops use direct affiliate URLs — no special rel on links. */
export const AFFILIATE_REL = undefined;

export const AFFILIATE_DISCLOSURE_SHORT =
  'Affiliate disclosure: checkout links may earn us a commission.';

export const AFFILIATE_DISCLOSURE_LONG =
  'Affiliate disclosure: purchase links on this site route through an affiliate checkout path. Prices, keys, refunds, and post-purchase support are handled by the linked store, not by ${DOMAIN}.';

export function isAffiliateHref(href: string | undefined): boolean {
  if (!href) return false;
  return href.includes('zadeyo.com/go/');
}

export function affiliateRel(_href: string | undefined): string | undefined {
  return undefined;
}
`,
);

const TEXT_REPLACEMENTS = [
  ['calibercheat.net', DOMAIN],
  ['calibercheat-net', 'robruncheat-org'],
  ['Calibercheat.net', DOMAIN],
  ['Caliber Cheat', 'Robrun Cheats'],
  ['Caliber Cheats', 'Robrun Cheats'],
  ['caliber cheats', 'robrun cheats'],
  ['CALIBER', 'ROBRUN'],
  ['Caliber', 'Robrun'],
  ['caliber', 'robrun'],
  ['/products/robrun/', PRODUCT_BASE],
  ['CALIBER_MEDIA', 'ROBRUN_MEDIA'],
  ['/images/gameplay/robrun-', '/images/gameplay/robrun-'],
  ['how-to-use-robrun-cheats-loader', 'robrun-loader-setup'],
  ['robrun-legends-cheat-features-overview', 'robrun-cheat-features-overview'],
  ['buying-robrun-aimbot-checklist', 'buying-robrun-aimbot-checklist'],
  ['robrun-gaming-software-buyers-guide', 'robrun-cheats-buying-guide'],
  ['best-robrun-gaming-tools-pc', 'best-robrun-cheats-pc'],
  ['robrun-software-pricing-guide', 'robrun-cheats-pricing'],
  ['free-vs-paid-robrun-tools', 'robrun-free-vs-paid'],
  ['robrun-pc-optimization-guide', 'robrun-pc-optimization'],
  ['robrun-fps-guide', 'robrun-fps-guide'],
  ['robrun-software-safety-guide', 'robrun-cheats-safety'],
  ['robrun-season-updates-pc', 'robrun-updates-compatibility'],
  ['robrun-gaming-tools-compared', 'robrun-cheats-comparison'],
  ['best-aim-trainers-robrun', 'robrun-aim-training-tips'],
  ['robrun-beginners-guide', 'robrun-beginners-guide'],
  ['robrun-pc-requirements-guide', 'robrun-pc-requirements'],
  ['/go/robrun/', '/go/robrun/'],
  ["checkoutPath('robrun')", "checkoutPath('robrun')"],
  ['caliber-novaxware', 'robrun'],
  ['Novaxware', ''],
  ['BattlEye', 'anti-cheat'],
  ['1C Game Studios', 'ROB RUN'],
  ['urban map', 'open-world district'],
  ['PvP modes', 'heist modes'],
  ['special ops', 'chase sequences'],
  ['undetected', 'stable'],
  ['Undetected', 'Stable'],
  ['low-profile', 'stable'],
  ['Low-profile', 'Stable'],
];

const SKIP = new Set([
  'scripts/robrun-rebrand.mjs',
  'scripts/caliber-rebrand.mjs',
  'scripts/verify-banned-terms.mjs',
  'src/config/checkout-redirects.mjs',
  'scripts/site-origin.mjs',
]);

const files = walk(
  ROOT,
  (name, full) => {
    const rel = path.relative(ROOT, full).replace(/\\/g, '/');
    if (SKIP.has(rel)) return false;
    if (rel.includes('node_modules') || rel.startsWith('dist/')) return false;
    return /\.(ts|tsx|astro|mjs|json|css|md|txt|svg|webmanifest|html|jsonc)$/i.test(name);
  },
);

for (const file of files) {
  let text = read(file);
  const next = replaceAll(text, TEXT_REPLACEMENTS);
  if (next !== text) write(file, next);
}

console.log('robrun-rebrand: done — run npm install && npm run build');
