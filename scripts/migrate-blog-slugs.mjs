/**
 * Rename blog slugs and update internal /blogs/ links. Run: node scripts/migrate-blog-slugs.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const SLUG_MAP = {
  'robrun-cheats-faq': 'robrun-faq',
  'robrun-cheats-installation': 'robrun-installation',
  'robrun-cheats-features': 'robrun-features',
  'robrun-esp-guide': 'robrun-esp',
  'best-robrun-cheats': 'robrun-buying-guide',
  'robrun-cheats-pricing': 'robrun-pricing',
  'robrun-fps-boost': 'robrun-performance',
  'robrun-cheats-safety': 'robrun-safety',
  'robrun-cheats-comparison': 'robrun-comparison',
  'robrun-gaming-software-compatibility': 'robrun-compatibility',
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
if (!redirects.includes('/blogs/robrun-buying-guide/')) {
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
