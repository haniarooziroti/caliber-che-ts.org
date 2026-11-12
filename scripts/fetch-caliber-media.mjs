/**
 * Download Robrun SEO media into public/images/gameplay/a01–a11.webp
 */
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'public', 'images', 'gameplay');

const ASSETS = [
  {
    file: 'a01.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/robrun/02ab714e-de37-423b-81f2-afd7f7fd8d28/1794298055631-ou3cn3-robrun-hero-squad.webp',
  },
  {
    file: 'a02.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/robrun/c7f7b806-cb3e-4eea-8fa1-eca85c479073/1793194043626-ybprbf-cals1.webp',
  },
  {
    file: 'a03.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/robrun/c7f7b806-cb3e-4eea-8fa1-eca85c479073/1793194034641-vnmf4r-cals2.webp',
  },
  {
    file: 'a04.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/robrun/02ab714e-de37-423b-81f2-afd7f7fd8d28/1794298168787-crekf3-screenshot-2022-04-08-213627-min.webp',
  },
  {
    file: 'a05.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/robrun/02ab714e-de37-423b-81f2-afd7f7fd8d28/1794298155792-k63tgc-screenshot-2022-04-08-213716-min.webp',
  },
  {
    file: 'a06.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/robrun/02ab714e-de37-423b-81f2-afd7f7fd8d28/1794298177763-bj2j0u-images.webp',
  },
  {
    file: 'a07.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/robrun/02ab714e-de37-423b-81f2-afd7f7fd8d28/1794298188837-x38kk0-images.webp',
  },
  {
    file: 'a08.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/robrun/02ab714e-de37-423b-81f2-afd7f7fd8d28/1794298146252-b173nd-images.webp',
  },
  {
    file: 'a09.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/robrun/02ab714e-de37-423b-81f2-afd7f7fd8d28/1794298075962-b6h2q1-robrun-blog-cheats-know-before.webp',
  },
  {
    file: 'a10.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/robrun/02ab714e-de37-423b-81f2-afd7f7fd8d28/1794298117256-ob1hqk-robrun-blog-cheats-2026-overview.webp',
  },
  {
    file: 'a11.webp',
    url: 'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/robrun/02ab714e-de37-423b-81f2-afd7f7fd8d28/1794298089921-aj61qe-robrun-blog-stable-eac.webp',
  },
];

fs.mkdirSync(outDir, { recursive: true });

for (const { file, url } of ASSETS) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(path.join(outDir, file), buf);
  console.log(`Wrote ${file} (${(buf.length / 1024).toFixed(1)} KB)`);
}

const videoUrl =
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/robrun/02ab714e-de37-423b-81f2-afd7f7fd8d28/1794311919928-7uiqvq-robrun-hacking-snapyt-app.mp4';
const videoDir = path.join(process.cwd(), 'public', 'videos');
fs.mkdirSync(videoDir, { recursive: true });
const videoRes = await fetch(videoUrl);
if (!videoRes.ok) throw new Error(`Failed video: ${videoRes.status}`);
const videoBuf = Buffer.from(await videoRes.arrayBuffer());
fs.writeFileSync(path.join(videoDir, 'robrun-hero-snapyt.mp4'), videoBuf);
console.log(`Wrote robrun-hero-snapyt.mp4 (${(videoBuf.length / 1024 / 1024).toFixed(1)} MB)`);

console.log('fetch-robrun-media: done');
