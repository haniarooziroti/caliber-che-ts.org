const envOrigin = (import.meta.env.PUBLIC_SITE_ORIGIN as string | undefined)?.trim();
if (envOrigin && envOrigin.includes('workers.dev')) {
  throw new Error(
    'PUBLIC_SITE_ORIGIN must not contain workers.dev. Use https://robruncheat.org for production origin.',
  );
}

export const SITE_DOMAIN = 'robruncheat.org';
export const SITE_URL = 'https://robruncheat.org';
export const PRODUCT_BASE = '/products/robrun/';
export const TITLE_PREFIX = 'Robrun';

export const DISCORD_URL = 'https://discord.com/invite/Vu85F8auQS';
