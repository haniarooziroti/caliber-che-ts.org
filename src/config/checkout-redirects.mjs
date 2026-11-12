/** Affiliate checkout URLs — keep HANIA and the encoded `to` path exactly. */
const ROBRUN_PRODUCT_URL = 'https://zadeyo.com/go/HANIA?to=%2Fproducts%2Frobrun';
const CLOUD_DMA_URL = 'https://zadeyo.com/go/HANIA?to=%2Fproducts%2Fcloud-dma';
const HWID_SPOOFER_URL = 'https://zadeyo.com/go/HANIA?to=%2Fproducts%2Fhwid-spoofer';

export const CHECKOUT_LINKS = {
  robrun: ROBRUN_PRODUCT_URL,
  cloudDMA: CLOUD_DMA_URL,
  hwidSpoofer: HWID_SPOOFER_URL,
};

export const CHECKOUT_URLS = {
  robrun: CHECKOUT_LINKS.robrun,
  'cloud-dma': CHECKOUT_LINKS.cloudDMA,
  'hwid-spoofer': CHECKOUT_LINKS.hwidSpoofer,
};

export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/robrun', CHECKOUT_URLS.robrun],
  ['/go/robrun/', CHECKOUT_URLS.robrun],
  ['/go/store', CHECKOUT_URLS.robrun],
  ['/go/store/', CHECKOUT_URLS.robrun],
  ['/go/caliber', CHECKOUT_URLS.robrun],
  ['/go/caliber/', CHECKOUT_URLS.robrun],
  ['/go/apex', CHECKOUT_URLS.robrun],
  ['/go/apex/', CHECKOUT_URLS.robrun],
  ['/go/cloud-dma', CHECKOUT_URLS['cloud-dma']],
  ['/go/cloud-dma/', CHECKOUT_URLS['cloud-dma']],
  ['/go/hwid-spoofer', CHECKOUT_URLS['hwid-spoofer']],
  ['/go/hwid-spoofer/', CHECKOUT_URLS['hwid-spoofer']],
]);

export const LEGACY_PRODUCT_REDIRECTS = new Map([
  ['/products/rust-cheats/', '/products/robrun/'],
  ['/products/apex-legends/', '/products/robrun/'],
  ['/products/apex-hack/', '/products/robrun/'],
  ['/products/cs2-cheats/', '/products/robrun/'],
  ['/products/caliber/', '/products/robrun/'],
  ['/products/caliber', '/products/robrun'],
  ['/go/rust', CHECKOUT_URLS.robrun],
  ['/go/rust/', CHECKOUT_URLS.robrun],
  ['/go/cs2', CHECKOUT_URLS.robrun],
  ['/go/cs2/', CHECKOUT_URLS.robrun],
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
