const envOrigin = (import.meta.env.PUBLIC_SITE_ORIGIN as string | undefined)?.trim();
if (envOrigin && envOrigin.includes('workers.dev')) {
  throw new Error(
    'PUBLIC_SITE_ORIGIN must not contain workers.dev. Use https://caliber-cheats.org for production origin.',
  );
}

export const SITE_DOMAIN = 'caliber-cheats.org';
export const SITE_URL = 'https://caliber-cheats.org';
export const PRODUCT_BASE = '/products/caliber/';
export const TITLE_PREFIX = 'Caliber';

export const DISCORD_URL = 'https://discord.com/invite/Vu85F8auQS';
