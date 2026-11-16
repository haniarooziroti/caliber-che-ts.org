/**
 * Fail the build if published HTML, JSON-LD, the web manifest, or sitemap/rss
 * still name another game, or if source files contain banned legacy terms.
 */
import fs from 'node:fs';
import path from 'node:path';
import { resolveDistRoot } from './dist-root.mjs';

const root = process.cwd();
const dist = resolveDistRoot(root);

const FAIL_TERMS = [
  'Robrun',
  'robruncheat',
  'caliberche-t.net',
  'Apex Legends',
  'apex-cheats',
  'Apex',
  'zadeyo',
  'undetected',
  'bypass',
  'safe',
  'levocheats',
  'cheatsrust',
  'apexhack',
  'CS2',
  'Counter-Strike',
  'CS:GO',
  'Inferno',
  'Anubis',
  'Mirage',
  'Valorant',
  'Rainbow Six',
  'MW4',
  'Warzone',
  'Battlefield',
  'Wardogs',
  'Delta Force',
  'Dota 2',
  'Dota',
  'Valve',
  'VAC',
  'Faceit',
  'Wingman',
  'Deathmatch',
  'ARK Survival',
  'Ascended',
];

const WARN_TERMS = ['R6', 'Dust', 'Ancient', 'Premier', 'Turbo', 'Nuke', 'Overpass'];

const SOURCE_SCAN_ROOTS = [
  path.join(root, 'src'),
  path.join(root, '.env.example'),
  path.join(root, 'docs'),
];

const SOURCE_EXCLUDE_FILES = new Set(
  [
    'public/_redirects',
    'scripts/redirects.mjs',
    'src/config/checkout-redirects.mjs',
    'src/utils/path.ts',
    'src/config/sitemap.ts',
    'astro.config.mjs',
    'scripts/site-origin.mjs',
    'scripts/rust-rebrand.mjs',
    'scripts/verify-banned-terms.mjs',
    'scripts/caliber-rebrand.mjs',
    'scripts/caliber-cheats-org-migrate.mjs',
    'scripts/robrun-rebrand.mjs',
    'scripts/check-leftovers.mjs',
  ].map((p) => p.replace(/\\/g, '/')),
);

const STARWIND_SEG = `${path.sep}src${path.sep}components${path.sep}starwind${path.sep}`;

function walk(dir, pred, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, pred, out);
    else if (pred(name, full)) out.push(full);
  }
  return out;
}

function boundary(term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?<![A-Za-z0-9])${escaped}(?![A-Za-z0-9])`, 'i');
}

const ARK_RE = /(?<![A-Za-z0-9])ARK(?![A-Za-z0-9])/;

function scannableHtml(html) {
  const chunks = [];
  const withoutCheckoutHrefs = html.replace(/\bhref=(["'])[\s\S]*?\1/gi, 'href=$1$1');
  html = withoutCheckoutHrefs;
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (title) chunks.push(title[1]);
  const metaRe = /<meta\b[^>]*>/gi;
  let meta;
  while ((meta = metaRe.exec(html))) {
    const content = meta[0].match(/\bcontent=["']([^"']*)["']/i);
    if (content) chunks.push(content[1]);
  }
  const ldRe = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let ld;
  while ((ld = ldRe.exec(html))) chunks.push(ld[1]);
  const altRe = /\b(?:alt|aria-label)=["']([^"']*)["']/gi;
  let alt;
  while ((alt = altRe.exec(html))) chunks.push(alt[1]);
  const withoutScripts = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
  chunks.push(withoutScripts.replace(/<[^>]+>/g, ' '));
  return chunks.join('\n');
}

function relPosix(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

function shouldExcludeSource(file) {
  const rel = relPosix(file);
  if (SOURCE_EXCLUDE_FILES.has(rel)) return true;
  if (file.includes(STARWIND_SEG)) return true;
  return false;
}

function scanText(text, file, failures, warnings, withLineNumbers = false) {
  const lines = withLineNumbers ? text.split(/\r?\n/) : null;
  const check = (re, term) => {
    if (withLineNumbers && lines) {
      lines.forEach((line, i) => {
        if (re.test(line)) failures.push({ file, term, line: i + 1 });
        re.lastIndex = 0;
      });
    } else if (re.test(text)) {
      failures.push({ file, term });
    }
  };

  for (const term of FAIL_TERMS) {
    check(boundary(term), term);
  }
  if (withLineNumbers && lines) {
    lines.forEach((line, i) => {
      if (ARK_RE.test(line)) failures.push({ file, term: 'ARK', line: i + 1 });
    });
  } else if (ARK_RE.test(text)) {
    failures.push({ file, term: 'ARK' });
  }

  for (const term of WARN_TERMS) {
    if (withLineNumbers && lines) {
      lines.forEach((line, i) => {
        if (boundary(term).test(line)) warnings.push({ file, term, line: i + 1 });
      });
    } else if (boundary(term).test(text)) {
      warnings.push({ file, term });
    }
  }
}

function collectSourceFiles() {
  const files = [];

  for (const base of SOURCE_SCAN_ROOTS) {
    if (!fs.existsSync(base)) continue;
    const st = fs.statSync(base);
    if (st.isFile()) {
      if (!shouldExcludeSource(base)) files.push(base);
      continue;
    }
    walk(
      base,
      (name, full) => {
        if (shouldExcludeSource(full)) return false;
        return /\.(ts|tsx|js|mjs|cjs|astro|css|json|md|mdx|svg|txt)$/i.test(name) || name === '.env.example';
      },
      files,
    );
  }

  const gameplaySvg = path.join(root, 'public', 'images', 'gameplay');
  if (fs.existsSync(gameplaySvg)) {
    walk(
      gameplaySvg,
      (name, full) => name.endsWith('.svg') && !shouldExcludeSource(full),
      files,
    );
  }

  return [...new Set(files)];
}

const failures = [];
const warnings = [];

const htmlFiles = walk(dist, (name) => name.endsWith('.html'));
for (const file of htmlFiles) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  scanText(scannableHtml(fs.readFileSync(file, 'utf8')), rel, failures, warnings);
}

const extra = walk(
  dist,
  (name) =>
    name.endsWith('.webmanifest') ||
    name === 'sitemap.xml' ||
    (name.startsWith('sitemap') && name.endsWith('.xml')) ||
    name === 'rss.xml' ||
    name.endsWith('.rss'),
);
for (const file of extra) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  scanText(fs.readFileSync(file, 'utf8'), rel, failures, warnings);
}

for (const file of collectSourceFiles()) {
  const rel = relPosix(file);
  scanText(fs.readFileSync(file, 'utf8'), rel, failures, warnings, true);
}

if (warnings.length) {
  console.warn(`verify-banned-terms: warnings ${warnings.length} (not failing)`);
  warnings.slice(0, 30).forEach((hit) => {
    const loc = hit.line ? `${hit.file}:${hit.line}` : hit.file;
    console.warn(`  ${hit.term} in ${loc}`);
  });
}

if (failures.length) {
  console.error('verify-banned-terms: FAILED');
  failures.slice(0, 60).forEach((hit) => {
    const loc = hit.line ? `${hit.file}:${hit.line}` : hit.file;
    console.error(`  ${hit.term} in ${loc}`);
  });
  process.exit(1);
}

console.log(
  `verify-banned-terms: OK (${htmlFiles.length} HTML, ${extra.length} manifest/sitemap/rss, ${collectSourceFiles().length} source files, ${warnings.length} warnings)`,
);
