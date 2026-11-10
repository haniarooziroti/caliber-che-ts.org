export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
}

export const forumCategories = [
  { name: 'Setup', tone: 'blue', icon: 'settings' },
  { name: 'Settings', tone: 'purple', icon: 'settings' },
  { name: 'Features', tone: 'orange', icon: 'layers' },
  { name: 'Community', tone: 'green', icon: 'users' },
] as const;

export type ForumCategory = (typeof forumCategories)[number];

function countComments(comments: ForumComment[]): number {
  return comments.reduce((total, comment) => {
    return total + 1 + (comment.replies ? countComments(comment.replies) : 0);
  }, 0);
}

function thread(post: Omit<ForumPost, 'commentsCount'>): ForumPost {
  return {
    ...post,
    commentsCount: countComments(post.comments),
  };
}

export const forumPosts: ForumPost[] = [
  thread({
    slug: 'aimbot-settings-what-level',
    category: 'Settings',
    categoryTone: 'purple',
    title: 'Aimbot Settings: What Level & Why Won’t I Get Banned?',
    excerpt:
      'People keep asking what FOV and smoothness to run. Sharing what worked for me and what got me reported in two days.',
    author: 'mike_r9',
    age: '2 hours ago',
    upvotes: 128,
    flair: 'Settings',
    body: [
      'I bought access last week mainly for aimbot. First night I cranked FOV and it felt nasty—won a few but squads started spectating hard.',
      'Dropped FOV to something smaller, raised smoothness a bit, and only used it when someone was already on my screen. Way less weird looking. Still not magic. Curious what levels you all run for ranked vs pubs.',
    ],
    comments: [
      {
        author: 'traylen',
        age: '1 day ago',
        score: 19,
        body: 'yeah max fov is how you get the highlight reel and the report train. i keep it tight and only toggle when i’m already swinging',
      },
      {
        author: 'nova_sip',
        age: '3 days ago',
        score: 11,
        body: 'smoothness mattered more than i thought. mine was too snappy and my clips looked fake even to me lol. slowed it down and ranked felt fine for now.',
        replies: [
          {
            author: 'mike_r9',
            age: '1 week ago',
            score: 6,
            body: 'same. i was chasing “perfect” tracking and it just looked wrong. calmer settings feel better.',
          },
        ],
      },
      {
        author: 'saltedbat',
        age: '2 weeks ago',
        score: 4,
        body: 'not gonna sugarcoat it, i still got actioned after a sweaty weekend. settings help but nothing is a free pass. play less demon if you care about the account.',
      },
      {
        author: 'jenks_ttv',
        age: '3 weeks ago',
        score: 8,
        body: 'for me head priority + low fov in ranked, body/chest in pubs. also turn it off in endgame when everyone’s watching',
      },
      {
        author: 'crumbshot',
        age: '1 month ago',
        score: 2,
        body: 'anyone else notice after the last update the default preset felt stronger? had to dial mine back again',
      },
    ],
  }),
  thread({
    slug: 'caliber-loader-setup',
    category: 'Setup',
    categoryTone: 'blue',
    title: 'Instructions to use the cheats (first install)',
    excerpt: 'Simple steps that worked on Win11. If something fails, say which step died.',
    author: 'portal_notes',
    age: '6 weeks ago',
    upvotes: 96,
    flair: 'Setup',
    body: [
      '1) Check status is online. 2) Pay and open the portal. 3) Download the current loader only from there. 4) Run as admin, load a basic ESP preset, then add aimbot later.',
      'Do not mix old loaders with new keys. If Windows SmartScreen yells, that’s normal for a new file—still only use the portal build.',
    ],
    comments: [
      {
        author: 'dee_windows',
        age: '2 months ago',
        score: 14,
        body: 'step 4 got me. i launched Caliber first and the loader complained. closed game, ran loader, then launched. worked.',
      },
      {
        author: 'rizzo',
        age: '3 months ago',
        score: 3,
        body: 'mine failed until i turned off one overlay (discord). left steam overlay on tho',
      },
      {
        author: 'kay_err',
        age: '4 months ago',
        score: 1,
        body: 'honestly the guide in the portal is clearer than half the youtube junk. still took me two tries tho',
        replies: [
          {
            author: 'portal_notes',
            age: '5 months ago',
            score: 5,
            body: 'yeah ignore random videos. portal notes match the build you actually downloaded.',
          },
        ],
      },
      {
        author: 'unhappy_once',
        age: '2 hours ago',
        score: 0,
        body: 'paid and status flipped offline an hour later. support told me to wait for the update. annoying but they did reply.',
      },
    ],
  }),
  thread({
    slug: 'caliber-cheat-features-overview',
    category: 'Features',
    categoryTone: 'orange',
    title: 'Caliber cheats features — what’s actually worth turning on?',
    excerpt: 'Player ESP, aimbot, loot ESP, no recoil, stream proof… which ones do you leave on all game?',
    author: 'loopdrop',
    age: '1 day ago',
    upvotes: 84,
    flair: 'Features',
    body: [
      'I tried enabling everything night one and my screen looked like a christmas tree. Now I keep player ESP + health bars on, aimbot on a key, loot ESP only when landing.',
      'Wallhack stays on in buildings. No recoil low. Stream proof if I’m recording. Curious what your “always on” set is.',
    ],
    comments: [
      {
        author: 'pinklane',
        age: '3 days ago',
        score: 12,
        body: 'esp always. aimbot bind only. loot esp off after the first push for me, too noisy',
      },
      {
        author: 'brassed',
        age: '1 week ago',
        score: 7,
        body: 'weapon esp surprised me. knowing they have a shotty before i open a door is huge',
      },
      {
        author: 'mellow_frag',
        age: '2 weeks ago',
        score: 2,
        body: 'i turned skeleton off. boxes + hp is enough and my eyes don’t hurt',
        replies: [
          {
            author: 'loopdrop',
            age: '3 weeks ago',
            score: 3,
            body: 'same, skeleton made close fights messy',
          },
        ],
      },
      {
        author: 'grumpy_cpu',
        age: '1 month ago',
        score: -1,
        body: 'cloud dma option sounds cool until you price it. stuck with the normal route and it’s fine.',
      },
    ],
  }),
  thread({
    slug: 'player-esp-vs-wallhack',
    category: 'Features',
    categoryTone: 'orange',
    title: 'Player ESP vs wallhack — which should I enable first?',
    excerpt: 'New buyer. Don’t want to overload the HUD on day one.',
    author: 'firstkey22',
    age: '6 weeks ago',
    upvotes: 71,
    flair: 'Features',
    body: [
      'Title. I mainly die to third parties. Do I start with player ESP only, or is wallhack the thing that actually helps inside buildings?',
    ],
    comments: [
      {
        author: 'rotato',
        age: '2 months ago',
        score: 16,
        body: 'esp first. wallhack second. esp tells you who exists, wallhack helps when they’re behind a wall you already know about',
      },
      {
        author: 'hexlane',
        age: '3 months ago',
        score: 9,
        body: 'if you only pick one, esp. wallhack without hp bars is half the story',
      },
      {
        author: 'firstkey22',
        age: '4 months ago',
        score: 4,
        body: 'ok that tracks. turned on boxes + hp last night and already died less dumb',
      },
      {
        author: 'tidepod_aim',
        age: '5 months ago',
        score: 1,
        body: 'i run both but wallhack opacity low so it doesn’t scream',
      },
    ],
  }),
  thread({
    slug: 'no-recoil-settings-natural',
    category: 'Settings',
    categoryTone: 'purple',
    title: 'No recoil settings that don’t feel blatant',
    excerpt: 'Assault rifles and LMGs mainly. What strength are you running?',
    author: 'spraylab',
    age: '2 hours ago',
    upvotes: 63,
    flair: 'Settings',
    body: [
      'Max no recoil felt weird when I swapped guns. Looking for values that just make sprays controllable without looking like a laser forever.',
    ],
    comments: [
      {
        author: 'cara_main',
        age: '1 day ago',
        score: 10,
        body: 'i keep it like 40-50% on my main AR. lmg a bit higher. max looks dumb on replay',
      },
      {
        author: 'benchwarm',
        age: '3 days ago',
        score: 3,
        body: 'pairing light no recoil with soft aimbot worked better than either alone for me',
      },
      {
        author: 'spraylab',
        age: '1 week ago',
        score: 2,
        body: 'tried 45% — still pull a little myself so it feels human. thanks',
      },
      {
        author: 'madaboutmeta',
        age: '2 weeks ago',
        score: 0,
        body: 'idk man even medium got me accused in chat. maybe i just beam too long',
      },
    ],
  }),
  thread({
    slug: 'stream-proof-ranked-setup',
    category: 'Setup',
    categoryTone: 'blue',
    title: 'Stream proof for ranked — OBS still catching ESP?',
    excerpt: 'Game capture vs display capture notes from last night.',
    author: 'clipfarm_jr',
    age: '3 weeks ago',
    upvotes: 55,
    flair: 'Setup',
    body: [
      'Turned stream proof on, preview looked clean, then a VOD still showed boxes for a second. Fixed it by testing a local recording with the same scene. Don’t trust preview alone.',
    ],
    comments: [
      {
        author: 'obs_guy',
        age: '1 month ago',
        score: 13,
        body: 'this. preview lied to me twice. always record 30 seconds and watch the file',
      },
      {
        author: 'clipfarm_jr',
        age: '6 weeks ago',
        score: 5,
        body: 'yep. game capture + stream proof finally clean after i restarted obs',
      },
      {
        author: 'late_night_q',
        age: '2 months ago',
        score: 2,
        body: 'display capture was hopeless for me. stuck to game capture',
      },
    ],
  }),
  thread({
    slug: 'loot-esp-worth-enabling',
    category: 'Features',
    categoryTone: 'orange',
    title: 'Is loot ESP worth enabling all game?',
    excerpt: 'Love it on drop, hate it mid-game. Anyone filter it better?',
    author: 'bin_runner',
    age: '3 months ago',
    upvotes: 48,
    flair: 'Features',
    body: [
      'Loot ESP is great for the first two minutes then my screen is full of white text. Do you hotkey it or leave filters really strict?',
    ],
    comments: [
      {
        author: 'poi_rat',
        age: '4 months ago',
        score: 11,
        body: 'hotkey. on for landing, off after i’m kitted. simple',
      },
      {
        author: 'shields_only',
        age: '5 months ago',
        score: 6,
        body: 'i filter to purple/gold and batteries. way quieter',
      },
      {
        author: 'bin_runner',
        age: '2 hours ago',
        score: 3,
        body: 'filters helped. still using a toggle tho',
      },
      {
        author: 'meh_review',
        age: '1 day ago',
        score: 1,
        body: 'bought mainly for loot esp and kinda regretted it, esp/aim mattered more. loot is nice not needed',
      },
    ],
  }),
  thread({
    slug: 'buying-caliber-aimbot-checklist',
    category: 'Community',
    categoryTone: 'green',
    title: 'Buying Caliber aimbot — what to check before checkout',
    excerpt: 'Status, Windows version, and whether you even need aim day one.',
    author: 'slowbuy',
    age: '3 days ago',
    upvotes: 77,
    flair: 'Buying',
    body: [
      'If you’re about to pay: check status, make sure you’re on Win10/11, and decide if you want aimbot first or ESP first. I bought aimbot immediately and barely used ESP—kind of backwards.',
      'Also read a settings thread before your first ranked game. Would’ve saved me a rough night.',
    ],
    comments: [
      {
        author: 'cashout_kid',
        age: '1 week ago',
        score: 9,
        body: 'status check saved me once. almost bought during an offline window',
      },
      {
        author: 'esp_first',
        age: '2 weeks ago',
        score: 15,
        body: 'esp first 100%. aim after you understand the menu',
      },
      {
        author: 'refund_sad',
        age: '3 weeks ago',
        score: 2,
        body: 'wanted a refund cause i messed install. support said sales final but they helped me get it running. mixed feelings but it works now',
        replies: [
          {
            author: 'slowbuy',
            age: '1 month ago',
            score: 4,
            body: 'yeah they won’t refund mood swings but they did answer me pretty quick too',
          },
        ],
      },
      {
        author: 'rank_grinder',
        age: '6 weeks ago',
        score: 5,
        body: '100+ reviews section on the site matched what i saw in discord vibes. not perfect, not a scam dumpster either',
      },
    ],
  }),
  thread({
    slug: 'health-bar-esp-tips',
    category: 'Settings',
    categoryTone: 'purple',
    title: 'Health bar ESP tips for third parties',
    excerpt: 'How you use HP bars when two squads collapse.',
    author: 'thirdparty_tom',
    age: '2 months ago',
    upvotes: 42,
    flair: 'Settings',
    body: [
      'Health bars changed how I take fights. If both squads are cracked I wait. If one is one-shot I commit. Any other habits?',
    ],
    comments: [
      {
        author: 'wait_then_swing',
        age: '3 months ago',
        score: 8,
        body: 'watch who reloads. hp bars + audio is nasty',
      },
      {
        author: 'greedy_me',
        age: '4 months ago',
        score: 1,
        body: 'i still greed and die. tool can’t fix my brain',
      },
      {
        author: 'thirdparty_tom',
        age: '5 months ago',
        score: 3,
        body: 'fair. at least now i know WHY i died',
      },
    ],
  }),
  thread({
    slug: 'smooth-aim-fov-recommendations',
    category: 'Settings',
    categoryTone: 'purple',
    title: 'Smooth aim FOV recommendations for close range',
    excerpt: 'Shotgun / SMG range. Wide FOV feels filthy indoors.',
    author: 'room_clear',
    age: '2 hours ago',
    upvotes: 59,
    flair: 'Settings',
    body: [
      'Indoors my old FOV was grabbing targets around corners in a way that felt stupid. Looking for close-range recommendations that still help tracking.',
    ],
    comments: [
      {
        author: 'fov_monk',
        age: '1 day ago',
        score: 12,
        body: 'smaller than you think. if it pulls from offscreen indoors it’s too wide',
      },
      {
        author: 'room_clear',
        age: '3 days ago',
        score: 4,
        body: 'cut it a lot. feels better already',
      },
      {
        author: 'smg_main',
        age: '1 week ago',
        score: 6,
        body: 'i use two profiles. tiny fov for buildings, wider for open fields. hotkey swap',
      },
      {
        author: 'angry_after_ban',
        age: '2 weeks ago',
        score: 0,
        body: 'didn’t matter for me, still got hit after going crazy in ranked. take breaks',
      },
      {
        author: 'chill_pubs',
        age: '3 weeks ago',
        score: 3,
        body: 'pubs i run wider, ranked i run shy. that split alone helped',
      },
    ],
  }),
  thread({
    slug: 'support-hwid-reset-wait-time',
    category: 'Community',
    categoryTone: 'green',
    title: 'HWID reset after new PC — how long did support take?',
    excerpt: 'Swapped GPUs / board. Need reset before I can load again.',
    author: 'new_rig',
    age: '1 month ago',
    upvotes: 31,
    flair: 'Support',
    body: [
      'Built a new PC, license stuck on old HWID. Opened a ticket with order email. How long did resets take for you?',
    ],
    comments: [
      {
        author: 'same_boat',
        age: '6 weeks ago',
        score: 7,
        body: 'mine was same day. like 3-4 hours',
      },
      {
        author: 'slow_ticket',
        age: '2 months ago',
        score: 2,
        body: 'took me almost a day and i was annoyed but they did it. include order email first message',
      },
      {
        author: 'new_rig',
        age: '3 months ago',
        score: 1,
        body: 'got it overnight. thanks',
      },
    ],
  }),
  thread({
    slug: 'distance-esp-clutter',
    category: 'Settings',
    categoryTone: 'purple',
    title: 'Distance ESP clutter — max range tips?',
    excerpt: 'Seeing people 300m away is useless noise in early game.',
    author: 'range_cap',
    age: '4 months ago',
    upvotes: 37,
    flair: 'Settings',
    body: [
      'Distance ESP is useful until every squad on the map is labeled. What’s a sane max distance for pubs?',
    ],
    comments: [
      {
        author: 'zone_watcher',
        age: '5 months ago',
        score: 9,
        body: 'i cap around mid range early, raise it later when circle is small',
      },
      {
        author: 'range_cap',
        age: '2 hours ago',
        score: 2,
        body: 'that helped a lot, screen feels cleaner',
      },
      {
        author: 'info_addict',
        age: '1 day ago',
        score: 1,
        body: 'i leave it long and just ignore far tags. brain filter lmao',
      },
      {
        author: 'not_impressed',
        age: '3 days ago',
        score: 0,
        body: 'esp is good, menu is kinda confusing first hour. expect a learning curve',
      },
    ],
  }),
  thread({
    slug: 'caliber-pc-getting-started',
    category: 'Setup',
    categoryTone: 'blue',
    title: 'How to Get Started with Caliber on PC',
    excerpt: 'First week with the loader — what order to install things and what I wish someone told me.',
    author: 'rook_ops',
    age: '5 days ago',
    upvotes: 64,
    flair: 'Setup',
    body: [
      'Picked up a weekly key to test Caliber modules before committing monthly. Windows 11, game on SSD. Loader wanted admin, game wants borderless for overlay.',
      'Anyone map their first-day checklist? I do not want to skip something dumb like leaving BattlEye in a weird state.',
    ],
    comments: [
      { author: 'vet_leo', age: '1 week ago', score: 14, body: 'reboot after install, close overlays like discord hardware accel if fps tanks. boring but works.' },
      { author: 'rook_ops', age: '4 days ago', score: 3, body: 'tried that, fps fine now. esp defaults were bright tho' },
      { author: 'skeptic_sam', age: '6 days ago', score: 5, body: 'honestly support doc on the product page is enough if you read slow. took me 20 min' },
      { author: 'angry_patch', age: '2 weeks ago', score: 1, body: 'game updated mid session and loader errored. not the end of world but annoying' },
    ],
  }),
  thread({
    slug: 'caliber-compatibility-windows',
    category: 'Setup',
    categoryTone: 'blue',
    title: 'Caliber PC Compatibility — Win10 vs Win11?',
    excerpt: 'Ryzen box on 22H2, friend on Win10 has different menu scaling.',
    author: 'build_check',
    age: '8 days ago',
    upvotes: 41,
    body: ['Does anyone run this on Win10 still or is Win11 the safer bet for new installs?'],
    comments: [
      { author: 'win10_holdout', age: '10 days ago', score: 8, body: '22H2 win10 here, no drama last month' },
      { author: 'scale_bug', age: '9 days ago', score: 6, body: '125% scaling made menu tiny until i set game to fullscreen borderless. not a ban thing just ui' },
      { author: 'build_check', age: '7 days ago', score: 2, body: 'fullscreen borderless fixed it thx' },
      { author: 'new_gpu', age: '12 days ago', score: 4, body: 'old gtx 1060 runs esp fine if you trim distance. dont expect 144fps with everything on' },
    ],
  }),
  thread({
    slug: 'weekly-vs-monthly-value',
    category: 'Community',
    categoryTone: 'green',
    title: 'Weekly vs monthly — when does monthly pay off?',
    excerpt: 'Math on three weekly renewals vs one month.',
    author: 'budget_fps',
    age: '11 days ago',
    upvotes: 29,
    body: ['Trying to decide if I play enough for monthly. Roughly 3 nights a week.'],
    comments: [
      { author: 'spreadsheet_guy', age: '2 weeks ago', score: 11, body: 'if you play 10+ sessions a month just get monthly. one forgot-to-cancel week hurts' },
      { author: 'budget_fps', age: '10 days ago', score: 2, body: 'fair, monthly it is then' },
      { author: 'casual_only', age: '3 weeks ago', score: 5, body: 'weekly for me, sometimes life happens and i dont touch the game' },
      { author: 'refund_wait', age: '1 month ago', score: 0, body: 'store wouldnt refund unused days on weekly. read policy first' },
    ],
  }),
  thread({
    slug: 'after-game-update-loader',
    category: 'Setup',
    categoryTone: 'blue',
    title: 'Loader issues right after a Caliber patch',
    excerpt: 'Patch yesterday, injection fails until portal refresh.',
    author: 'patch_watcher',
    age: '13 days ago',
    upvotes: 73,
    body: ['Game updated, loader says version mismatch. Status page said updating. Wait or reinstall?'],
    comments: [
      { author: 'status_reader', age: '2 weeks ago', score: 16, body: 'wait for green on status, refresh portal download. reinstall only if hash mismatch persists' },
      { author: 'patch_watcher', age: '12 days ago', score: 4, body: 'portal build fixed it in an hour' },
      { author: 'mad_lad', age: '2 weeks ago', score: 3, body: 'i panicked and reinstalled twice. worked but wasted time lol' },
      { author: 'salty_af', age: '3 weeks ago', score: 2, body: 'took almost a day once. patience is part of the deal' },
    ],
  }),
  thread({
    slug: 'windows-defender-popup',
    category: 'Setup',
    categoryTone: 'blue',
    title: 'Windows Security warning on download — normal?',
    excerpt: 'SmartScreen flagged the zip; never seen that on steam games.',
    author: 'defender_scare',
    age: '15 days ago',
    upvotes: 51,
    flair: 'Setup',
    body: ['First download triggered Defender. Exclude folder or is that risky?'],
    comments: [
      { author: 'been_there', age: '3 weeks ago', score: 12, body: 'common with cheat loaders. exclude only the install folder you control, not entire drive' },
      { author: 'defender_scare', age: '14 days ago', score: 3, body: 'did folder exclude, worked' },
      { author: 'paranoid_pc', age: '1 month ago', score: 7, body: 'vm snapshot before first run if you are nervous. overkill but i do it' },
      { author: 'not_happy', age: '3 weeks ago', score: 1, body: 'still got warning every update. annoying but expected' },
    ],
  }),
  thread({
    slug: 'license-new-pc-transfer',
    category: 'Community',
    categoryTone: 'green',
    title: 'Moving license to a new PC — HWID reset timing',
    excerpt: 'New motherboard, old key still bound.',
    author: 'fresh_build',
    age: '18 days ago',
    upvotes: 38,
    body: ['Upgraded mobo + cpu. Loader says hwid lock. Ticket template says include order mail?'],
    comments: [
      { author: 'support_fan', age: '3 weeks ago', score: 9, body: 'order email + reset request. mine turned in under 6h' },
      { author: 'fresh_build', age: '17 days ago', score: 2, body: 'got reset next morning. usable again' },
      { author: 'impatient_one', age: '1 month ago', score: 0, body: 'took 2 days for me. weekend maybe' },
      { author: 'hwid_spoofer_q', age: '2 weeks ago', score: 4, body: 'if you spoof instead, read limits on utilities page first. different path' },
    ],
  }),
  thread({
    slug: 'target-priority-aim-assist',
    category: 'Settings',
    categoryTone: 'purple',
    title: 'Target priority — closest vs lowest HP?',
    excerpt: 'Tried closest crosshair but team fights feel chaotic.',
    author: 'prio_test',
    age: '20 days ago',
    upvotes: 44,
    body: ['What target priority do you run in 5v5 Caliber PvP? Closest feels random when three bodies overlap.'],
    comments: [
      { author: 'solo_main', age: '3 weeks ago', score: 13, body: 'low hp for finish, closest for duels. swap hotkey if menu allows' },
      { author: 'prio_test', age: '19 days ago', score: 5, body: 'low hp helped last night actually' },
      { author: 'team_player', age: '1 month ago', score: 6, body: 'still manual aim most fight. priority only when i panicked' },
      { author: 'hater_101', age: '2 weeks ago', score: 2, body: 'aim assist feels weaker than esp tbh. ymmv' },
    ],
  }),
];


export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}

export function getAllForumSlugs() {
  return forumPosts.map((post) => post.slug);
}

export function getFeaturedForumPosts(limit = 3) {
  return [...forumPosts].sort((a, b) => b.upvotes - a.upvotes).slice(0, limit);
}

export function getRelatedForumPosts(slugs: string[], limit = 6): ForumPost[] {
  const out = [];
  for (const slug of slugs) {
    const post = getForumPost(slug);
    if (post) out.push(post);
    if (out.length >= limit) break;
  }
  return out;
}
