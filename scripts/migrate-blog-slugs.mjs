/**
 * Rename blog slugs and update internal /blogs/ links. Run: node scripts/migrate-blog-slugs.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const SLUG_MAP = {
  'caliber-cheats-faq': 'caliber-faq',
  'caliber-cheats-installation': 'caliber-installation',
  'caliber-cheats-features': 'caliber-features',
  'caliber-esp-guide': 'caliber-esp',
  'best-caliber-cheats': 'caliber-buying-guide',
  'caliber-cheats-pricing': 'caliber-pricing',
  'caliber-fps-boost': 'caliber-performance',
  'caliber-cheats-safety': 'caliber-safety',
  'caliber-cheats-comparison': 'caliber-comparison',
  'caliber-gaming-software-compatibility': 'caliber-compatibility',
};

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory() && !['node_modules', 'dist', '.git', '.astro'].includes(name)) {
      walk(full, out);
    } else if (st.isFile() && /\.(ts|tsx|astro|mjs|json|md)$/.test(name)) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(path.join(ROOT, 'src'));

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  let next = text;
  for (const [from, to] of Object.entries(SLUG_MAP)) {
    next = next.split(`/blogs/${from}/`).join(`/blogs/${to}/`);
    next = next.split(`"slug": "${from}"`).join(`"slug": "${to}"`);
    next = next.split(`'${from}'`).join(`'${to}'`); // relatedSlugs
  }
  if (next !== text) fs.writeFileSync(file, next, 'utf8');
}

const redirectsPath = path.join(ROOT, 'scripts', 'redirects.mjs');
let redirects = fs.readFileSync(redirectsPath, 'utf8');
const insertMarker = "export const PATH_REDIRECTS = new Map([";
if (!redirects.includes('/blogs/caliber-buying-guide/')) {
  const blogRedirects = Object.entries(SLUG_MAP)
    .map(([from, to]) => `  ['/blogs/${from}', '/blogs/${to}/'],\n  ['/blogs/${from}/', '/blogs/${to}/'],`)
    .join('\n');
  redirects = redirects.replace(
    insertMarker,
    `${insertMarker}\n${blogRedirects}`,
  );
  fs.writeFileSync(redirectsPath, redirects, 'utf8');
}

console.log('migrate-blog-slugs: done');
