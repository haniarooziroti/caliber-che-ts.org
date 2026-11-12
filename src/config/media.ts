const gameplay = '/images/gameplay';

export const ROBRUN_HERO_POSTER = `${gameplay}/hero-poster.webp`;

export const ROBRUN_MEDIA = {
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
    src: ROBRUN_MEDIA.a01,
    alt: 'Robrun tactical squad lineup on PC — hero preview',
    caption: 'Robrun on PC',
    captionDesc: 'Squad-based PvP before you tune modules.',
  },
  {
    src: ROBRUN_MEDIA.a04,
    alt: 'Robrun overlay screenshot with ESP boxes in urban combat',
    caption: 'Player ESP',
    captionDesc: 'Operator tags and distance reads in a firefight.',
  },
  {
    src: ROBRUN_MEDIA.a05,
    alt: 'Robrun aimbot and ESP screenshot during a scoped engagement',
    caption: 'Aim assistance',
    captionDesc: 'Scope view with highlight boxes on targets.',
  },
  {
    src: ROBRUN_MEDIA.a02,
    alt: 'Robrun cheat menu and ESP settings on PC',
    caption: 'Module menu',
    captionDesc: 'Tuning panels for ESP and aim features.',
  },
  {
    src: ROBRUN_MEDIA.a07,
    alt: 'Robrun wallhack and player ESP in a night map',
    caption: 'Wallhack intel',
    captionDesc: 'Through-cover operator silhouettes before a push.',
  },
];

export const DEFAULT_OG_IMAGE_ABSOLUTE = ROBRUN_MEDIA.a06;
