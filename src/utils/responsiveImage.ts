const RASTER_EXT = /\.(png|jpe?g|webp)$/i;

export function isAbsoluteImageUrl(src: string): boolean {
  return src.startsWith('http://') || src.startsWith('https://');
}

/** Card / product gallery responsive widths. */
export const CARD_IMAGE_WIDTHS = [400, 800] as const;
export const CARD_IMAGE_SIZES = '(min-width: 1024px) 330px, (min-width: 640px) 50vw, 100vw';

/** Hero slider display widths. */
export const HERO_IMAGE_WIDTHS = [400, 800, 1200] as const;
export const HERO_IMAGE_SIZES = '(min-width: 1024px) 490px, 100vw';

export const THUMB_IMAGE_WIDTHS = [400] as const;
export const DEFAULT_IMAGE_WIDTHS = [400, 800, 1200] as const;

export function heroPreloadSrc(src: string): string {
  return webpSrc(src, HERO_IMAGE_WIDTHS[0]);
}

export function stripRasterExt(src: string): string {
  if (isAbsoluteImageUrl(src)) return src;
  return src.replace(RASTER_EXT, '');
}

export function webpSrc(src: string, width: number): string {
  if (isAbsoluteImageUrl(src)) return src;
  const base = stripRasterExt(src);
  if (base.endsWith(`-${width}`)) return `${base}.webp`;
  return `${base}-${width}.webp`;
}

export function responsiveSrcSet(src: string, widths: readonly number[] = DEFAULT_IMAGE_WIDTHS): string {
  if (isAbsoluteImageUrl(src)) {
    const w = widths[widths.length - 1] ?? 1200;
    return `${src} ${w}w`;
  }
  return widths.map((width) => `${webpSrc(src, width)} ${width}w`).join(', ');
}

/** Smallest variant — used as img src so Lighthouse and no-srcset clients get the right size. */
export function defaultWebpSrc(src: string, widths: readonly number[]): string {
  if (isAbsoluteImageUrl(src)) return src;
  return webpSrc(src, widths[0] ?? 400);
}
