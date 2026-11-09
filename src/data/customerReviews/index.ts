import { productPages } from '../products';
import { productPath } from '../../utils/path';
import { publishedCustomerReviews } from './published';
import type { CustomerReview } from './types';

export type { CustomerReview, CustomerReviewStatus } from './types';
export { publishedCustomerReviews };

export interface ReviewAggregateStats {
  total: number;
  verifiedCount: number;
  average: number | null;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export interface ProductReviewStats {
  slug: string;
  name: string;
  total: number;
  average: number | null;
}

function clampRating(rating: number): number {
  return Math.min(5, Math.max(1, Math.round(rating)));
}

/** Published reviews from authorized data only (production source of truth). */
export function getGenuinePublishedCustomerReviews(): CustomerReview[] {
  return publishedCustomerReviews.filter((r) => r.status === 'published' && !r.isDemo);
}

/** @deprecated Use getGenuinePublishedCustomerReviews */
export function getPublishedCustomerReviews(): CustomerReview[] {
  return getGenuinePublishedCustomerReviews();
}

/** Reviews shown on the reviews page (moderated published records only). */
export function getReviewsForDisplay(): CustomerReview[] {
  return getGenuinePublishedCustomerReviews();
}

export function computeReviewStats(
  reviews: CustomerReview[] = getGenuinePublishedCustomerReviews(),
): ReviewAggregateStats {
  const distribution: ReviewAggregateStats['distribution'] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let verifiedCount = 0;
  let sum = 0;

  for (const review of reviews) {
    const star = clampRating(review.rating) as 1 | 2 | 3 | 4 | 5;
    distribution[star] += 1;
    sum += star;
    if (review.verifiedPurchase) verifiedCount += 1;
  }

  return {
    total: reviews.length,
    verifiedCount,
    average: reviews.length ? Math.round((sum / reviews.length) * 10) / 10 : null,
    distribution,
  };
}

export function getProductReviewStats(productSlug: string): ProductReviewStats | null {
  const product = productPages.find((p) => p.slug === productSlug);
  if (!product) return null;

  const scoped = getGenuinePublishedCustomerReviews().filter((r) => r.productSlug === productSlug);
  const agg = computeReviewStats(scoped);
  return {
    slug: productSlug,
    name: product.name,
    total: agg.total,
    average: agg.average,
  };
}

export function reviewProductOptions(): { slug: string; name: string; href: string }[] {
  return productPages.map((p) => ({
    slug: p.slug,
    name: p.name,
    href: productPath(p.slug),
  }));
}

export function reviewTimestamp(review: CustomerReview): number {
  const t = Date.parse(review.createdAt);
  return Number.isNaN(t) ? 0 : t;
}

/** Lowercase haystack for client-side review search (name, title, body, product). */
export function reviewSearchBlob(review: CustomerReview): string {
  return [
    review.displayName,
    review.title ?? '',
    review.content,
    review.productName ?? '',
    review.productSlug ?? '',
  ]
    .join(' ')
    .toLocaleLowerCase();
}

export function reviewsPageUrlWithProduct(productSlug: string): string {
  return `/reviews/?product=${encodeURIComponent(productSlug)}`;
}
