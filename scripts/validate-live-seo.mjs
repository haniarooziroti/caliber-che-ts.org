/**
 * Live SEO checks against production custom domain and Workers preview hosts.
 * Network failures mark checks UNVERIFIED — they do not fail CI unless LIVE_SEO_STRICT=1.
 */
import { PREVIEW_WORKER_HOST, SITE_DOMAIN, SITE_ORIGIN } from './site-origin.mjs';

const STRICT = process.env.LIVE_SEO_STRICT === '1';
const TIMEOUT_MS = 15000;

async function fetchText(url, init = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: ctrl.signal, ...init });
    const text = await res.text();
    return { ok: res.ok, status: res.status, headers: res.headers, text, url: res.url };
  } finally {
    clearTimeout(timer);
  }
}

function headerGet(headers, name) {
  return headers.get(name) ?? headers.get(name.toLowerCase()) ?? '';
}

const report = { passed: [], unverified: [], failed: [] };

function pass(msg) {
  report.passed.push(msg);
  console.log(`  OK  ${msg}`);
}
function fail(msg) {
  report.failed.push(msg);
  console.error(` FAIL ${msg}`);
}
function unverified(msg) {
  report.unverified.push(msg);
  console.warn(`  ??  ${msg}`);
}

console.log(`validate-live-seo: domain ${SITE_DOMAIN}\n`);

try {
  const home = await fetchText(`${SITE_ORIGIN}/`);
  if (home.status === 200) {
    pass(`Homepage HTTP ${home.status} at ${SITE_ORIGIN}/`);
    if (/noindex/i.test(home.text.match(/name=["']robots["'][^>]*content=["']([^"']+)"/i)?.[1] ?? '')) {
      fail('Production homepage must not be noindex');
    } else {
      pass('Production homepage robots allows indexing');
    }
    const canon = home.text.match(/rel=["']canonical["'][^>]*href=["']([^"']+)"/i)?.[1];
    if (canon?.startsWith(SITE_ORIGIN)) pass(`Production canonical: ${canon}`);
    else fail(`Production canonical missing or wrong (got ${canon ?? 'none'})`);
  } else {
    fail(`Homepage HTTP ${home.status} at ${SITE_ORIGIN}/`);
  }
} catch (e) {
  unverified(`Homepage fetch failed: ${e.message}`);
}

try {
  const robots = await fetchText(`${SITE_ORIGIN}/robots.txt`);
  if (robots.status === 200 && robots.text.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) {
    pass('robots.txt advertises production sitemap');
  } else if (robots.status === 200) {
    fail('robots.txt missing production sitemap line');
  } else {
    fail(`robots.txt HTTP ${robots.status}`);
  }
} catch (e) {
  unverified(`robots.txt fetch failed: ${e.message}`);
}

try {
  const sm = await fetchText(`${SITE_ORIGIN}/sitemap.xml`);
  if (sm.status === 200) {
    if (sm.text.includes('workers.dev')) fail('Live sitemap contains workers.dev');
    else pass('Live sitemap has no workers.dev URLs');
    if (!sm.text.includes(SITE_ORIGIN)) fail('Live sitemap missing production origin URLs');
    else pass('Live sitemap uses production origin');
  } else {
    fail(`sitemap.xml HTTP ${sm.status}`);
  }
} catch (e) {
  unverified(`sitemap.xml fetch failed: ${e.message}`);
}

const previewUrl = `https://${PREVIEW_WORKER_HOST}/`;
try {
  const preview = await fetchText(previewUrl);
  if (preview.status === 200 || preview.status === 304) {
    const xRobots = headerGet(preview.headers, 'x-robots-tag');
    if (/noindex/i.test(xRobots)) pass(`Preview X-Robots-Tag: ${xRobots}`);
    else unverified(`Preview missing X-Robots-Tag noindex (got "${xRobots}")`);
    const robotsMeta =
      preview.text.match(/name=["']robots["'][^>]*content=["']([^"']+)"/i)?.[1] ?? '';
    if (/noindex/i.test(robotsMeta)) pass('Preview HTML robots meta is noindex');
    else
      unverified(
        'Preview HTML may still advertise index until crawlers run inline host script (X-Robots-Tag is primary)',
      );
  } else {
    unverified(`Preview host HTTP ${preview.status} at ${previewUrl}`);
  }
} catch (e) {
  unverified(`Preview fetch failed (${previewUrl}): ${e.message}`);
}

console.log(
  `\nvalidate-live-seo summary: ${report.passed.length} passed, ${report.failed.length} failed, ${report.unverified.length} unverified`,
);

if (report.failed.length) {
  process.exit(STRICT ? 1 : 0);
}

if (STRICT && report.unverified.length) {
  console.error('LIVE_SEO_STRICT=1 and some checks were unverified');
  process.exit(1);
}

process.exit(0);
