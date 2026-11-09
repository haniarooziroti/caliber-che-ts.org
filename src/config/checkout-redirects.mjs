/** Store destinations — buy buttons use internal /go/ paths only (same-tab 302). */
const STORE_URL = 'https://zadeyo.com/go/HANIA?to=%2Fproducts%2Fcaliber-novaxware';

export const CHECKOUT_URLS = {
  caliber: STORE_URL,
  'cloud-dma': STORE_URL,
  'hwid-spoofer': STORE_URL,
};

export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/caliber', CHECKOUT_URLS.caliber],
  ['/go/caliber/', CHECKOUT_URLS.caliber],
  ['/go/store', CHECKOUT_URLS.caliber],
  ['/go/store/', CHECKOUT_URLS.caliber],
  ['/go/cloud-dma', CHECKOUT_URLS['cloud-dma']],
  ['/go/cloud-dma/', CHECKOUT_URLS['cloud-dma']],
  ['/go/hwid-spoofer', CHECKOUT_URLS['hwid-spoofer']],
  ['/go/hwid-spoofer/', CHECKOUT_URLS['hwid-spoofer']],
  ['/go/apex', CHECKOUT_URLS.caliber],
  ['/go/apex/', CHECKOUT_URLS.caliber],
]);

export const LEGACY_PRODUCT_REDIRECTS = new Map([
  ['/products/rust-cheats/', '/products/caliber/'],
  ['/products/apex-legends/', '/products/caliber/'],
  ['/products/apex-hack/', '/products/caliber/'],
  ['/products/cs2-cheats/', '/products/caliber/'],
  ['/go/rust', CHECKOUT_URLS.caliber],
  ['/go/rust/', CHECKOUT_URLS.caliber],
  ['/go/cs2', CHECKOUT_URLS.caliber],
  ['/go/cs2/', CHECKOUT_URLS.caliber],
  ['/go/apex', CHECKOUT_URLS.caliber],
  ['/go/apex/', CHECKOUT_URLS.caliber],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;
  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }
  return null;
}

export function resolveLegacyProductRedirect(pathname) {
  const direct = LEGACY_PRODUCT_REDIRECTS.get(pathname);
  if (direct) return direct;
  if (pathname !== '/' && !pathname.endsWith('/')) {
    return LEGACY_PRODUCT_REDIRECTS.get(`${pathname}/`) ?? null;
  }
  return null;
}
