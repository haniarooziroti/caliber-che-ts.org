/**
 * Customer reviews API — re-export for existing import paths.
 * Legacy fabricated review arrays were removed; only publishedCustomerReviews is used.
 */
export {
  computeReviewStats,
  getPublishedCustomerReviews,
  getProductReviewStats,
  publishedCustomerReviews,
  reviewProductOptions,
  reviewSearchBlob,
  reviewTimestamp,
  reviewsPageUrlWithProduct,
  type CustomerReview,
  type ProductReviewStats,
  type ReviewAggregateStats,
} from './customerReviews/index';

import { computeReviewStats, getPublishedCustomerReviews } from './customerReviews/index';

export function getAllSiteReviews() {
  return getPublishedCustomerReviews();
}

export const REVIEW_SUMMARY = (() => {
  const stats = computeReviewStats();
  return {
    total: stats.total,
    average: stats.average,
    verified: stats.verifiedCount,
  };
})();
