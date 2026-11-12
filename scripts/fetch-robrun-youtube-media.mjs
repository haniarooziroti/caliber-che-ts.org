/**
 * YouTube 3NxnMoqfEhs — gameplay 0:47–1:57, muted hero clip, a01–a11 lightweight WebP masters.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const YT_URL = 'https://www.youtube.com/watch?v=3NxnMoqfEhs';
const CLIP_START_SEC = 47;
const CLIP_END_SEC = 117;
const FRAME_COUNT = 11;
const WEBP_QUALITY = 68;
const MAX_WIDTH = 1280;

const tmpDir = path.join(root, '.cache', 'robrun-yt');
const videoDir = path.join(root, 'public', 'videos');
const gameplayDir = path.join(root, 'public', 'images', 'gameplay');
const heroOut = path.join(videoDir, 'robrun-hero-snapyt.mp4');
const legacyFallback = path.join(videoDir, 'robrun-hero-snapyt.mp4');

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

function pngToWebp(png, webp) {
  const vf = `scale='min(${MAX_WIDTH},iw)':-2`;
  try {
    run(ffmpeg(), [
      '-y',
      '-i',
      png,
      '-vf',
      vf,
      '-c:v',
      'libwebp',
      '-quality',
      String(WEBP_QUALITY),
      '-compression_level',
      '6',
      webp,
    ]);
    return true;
  } catch {
    return false;
  }
}

fs.mkdirSync(tmpDir, { recursive: true });
fs.mkdirSync(videoDir, { recursive: true });
fs.mkdirSync(gameplayDir, { recursive: true });

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
const clipEnd = Math.min(CLIP_END_SEC, duration > 0 ? duration - 0.5 : CLIP_END_SEC);
const clipDuration = Math.max(5, clipEnd - CLIP_START_SEC);
const heroStart = duration > CLIP_START_SEC + 1 ? CLIP_START_SEC : 0;

console.log(`Building muted hero clip ${heroStart}s → ${heroStart + clipDuration}s…`);
run(ffmpeg(), [
  '-y',
  '-ss',
  String(heroStart),
  '-i',
  rawVideo,
  '-t',
  String(clipDuration),
  '-an',
  '-c:v',
  'libx264',
  '-preset',
  'medium',
  '-crf',
  '24',
  '-movflags',
  '+faststart',
  '-pix_fmt',
  'yuv420p',
  heroOut,
]);

console.log(`Extracting ${FRAME_COUNT} gameplay frames (${CLIP_START_SEC}s–${clipEnd}s)…`);
const posterPath = path.join(gameplayDir, 'hero-poster.webp');

for (let i = 1; i <= FRAME_COUNT; i++) {
  const t = heroStart + (i / (FRAME_COUNT + 1)) * clipDuration;
  const png = path.join(tmpDir, `frame-${String(i).padStart(2, '0')}.png`);
  const webp = path.join(gameplayDir, `a${String(i).padStart(2, '0')}.webp`);
  if (!tryRun(ffmpeg(), ['-y', '-ss', String(t), '-i', rawVideo, '-frames:v', '1', '-q:v', '2', png])) {
    console.warn(`Skip frame ${i} at ${t}s`);
    continue;
  }
  if (!pngToWebp(png, webp)) {
    console.warn(`WebP encode failed for frame ${i}`);
    continue;
  }
  console.log(`Wrote ${path.relative(root, webp)}`);
  if (i === 1) {
    fs.copyFileSync(webp, posterPath);
  }
}

if (!fs.existsSync(posterPath) && fs.existsSync(path.join(gameplayDir, 'a01.webp'))) {
  fs.copyFileSync(path.join(gameplayDir, 'a01.webp'), posterPath);
}

console.log(`Wrote ${path.relative(root, posterPath)}`);
console.log('Done. Run: node scripts/optimize-images.mjs');
