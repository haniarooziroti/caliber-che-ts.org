/**
 * Remove Caliber-era derivative gameplay masters still shipped from public/.
 * Site pages use a01–a11 from YouTube (scripts/fetch-caliber-youtube-media.mjs).
 */
import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'public', 'images', 'gameplay');
if (!fs.existsSync(dir)) {
  console.log('prune-legacy-gameplay: no gameplay dir — skip');
  process.exit(0);
}

const legacyPrefix = /^(caliber-(aimbot|esp|wallhack|recoil)-|caliber-|apex-)/i;
let removed = 0;

for (const name of fs.readdirSync(dir)) {
  if (!legacyPrefix.test(name)) continue;
  fs.unlinkSync(path.join(dir, name));
  removed += 1;
}

console.log(`prune-legacy-gameplay: removed ${removed} legacy file(s).`);
