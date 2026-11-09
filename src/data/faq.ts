import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, productPath, ROUTES } from '../utils/path';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const aimbot = link('Caliber aimbot', productPath('aimbot'));
const esp = link('player ESP', productPath('player-esp'));
const wallhack = link('wallhack', productPath('wallhack'));
const loot = link('loot ESP', productPath('loot-esp'));
const productsHub = link('Caliber products', ROUTES.products);
const faqPage = link('full FAQ', ROUTES.faq);
const forums = link('forums', ROUTES.forum);

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'status',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Where do I check if Caliber cheats is online?',
    a: a('The live status banner is on calibercheat.net. Always check after an Caliber update before you buy or launch.'),
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: a('Your portal unlocks the loader and setup notes when payment clears. Follow those steps before opening Caliber.'),
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can I get banned using third-party Caliber cheats?',
    a: a('Yes. Any modification carries risk. Anti-cheat and report systems change over time. Read current status and accept the risk before use.'),
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platforms are supported?',
    a: a('Windows 10/11 64-bit PC only. Console is not supported.'),
  },
  {
    id: 'license-move',
    topic: 'setup',
    icon: 'faqLicenseMove',
    q: 'Can I move my license to a new PC?',
    a: a('Yes—use the HWID reset in your portal or open a support ticket with your order email.'),
  },
  {
    id: 'products-page',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Where are modules listed?',
    aHtml: `Aimbot, ESP, wallhack, loot ESP, no recoil, and stream-proof pages are under ${productsHub}.`,
    a: a('Modules are listed under Products on calibercheat.net.'),
  },
  {
    id: 'aimbot-settings',
    topic: 'scripts',
    icon: 'faqWhichTierScripts',
    q: 'What aimbot settings should I start with?',
    aHtml: `Start with a smaller FOV and moderate smoothness on the ${aimbot} page. Read the ${forums} for what other players run in ranked.`,
    a: a('Start with a smaller FOV and moderate smoothness. Raise values only after pubs feel stable.'),
    scopes: ['aimbot', 'no-recoil'],
  },
  {
    id: 'esp-first',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'Should I enable ESP or aimbot first?',
    aHtml: `Most players enable ${esp} first for information, then add ${aimbot} on a hotkey. ${wallhack} pairs well with ESP inside buildings.`,
    a: a('Most players enable player ESP first, then add aimbot on a hotkey.'),
    scopes: ['player-esp', 'wallhack', 'aimbot'],
  },
  {
    id: 'what-is-esp',
    topic: 'esp',
    icon: 'faqEspVsScripts',
    q: 'What does player ESP include?',
    aHtml: `${esp} typically covers boxes, health bars, distance, and optional skeleton lines. ${loot} is separate for gear labels.`,
    a: a('Player ESP typically covers boxes, health bars, distance, and optional skeleton lines.'),
    scopes: ['player-esp', 'loot-esp'],
  },
  {
    id: 'stream-proof',
    topic: 'setup',
    icon: 'faqStreamProof',
    q: 'Does stream-proof hide overlays from OBS?',
    a: a('Stream-proof mode is meant to keep overlays off capture. Always verify with a local recording, not only the OBS preview.'),
    scopes: ['stream-proof'],
  },
  {
    id: 'forums',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Where can I read setup discussions?',
    aHtml: `Use the ${forums} for aimbot settings, install steps, and feature questions. Also see the ${faqPage} for short answers.`,
    a: a('Use the forums for aimbot settings, install steps, and feature questions.'),
  },
  {
    id: 'compare-modules',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'How do I choose between aimbot, ESP, and wallhack?',
    aHtml: `Want tracking help → ${aimbot}. Want information → ${esp}. Clearing buildings → add ${wallhack}. Many players combine ESP with a hotkeyed aimbot.`,
    a: a('Choose aimbot for tracking, ESP for information, and wallhack for through-cover reads.'),
  },
  {
    id: 'support-help',
    topic: 'setup',
    icon: 'faqDiscordHelp',
    q: 'Where do I get setup help?',
    a: a('Use the product notes in your portal, or open Support with your order email and the exact loader error.'),
  },
  {
    id: 'cheat-download',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'Where does Caliber cheat download come from?',
    a: a('Only from the operator portal tied to your key after checkout—not email attachments or Discord DMs.'),
  },
  {
    id: 'pc-reqs',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'What are the Caliber PC requirements for this software?',
    a: a('You still need a PC that runs Caliber smoothly on its own—64-bit Windows 10/11, current client, and admin rights for the loader.'),
  },
  {
    id: 'update-compat',
    topic: 'safety',
    icon: 'faqStatus',
    q: 'How does update compatibility work after a season update?',
    a: a('Game patches can pause loaders until builds catch up. Check the live banner and forum threads after major season drops.'),
  },
  {
    id: 'fps-lag',
    topic: 'setup',
    icon: 'faqEspVsScripts',
    q: 'Can overlays hurt FPS or cause lag?',
    aHtml: `Dense ${esp} layers can cost frames. Lower skeleton or glow strength, cap distance tags, and test in pubs—same ideas as normal ${link('Caliber game settings', '/forum/')} tuning.`,
    a: a('Dense ESP can cost frames. Lower skeleton or glow strength and test in pubs before ranked.'),
  },
  {
    id: 'install-guide',
    topic: 'setup',
    icon: 'faqBlogSetupLoader',
    q: 'Is there an Caliber software installation guide?',
    aHtml: `Portal steps are the official path. For peer tips, see ${forums} threads on install order and Defender exclusions.`,
    a: a('Follow portal steps first; forums add troubleshooting detail from other PC players.'),
  },
];

export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Caliber cheats FAQ',
  subtitle: 'Filter aimbot, ESP, products, setup, safety, and forum-related answers.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'esp',
  'scripts',
  'safety',
  'products',
  'blog',
  'setup',
];

export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers tied to what you are reading—visit the FAQ page for every topic.',
} as const;

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    ['status', 'after-buy', 'ban-risk', 'platforms', 'esp-first', 'aimbot-settings'].includes(f.id),
  );
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs;
}

export function getFaqsByTopic(topic: FaqTopic): SiteFaqItem[] {
  if (topic === 'all') return siteFaqs;
  return siteFaqs.filter((f) => f.topic === topic);
}

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export function getProductFaqs(slug: string, kind: 'tier' | 'utility'): SiteFaqItem[] {
  const general = siteFaqs.filter(
    (f) => !f.scopes && ['setup', 'safety', 'plans', 'esp', 'scripts'].includes(f.topic),
  );
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));
  const combined =
    kind === 'tier' ? [...scoped, ...general.slice(0, 8)] : [...scoped, ...general.slice(0, 6)];

  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function getBlogFaqs(_tag: string, _slug: string): SiteFaqItem[] {
  return siteFaqs.filter((f) => ['forums', 'status', 'after-buy', 'ban-risk'].includes(f.id));
}

export const compareRows = [
  { feature: 'Player ESP & boxes', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Health bars', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Distance ESP', icon: 'compareMinimapHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Skeleton ESP', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Wallhack overlays', icon: 'compareFullMapHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Weapon ESP', icon: 'compareAbilityRadius' as const, lite: true, pro: true, elite: true },
  { feature: 'Loot ESP', icon: 'compareWardLocator' as const, lite: false, pro: true, elite: true },
  { feature: 'Advanced aimbot', icon: 'compareAutoCombo' as const, lite: false, pro: true, elite: true },
  { feature: 'No recoil', icon: 'compareOrbwalker' as const, lite: false, pro: true, elite: true },
  { feature: 'Stream-proof mode', icon: 'compareStreamproof' as const, lite: true, pro: true, elite: true },
  { feature: 'Cloud config backup', icon: 'compareCloudBackup' as const, lite: true, pro: true, elite: true },
  { feature: 'Cloud-DMA option', icon: 'comparePriorityPatch' as const, lite: false, pro: false, elite: true },
];

