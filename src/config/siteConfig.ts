import { PRODUCT_BASE, SITE_URL } from './site';
import { PRIMARY_CHECKOUT_PATH } from './checkout';

export const SITE_NAME = 'Caliber Cheat';
export { SITE_URL };
export const PRODUCT_URL = PRODUCT_BASE;
export const CHECKOUT_URL = PRIMARY_CHECKOUT_PATH;
export const FORUM_URL = '/forum/';
export const FAQ_URL = '/faq/';
export const SUPPORT_URL = '/support/';
export const REVIEWS_URL = '/reviews/';

export const PRICE_WEEKLY = 15;
export const PRICE_MONTHLY = 30;
export const PRICE_LIFETIME = 120;

export const OG_DEFAULT_IMAGE = '/og-image-v2.png';

export function breakEvenMonths(): number {
  return Math.ceil(PRICE_LIFETIME / PRICE_MONTHLY);
}
