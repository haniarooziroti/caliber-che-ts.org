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

for (const [from, to] of PATH_REDIRECTS) {
  if (to.startsWith('http')) continue;
  lines.push(`${from} ${to} 301`);
}

for (const [from, to] of LEGACY_SPLAT_REDIRECTS) {
  lines.push(`${from} ${to} 301`);
}

for (const [from, to] of CHECKOUT_PATH_REDIRECTS) {
  lines.push(`${from} ${to} 302`);
}

for (const [from, to] of LEGACY_PRODUCT_REDIRECTS) {
  const code = to.startsWith('http') ? 302 : 301;
  lines.push(`${from} ${to} ${code}`);
}

const blogRedirects = [
  '/blogs/robrun-buying-guide/ /blogs/robrun-cheats-buying-guide/ 301',
  '/blogs/robrun-performance/ /blogs/robrun-fps-boost/ 301',
  '/blogs/robrun-compatibility/ /blogs/robrun-gaming-software-compatibility/ 301',
];

lines.push('', '# Blog slug migrations (legacy inbound)', ...blogRedirects, '');

fs.writeFileSync(out, `${lines.join('\n')}\n`, 'utf8');
console.log(`Wrote ${path.relative(process.cwd(), out)} (${lines.length} lines)`);
