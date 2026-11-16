/** Fail build if dist HTML still references legacy Caliber gameplay paths. */
import fs from 'node:fs';
import path from 'node:path';
import { resolveDistRoot } from './dist-root.mjs';

const dist = resolveDistRoot();
const bad = [
  /\/images\/gameplay\/c0\d/i,
  /\/images\/gameplay\/caliber-/i,
  /\/images\/gameplay\/caliber-(aimbot|esp|wallhack|recoil)-/i,
  /\/images\/robrun\//i,
  /\/videos\/robrun/i,
  /\/products\/(robrun|apex-legends|valorant|rust-cheats|cs2-cheats)\//i,
  /supabase\.co.*cals/i,
];

const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(dist);

const hits = [];
for (const file of htmlFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const pattern of bad) {
    if (pattern.test(text)) {
      hits.push(`${path.relative(process.cwd(), file)} — ${pattern}`);
    }
  }
}

if (hits.length) {
  console.error('verify-public-media: FAILED');
  for (const h of hits) console.error(`  ${h}`);
  process.exit(1);
}
console.log(`verify-public-media: OK (${htmlFiles.length} HTML files)`);
