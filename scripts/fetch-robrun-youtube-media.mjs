/**
 * Downloads YouTube gameplay, builds muted hero MP4 (from 0:49 when long enough), and refreshes a01–a11 webp masters.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const YT_URL = 'https://www.youtube.com/watch?v=3NxnMoqfEhs';
const PREFERRED_START_SEC = 49;
const HERO_DURATION_SEC = 75;
const FRAME_COUNT = 11;

const tmpDir = path.join(root, '.cache', 'robrun-yt');
const videoDir = path.join(root, 'public', 'videos');
const gameplayDir = path.join(root, 'public', 'images', 'gameplay');
const heroOut = path.join(videoDir, 'robrun-hero-snapyt.mp4');
const legacyFallback = path.join(videoDir, 'caliber-hero-snapyt.mp4');
const HERO_POSTER_URL =
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/rob-run/02ab714e-de37-423b-81f2-afd7f7fd8d28/1794486558855-gfdg64-1.webp';

function ytDlp() {
  return process.env.YT_DLP || 'yt-dlp';
}

function ffmpeg() {
  return process.env.FFMPEG || 'ffmpeg';
}

function ffprobe() {
  return process.env.FFPROBE || 'ffprobe';
}

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', windowsHide: true });
  if (r.status !== 0) {
    throw new Error(`${cmd} failed (${r.status})`);
  }
}

function tryRun(cmd, args) {
  return spawnSync(cmd, args, { stdio: 'inherit', windowsHide: true }).status === 0;
}

function probeDuration(file) {
  const r = spawnSync(
    ffprobe(),
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file],
    { encoding: 'utf8' },
  );
  const n = Number.parseFloat((r.stdout || '').trim());
  return Number.isFinite(n) ? n : 0;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
}

fs.mkdirSync(tmpDir, { recursive: true });
fs.mkdirSync(videoDir, { recursive: true });
fs.mkdirSync(gameplayDir, { recursive: true });

const posterPath = path.join(gameplayDir, 'hero-poster.webp');
console.log('Downloading hero poster from Supabase…');
await download(HERO_POSTER_URL, posterPath);

const rawVideo = path.join(tmpDir, 'source.mp4');
if (!fs.existsSync(rawVideo)) {
  console.log('Downloading YouTube source…');
  let ok =
    tryRun(ytDlp(), ['-f', 'b', '--merge-output-format', 'mp4', '-o', rawVideo, YT_URL]) ||
    tryRun(ytDlp(), ['--cookies-from-browser', 'edge', '-f', 'b', '-o', rawVideo, YT_URL]) ||
    tryRun(ytDlp(), ['--cookies-from-browser', 'chrome', '-f', 'b', '-o', rawVideo, YT_URL]);
  if (!ok || !fs.existsSync(rawVideo)) {
    if (fs.existsSync(legacyFallback)) {
      console.warn('YouTube download blocked — using existing public hero MP4.');
      fs.copyFileSync(legacyFallback, rawVideo);
    } else {
      throw new Error('Could not download YouTube source and no local fallback MP4 found.');
    }
  }
}

const duration = probeDuration(rawVideo);
const heroStart = duration > PREFERRED_START_SEC + 5 ? PREFERRED_START_SEC : 0;
const heroDuration = Math.min(HERO_DURATION_SEC, Math.max(5, duration - heroStart));

console.log(`Building muted hero clip from ${heroStart}s (${heroDuration}s)…`);
run(ffmpeg(), [
  '-y',
  '-ss',
  String(heroStart),
  '-i',
  rawVideo,
  '-t',
  String(heroDuration),
  '-an',
  '-c:v',
  'libx264',
  '-preset',
  'medium',
  '-crf',
  '23',
  '-movflags',
  '+faststart',
  '-pix_fmt',
  'yuv420p',
  heroOut,
]);

console.log(`Extracting ${FRAME_COUNT} gameplay frames…`);
const interval = heroDuration / (FRAME_COUNT + 1);
for (let i = 1; i <= FRAME_COUNT; i++) {
  const t = heroStart + i * interval;
  const png = path.join(tmpDir, `frame-${String(i).padStart(2, '0')}.png`);
  const webp = path.join(gameplayDir, `a${String(i).padStart(2, '0')}.webp`);
  if (
    !tryRun(ffmpeg(), ['-y', '-ss', String(t), '-i', rawVideo, '-frames:v', '1', '-q:v', '2', png])
  ) {
    fs.copyFileSync(posterPath, webp);
    continue;
  }
  try {
    run(ffmpeg(), ['-y', '-i', png, '-vf', 'scale=1920:-2', webp]);
  } catch {
    fs.copyFileSync(posterPath, webp);
  }
  console.log(`Wrote ${path.relative(root, webp)}`);
}

console.log(`Wrote ${path.relative(root, posterPath)}`);
console.log('Done. Run: node scripts/optimize-images.mjs');
