/** Write public/_redirects for Cloudflare from redirects.mjs + checkout maps. */
import fs from 'node:fs';
import path from 'node:path';
import { PATH_REDIRECTS } from './redirects.mjs';
import {
  CHECKOUT_PATH_REDIRECTS,
  LEGACY_PRODUCT_REDIRECTS,
  LEGACY_SPLAT_REDIRECTS,
} from '../src/config/checkout-redirects.mjs';

const out = path.join(process.cwd(), 'public', '_redirects');
const lines = [
  '# Robrun Cheats — Cloudflare Static Assets: relative 301s and absolute 302s.',
  '',
];

/** Cloudflare rejects duplicate source paths in _redirects. First rule wins. */
const seenFrom = new Set();

function addRule(from, to, code) {
  if (seenFrom.has(from)) return false;
  seenFrom.add(from);
  lines.push(`${from} ${to} ${code}`);
  return true;
}

for (const [from, to] of PATH_REDIRECTS) {
  if (to.startsWith('http')) continue;
  addRule(from, to, 301);
}

for (const [from, to] of LEGACY_SPLAT_REDIRECTS) {
  addRule(from, to, 301);
}

for (const [from, to] of CHECKOUT_PATH_REDIRECTS) {
  addRule(from, to, 302);
}

for (const [from, to] of LEGACY_PRODUCT_REDIRECTS) {
  const code = to.startsWith('http') ? 302 : 301;
  addRule(from, to, code);
}

const blogRedirects = [
  ['/blogs/robrun-buying-guide/', '/blogs/robrun-cheats-buying-guide/', 301],
  ['/blogs/robrun-performance/', '/blogs/robrun-fps-boost/', 301],
  ['/blogs/robrun-compatibility/', '/blogs/robrun-gaming-software-compatibility/', 301],
];

lines.push('', '# Blog slug migrations (legacy inbound)');
for (const [from, to, code] of blogRedirects) {
  addRule(from, to, code);
}
lines.push('');

if (seenFrom.size !== lines.filter((l) => l && !l.startsWith('#')).length) {
  throw new Error('_redirects line count mismatch after deduplication');
}

fs.writeFileSync(out, `${lines.join('\n')}\n`, 'utf8');
console.log(
  `Wrote ${path.relative(process.cwd(), out)} (${seenFrom.size} unique rules, ${lines.length} lines)`,
);
