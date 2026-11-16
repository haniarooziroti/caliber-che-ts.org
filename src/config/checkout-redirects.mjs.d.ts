export declare const CHECKOUT_LINKS: {
  readonly caliber: string;
  readonly cloudDMA: string;
  readonly hwidSpoofer: string;
};

export declare const CHECKOUT_URLS: {
  readonly caliber: string;
  readonly 'cloud-dma': string;
  readonly 'hwid-spoofer': string;
};

export declare const CHECKOUT_PATH_REDIRECTS: ReadonlyMap<string, string>;

export declare const LEGACY_PRODUCT_REDIRECTS: ReadonlyMap<string, string>;

export declare function resolveCheckoutPathRedirect(pathname: string): string | null;

export declare function resolveLegacyProductRedirect(pathname: string): string | null;
