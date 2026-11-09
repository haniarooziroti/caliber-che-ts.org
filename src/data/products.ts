import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedForumSlugs: string[];
  seoDescription: string;
}

const productBase = '/products/caliber/';

const productPageSeoDescription: Record<string, string> = {
  aimbot: 'Caliber cheats aimbot with FOV, smoothness, and bone priority for ranked fights. Read tuning notes, then open checkout.',
  'player-esp': 'Caliber cheats ESP with boxes, health bars, and distance tags. Compare player ESP, then buy when layouts feel clean.',
  wallhack: 'Caliber wallhack for peek reads and building clears on PC. Pair with player ESP, then open the store.',
  'loot-esp': 'Caliber loot ESP for weapons, shields, and attachments through walls. Filter clutter before checkout.',
  'no-recoil': 'Caliber no recoil with per-weapon strength for AR control. Test presets, then buy for pubs or ranked.',
  'stream-proof': 'Stream-proof hide for OBS while overlays stay on your monitor. Record a local test, then checkout.',
  'cloud-dma': 'Cloud DMA for external memory read setups—hardware expectations, firmware notes, and checkout on the DMA product path.',
  'hwid-spoofer': 'HWID spoofer for PC identity resets before new accounts. Read limits and checkout when it matches your situation.',
};

const productRelatedForumSlugs: Record<string, string[]> = {
  aimbot: ['aimbot-settings-what-level', 'no-recoil-settings-natural', 'caliber-loader-setup'],
  'player-esp': ['player-esp-vs-wallhack', 'caliber-cheat-features-overview', 'esp-colors-ranked-visibility'],
  wallhack: ['player-esp-vs-wallhack', 'caliber-cheat-features-overview', 'stream-proof-ranked-setup'],
  'loot-esp': ['caliber-cheat-features-overview', 'player-esp-vs-wallhack', 'caliber-loader-setup'],
  'no-recoil': ['no-recoil-settings-natural', 'aimbot-settings-what-level', 'caliber-cheat-features-overview'],
  'stream-proof': ['stream-proof-ranked-setup', 'caliber-loader-setup', 'caliber-cheat-features-overview'],
  'cloud-dma': ['caliber-loader-setup', 'caliber-cheat-features-overview', 'player-esp-vs-wallhack'],
  'hwid-spoofer': ['caliber-loader-setup', 'caliber-cheat-features-overview', 'aimbot-settings-what-level'],
};


const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on calibercheat.net before purchase—especially after an Caliber update.',
  },
  {
    num: '02',
    title: 'Choose your modules',
    desc: 'Open the aimbot, ESP, or wallhack page that matches your goal, then continue to secure checkout.',
  },
  {
    num: '03',
    title: 'Complete checkout',
    desc: 'Pay through the order flow. Keep your order email handy for portal access and support.',
  },
  {
    num: '04',
    title: 'Install and tune',
    desc: 'Download the loader from the portal, load a calm preset, test in pubs, then queue ranked if you want.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Caliber receives frequent updates. Confirm module availability on the live status panel at calibercheat.net before you purchase or launch. Overlay behavior can change after patches.';

const sharedLimitations =
  'Third-party software in Caliber can violate the game Terms of Service and lead to account action. You use this software at your own risk. Compatibility and availability can change after game or Windows updates without notice.';

const caliberSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Supported 64-bit edition of Windows 10 or Windows 11.' },
  { icon: 'reqSteam', text: 'Current Caliber PC client with latest patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for portal access and patch delivery.' },
  { icon: 'reqCpu', text: 'A system that meets Caliber published hardware requirements.' },
];

type GalleryKey = keyof typeof galleryRaw;

const gameplay = '/images/gameplay';

const galleryRaw = {
  // Shared pool — each key used at most twice across hero, products, and blogs
  gpEspWide: {
    src: `${gameplay}/a01.webp`,
    alt: 'Caliber player ESP and loot ESP boxes across an industrial Caliber POI',
    caption: 'Player + loot ESP',
    captionDesc: 'Enemy boxes, distance tags, and loot highlights in one view.',
  },
  gpWallSkeleton: {
    src: `${gameplay}/a02.webp`,
    alt: 'Caliber wallhack skeleton ESP showing enemy outlines through Caliber buildings',
    caption: 'Wallhack skeletons',
    captionDesc: 'Through-wall silhouettes with name and range tags.',
  },
  gpAimLock: {
    src: `${gameplay}/a03.webp`,
    alt: 'Caliber aimbot lock with ESP boxes and tracer lines in Caliber combat',
    caption: 'Aimbot lock',
    captionDesc: 'Target lock with ESP boxes during an ADS fight.',
  },
  gpEspAimline: {
    src: `${gameplay}/a04.webp`,
    alt: 'Caliber ESP with aimbot snapline tracking enemies across a canyon',
    caption: 'ESP + snapline',
    captionDesc: 'Player ESP paired with a blue aim assist line.',
  },
  gpWallValley: {
    src: `${gameplay}/a05.webp`,
    alt: 'Caliber wallhack and loot ESP overlooking a snowy Caliber valley',
    caption: 'Valley wallhack',
    captionDesc: 'Long-range ESP boxes and loot outlines from high ground.',
  },
  gpAimSnap: {
    src: `${gameplay}/a06.webp`,
    alt: 'Caliber aimbot snapline locking Pathfinder through an R-301 sight',
    caption: 'Aimbot snap',
    captionDesc: 'Snapline aim assist with electric-blue ESP boxes.',
  },
  gpAimBurst: {
    src: `${gameplay}/a07.webp`,
    alt: 'Caliber aimbot tracking with ESP boxes while spraying an R-301',
    caption: 'Aimbot spray',
    captionDesc: 'Aim assist and ESP during a mid-range spray.',
  },
  gpAimScope: {
    src: `${gameplay}/a08.webp`,
    alt: 'Caliber aimbot ESP focusing Pathfinder through holographic sight',
    caption: 'Scoped aimbot',
    captionDesc: 'ADS aim assist with box ESP on the active target.',
  },
  gpEspCanyon: {
    src: `${gameplay}/a04.webp`,
    alt: 'Caliber player ESP boxes and loot tags in an Caliber canyon fight',
    caption: 'Canyon ESP',
    captionDesc: 'Readable player and loot ESP across open ground.',
  },
  gpEspScope: {
    src: `${gameplay}/a09.webp`,
    alt: 'Caliber ESP and aim lock through a scope with team and enemy highlights',
    caption: 'Scoped ESP',
    captionDesc: 'Enemy and squad ESP while aiming down sights.',
  },
  gpWallLoot: {
    src: `${gameplay}/a08.webp`,
    alt: 'Caliber wallhack with loot ESP highlighting bins and enemy legends',
    caption: 'Wallhack + loot',
    captionDesc: 'Through-wall enemies plus loot and supply bin tags.',
  },
  gpWallRoof: {
    src: `${gameplay}/a10.webp`,
    alt: 'Caliber rooftop wallhack showing enemy and teammate ESP boxes',
    caption: 'Rooftop wallhack',
    captionDesc: 'Enemy and squad ESP from a high POI overlook.',
  },
  gpRecoilAds: {
    src: `${gameplay}/a07.webp`,
    alt: 'Caliber no recoil ADS spray on an R-301 with enemy ESP highlight',
    caption: 'No recoil ADS',
    captionDesc: 'Controlled spray while tracking a highlighted target.',
  },
  gpRecoilMenu: {
    src: `${gameplay}/a06.webp`,
    alt: 'Caliber no recoil stable aim menu toggles during Caliber combat',
    caption: 'No recoil menu',
    captionDesc: 'No recoil, stable aim, and accuracy toggles mid-fight.',
  },
  gpRecoilTrack: {
    src: `${gameplay}/a07.webp`,
    alt: 'Caliber no recoil tracking Loba with box ESP at mid range',
    caption: 'Recoil tracking',
    captionDesc: 'Steady AR tracking with ESP distance tags.',
  },
  gpAimXray: {
    src: `${gameplay}/a11.webp`,
    alt: 'Caliber aimbot and wallhack x-ray view with loot ESP overlays',
    caption: 'X-ray aim view',
    captionDesc: 'Through-structure ESP with aim assist and loot glow.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

function slugFromHref(href: string): string {
  const bare = href.replace(/^\/(?:de|fr|es|pt-BR|ru|pl|tr|it)(?=\/)/, '');
  const segment = bare.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'caliber-module';
}

const tierAbout: Record<string, ProductPage['about']> = {
  aimbot: [
    {
      type: 'p',
      text: 'Caliber aimbot is for players who want smoother tracking without maxing every slider on day one. FOV, smoothness, and bone priority are the three controls that matter most before ranked.',
    },
    { type: 'h2', text: 'Start calm, then tighten' },
    {
      type: 'p',
      text: 'A lower FOV with moderate smoothness looks more natural than a wide lock that snaps across the screen. Test in pubs, then decide if you need stronger settings for ranked.',
    },
  ],
  'player-esp': [
    {
      type: 'p',
      text: 'Player ESP is the awareness layer most people enable first. Boxes, health bars, and distance readouts help you hold angles and track third parties without guessing.',
    },
    { type: 'h2', text: 'Keep the overlay readable' },
    {
      type: 'p',
      text: 'Too many colors and skeleton lines can clutter fights. Start with box ESP and health bars, then add skeleton or distance only if you still need them.',
    },
  ],
  wallhack: [
    {
      type: 'p',
      text: 'Wallhack overlays help you clear buildings and track peeks through solid cover. Most players run wallhack together with player ESP rather than alone.',
    },
    { type: 'h2', text: 'Use it for info, not panic swings' },
    {
      type: 'p',
      text: 'Knowing someone is behind a wall is only useful if you still play the angle. Pair wallhack with sound and normal movement so your peeks stay deliberate.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  aimbot: [
    { type: 'h2', text: 'What you configure' },
    {
      type: 'p',
      text: 'FOV limits how far the aimbot looks for targets. Smoothness controls how quickly your crosshair moves. Bone priority chooses head or body. Visibility checks reduce locks through walls when you want stricter behavior.',
    },
    { type: 'h2', text: 'Who usually buys aimbot' },
    {
      type: 'p',
      text: 'Players who already understand Caliber gunplay but want more consistent tracking in chaotic close fights. If you only want information, start with [player ESP](/products/caliber/player-esp/) instead.',
    },
  ],
  'player-esp': [
    { type: 'h2', text: 'Included ESP options' },
    {
      type: 'p',
      text: 'Box ESP, health bars, distance ESP, skeleton ESP, and team filters. Weapon ESP can sit alongside player ESP when you want loadout info before a door peek.',
    },
    { type: 'h2', text: 'Related modules' },
    {
      type: 'p',
      text: 'Many players add [wallhack](/products/caliber/wallhack/) for thicker cover reads, or [loot ESP](/products/caliber/loot-esp/) for faster POI clears.',
    },
  ],
  wallhack: [
    { type: 'h2', text: 'How wallhack fits' },
    {
      type: 'p',
      text: 'Wallhack is the through-cover layer. It is most useful in buildings, tight corridors, and late-circle holds where you need to know who is waiting.',
    },
    { type: 'h2', text: 'Buy path' },
    {
      type: 'p',
      text: 'Open checkout when the status banner is online. After purchase, load wallhack with a simple player ESP preset before adding aimbot.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'loot-esp': [
    { type: 'h2', text: 'When loot ESP helps' },
    {
      type: 'p',
      text: 'Loot ESP is for players who want weapons, shields, and attachments marked through walls so they spend less time opening empty bins.',
    },
    { type: 'h2', text: 'Filter the noise' },
    {
      type: 'p',
      text: 'Turn off common clutter if the screen gets busy. Keep high-value weapons and shields first, then expand filters once you are comfortable.',
    },
  ],
  'no-recoil': [
    { type: 'h2', text: 'Tuning no recoil' },
    {
      type: 'p',
      text: 'Start with low strength on the guns you actually use. Max strength can feel obvious and harder to control when you swap weapons mid-fight.',
    },
    { type: 'h2', text: 'Pairs well with aimbot' },
    {
      type: 'p',
      text: 'Many players combine moderate no recoil with a calm [aimbot](/products/caliber/aimbot/) FOV instead of pushing either module to the limit.',
    },
  ],
  'stream-proof': [
    { type: 'h2', text: 'What stream proof does' },
    {
      type: 'p',
      text: 'Stream-proof mode keeps overlays on your monitor while OBS and similar capture tools record a clean game feed.',
    },
    { type: 'h2', text: 'Always test locally' },
    {
      type: 'p',
      text: 'Record a short clip with your real scene before going live. Preview windows alone are not enough.',
    },
  ],
  'cloud-dma': [
    { type: 'h2', text: 'When Cloud DMA fits' },
    {
      type: 'p',
      text: 'Cloud DMA is for buyers who already run or plan a two-PC external read setup with supported firmware. It is not the same checkout path as standard Caliber module keys.',
    },
    { type: 'h2', text: 'Hardware first' },
    {
      type: 'p',
      text: 'Confirm cabling, second PC specs, and firmware compatibility before you pay. Support can only help after the physical stack matches the published requirements.',
    },
  ],
  'hwid-spoofer': [
    { type: 'h2', text: 'What an HWID spoofer does' },
    {
      type: 'p',
      text: 'An HWID spoofer changes how your PC fingerprint appears to anti-cheat and the game client. People use it when moving to a new account after a hardware-linked restriction.',
    },
    { type: 'h2', text: 'Know the limits' },
    {
      type: 'p',
      text: 'Spoofing does not reverse a ban by itself and cannot fix bad opsec. Read the status banner and follow a clean Windows install checklist when support recommends it.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  aimbot: {
    images: slide('gpAimSnap', 'gpAimBurst', 'gpAimScope'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: caliberSystemRequirements,
    fullFeatures: [
      'Advanced aimbot',
      'FOV limiter',
      'Smoothness control',
      'Bone priority',
      'Visibility checks',
      'Hotkey toggle',
      'Close-range preset',
      'Mid-range preset',
      'Pairs with no recoil',
      'Cloud config backup',
      'Portal updates',
      '24/7 support',
    ],
    overview: {
      title: 'Aimbot built around controllable tracking',
      paragraphs: [
        'This Caliber aimbot focuses on FOV, smoothness, and bone selection so you can keep tracking controlled in pubs and ranked. Start with a smaller FOV, then raise it only if your fights need it.',
        'Most buyers pair aimbot with player ESP rather than running aim alone. Check status on calibercheat.net before every session.',
      ],
    },
  },
  'player-esp': {
    images: slide('gpEspCanyon', 'gpEspScope', 'gpEspWide'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: caliberSystemRequirements,
    fullFeatures: [
      'Player ESP',
      'Box ESP',
      'Health bars',
      'Distance ESP',
      'Skeleton ESP',
      'Weapon ESP',
      'Team filters',
      'Readable colors',
      'Stream-proof ready',
      'Cloud config backup',
      'Portal updates',
      '24/7 support',
    ],
    overview: {
      title: 'Player ESP for cleaner information',
      paragraphs: [
        'Player ESP shows boxes, health bars, distance, and optional skeleton lines through cover. It is the module most players enable first because it improves rotations without forcing aim changes.',
        'Keep the overlay simple at first. Add wallhack or loot ESP once the basic layout feels comfortable.',
      ],
    },
  },
  wallhack: {
    images: slide('gpWallLoot', 'gpWallRoof', 'gpWallSkeleton'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: caliberSystemRequirements,
    fullFeatures: [
      'Wallhack overlays',
      'Through-cover silhouettes',
      'Works with player ESP',
      'Building clear reads',
      'Angle hold support',
      'Stream-proof ready',
      'Cloud config backup',
      'Portal updates',
      '24/7 support',
    ],
    overview: {
      title: 'Wallhack for cover-heavy fights',
      paragraphs: [
        'Caliber wallhack helps you track enemies behind walls and inside buildings. It is strongest when paired with player ESP health bars so you know whether a peek is worth taking.',
        'Use wallhack for information, then still play the angle. That combination tends to feel more stable than swinging every silhouette you see.',
      ],
    },
  },
  'loot-esp': {
    images: slide('gpWallLoot', 'gpEspCanyon', 'gpEspAimline'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: caliberSystemRequirements,
    fullFeatures: [
      'Loot ESP',
      'Weapon labels',
      'Attachment tags',
      'Shield highlights',
      'Heal markers',
      'Filter common clutter',
      'POI clear presets',
      'Cloud config backup',
    ],
    overview: {
      title: 'Loot ESP for faster POI paths',
      paragraphs: [
        'Loot ESP marks weapons, shields, and attachments through walls so you can plan a loot path instead of checking every container.',
        'Filter low-value noise if the screen gets busy. Most players keep high-tier guns and shields on, then expand later.',
      ],
    },
  },
  'no-recoil': {
    images: slide('gpRecoilAds', 'gpRecoilMenu', 'gpRecoilTrack'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: caliberSystemRequirements,
    fullFeatures: [
      'No recoil',
      'Per-weapon strength',
      'AR spray presets',
      'Pairs with aimbot',
      'Pub profile',
      'Ranked profile',
      'Cloud config backup',
    ],
    overview: {
      title: 'No recoil with room to tune',
      paragraphs: [
        'No recoil for Caliber keeps common AR sprays tighter. The useful approach is moderate strength on the guns you main, not maximum values on every weapon.',
        'Combine with a calm aimbot FOV if you want tracking and spray control together.',
      ],
    },
  },
  'cloud-dma': {
    images: slide('gpAimXray', 'gpWallSkeleton', 'gpEspWide'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: caliberSystemRequirements,
    fullFeatures: [
      'Cloud DMA path',
      'External memory read',
      'Two-PC workflow',
      'Firmware compatibility notes',
      'Portal access',
      'Setup documentation',
      'Support routing',
    ],
    overview: {
      title: 'Cloud DMA for external read setups',
      paragraphs: [
        'Cloud DMA is the checkout path when your build relies on external memory access instead of a standard loader-only stack. Expect a second PC, compatible hardware, and firmware that matches current notes.',
        'If you only need aimbot or ESP on one machine, start with the main Caliber module catalog instead.',
      ],
    },
  },
  'hwid-spoofer': {
    images: slide('gpEspScope', 'gpWallRoof', 'gpRecoilMenu'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: caliberSystemRequirements,
    fullFeatures: [
      'HWID reset workflow',
      'Disk and NIC options',
      'Guided reinstall notes',
      'Portal access',
      'Status-linked updates',
      'Support routing',
    ],
    overview: {
      title: 'HWID spoofer for fresh fingerprints',
      paragraphs: [
        'HWID spoofer tooling helps you present a different hardware fingerprint when you open a new account on the same machine. Read what changed on your ban message before assuming spoofing alone is enough.',
        'Pair with a clean account plan—new email, payment method, and behavior—rather than reusing flagged habits.',
      ],
    },
  },
  'stream-proof': {
    images: slide('gpAimXray', 'gpAimLock', 'gpWallValley'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: caliberSystemRequirements,
    fullFeatures: [
      'Stream-proof mode',
      'OBS-friendly capture',
      'Game capture tests',
      'Per-module hide',
      'Local recording checklist',
      'Works with ESP and aimbot',
    ],
    overview: {
      title: 'Stream-proof capture for creators',
      paragraphs: [
        'Stream-proof mode keeps cheat overlays on your monitor while capture software records a clean feed. Test with a local recording before you go live.',
        'Toggle per module if you only need ESP hidden while other UI stays visible on your screen.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      seoDescription: productPageSeoDescription[slug] ?? cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(cheat.title),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: caliberSystemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedForumSlugs: productRelatedForumSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        seoDescription: productPageSeoDescription[slug] ?? product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: caliberSystemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedForumSlugs: productRelatedForumSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

export const heroSlides = slide('gpEspWide', 'gpWallSkeleton', 'gpAimLock', 'gpEspScope', 'gpWallValley');

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description:
    'Caliber cheats and hacks catalog for PC—compare aimbot, ESP, wallhack, and other cheat features. Read reviews, then checkout for portal cheat download.',
  buyUrl: checkoutPath('caliber'),
};
