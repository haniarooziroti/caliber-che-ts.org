/**
 * Domain migration: Robrun / robruncheat.org → Caliber Cheats / caliber-cheats.org
 * Run once: node scripts/caliber-cheats-org-migrate.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DOMAIN = 'caliber-cheats.org';
const ORIGIN = `https://${DOMAIN}`;
const PRODUCT_BASE = '/products/caliber/';
const CALIBER_STORE =
  'https://zadeyo.com/go/HANIA?to=%2Fproducts%2Fcaliber-novaxware';
const CLOUD_DMA_URL =
  'https://zadeyo.com/go/HANIA?to=%2Fproducts%2Fcloud-dma';
const HWID_SPOOFER_URL =
  'https://zadeyo.com/go/HANIA?to=%2Fproducts%2Fhwid-spoofer';
const WORKER_NAME = 'caliber-cheats-org';
const PREVIEW_WORKER_HOST = `${WORKER_NAME}.hania-rooziroti.workers.dev`;
const REPO_URL = 'git+https://github.com/haniarooziroti/caliber-che-ts.org.git';

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

const robrunProducts = path.join(ROOT, 'src/pages/products/robrun');
const caliberProducts = path.join(ROOT, 'src/pages/products/caliber');
if (fs.existsSync(robrunProducts) && !fs.existsSync(caliberProducts)) {
  fs.renameSync(robrunProducts, caliberProducts);
}

const gameplayDir = path.join(ROOT, 'public/images/gameplay');
if (fs.existsSync(gameplayDir)) {
  for (const name of fs.readdirSync(gameplayDir)) {
    if (name.startsWith('robrun-')) {
      const next = name.replace(/^robrun-/, 'caliber-');
      fs.renameSync(path.join(gameplayDir, name), path.join(gameplayDir, next));
    }
  }
}

write(
  path.join(ROOT, 'src/config/checkout-redirects.mjs'),
  `/** Affiliate checkout URLs — keep HANIA and encoded store paths exactly. */
const CALIBER_PRODUCT_URL = '${CALIBER_STORE}';
const CLOUD_DMA_URL = '${CLOUD_DMA_URL}';
const HWID_SPOOFER_URL = '${HWID_SPOOFER_URL}';

export const CHECKOUT_LINKS = {
  caliber: CALIBER_PRODUCT_URL,
  cloudDMA: CLOUD_DMA_URL,
  hwidSpoofer: HWID_SPOOFER_URL,
};

export const CHECKOUT_URLS = {
  caliber: CHECKOUT_LINKS.caliber,
  'cloud-dma': CHECKOUT_LINKS.cloudDMA,
  'hwid-spoofer': CHECKOUT_LINKS.hwidSpoofer,
};

export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/caliber', CHECKOUT_URLS.caliber],
  ['/go/caliber/', CHECKOUT_URLS.caliber],
  ['/go/store', CHECKOUT_URLS.caliber],
  ['/go/store/', CHECKOUT_URLS.caliber],
  ['/go/robrun', CHECKOUT_URLS.caliber],
  ['/go/robrun/', CHECKOUT_URLS.caliber],
  ['/go/apex', CHECKOUT_URLS.caliber],
  ['/go/apex/', CHECKOUT_URLS.caliber],
  ['/go/cloud-dma', CHECKOUT_URLS['cloud-dma']],
  ['/go/cloud-dma/', CHECKOUT_URLS['cloud-dma']],
  ['/go/hwid-spoofer', CHECKOUT_URLS['hwid-spoofer']],
  ['/go/hwid-spoofer/', CHECKOUT_URLS['hwid-spoofer']],
]);

export const LEGACY_SPLAT_REDIRECTS = [
  ['/products/robrun/*', '/products/caliber/:splat'],
  ['/products/apex-legends/*', '/products/caliber/:splat'],
];

export const LEGACY_PRODUCT_REDIRECTS = new Map([
  ['/products/rust-cheats/', '${PRODUCT_BASE}'],
  ['/products/apex-legends', '${PRODUCT_BASE}'],
  ['/products/apex-legends/', '${PRODUCT_BASE}'],
  ['/products/apex-hack/', '${PRODUCT_BASE}'],
  ['/products/cs2-cheats/', '${PRODUCT_BASE}'],
  ['/products/robrun/', '${PRODUCT_BASE}'],
  ['/products/robrun', '${PRODUCT_BASE.slice(0, -1)}'],
  ['/go/rust', CHECKOUT_URLS.caliber],
  ['/go/rust/', CHECKOUT_URLS.caliber],
  ['/go/cs2', CHECKOUT_URLS.caliber],
  ['/go/cs2/', CHECKOUT_URLS.caliber],
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
  path.join(ROOT, 'scripts/site-origin.mjs'),
  `/** Production origin for sitemap, RSS, canonicals, and post-build checks. */
export const SITE_DOMAIN = '${DOMAIN}';
export const SITE_ORIGIN = \`https://\${SITE_DOMAIN}\`;

/** Brand / host spellings that must never appear in dist/ or as SITE_DOMAIN. */
export const WRONG_DOMAIN_VARIANTS = [
  'calibercheat.net',
  'calibercheat.com',
  'www.calibercheat.net',
  'caliberche-t.net',
  'robruncheat.org',
  'www.robruncheat.org',
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
export const PREVIEW_WORKER_HOST = '${PREVIEW_WORKER_HOST}';

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
  "name": "${WORKER_NAME}",
  "compatibility_date": "2026-11-01",
  "build": {
    "command": "npm run build"
  },
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
  caliber: 'caliber',
  'cloud-dma': 'cloud-dma',
  'hwid-spoofer': 'hwid-spoofer',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Same-tab /go/ hops — middleware 302s to affiliate store URLs. */
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

write(
  path.join(ROOT, 'src/config/siteConfig.ts'),
  `import { PRODUCT_BASE, SITE_URL } from './site';
import { PRIMARY_CHECKOUT_PATH } from './checkout';

export const SITE_NAME = 'Caliber Cheats';
export { SITE_URL };
export const PRODUCT_URL = PRODUCT_BASE;
export const CHECKOUT_URL = PRIMARY_CHECKOUT_PATH;
export const FORUM_URL = '/forum/';
export const FAQ_URL = '/faq/';
export const SUPPORT_URL = '/support/';
export const REVIEWS_URL = '/reviews/';

export const OG_DEFAULT_IMAGE = '/images/gameplay/hero-poster.webp';
`,
);

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

write(
  path.join(ROOT, 'public/robots.txt'),
  `User-agent: *
Allow: /

Disallow: /go/

Sitemap: ${ORIGIN}/sitemap.xml
`,
);

const TEXT_REPLACEMENTS = [
  ['https://robruncheat.org', ORIGIN],
  ['robruncheat.org', DOMAIN],
  ['robruncheat-org', WORKER_NAME],
  ['Robrun Cheats', 'Caliber Cheats'],
  ['Robrun Cheat', 'Caliber Cheats'],
  ['robrun cheats', 'caliber cheats'],
  ['ROBRUN', 'CALIBER'],
  ['ROB RUN', 'Caliber'],
  ['Robrun', 'Caliber'],
  ['robrun', 'caliber'],
  ['/products/caliber/', PRODUCT_BASE],
  ['ROBRUN_MEDIA', 'CALIBER_MEDIA'],
  ['ROBRUN_HERO_POSTER', 'CALIBER_HERO_POSTER'],
  ['/images/gameplay/caliber-', '/images/gameplay/caliber-'],
  ['fetch-robrun-youtube-media', 'fetch-caliber-youtube-media'],
  ['https://zadeyo.com/go/HANIA?to=%2Fproducts%2Fcaliber', CALIBER_STORE],
  ['https://zadeyo.com/go/HANIA?to=%2Fproducts%2Fcaliber-novaxware', CALIBER_STORE],
  ['checkoutPath(\'caliber\')', "checkoutPath('caliber')"],
  ["checkoutPath('caliber')", "checkoutPath('caliber')"],
  ['%2Fproducts%2Fcaliber"', '%2Fproducts%2Fcaliber-novaxware"'],
  ['calibercheat.net', DOMAIN],
  ['https://calibercheat.net', ORIGIN],
];

const SKIP = new Set([
  'scripts/caliber-cheats-org-migrate.mjs',
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

let pkg = JSON.parse(read(path.join(ROOT, 'package.json')));
pkg.name = WORKER_NAME;
pkg.homepage = ORIGIN;
pkg.repository = { type: 'git', url: REPO_URL };
write(path.join(ROOT, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`);

let headers = read(path.join(ROOT, 'public/_headers'));
headers = headers.replace(/robruncheat-org\.hania-rooziroti\.workers\.dev/g, PREVIEW_WORKER_HOST);
headers = headers.replace(/production robruncheat\.org/g, `production ${DOMAIN}`);
write(path.join(ROOT, 'public/_headers'), headers);

console.log('caliber-cheats-org-migrate: done — run npm ci && npm run build');