const gameplay = '/images/gameplay';

export const CALIBER_HERO_VIDEO = '/videos/caliber-hero-snapyt.mp4';
export const CALIBER_HERO_POSTER = `${gameplay}/hero-poster.webp`;

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

/** Hero carousel — Caliber gameplay stills (see hero-embla.ts). */
export const HERO_CAROUSEL_SLIDES: MediaSlide[] = [
  {
    src: CALIBER_MEDIA.a01,
    alt: 'Caliber cheats PC gameplay — hero carousel',
    caption: 'Caliber on PC',
    captionDesc: 'Squad gameplay still from the Caliber preview set.',
  },
  {
    src: CALIBER_MEDIA.a02,
    alt: 'Caliber ESP and combat positioning on PC',
    caption: 'ESP & positioning',
    captionDesc: 'Compare modules before checkout on the product hub.',
  },
  {
    src: CALIBER_MEDIA.a03,
    alt: 'Caliber operator engagement in PvP',
    caption: 'PvP engagement',
    captionDesc: 'Caliber cheat features vary by module and patch.',
  },
  {
    src: CALIBER_MEDIA.a04,
    alt: 'Caliber ranked match combat on PC',
    caption: 'Ranked play',
    captionDesc: 'Read guides for aimbot and wallhack setup.',
  },
  {
    src: CALIBER_MEDIA.a05,
    alt: 'Caliber cheats interface overlay on PC',
    caption: 'Module overlay',
    captionDesc: 'Carousel rotates every few seconds on desktop.',
  },
];

export const DEFAULT_OG_IMAGE_ABSOLUTE = CALIBER_MEDIA.a06;
