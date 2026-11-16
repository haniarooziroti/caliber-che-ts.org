/** Affiliate checkout URLs — keep HANIA and encoded store paths exactly. */
const CALIBER_PRODUCT_URL = 'https://zadeyo.com/go/HANIA?to=%2Fproducts%2Fcaliber-novaxware';
const CLOUD_DMA_URL = 'https://zadeyo.com/go/HANIA?to=%2Fproducts%2Fcloud-dma';
const HWID_SPOOFER_URL = 'https://zadeyo.com/go/HANIA?to=%2Fproducts%2Fhwid-spoofer';

export const CHECKOUT_LINKS = {
  caliber: CALIBER_PRODUCT_URL,
  cloudDMA: CLOUD_DMA_URL,
  hwidSpoofer: HWID_SPOOFER_URL,
};

export const CHECKOUT_URLS = {
  caliber: CHECKOUT_LINKS.caliber,
  'cloud-dma': CHECKOUT_LINKS.cloudDMA,
  'hwid-spoofer': CHECKOUT_LINKS.hwidSpoofer,
};

export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/caliber', CHECKOUT_URLS.caliber],
  ['/go/caliber/', CHECKOUT_URLS.caliber],
  ['/go/store', CHECKOUT_URLS.caliber],
  ['/go/store/', CHECKOUT_URLS.caliber],
  ['/go/robrun', CHECKOUT_URLS.caliber],
  ['/go/robrun/', CHECKOUT_URLS.caliber],
  ['/go/apex', CHECKOUT_URLS.caliber],
  ['/go/apex/', CHECKOUT_URLS.caliber],
  ['/go/cloud-dma', CHECKOUT_URLS['cloud-dma']],
  ['/go/cloud-dma/', CHECKOUT_URLS['cloud-dma']],
  ['/go/hwid-spoofer', CHECKOUT_URLS['hwid-spoofer']],
  ['/go/hwid-spoofer/', CHECKOUT_URLS['hwid-spoofer']],
]);

export const LEGACY_SPLAT_REDIRECTS = [
  ['/products/robrun/*', '/products/caliber/:splat'],
  ['/products/apex-legends/*', '/products/caliber/:splat'],
];

export const LEGACY_PRODUCT_REDIRECTS = new Map([
  ['/products/rust-cheats/', '/products/caliber/'],
  ['/products/apex-legends', '/products/caliber/'],
  ['/products/apex-legends/', '/products/caliber/'],
  ['/products/apex-hack/', '/products/caliber/'],
  ['/products/cs2-cheats/', '/products/caliber/'],
  ['/products/robrun/', '/products/caliber/'],
  ['/products/robrun', '/products/caliber'],
  ['/go/rust', CHECKOUT_URLS.caliber],
  ['/go/rust/', CHECKOUT_URLS.caliber],
  ['/go/cs2', CHECKOUT_URLS.caliber],
  ['/go/cs2/', CHECKOUT_URLS.caliber],
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
