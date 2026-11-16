/** Post-build: hero MP4 must ship in dist and be linked from the home page. */
import fs from 'node:fs';
import path from 'node:path';
import { resolveDistRoot } from './dist-root.mjs';

const root = process.cwd();
const dist = resolveDistRoot(root);
const HERO_MP4 = path.join(dist, 'videos', 'caliber-hero-snapyt.mp4');
const HOME = path.join(dist, 'index.html');
const MIN_BYTES = 100_000;

const issues = [];

if (!fs.existsSync(HERO_MP4)) {
  issues.push('dist/videos/caliber-hero-snapyt.mp4 missing — add public/videos/caliber-hero-snapyt.mp4');
} else {
  const size = fs.statSync(HERO_MP4).size;
  if (size < MIN_BYTES) {
    issues.push(`hero MP4 too small (${size} bytes) — file may be corrupt`);
  }
}

const publicHero = path.join(root, 'public', 'videos', 'caliber-hero-snapyt.mp4');
if (!fs.existsSync(publicHero)) {
  issues.push('public/videos/caliber-hero-snapyt.mp4 missing before build');
}

if (!fs.existsSync(HOME)) {
  issues.push('dist/index.html missing');
} else {
  const html = fs.readFileSync(HOME, 'utf8');
  if (!html.includes('/videos/caliber-hero-snapyt.mp4')) {
    issues.push('home page does not reference /videos/caliber-hero-snapyt.mp4');
  }
  if (!html.includes('data-hero-video-el')) {
    issues.push('home page missing hero video player markup');
  }
}

if (issues.length) {
  console.error('verify-hero-video: FAILED');
  issues.forEach((i) => console.error(`  ${i}`));
  process.exit(1);
}

console.log(`verify-hero-video: OK (${fs.statSync(HERO_MP4).size} bytes in dist)`);