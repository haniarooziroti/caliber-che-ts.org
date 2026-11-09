import type { Translations } from './types';
import { PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import { DISCORD_URL, PRODUCT_BASE } from '../config/site';

const productBase = PRODUCT_BASE;

export const en: Translations = {
  site: {
    name: "Caliber Cheat",
    domain: "calibercheat.net",
    title: "Caliber Cheats for PC | ESP, Aimbot & Wallhack",
    description:
      "Buy-ready Caliber modules for Windows PC—smooth aimbot, player ESP, wallhack, and loot tools. Compare plans, read guides, then open secure checkout.",
    brandMarkAlt: "calibercheat.net"
  },
  nav: [
    {
      href: "/products/caliber/",
      label: "Products"
    },
    {
      href: "/reviews/",
      label: "Reviews"
    },
    {
      href: "/forum/",
      label: "Forums"
    },
    {
      href: "/faq/",
      label: "FAQ"
    },
    {
      href: "/support/",
      label: "Support"
    }
  ],
  hero: {
    status: "Caliber — season build online",
    eyebrow: "Caliber cheats",
    titleLine1: "CALIBER",
    titleLine2: "CHEATS",
    subtitle:
      "Caliber gaming tools for PC—player ESP, aimbot, wallhack reads, loot tags, and no recoil presets. Compare cheat features here; official cheat download is portal-only after purchase.",
    ctaPrimary: "Browse cheat modules",
    ctaBuy: "Buy now",
    modesLabel: "Play styles",
    modes: [
      "Ranked",
      "Pubs",
      "PvP modes",
      "special ops"
    ],
    metrics: [
      {
        label: "Community",
        strong: "Forum"
      },
      {
        label: "Patch focus",
        strong: "BattlEye"
      },
      {
        label: "Platform",
        strong: "Win64"
      },
      {
        label: "Support",
        strong: "24/7"
      }
    ]
  },
  features: {
    eyebrow: "Caliber cheats modules",
    title: "Aimbot, ESP, Wallhack & More",
    subtitle: "Caliber modules built for ranked fights: smooth aimbot, player ESP, wallhack, loot ESP, and no recoil.",
    items: [
      {
        title: "Aimbot",
        subtitle: "Smooth aim when you need it.",
        desc: "Advanced aimbot with FOV, smoothness, and bone priority so tracking feels controlled instead of robotic.",
        bullets: [
          "FOV and smoothness sliders",
          "Bone priority for head or body",
          "Visibility checks before lock",
          "Hotkey toggle mid-fight",
          "Presets for close and long range"
        ],
        tags: [
          "caliber aimbot",
          "smooth aim",
          "fov aimbot"
        ],
        bento: "sm:col-span-2 lg:col-span-12 lg:col-start-1 lg:row-start-1"
      },
      {
        title: "Player ESP",
        subtitle: "Know who is pushing.",
        desc: "Player ESP keeps boxes, names, and distance readable through cover so you stop guessing rotations.",
        bullets: [
          "Box ESP with team filters",
          "Health bars on screen",
          "Distance ESP readouts",
          "Skeleton ESP option"
        ],
        tags: [
          "caliber esp",
          "player esp",
          "box esp"
        ],
        bento: "sm:col-span-2 lg:col-span-8 lg:col-start-1 lg:row-start-2"
      },
      {
        title: "Wallhack",
        subtitle: "Track through cover.",
        desc: "Wallhack overlays help you hold angles and clear buildings without walking in blind.",
        bullets: [
          "Enemy silhouettes through walls",
          "Pairs with player ESP",
          "Readable in close fights"
        ],
        tags: [
          "caliber wallhack",
          "wallhack",
          "through walls"
        ],
        bento: "sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:row-start-2"
      },
      {
        title: "Loot ESP",
        subtitle: "Loot with intent.",
        desc: "Loot ESP marks weapons, shields, and attachments so you spend less time scanning every bin.",
        bullets: [
          "Weapon and attachment labels",
          "Shield and heal highlights",
          "Filter noisy common loot"
        ],
        tags: [
          "loot esp",
          "caliber loot",
          "weapon esp"
        ],
        bento: "sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-3"
      },
      {
        title: "No Recoil",
        subtitle: "Keep sprays on target.",
        desc: "No recoil helps control R-301, Flatline, and other sprays without maxing strength on day one.",
        bullets: [
          "Per-weapon strength",
          "Pairs with aimbot FOV",
          "Start low, then tune"
        ],
        tags: [
          "no recoil",
          "caliber no recoil",
          "spray control"
        ],
        bento: "sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-3"
      },
      {
        title: "Weapon ESP",
        subtitle: "See what they are holding.",
        desc: "Weapon ESP shows enemy loadouts so you know when a push is a shotgun fight or a sniper hold.",
        bullets: [
          "Enemy weapon labels",
          "Useful before door peeks",
          "Works with box ESP"
        ],
        tags: [
          "weapon esp",
          "caliber weapon esp"
        ],
        bento: "sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:col-start-1 lg:row-start-4"
      },
      {
        title: "Health Bars",
        subtitle: "Finish fights cleanly.",
        desc: "Health bar ESP shows remaining HP and shields so you commit when the fight is actually winnable.",
        bullets: [
          "Shield and health split",
          "Visible through cover",
          "Great with aimbot focus"
        ],
        tags: [
          "health bar esp",
          "caliber health esp"
        ],
        bento: "sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:col-start-9 lg:row-start-4"
      },
      {
        title: "Stream Proof",
        subtitle: "Keep capture clean.",
        desc: "Stream-proof mode keeps overlays on your monitor while OBS and game capture stay clean.",
        bullets: [
          "OBS and Game Bar friendly",
          "Per-module toggle",
          "Test with a local recording"
        ],
        tags: [
          "stream proof",
          "obs safe",
          "capture hide"
        ],
        bento: "sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-6"
      },
      {
        title: "Cloud & DMA options",
        subtitle: "Flexible delivery paths.",
        desc: "Cloud config sync and optional DMA / AWS paths for players who need a different setup route.",
        bullets: [
          "Cloud preset backup",
          "Optional cloud-DMA path",
          "AWS option when listed"
        ],
        tags: [
          "cloud dma",
          "Caliber cheats",
          "config sync"
        ],
        bento: "sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-6"
      }
    ]
  },
  whyUs: {
    eyebrow: "Why calibercheat.net",
    title: "Compare Caliber cheats modules",
    subtitle: "Aimbot, ESP, and wallhack pages with live status—no fluff.",
    usLabel: "calibercheat.net",
    otherLabel: "Typical shop",
    rows: [
      {
        title: "Module pages you can compare",
        desc: "Aimbot, ESP, and wallhack each get their own page with plain feature notes."
      },
      {
        title: "Forums with settings talk",
        desc: "Players share FOV, smoothness, and overlay layouts that actually feel usable."
      },
      {
        title: "Stream-proof coverage",
        desc: "Creators get capture-safe options without hunting buried toggles."
      },
      {
        title: "Live status before launch",
        desc: "Check the banner after game updates before you buy or load."
      },
      {
        title: "Windows-focused support",
        desc: "Setup help for Windows 10/11 loaders and common install issues."
      },
      {
        title: "One checkout path",
        desc: "Buy buttons go to the same secure order flow every time."
      }
    ],
    metrics: [
      {
        value: "100+",
        title: "Player reviews",
        desc: "Feedback from people who already bought access."
      },
      {
        value: "14",
        title: "Modules listed",
        desc: "ESP, aimbot, wallhack, loot, recoil, and more."
      },
      {
        value: "24/7",
        title: "Support window",
        desc: "Help when loader or config questions come up."
      }
    ]
  },
  setup: {
    eyebrow: "How access works",
    titleLead: "From checkout",
    titleHighlight: "to first match",
    intro:
      "Think of it as a short cheat setup guide: confirm status, pick modules, pay, then follow the software installation guide in your portal—never random links.",
    ctaPrimary: "View products",
    ctaSecondary: "Read forums",
    ctaPrimaryHref: "/products/caliber/",
    ctaSecondaryHref: "/forum/",
    steps: [
      {
        step: "01",
        title: "Unlock portal & download loader",
        desc: "After payment, open the portal, grab the current loader, and skim the short setup notes."
      },
      {
        step: "02",
        title: "Launch & configure modules",
        desc: "Start with a calm aimbot FOV and basic player ESP. Add wallhack and loot ESP once that feels stable."
      },
      {
        step: "03",
        title: "Verify status & queue Caliber",
        desc: "Confirm the status banner is online, load your preset, then jump into a pub before ranked."
      }
    ]
  },
  compatibility: {
    eyebrow: "Compatibility",
    title: "Runs on your rig.",
    subtitle:
      "Caliber software compatibility starts with matching game and Windows builds—check status after each season update or latest update patch.",
    items: [
      "Windows 10 or Windows 11 (64-bit) — core PC requirements",
      "Intel or AMD CPU meeting Caliber PC requirements",
      "Current Caliber PC client (Origin / EA app)",
      "Administrator rights for loader install",
      "Stable internet for portal cheat download",
      "Headroom for FPS settings if you run dense ESP"
    ]
  },
  cheats: {
    eyebrow: "Featured modules",
    title: "Caliber cheat modules",
    subtitle: "Start with aimbot, player ESP, or wallhack—then layer loot ESP and no recoil if you need them.",
    viewAll: "All products",
    explore: "Open page",
    items: [
      {
        badge: "Most picked",
        tier: "Aimbot",
        name: "Aimbot",
        title: "Caliber Aimbot",
        desc: "Smooth aimbot with FOV and bone controls for close fights and mid-range sprays.",
        features: [
          "FOV limiter",
          "Smoothness control",
          "Bone priority",
          "Hotkey toggle",
          "Visibility check"
        ],
        more: 3,
        href: "/products/caliber/aimbot/",
        variant: "popular"
      },
      {
        badge: "Vision",
        tier: "ESP",
        name: "ESP",
        title: "Caliber Player ESP",
        desc: "Player ESP with boxes, health bars, distance, and skeleton options through cover.",
        features: [
          "Box ESP",
          "Health bars",
          "Distance ESP",
          "Skeleton ESP",
          "Team filters"
        ],
        more: 2,
        href: "/products/caliber/player-esp/",
        variant: "essential"
      },
      {
        badge: "Awareness",
        tier: "Wallhack",
        name: "Wallhack",
        title: "Caliber Wallhack",
        desc: "Wallhack overlays for building clears and angle holds when info matters most.",
        features: [
          "Through-wall silhouettes",
          "Pairs with ESP",
          "Readable close range"
        ],
        more: 1,
        href: "/products/caliber/wallhack/",
        variant: "limited"
      }
    ]
  },
  products: {
    eyebrow: "Buy Caliber cheats",
    title: "Buy Caliber cheats modules",
    subtitle: "Aimbot, player ESP, wallhack, loot ESP, no recoil, stream proof, Cloud DMA, and HWID spoofer—clear pages before you buy.",
    viewAll: "All Caliber modules",
    get: "Buy now",
    explore: "Module details",
    items: [
      {
        badge: "Hardware",
        category: "Hardware",
        title: "Caliber Cloud DMA",
        subtitle: "External memory read path",
        desc: "Cloud DMA checkout when your stack uses a second PC and supported DMA hardware instead of loader-only modules.",
        features: [
          "Two-PC workflow",
          "Firmware notes",
          "Separate checkout",
          "Portal docs"
        ],
        more: 2,
        href: "/products/caliber/cloud-dma/"
      },
      {
        badge: "Identity",
        category: "Utility",
        title: "Caliber HWID Spoofer",
        subtitle: "Reset PC fingerprint",
        desc: "HWID spoofer for buyers who need a different hardware fingerprint before a new Caliber account.",
        features: [
          "HWID reset flow",
          "Disk & NIC options",
          "Reinstall checklist",
          "Portal access"
        ],
        more: 1,
        href: "/products/caliber/hwid-spoofer/"
      },
      {
        badge: "Vision",
        category: "Vision",
        title: "Caliber Loot ESP",
        subtitle: "Weapons and attachments through walls",
        desc: "Loot ESP highlights valuable gear so you path through POIs with a plan.",
        features: [
          "Weapon labels",
          "Shield highlights",
          "Attachment tags",
          "Noise filters"
        ],
        more: 2,
        href: "/products/caliber/loot-esp/"
      },
      {
        badge: "Combat",
        category: "Combat",
        title: "Caliber No Recoil",
        subtitle: "Tighter sprays on common ARs",
        desc: "No recoil for Caliber with per-weapon strength you can keep subtle.",
        features: [
          "Per-weapon strength",
          "Pairs with aimbot",
          "Pub and ranked presets"
        ],
        more: 1,
        href: "/products/caliber/no-recoil/"
      },
      {
        badge: "Capture",
        category: "Capture",
        title: "Caliber Stream Proof",
        subtitle: "Hide overlays from OBS",
        desc: "Stream-proof mode keeps ESP and aim visuals off your VOD while you still see them.",
        features: [
          "OBS safe mode",
          "Game capture tests",
          "Per-module toggle"
        ],
        more: 1,
        href: "/products/caliber/stream-proof/"
      }
    ]
  },
  blog: {
    eyebrow: "Archived",
    title: "Articles moved to forums",
    subtitle: "Setup and tuning talk now lives in forum threads.",
    latestTitle: "Forum discussions",
    latestSubtitle: "Browse aimbot, ESP, and loader threads.",
    filterAll: "All",
    sortLabel: "Sort",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    sortShortRead: "Short",
    sortLongRead: "Long",
    emptyFilter: "No items.",
    viewAll: "Open forums",
    read: "Read",
    items: [],
  },
  toolkit: {
    eyebrow: "Menu layout",
    title: "Organized, easy to configure",
    subtitle: "Modules are grouped so you can tune mid-match without digging through clutter.",
    items: [
      {
        num: "01",
        label: "Aim",
        title: "Aimbot that stays adjustable",
        desc: "FOV, smoothness, bones, and hotkeys in one aim tab."
      },
      {
        num: "02",
        label: "Vision",
        title: "ESP that stays readable",
        desc: "Boxes, health, distance, and skeleton with filter controls."
      },
      {
        num: "03",
        label: "World",
        title: "Wallhack and loot",
        desc: "Through-wall tracking plus loot ESP for POI clears."
      },
      {
        num: "04",
        label: "Weapons",
        title: "Recoil and weapon ESP",
        desc: "No recoil strength and enemy weapon labels."
      },
      {
        num: "05",
        label: "Capture",
        title: "Stream-proof toggles",
        desc: "Hide overlays from OBS while you keep them on screen."
      },
      {
        num: "06",
        label: "Profiles",
        title: "Presets for every mode",
        desc: "Separate ranked and pubs configs with cloud backup."
      }
    ]
  },
  workflow: {
    eyebrow: "Workflow",
    badge: "4 steps",
    titleBefore: "Key in hand",
    titleHighlight: "in a few clicks",
    subtitle: "A straight path from purchase to an Caliber preset you can reuse every session.",
    ctaLabel: "Start checkout",
    ctaHref: PRIMARY_CHECKOUT_PATH,
    ctaSecondary: "Ask in forums",
    ctaSecondaryHref: "/forum/",
    items: [
      {
        num: "01",
        phase: "Check",
        title: "Check status",
        desc: "Confirm the product is online before you buy—especially after a game update."
      },
      {
        num: "02",
        phase: "Choose",
        title: "Pick a plan",
        desc: "Choose your duration, then continue to the secure checkout path."
      },
      {
        num: "03",
        phase: "Pay",
        title: "Pay securely",
        desc: "Card, PayPal, or crypto—access unlocks in the portal after payment clears."
      },
      {
        num: "04",
        phase: "Play",
        title: "Install & play",
        desc: "Follow the portal notes, load a calm preset, and test in pubs first."
      }
    ]
  },
  fieldNotes: {
    eyebrow: "PC performance",
    title: "Game optimization without fairy tales.",
    items: [
      {
        num: "01",
        title: "Season update checks",
        desc: "After a latest update, read status before ranked—update compatibility shifts with BattlEye."
      },
      {
        num: "02",
        title: "FPS & overlay load",
        desc: "Trim skeleton ESP and glow if FPS dips. Caliber performance optimization often means fewer layers, not more."
      },
      {
        num: "03",
        title: "Lag troubleshooting",
        desc: "Loader or overlay issues? Forum threads and support cover common lag fix steps before you blame ping alone."
      }
    ]
  },
  support: {
    eyebrow: "Support",
    title: "Caliber Cheats support for loader setup & checkout",
    subtitle: "Tell us where you are stuck—loader, configs, or checkout.",
    channels: [
      {
        icon: "headphones",
        title: "Chat before checkout",
        desc: "Unsure which module page fits? Ask before you pay.",
        linkLabel: "Open checkout help",
        href: "/support/"
      },
      {
        icon: "navFaq",
        title: "Read the FAQ",
        desc: "Quick answers on Windows support, risk, and delivery.",
        linkLabel: "Open FAQ",
        href: "/faq/"
      },
      {
        icon: "messageCircle",
        title: "Forums",
        desc: "See how other players set aimbot and ESP.",
        linkLabel: "Browse forums",
        href: "/forum/"
      }
    ],
    ticketTitle: "Include this when you write in",
    ticketItems: [
      {
        title: "Order email",
        desc: "The address used at checkout."
      },
      {
        title: "Platform",
        desc: "Windows 10 or 11, and your Caliber client type."
      },
      {
        title: "Error detail",
        desc: "Exact loader message or a short description of what failed."
      }
    ]
  },
  faq: {
    eyebrow: "FAQ",
    title: "Straight answers before checkout.",
    subtitle: "Compatibility, risk, and access—no vague promises.",
    items: [
      {
        num: "01",
        q: "Where do I check if Caliber cheats is online?",
        a: "Use the live status banner on calibercheat.net before you buy or launch—especially after a game update."
      },
      {
        num: "02",
        q: "What happens after I buy?",
        a: "Your portal unlocks the loader and setup notes when payment clears. Follow those steps before opening Caliber."
      },
      {
        num: "03",
        q: "Can I get banned using third-party Caliber cheats?",
        a: "Yes. Any third-party tool can lead to account action. Read the current status and accept the risk before use."
      },
      {
        num: "04",
        q: "Which platforms are supported?",
        a: "Windows 10/11 64-bit PC. Console is not supported."
      },
      {
        num: "05",
        q: "Can I move my license to a new PC?",
        a: "Yes—use the HWID reset in your portal or open a support ticket."
      },
      {
        num: "06",
        q: "Where are modules listed?",
        a: "Aimbot, ESP, wallhack, loot ESP, no recoil, and stream-proof pages live under Products on calibercheat.net."
      }
    ]
  },
  footer: {
    tagline: "Caliber cheats — Caliber aimbot, player ESP, and wallhack. calibercheat.net",
    explore: "Explore",
    exploreLinks: [
      {
        href: "/",
        label: "Module overview",
        ariaLabel: "Features",
        scrollTarget: "features"
      },
      {
        href: "/products/caliber/aimbot/",
        label: "Caliber aimbot",
        ariaLabel: "Aimbot"
      },
      {
        href: "/products/caliber/player-esp/",
        label: "Player ESP",
        ariaLabel: "Player ESP"
      },
      {
        href: "/products/caliber/",
        label: "All Caliber products",
        ariaLabel: "Products"
      },
      {
        href: "/forum/",
        label: "Cheats forum",
        ariaLabel: "Forum"
      },
      {
        href: "/forum/",
        label: "Caliber cheats guides",
        ariaLabel: "Blogs"
      },
      {
        href: "/reviews/",
        label: "Buyer reviews",
        ariaLabel: "Reviews"
      },
      {
        href: "/faq/",
        label: "Pre-purchase FAQ",
        ariaLabel: "FAQ"
      }
    ],
    support: "Support",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    about: "About"
  },
  legalPages: {
    about: {
      title: "About calibercheat.net",
      description: "calibercheat.net is the home for Caliber module pages, forums, and setup notes—compare aimbot, ESP, and wallhack options before checkout.",
      sections: [
        {
          heading: "calibercheat.net: Caliber cheats",
          paragraphs: [
            "calibercheat.net focuses on maintained module pages—aimbot, player ESP, wallhack, loot ESP, no recoil, and stream-proof options—so you can compare features before checkout.",
            "Product names on calibercheat.net are used for identification only; always read the live status banner before you launch.",
            "Forums and blogs on calibercheat.net cover settings talk, patch-day habits, and install steps when seasons or loaders change."
          ]
        },
        {
          heading: "What we publish",
          paragraphs: [
            "You will find module pages, FAQ answers, and forum threads about settings and install steps. Content updates when seasons or loaders change.",
            "Always check the homepage status banner before a session."
          ]
        },
        {
          heading: "Support",
          paragraphs: [
            "Questions about compatibility, loader errors, or checkout go through the Support page. Include your order email, Windows version, and the exact error text when you write in."
          ]
        }
      ]
    },
    privacy: {
      title: "Caliber Cheats privacy policy",
      description: "How calibercheat.net handles analytics, cookies, and contact data.",
      sections: [
        {
          heading: "Information we collect",
          paragraphs: [
            "We may collect standard web analytics such as page views, device type, browser, and approximate region when analytics are enabled. Checkout and license delivery happen on external checkout pages—we do not store payment card data on calibercheat.net."
          ]
        },
        {
          heading: "How we use data",
          paragraphs: [
            "Analytics help us understand which product and forum pages are useful. Support tickets may retain the email address and message content you provide until the issue is resolved."
          ]
        },
        {
          heading: "Cookies",
          paragraphs: [
            "We use minimal cookies required for analytics. You can block cookies in your browser settings; core site content remains accessible without them."
          ]
        },
        {
          heading: "Support",
          paragraphs: [
            "For privacy questions, use the options on the Support page. Purchase rules are in our Terms & Conditions."
          ]
        }
      ]
    },
    terms: {
      title: "Caliber Cheats terms & conditions",
      description: "Purchase, license, refund, and use terms for products listed on calibercheat.net.",
      sections: [
        {
          heading: "Agreement",
          paragraphs: [
            "Last updated: October 2026. By using calibercheat.net or completing checkout for any product listed here, you agree to these Terms & Conditions and our Privacy Policy."
          ]
        },
        {
          heading: "What you purchase",
          paragraphs: [
            "We list access to Caliber cheats modules for Windows, delivered through an operator portal and loader.",
            "Feature lists on each product page describe what is included at the time of purchase. Modules can change when Caliber or anti-cheat systems update."
          ]
        },
        {
          heading: "Checkout and delivery",
          paragraphs: [
            "Payment and license delivery run on external checkout pages. calibercheat.net does not process or store payment card numbers.",
            "After purchase, use the portal linked from your order flow to download the current loader and setup notes before launching Caliber."
          ]
        },
        {
          heading: "License use",
          paragraphs: [
            "Licenses are for your personal use only. Do not share loader files, portal logins, or license keys. Device limits are enforced in the portal."
          ]
        },
        {
          heading: "Refunds and purchases",
          paragraphs: [
            "All sales are final once checkout completes. We do not refund change-of-mind purchases, account penalties, or issues caused by ignoring setup notes or running modules while the status banner shows offline.",
            "If the product does not work as described on a supported Windows setup with the current loader and an online status banner, contact Support with your order email and exact error text."
          ]
        },
        {
          heading: "Availability and risk",
          paragraphs: [
            "Third-party tools for Caliber can conflict with game updates and anti-cheat systems. You use this software at your own risk, including possible account action.",
            "Check the homepage status banner before every session."
          ]
        },
        {
          heading: "Changes",
          paragraphs: [
            "We may update these terms. The “Last updated” date will change when we do. Continued use of the site after changes means you accept the revised terms."
          ]
        },
        {
          heading: "Support",
          paragraphs: [
            "For terms, billing, or loader questions, use the buttons on the Support page."
          ]
        }
      ]
    },
    support: {
      title: "Support",
      description: "Get help with Caliber cheat loaders, configs, and checkout on calibercheat.net."
    }
  },
  ui: {
    skipLink: "Skip to main content",
    browseCheats: "Buy now",
    browseCheatsMobile: "Buy now",
    navTryNow: "Buy now",
    navTryNowAria: "Buy Caliber cheats",
    homeAria: "Caliber cheats home",
    checkoutAria: "Start checkout",
    discordAria: "Join Discord",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    themeLight: "Switch to light mode",
    themeDark: "Switch to dark mode",
    navPrimaryAria: "Primary",
    navMobileAria: "Mobile",
    languageSwitcherAria: "Choose language",
    langPriorityMarkets: "Priority markets",
    langMoreLanguages: "More languages",
    cookieMessage: "We use cookies for language preference and basic analytics.",
    cookieAccept: "Accept",
    cookieDecline: "Decline",
    previousSlide: "Previous slide",
    nextSlide: "Next slide",
    heroSlides: "Hero slides",
    slideN: "Slide {n}",
    blogRss: "Blog RSS",
    sitemap: "Sitemap"
  },
  pages: {
    notFound: {
      title: "Page not found",
      description: "The page you requested could not be found on calibercheat.net.",
      heading: "Page not found",
      body: "That URL does not exist or may have moved. Head back to the homepage or browse Caliber cheat modules.",
      backHome: "Back to home",
      viewProducts: "View products",
      openForums: "Open forums"
    },
    crumbs: {
      home: "Home",
      blogs: "Blogs",
      forums: "Forums",
      reviews: "Reviews",
      products: "Products",
      faq: "FAQ",
      about: "About",
      privacy: "Privacy",
      terms: "Terms",
      support: "Support"
    },
    blog: {
      schemaName: "Caliber Blogs",
      h1Line1: "Blogs:",
      h1Line2: "Guides, Reviews & Insights",
      subtitle:
        "Explore Caliber guides, gaming performance tips, software comparisons, season updates, buying guides, and reviews—then compare modules on the product hub.",
      searchSr: "Search Caliber cheats blog",
      searchPlaceholder: "Search guides, reviews, FPS, pricing…",
      searchAria: "Search Caliber cheats blog",
      sortBy: "Sort by",
      sortAria: "Sort blog articles",
      newest: "Latest articles",
      oldest: "Oldest articles",
      sortAz: "Alphabetical A–Z",
      sortZa: "Alphabetical Z–A",
      sortReadShort: "Shortest reading time",
      sortReadLong: "Longest reading time",
      filterAria: "Filter articles by category",
      allBlogs: "All Blogs",
      articles: "articles",
      article: "article",
      articlesCount: "{n} articles",
      empty: "No articles match your search.",
      related: "Related articles",
      ctaHeading: "Blogs: Caliber cheats",
      ctaBody: "Compare Caliber aimbot, player ESP, wallhack, loot ESP, and no recoil—then pick 1 week, 1 month, or lifetime on the product page.",
      ctaPrimary: "View Caliber cheats products",
      ctaPricing: "See pricing",
      ctaForum: "Open forum",
      readMore: "Open guide",
      readyHeading: "Ready for Caliber cheats?",
      readyBody: "Compare modules and pricing, then check live status before you buy.",
      categories: {
        Guides: "Guides",
        Reviews: "Reviews",
        Comparisons: "Comparisons",
        "Gaming Performance": "Gaming Performance",
        Updates: "Updates",
        "Buying Guides": "Buying Guides",
        Tutorials: "Tutorials",
        Features: "Features",
        Setup: "Setup",
        Troubleshooting: "Troubleshooting"
      }
    },
    faq: {
      heading: "FAQ: ESP, aimbot & checkout",
      allQuestions: "ALL QUESTIONS",
      schemaDesc: "Answers about ESP, aimbot, wallhack, checkout, and setup on calibercheat.net.",
      sectionEyebrow: "All topics",
      sectionTitle: "Browse by category",
      sectionSubtitle: "Filter aimbot, ESP, products, setup, safety, and forum-related answers.",
      contextualEyebrow: "FAQ",
      contextualTitle: "Questions about this page",
      contextualSubtitle: "Answers tied to what you are reading—visit the FAQ page for every topic.",
      topics: {
        all: "All",
        plans: "Modules",
        esp: "ESP",
        scripts: "Aimbot",
        safety: "Safety",
        products: "Products",
        blog: "Forums",
        setup: "Setup"
      }
    },
    forum: {
      searchPlaceholder: "Search discussions",
      searchAria: "Search discussions",
      sortPopular: "Popular",
      sortLatest: "Latest",
      browseForums: "Browse forums",
      moreThreads: "More Caliber cheat threads in this topic.",
      discussions: "discussions",
      inThisTopic: "in this topic",
      moreDiscussions: "More discussions",
      viewAll: "All Caliber forums",
      replies: "replies",
      upvotes: "upvotes",
      viewProducts: "View products",
      voteAria: "Discussion voting",
      upvoteAria: "Upvote this discussion",
      downvoteAria: "Downvoting is unavailable",
      previewDiscussion: "Preview discussion",
      postingUnavailable: "Posting and voting are unavailable here",
      commentsTitle: "Replies",
      playerDiscussion: "Player discussion",
      heroEyebrow: "Forums",
      heroTitle: "Forums for aimbot, ESP & setup",
      heroSubtitle: "Use these forums for setup tips, aimbot settings, ESP configs, and patch-day notes from players.",
      filterAria: "Filter discussions by topic",
      allTopics: "All topics",
      empty: "No discussions match. Try another search or topic.",
      paginationAria: "Discussion pages",
      previous: "Previous",
      next: "Next",
      previousPageAria: "Previous page",
      nextPageAria: "Next page",
      aboutTitle: "Forums: Caliber cheats",
      aboutBody: "These forums are for aimbot levels, ESP layouts, and install steps before you queue ranked—browse threads or compare modules on the product page.",
      topicsHeading: "Topics",
      openRelated: "Open related threads",
      guidelinesHeading: "Forum guidelines",
      guidelines: [
        "Keep replies useful and specific",
        "Share settings with context",
        "No account trading or loader leaks"
      ],
      sidebarFoot: "About · Privacy · Terms"
    },
    reviews: {
      crumb: "Reviews",
      eyebrow: "Buyer feedback",
      h1: "Caliber Cheats customer reviews",
      h1Sub: "Real Experiences From Caliber Cheats Customers",
      heroDesc:
        "Purchase notes on aimbot, player ESP, wallhack, loot ESP, stream proof, Cloud DMA, and HWID tools—shared before checkout.",
      starFilterLabel: "Filter by star rating",
      showAllRatings: "Show all ratings",
      starFilterAtLeast: "At least",
      searchLabel: "Search",
      searchPlaceholder: "Search reviews, products, or names…",
      searchAria: "Search customer reviews",
      sortBy: "Sort by",
      sortAria: "Sort reviews",
      sortRecent: "Most recent",
      sortOldest: "Oldest first",
      sortHelpful: "Most helpful",
      filterAria: "Filter by star rating",
      ratingFilter: "Rating",
      productFilter: "Product",
      productFilterAria: "Filter reviews by product",
      allProducts: "All products",
      all: "All ratings",
      summaryAria: "Review summary",
      verified: "Verified purchase",
      verifiedOnly: "Verified purchases only",
      withText: "Reviews with text",
      resetFilters: "Reset filters",
      highest: "Highest rating",
      lowest: "Lowest rating",
      reviewSingular: "review",
      reviewPlural: "reviews",
      emptyFiltered: "No reviews match your filters. Try clearing search or resetting filters.",
      emptyPublished: "No customer reviews have been published yet.",
      loadMore: "Load more reviews",
      ctaHeading: "Compare products before you buy",
      ctaBody:
        "Read module pages, blogs, and FAQs—then open checkout when a plan matches your PC and play style.",
      ctaProducts: "Browse products",
      ctaBlogs: "Read blogs",
      ctaFaq: "FAQ",
      ctaCheckout: "Checkout"
    },
    products: {
      buyNow: "Buy now",
      viewDetails: "Module page",
      checkout: "Checkout",
      purchaseOption: "Purchase option",
      selectSubscription: "Select subscription",
      total: "Total",
      atAGlance: "At a glance",
      keyCapabilities: "Key capabilities",
      keyCapabilitiesDesc: "What {name} focuses on before you open the full module list.",
      moreModules: "Plus {n} additional modules in the operator portal—see the full list below.",
      allModules: "All modules",
      whatsIncluded: "What's included",
      productDescription: "Product description",
      productDescriptionDesc: "How this build fits ranked PvP, special ops, and patch-day workflows.",
      showMore: "Show more",
      showLess: "Show less",
      compatibility: "Compatibility",
      systemRequirements: "System requirements",
      systemRequirementsDesc: "Confirm your rig and Steam setup before checkout or loader install.",
      relatedGuidesEyebrow: "Blogs",
      relatedGuidesTitle: "Guides about {name}",
      relatedGuidesDesc: "Setup tips, ESP tuning, and buy guides that match this module.",
      browseAllBlogs: "All Caliber guides",
      reqPermissions: "Permissions",
      reqRestorePoint: "Restore point",
      reqSetupGuide: "Setup guide",
      reqOrderEmail: "Order email",
      reqPortalAccess: "Portal access",
      acquisition: {
        titleTemplate: "How to get {name}",
        steps: [
          {
            num: "01",
            title: "Review current status",
            desc: "Check the live banner on calibercheat.net before purchase—especially after an Caliber update."
          },
          {
            num: "02",
            title: "Choose your modules",
            desc: "Open the aimbot, ESP, or wallhack page that matches your goal, then continue to secure checkout."
          },
          {
            num: "03",
            title: "Complete checkout",
            desc: "Pay through the order flow. Keep your order email handy for portal access and support."
          },
          {
            num: "04",
            title: "Install and tune",
            desc: "Download the loader from the portal, load a calm preset, test in pubs, then queue ranked if you want."
          }
        ]
      },
      systemReqLines: [
        "Supported 64-bit edition of Windows 10 or Windows 11.",
        "Current Caliber PC client with latest patches applied.",
        "Administrator access for loader installation and updates.",
        "Stable internet connection for portal access and patch delivery.",
        "A system that meets Caliber published hardware requirements."
      ]
    },
    sidebar: {
      aria: "Article sidebar",
      toc: "In this article",
      tocAria: "Table of contents",
      relatedGuides: "Related guides",
      ourProducts: "Our products",
      caliberProducts: "Caliber products",
      eliteCheats: "Elite cheats",
      skinChanger: "Skin Changer",
      hwidSpoofer: "HWID Spoofer",
      ugc: "UGC"
    },
    schema: {
      customerSupport: "customer support",
      english: "English",
      worldwide: "Worldwide",
      siteDescription: "Caliber cheats with ESP, aimbot, and wallhack modules."
    }
  }
} as Translations;
