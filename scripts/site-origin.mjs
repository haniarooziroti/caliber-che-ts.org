/** Production origin for sitemap, RSS, canonicals, and post-build checks. */
export const SITE_DOMAIN = 'calibercheat.net';
export const SITE_ORIGIN = `https://${SITE_DOMAIN}`;

/** Brand / host spellings that must never appear in dist/ or as SITE_DOMAIN. */
export const WRONG_DOMAIN_VARIANTS = [
  'cheatsrust.com',
  'cheatsrust.net',
  'cheats-rust.org',
  'cheats-rust.com',
  'rustcheats.org',
  'rust-cheats.org',
  'rustcheats.com',
  'www.calibercheat.net',
  'cs2-cheats.org',
  'cs2cheats.org',
  'cs2cheats.com',
  'rust-cheats.com',
  'rust-cheat.org',
  'rust-cheat.com',
];

/** Workers preview — only allowed in dist/_headers (see wrangler.jsonc "name"). */
export const PREVIEW_WORKER_HOST = 'calibercheat-net.hania-rooziroti.workers.dev';

/**
 * Default origin is always https://calibercheat.net.
 * PUBLIC_SITE_ORIGIN containing workers.dev is a misconfig — fail closed.
 */
export function resolveSiteOrigin(env = process.env) {
  const raw = env.PUBLIC_SITE_ORIGIN?.trim();
  if (raw && raw.includes('workers.dev')) {
    throw new Error(
      'PUBLIC_SITE_ORIGIN must not contain workers.dev. Use https://calibercheat.net for production origin.',
    );
  }
  if (raw && (raw.includes('localhost') || raw.includes('127.0.0.1') || raw.includes('pages.dev'))) {
    throw new Error('PUBLIC_SITE_ORIGIN must be the production host https://calibercheat.net.');
  }
  if (env.NODE_ENV === 'production' && env.CI === 'true' && !raw) {
    console.warn('validate-seo: CI build without PUBLIC_SITE_ORIGIN — using default calibercheat.net');
  }
  return SITE_ORIGIN;
}

export function assertSiteOrigin(env = process.env) {
  resolveSiteOrigin(env);
}
