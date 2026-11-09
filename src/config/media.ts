const gameplay = '/images/gameplay';

export const CALIBER_MEDIA = {
  a01: `${gameplay}/a01.webp`,
  a02: `${gameplay}/a02.webp`,
  a03: `${gameplay}/a03.webp`,
  a04: `${gameplay}/a04.webp`,
  a05: `${gameplay}/a05.webp`,
  a06: `${gameplay}/a06.webp`,
  a07: `${gameplay}/a07.webp`,
  a08: `${gameplay}/a08.webp`,
  a09: `${gameplay}/a09.webp`,
  a10: `${gameplay}/a10.webp`,
  a11: `${gameplay}/a11.webp`,
} as const;

export interface MediaSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

/** Five slides — hero carousel autoplay (see hero-embla.ts). */
export const HERO_CAROUSEL_SLIDES: MediaSlide[] = [
  {
    src: CALIBER_MEDIA.a01,
    alt: 'Caliber player ESP and loot tags across an industrial POI',
    caption: 'Player ESP',
    captionDesc: 'Boxes, health, and loot context during a drop.',
  },
  {
    src: CALIBER_MEDIA.a02,
    alt: 'Caliber wallhack skeleton outlines through building cover',
    caption: 'Wallhack read',
    captionDesc: 'Silhouettes with name and range tags.',
  },
  {
    src: CALIBER_MEDIA.a03,
    alt: 'Caliber aimbot assist with ESP boxes during ADS combat',
    caption: 'Aimbot tuning',
    captionDesc: 'Lock and FOV during a mid-range fight.',
  },
  {
    src: CALIBER_MEDIA.a09,
    alt: 'Caliber ESP with scope view and enemy highlights',
    caption: 'Scoped ESP',
    captionDesc: 'Enemy highlights while aiming down sights.',
  },
  {
    src: CALIBER_MEDIA.a05,
    alt: 'Caliber wallhack overlooking a valley with enemy boxes',
    caption: 'Long-range wallhack',
    captionDesc: 'High-ground intel before a push.',
  },
];

export const DEFAULT_OG_IMAGE_ABSOLUTE = CALIBER_MEDIA.a06;
