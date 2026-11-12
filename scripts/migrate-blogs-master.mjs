/**
 * Align blog slugs, drop extras, add missing topics. Run: node scripts/migrate-blogs-master.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const articlesPath = path.join(root, 'src/data/blogs/articles.ts');
const redirectsPath = path.join(root, 'public/_redirects');

const P = '/products/robrun/';
const text = fs.readFileSync(articlesPath, 'utf8');
const jsonPart = text.replace(/^[\s\S]*?=\s*/, '').replace(/\s*as BlogArticle\[\];[\s\S]*$/, '');
/** @type {import('../src/data/blogs/types.ts').BlogArticle[]} */
let articles = JSON.parse(jsonPart);

const slugRenames = {
  'robrun-cheats-buying-guide': 'best-robrun-cheats',
  'robrun-fps-guide': 'robrun-fps-boost',
  'robrun-updates-compatibility': 'robrun-updates',
  'robrun-pc-requirements': 'robrun-gaming-software-compatibility',
};

const removeSlugs = new Set([
  'best-robrun-cheats-pc',
  'robrun-free-vs-paid',
  'robrun-pc-optimization',
  'robrun-aim-training-tips',
  'robrun-beginners-guide',
]);

const redirectLines = [
  '/blogs/robrun-cheats-buying-guide/ /blogs/best-robrun-cheats/ 301',
  '/blogs/best-robrun-cheats-pc/ /blogs/best-robrun-cheats/ 301',
  '/blogs/robrun-free-vs-paid/ /blogs/robrun-cheats-pricing/ 301',
  '/blogs/robrun-pc-optimization/ /blogs/robrun-fps-boost/ 301',
  '/blogs/robrun-fps-guide/ /blogs/robrun-fps-boost/ 301',
  '/blogs/robrun-updates-compatibility/ /blogs/robrun-updates/ 301',
  '/blogs/robrun-pc-requirements/ /blogs/robrun-gaming-software-compatibility/ 301',
  '/blogs/robrun-aim-training-tips/ /blogs/robrun-aimbot/ 301',
  '/blogs/robrun-beginners-guide/ /blogs/robrun-cheats-installation/ 301',
];

function replaceSlugsInArticle(article) {
  const blob = JSON.stringify(article);
  let next = blob;
  for (const [oldSlug, newSlug] of Object.entries(slugRenames)) {
    next = next.replaceAll(`/blogs/${oldSlug}/`, `/blogs/${newSlug}/`);
  }
  for (const old of removeSlugs) {
    const target =
      old === 'best-robrun-cheats-pc'
        ? 'best-robrun-cheats'
        : old === 'robrun-free-vs-paid'
          ? 'robrun-cheats-pricing'
          : old === 'robrun-pc-optimization'
            ? 'robrun-fps-boost'
            : old === 'robrun-aim-training-tips'
              ? 'robrun-aimbot'
              : old === 'robrun-beginners-guide'
                ? 'robrun-cheats-installation'
                : old;
    next = next.replaceAll(`/blogs/${old}/`, `/blogs/${target}/`);
  }
  return JSON.parse(next);
}

articles = articles
  .filter((a) => !removeSlugs.has(a.slug))
  .map((a) => {
    const mapped = replaceSlugsInArticle(a);
    if (slugRenames[a.slug]) {
      mapped.slug = slugRenames[a.slug];
    }
    mapped.relatedSlugs = (mapped.relatedSlugs ?? [])
      .map((s) => slugRenames[s] ?? (removeSlugs.has(s) ? null : s))
      .filter(Boolean);
    return mapped;
  });

const metaPatches = {
  'best-robrun-cheats': {
    title: "Best Robrun Cheats for PC — Complete Buyer's Guide",
    seoTitle: 'Best Robrun Cheats for PC | Features & Buying Guide',
    h1: "Best Robrun Cheats for PC — Complete Buyer's Guide",
    description:
      'Explore Robrun cheats for PC, compare modules, pricing and compatibility, and find the information you need before choosing.',
    keywords: 'best robrun cheats, robrun cheats for pc, buy robrun cheats',
    tag: 'Buying Guides',
  },
  'robrun-fps-boost': {
    title: 'Robrun FPS Guide — Improve PC Gaming Performance',
    seoTitle: 'Robrun FPS Guide | Improve PC Gaming Performance',
    h1: 'Robrun FPS Guide — Improve PC Gaming Performance',
    description:
      'Practical Robrun FPS tips: drivers, in-game settings, Windows tweaks, and overlay overhead so PC play stays smooth.',
    keywords: 'robrun fps boost, robrun pc optimization, robrun gaming performance',
    tag: 'Gaming Performance',
  },
  'robrun-updates': {
    title: 'Robrun Updates — Software Compatibility and Changes',
    seoTitle: 'Robrun Updates | Software Compatibility & Changes',
    h1: 'Robrun Updates — Software Compatibility and Changes',
    description:
      'How Robrun game patches affect module compatibility, what to verify after updates, and where to check live status.',
    keywords: 'robrun updates, robrun software compatibility',
    tag: 'Updates',
  },
  'robrun-gaming-software-compatibility': {
    title: 'Robrun Gaming Software Compatibility Guide',
    seoTitle: 'Robrun Software Compatibility | PC Requirements Guide',
    h1: 'Robrun Gaming Software Compatibility Guide',
    description:
      'PC requirements, Windows builds, GPU headroom, and how Robrun modules fit your hardware before checkout.',
    keywords: 'robrun gaming software compatibility, robrun pc requirements',
    tag: 'Guides',
  },
};

for (const a of articles) {
  const patch = metaPatches[a.slug];
  if (patch) Object.assign(a, patch);
}

const newArticles = [
  {
    slug: 'robrun-esp-guide',
    tag: 'Features',
    title: 'Robrun ESP Guide — Features and Uses Explained',
    seoTitle: 'Robrun ESP Guide | Features & Compatibility',
    description:
      'Learn about Robrun ESP features, compatibility, limitations, and important buying considerations for PC players.',
    excerpt: 'Player ESP, wallhack reads, filters, and how ESP modules map to Robrun product pages.',
    keywords: 'robrun esp, robrun wallhack, robrun player esp',
    intent: 'Informational + Commercial',
    date: '2026-10-08',
    updated: '2026-11-01',
    readTime: '9 min read',
    image: '/images/gameplay/a02.webp',
    imageAlt: 'Robrun ESP overlay example on PC',
    h1: 'Robrun ESP Guide — Features and Uses Explained',
    relatedSlugs: ['robrun-cheats-features', 'best-robrun-cheats', 'robrun-cheats-comparison'],
    faq: [
      {
        q: 'What does Robrun ESP typically show?',
        a: 'Product pages list box ESP, health, distance, skeleton, and filter options—verify the exact module before buying.',
      },
      {
        q: 'Is wallhack the same as player ESP?',
        a: 'Wallhack emphasizes through-cover tracking; many bundles combine both—compare labels on each product page.',
      },
      {
        q: 'Where do I buy ESP modules?',
        a: 'Start at the product hub, open Player ESP or Wallhack pages, then match duration on pricing.',
      },
    ],
    body: [
      {
        type: 'p',
        html: `<strong>Robrun ESP</strong> modules focus on awareness—seeing operators, distances, and health states faster than the default HUD. This guide explains what buyers should verify on product pages, not every possible toggle name.`,
      },
      { type: 'h2', text: 'Core ESP features to compare' },
      {
        type: 'ul',
        items: [
          'Box or corner ESP with adjustable colors.',
          'Health and armor-style bars where listed on the module page.',
          'Distance readouts and team filters.',
          'Skeleton or bone ESP on supported builds.',
        ],
      },
      {
        type: 'p',
        html: `Open <a href="${P}">the product hub</a> and read <a href="${P}player-esp/">Player ESP</a> plus <a href="${P}wallhack/">Wallhack</a> for feature lists that match your squad role.`,
      },
      { type: 'h2', text: 'Wallhack vs. loot ESP' },
      {
        type: 'p',
        html: `Wallhack emphasizes tracking through cover; loot ESP highlights items in the world. If you only need callouts, wallhack may be enough—see <a href="/blogs/robrun-cheats-comparison/">module comparison</a> and <a href="/blogs/robrun-cheats-features/">features overview</a>.`,
      },
      { type: 'h2', text: 'Performance and readability' },
      {
        type: 'p',
        html: `Dense ESP can clutter 1080p screens. Pair module tuning with <a href="/blogs/robrun-fps-boost/">FPS optimization</a> so overlays stay smooth in firefights.`,
      },
      {
        type: 'cta',
        buttons: [
          { label: 'Explore Player ESP', href: `${P}player-esp/`, variant: 'primary' },
          { label: 'Compare features', href: '/blogs/robrun-cheats-features/', variant: 'outline' },
        ],
      },
    ],
  },
  {
    slug: 'robrun-aimbot',
    tag: 'Features',
    title: 'Robrun Aimbot Guide — Features and Compatibility',
    seoTitle: 'Robrun Aimbot Guide | What PC Players Should Know',
    description:
      'Robrun aimbot settings explained: FOV, smoothing, visibility checks, and how to match modules to your PC setup.',
    excerpt: 'FOV, smoothness, bone selection, and compatibility notes for Robrun aim modules.',
    keywords: 'robrun aimbot, robrun aim assist',
    intent: 'Informational + Commercial',
    date: '2026-10-12',
    updated: '2026-11-02',
    readTime: '8 min read',
    image: '/images/gameplay/a03.webp',
    imageAlt: 'Robrun aim module settings concept',
    h1: 'Robrun Aimbot Guide — Features and Compatibility',
    relatedSlugs: ['robrun-cheats-features', 'robrun-cheats-safety', 'robrun-cheats-installation'],
    faq: [
      {
        q: 'What settings matter most?',
        a: 'FOV, smoothing, target bone, and visibility rules are the usual starting points—confirm each on the aimbot product page.',
      },
      {
        q: 'Does aim software replace practice?',
        a: 'No. Recoil control and positioning still win rounds; software only adjusts input assistance where enabled.',
      },
    ],
    body: [
      {
        type: 'p',
        html: `A <strong>Robrun aimbot</strong> module should document FOV limits, smoothness, bone priorities, and hotkeys. Use this guide to compare marketing claims against what the <a href="${P}aimbot/">aimbot product page</a> actually lists.`,
      },
      { type: 'h2', text: 'FOV and smoothing' },
      {
        type: 'p',
        html: `Tight FOV looks more natural but needs crosshair discipline; wide FOV snaps faster but can feel obvious. Smoothing trades speed for human-like motion—tune in private matches before ranked.`,
      },
      { type: 'h2', text: 'Visibility and safety expectations' },
      {
        type: 'p',
        html: `Read <a href="/blogs/robrun-cheats-safety/">safety considerations</a> and official Terms of Service. No module can guarantee zero account risk.`,
      },
      {
        type: 'cta',
        buttons: [
          { label: 'View aimbot module', href: `${P}aimbot/`, variant: 'primary' },
          { label: 'Installation help', href: '/blogs/robrun-cheats-installation/', variant: 'outline' },
        ],
      },
    ],
  },
  {
    slug: 'robrun-cheats-features',
    tag: 'Features',
    title: 'Robrun Cheats Features — What Buyers Should Know',
    seoTitle: 'Robrun Cheats Features | What Buyers Should Know',
    description:
      'Overview of Robrun cheat modules—ESP, aimbot, wallhack, loot ESP, no recoil, and utilities—and how to pick the right mix.',
    excerpt: 'Module families on robruncheat.org and how features map to product URLs.',
    keywords: 'robrun cheats features, robrun esp, robrun aimbot',
    intent: 'Commercial',
    date: '2026-10-15',
    updated: '2026-11-03',
    readTime: '10 min read',
    image: '/images/gameplay/a04.webp',
    imageAlt: 'Robrun module feature overview',
    h1: 'Robrun Cheats Features — What Buyers Should Know',
    relatedSlugs: ['best-robrun-cheats', 'robrun-esp-guide', 'robrun-cheats-comparison'],
    faq: [
      {
        q: 'Do I need every module?',
        a: 'Most players buy one combat module plus optional utilities—use comparison and pricing guides before stacking plans.',
      },
    ],
    body: [
      {
        type: 'p',
        html: `Before checkout, map <strong>Robrun cheats features</strong> to roles: awareness (ESP, wallhack), gunplay (aimbot, no recoil), and extras (loot ESP, stream-proof, utilities).`,
      },
      { type: 'h2', text: 'Feature families' },
      {
        type: 'table',
        headers: ['Category', 'Typical use', 'Product path'],
        rows: [
          ['Player ESP', 'Operator awareness', `${P}player-esp/`],
          ['Wallhack', 'Through-cover tracking', `${P}wallhack/`],
          ['Aimbot', 'Aim assistance', `${P}aimbot/`],
          ['No recoil', 'Spray control', `${P}no-recoil/`],
          ['Loot ESP', 'Economy clears', `${P}loot-esp/`],
        ],
      },
      {
        type: 'p',
        html: `Deep dives: <a href="/blogs/robrun-esp-guide/">ESP guide</a>, <a href="/blogs/robrun-aimbot/">aimbot guide</a>, and <a href="/blogs/robrun-cheats-pricing/">pricing</a>.`,
      },
      {
        type: 'cta',
        buttons: [
          { label: 'Explore Robrun products', href: P, variant: 'primary' },
          { label: 'Buyer guide', href: '/blogs/best-robrun-cheats/', variant: 'outline' },
        ],
      },
    ],
  },
  {
    slug: 'robrun-cheats-installation',
    tag: 'Tutorials',
    title: 'Robrun Cheats Installation — Requirements and Troubleshooting',
    seoTitle: 'Robrun Cheats Installation | Setup & Troubleshooting',
    description:
      'Installation requirements, loader basics, common errors, and support paths for Robrun software on Windows PC.',
    excerpt: 'Windows requirements, download hygiene, and first-run checks before you queue.',
    keywords: 'robrun cheats installation, robrun loader setup',
    intent: 'Informational',
    date: '2026-10-18',
    updated: '2026-11-04',
    readTime: '7 min read',
    image: '/images/gameplay/a05.webp',
    imageAlt: 'Robrun software installation checklist',
    h1: 'Robrun Cheats Installation — Requirements and Troubleshooting',
    relatedSlugs: ['robrun-gaming-software-compatibility', 'robrun-cheats-safety', 'robrun-updates'],
    faq: [
      {
        q: 'What OS is required?',
        a: 'Modules target 64-bit Windows 10/11—confirm on the product page and compatibility guide.',
      },
      {
        q: 'Game wont start after install?',
        a: 'Revert overlays, verify game files, and contact support with your receipt email—avoid random reinstall loops.',
      },
    ],
    body: [
      {
        type: 'p',
        html: `Install <strong>Robrun cheats</strong> only from the checkout path tied to your purchase. Follow portal instructions and keep antivirus exclusions minimal—see <a href="/blogs/robrun-cheats-safety/">safety guide</a>.`,
      },
      { type: 'h2', text: 'Pre-install checklist' },
      {
        type: 'ol',
        items: [
          'Match <a href="/blogs/robrun-gaming-software-compatibility/">compatibility guide</a> specs.',
          'Update GPU drivers and Windows.',
          'Close conflicting overlays (other tuners, legacy capture tools).',
          'Read <a href="/faq/">FAQ</a> for loader-specific steps.',
        ],
      },
      { type: 'h2', text: 'After patches' },
      {
        type: 'p',
        html: `When Robrun updates, modules may pause—check <a href="/blogs/robrun-updates/">updates guide</a> and live status on product pages before enabling features.`,
      },
      {
        type: 'cta',
        buttons: [
          { label: 'Get support', href: '/support/', variant: 'primary' },
          { label: 'View products', href: P, variant: 'outline' },
        ],
      },
    ],
  },
  {
    slug: 'robrun-cheats-faq',
    tag: 'Guides',
    title: 'Robrun Cheats FAQ — Common Questions Answered',
    seoTitle: 'Robrun Cheats FAQ | Common Questions Answered',
    description:
      'Answers about Robrun modules, pricing, compatibility, safety, and support—quick reference before you buy or install.',
    excerpt: 'Short answers linking to deeper guides and product pages.',
    keywords: 'robrun cheats faq, robrun cheats questions',
    intent: 'Informational',
    date: '2026-10-22',
    updated: '2026-11-05',
    readTime: '6 min read',
    image: '/images/gameplay/a07.webp',
    imageAlt: 'Robrun cheats frequently asked questions',
    h1: 'Robrun Cheats FAQ — Common Questions Answered',
    relatedSlugs: ['best-robrun-cheats', 'robrun-cheats-pricing', 'robrun-cheats-safety'],
    faq: [
      {
        q: 'Where is official pricing?',
        a: 'Module pages and the pricing blog summarize plan lengths—confirm live price at checkout.',
      },
      {
        q: 'Is there a single all-in-one cheat?',
        a: 'Features are split across product URLs; the features guide explains how bundles differ.',
      },
      {
        q: 'What if a module is down?',
        a: 'Check product status badges and the updates guide after game patches.',
      },
      {
        q: 'How do I contact support?',
        a: 'Use the support page with your receipt email—avoid sharing passwords in tickets.',
      },
    ],
    body: [
      {
        type: 'p',
        html: `This <strong>Robrun cheats FAQ</strong> points to longer guides. For account risk, read <a href="/blogs/robrun-cheats-safety/">safety</a>; for modules, see <a href="/blogs/robrun-cheats-features/">features</a>.`,
      },
      { type: 'h2', text: 'Buying' },
      {
        type: 'p',
        html: `Start with <a href="/blogs/best-robrun-cheats/">buyer guide</a> and <a href="/blogs/robrun-cheats-pricing/">pricing</a>, then open the module that matches your role on <a href="${P}">products</a>.`,
      },
      { type: 'h2', text: 'Setup' },
      {
        type: 'p',
        html: `Follow <a href="/blogs/robrun-cheats-installation/">installation guide</a> and <a href="/blogs/robrun-gaming-software-compatibility/">compatibility</a> before enabling overlays in matchmaking.`,
      },
      {
        type: 'cta',
        buttons: [
          { label: 'Open full FAQ page', href: '/faq/', variant: 'primary' },
          { label: 'Explore products', href: P, variant: 'outline' },
        ],
      },
    ],
  },
];

const existingSlugs = new Set(articles.map((a) => a.slug));
for (const post of newArticles) {
  if (!existingSlugs.has(post.slug)) {
    articles.push(post);
    existingSlugs.add(post.slug);
  }
}

articles.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const allSlugs = new Set(articles.map((a) => a.slug));
for (const a of articles) {
  a.relatedSlugs = (a.relatedSlugs ?? []).filter((s) => allSlugs.has(s));
}

const header = `import type { BlogArticle } from './types';

export const blogArticles: BlogArticle[] = `;
fs.writeFileSync(articlesPath, `${header}${JSON.stringify(articles, null, 2)} as BlogArticle[];\n`, 'utf8');

let redirects = fs.readFileSync(redirectsPath, 'utf8');
const marker = '\n# Blog slug migrations\n';
if (!redirects.includes(marker)) {
  redirects += `${marker}${redirectLines.join('\n')}\n`;
  fs.writeFileSync(redirectsPath, redirects, 'utf8');
}

console.log(`Migrated blogs: ${articles.length} articles written.`);
