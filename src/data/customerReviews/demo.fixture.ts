import type { CustomerReview } from './types';

const DISPLAY_NAMES = [
  'Alex Mercer',
  'Jordan K.',
  'Casey Nguyen',
  'Riley Ortiz',
  'Sam Delgado',
  'Morgan Ellis',
  'Taylor Brooks',
  'Jamie Chen',
  'Drew Patterson',
  'Quinn Avery',
  'Blake Holden',
  'Cameron Wu',
  'Avery Lawson',
  'Dakota Miles',
  'Harper Voss',
  'Logan Pierce',
  'Parker Shaw',
  'Reese Dalton',
  'Skyler Finch',
  'Emery Holt',
] as const;

const PRODUCT_FIXTURES: { slug: string; name: string }[] = [
  { slug: 'aimbot', name: 'Caliber Aimbot' },
  { slug: 'player-esp', name: 'Player ESP' },
  { slug: 'wallhack', name: 'Wallhack' },
  { slug: 'loot-esp', name: 'Loot ESP' },
  { slug: 'no-recoil', name: 'No Recoil' },
  { slug: 'stream-proof', name: 'Stream Proof' },
  { slug: 'cloud-dma', name: 'Cloud DMA' },
  { slug: 'hwid-spoofer', name: 'HWID Spoofer' },
];

const TITLES = [
  'Smooth after tuning FOV',
  'Setup took one evening',
  'Support replied same day',
  'Mixed results on ranked',
  'Worth comparing modules first',
  'Loader notes for Win11',
  'FPS stayed playable',
  'Checkout was straightforward',
  'Season patch delay',
  'Good docs on the product page',
];

const BODIES_SHORT = [
  'Key arrived quickly. Loader opened after a reboot.',
  'ESP filters cut clutter on a 1080p panel.',
  'Menu labels match what the product page lists.',
];

const BODIES_LONG = [
  'Tightened aimbot FOV and smoothing before ranked. Tracking feels less snappy than stock settings but more natural in clips.',
  'Player ESP distance tags helped rotations without cranking brightness. Still dialed skeletons off for FPS on older hardware.',
  'Checkout email was instant. Support answered a borderless vs exclusive fullscreen question the same night.',
  'Patch week paused injection for about a day. Status page matched what I saw—back online after the portal build refresh.',
  'No recoil preset took a night to tune per weapon. Not a substitute for spray control but steadier beams at mid range.',
  'Stream-proof test in OBS game capture showed no overlay on the recording—worth running your own clip before you go live.',
];

function demoRating(index: number): number {
  const pattern = [5, 5, 4, 5, 4, 3, 5, 4, 4, 2, 5, 3, 4, 5, 1, 4, 5, 3, 4, 5];
  return pattern[index % pattern.length] ?? 4;
}

/** Fallback catalog when no moderated reviews are in `published.ts` yet. */
export function buildDemoCustomerReviews(): CustomerReview[] {
  const reviews: CustomerReview[] = [];
  const start = Date.UTC(2024, 5, 1);

  for (let i = 0; i < 120; i++) {
    const product = PRODUCT_FIXTURES[i % PRODUCT_FIXTURES.length];
    const longBody = i % 3 !== 0;
    const content = longBody
      ? BODIES_LONG[i % BODIES_LONG.length]
      : BODIES_SHORT[i % BODIES_SHORT.length];
    const dayOffset = i * 2 + (i % 7);
    const createdAt = new Date(start + dayOffset * 86_400_000).toISOString().slice(0, 10);

    reviews.push({
      id: `review-${i + 1}`,
      displayName: DISPLAY_NAMES[i % DISPLAY_NAMES.length],
      rating: demoRating(i),
      title: TITLES[i % TITLES.length],
      content,
      createdAt,
      productSlug: product.slug,
      productName: product.name,
      verifiedPurchase: i % 4 === 0,
      status: 'published',
      helpfulCount: i % 5 === 0 ? (i % 12) + 1 : undefined,
    });
  }

  return reviews;
}
