import { CHECKOUT_URLS } from './checkout-redirects.mjs';

export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  caliber: 'caliber',
  'cloud-dma': 'cloud-dma',
  'hwid-spoofer': 'hwid-spoofer',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

export function checkoutPath(product: CheckoutProduct = 'caliber'): string {
  return `/go/${CHECKOUT_SLUGS[product]}/`;
}

export const PRIMARY_CHECKOUT_PATH = checkoutPath('caliber');

const SLUG_CHECKOUT_PRODUCT: Record<string, CheckoutProduct> = {
  'cloud-dma': 'cloud-dma',
  'hwid-spoofer': 'hwid-spoofer',
};

export function checkoutForSlug(slug: string): string {
  const product = SLUG_CHECKOUT_PRODUCT[slug];
  return product ? checkoutPath(product) : checkoutPath('caliber');
}

export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    return href.startsWith('/') ? href : `/${href}`;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return checkoutPath(product);
    }
  }

  return href;
}
