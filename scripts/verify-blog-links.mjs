/** Post-build: scan dist/blogs HTML for internal hrefs, 404s, and workers.dev. */
import fs from 'node:fs';
import path from 'node:path';
import { resolveDistRoot } from './dist-root.mjs';
import { PREVIEW_WORKER_HOST } from './site-origin.mjs';

const dist = resolveDistRoot(process.cwd());

if (!fs.existsSync(dist)) {
  console.error('verify-blog-links: no dist/ directory — run build first');
  process.exit(1);
}

const hrefRe = /\shref=["']([^"'#]+)(?:#[^"']*)?["']/gi;

function walkHtml(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const ROOT_ASSET_EXT = new Set([
  '.ico',
  '.svg',
  '.png',
  '.webp',
  '.webmanifest',
  '.xml',
  '.txt',
  '.js',
  '.css',
]);

function distCandidates(href) {
  const pathname = href.split('#')[0].split('?')[0];
  const rel = pathname.replace(/^\//, '').replace(/\/$/, '');
  if (!rel) return [path.join(dist, 'index.html')];
  const ext = path.extname(rel).toLowerCase();
  if (ext && ROOT_ASSET_EXT.has(ext)) {
    return [path.join(dist, rel)];
  }
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const dirRel = withSlash.replace(/^\//, '');
  return [
    path.join(dist, dirRel, 'index.html'),
    path.join(dist, rel),
    path.join(dist, `${rel}/index.html`),
  ];
}

function resolveHrefToFile(href) {
  if (!href.startsWith('/') || href.startsWith('//')) return null;
  if (href.startsWith('/go/')) return null;
  for (const candidate of distCandidates(href)) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function expectedDistPath(href) {
  const candidates = distCandidates(href);
  return candidates[0]?.replace(/\\/g, '/');
}

const pages = walkHtml(dist);
const missing = [];
const workerHits = [];
const markdownHits = [];

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(dist, file).replace(/\\/g, '/');

  if (html.includes('workers.dev') || (PREVIEW_WORKER_HOST && html.includes(PREVIEW_WORKER_HOST))) {
    workerHits.push({ file: rel });
  }
  if (html.includes('](')) {
    markdownHits.push({ file: rel });
  }

  hrefRe.lastIndex = 0;
  let match;
  while ((match = hrefRe.exec(html))) {
    const href = match[1].split('?')[0];
    if (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('/go/') ||
      href === '/sitemap.xml' ||
      href === '/sitemap-index.xml' ||
      href.startsWith('/sitemap')
    ) {
      continue;
    }
    const resolved = resolveHrefToFile(href);
    if (resolved === null) {
      missing.push({ file: rel, href, expected: expectedDistPath(href) });
    }
  }
}

if (workerHits.length || missing.length || markdownHits.length) {
  console.error('verify-blog-links: FAILED');
  if (workerHits.length) {
    console.error(`  workers.dev references: ${workerHits.length}`);
    workerHits.slice(0, 15).forEach((x) => console.error(`    ${x.file}`));
  }
  if (markdownHits.length) {
    console.error(`  unrendered markdown ](: ${markdownHits.length}`);
    markdownHits.slice(0, 20).forEach((x) => console.error(`    ${x.file}`));
  }
  if (missing.length) {
    console.error(`  unresolved internal hrefs: ${missing.length}`);
    missing
      .slice(0, 30)
      .forEach((x) =>
        console.error(`    ${x.file} → ${x.href} (missing ${x.expected ?? 'dist file'})`),
      );
    if (missing.length > 30) console.error(`    ... and ${missing.length - 30} more`);
  }
  process.exit(1);
}

console.log(`verify-blog-links: OK (${pages.length} HTML files)`);
