/**
 * Fail CI/build when public-facing source or dist still contains unrelated-game
 * branding, Apex-era weapon copy, or legacy project domains outside allowlisted
 * migration/redirect tooling.
 */
import fs from 'node:fs';
import path from 'node:path';
import { resolveDistRoot } from './dist-root.mjs';
import { SITE_ORIGIN } from './site-origin.mjs';

const root = process.cwd();
const dist = resolveDistRoot(root);

/** @type {{ pattern: RegExp; label: string }[]} */
const LEFTOVER_PATTERNS = [
  { pattern: /\bApex Legends\b/i, label: 'Apex Legends' },
  { pattern: /\bapex[\s-]?cheats(?:\.org)?\b/i, label: 'apex-cheats' },
  { pattern: /\bapexhack\b/i, label: 'apexhack' },
  { pattern: /\bapex-legends\b/i, label: 'apex-legends' },
  { pattern: /\bcs2[\s-]?cheats\b/i, label: 'cs2-cheats' },
  { pattern: /\bvalorant[\s-]?cheats\b/i, label: 'valorant-cheats' },
  { pattern: /\beft[\s-]?cheats\b/i, label: 'eft-cheats' },
  { pattern: /\bEscape from Tarkov\b/i, label: 'Escape from Tarkov' },
  { pattern: /\bCounter-Strike\b/i, label: 'Counter-Strike' },
  { pattern: /\bFortnite\b/i, label: 'Fortnite' },
  { pattern: /\bPUBG\b/i, label: 'PUBG' },
  { pattern: /\bRainbow Six\b/i, label: 'Rainbow Six' },
  { pattern: /\bOverwatch\b/i, label: 'Overwatch' },
  { pattern: /\bWorld'?s Edge\b/i, label: "World's Edge" },
  { pattern: /\bKings Canyon\b/i, label: 'Kings Canyon' },
  { pattern: /\bR-301\b/i, label: 'R-301' },
  { pattern: /\bFlatline\b/i, label: 'Flatline' },
  { pattern: /\bpinkoctane\b/i, label: 'pinkoctane' },
  { pattern: /\bkillcam\b/i, label: 'killcam' },
  { pattern: /\benemy legends\b/i, label: 'enemy legends' },
  { pattern: /\bapex-cheats\.org\b/i, label: 'apex-cheats.org' },
  { pattern: /\bcs2-cheats\.org\b/i, label: 'cs2-cheats.org' },
  { pattern: /\bcheatsrust\b/i, label: 'cheatsrust' },
  { pattern: /\blevocheats\b/i, label: 'levocheats' },
  { pattern: /\bcalibercheat\.net\b/i, label: 'calibercheat.net' },
  { pattern: /\bcaliberche-t\.net\b/i, label: 'caliberche-t.net' },
  { pattern: /\brobruncheat\.org\b/i, label: 'robruncheat.org' },
  { pattern: /\brobrun[\s-]?cheats\b/i, label: 'robrun cheats' },
  { pattern: /\bRobrun\b/i, label: 'Robrun' },
  { pattern: /\brobrun\b/i, label: 'robrun' },
  { pattern: /\bvalorant\b/i, label: 'valorant' },
];

/** Public asset paths must not ship other-game media folders. */
const BAD_PUBLIC_PATH = /(?:^|\/)(?:robrun|valorant|apex-legends|rust-cheats|cs2-cheats|dota-2)(?:\/|$)/i;

/**
 * Allowlisted matches: migration scripts, redirect maps, validators — not user-facing.
 * @type {{ file: RegExp; pattern?: RegExp; reason: string; publicFacing: boolean }[]}
 */
const ALLOWLIST = [
  { file: /^scripts\/(caliber-rebrand|caliber-cheats-org-migrate|redirects|sync-public-redirects|verify-banned-terms|check-leftovers|site-origin)\.mjs$/, reason: 'migration or validator tooling', publicFacing: false },
  {
    file: /^scripts\/(fetch-caliber-media|prune-legacy-gameplay|verify-public-media|fetch-caliber-youtube-media)\.mjs$/,
    reason: 'Caliber media pipeline and legacy Caliber guards',
    publicFacing: false,
  },
  { file: /^scripts\/rust-rebrand\.mjs$/, reason: 'historical migration script', publicFacing: false },
  { file: /^public\/_redirects$/, pattern: /apex|cs2|rust/i, reason: 'legacy SEO redirects', publicFacing: false },
  { file: /^src\/config\/checkout-redirects\.mjs$/, pattern: /apex|cs2|rust|caliber|robrun/i, reason: 'legacy checkout/product redirects', publicFacing: false },
  { file: /^public\/_redirects$/, pattern: /robrun/i, reason: 'legacy Robrun SEO redirects', publicFacing: false },
  { file: /^scripts\/caliber-rebrand\.mjs$/, reason: 'historical migration script', publicFacing: false },
  { file: /^scripts\/site-origin\.mjs$/, pattern: /calibercheat/i, reason: 'wrong domain deny list', publicFacing: false },
  { file: /^src\/config\/sitemap\.ts$/, pattern: /cs2-cheats/i, reason: 'exclude legacy routes from sitemap', publicFacing: false },
  { file: /^scripts\/validate-seo\.mjs$/, pattern: /levocheats|cheatsrust/i, reason: 'forbidden legacy domain guard regexes', publicFacing: false },
  { file: /^scripts\/verify-domain\.mjs$/, pattern: /cs2|apex|rust/i, reason: 'domain verification deny list', publicFacing: false },
  { file: /^src\/utils\/path\.ts$/, pattern: /apex|cs2/i, reason: 'legacy path normalization', publicFacing: false },
  { file: /^astro\.config\.mjs$/, pattern: /cs2|apex/i, reason: 'build config legacy filters', publicFacing: false },
];

const SOURCE_SCAN = [
  path.join(root, 'src'),
  path.join(root, 'public'),
  path.join(root, 'scripts'),
];

const SOURCE_GLOB = /\.(ts|tsx|js|mjs|cjs|astro|css|json|md|mdx|svg|txt|html)$/i;
const STARWIND = `${path.sep}src${path.sep}components${path.sep}starwind${path.sep}`;

function relPosix(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

function walk(dir, pred, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === '.git' || name === 'dist') continue;
      walk(full, pred, out);
    } else if (pred(name, full)) out.push(full);
  }
  return out;
}

function isAllowed(rel, line, patternLabel) {
  for (const rule of ALLOWLIST) {
    if (!rule.file.test(rel)) continue;
    if (rule.pattern && !rule.pattern.test(line)) continue;
    return rule;
  }
  return null;
}

function scanText(text, fileRel, failures, { distHtml = false } = {}) {
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const { pattern, label } of LEFTOVER_PATTERNS) {
      if (!pattern.test(line)) continue;
      pattern.lastIndex = 0;
      const allowed = isAllowed(fileRel, line, label);
      if (allowed) break;
      failures.push({
        file: fileRel,
        line: index + 1,
        term: label,
        snippet: line.trim().slice(0, 120),
        distHtml,
      });
    }
  });
}

function scannableHtml(html) {
  const withoutHrefs = html.replace(/\bhref=(["'])[\s\S]*?\1/gi, 'href=$1$1');
  const chunks = [];
  const title = withoutHrefs.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (title) chunks.push(title[1]);
  const metaRe = /<meta\b[^>]*>/gi;
  let meta;
  while ((meta = metaRe.exec(withoutHrefs))) {
    const content = meta[0].match(/\bcontent=["']([^"']*)["']/i);
    if (content) chunks.push(content[1]);
  }
  const ldRe = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let ld;
  while ((ld = ldRe.exec(withoutHrefs))) chunks.push(ld[1]);
  const altRe = /\b(?:alt|aria-label)=["']([^"']*)["']/gi;
  let alt;
  while ((alt = altRe.exec(withoutHrefs))) chunks.push(alt[1]);
  const body = withoutHrefs
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  chunks.push(body);
  return chunks.join('\n');
}

function collectSourceFiles() {
  const files = [];
  for (const base of SOURCE_SCAN) {
    if (!fs.existsSync(base)) continue;
    walk(
      base,
      (name, full) => {
        if (full.includes(STARWIND)) return false;
        return SOURCE_GLOB.test(name);
      },
      files,
    );
  }
  return [...new Set(files)];
}

const failures = [];

for (const file of collectSourceFiles()) {
  const rel = relPosix(file);
  scanText(fs.readFileSync(file, 'utf8'), rel, failures);
}

const publicRoot = path.join(root, 'public');
if (fs.existsSync(publicRoot)) {
  walk(
    publicRoot,
    (name, full) => {
      const rel = relPosix(full);
      if (!BAD_PUBLIC_PATH.test(rel)) return false;
      return true;
    },
    [],
  ).forEach((full) => {
    failures.push({
      file: relPosix(full),
      line: 0,
      term: 'legacy public asset path',
      snippet: relPosix(full),
      distHtml: false,
    });
  });
}

if (fs.existsSync(dist)) {
  const htmlFiles = walk(dist, (name) => name.endsWith('.html'));
  for (const file of htmlFiles) {
    const rel = `dist/${path.relative(dist, file).replace(/\\/g, '/')}`;
    scanText(scannableHtml(fs.readFileSync(file, 'utf8')), rel, failures, { distHtml: true });
  }
  for (const name of ['sitemap.xml', 'robots.txt']) {
    const file = path.join(dist, name);
    if (!fs.existsSync(file)) continue;
    scanText(fs.readFileSync(file, 'utf8'), `dist/${name}`, failures, { distHtml: true });
  }
}

const wrongOrigin = failures.filter(
  (f) =>
    /https?:\/\//i.test(f.snippet) &&
    !f.snippet.includes(SITE_ORIGIN) &&
    (f.snippet.includes('calibercheat') || f.snippet.includes('robruncheat')),
);
for (const f of wrongOrigin) {
  f.term = 'wrong canonical origin';
}

if (failures.length) {
  console.error('check-leftovers: FAILED');
  failures.slice(0, 80).forEach((hit) => {
    console.error(`  [${hit.term}] ${hit.file}:${hit.line} — ${hit.snippet}`);
  });
  process.exit(1);
}

const srcCount = collectSourceFiles().length;
const htmlCount = fs.existsSync(dist) ? walk(dist, (n) => n.endsWith('.html')).length : 0;
console.log(
  `check-leftovers: OK (${srcCount} source files, ${htmlCount} dist HTML, origin ${SITE_ORIGIN}, ${ALLOWLIST.length} allowlist rules)`,
);
