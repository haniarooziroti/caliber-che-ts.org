/**
 * Production SEO validation — origin, sitemap, robots, schema placement, reviews integrity.
 * Run `npm run seo:check` for per-page title/description/H1 length audit.
 */
import fs from 'node:fs';
import path from 'node:path';
import { resolveDistRoot } from './dist-root.mjs';
import { SITE_DOMAIN, SITE_ORIGIN, assertSiteOrigin } from './site-origin.mjs';

assertSiteOrigin();

if (SITE_ORIGIN !== `https://${SITE_DOMAIN}`) {
  console.error(`validate-seo: SITE_ORIGIN must be https://${SITE_DOMAIN} (got ${SITE_ORIGIN})`);
  process.exit(1);
}

const root = process.cwd();
const dist = resolveDistRoot(root);
const robots = path.join(dist, 'robots.txt');
const sitemap = path.join(dist, 'sitemap.xml');
const issues = [];

const BANNED_IN_PUBLIC_HTML = [
  /\bRust page not found\b/i,
  /\bForum: Rust\b/i,
  /levocheats\.com/i,
  /cheatsrust\.org/i,
  /products\/rust-cheats\//i,
];

function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkHtml(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

function scanFile(file, label) {
  if (!fs.existsSync(file)) {
    issues.push(`${label} missing`);
    return;
  }
  const text = fs.readFileSync(file, 'utf8');
  if (text.includes('workers.dev')) issues.push(`${label} contains workers.dev`);
  if (!text.includes(SITE_ORIGIN) && label === 'sitemap.xml') {
    issues.push('sitemap.xml must use production absolute URLs');
  }
}

scanFile(robots, 'robots.txt');
scanFile(sitemap, 'sitemap.xml');

if (!fs.existsSync(sitemap)) issues.push('sitemap.xml missing');
else {
  const sm = fs.readFileSync(sitemap, 'utf8');
  if (!sm.includes('/blogs/')) issues.push('sitemap.xml should list /blogs/');
  const blogPosts = (sm.match(/\/blogs\/[^<]+\//g) ?? []).length;
  if (blogPosts < 12) issues.push(`sitemap should include 12 blog articles (found ${blogPosts})`);
  if (sm.includes('/forum/')) issues.push('sitemap must not list /forum/ (noindex)');
  if (sm.includes('rust-cheats')) issues.push('sitemap must not list rust-cheats paths');
}

const blogIndex = path.join(dist, 'blogs', 'index.html');
if (!fs.existsSync(blogIndex)) issues.push('dist/blogs/index.html missing');

const notFound = path.join(dist, '404.html');
if (fs.existsSync(notFound)) {
  const nf = fs.readFileSync(notFound, 'utf8');
  if (!/<h1[^>]*>[\s\S]*?Page not found/i.test(nf)) {
    issues.push('404.html H1 must be "Page not found"');
  }
}

const reviewsHtml = path.join(dist, 'reviews', 'index.html');
if (fs.existsSync(reviewsHtml)) {
  const rv = fs.readFileSync(reviewsHtml, 'utf8');
  if (/data-review-item/i.test(rv) && !/No customer reviews have been published yet/i.test(rv)) {
    issues.push('reviews/index.html must not render review items without published data');
  }
  if (/demo\.fixture/i.test(rv)) issues.push('reviews HTML must not reference demo.fixture');
}

const homeHtml = path.join(dist, 'index.html');
if (fs.existsSync(homeHtml)) {
  const home = fs.readFileSync(homeHtml, 'utf8');
  if (/"@type"\s*:\s*"FAQPage"/i.test(home) || home.includes('FAQPage')) {
    issues.push('homepage must not include FAQPage JSON-LD');
  }
}

const faqHtml = path.join(dist, 'faq', 'index.html');
if (fs.existsSync(faqHtml)) {
  const faq = fs.readFileSync(faqHtml, 'utf8');
  if (!/"@type"\s*:\s*"FAQPage"/i.test(faq) && !faq.includes('FAQPage')) {
    issues.push('/faq/ must include FAQPage JSON-LD');
  }
}

for (const rel of ['forum/index.html', ...walkHtml(path.join(dist, 'forum'), []).map((f) => path.relative(dist, f))]) {
  const forumFile = path.join(dist, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(forumFile)) continue;
  const html = fs.readFileSync(forumFile, 'utf8');
  const hasLd = html.includes('application/ld+json');
  if (hasLd) issues.push(`${rel} is noindex but still emits JSON-LD`);
}

const htmlFiles = walkHtml(dist);
for (const file of htmlFiles) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  if (rel === '404.html') continue;
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('workers.dev')) issues.push(`${rel} contains workers.dev in output`);
  for (const re of BANNED_IN_PUBLIC_HTML) {
    if (re.test(html)) {
      issues.push(`${rel} contains banned legacy content (${re})`);
      break;
    }
  }
}

const orgCheck = path.join(dist, 'index.html');
if (fs.existsSync(orgCheck)) {
  const idx = fs.readFileSync(orgCheck, 'utf8');
  if (!idx.includes('favicon-v2-512.png')) {
    issues.push('Organization logo should reference favicon-v2-512.png');
  }
}

if (issues.length) {
  console.error('validate-seo: FAILED');
  issues.forEach((i) => console.error(`  ${i}`));
  process.exit(1);
}

console.log(`validate-seo: OK (origin ${SITE_ORIGIN}, ${htmlFiles.length} HTML files scanned)`);
