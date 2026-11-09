/** Checkout hops use same-tab /go/ redirects — no special rel on links. */
export const AFFILIATE_REL = undefined;

export const AFFILIATE_DISCLOSURE_SHORT =
  'Affiliate disclosure: checkout links may earn us a commission.';

export const AFFILIATE_DISCLOSURE_LONG =
  'Affiliate disclosure: purchase links on this site route through an affiliate checkout path. Prices, keys, refunds, and post-purchase support are handled by the linked store, not by calibercheat.net.';

export function isAffiliateHref(href: string | undefined): boolean {
  if (!href) return false;
  return href.includes('/go/');
}

export function affiliateRel(_href: string | undefined): string | undefined {
  return undefined;
}
