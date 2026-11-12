import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { resolveSiteOrigin } from './site-origin.mjs';

resolveSiteOrigin();

const root = process.cwd();
const widths = [400, 800, 1200];
const dirs = ['public/images/gameplay'];

function isMaster(file) {
  if (/-(400|800|1200)\.webp$/i.test(file)) return false;
  return /\.(png|webp)$/i.test(file);
}

async function optimizeDir(relativeDir) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter(isMaster);

  for (const file of files) {
    const input = path.join(dir, file);
    const base = file.replace(/\.(png|webp)$/i, '');

    for (const width of widths) {
      const output = path.join(dir, `${base}-${width}.webp`);
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 72, effort: 4 })
        .toFile(output);
      console.log(`Wrote ${path.relative(root, output)}`);
    }
  }
}

for (const dir of dirs) {
  await optimizeDir(dir);
}

console.log('Image optimization complete.');
