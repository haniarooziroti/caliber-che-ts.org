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

/** Five slides — hero carousel autoplay (see hero-embla.ts). Frames from YT 0:47–1:57. */
export const HERO_CAROUSEL_SLIDES: MediaSlide[] = [
  {
    src: ROBRUN_MEDIA.a01,
    alt: 'Robrun squad gameplay on PC — hero carousel',
    caption: 'Robrun on PC',
    captionDesc: 'Live gameplay from the official preview window.',
  },
  {
    src: ROBRUN_MEDIA.a02,
    alt: 'Robrun combat movement during a squad fight',
    caption: 'Squad fight',
    captionDesc: 'Neutral lighting from the same match clip.',
  },
  {
    src: ROBRUN_MEDIA.a03,
    alt: 'Robrun operator engagement in urban PvP',
    caption: 'Urban PvP',
    captionDesc: 'Frame pulled between 0:47 and 1:57.',
  },
  {
    src: ROBRUN_MEDIA.a04,
    alt: 'Robrun push through cover during ranked play',
    caption: 'Cover push',
    captionDesc: 'Lightweight WebP for fast loads.',
  },
  {
    src: ROBRUN_MEDIA.a05,
    alt: 'Robrun end-of-round combat highlight',
    caption: 'Combat highlight',
    captionDesc: 'Carousel rotates every few seconds on desktop.',
  },
];

export const DEFAULT_OG_IMAGE_ABSOLUTE = ROBRUN_MEDIA.a06;
