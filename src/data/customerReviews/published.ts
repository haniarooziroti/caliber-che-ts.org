import type { CustomerReview } from './types';
import { publishedReviewCatalog } from './published.catalog';

/**
 * Published customer reviews — moderated catalog used on /reviews/ and product stats.
 */
export const publishedCustomerReviews: CustomerReview[] = [...publishedReviewCatalog];
