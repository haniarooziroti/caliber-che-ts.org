export type CustomerReviewStatus = 'published' | 'pending' | 'rejected';

/** Customer-submitted review record. Add entries only from real, authorized submissions. */
export interface CustomerReview {
  id: string;
  displayName: string;
  rating: number;
  title?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  productSlug?: string;
  productName?: string;
  verifiedPurchase: boolean;
  status: CustomerReviewStatus;
  helpfulCount?: number;
  /** Development fixture marker — never set on production customer records */
  isDemo?: boolean;
}
