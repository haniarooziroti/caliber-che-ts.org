/**
 * Remove legacy gameplay masters and other-brand asset folders from public/.
 * Site pages use a01–a11 from YouTube (scripts/fetch-caliber-youtube-media.mjs).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
let removed = 0;

const gameplay = path.join(root, 'public', 'images', 'gameplay');
const legacyPrefix = /^(caliber-(aimbot|esp|wallhack|recoil)-|caliber-|apex-)/i;
if (fs.existsSync(gameplay)) {
  for (const name of fs.readdirSync(gameplay)) {
    if (!legacyPrefix.test(name)) continue;
    fs.unlinkSync(path.join(gameplay, name));
    removed += 1;
  }
}

/** Drop shipped folders/files for prior brands (Robrun, Apex, etc.). */
const legacyDirs = [
  path.join(root, 'public', 'images', 'robrun'),
  path.join(root, 'public', 'images', 'apex-legends'),
  path.join(root, 'public', 'images', 'valorant'),
];
for (const dir of legacyDirs) {
  if (!fs.existsSync(dir)) continue;
  fs.rmSync(dir, { recursive: true, force: true });
  removed += 1;
}

const videos = path.join(root, 'public', 'videos');
const legacyVideo = /^(robrun|valorant|apex|rust|cs2)-/i;
if (fs.existsSync(videos)) {
  for (const name of fs.readdirSync(videos)) {
    if (!legacyVideo.test(name)) continue;
    fs.unlinkSync(path.join(videos, name));
    removed += 1;
  }
}

console.log(`prune-legacy-gameplay: removed ${removed} legacy file(s).`);
