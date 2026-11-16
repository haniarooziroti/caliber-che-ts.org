/** Production origin for sitemap, RSS, canonicals, and post-build checks. */
export const SITE_DOMAIN = 'caliber-cheats.org';
export const SITE_ORIGIN = `https://${SITE_DOMAIN}`;

/** Brand / host spellings that must never appear in dist/ or as SITE_DOMAIN. */
export const WRONG_DOMAIN_VARIANTS = [
  'calibercheat.net',
  'calibercheat.com',
  'www.calibercheat.net',
  'caliberche-t.net',
  'robruncheat.org',
  'www.robruncheat.org',
  'cheatsrust.com',
  'cheatsrust.net',
  'cheats-rust.org',
  'apex-cheats.org',
  'cs2-cheats.org',
  'valorant-cheats.org',
  'eft-cheats.org',
  'www.caliber-cheats.org',
];

/** Workers preview — only allowed in dist/_headers (see wrangler.jsonc "name"). */
export const PREVIEW_WORKER_HOST = 'caliber-cheats-org.hania-rooziroti.workers.dev';

export function resolveSiteOrigin(env = process.env) {
  const raw = env.PUBLIC_SITE_ORIGIN?.trim();
  if (raw && raw.includes('workers.dev')) {
    throw new Error(
      'PUBLIC_SITE_ORIGIN must not contain workers.dev. Use https://caliber-cheats.org for production origin.',
    );
  }
  if (raw && (raw.includes('localhost') || raw.includes('127.0.0.1') || raw.includes('pages.dev'))) {
    throw new Error('PUBLIC_SITE_ORIGIN must be the production host https://caliber-cheats.org.');
  }
  if (env.NODE_ENV === 'production' && env.CI === 'true' && !raw) {
    console.warn('validate-seo: CI build without PUBLIC_SITE_ORIGIN — using default caliber-cheats.org');
  }
  return SITE_ORIGIN;
}

export function assertSiteOrigin(env = process.env) {
  resolveSiteOrigin(env);
}
