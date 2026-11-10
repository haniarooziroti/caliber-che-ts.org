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
    alt: 'Caliber tactical squad lineup on PC — hero preview',
    caption: 'Caliber on PC',
    captionDesc: 'Squad-based PvP before you tune modules.',
  },
  {
    src: CALIBER_MEDIA.a04,
    alt: 'Caliber overlay screenshot with ESP boxes in urban combat',
    caption: 'Player ESP',
    captionDesc: 'Operator tags and distance reads in a firefight.',
  },
  {
    src: CALIBER_MEDIA.a05,
    alt: 'Caliber aimbot and ESP screenshot during a scoped engagement',
    caption: 'Aim assistance',
    captionDesc: 'Scope view with highlight boxes on targets.',
  },
  {
    src: CALIBER_MEDIA.a02,
    alt: 'Caliber cheat menu and ESP settings on PC',
    caption: 'Module menu',
    captionDesc: 'Tuning panels for ESP and aim features.',
  },
  {
    src: CALIBER_MEDIA.a07,
    alt: 'Caliber wallhack and player ESP in a night map',
    caption: 'Wallhack intel',
    captionDesc: 'Through-cover operator silhouettes before a push.',
  },
];

export const DEFAULT_OG_IMAGE_ABSOLUTE = CALIBER_MEDIA.a06;
